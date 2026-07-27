from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.config import settings

_is_sqlite = settings.database_url.startswith("sqlite")

connect_args = {"check_same_thread": False} if _is_sqlite else {}
engine = create_engine(
    settings.database_url,
    connect_args=connect_args,
    # Serverless Postgres (Neon and friends) suspends when idle and drops open
    # connections, so a pooled connection can be dead by the time it's reused.
    # pool_pre_ping issues a cheap liveness check first and transparently
    # reconnects, which turns intermittent "server closed the connection"
    # errors into nothing at all. Harmless on SQLite.
    pool_pre_ping=True,
    pool_recycle=300,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Portable tokens for the hand-written ALTER TABLE statements below, resolved
# per dialect. SQLite is permissive enough to accept almost anything; Postgres
# is not, and two spellings that work fine on SQLite are hard errors there:
#   * boolean defaults — SQLite stores 0/1, Postgres demands true/false
#   * DATETIME — not a Postgres type at all; the equivalent is TIMESTAMP
_DDL_TOKENS = {
    "sqlite": {"BOOL_FALSE": "BOOLEAN DEFAULT 0", "TIMESTAMP": "DATETIME"},
    "other": {"BOOL_FALSE": "BOOLEAN DEFAULT false", "TIMESTAMP": "TIMESTAMP"},
}


def _ddl(spec: str) -> str:
    tokens = _DDL_TOKENS["sqlite" if _is_sqlite else "other"]
    for token, rendered in tokens.items():
        spec = spec.replace(f"{{{token}}}", rendered)
    return spec


def _add_missing_columns(conn, inspector, table: str, new_columns: dict[str, str]) -> None:
    if table not in inspector.get_table_names():
        return
    existing_columns = {col["name"] for col in inspector.get_columns(table)}
    for name, ddl_type in new_columns.items():
        if name not in existing_columns:
            conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {name} {_ddl(ddl_type)}"))


def run_migrations() -> None:
    """Add any columns new model fields introduced that are missing from
    an existing (already created) table. create_all() only creates tables
    that don't exist yet, so this covers the upgrade path for databases
    created before those fields existed."""
    inspector = inspect(engine)
    with engine.begin() as conn:
        _add_missing_columns(conn, inspector, "users", {
            "is_verified": "{BOOL_FALSE}",
            "verification_token": "VARCHAR(255)",
            "verification_token_expires": "{TIMESTAMP}",
            "has_onboarded": "{BOOL_FALSE}",
        })
        _add_missing_columns(conn, inspector, "tracked_villagers", {
            "notes": "TEXT DEFAULT ''",
            "gift_1_given": "{BOOL_FALSE}",
            "gift_2_given": "{BOOL_FALSE}",
            "gift_3_given": "{BOOL_FALSE}",
            "hangout_role": "VARCHAR(30) DEFAULT ''",
        })
