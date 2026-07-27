"""
Cheat-Engine-style incremental memory scanner for finding stable addresses
of live values (currency, friendship counters, etc.) in a running process.

Read-only: this never writes to the target process's memory, only ReadProcessMemory.

Supports scanning multiple named values at once (e.g. star_coins + dreamlight) in a
single pass over process memory, narrowing each independently as its value changes.

Workflow:
  1. python scan.py first <process_name> name=value [name2=value2 ...] [type]
       e.g. python scan.py first ddv.exe star_coins=3455706 dreamlight=234143
  2. ...change one or more values in-game (spend/earn coins, etc.)...
  3. python scan.py next name=newvalue [name2=newvalue2 ...]
       only mention the watches whose value actually changed; others are left alone
  4. repeat step 2-3 until `python scan.py show` lists a small number of addresses per watch
  5. python scan.py show                                # prints current candidates + live values

State (process name, type, per-watch candidate addresses) persists between runs in
scan_state.json in this folder, since each invocation is a fresh process.
"""

import ctypes
import json
import struct
import sys
from ctypes import wintypes
from pathlib import Path

import pymem

STATE_FILE = Path(__file__).parent / "scan_state.json"

# pymem 1.14.0's own process.list_processes() is broken on this Python/Windows combo:
# it never sets argtypes/restype on the Toolhelp32 kernel32 calls, so every
# PROCESSENTRY32 field reads back as zero/empty. Reimplemented here with proper
# argtypes so process lookup actually works.

class PROCESSENTRY32(ctypes.Structure):
    _fields_ = [
        ("dwSize", wintypes.DWORD),
        ("cntUsage", wintypes.DWORD),
        ("th32ProcessID", wintypes.DWORD),
        ("th32DefaultHeapID", ctypes.POINTER(ctypes.c_ulong)),
        ("th32ModuleID", wintypes.DWORD),
        ("cntThreads", wintypes.DWORD),
        ("th32ParentProcessID", wintypes.DWORD),
        ("pcPriClassBase", ctypes.c_long),
        ("dwFlags", wintypes.DWORD),
        ("szExeFile", ctypes.c_char * 260),
    ]

TH32CS_SNAPPROCESS = 0x00000002
_k32 = ctypes.windll.kernel32
_k32.CreateToolhelp32Snapshot.argtypes = [wintypes.DWORD, wintypes.DWORD]
_k32.CreateToolhelp32Snapshot.restype = wintypes.HANDLE
_k32.Process32First.argtypes = [wintypes.HANDLE, ctypes.POINTER(PROCESSENTRY32)]
_k32.Process32First.restype = wintypes.BOOL
_k32.Process32Next.argtypes = [wintypes.HANDLE, ctypes.POINTER(PROCESSENTRY32)]
_k32.Process32Next.restype = wintypes.BOOL

def list_processes():
    hSnap = _k32.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0)
    entry = PROCESSENTRY32()
    entry.dwSize = ctypes.sizeof(PROCESSENTRY32)
    if _k32.Process32First(hSnap, ctypes.byref(entry)):
        while True:
            yield entry.th32ProcessID, entry.szExeFile.decode(errors="ignore")
            entry = PROCESSENTRY32()
            entry.dwSize = ctypes.sizeof(PROCESSENTRY32)
            if not _k32.Process32Next(hSnap, ctypes.byref(entry)):
                break
    _k32.CloseHandle(hSnap)

TYPE_MAP = {
    "int16": ("h", 2),
    "int32": ("i", 4),
    "int64": ("q", 8),
    "float": ("f", 4),
    "double": ("d", 8),
}

# --- low-level memory region enumeration (VirtualQueryEx) ---

MEM_COMMIT = 0x1000
PAGE_GUARD = 0x100
PAGE_NOACCESS = 0x01
WRITABLE_PROTECT = {0x04, 0x08, 0x40, 0x80}  # RW, WRITECOPY, EXECUTE_RW, EXECUTE_WRITECOPY

class MEMORY_BASIC_INFORMATION(ctypes.Structure):
    _fields_ = [
        ("BaseAddress", ctypes.c_void_p),
        ("AllocationBase", ctypes.c_void_p),
        ("AllocationProtect", wintypes.DWORD),
        ("RegionSize", ctypes.c_size_t),
        ("State", wintypes.DWORD),
        ("Protect", wintypes.DWORD),
        ("Type", wintypes.DWORD),
    ]

kernel32 = ctypes.windll.kernel32
kernel32.VirtualQueryEx.argtypes = [wintypes.HANDLE, ctypes.c_void_p, ctypes.POINTER(MEMORY_BASIC_INFORMATION), ctypes.c_size_t]
kernel32.VirtualQueryEx.restype = ctypes.c_size_t

def writable_regions(process_handle, max_addr=0x7FFFFFFF0000):
    addr = 0x10000
    mbi = MEMORY_BASIC_INFORMATION()
    while addr < max_addr:
        ret = kernel32.VirtualQueryEx(process_handle, ctypes.c_void_p(addr), ctypes.byref(mbi), ctypes.sizeof(mbi))
        if ret == 0:
            break
        if (mbi.State == MEM_COMMIT and mbi.Protect in WRITABLE_PROTECT
                and not (mbi.Protect & PAGE_GUARD)):
            yield mbi.BaseAddress, mbi.RegionSize
        addr = mbi.BaseAddress + mbi.RegionSize

