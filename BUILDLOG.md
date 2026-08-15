# Valley Log — Build Log

Tracks what gets worked on each session. Newest entries at the top.

---

## 2026-08-15

**Crafting table corrections: 3 rows dropped, 9 renamed, 51 images attached.**
All edits are in `frontend/src/data/crafting.json` (425 → 422 rows) plus the
PNGs copied from `dev/images/crafted/` into `frontend/public/images/crafted/`.

Dropped `Oswaldian Curved Trolley Tracks`, `Map`, and `Mossy Fallen Pillar`.
Renamed eight rows to their in-game names (`Pale Gray Gast Stove` → `Gas`,
`Tropical Companion` → `… Home`, `Barrel Fragment` → `Barrel Part`, and five
balloon arch/cluster colour names), plus one typo fix, `Pale Gray Flat-Stop
Stove` → `Flat-Top` — its siblings are all "Flat-Top" and the supplied image
filename confirms it.

**The rename list can collide with rows that already exist.** `Mossy Fallen
Pillar` → `Low Sculpted Pillar` was requested, but a `Low Sculpted Pillar` row
was already there with byte-identical materials (25 Soil, 50 Stone, 15 Clay).
Applied literally it would have produced two indistinguishable rows, so the two
were collapsed into one and the surviving row took the new artwork. Worth
asserting on before any future bulk rename — the table tolerates duplicate names
(it already carries two `Iron Ingot` and two `Yellow Light Low Beach Torch`
rows), so a collision fails silently rather than loudly.

**Four supplied filenames disagreed with the row names they belong to** — e.g.
`Oswaldian_Right-Curving_Trolley_Tracks.png` for the row named `Oswaldian Blend
Right Curving Trolley Tracks`, and three balloon items whose colour words are in
a different order (`Blue,_Yellow_and_Pink_…` vs `Pink, Yellow, and Blue …`).
Identity was confirmed off the materials lists, and those rows kept their
existing names — only the stove typo was corrected. The image-matching script
carries them as an explicit filename → row-name map rather than relying on
normalization.

**Two of the 53 requested images were not in `dev/images/crafted/`** —
`Leaf-Strewn_Path_with_Border.png` and `Tropical_Companion_Home.png`. Both rows
exist and both still have `"image": null`; only purple-swatch versions survive
in `dev/images/crafted_purple_removed/`, which were deliberately not reused.
Dropping the two files in and re-running the match is all that's left.

Verified by fetching all 366 image URLs off the dev server exactly as
`CraftingTab.jsx` builds them (`encodeURI("/" + r.image)`) — all 200/image/png.
That check matters here because 14 of the new filenames contain `,` or `&`, and
`encodeURI` escapes neither; both are legal in a URL path, so they serve fine.

`crafting.json` is CRLF — rewrite it as
`JSON.stringify(d, null, 2).replace(/\n/g, "\r\n") + "\r\n"` or the whole file
shows up as changed.

---

## 2026-08-05

**The Villagers tab is now "Friendships"**, and its panel header reads "Villager
Friendship Tracker". The tab tracks friendship levels, daily gifts and hangout
roles rather than the villager roster, so the old label undersold what it does.

Copy only — the tab `id` stayed `"villagers"`, so the `TABS` lookup, the
`activeTab` comparisons, `VillagersTab.jsx`, the `/villagers` routes and
everything already stored are untouched.

Worth knowing before the next rename: **a tab's user-facing name lives in three
places, not one.** `Home.jsx`'s `TABS` array drives both the button and the
panel header, but `Onboarding.jsx`'s `FEATURES` list and the "Looking for a
tab?" paragraph in `NotFound.jsx` also spell the tab names out as prose, and
neither reads from `TABS`. Both still said "Villagers" after the rename and were
updated by hand. Same three-file sweep applies to any future relabel.

---

## 2026-08-02

**Artwork and data pulled out of six wiki PDFs.** Every reference tab that
should have pictures now has them, and several long-standing data gaps closed.
Most of the session was spent learning — repeatedly, the hard way — how these
wiki-print PDFs actually lay out, so that section is first.

### How to parse these PDFs (read this before writing another extractor)

Every one of these is a printed wiki table, and they share the same traps. Each
lesson below cost a wrong result first.

- **Anchor rows on the Name column, not on the images.** The wiki lazy-loads
  sprites, and a row whose picture hadn't loaded (Coffee Beans, first on its
  page) has no image at all. An image-anchored pass drops that row silently and
  merges its data into a neighbour.
- **Assign a word to the last row that started at or before it**, rather than
  splitting on the midpoint between row starts. A narrow cell wraps onto more
  lines than the name does, so its final line ("Way" of "Wishing Way") sits past
  the midpoint and defects to the following row.
- **Stitch cells that run over a page break.** "Dark Chocolate Coffee Beans" is
  *one* crop whose name spans pages 1–2 — the original data was right and the
  "fix" was the bug. Pearly Barley's second biome sits alone atop page 3 with no
  name to anchor it. A continuation row has a name but no numeric columns.
- **Apply the soft mask.** `fitz.Pixmap(doc, xref)` alone drops the alpha and
  every sprite lands on a solid black square. `fitz.Pixmap(pix, fitz.Pixmap(doc,
  smask))` is what you want.
- **Text is drawn twice** in some captures (a shadow layer at ~0.5pt offset), so
  de-duplicate, and group words into visual lines *before* joining — sorting by
  y alone turned "None or White" into "White None or".
- **Exclude headers by position, not by matching header words**, wherever a data
  value could contain one. "Seed" and "Price" are column headers that also occur
  inside real seed names.
- **Line breaks do not delimit list items.** The crops biome column is narrow
  enough that every *word* wraps onto its own line, so "Wishblossom Ranch" +
  "Wishing Way" arrives as four lines. Split against a known vocabulary instead.
- **Some columns can't be parsed positionally at all.** A fish found in many
  places wraps into a list that overflows past the start of the next row —
  Anglerfish's "Sunlit Plateau" renders at y=191–203 while the Bass row *begins*
  at 191. Left those alone rather than guessing.

### Snippets

All 16 from `snippets.pdf` — name, family (Birds/Demons/Frogs), sell price,
catch locations, artwork. The 13 craftable ones now have images on the Crafting
tab, and `Red Brd Snippet` is corrected to `Red Bird Snippet`, both as a row and
where it appeared as a material. Creatures went 91 → 107 rows and gained Type
and Sell Price columns; snippets keep null favourite-food and schedule, because
they're caught rather than befriended.

*Note:* the PDF is page 2 of 3 of the source article, so other snippet families
may exist.

### Crops — 53 → 57, all with artwork

Five names were corrupted by the **earlier** extraction, which pulled the "Oil"
of a wrapped "Dairy and Oil" ingredient type into the name column: `Beans Oil`,
`Canola Oil`, `Chia Seeds Oil`, `Ruby Lentils Oil`, `Soya Oil`. Four crops were
missing outright (Cotton, Golden Pattypan, Parsnip, Pufflebud Pods) and 25 blank
cells filled — mostly waterings, plus the negative profits the old pass lost to
a Unicode minus. **No existing correct value changed.**

### Fish — 63 sprites

`Measuring-Tape Snail` is no longer unpriced: this newer capture has 100 / +400
/ White / Fish, confirmed against the raw page. That retires part of the "known
gap" recorded on 2026-07-27. Locations and the six Festive/event rows were
deliberately not rewritten (see the overflow trap above).

### Crafting — 52 → 244 of 425

From the rebuilt `crafting_recipes.pdf` (55 pages, 780 items indexed). Names
matched progressively — exact, then ignoring a `(Base)` suffix, then a trailing
Path/Road — with ambiguous keys dropped rather than guessed. The remaining 181
are genuinely absent from the PDF: 114 Furniture, 41 Functional Items, 20 paving
(mostly "… with Border" variants), and 6 Enchantments — the Snippet Catching and
Timebending manuals and the four "Even More Miraculous" tools all return zero
hits.

### Stall Wares — 87 → 111 rows, 97 with artwork

Images from `crop_seeds.pdf` for 52 seed rows, plus 21 rotating ingredients
reusing the crop artwork rather than shipping a second copy. All 52 stall prices
cross-checked against the PDF's buy price: **zero mismatches.**

Then the real gap: the **six DLC zones sold seeds but listed no rotating
ingredients at all**, because `dev/goofy_stall_items.txt` predates those realms.
24 rows added across Ancient's Landing, Glittering Dunes, Wild Tangle,
Everafter, Mythopia and The Bind.

**Those 24 are derived, not sourced.** Two rules were validated against all 21
existing rotating rows before generating anything:

```
price = ceil(crop sell price * 1.5)     21/21 exact
zone  = one of the crop's native biomes 21/21
```

Worth spot-checking against a real listing if one ever turns up — Pineapple at
798 is the largest extrapolation.

**Also a genuine cross-file bug:** `vendor.json` was the only data file writing
"Ancient's Landing" with a curly apostrophe. It silently failed to match the
same zone in `crops.json` and `gems.json`, which is why that zone appeared to
have no native crops. Normalised to the straight form.

