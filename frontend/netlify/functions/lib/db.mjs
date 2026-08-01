// Database access and schema management.
//
// Uses node-postgres rather than @neondatabase/serverless. The Neon HTTP driver
// only speaks to Neon's own endpoint, which would make this code impossible to
// run against a local Postgres — and the Python backend it replaces was caught
// out twice by "works on SQLite, fails on Postgres" bugs precisely because it
// was hard to test against the real thing. `pg` talks ordinary Postgres, so the
// same code path runs against Docker locally and Netlify DB in production.

import pg from "pg";

import { HttpError } from "./http.mjs";

// Netlify DB injects NETLIFY_DATABASE_URL when a database is linked to the
// site. DATABASE_URL is the manual fallback (and what local tests set).
function connectionString() {
  return (
    process.env.NETLIFY_DATABASE_URL ||
    process.env.DATABASE_URL ||
    process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
    null
  );
}

let pool = null;

export function getPool() {
  if (pool) return pool;

  const url = connectionString();
  if (!url) {
    throw new HttpError(
      503,
      "Database is not configured: set NETLIFY_DATABASE_URL (or DATABASE_URL)"
    );
  }

  const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(url);

  pool = new pg.Pool({
    connectionString: url,
    // One connection per warm function instance. Lambda runs invocations one at
    // a time per container, so a larger pool would just hold idle connections
    // open against Neon's limit for no benefit.
    max: 1,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    // Neon terminates non-TLS connections. rejectUnauthorized is off because the
    // Lambda runtime's CA bundle doesn't always chain to Neon's issuer; the
    // connection is still encrypted, it just isn't certificate-pinned.
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });

  // A pool that emits 'error' with no listener takes the whole process down.
  // Neon drops idle connections when it suspends, which makes this a routine
  // event rather than an exceptional one.
  pool.on("error", (err) => {
    console.error("[db] idle client error:", err.message);
  });

  return pool;
}

export async function query(text, params = []) {
  const result = await getPool().query(text, params);
  return result.rows;
}

export async function queryOne(text, params = []) {
  const rows = await query(text, params);
  return rows[0] || null;
}

// `position` and `text` are both SQL keywords, so every reference to those
// columns is quoted. Postgres accepts them unquoted in some positions and not
// others, which is exactly the kind of thing that works in testing and fails
// on one specific query later.
const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(50) NOT NULL UNIQUE,
     email VARCHAR(255) NOT NULL UNIQUE,
     hashed_password VARCHAR(255) NOT NULL,
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
     is_verified BOOLEAN NOT NULL DEFAULT false,
     verification_token VARCHAR(255),
     verification_token_expires TIMESTAMPTZ,
     has_onboarded BOOLEAN NOT NULL DEFAULT false
   )`,
  `CREATE INDEX IF NOT EXISTS ix_users_username ON users (username)`,
  `CREATE INDEX IF NOT EXISTS ix_users_email ON users (email)`,

  // ON DELETE CASCADE is new. The SQLite database didn't enforce foreign keys
  // at all, so pruning accounts previously meant deleting dependent rows by
  // hand and hoping none were missed.
  `CREATE TABLE IF NOT EXISTS tracked_villagers (
     id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     name VARCHAR(100) NOT NULL,
     realm VARCHAR(150) NOT NULL DEFAULT '',
     emoji VARCHAR(10) NOT NULL DEFAULT '⭐',
     portrait VARCHAR(255),
     level INTEGER NOT NULL DEFAULT 1,
     gift_1 VARCHAR(200) NOT NULL DEFAULT '',
     gift_2 VARCHAR(200) NOT NULL DEFAULT '',
     gift_3 VARCHAR(200) NOT NULL DEFAULT '',
     gift_1_given BOOLEAN NOT NULL DEFAULT false,
     gift_2_given BOOLEAN NOT NULL DEFAULT false,
     gift_3_given BOOLEAN NOT NULL DEFAULT false,
     hangout_role VARCHAR(30) NOT NULL DEFAULT '',
     scramblecoin BOOLEAN NOT NULL DEFAULT false,
     discussion BOOLEAN NOT NULL DEFAULT false,
     "position" INTEGER NOT NULL DEFAULT 0,
     notes TEXT NOT NULL DEFAULT ''
   )`,
  `CREATE INDEX IF NOT EXISTS ix_tracked_villagers_user_id ON tracked_villagers (user_id)`,

  `CREATE TABLE IF NOT EXISTS tracked_tasks (
     id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     "text" VARCHAR(300) NOT NULL,
     category VARCHAR(20) NOT NULL DEFAULT 'Daily',
     done BOOLEAN NOT NULL DEFAULT false
   )`,
  `CREATE INDEX IF NOT EXISTS ix_tracked_tasks_user_id ON tracked_tasks (user_id)`,

  `CREATE TABLE IF NOT EXISTS recipe_progress (
     id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     name VARCHAR(150) NOT NULL,
     discovered BOOLEAN NOT NULL DEFAULT false,
     CONSTRAINT uq_recipe_progress_user_name UNIQUE (user_id, name)
   )`,
  `CREATE INDEX IF NOT EXISTS ix_recipe_progress_user_id ON recipe_progress (user_id)`,
];

let schemaPromise = null;

// Replaces the create_all() + run_migrations() the old FastAPI app ran on every
// boot. Every statement is IF NOT EXISTS, so it's idempotent and safe to run on
// each cold start; concurrent cold starts racing each other are fine too.
export function ensureSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      for (const statement of SCHEMA_STATEMENTS) {
        await query(statement);
      }
    })().catch((err) => {
      // Don't cache the failure — a database that was briefly unreachable would
      // otherwise stay "broken" for the life of the container.
      schemaPromise = null;
      throw err;
    });
  }
  return schemaPromise;
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
