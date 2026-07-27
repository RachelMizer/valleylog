from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.config import settings

connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}
engine = create_engine(settings.database_url, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def _add_missing_columns(conn, inspector, table: str, new_columns: dict[str, str]) -> None:
    if table not in inspector.get_table_names():
        return
    existing_columns = {col["name"] for col in inspector.get_columns(table)}
    for name, ddl_type in new_columns.items():
        if name not in existing_columns:
            conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {name} {ddl_type}"))


def run_migrations() -> None:
    """Add any columns new model fields introduced that are missing from
    an existing (already created) table. create_all() only creates tables
    that don't exist yet, so this covers the upgrade path for dev sqlite
    databases created before those fields existed."""
    inspector = inspect(engine)
    with engine.begin() as conn:
        _add_missing_columns(conn, inspector, "users", {
            "is_verified": "BOOLEAN DEFAULT 0",
            "verification_token": "VARCHAR(255)",
            "verification_token_expires": "DATETIME",
            "has_onboarded": "BOOLEAN DEFAULT 0",
        })
        _add_missing_columns(conn, inspector, "tracked_villagers", {
            "notes": "TEXT DEFAULT ''",
            "gift_1_given": "BOOLEAN DEFAULT 0",
            "gift_2_given": "BOOLEAN DEFAULT 0",
            "gift_3_given": "BOOLEAN DEFAULT 0",
            "hangout_role": "VARCHAR(30) DEFAULT ''",
        })
