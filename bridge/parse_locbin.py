"""
Parses the game's .locbin localization files (simple protobuf: repeated {key, value}
string pairs) into a single JSON dictionary of internal-key -> English display text.

Usage: python parse_locbin.py <locdb_folder> <output.json>
"""

import json
import sys
from pathlib import Path


def read_varint(buf, pos):
    result = 0
    shift = 0
    while True:
        b = buf[pos]
        pos += 1
        result |= (b & 0x7F) << shift
        if not (b & 0x80):
            break
        shift += 7
    return result, pos


def parse_locbin(path):
    buf = path.read_bytes()
    pos = 0
    entries = {}
    n = len(buf)
    while pos < n:
        # each entry: 0x0A <len> <nested message: 0x0A <len> key 0x12 <len> value>
        if buf[pos] != 0x0A:
            break
        pos += 1
        entry_len, pos = read_varint(buf, pos)
        entry_end = pos + entry_len
        key = value = None
        p = pos
        while p < entry_end:
            tag = buf[p]
            p += 1
            field_num = tag >> 3
            if field_num == 1:  # key string
                length, p = read_varint(buf, p)
                key = buf[p:p + length].decode("utf-8", errors="replace")
                p += length
            elif field_num == 2:  # value string
                length, p = read_varint(buf, p)
                value = buf[p:p + length].decode("utf-8", errors="replace")
                p += length
            else:
                break
        if key is not None:
            entries[key] = value
        pos = entry_end
    return entries


def main():
    folder = Path(sys.argv[1])
    out_path = Path(sys.argv[2])
    merged = {}
    files = sorted(folder.glob("*.locbin"))
    for f in files:
        try:
            entries = parse_locbin(f)
            merged.update(entries)
        except Exception as e:
            print(f"  skip {f.name}: {e}")
    out_path.write_text(json.dumps(merged, ensure_ascii=False, indent=None), encoding="utf-8")
    print(f"Parsed {len(files)} files -> {len(merged)} keys -> {out_path}")


if __name__ == "__main__":
    main()
