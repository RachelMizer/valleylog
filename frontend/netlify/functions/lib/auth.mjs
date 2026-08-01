// Password hashing, JWT issue/verify, and the "who is calling" lookup.

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

import { queryOne } from "./db.mjs";
import { HttpError } from "./http.mjs";

const ALGORITHM = "HS256";

// passlib's bcrypt default, kept identical so hashes from the old database
// stay verifiable if they're ever imported. (The cost is stored inside each
// hash, so verification of older hashes works regardless — this only sets the
// cost for newly created ones.)
const BCRYPT_ROUNDS = 12;

function secretKey() {
  const key = process.env.SECRET_KEY;
  if (!key) {
    throw new HttpError(503, "SECRET_KEY is not configured");
  }
  return new TextEncoder().encode(key);
}

function tokenTtlMinutes() {
  const raw = Number(process.env.ACCESS_TOKEN_EXPIRE_MINUTES);
  return Number.isFinite(raw) && raw > 0 ? raw : 60;
}

export function hashPassword(password) {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function createAccessToken(userId) {
  return new SignJWT({})
    .setProtectedHeader({ alg: ALGORITHM })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(`${tokenTtlMinutes()}m`)
    .sign(secretKey());
}

const CREDENTIALS_ERROR = () =>
  new HttpError(401, "Could not validate credentials", {
    "www-authenticate": "Bearer",
  });

export async function requireUser(req) {
  const header = req.headers.get("authorization") || "";
  const [scheme, token] = header.split(" ");
  if (!token || scheme.toLowerCase() !== "bearer") {
    throw CREDENTIALS_ERROR();
  }

  let payload;
  try {
    ({ payload } = await jwtVerify(token, secretKey(), {
      algorithms: [ALGORITHM],
    }));
  } catch {
    // Covers a bad signature, a malformed token, and expiry alike — the client
    // gets the same 401 either way, which is also what the old backend did.
    throw CREDENTIALS_ERROR();
  }

  const userId = Number(payload.sub);
  if (!Number.isInteger(userId)) {
    throw CREDENTIALS_ERROR();
  }

  const user = await queryOne(`SELECT * FROM users WHERE id = $1`, [userId]);
  if (!user) {
    throw CREDENTIALS_ERROR();
  }
  return user;
}

// The public shape of a user. hashed_password and verification_token exist on
// the row and must never reach the client, so this is an allowlist rather than
// a delete-the-secret-fields blocklist.
export function userRead(row) {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    created_at: row.created_at,
    is_verified: row.is_verified,
    has_onboarded: row.has_onboarded,
  };
}
