"""
Continuously reads live values (Star Coins, Dreamlight, ...) from the running ddv.exe
process, using the addresses scan.py already narrowed down, and writes them to
game_state.json for the web app to poll via fetch().

Usage: python live_bridge.py [--interval SECONDS]

Requires scan_state.json (produced by scan.py) to already have narrowed candidate
addresses for each watch you want tracked live. If the game process restarts, this
will detect the failed reads and automatically re-locate each watch's address by
re-scanning memory for its last known value.
"""

import argparse
import json
import struct
import time
from datetime import datetime, timezone
from pathlib import Path

import pymem

from scan import TYPE_MAP, load_state, save_state, writable_regions, pack_value

OUTPUT_FILE = Path(__file__).parent / "game_state.json"


def read_watch(pm, watch, type_name):
    fmt, size = TYPE_MAP[type_name]
    values = []
    still_good = []
    for addr in watch["candidates"]:
        try:
            data = pm.read_bytes(addr, size)
            values.append(struct.unpack("<" + fmt, data)[0])
            still_good.append(addr)
        except Exception:
            continue
    if not values:
        return None, True
    agree = all(v == values[0] for v in values)
    return values[0], not agree


def relocate_watch(pm, name, last_value, type_name):
    """Re-scans all writable memory for last_value to find this watch's address again
    (used when the game process has restarted or the value's memory moved)."""
    target_bytes, size, fmt = pack_value(last_value, type_name)
    found = []
    for base, region_size in writable_regions(pm.process_handle):
        try:
            buf = pm.read_bytes(base, region_size)
        except Exception:
            continue
        start = 0
        while True:
            idx = buf.find(target_bytes, start)
            if idx == -1:
                break
            if idx % size == 0:
                found.append(base + idx)
            start = idx + 1
    return found


def poll(interval, process_name_override=None):
    state = load_state()
    if not state:
        print("No scan state found — run scan.py first/next to locate addresses before starting the bridge.")
        return
    process_name = process_name_override or state["process_name"]
    type_name = state["type"]
    last_good = {name: watch["last_value"] for name, watch in state["watches"].items()}

    print(f"Bridging {process_name} -> {OUTPUT_FILE.name} every {interval}s for watches: {', '.join(state['watches'])}")
    print("Ctrl+C to stop.")

    pm = None
    while True:
        output = {"updated_at": datetime.now(timezone.utc).isoformat()}

        if pm is None:
            try:
                pm = pymem.Pymem(process_name)
            except Exception as e:
                output["error"] = f"process not found: {e}"
                for name in state["watches"]:
                    output[name] = {"value": last_good[name], "stale": True}
                OUTPUT_FILE.write_text(json.dumps(output))
                time.sleep(interval)
                continue

        any_alive = False
        for name, watch in list(state["watches"].items()):
            try:
                value, stale = read_watch(pm, watch, type_name)
            except Exception:
                value, stale = None, True

            if value is None:
                # address(es) no longer valid — try to relocate using the last known value
                try:
                    relocated = relocate_watch(pm, name, last_good[name], type_name)
                except Exception:
                    relocated = []
                if relocated:
                    watch["candidates"] = relocated
                    value, stale = read_watch(pm, watch, type_name)

            if value is None:
                output[name] = {"value": last_good[name], "stale": True}
            else:
                any_alive = True
                last_good[name] = value
                output[name] = {"value": value, "stale": stale}

        if not any_alive:
            # every watch is stale — the process handle itself is probably dead
            # (game closed/restarted); drop it so the next loop reattaches by name
            try:
                pm.close_process()
            except Exception:
                pass
            pm = None

        save_state(state)
        OUTPUT_FILE.write_text(json.dumps(output))
        time.sleep(interval)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--interval", type=float, default=2.0, help="Seconds between polls (default 2)")
    parser.add_argument("--process", default=None, help="Override process name from scan_state.json")
    args = parser.parse_args()
    try:
        poll(args.interval, args.process)
    except KeyboardInterrupt:
        print("\nStopped.")
