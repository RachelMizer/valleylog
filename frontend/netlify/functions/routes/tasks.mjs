// /tasks — the checklist, ordered by insertion (id).

import { requireUser } from "../lib/auth.mjs";
import { query, queryOne } from "../lib/db.mjs";
import { HttpError, json, noContent, pickProvided, readJson, requireFields } from "../lib/http.mjs";

const COLUMNS = `id, "text", category, done`;
const UPDATABLE = ["text", "category", "done"];

async function ownedTask(id, userId) {
  const task = await queryOne(
    `SELECT ${COLUMNS} FROM tracked_tasks WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  if (!task) {
    throw new HttpError(404, "Task not found");
  }
  return task;
}

export async function list(req) {
  const user = await requireUser(req);
  return json(
    await query(`SELECT ${COLUMNS} FROM tracked_tasks WHERE user_id = $1 ORDER BY id`, [
      user.id,
    ])
  );
}

export async function add(req) {
  const user = await requireUser(req);
  const body = await readJson(req);
  requireFields(body, ["text"]);

  const task = await queryOne(
    `INSERT INTO tracked_tasks (user_id, "text", category)
     VALUES ($1, $2, $3) RETURNING ${COLUMNS}`,
    [user.id, body.text, body.category || "Daily"]
  );
  return json(task, 201);
}

export async function update(req, id) {
  const user = await requireUser(req);
  await ownedTask(id, user.id);

  const updates = pickProvided(await readJson(req), UPDATABLE);
  const fields = Object.keys(updates);
  if (fields.length === 0) {
    return json(await ownedTask(id, user.id));
  }

  // `text` is quoted here for the same reason it is in the schema — unquoted it
  // collides with the SQL keyword.
  const assignments = fields.map((field, i) => `"${field}" = $${i + 1}`).join(", ");
  const values = fields.map((field) => updates[field]);

  const task = await queryOne(
    `UPDATE tracked_tasks SET ${assignments}
      WHERE id = $${fields.length + 1} AND user_id = $${fields.length + 2}
      RETURNING ${COLUMNS}`,
    [...values, id, user.id]
  );
  return json(task);
}

export async function remove(req, id) {
  const user = await requireUser(req);
  await ownedTask(id, user.id);
  await query(`DELETE FROM tracked_tasks WHERE id = $1 AND user_id = $2`, [id, user.id]);
  return noContent();
}
