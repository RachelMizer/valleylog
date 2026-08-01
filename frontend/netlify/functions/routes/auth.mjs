// /auth/* — registration, login, email verification and account changes.

import crypto from "node:crypto";

import {
  createAccessToken,
  hashPassword,
  requireUser,
  userRead,
  verifyPassword,
} from "../lib/auth.mjs";
import { query, queryOne } from "../lib/db.mjs";
import { EmailNotConfigured, sendVerificationEmail } from "../lib/email.mjs";
import {
  HttpError,
  json,
  readForm,
  readJson,
  requireEmail,
  requireFields,
} from "../lib/http.mjs";

const VERIFICATION_TOKEN_TTL_HOURS = 24;

async function issueVerificationToken(userId) {
  // 32 random bytes, base64url — the same shape and entropy as the previous
  // secrets.token_urlsafe(32).
  const token = crypto.randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + VERIFICATION_TOKEN_TTL_HOURS * 3600_000);
  await query(
    `UPDATE users SET verification_token = $1, verification_token_expires = $2 WHERE id = $3`,
    [token, expires, userId]
  );
  return token;
}

// Registration and email changes shouldn't fail because the mail server is
// having a bad day — the account is already created, and the user can always
// ask for another link from the account page.
async function trySendVerification(email, token) {
  try {
    await sendVerificationEmail(email, token);
  } catch (err) {
    console.error(`[auth] Failed to send verification email to ${email}:`, err.message);
  }
}

export async function register(req) {
  const body = await readJson(req);
  requireFields(body, ["username", "email", "password"]);
  requireEmail(body.email);

  if (await queryOne(`SELECT id FROM users WHERE username = $1`, [body.username])) {
    throw new HttpError(400, "Username already registered");
  }
  if (await queryOne(`SELECT id FROM users WHERE email = $1`, [body.email])) {
    throw new HttpError(400, "Email already registered");
  }

  const hashed = await hashPassword(body.password);
  const user = await queryOne(
    `INSERT INTO users (username, email, hashed_password)
     VALUES ($1, $2, $3) RETURNING *`,
    [body.username, body.email, hashed]
  );

  const token = await issueVerificationToken(user.id);
  await trySendVerification(user.email, token);

  return json(userRead(user), 201);
}

export async function login(req) {
  const form = await readForm(req);
  const user = await queryOne(`SELECT * FROM users WHERE username = $1`, [
    form.username || "",
  ]);

  const ok = user && (await verifyPassword(form.password || "", user.hashed_password));
  if (!ok) {
    throw new HttpError(401, "Incorrect username or password", {
      "www-authenticate": "Bearer",
    });
  }

  return json({
    access_token: await createAccessToken(user.id),
    token_type: "bearer",
  });
}

export async function me(req) {
  return json(userRead(await requireUser(req)));
}

export async function verifyEmail(req) {
  const body = await readJson(req);
  requireFields(body, ["token"]);

  const user = await queryOne(`SELECT * FROM users WHERE verification_token = $1`, [
    body.token,
  ]);
  if (!user) {
    throw new HttpError(400, "Invalid or already-used verification link");
  }

  const expires = user.verification_token_expires;
  if (!expires || new Date(expires) < new Date()) {
    throw new HttpError(400, "Verification link has expired");
  }

  const updated = await queryOne(
    `UPDATE users
        SET is_verified = true, verification_token = NULL, verification_token_expires = NULL
      WHERE id = $1
      RETURNING *`,
    [user.id]
  );
  return json(userRead(updated));
}

export async function resendVerification(req) {
  const user = await requireUser(req);
  if (user.is_verified) {
    throw new HttpError(400, "Email is already verified");
  }

  const token = await issueVerificationToken(user.id);
  try {
    await sendVerificationEmail(user.email, token);
  } catch (err) {
    if (err instanceof EmailNotConfigured) {
      throw new HttpError(503, err.message);
    }
    throw new HttpError(502, `Failed to send email: ${err.message}`);
  }

  return json({ message: "Verification email sent" });
}

export async function completeOnboarding(req) {
  const user = await requireUser(req);
  const updated = await queryOne(
    `UPDATE users SET has_onboarded = true WHERE id = $1 RETURNING *`,
    [user.id]
  );
  return json(userRead(updated));
}

async function checkCurrentPassword(user, password) {
  if (!(await verifyPassword(password || "", user.hashed_password))) {
    throw new HttpError(400, "Current password is incorrect");
  }
}

export async function changeUsername(req) {
  const user = await requireUser(req);
  const body = await readJson(req);
  requireFields(body, ["new_username", "current_password"]);
  await checkCurrentPassword(user, body.current_password);

  if (
    body.new_username !== user.username &&
    (await queryOne(`SELECT id FROM users WHERE username = $1`, [body.new_username]))
  ) {
    throw new HttpError(400, "Username already taken");
  }

  const updated = await queryOne(
    `UPDATE users SET username = $1 WHERE id = $2 RETURNING *`,
    [body.new_username, user.id]
  );
  return json(userRead(updated));
}

export async function changeEmail(req) {
  const user = await requireUser(req);
  const body = await readJson(req);
  requireFields(body, ["new_email", "current_password"]);
  requireEmail(body.new_email);
  await checkCurrentPassword(user, body.current_password);

  if (
    body.new_email !== user.email &&
    (await queryOne(`SELECT id FROM users WHERE email = $1`, [body.new_email]))
  ) {
    throw new HttpError(400, "Email already registered");
  }

  // A new address is unverified until proven otherwise, so this deliberately
  // clears the flag even when the address turns out to be the current one.
  const updated = await queryOne(
    `UPDATE users SET email = $1, is_verified = false WHERE id = $2 RETURNING *`,
    [body.new_email, user.id]
  );

  const token = await issueVerificationToken(user.id);
  await trySendVerification(updated.email, token);

  return json(userRead(updated));
}

export async function changePassword(req) {
  const user = await requireUser(req);
  const body = await readJson(req);
  requireFields(body, ["current_password", "new_password"]);
  await checkCurrentPassword(user, body.current_password);

  await query(`UPDATE users SET hashed_password = $1 WHERE id = $2`, [
    await hashPassword(body.new_password),
    user.id,
  ]);
  return json({ message: "Password updated" });
}
