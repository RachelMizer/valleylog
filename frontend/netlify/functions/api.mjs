// Valley Log API — a single Netlify Function serving every route.
//
// Replaces the FastAPI backend that used to live in backend/ and run on a
// separate host. One function rather than one-per-endpoint because they all
// share a database pool and a schema check: splitting them would multiply cold
// starts and open a connection per route for no benefit.
//
// Routing is explicit rather than file-based so that path order is visible —
// /villagers/new-day has to be matched before /villagers/:id, which is the kind
// of thing that silently breaks when a framework infers it.
//
// This directory sits under frontend/ because netlify.toml sets `base =
// "frontend"`, and Netlify resolves the functions directory relative to it.

import { ensureSchema } from "./lib/db.mjs";
import { HttpError, json } from "./lib/http.mjs";
import * as auth from "./routes/auth.mjs";
import * as recipes from "./routes/recipes.mjs";
import * as tasks from "./routes/tasks.mjs";
import * as villagers from "./routes/villagers.mjs";

// The function is reached at /api/* via the redirect in netlify.toml, but a
// direct hit on the raw function path should work too — it's what `netlify
// functions:invoke` and a lot of debugging does.
const PATH_PREFIXES = ["/.netlify/functions/api", "/api"];

function routePath(url) {
  let pathname = new URL(url).pathname;
  for (const prefix of PATH_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      pathname = pathname.slice(prefix.length);
      break;
    }
  }
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  return pathname || "/";
}

// A health check that needs the database can't distinguish "the function is
// down" from "the database is down", which is most of what a health check is
// for. The `true` flag marks routes that skip ensureSchema() and so answer even
// when nothing is configured.
function health() {
  return json({
    status: "ok",
    database_configured: Boolean(
      process.env.NETLIFY_DB_URL ||
        process.env.NETLIFY_DATABASE_URL ||
        process.env.DATABASE_URL ||
        process.env.NETLIFY_DATABASE_URL_UNPOOLED
    ),
    secret_key_configured: Boolean(process.env.SECRET_KEY),
  });
}

const ROUTES = [
  ["GET", /^\/health$/, health, true],

  ["POST", /^\/auth\/register$/, auth.register],
  ["POST", /^\/auth\/login$/, auth.login],
  ["GET", /^\/auth\/me$/, auth.me],
  ["POST", /^\/auth\/verify-email$/, auth.verifyEmail],
  ["POST", /^\/auth\/resend-verification$/, auth.resendVerification],
  ["POST", /^\/auth\/complete-onboarding$/, auth.completeOnboarding],
  ["POST", /^\/auth\/change-username$/, auth.changeUsername],
  ["POST", /^\/auth\/change-email$/, auth.changeEmail],
  ["POST", /^\/auth\/change-password$/, auth.changePassword],

  // Literal segments first: "new-day" would otherwise be tried against the
  // numeric :id patterns below.
  ["POST", /^\/villagers\/new-day$/, villagers.newDay],
  ["POST", /^\/villagers\/(\d+)\/reorder$/, villagers.reorder],
  ["GET", /^\/villagers$/, villagers.list],
  ["POST", /^\/villagers$/, villagers.add],
  ["DELETE", /^\/villagers$/, villagers.clear],
  ["PATCH", /^\/villagers\/(\d+)$/, villagers.update],
  ["DELETE", /^\/villagers\/(\d+)$/, villagers.remove],

  ["GET", /^\/tasks$/, tasks.list],
  ["POST", /^\/tasks$/, tasks.add],
  ["PATCH", /^\/tasks\/(\d+)$/, tasks.update],
  ["DELETE", /^\/tasks\/(\d+)$/, tasks.remove],

  ["GET", /^\/recipes\/progress$/, recipes.listProgress],
  ["POST", /^\/recipes\/progress$/, recipes.upsertProgress],
];

// The frontend is served from the same origin as this function, so CORS isn't
// involved at all in normal operation. It's honoured only if CORS_ORIGINS is
// explicitly set, which keeps the door open for a separately-hosted frontend.
function corsHeaders(req) {
  const configured = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  const origin = req.headers.get("origin");
  if (!origin || !configured.includes(origin)) return {};
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-credentials": "true",
    "access-control-allow-headers": "authorization, content-type",
    "access-control-allow-methods": "GET, POST, PATCH, DELETE, OPTIONS",
    vary: "Origin",
  };
}

function withHeaders(response, headers) {
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }
  return response;
}

export default async function handler(req) {
  const cors = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return withHeaders(new Response(null, { status: 204 }), cors);
  }

  const path = routePath(req.url);

  let pathMatched = false;
  for (const [method, pattern, handle, skipSchema] of ROUTES) {
    const match = pattern.exec(path);
    if (!match) continue;
    pathMatched = true;
    if (req.method !== method) continue;

    try {
      // Cheap after the first call — the promise is memoised — but it means a
      // brand-new database builds its own schema on the first request rather
      // than needing a migration step.
      if (!skipSchema) await ensureSchema();
      const id = match[1] ? Number(match[1]) : undefined;
      return withHeaders(await handle(req, id), cors);
    } catch (err) {
      if (err instanceof HttpError) {
        return withHeaders(json({ detail: err.detail }, err.status, err.headers), cors);
      }
      // Anything else is a bug or an outage. Log the detail for the function
      // log; don't leak internals to the client.
      console.error(`[api] ${req.method} ${path} failed:`, err);
      return withHeaders(json({ detail: "Internal server error" }, 500), cors);
    }
  }

  // Distinguishing 405 from 404 makes a wrong-verb mistake obvious instead of
  // looking like a missing route.
  const status = pathMatched ? 405 : 404;
  return withHeaders(
    json({ detail: pathMatched ? "Method not allowed" : "Not Found" }, status),
    cors
  );
}
