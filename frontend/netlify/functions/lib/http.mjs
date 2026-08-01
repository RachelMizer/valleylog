// Request/response helpers shared by every route.
//
// The error body shape is deliberately `{"detail": "..."}` — the same thing
// FastAPI produced, because frontend/src/api.js reads `body.detail` to build
// the message it shows the user. Changing it would silently degrade every
// error in the UI to a bare status line.

export class HttpError extends Error {
  constructor(status, detail, headers = {}) {
    super(detail);
    this.status = status;
    this.detail = detail;
    this.headers = headers;
  }
}

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

export function noContent() {
  return new Response(null, { status: 204 });
}

export async function readJson(req) {
  try {
    return await req.json();
  } catch {
    throw new HttpError(400, "Expected a JSON request body");
  }
}

// /auth/login is the one endpoint that takes form encoding rather than JSON:
// it replaces FastAPI's OAuth2PasswordRequestForm, and api.js still posts
// application/x-www-form-urlencoded to it.
export async function readForm(req) {
  const text = await req.text();
  return Object.fromEntries(new URLSearchParams(text));
}

export function requireFields(body, fields) {
  if (!body || typeof body !== "object") {
    throw new HttpError(422, "Expected a JSON object");
  }
  for (const field of fields) {
    const value = body[field];
    if (value === undefined || value === null || value === "") {
      throw new HttpError(422, `${field} is required`);
    }
  }
}

// Pydantic's EmailStr rejected malformed addresses before they ever reached the
// database. This is the deliberately-boring equivalent: enough to catch typos,
// not an attempt to implement RFC 5322.
const EMAIL_RE = /^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$/;

export function requireEmail(value) {
  if (typeof value !== "string" || !EMAIL_RE.test(value)) {
    throw new HttpError(422, "value is not a valid email address");
  }
  return value;
}

// Only the fields a client is allowed to set, and only the ones actually
// present — mirrors Pydantic's `exclude_unset`, so a PATCH that names one
// field doesn't blank the rest of the row.
export function pickProvided(body, allowed) {
  const out = {};
  for (const field of allowed) {
    if (body && Object.hasOwn(body, field) && body[field] !== undefined) {
      out[field] = body[field];
    }
  }
  return out;
}
