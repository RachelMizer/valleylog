"""One-off copy of the local SQLite database into Postgres.

    python scripts/migrate_sqlite_to_postgres.py                  # dry run
    python scripts/migrate_sqlite_to_postgres.py --write          # do it

Reads SQLITE_PATH (default ../valleylog.db) and writes to TARGET_DATABASE_URL,
falling back to DATABASE_URL. The SQLite file is only ever read.

Three things this has to get right, none of which SQLAlchemy does for you when
moving raw rows between engines:

  * Booleans. SQLite stores them as 0/1 integers; Postgres rejects those for a
    BOOLEAN column, so they're coerced per the model's own column types.
  * Timestamps. SQLite stores them as text. `users.created_at` is NOT NULL with
    only a *Python-side* default, so a row copied without it fails outright --
    it has to be carried across (or synthesised) explicitly.
  * Sequences. Rows are inserted with their original ids so foreign keys still
    line up, which leaves Postgres' identity sequences at 1. Without a setval
    afterwards the very next signup collides on the primary key.
"""
import argparse
import os
import sqlite3
import sys
from datetime import datetime, timezone

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from sqlalchemy import Boolean, DateTime, create_engine, inspect, text  # noqa: E402

from app.database import Base  # noqa: E402
import app.models  # noqa: F401,E402

# Parents before children, so foreign keys are satisfiable as we go.
TABLE_ORDER = ["users", "tracked_villagers", "tracked_tasks", "recipe_progress"]


def coerce(table, column, value):
    if value is None:
        return None
    col = table.columns.get(column)
    if col is None:
        return value
    if isinstance(col.type, Boolean):
        return bool(value)
    if isinstance(col.type, DateTime) and isinstance(value, str):
        try:
            return datetime.fromisoformat(value)
        except ValueError:
            return datetime.strptime(value, "%Y-%m-%d %H:%M:%S.%f")
    return value


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true",
                    help="actually write; without it nothing is inserted")
    ap.add_argument("--sqlite", default=os.environ.get(
        "SQLITE_PATH", os.path.join(os.path.dirname(__file__), "..", "valleylog.db")))
    ap.add_argument("--target", default=os.environ.get(
        "TARGET_DATABASE_URL", os.environ.get("DATABASE_URL")))
    args = ap.parse_args()

    if not args.target:
        sys.exit("set TARGET_DATABASE_URL (or DATABASE_URL) to the Postgres URL")
    if not os.path.isfile(args.sqlite):
        sys.exit(f"no SQLite database at {args.sqlite}")

    src = sqlite3.connect(f"file:{os.path.abspath(args.sqlite)}?mode=ro", uri=True)
    src.row_factory = sqlite3.Row
    engine = create_engine(args.target, pool_pre_ping=True)

    print(f"source : {os.path.abspath(args.sqlite)} (read-only)")
    print(f"target : {engine.url.render_as_string(hide_password=True)}")
    print(f"mode   : {'WRITE' if args.write else 'dry run'}\n")

    Base.metadata.create_all(bind=engine)

    existing = {t: engine.connect().execute(
        text(f"SELECT COUNT(*) FROM {t}")).scalar() for t in TABLE_ORDER}
    if any(existing.values()):
        print("target is not empty:", {k: v for k, v in existing.items() if v})
        if args.write:
            sys.exit("refusing to write into a non-empty database; clear it first")

    total = 0
    for name in TABLE_ORDER:
        table = Base.metadata.tables[name]
        cols = [c["name"] for c in inspect(engine).get_columns(name)]
        src_cols = {r[1] for r in src.execute(f"PRAGMA table_info({name})")}
        shared = [c for c in cols if c in src_cols]
        missing = [c for c in cols if c not in src_cols]

        rows = [dict(r) for r in src.execute(f"SELECT * FROM {name}")]
        print(f"{name}: {len(rows)} rows, {len(shared)} columns"
              + (f"  (not in source, will use defaults: {missing})" if missing else ""))
        if not rows:
            continue

        payload = []
        for r in rows:
            item = {c: coerce(table, c, r[c]) for c in shared}
            if name == "users" and not item.get("created_at"):
                item["created_at"] = datetime.now(timezone.utc)
            payload.append(item)

        if args.write:
            with engine.begin() as conn:
                conn.execute(table.insert(), payload)
        total += len(payload)

    if args.write:
        with engine.begin() as conn:
            for name in TABLE_ORDER:
                conn.execute(text(
                    f"SELECT setval(pg_get_serial_sequence('{name}', 'id'), "
                    f"COALESCE((SELECT MAX(id) FROM {name}), 1))"))
        print("\nidentity sequences advanced past the copied ids")

        print("\nverification:")
        ok = True
        with engine.connect() as conn:
            for name in TABLE_ORDER:
                want = src.execute(f"SELECT COUNT(*) FROM {name}").fetchone()[0]
                got = conn.execute(text(f"SELECT COUNT(*) FROM {name}")).scalar()
                flag = "OK" if want == got else "MISMATCH"
                ok &= want == got
                print(f"  {name:20} sqlite={want:>4}  postgres={got:>4}  {flag}")
        print("\nMigration complete." if ok else "\nMISMATCH - investigate.")
    else:
        print(f"\nDry run: {total} rows would be copied. Re-run with --write.")

    src.close()


main()
