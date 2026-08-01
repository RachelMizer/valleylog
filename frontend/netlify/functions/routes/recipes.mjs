// /recipes/progress — a per-user "discovered" flag for recipes in the static
// catalog (frontend/src/data/recipes.json). The catalog itself isn't stored in
// the database; only the rows a user has actually toggled.

import { requireUser } from "../lib/auth.mjs";
import { query, queryOne } from "../lib/db.mjs";
import { json, readJson, requireFields } from "../lib/http.mjs";

export async function listProgress(req) {
  const user = await requireUser(req);
  return json(
    await query(`SELECT name, discovered FROM recipe_progress WHERE user_id = $1`, [
      user.id,
    ])
  );
}

export async function upsertProgress(req) {
  const user = await requireUser(req);
  const body = await readJson(req);
  requireFields(body, ["name"]);

  // The unique constraint on (user_id, name) is what makes this an upsert —
  // toggling the same recipe twice updates one row instead of adding a second.
  const row = await queryOne(
    `INSERT INTO recipe_progress (user_id, name, discovered)
     VALUES ($1, $2, $3)
     ON CONFLICT ON CONSTRAINT uq_recipe_progress_user_name
     DO UPDATE SET discovered = EXCLUDED.discovered
     RETURNING name, discovered`,
    [user.id, body.name, Boolean(body.discovered)]
  );
  return json(row);
}
