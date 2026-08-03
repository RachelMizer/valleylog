// /villagers — the tracked-villager list, ordered by an explicit position column.

import { requireUser } from "../lib/auth.mjs";
import { query, queryOne } from "../lib/db.mjs";
import { HttpError, json, noContent, pickProvided, readJson, requireFields } from "../lib/http.mjs";

const COLUMNS = `id, name, realm, emoji, portrait, level,
                 gift_1, gift_2, gift_3,
                 gift_1_given, gift_2_given, gift_3_given,
                 hangout_role, scramblecoin, discussion, "position", notes`;

const UPDATABLE = [
  "level",
  "gift_1",
  "gift_2",
  "gift_3",
  "gift_1_given",
  "gift_2_given",
  "gift_3_given",
  "hangout_role",
  "scramblecoin",
  "discussion",
  "notes",
];

function listForUser(userId) {
  return query(
    `SELECT ${COLUMNS} FROM tracked_villagers WHERE user_id = $1 ORDER BY "position", id`,
    [userId]
  );
}

async function ownedVillager(id, userId) {
  const villager = await queryOne(
    `SELECT ${COLUMNS} FROM tracked_villagers WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  if (!villager) {
    throw new HttpError(404, "Villager not found");
  }
  return villager;
}

export async function list(req) {
  const user = await requireUser(req);
  return json(await listForUser(user.id));
}

export async function add(req) {
  const user = await requireUser(req);
  const body = await readJson(req);
  requireFields(body, ["name"]);

  // New villagers land at the end of the list. This used to use COUNT(*) to
  // match the old backend, but a count reuses a position number after any
  // delete: drop the villager at position 1 of three and the next one added
  // gets position 2, colliding with whoever already holds it. Two villagers
  // sharing a position can't be reordered past each other, so max + 1 it is.
  const { next } = await queryOne(
    `SELECT COALESCE(MAX("position"), -1) + 1 AS next FROM tracked_villagers WHERE user_id = $1`,
    [user.id]
  );

  const villager = await queryOne(
    `INSERT INTO tracked_villagers (user_id, name, realm, emoji, portrait, "position")
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING ${COLUMNS}`,
    [user.id, body.name, body.realm || "", body.emoji || "⭐", body.portrait ?? null, next]
  );
  return json(villager, 201);
}

export async function update(req, id) {
  const user = await requireUser(req);
  await ownedVillager(id, user.id);

  const updates = pickProvided(await readJson(req), UPDATABLE);
  const fields = Object.keys(updates);
  if (fields.length === 0) {
    return json(await ownedVillager(id, user.id));
  }

  const assignments = fields.map((field, i) => `${field} = $${i + 1}`).join(", ");
  const values = fields.map((field) => updates[field]);

  const villager = await queryOne(
    `UPDATE tracked_villagers SET ${assignments}
      WHERE id = $${fields.length + 1} AND user_id = $${fields.length + 2}
      RETURNING ${COLUMNS}`,
    [...values, id, user.id]
  );
  return json(villager);
}

export async function remove(req, id) {
  const user = await requireUser(req);
  await ownedVillager(id, user.id);
  await query(`DELETE FROM tracked_villagers WHERE id = $1 AND user_id = $2`, [id, user.id]);
  return noContent();
}

export async function reorder(req, id) {
  const user = await requireUser(req);
  const body = await readJson(req);

  const villagers = await listForUser(user.id);
  const index = villagers.findIndex((v) => v.id === id);
  if (index === -1) {
    throw new HttpError(404, "Villager not found");
  }

  const swapWith = body.direction === "up" ? index - 1 : index + 1;
  // Moving the first villager up (or the last one down) is a no-op rather than
  // an error — the buttons stay live at the ends of the list.
  if (swapWith >= 0 && swapWith < villagers.length) {
    const order = villagers.map((v) => v.id);
    [order[index], order[swapWith]] = [order[swapWith], order[index]];
    // Renumber the whole list from its new order instead of swapping the two
    // stored position values. A pairwise swap does nothing at all when the two
    // rows happen to hold the same position — which any list predating the
    // max + 1 fix in add() can, and a list from before the column existed does
    // for every row at once, since they all defaulted to 0. Renumbering also
    // quietly repairs those rows the first time anything is moved.
    await query(
      `UPDATE tracked_villagers AS t
          SET "position" = new_order.ord::int
         FROM unnest($1::int[]) WITH ORDINALITY AS new_order(id, ord)
        WHERE t.id = new_order.id AND t.user_id = $2`,
      [order, user.id]
    );
  }

  return json(await listForUser(user.id));
}

export async function newDay(req) {
  const user = await requireUser(req);
  // hangout_role is a standing assignment, not daily state, so it survives.
  await query(
    `UPDATE tracked_villagers
        SET gift_1 = '', gift_2 = '', gift_3 = '',
            gift_1_given = false, gift_2_given = false, gift_3_given = false,
            scramblecoin = false, discussion = false
      WHERE user_id = $1`,
    [user.id]
  );
  return json(await listForUser(user.id));
}

export async function clear(req) {
  const user = await requireUser(req);
  await query(`DELETE FROM tracked_villagers WHERE user_id = $1`, [user.id]);
  return noContent();
}