### Smaller fixes

- **A 404 page.** `netlify.toml` rewrites every unknown path to `index.html`, so
  a wrong address reached React Router, matched no route, and rendered an empty
  `<main>` — a blank page. Added a public catch-all explaining that the tabs
  live on the main page rather than at their own addresses.
- **Cooking tab:** the "Dish" header is gone (unsortable and self-explanatory)
  and dish thumbnails went 44 → 52px via a `.table-thumb-lg` modifier, so the
  Crafting and Gems tabs that share `.table-thumb` are unaffected.
- **Pure Ice's gem image** was a screenshot that captured IGN's site chrome —
  "Guide Checklists" and the logo were visible in the table. Replaced from
  `gems.pdf`. The other 50 gem images are screenshots too, but correctly
  cropped, so they were left alone.

### Pick up here next session

- **181 crafting rows still have no image**, and this PDF doesn't contain them.
- **Six stall items are filed as `itemType: "Seed"` but aren't seeds** — Plain
  Yogurt, Ambrosia, Elysian Grain, Golden Apple, Flyleaf Feta, Shovel Bird Eggs.
  Looks like a mislabel.
- **Six seeds are sold at Goofy's *Caravan***, a vendor `vendor.json` doesn't
  have at all (Beetroot, Dark Chocolate Coffee Bean, Fairy Kamut, Lollipop
  Fruit, Pearly Barley, Scarlet Kale). Blocked on a zone/realm decision, and
  `VendorTab.jsx` calls `r.zone.toLowerCase()` with no null guard, so a row
  without a zone would crash the tab. Dill and Fairy Sprinkle seeds are foraged
  rather than sold.
- 14 stall rows have no artwork: 8 foraged fruits (not crops, so absent from the
  seed PDF) and the 6 non-seed items above.
- The tabs still aren't URL-addressable — `Home.jsx` keeps the selection in
  `useState`, so nothing is linkable, refresh always lands on Villagers, and
  back leaves the app. Roughly 20 lines to fix, and the 404 copy would need
  updating alongside it.
- Verification email has still never been confirmed to actually arrive.

---

## 2026-08-01

**The backend was rewritten as a Netlify Function and the site is finally
live.** Login works, the database is real, and the three-provider plan from
2026-07-27 is gone. Full write-up in the rewritten `DEPLOYMENT.md`.

### Why the live site said "failed to fetch"

Not a bug — there was simply no API. `VITE_API_BASE_URL` was never set in
Netlify, so the published bundle had `http://localhost:8000` inlined into it,
which in a visitor's browser means *their own machine*. Confirmed rather than
assumed by pulling the deployed bundle and grepping it. The Render service the
old plan depended on had never been created.

### Netlify only, by rewrite rather than by configuration

Netlify can't run a Python ASGI process, so "make it work on Netlify" meant
rewriting, not reconfiguring. 959 lines of FastAPI across 22 endpoints became a
single Netlify Function in `frontend/netlify/functions/` — `lib/` and `routes/`
mirroring the old `app/` layout. It sits under `frontend/` because
`netlify.toml` sets `base = "frontend"` and the functions directory resolves
relative to that.

All 23 routes kept their paths, status codes and `{"detail": ...}` error shape,
so the frontend changed one line: the base URL is now `/api`, relative. That
deletes CORS from the picture entirely and makes it structurally impossible to
ship a bundle pointing at the visitor's own machine again.

Deliberate choices:

- **node-postgres, not the Neon HTTP driver.** The Neon driver only talks to
  Neon's endpoint, which would make local testing impossible — and the Python
  version shipped two Postgres-only bugs for exactly that reason. `pg` runs
  unchanged against a Docker container and against Netlify DB.
- **`ensureSchema()` replaces `create_all()` + `run_migrations()`.** Every
  statement is `IF NOT EXISTS`, memoised per container, so a fresh database
  builds itself on the first request. No migration step exists to forget.
- **Foreign keys are now `ON DELETE CASCADE`**, since SQLite never enforced
  them and pruning accounts previously meant deleting dependents by hand.
- `position` and `text` are quoted everywhere — both are SQL keywords Postgres
  accepts in some positions and not others.

Verified against real Postgres 16 in Docker before pushing: **63 assertions**
covering auth, per-user isolation, ordering and reorder no-ops, `new-day`
clearing daily state while keeping `hangout_role`, recipe upserts, token
expiry, and 404-vs-405 routing. Then a second cold start to prove the schema is
idempotent.

### `NETLIFY_DB_URL` — the afternoon-eater

**Netlify DB injects `NETLIFY_DB_URL`. Its own documentation, its CLI error
messages and its dashboard all say `NETLIFY_DATABASE_URL`, which is never
set.** The database was provisioned and healthy for well over an hour while the
API returned 503 "database is not configured", because it was reading a
variable that did not exist.

What made it expensive is that the injected variable is invisible everywhere
you'd look: not in `netlify env:list`, not in the `getEnvVars` API, not in the
dashboard's environment-variable page (checked directly by driving the logged-in
browser over CDP). It is only observable by listing `process.env` from inside a
*deployed* function, which is what finally settled it. `lib/db.mjs` now accepts
both spellings.

Related trap: **`netlify db connect` talks to a local PGlite database**, not
production — it reported `postgres://localhost:59098`. Don't use it to inspect
live data.

### Two near-misses worth remembering

- **The archive was nearly committable.** `backend-python-archive-*.tar.gz`
  holds `backend/.env` (real `SECRET_KEY`, Gmail app password) and all four
  SQLite files. In a public repo. Gitignored by explicit pattern and verified
  with `git check-ignore` before each commit — the same class of mistake as the
  `*.db` glob that missed `valleylog.db.bak` last time.
- **`frontend/.env` silently overrode the fix.** After repointing `api.js` at
  `/api`, the rebuilt bundle came out with a byte-identical hash to the
  deployed one, because `.env` still pinned `VITE_API_BASE_URL=http://localhost:8000`
  and Vite inlines it at build time. An identical hash after a real source
  change is the tell. Cleared it; `.env.example` now explains why it should
  stay empty.
- Also: the first `netlify env:set` **echoed the generated `SECRET_KEY` into
  the terminal**. It was rotated immediately, before any JWT had been issued.
  Suppress output when setting secrets.

### Also this session

- **Verification email logo path** was wrong (`frontend/public/` instead of
  `frontend/public/images/`); the `.exists()` guard meant it silently shipped a
  broken image in every email.
- **`/health` no longer requires the database**, so it can distinguish "function
  down" from "database down" — a flaw flagged and then immediately suffered.
- **Friendship badge fix.** `.level-badge` sat in a flex row with default
  `flex-shrink: 1`, so the slider held its width and the badge was compressed to
  its 2.2em `min-width` — measured live at 29px against ~43px needed for
  "8/10" — and the text spilled outside the pill. `flex-shrink: 0` plus a
  `min-width` sized for "10/10" so it doesn't resize under the cursor.
- **All 480 recipes marked discovered** for `rmizer` via the live API, driven
  from inside the logged-in browser so no token was handled outside it. 480/480,
  zero failures, verified by reading progress back.
- **Recipe progress is now labelled "Cooked"** rather than "Discovered" — column
  header, toggle button, and the home/onboarding copy. The API field and
  database column stay `discovered`; renaming those would need a migration to
  change a word nobody sees.
- Removed the `planets`/drizzle scaffolding `netlify db init` dumped into the
  project; the API manages its own schema.

### State

Live at `https://valley-log.netlify.app`. `SECRET_KEY`, `FRONTEND_BASE_URL` and
the three `SMTP_*` values are set on the site, scoped to functions. The Python
source is in history at `eb5e222`.

**Not carried over:** the original `rmizer` account's 3 tracked villagers and
478 recipe-progress rows stayed behind — starting fresh was chosen
deliberately, and `migrate_sqlite_to_postgres.py` refused non-empty targets
anyway. The account was recreated on the live site with the same username.

**Open threads:**
- Verification email hasn't been confirmed to actually arrive; SMTP is set but
  untested end-to-end, and Netlify Functions may block outbound SMTP.