# --- state persistence ---

def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return None

def save_state(state):
    STATE_FILE.write_text(json.dumps(state))

# --- scanning ---

def attach(process_name):
    pm = pymem.Pymem(process_name)
    return pm

def pack_value(value, type_name):
    fmt, size = TYPE_MAP[type_name]
    return struct.pack("<" + fmt, value), size, fmt

def parse_watch_args(args):
    """Splits ['name=value', ...] (optionally trailed by a type name) into (dict, type_name)."""
    watches = {}
    type_name = "int32"
    for a in args:
        if "=" in a:
            name, value = a.split("=", 1)
            watches[name] = int(value.replace(",", ""))
        elif a in TYPE_MAP:
            type_name = a
    return watches, type_name

def first_scan(process_name, watch_values, type_name, merge=True):
    pm = attach(process_name)
    targets = {name: pack_value(value, type_name) for name, value in watch_values.items()}
    watch_candidates = {name: [] for name in watch_values}
    regions = list(writable_regions(pm.process_handle))
    total_bytes = sum(r[1] for r in regions)
    print(f"Scanning {len(regions)} writable regions (~{total_bytes / 1_048_576:.0f} MB) for {len(watch_values)} value(s)...")

    for base, region_size in regions:
        try:
            buf = pm.read_bytes(base, region_size)
        except Exception:
            continue
        for name, (target_bytes, size, fmt) in targets.items():
            start = 0
            while True:
                idx = buf.find(target_bytes, start)
                if idx == -1:
                    break
                if idx % size == 0:  # keep it to aligned offsets, matches CE default behavior
                    watch_candidates[name].append(base + idx)
                start = idx + 1

    existing = load_state()
    if merge and existing and existing.get("process_name") == process_name and existing.get("type") == type_name:
        watches = existing["watches"]
    else:
        watches = {}

    for name, value in watch_values.items():
        candidates = watch_candidates[name]
        print(f"  {name}: {len(candidates)} candidate address(es) found.")
        if len(candidates) > 5000:
            print(f"    That's a lot — try a more distinctive value for {name}.")
        watches[name] = {"candidates": candidates, "last_value": value}

    save_state({
        "process_name": process_name,
        "type": type_name,
        "watches": watches,
    })

def next_scan(updates, type_name=None):
    state = load_state()
    if not state:
        print("No scan in progress. Run `first` first.")
        return
    type_name = type_name or state["type"]
    pm = attach(state["process_name"])

    for name, value in updates.items():
        watch = state["watches"].get(name)
        if watch is None:
            print(f"  {name}: not part of the current scan, skipping (start a new `first` to add it).")
            continue
        target_bytes, size, fmt = pack_value(value, type_name)
        kept = []
        for addr in watch["candidates"]:
            try:
                data = pm.read_bytes(addr, size)
            except Exception:
                continue
            if data == target_bytes:
                kept.append(addr)
        print(f"  {name}: {len(watch['candidates'])} -> {len(kept)} candidate(s).")
        watch["candidates"] = kept
        watch["last_value"] = value

    state["type"] = type_name
    save_state(state)

def show():
    state = load_state()
    if not state:
        print("No scan in progress.")
        return
    pm = attach(state["process_name"])
    fmt, size = TYPE_MAP[state["type"]]
    print(f"Process: {state['process_name']}  Type: {state['type']}")
    for name, watch in state["watches"].items():
        candidates = watch["candidates"]
        print(f"{name}  ({len(candidates)} candidate(s)):")
        for addr in candidates[:50]:
            try:
                data = pm.read_bytes(addr, size)
                val = struct.unpack("<" + fmt, data)[0]
                print(f"  0x{addr:X}  = {val}")
            except Exception as e:
                print(f"  0x{addr:X}  <read failed: {e}>")
        if len(candidates) > 50:
            print(f"  ... and {len(candidates) - 50} more")

def reset():
    if STATE_FILE.exists():
        STATE_FILE.unlink()
    print("Scan state cleared.")

def find_process(name_fragment):
    matches = [(pid, name) for pid, name in list_processes() if name_fragment.lower() in name.lower()]
    for pid, name in matches:
        print(f"  {name}  (pid {pid})")
    return matches

if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(0)

    cmd = args[0]
    if cmd == "find":
        find_process(args[1])
    elif cmd == "first":
        process_name = args[1]
        watch_values, type_name = parse_watch_args(args[2:])
        if not watch_values:
            print("Provide at least one name=value pair.")
        else:
            first_scan(process_name, watch_values, type_name)
    elif cmd == "next":
        updates, type_name_override = parse_watch_args(args[1:])
        # only treat trailing bare type token as an override if one was actually present
        has_bare_type = any(a in TYPE_MAP for a in args[1:])
        next_scan(updates, type_name_override if has_bare_type else None)
    elif cmd == "show":
        show()
    elif cmd == "reset":
        reset()
    else:
        print(__doc__)
