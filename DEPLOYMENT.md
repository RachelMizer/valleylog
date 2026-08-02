# Deployment

Everything runs on Netlify. One provider, one site, one deploy.

```
Netlify ── frontend (static build of frontend/)
        └─ API      (Netlify Function at /api/*)  ──▶  Netlify DB (Neon Postgres)
```

The API is a single Netlify Function in `frontend/netlify/functions/`, mapped to
`/api/*` by a redirect in `netlify.toml`. Because it's served from the same
origin as the app, there is no API host to configure and no CORS to get wrong.

> **History:** this used to be a Python/FastAPI backend on Render with a
> separate Neon database — three providers. It was rewritten as a Netlify
> Function on 2026-08-01. The Python source is in git history up to `eb5e222`,
> and a local archive (`backend-python-archive-*.tar.gz`, gitignored) holds the
> pieces git never tracked: `.env` and the SQLite files.

---

## 1. Database — Netlify DB

From the site dashboard, or the CLI:

```bash
netlify db init
```

That provisions a Neon Postgres instance and injects the connection string into
the function runtime automatically. Nothing to copy or paste.

> **The variable is `NETLIFY_DB_URL`.** Netlify's documentation, its CLI error
> messages, and the dashboard all refer to `NETLIFY_DATABASE_URL` — that name is
> never actually set. The function runtime gets `NETLIFY_DB_URL` and
> `NETLIFY_DB_DRIVER`. This cost an afternoon: the database was provisioned and
> healthy while the API returned 503 "not configured", and neither the dashboard
> env-var list nor `netlify env:list` shows the injected variable at all. It's
> only visible by reading `process.env` from inside a deployed function.

`lib/db.mjs` checks `NETLIFY_DB_URL` first, then `NETLIFY_DATABASE_URL` (in case
the documented name ever appears), then `DATABASE_URL` as a manual fallback for
bringing your own Postgres, then `NETLIFY_DATABASE_URL_UNPOOLED`.

Note also that `netlify db connect` talks to a **local PGlite database**, not
production — the CLI is dev-oriented and has read-only production access by
default. Don't use it to check live data.

**No migration step.** The schema builds itself: `ensureSchema()` runs on the
first request after a cold start, every statement is `IF NOT EXISTS`, and the
result is memoised for the life of the container. A brand-new database becomes
a working one on the first API call.

## 2. Environment variables

Set these under **Site configuration → Environment variables**:

| Variable | Required | Value |
| --- | --- | --- |
| `SECRET_KEY` | **yes** | A long random string. Signs the JWTs — changing it signs everyone out. |
| `FRONTEND_BASE_URL` | for email | `https://valley-log.netlify.app` — used to build the link in verification emails. |
| `SMTP_USERNAME` | for email | `valleylog.app@gmail.com` |
| `SMTP_PASSWORD` | for email | A Gmail **app password**, not the account password. |
| `SMTP_FROM_EMAIL` | no | Defaults to `SMTP_USERNAME`. |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | no | Defaults to 60. |
| `CORS_ORIGINS` | no | Only needed if a frontend on a *different* origin calls this API. Same-origin needs nothing. |

Generate a secret key with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Without `SECRET_KEY` the API returns 503 on every authenticated route.** It's
the one variable with no safe default.

Email is optional in practice. Registration catches and logs SMTP failures
rather than failing the signup, and login never checks `is_verified` — so a
missing SMTP config means "no verification email arrives", not "nobody can get
in". `/auth/resend-verification` is the exception and reports 503/502 honestly,
since the user explicitly asked for that mail.

## 3. Deploy

Push to `main`. Netlify builds `frontend/` (the base directory), publishes
`dist`, and bundles the function — one build, both halves.

Verify:

```bash
curl https://valley-log.netlify.app/api/health     # {"status":"ok"}
```

A 404 there means the redirect isn't matching; check that the `/api/*` rule in
`netlify.toml` still sits **above** the SPA catch-all. Netlify takes the first
matching rule, so a `/*` rule above it would return `index.html` and the app
would get HTML where it expected JSON.

---

## Local development

```bash
cd frontend
npm install
netlify dev          # Vite + the function on one origin, usually :8888
```

`netlify dev` serves the function at `/api/*` exactly as production does, so
the relative base URL in `src/api.js` works untouched. Leave `frontend/.env`
empty — a `VITE_API_BASE_URL` set there is inlined into the bundle at build
time, which is what previously shipped a public site telling every visitor's
browser to call `http://localhost:8000`.

For a local database, either use the Netlify DB instance (`netlify dev` injects
the same connection variables) or point `DATABASE_URL` at a container:

```bash
docker run -d --name vl-pg -e POSTGRES_PASSWORD=testpw -e POSTGRES_DB=valleylog \
  -p 55433:5432 postgres:16
export DATABASE_URL="postgres://postgres:testpw@localhost:55433/valleylog"
```

The schema creates itself on first request either way.

## API surface

23 routes, unchanged from the FastAPI version — the frontend needed no edits
beyond its base URL:

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/health` | |
| POST | `/auth/register` | JSON |
| POST | `/auth/login` | **form-encoded**, not JSON |
| GET | `/auth/me` | |
| POST | `/auth/verify-email` | |
| POST | `/auth/resend-verification` | |
| POST | `/auth/complete-onboarding` | |
| POST | `/auth/change-username`, `/auth/change-email`, `/auth/change-password` | |
| GET, POST, DELETE | `/villagers` | DELETE clears the whole list |
| PATCH, DELETE | `/villagers/:id` | |
| POST | `/villagers/:id/reorder` | `{"direction": "up"}` or `"down"` |
| POST | `/villagers/new-day` | Clears daily state, keeps `hangout_role` |
| GET, POST | `/tasks` — PATCH, DELETE on `/tasks/:id` | |
| GET, POST | `/recipes/progress` | POST upserts on (user, name) |

Errors are `{"detail": "..."}` with the original status codes, because
`src/api.js` reads `body.detail` to build the message shown to the user.