- `react-router` has two high-severity advisories (RSC-mode CSRF; this app
  doesn't use RSC mode). `npm audit fix --force` wants a breaking major bump.
- The archive is the only copy of the old `.env` and SQLite data, on one
  machine. It should be copied somewhere off that laptop.

---

## 2026-07-31

**Creature spawn times landed, and the Creatures tab learned about "today."**
Committed and pushed as `3c3191d`.

### Creature schedules

`creatures.json` had `timesAvailable: null` on every row — the first item on last
session's *data still owed* list. Each of the 91 creatures now carries a
`schedule` object keyed `sun`–`sat` alongside the human-readable
`timesAvailable` summary string, so the data is machine-readable per day instead
of only displayable.

- 76 rows have at least one window; 13 are out every day.
- 15 remain all-null (the hedgehogs, Patterned Skunk, the Sweet Bees and
  friends) — no times were listed for them, so they're not-yet-known rather
  than confirmed-never.

Keeping both shapes is deliberate: the summary is what reads well in a cell
(`"Sun: 12 AM to 12 PM · Mon, Wed, Fri: All day"`), the map is what the filter
can actually query.

### Creatures tab

Added a **Today (<weekday>)** column and a "only show creatures out on
<weekday>" checkbox. `new Date().getDay()` indexes the schedule keys, so the
column header and the filter label both name the real weekday. The checkbox
composes with the existing search rather than replacing it. Reused the
`filter-row` / `filter-checkbox` / `filter-label` classes already in
`index.css` and already used by the Vendor, Crops, Crafting and Recipes tabs —
no new styling.

### Deployment status: still nothing live

Checked while looking into a login failure, and last session's critical path is
untouched:

- `https://valleylog-api.onrender.com/health` returns `x-render-routing:
  no-server` — **no Render service exists**, so the API isn't deployed.
- Neither local process was running either (ports 8000 and 8765 both refused).
- The account is fine and was never the problem: `rmizer` /
  `rei.mizer@gmail.com`, `is_verified=1`, `has_onboarded=1`, 3 tracked
  villagers, intact bcrypt hash — in the **local SQLite** file. The 43 pruned
  test accounts still live in `valleylog.db.bak`.

So a login attempt currently fails at the network layer, before any password is
ever checked, in both environments. Steps 1–4 in the previous entry (Neon →
Render → migrate → `VITE_API_BASE_URL` + redeploy) are still the whole job, and
step 3 matters here specifically: until the migration script runs, a deployed
Postgres has **zero** users, so even a working API would reject the real
credentials.

### Pick up here next session

- The deployment click-ops, unchanged from below.
- Creature images (`images/creatures` still doesn't exist) and the image column
  the Creatures tab wants, plus times for the 15 unknown creatures.

---

## 2026-07-27 (3)

**Published to GitHub, wired up Netlify, and made the backend Postgres-ready.**
Full deployment write-up in `DEPLOYMENT.md`.

### Version control

Repo is `github.com/RachelMizer/valleylog`, **public**. Four commits pushed: app
code + datasets, 643 images, `netlify.toml`, and the Postgres work.

**`.gitignore` had a real leak.** It listed `*.db`, which does **not** match
`valleylog.db.bak` — both DB backups were staged for a public repo, containing a
real account's email and bcrypt hash. Added `*.db.*`, `*.sqlite*`, `*.log`, and
`bridge/loc_extracted/` + `bridge/loc_dict.json` (15,640 dialogue files and a
2.6MB string dump, recreatable from the game install, same category as `dev/`).
**Check what a glob actually matches before trusting it.**

Also caught before committing: `frontend/public/images/ingredients/` held 16
files from the incomplete first extraction pass. Deleted rather than committed —
the real 126 live in `dev/images/ingredients/`.

### Why the live site showed nothing new

Netlify had no build config, so it published the **repo root** — the original
static prototype. The React app in `frontend/` was never being built. Added
`netlify.toml` (base `frontend`, publish `dist`, Node 22, SPA rewrite).

### Hosting: the constraint that decided the architecture

**Netlify cannot host this backend, and Netlify DB cannot serve it.** Netlify's
compute is JS/TS and Go functions — no Python ASGI runtime. And Netlify DB,
despite being Postgres (Neon), documents its access surface as *Functions, Edge
Functions, Builds, and Agent Runners*, with production deploys the only context
permitted to reach the main database. An external service isn't a deploy
context. Its client is npm-only and it applies migrations during the deploy
lifecycle, which would collide with `run_migrations()`.

Settled on: **Netlify** frontend, **Render** API, **Neon direct** (not via
Netlify) for a plain `DATABASE_URL`.

### Three Postgres landmines, all silent on SQLite

- `run_migrations()` emitted `BOOLEAN DEFAULT 0` and `DATETIME` in hand-written
  DDL. SQLite accepts both; **Postgres rejects `0` as a boolean and has no
  `DATETIME` type.** Specs are now portable tokens resolved per dialect.
- No Postgres driver — added `psycopg[binary]`.
- Neon suspends when idle and drops pooled connections, which surfaces as
  intermittent *"server closed the connection"*. Added `pool_pre_ping` and
  `pool_recycle=300`.

`scripts/migrate_sqlite_to_postgres.py` handles what a naive row copy gets
wrong: SQLite's 0/1 booleans and text timestamps, `users.created_at` being NOT
NULL with only a **Python-side** default (a raw-SQL insert fails outright — found
by hitting it), and advancing identity sequences after inserting explicit ids,
without which the next signup collides on the primary key. Dry-run by default;
refuses a non-empty target.

**Verified against real Postgres 16 in Docker**, not just compiled DDL: fresh
boot, repeated migration runs, a simulated legacy upgrade (dropping columns and
re-adding them), ORM read/write, and a full copy of the live database — 1 user,
3 villagers, 478 recipe rows — with zero field-level differences and a working
post-migration signup. SQLite retested separately and unaffected.

*Testing note:* a first attempt used `sqlite:////tmp/…`, which on Windows
resolves to the drive root and silently created an **empty** database, so the
test passed against no data. Assert your fixture actually loaded before trusting
a green result.

### Also this session

Sticky footer with public Help and Legal pages (contact
`valleylog.app@gmail.com`; Disney disclaimer with takedown contact, remaining
code and design copyright Iconic Arts). Favicon generated from
`dev/images/profpic.png` at multiple resolutions. Pruned 43 dummy accounts from
the local DB, keeping the real one — dependents deleted explicitly, since SQLite
doesn't enforce foreign keys by default.

### Pick up here next session

**Critical path — nothing is live until this is done.** The API isn't deployed,
so `VITE_API_BASE_URL` still resolves to `localhost:8000` and everything behind
login fails on the public site. All code-side work is finished and verified;
what remains is click-ops, walked through in `DEPLOYMENT.md`:

1. Create the Neon database. **Rewrite the scheme to `postgresql+psycopg://`** —
   Neon hands out `postgresql://`, which makes SQLAlchemy reach for `psycopg2`
   (not installed) and fail at startup. Keep `?sslmode=require`.
2. Create the Render service from `backend/render.yaml`; set `DATABASE_URL`,
   `CORS_ORIGINS`, `FRONTEND_BASE_URL`, and the three `SMTP_*` values.
3. Run `scripts/migrate_sqlite_to_postgres.py --write` to move the account,
   3 villagers and 478 recipe rows across.
4. Set `VITE_API_BASE_URL` in Netlify and **redeploy** — Vite inlines it at
   build time, so saving the variable alone changes nothing.

*Fallback if hosting the API stops being worth it:* drop `ProtectedRoute` from
`Home` and the seven reference tabs work publicly with no server at all. Only
Villagers and Tasks actually need the backend.

**Data still owed by the user:**
- Critter spawn times/days — `timesAvailable` is null on all 90 rows.
- Creature images; no `images/creatures` folder exists yet. Once they land the
  Creatures tab wants an image column like Cooking and Crafting.
- Transparent-background replacements for 385 crafting icons. The originals are
  parked in `dev/images/crafted_purple_removed/`, not deleted. ~5 of those were
  legitimate texture tiles (e.g. `Gold_Bumblestone_Path`) caught as collateral
  and can just be moved back.
- A stall-wares source covering Wishblossom, Honeyglow Woods, Glamour Gulch and
  Pixie Acres. `goofy_stall_items.txt` predates those realms — confirmed by grep,
  nothing was lost in extraction. Check whether any new source lists base prices
  or post-discount ones before merging with the existing 87.

**Known gaps, deliberately left:**
- 7 fish have no sell price (`Measuring-Tape Snail` plus the six Festive/event
  catches). Real entries, not artifacts — the event sub-table they came from
  likely never listed prices.
- 126 ingredient images sit in `dev/images/ingredients/` with no Ingredients tab
  and nothing referencing them. The tab data (zones, grow time, yield, price,
  energy) is cleanly extractable from `dev/ingredients.pdf` whenever wanted.
- `recipes.json` gave up three genuine extraction bugs from spot-checks alone; a
  full re-verification of all 480 against `dev/cooking_recipes.pdf` was never
  done and is probably overdue.
- `images/villagers/Tramp.png` is unreferenced — the pre-existing "Lady Tramp"
  single-roster-entry case, which uses `Lady.png`.
- The root static app (`index.html` / `app.js` / `data.js`) is superseded and its
  image paths point at a `dev/` location that no longer exists. Still committed;
  worth deleting or repointing at some point.

**Operational notes:**
- Render's free tier sleeps after ~15 minutes idle; the first request then takes
  30–60s. Data is unaffected since it lives in Neon.
- Run the backend with `--reload` during dev. A stale process was the cause of
  the "villager info isn't saving" report — it was serving day-old code that
  silently ignored the new fields.

---

## 2026-07-27 (2)

**Creatures tab rebuilt from `dev/creature_guide.pdf` (90 critters), villager cards gained
per-gift ticks and a hangout-bonus dropdown, crafting swatch images pulled, plus UI fixes.**

### Creatures: 41 → 90, all with zone + favorite food

`creatures.json` is now sourced entirely from the guide PDF rather than the game's
`Companion.json`. Shape: `{name, locationOrigin, favoriteFood, timesAvailable, emoji}`.

**I shipped a wrong count first and the user caught it.** The initial pass returned 41 critters
because I hardcoded the column signature `[134, 282, 344, 402, 477]` observed on page 0 — but the
guide shifts its table geometry **five times** across the document, so pages 14-32 matched nothing
and were silently skipped, losing Monkey, Capybara, Cobra, Dragon, Owl, Pegasus, Geese, Skunk and
Hedgehog entirely. The ingredients PDF taught this exact lesson earlier the same day and it was
written down; hardcoding still happened. **Derive geometry per rule, and always verify coverage
across every page before believing a count.** A cheap check that would have caught it: assert that
extracted rows are spread over the whole page range.

Four further traps in this one document, each of which silently corrupts data rather than erroring:

- **Column *order* changes, not just position.** Pages 0-13 are `Critter | Favorite Food |
  Locations`; every DLC block is `Critter | Locations | Favorite Food`. Positional reads put
  "Banana Split" in the location column and "The Ruins" in food. Fixed by resolving column meaning
  from each table's own header row. Note the header labels on page 0 do *not* align over their own
  columns, and the "Critter Icon" header has no icon column beneath it — so headers are usable for
  *naming* columns but not for locating them.
- **Section dividers can look like column headers.** "All Raccoon Variants - Favorite Foods"
  contains "Favorite Food", so it was parsed as a column header, overwriting the role map with
  garbage and dropping every Raccoon row. Section dividers must be tested *first*.
- **Hedgehogs have no section divider at all** — they're identifiable only by their `Hedgehog Name`
  column header, so the section name is also derived from that header.
- **Multi-value cells.** Two foods or several zones per cell are usually separated by a blank line
  (gap > 1.6× the ~11.5pt line pitch), which splits Hedgehogs' `Pufflebud Pods, Golden Honey`
  correctly. But Skunks' `Pincushion Peach` / `Button Mushroom` render at uniform pitch with no
  gap, so geometry can't split them. Resolved with the closed-vocabulary trick from the fishing
  extraction: the 126 ingredient names in `dev/images/ingredients` are matched against the string,
  and it only splits when the *whole* text decomposes into 2+ known ingredients — leaving "Any
  Green or Yellow Flowers", "Banana Split" and "Magma and Pure Ice" untouched.
- **Dash handling is two different cases.** `Hundred-` + `Acre Fields` is a mid-word wrap and must
  glue with no space; `Wishblossom Ranch -` + `Wishing Alps` ends in a *standalone* dash separating
  zone from region and must keep its spaces. Distinguished by whether the dash is attached to a
  word.

All 8 base-game zone names inferred last session (`Urban`→Plaza, `Wetlands`→Glade of Trust, etc.)
came back **confirmed** by the guide — zero corrections.

Emoji now come from the animal type (the PDF section), not from `known_critters.json`, whose values
were family-derived and therefore nonsense once families were dropped: DLC critters carried 🏝️/📖/⛰️
and foxes carried 🏔️. Per user request the emoji is no longer *rendered* on Creatures or Cooking —
images are coming — but the field is kept as a fallback, the same way `VillagerCard` falls back to
emoji when a portrait is missing.

### Villager cards: per-gift ticks + hangout bonus

Some players hand over the three daily favourites one at a time, so each gift input now has a
checkbox beside it (`gift_1_given`…`gift_3_given`), disabled until that gift has a name, and the
input renders struck-through once ticked. Plus a `hangout_role` dropdown for the in-game gathering
bonus: Digging, Fishing, Foraging, Gardening, Mining, Timebending.

The ticks are **daily state and are cleared by `/new-day`; the hangout role is a standing
assignment and deliberately isn't.** Verified end-to-end against the running API with a
directly-minted token: fields default correctly, PATCH persists, and `/new-day` clears the ticks
while keeping the role. Columns were added via the existing `_add_missing_columns` helper in
`database.py` and confirmed applied to the live 7-villager DB (backup at `valleylog.db.bak2`).

### Crafting images: swatch cards removed

385 of the 424 extracted crafted icons were "swatch cards" — the item on a solid coloured
background with its name baked into a caption bar — leaving 39 clean white-background icons.
`crafting.json` had those 385 `image` fields set to null.

**Hue-based detection failed repeatedly and is worth not retrying.** The swatch colour ranges from
pale lavender through mid periwinkle to dark navy to pink, so every threshold leaked: a `b - g > 15`
test missed `Stellar_Pink_DJ_Booth` (155,141,156), and a `b >= 145` test missed
`Blue_Balloon_Arch` (73,85,136). Image width was no better — swatch cards exist at every size from
94px to 270px. The rule that actually holds is simply *keep only images whose sampled background is
pale* (`min channel > 200`). Collateral: ~5 legitimate path/texture tiles (e.g.
`Gold_Bumblestone_Path`) fill their frame with a mid-tone texture and were removed too.
**Removed files were moved to `dev/images/crafted_purple_removed/`, not deleted** — restoring any
of those tiles is a file move plus re-setting its `image` field.

### Stall Wares tab populated (87 items)

Last placeholder tab is now live. Source is `dev/goofy_stall_items.txt` (a .txt, not a PDF), but
the data was ported from the **already-parsed `KNOWN_VENDOR_ITEMS` in the old static `data.js`**,
which carries richer fields than the raw file — `vendor, name, itemType, zone, realm, price`.

Rather than trust that port, it was **cross-verified line-for-line against the source txt**: an
independent re-parse of the markdown produced the same 87 items, same names, same zones, and zero
price differences. The only discrepancy was a label — `data.js` shortened the source's "Rotating
Ingredients" to "Ingredient"; the source wording was kept since it conveys that stock rotates.

`VendorTab.jsx` uses the standard `DataTable` pattern with search plus item-type and realm filter
checkboxes. Two details worth knowing:

- **Row keys must include the zone.** Six seeds (Wheat, Corn, Tomato, Canola, Potato, Chili Pepper)
  are sold in two different zones, so name alone collides.
- **The Vendor column is hidden while only one vendor exists** and appears automatically once a
  second is added — the React equivalent of the old static app's "sectioning driven purely by the
  `vendor` field" behaviour, without needing a grouped-table component.

Coverage: 58 seeds / 29 rotating ingredients, across 13 zones and 3 realms (51 base game, 18
Eternity Isle, 18 Storybook Vale), prices 1–996 Coins.

### UI fixes

- **Per-page headers on all nine tabs.** Each page now opens with a title and a one-paragraph
  statement of purpose. Driven by `title`/`blurb` fields on the `TABS` table in `Home.jsx` and
  rendered once from a single `.panel-header` block, so the pages stay visually identical and the
  copy lives in one place rather than each tab component growing its own heading. Titles differ
  from tab labels where that reads better (Tasks → "Task Manager", Creatures → "Critters &
  Creatures"). Deliberately no item counts in the copy — they'd go stale as datasets grow.
- **Tab hover was painting dark over the label.** Root cause was specificity, not colour: the
  generic `button:hover:not(:disabled)` rule (0,2,1) outranks `.tab-btn:hover` (0,2,0), so
  `--accent-hover` won and the intended light hover never applied. Fixed by matching specificity
  (`button.tab-btn:hover:not(:disabled)`) — the same cascade trap as the earlier
  `button.btn-compact` fix. Hover is now one step darker than the resting tab.
- Gems & Minerals icons moved from `.table-icon` (1.6rem) to `.table-thumb` (2.75rem). The old
  1.3/1.6rem sizing dated from a pixelation report, but the sources are 187px wide so there was
  plenty of headroom.
- "Recipes" tab renamed **Cooking**; Crafting moved next to it.

**Open threads:**
- `timesAvailable` is empty on all 90 critters — still waiting on spawn times/days.
- Creature images not yet sourced (user is handling); once they exist the Creatures tab wants an
  image column like Cooking/Crafting.
- 385 crafting images need transparent-background replacements (user is handling).
- Two cosmetic leftovers: `Raven` family had 2 non-raven members before families were dropped, and
  the `Frog` family was never folded into `Snippet` — both moot now that `family` is gone.

---

## 2026-07-27

**Consolidated all image assets under one `images/` tree, added dish photos to the cooking
table, and built the Crafting tab from `dev/crafting_recipes.pdf`.**

*(Note: the 07-25/07-26 React + FastAPI rewrite — `frontend/` Vite app, `backend/` FastAPI +
SQLite with auth — was never logged. The root-level `index.html`/`app.js`/`data.js` static app
is now superseded; its `portrait`/`icon` paths still point at the old `dev/cooking-recipes-images/`
location and were deliberately left alone rather than repointed at `frontend/public/`.)*

- **Image reorganization.** User moved everything into `dev/images/{dishes,gems,villagers,crafted}`.
  Mirrored that into `frontend/public/images/{dishes,gems,villagers,crafted}`, replacing the old
  flat `public/gem_icons/` + `public/portraits/` folders, and moved the logo in too
  (`NavBar.jsx` updated). Rewrote the path fields in `gems.json` (51 icons) and `villagers.json`
  (71 portraits).
  The non-obvious part: **portrait paths are also persisted per-user in SQLite**
  (`tracked_villagers.portrait`), so the JSON rewrite alone would have left already-tracked
  villagers with broken images — migrated those 7 rows with a `substr()` UPDATE (DB backed up to
  `valleylog.db.bak` first).
  Dish PNGs were nested a level deeper than expected (`dev/images/dishes/dishes/`, alongside a
  `dishes/images/` folder of PDF banner junk and a duplicate `dishes/portraits/`); read from the
  real location and left the user's `dev/` arrangement untouched.

- **Dish images on the Recipes tab.** 480 dish PNGs matched 1:1 against `recipes.json` by
  normalized name (NFKD, `&`→`and`, strip non-alphanumerics). Added an `image` field plus a
  thumbnail column. Dish art is much larger than the gem glyphs, so it got its own
  `.table-thumb` (2.75rem) rather than being squeezed into `.table-icon` (1.6rem).
  Filenames contain `&`, `'`, `,` and `ñ`, so the component uses `encodeURI()`. Worth knowing:
  a verification sweep using Python's `urllib.parse.quote` reported 27 false failures because it
  escapes `&`/`,` to `%26`/`%2C`, which Vite's static handler does *not* resolve — `encodeURI`
  correctly leaves those raw, which is why the browser path works. Re-ran with matching
  semantics: 1026/1026 images serve as real PNGs.

- **Three genuine data bugs found in `recipes.json`** while matching images (all from the
  original cooking-PDF extraction, all fixed against ground truth re-read from
  `dev/cooking_recipes.pdf`):
  - `"Sugar-Free Banana Muffin Sugar-Free Blueberry Muffin"` was two recipes merged into one row
    with concatenated ingredients (`Wheat, Banana, Wheat, Blueberry`). Split into two — p51 shows
    both share 2★/39 Coins/677 Energy, so the numbers needed no reconstruction.
  - `Pooh's Birthday Cake` was dropped entirely (p109). Re-added.
  - `Foresty Quiche` was missing its first ingredient, `Any Fish` (p109). Restored.
  Recipe count went 478 → 480, matching the 480 dish images exactly.

- **Crafting tab: 425 recipes from `dev/crafting_recipes.pdf`.** This PDF has the same
  two-layouts-in-one-document problem as the old `All Crafting Recipes.pdf` (narrow columns with
  small icons for everything except Furniture, which uses much larger icons and shifted text
  columns) — and the switch happens **mid-page on p19**, so per-page column configs don't work
  either. Column x-positions also vary *within* a single page (p8 has materials at both x=368 and
  x=390).
  The fix made all of that irrelevant: **this PDF draws real cell borders**, so the horizontal
  edges give exact row bands *and* exact column boundaries per row. Grouping horizontal edges by
  `top` (collapsing the double-stroked pairs ~0.6pt apart) and keeping groups of ≥3 segments
  spanning >250pt yields the table structure directly — far more robust than the icon-position
  anchoring the previous crafting extraction needed.
  Noise handling that mattered:
  - All real table text is exactly 9.0pt; section headers are 19.1pt and promo prose / nav
    bullets are 9.6pt, so a strict size test removes those.
  - The saved page interleaves **site chrome into the middle of the table** — an IGN footer link
    list lands between two Furniture rows on p69, and a wiki nav bar on p18/p26. These always put
    text in the icon column, which real recipe rows never do, so any visual line with a word in
    the icon column is dropped. That also removes the repeated `Icon | Item | Recipe` header row
    for free, without needing a keyword blocklist (which would have been risky — a blocklist
    containing "Refined" could eat a legitimate item name).
  - A row is kept when it has both a name and materials, *not* when it has an icon: `Training
    Mannequin` (p46) is a real recipe rendered without its image, and requiring an icon silently
    dropped it in an earlier pass.
  - Quantities appear in three notations — `5 Iron Ore`, `3x Marble`, and trailing `Opal x 1` —
    and names wrap mid-word with hyphens across the narrow column (`Egg-`/`cellent` →
    `Egg-cellent`, `Three-`/`Leaf` → `Three-Leaf`, `V-EGG-`/`etable Seed`).
  - Four rows carry a yield (`Iron Ingot x2`, `Storybook Magic x15`, `Coal Ore x10`,
    `Dreamlight x250`), split out into a `yield` field rather than left in the name.
  - **Two findings verified visually rather than assumed to be extraction bugs** (by cropping the
    page region and rendering it): 5 materials genuinely omit their quantity *in the source*
    (e.g. Gray Mailbox's "Iron Ingot", Half-Barrel's "Dark Wood") — kept as `qty: null`; and the
    two identically-named `Yellow Light Low Beach Torch` rows on p48/p49 are real distinct source
    rows differing only in Topaz vs Garnet, not one row split across a page break. Because names
    aren't unique (also two `Iron Ingot` recipes), table row keys are index-based.
  - Ignore the `Guide (424)` text on p26 as a row-count cross-check — it's part of the wiki's own
    nav chrome, not a recipe total.

- **Also extracted the 424 crafted-item icons** from the same PDF into the (empty)
  `images/crafted/` folder, so the Crafting table matches the visual style of Gems and Recipes.
  Only `Training Mannequin` has no image, because the source has none.

- `CraftingTab.jsx` follows the established `DataTable` pattern: sortable columns, one live
  search box matching name/category/material, and per-category filter checkboxes (same shape as
  the Recipes tab's meal-type filters).

- **126 ingredient icons extracted from `dev/ingredients.pdf` into `dev/images/ingredients/`.**
  Same cell-border technique again, but this PDF needed it generalized: it contains many
  per-category sub-tables (All Vegetables / All Fruits / … per realm) whose column x-positions
  differ from table to table — the icon column is `[22,122]` on the overview pages but `[91,233]`,
  `[80,227]`, `[96,268]` and others on the category pages. Hardcoding the first signature found
  only 16 of them; taking the icon from *whatever the first column is* on any rule group with ≥5
  boundaries found all of them.
  - An embedded **pharmaceutical ad on p20** draws its own box borders and reads as a table.
    Rejected on icon geometry: its images are either far too wide (290pt) or ~11pt tall, while
    real icons run 87–148 wide and 38–154 tall.
  - The IGN footer link list is interleaved into the table again (p39). Same "drop lines with
    text at/left of the icon column" fix as the crafting pass — **but here the footer sits only
    2.4pt above the `Dill` row**, so at the normal 3.5pt line-grouping tolerance the two merged
    and `Dill` was dropped along with the chrome. Chrome detection now uses a tighter 1.5pt
    tolerance (cells in a real row share an exact `top`, so this is safe); name assembly still
    uses 3.5pt.
  - 10 ingredients appear twice (master "All Ingredients" table on p0–2 *and* the per-category
    tables), so output is deduped by name keeping the largest crop — the category-page icons are
    ~133px wide vs ~90px on the overview pages.
  - Written to `dev/images/ingredients/` only, not `frontend/public/` — there's no Ingredients tab
    consuming them yet, and unused files would ship in every build. The table data (locations,
    grow time, harvest yield, sell price, energy, ingredient type) is cleanly extractable from the
    same PDF whenever that tab is wanted.

- **Creatures: dropped `family` entirely, replaced with `locationOrigin` + `timesAvailable`.**
  Row shape is now `{name, locationOrigin, timesAvailable, emoji}`, 232 rows (was 273).

  The session got there via several rounds of `family` reassignment (Demon/Bird → Snippet, owls
  and ravens → Bird, dragons → Dragon, Meadow rabbits → Rabbit, Wetlands crocodiles → Crocodile)
  before the user decided they didn't want the field at all. Those intermediate edits are moot
  now, but two things from that detour are worth keeping:

  - **`bridge/known_critters.json` is the pristine original** (273 rows, untouched `family`
    values). It's what made the mid-session "revert the biomes but keep the animal tidying"
    request a clean positional restore, and it's the fallback if `family` is ever wanted back.
    Restoring must be done **positionally, not by name** — see below.
  - **The critical discovery, found only because dropping `family` prompted a duplicate check:**
    41 creature names appeared twice, and in *every single case* the pair was one animal family
    + one biome family (`Classic Fox` → `Fox` and `Snow Cliffs`; `Blue Raven` → `Bird` and
    `Dark Mountains`). That isn't duplication noise — the game's `Companion.json` files each wild
    critter under both its animal type and its spawn biome, so the pair encodes *"this is a Fox,
    found in Snow Cliffs"*. Deleting `family` naively would have silently destroyed the only
    origin data in the file. Instead the pairs were merged into single rows and the biome kept as
    `locationOrigin`, which populated 42 of 232 rows for free. Merge keeps the animal family's
    emoji, since the biome ones are wrong per-creature (🏔️ on a fox, 🐝 on a rabbit, 🦉 on a
    raccoon).

  **Caveat on those 42 values:** they're the game's internal biome codenames (`Snow Cliffs`,
  `Urban`, `Dark Mountains`, `Ancient Civ`), *not* player-facing zone names — the real ones are
  Frosted Heights, Plaza, etc. They need normalizing against a proper source before being trusted
  in the UI.

  `timesAvailable` is null on all 232 rows, awaiting spawn times/days from the user. Both new
  columns sort nulls last (via a `￿` sentinel) so populated rows stay grouped, and the search
  box matches name/location/times.

  **Waiting on the user:** a creatures/companions reference PDF for `dev/`, to fill
  `locationOrigin` (including marking store-only creatures as `Store`) and normalize the biome
  codenames. Creature names in it must match the existing 232 or the join won't work.

**Open threads for next session:**
- `recipes.json` has now yielded 3 real extraction bugs from spot-checks alone; a full
  re-verification pass of all 480 recipes against `dev/cooking_recipes.pdf` is probably worth
  doing rather than waiting to trip over more.
- `images/villagers/Tramp.png` is still unreferenced — the pre-existing "Lady Tramp" single-roster-
  entry case, which uses `Lady.png`.
- Vendor Ware / "Stall Wares" tab is still a "coming soon" placeholder in the React app; the
  87-item Goofy's Stall dataset and the grouped-table pattern only exist in the old static
  `app.js`/`data.js` and were never ported.
- `digging-results.pdf` and `foraging-and-flowers.pdf` remain unprocessed in `dev/`.
- Still undecided: whether official Disney art assets (now ~1,026 images) stay in the repo if this
  ever goes public.

---

## 2026-07-24

**Vendor Ware tab populated and redesigned as sectioned-by-vendor tables** — Goofy's Stall
data (87 items: seeds + rotating ingredients, base game + Eternity Isle + Storybook Vale
zones) parsed from the user-supplied `dev/goofy_stall_items.txt` (plain structured text this
time, no PDF extraction needed). Replaced the old single flat table with a new
`initGroupedDataTable()` pattern in `app.js`: one headed section per vendor, a single search
box filtering across all sections at once, sections with zero matches disappear entirely,
sections with any match keep their header. Future vendor types (meat stall, gem stalls, etc.)
will just show up as additional sections automatically once their data is added — no UI
changes needed, since sectioning is driven purely by the `vendor` field.

**Removed the live game bridge feature entirely** (Star Coins / Dreamlight header readouts).
Root-caused the "faded" appearance the user was seeing first — confirmed via
`bridge/game_state.json` that it was the intentional `.stale` CSS opacity rule correctly
flagging that the Star Coins watch's memory addresses had gone bad (self-healing relocate
logic searches for the *last known* value, which can't find a new address if the real value
changed since — a genuine limitation of that design, not a display bug). User decided to drop
the feature rather than keep maintaining it: removed the header markup, polling JS, related
CSS, and stopped the running `live_bridge.py` process (PID identified via `Get-CimInstance
Win32_Process` before killing, to avoid accidentally killing the dev http.server instead).
`bridge/scan.py` and `bridge/live_bridge.py` scripts themselves are left in place in case this
gets revisited later.

**Villager card interaction fixes:**
- Drag-and-drop reordering (added 2026-07-22) turned out to genuinely conflict with the
  friendship-level range slider at the browser level — `draggable="true"` on an ancestor can
  preempt a slider thumb's own pointer handling even with `preventDefault()` on the
  interactive-element check in `dragstart`. Tried +/- stepper buttons as a workaround first,
  but per user's direction, reverted that and instead removed drag-and-drop entirely in favor
  of explicit ▲/▼ move-up/move-down buttons on each card (operating on the villager's real
  index in the underlying array, not its position within an active search filter, so
  reordering stays correct even while searching). Slider is back to normal.

**Tasks tab: added editing.** Previously tasks could only be toggled done or deleted, with no
way to fix a typo or change category after creation. Added an Edit button that swaps a task
row into an inline text input + category `<select>` with Save/Cancel; editingTaskId is tracked
module-level so only one task is in edit mode at a time.

**Small fixes:** gem/vendor table thumbnail size reduced (2rem → 1.3rem) per user report of
pixelation; header search box now has a 720px breakpoint so it shrinks properly at narrow
viewports instead of holding a 200px floor; task Edit/Delete button sizing mismatch fixed by
introducing a shared `button.btn-compact` class (specificity-matched to `button.danger`/
`button.secondary` so there's no cascade ambiguity) rather than a descendant-scoped rule.

**Public hosting discussion:** user is planning to make the app public-facing eventually (not
yet decided where). Talked through the real scope: almost the entire app is already static
files + `localStorage` (confirmed per-device storage is fine, no cross-device sync needed), so
hosting is close to a non-issue — Cloudflare Pages/GitHub Pages/Netlify are all free and don't
spin down since they're serving static files, not running a sleeping server process. Flagged
one real open decision: villager portraits and gem icons are official Disney Dreamlight Valley
art assets, fine for personal local use but worth a deliberate call before a public URL exists
(keep as-is and accept the risk, swap to placeholder/generic icons, or drop images entirely).
Not decided yet.

**Not yet set up: version control.** Attempted a commit+push at the user's request and
discovered this folder has never been a git repository (no `.git`). User doesn't have a
remote (e.g. GitHub) yet either. Deferred — noted here so next session doesn't lose the
thread. Once a remote exists, initializing and pushing is a five-minute task.

---

## 2026-07-23 (4)

**Filled in Color/Shape/icon data on Gems & Minerals from the new `dev/gems.pdf`** — the
color source that was missing since the mining.pdf pass. 51 of the 67 gems/minerals now have
color, shape, sell price, zones, and an actual extracted icon image; the other 16 are the
plain ores/minerals (Stone, Coal Ore, Copper, etc.) that this document doesn't cover, since
it's specifically a *gems* reference, not a general mining one.

- Confirmed this is the same 51-gem roster already in `KNOWN_GEMS` from mining.pdf, just
  organized by DLC realm section (base game, Eternity Isle, Storybook Vale, Wishblossom
  Ranch, Honeyglow Woods) instead of one flat list — so this was a clean merge-by-name into
  existing entries, not a fresh dataset.
- Also extracted actual icon images (not just data) per the user's request — tested that
  `pdfplumber` could crop+rasterize each icon region directly (via `pypdfium2` underneath,
  no external poppler dependency needed), confirmed one visually before running full attempts.
  These are official game art assets; noted to the user that's worth reconsidering if this
  app is ever hosted publicly rather than run locally, per the earlier "would this work
  hosted on the web" conversation.
- Found and fixed a real extraction bug, not just source-data noise: name-column text was
  matched to icons by raw list position instead of nearest-center, so a single stray
  section-header cluster ("Gems Found in Eternity Isle") shifted every subsequent gem's
  *name* out of alignment with its own color/shape/price/zones for the rest of that page.
  Confirmed via ground-truth cross-check that the icon *images* were unaffected (they're the
  actual anchor everything else keys off), only the name assignment — visually verified one
  icon before trusting the theory, then fixed name-matching to also use nearest-center and
  hand-corrected the ~3 gems already extracted under the old buggy logic (Alexandrite/Blue
  Zircon/Bumblestone had rotated one position off, requiring an icon-file rename to match).
- Several Color/Shape fields were corrupted by leaked adjacent text (a zone name, a stray
  "Advertisement" placeholder, wiki-navigation UI chrome, fragments of the "How To Get" prose
  column) rather than by row misalignment — fixed by reading the raw page text directly for
  ground truth rather than trusting nearby-looking parser output, same lesson as the crafting
  PDF's "looks contaminated but is actually correct" case.
- Deliberately did not extract the "How To Get" column's descriptive sentences (e.g. "Amethysts
  are purple-colored gems that can primarily be found when mining gem rocks...") — that
  information is redundant with Color+Zones, which are already captured as structured facts.

---

## 2026-07-23 (3)

**Filled in the Gems & Minerals tab from `mining.pdf`** — 68 items (name, sell price, zones).
No new color-data source ever showed up, so per the user's go-ahead this shipped with `color`
left `null` (renders as "—") rather than waiting further; can be backfilled later if a source
with actual in-game color designations turns up.

- Same two-different-column-layouts-in-one-PDF pattern as before: the plain mineral/ore
  section (pages 0-1) and the actual-gems section (pages 2-5) use different x-positions for
  all three columns, handled with separate column configs per page range.
- Excluded an explanatory "Gems are rare minerals..." prose paragraph and a trailing "All
  Mining Artifacts by Biome/Region" section header that both physically sit inside the same
  column x-range as real table data — these aren't reference facts, so they were dropped
  entirely rather than reformatted, same treatment as the Meal-Energy-Calculation prose
  excluded from the recipes extraction.
- Caught one boundary misattribution by cross-checking against the pattern in the rest of the
  data rather than trusting the parser blindly: "Coal Ore" came out with `['All Biomes',
  'Forest of Valor']`, but every other "All Biomes" item (e.g. Stone) has *only* that one
  zone — the extra zone almost certainly belonged to the next row (Iron Ore) instead, based on
  a narrow nearest-center boundary call. Moved it.
- Pages 6-7 (`Rock | Location | Possible Artifacts/Minerals | Spots` — a "which dig-node yields
  what" table) still not pursued; different schema, not part of this ask.

---

## 2026-07-23 (2)

**Added a Crafting tab from `dev/All Crafting Recipes.pdf`** — 300 items across Refined
Materials, Enchantments, Fences and Paving, Functional Items, and Furniture (name, category,
materials list), same sortable/searchable table pattern as Fish/Crops/Creatures/Gems/Vendor.

- This PDF was structurally harder than every previous extraction this project has done:
  - Two entirely different page layouts in one document — most categories use small icons at
    a fixed x-position with the recipe two-column-wide, but Furniture (the biggest category,
    29 of 53 pages) uses much larger icons at a different x-position with both text columns
    shifted right. Extracting Furniture required separate column/icon-detection parameters.
  - Icon *images* (not text) turned out to be the most reliable per-item row anchor here —
    more reliable than any text column, since every single category has exactly one icon per
    recipe at a consistent size/position, whereas text columns (name, materials) vary in line
    count per item the way ingredient lists did in earlier PDFs.
  - The PDF has a recurring embedded ad banner ("Disney Dreamlight Valley: Honeyglow Woods -
    Official Launch Trailer") that sits at a fixed vertical position on nearly every page and,
    critically, sometimes visually *overlaps* real content rather than sitting in blank space —
    producing genuine character-level interleaving corruption (e.g. "Golden" + "Honeyglow" →
    "Gyoglldo") rather than clean separate ad text. Confirmed the ad's vertical band was
    consistent across pages, then excluded that whole y-range outright, which is more robust
    than trying to pattern-match corrupted text after the fact. Also had a literal stray
    "Advertisement" placeholder-label token bleeding into item names, filtered separately.
  - 3 items still needed individual manual reconstruction after the automated pass (residual
    ad-overlap damage right at row boundaries — one dropped name, two items whose materials
    got separated from their name entirely). Two more had plausible-looking but subtly wrong
    material lists caught by cross-checking against the raw page text rather than trusting the
    parser output at face value (a stove recipe that looked ad-contaminated actually had a
    legitimate "Black Passion Lily" ingredient; a path recipe was genuinely missing its third
    ingredient in the first pass, not corrupted).
- Ended at 300/300 items with materials, 0 known remaining data-quality issues.

---

## 2026-07-23

**Wired up Fish and a richer Crops table from user-supplied PDFs; added villager portraits.**

- User asked for Creatures acquisition data (zone/quest/Dreamlight Store) — no local or PDF
  source exists for that yet, so `KNOWN_CREATURES` stays name/family-only for now (explicit
  user call, not a data gap I'm unaware of).
- Extracted `fishing.pdf` (73 fish) with `pdfplumber`, reusing the recipes-session technique
  (nearest-name-center partitioning for a column that flows independently of row height) —
  but this time for a "Locations" column instead of ingredients. Locations/zones are a closed
  vocabulary (~26 zone names), so multi-word zone names were reassembled by greedy-matching
  that vocabulary against the raw word stream rather than guessing line breaks, which resolved
  the boundary ambiguity much more reliably than the recipe extraction did.
  Found and excluded two non-fish sub-tables in the same PDF (a "Crafting Materials" page and
  an "Other Ingredients" page); manually folded in 6 event-only fish from a differently-laid-
  out "Limited Time Resources" sub-table with notes on their unlock conditions.
- Extracted `crops.pdf` (55 crops: type, native zone, grow time, waterings, yield, seed/sell
  price, profit, coins/min) the same way. Bug caught mid-extraction: the row-count anchor
  column (Waterings) turned out to be blank for some crops (e.g. Barley) — switched to Yield,
  which is always populated, as the anchor instead.
  Replaced the old 4-entry `SEED_CROPS` sample data and converted the Crops tab from the old
  prompt()-based add-your-own list to the same sortable/searchable reference-table pattern as
  Creatures/Fish/Gems/Vendor, since crops.pdf's data is exactly the shape that pattern was
  built for.
- Checked `mining.pdf` for Gems & Minerals: it has real gem names + sell price + zones (multi-
  zone, same as fish), but **no color/attribute column** — the earlier example of filtering
  gems by typing "orange" isn't supported by this source. User chose to hold off on Gems
  entirely until a source with actual in-game color designations turns up, rather than guess
  colors from general mineralogy knowledge. Also spotted a second, differently-shaped table in
  the same PDF (`Rock | Location | Possible Artifacts/Minerals | Spots` — digging-node yields)
  that wasn't pursued this round.
- User dropped 71 villager portrait PNGs in `dev/character profiles/`. Copied them to a new
  root-level `portraits/` folder (avoids the space in that path breaking `<img src>` URLs),
  matched to `KNOWN_VILLAGERS` by normalized name (70/71 auto-matched; "Lady Tramp" needed a
  manual pick between `Lady.png`/`Tramp.png` since the two-character villager only has one
  roster entry). Villager cards and the Add Villager picker now show the portrait image in
  place of the emoji when one's available, falling back to emoji otherwise.
- Note: PDFs originally placed on the Desktop got *moved* (not copied) into `dev/` mid-session
  by the user, so `dev/` is now the authoritative location for these reference PDFs, not the
  Desktop copies referenced in the previous entry — extraction scripts were repointed there.

**Open threads for next session:**
- Gems & Minerals: waiting on a color/attribute data source.
- Vendor Ware: still no source PDF.
- `digging-results.pdf` and `foraging-and-flowers.pdf` are sitting in `dev/` unprocessed —
  their content doesn't map cleanly to any existing tab (digging-spot loot, general foraging
  overview); need a decision on where they'd go, if anywhere.
- Creatures acquisition data (zone/quest/store) still not sourced.

---

## 2026-07-22 (3)

**Added four new reference tabs: Creatures, Fish, Gems & Minerals, Vendor Ware.**

- Split the old combined "Crops & Critters" tab into a standalone Crops tab, and replaced
  its old 3-entry sample critter list with a proper Creatures tab.
- Explored the game's local asset files for source data on all four new categories:
  - **Creatures** (critters/creatures/companions): found a clean win — `Companion.json` has
    332 entries (273 after filtering unfinished `{DoNotTranslate}` placeholder content) with
    real display names, confirming this game treats catchable critters and equippable
    companions as one unified system. Grouped by family (Aladdin, Beach, Bird, Cat, etc.)
    with an emoji per family.
  - **Fish**: only 8 items carry a `Fish!` key prefix, all from one DLC — nowhere near the
    full roster (most fish, per the recipe ingredient data from last session, aren't tagged
    this way). Not usable as a complete source.
  - **Gems & Minerals**: no clean source. `Currency.json` only covers currency types (the
    premium "Gem" currency, event shards, etc.), not mined minerals like Amethyst/Citrine.
  - **Vendor Ware**: `Building.json` has shop/stall building names (403 entries) but nothing
    locally links a shop to what it actually stocks.
  - Root cause for all three misses: item-to-category associations in `ActivityItem.json` are
    numeric tag-ID references, not inline strings — same protobuf-decoding wall noted for
    gift preferences back on 2026-07-21, not solved this session either.
- Built a generic reusable sortable + searchable table component (`initDataTable()` in
  `app.js`) instead of the villager/recipe "pick into a tracked list" pattern — these four
  tabs are meant to browse the *entire* reference table directly, with click-to-sort columns
  and a live search box that matches across all fields (name, category, color, zone, etc.).
  Zone/color columns render as multiple stacked badges per row to support items found in more
  than one location (e.g. a gem mineable in two zones).
- `KNOWN_FISH`, `KNOWN_GEMS`, and `KNOWN_VENDOR_ITEMS` are scaffolded empty in `data.js` with
  documented shapes (`{name, zones: [...], rarity}`, `{name, color, zones: [...]}`,
  `{vendor, name, price}`) — table UI and search/sort are fully wired and waiting on data.
  Per user decision, these three will be sourced from wiki-style reference PDFs (same
  approach as the cooking recipes), not local extraction. `KNOWN_CREATURES` deliberately
  ships without zone data for the same reason — the user chose to proceed with name/family
  only rather than wait on a PDF for that one too.

**Open threads for next session:**
- Waiting on reference PDFs for Fish, Gems & Minerals, and Vendor Ware (drop on the desktop
  like `cooking recipes.pdf` was) — extraction pipeline is proven, just needs source material.
- Optionally revisit `KNOWN_CREATURES` with zone/color data later if a PDF is provided for it.

---

## 2026-07-22 (2)

**Built a full recipe library and picker, mirroring the villager-picker system.**

- Confirmed the game's own local asset files (`itemlist/ActivityItem.json`, `Formula.json`)
  don't contain recipe-to-ingredient composition data — `ActivityItem.json` only has
  name/description/GUID entries, and `Formula.json`'s "CookMeal" entry is a cooking-quest
  scoring formula, not an ingredient list. Recipe composition is likely baked into Unity
  binary asset bundles, out of scope for the lightweight extraction approach used so far.
- User supplied `cooking recipes.pdf` (a saved reference document) directly instead. Extracted
  it with `pdfplumber`, using word bounding-box positions rather than plain text (plain
  `pdftotext`, even in `-table` mode, interleaved ingredient lines across recipe-row
  boundaries and was unusable). Row reconstruction relied on the observed layout quirk that
  each recipe's Name/Type/Stars/Price block is vertically *centered* against its Ingredients
  block rather than top-aligned with it — partitioning ingredient lines by nearest-name-center
  (not by raw y-position) is what made the split reliable.
  Also caught and fixed a real field-mapping bug (Energy's number visually shares column space
  with the star-rating icons, not with Sell Price) during spot-checking.
- Result: 478 recipes extracted (Appetizers/Entrées/Desserts) with name, meal type, ingredient
  list, star rating, energy, and sell price, added as `KNOWN_RECIPES` in `data.js`.
- Reworked the Recipes tab to match the Villagers tab's pattern: `SEED_RECIPES` (3 sample
  entries) removed, tracked recipe list now starts empty, "+ Add Recipe" opens a searchable
  picker dialog (search by name/type/ingredient) instead of the old `prompt()` chain, plus a
  custom-entry fallback and a "Clear All" button. Recipe cards gained a "🔒 Not Made Yet /
  🔓 Discovered" progress toggle (repurposing the previously-unused `locked` field) so
  completion can be tracked the way the user described wanting to use the library.

---

## 2026-07-22

**Built the live game bridge end-to-end** — Star Coins and Dreamlight now update in the
app's header while the game is running, closing out the open thread from last session.

- Fixed a real bug in the installed `pymem` 1.14.0 package: its `process.list_processes()`
  generator yields the same mutable ctypes struct object on every iteration instead of a
  copy, so materializing it into a list (as the old `find_process` helper did) left every
  entry aliased to the final, zeroed-out struct. Reimplemented process enumeration in
  `bridge/scan.py` with correct ctypes `argtypes`/`restype` and a fresh struct per
  iteration. (`pymem.Pymem(name)` itself was unaffected — it matches during iteration
  before the aliasing bites — so the fix was scoped to `scan.py`'s own `find`/list use.)
- Extended `scan.py` to scan/narrow multiple named values in one pass (`star_coins=...
  dreamlight=...`) instead of one value at a time, and to merge newly-scanned watches into
  existing state rather than clobbering it.
- Ran the live memory scan against `ddv.exe`: **Star Coins** settled on 2 consistently-
  agreeing addresses after 3 narrowing rounds. **Dreamlight** kept losing all candidates
  each round — its backing memory gets reallocated rather than updated in place — until
  narrowing to the 2 addresses sitting at fixed 64/128-byte offsets from the Star Coins
  addresses (same underlying currency struct), which then held stable.
- Added `bridge/live_bridge.py`: attaches to `ddv.exe`, polls both addresses every 2s,
  and writes `bridge/game_state.json`. Self-healing built in — if a watch's address stops
  reading correctly, it automatically re-scans memory for the last known value to relocate
  it; if every watch goes stale at once (implying the game process itself restarted), it
  drops and re-opens the process handle by name on the next cycle.
- Wired the bridge into the app: `app.js` polls `bridge/game_state.json` every 3s
  (cache-busted, `cache: "no-store"`) and updates a header pill pair (⭐ Star Coins,
  ✨ Dreamlight) added to `index.html`/`style.css`. The pills stay hidden until the first
  successful fetch, so the app looks normal when the bridge isn't running.
- Verified the full path over real HTTP against the running `python -m http.server 8765`
  (not just opening the file), confirming `fetch()` in the browser will see the same thing
  curl did.

**Known limitation:** the discovered addresses are only valid for the current `ddv.exe`
process instance — restarting the game shifts them (ASLR). `live_bridge.py`'s self-healing
re-scan handles this automatically as long as it keeps running across the restart; if the
bridge script itself is restarted cold, `scan.py first`/`next` needs to be re-run once to
relocate. A true static pointer chain (module base + fixed offset) would survive game
restarts without any rescanning, but wasn't pursued this session — noted as a possible
follow-up below.

**Open threads for next session:**
- Consider pointer-chain scanning (`module_base + static_offset → dereference`) for Star
  Coins/Dreamlight so the bridge survives a cold restart without any manual rescan.
- Decide whether to pursue full item-ID → name resolution for gift preferences (still
  unstarted — separate from the live-memory work), or stop at manual daily-gift entry.
- Villager friendship levels and today's gift preferences are per-character data, not a
  single global value like currency — live-tracking those would need finding the game's
  character-array structure, a substantially bigger reverse-engineering task than the
  scalar currency scan done here.

---

## 2026-07-21

**Built the initial app** — static site (`index.html`, `style.css`, `app.js`, `data.js`), no
build step, runs via a local Python server. Data persists in browser localStorage.

- Villagers tab: friendship level slider, 3 daily favorite gift inputs, Scramblecoin/Discussion
  toggles, "New Day" button to clear daily fields while keeping friendship level.
- Tasks tab: add/check off tasks by category (Daily/Weekly/Quest/Other).
- Recipes tab and Crops & Critters tab: starter reference lists, editable.
- Global search bar in the header, searches across all tabs and jumps to the matching card.
- Added "Add Villager" picker dialog (search known roster + custom-entry form) so the
  Villagers tab only shows villagers you've chosen to track, instead of a pre-populated list.
  Added a "Clear All" button to reset the tracked list.
- Replaced the hand-typed villager roster with the authoritative list from
  `dev/villager_list.txt` (base game + Eternity Isle, Storybook Vale, Wishblossom Mountains,
  Honeyglow Woods DLCs), tagged by realm/expansion.
- Installed custom font "Louis George Cafe" (`fonts/`) as the site's base font.
- Applied color palette extracted from `dev/color-scheme.png`: navy `#2A344F`, indigo
  `#485795`, periwinkle `#8591CC`, background later changed to a pale purple `#F0F2F9`
  derived from the periwinkle (was originally the palette's cream `#FFF4D8`).
- Local dev server running at `http://localhost:8765` (`python -m http.server 8765` from the
  project folder).

**Explored live game-data integration (in progress, not wired into the app yet):**

- `bridge/scan.py` — Cheat Engine-style incremental memory scanner (read-only) for finding
  stable addresses of live save-state values (e.g. Star Coins) in the running `ddv.exe`
  process, using `pymem`. Confirmed the game process is reachable (PID matched between
  Cheat Engine and PowerShell). Have not yet completed a full scan-to-address session.
- Found that Disney Dreamlight Valley ships substantial game data as readable files in
  `ddv_Data/StreamingAssets/`: `itemlist/*.json` (Protobuf-encoded despite the extension —
  Character, Preference, Formula, Currency, etc.) and `Localization/LocDB_en-US.zip`
  (`.locbin` files, a simple repeated-{key,value} Protobuf format).
- `bridge/parse_locbin.py` — parses `.locbin` files into a flat key→English-text dictionary.
  Successfully extracted ~28.6k display-name strings game-wide, and isolated a clean
  115-entry character list from `Character.locbin` (mostly real villagers, with a handful of
  non-villager entries like event NPCs to filter out).
- Not yet done: correlating `Preference.json`'s per-character gift-preference item-ID pools
  back to actual item names (needs decoding `itemlist/ActivityItem.json`'s Protobuf structure
  to map numeric IDs → name keys), and wiring any of this into `data.js` or a live bridge file
  the web app polls.
- Deliberately did NOT scrape the Dreamlight Valley wiki sites — one wiki's `robots.txt`
  explicitly disallows AI-agent crawlers (`ClaudeBot`, `anthropic-ai`), and the Fandom wiki is
  behind a Cloudflare bot-challenge. Asset-file extraction from the local game install turned
  out to be a better, non-scraping path to the same reference data anyway.

**Open threads for next session:**
- Finish a live Star Coins memory-scan to validate the `scan.py` workflow end-to-end.
- Decide whether to pursue full item-ID → name resolution for gift preferences, or stop at
  the character roster + manual daily-gift entry already in the app.
- If live memory reading is pursued further, still need to build the actual bridge (a script
  writing `game_state.json` + a `fetch()` poll in `app.js`) — currently just standalone CLI
  tools, not connected to the browser app.
