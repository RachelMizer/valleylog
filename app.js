// ---------- storage helpers ----------

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function load(key, seed, mapSeed) {
  const raw = localStorage.getItem(key);
  if (raw) return JSON.parse(raw);
  const data = seed.map(mapSeed);
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

let villagers = load("vl_villagers", [], s => s);

// Backfill portraits for villagers that were tracked before the portrait picker existed —
// their saved records predate that field and won't pick it up on their own.
(function backfillVillagerPortraits() {
  const byName = new Map(KNOWN_VILLAGERS.map(v => [v.name.toLowerCase(), v]));
  let changed = false;
  villagers.forEach(v => {
    if (!v.portrait) {
      const known = byName.get(v.name.toLowerCase());
      if (known && known.portrait) {
        v.portrait = known.portrait;
        changed = true;
      }
    }
  });
  if (changed) save("vl_villagers", villagers);
})();

let tasks = load("vl_tasks", SEED_TASKS, s => ({
  id: genId(), text: s.text, category: s.category, done: false,
}));

let recipes = load("vl_recipes", [], s => s);

// ---------- tabs ----------

function switchTab(tab) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.id === "tab-" + tab));
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

function jumpTo(tab, elementId) {
  switchTab(tab);
  document.getElementById("global-search").value = "";
  document.getElementById("global-search-results").classList.remove("open");
  requestAnimationFrame(() => {
    const el = document.querySelector(`[data-id="${elementId}"]`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("highlight");
    void el.offsetWidth; // restart animation if already applied
    el.classList.add("highlight");
  });
}

// ---------- villagers ----------

function renderVillagers() {
  const query = document.getElementById("villager-search").value.trim().toLowerCase();
  const list = document.getElementById("villager-list");
  list.innerHTML = "";

  const filtered = villagers.filter(v =>
    v.name.toLowerCase().includes(query) || (v.realm || "").toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    list.innerHTML = `<p class="empty-state">No villagers found.</p>`;
    return;
  }

  filtered.forEach(v => {
    const realIndex = villagers.findIndex(x => x.id === v.id);
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = v.id;
    card.innerHTML = `
      <div class="card-head">
        <div class="reorder-buttons">
          <button type="button" class="reorder-btn" data-action="move-up" title="Move up" ${realIndex === 0 ? "disabled" : ""}>▲</button>
          <button type="button" class="reorder-btn" data-action="move-down" title="Move down" ${realIndex === villagers.length - 1 ? "disabled" : ""}>▼</button>
        </div>
        ${v.portrait
          ? `<img class="card-portrait" src="${escapeAttr(v.portrait)}" alt="">`
          : `<span class="card-emoji">${v.emoji || "⭐"}</span>`}
        <div>
          <div class="card-title">${escapeHtml(v.name)}</div>
          <div class="card-subtitle">${escapeHtml(v.realm || "")}</div>
        </div>
      </div>

      <div class="level-row">
        <label style="font-size:0.72rem;color:var(--muted);text-transform:uppercase;">Friendship</label>
        <input type="range" min="1" max="10" value="${v.level}" data-action="level">
        <span class="level-badge">${v.level}/10</span>
      </div>

      <div class="field-row">
        <label>Today's Favorite Gifts</label>
        <div class="gift-inputs">
          <input type="text" placeholder="Gift 1" value="${escapeAttr(v.gifts[0])}" data-action="gift0">
          <input type="text" placeholder="Gift 2" value="${escapeAttr(v.gifts[1])}" data-action="gift1">
          <input type="text" placeholder="Gift 3" value="${escapeAttr(v.gifts[2])}" data-action="gift2">
        </div>
      </div>

      <div class="toggle-row">
        <button class="toggle-btn ${v.scramblecoin ? "on" : ""}" data-action="scramblecoin">🪙 Scramblecoin${v.scramblecoin ? " ✓" : ""}</button>
        <button class="toggle-btn ${v.discussion ? "on" : ""}" data-action="discussion">💬 Discussion${v.discussion ? " ✓" : ""}</button>
      </div>

      <div class="card-footer">
        <button class="danger" data-action="delete">Delete</button>
      </div>
    `;
    list.appendChild(card);
  });
}

document.getElementById("villager-list").addEventListener("input", e => {
  const card = e.target.closest(".card");
  if (!card) return;
  const v = villagers.find(x => x.id === card.dataset.id);
  const action = e.target.dataset.action;
  if (action === "level") {
    v.level = Number(e.target.value);
    card.querySelector(".level-badge").textContent = `${v.level}/10`;
    save("vl_villagers", villagers);
  } else if (action && action.startsWith("gift")) {
    v.gifts[Number(action.slice(4))] = e.target.value;
    save("vl_villagers", villagers);
  }
});

document.getElementById("villager-list").addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (!card) return;
  const v = villagers.find(x => x.id === card.dataset.id);
  const action = e.target.dataset.action;
  if (action === "scramblecoin" || action === "discussion") {
    v[action] = !v[action];
    save("vl_villagers", villagers);
    renderVillagers();
  } else if (action === "move-up" || action === "move-down") {
    const idx = villagers.findIndex(x => x.id === v.id);
    const swapWith = action === "move-up" ? idx - 1 : idx + 1;
    if (swapWith < 0 || swapWith >= villagers.length) return;
    [villagers[idx], villagers[swapWith]] = [villagers[swapWith], villagers[idx]];
    save("vl_villagers", villagers);
    renderVillagers();
  } else if (action === "delete") {
    if (confirm(`Remove ${v.name} from your villager list?`)) {
      villagers = villagers.filter(x => x.id !== v.id);
      save("vl_villagers", villagers);
      renderVillagers();
    }
  }
});

document.getElementById("villager-search").addEventListener("input", renderVillagers);

function addVillager(name, realm, emoji, portrait) {
  villagers.push({
    id: genId(), name, realm: realm || "", emoji: emoji || "⭐", portrait: portrait || null,
    level: 1, gifts: ["", "", ""], scramblecoin: false, discussion: false,
  });
  save("vl_villagers", villagers);
  renderVillagers();
}

function renderVillagerPicker() {
  const query = document.getElementById("add-villager-search").value.trim().toLowerCase();
  const addedNames = new Set(villagers.map(v => v.name.toLowerCase()));
  const options = KNOWN_VILLAGERS.filter(v =>
    !addedNames.has(v.name.toLowerCase()) &&
    (v.name.toLowerCase().includes(query) || v.realm.toLowerCase().includes(query))
  );

  const list = document.getElementById("add-villager-options");
  if (options.length === 0) {
    list.innerHTML = `<p class="empty-state">No matching villagers left to add.</p>`;
    return;
  }
  list.innerHTML = options.map(v => `
    <div class="picker-item" data-name="${escapeAttr(v.name)}" data-realm="${escapeAttr(v.realm)}" data-emoji="${escapeAttr(v.emoji)}" data-portrait="${escapeAttr(v.portrait || "")}">
      ${v.portrait
        ? `<img class="card-portrait small" src="${escapeAttr(v.portrait)}" alt="">`
        : `<span class="card-emoji">${v.emoji}</span>`}
      <div>
        <div class="result-name">${escapeHtml(v.name)}</div>
        <div class="result-detail">${escapeHtml(v.realm)}</div>
      </div>
      <button data-action="pick">+ Add</button>
    </div>
  `).join("");
}

const villagerDialog = document.getElementById("add-villager-dialog");

document.getElementById("add-villager-btn").addEventListener("click", () => {
  document.getElementById("add-villager-search").value = "";
  renderVillagerPicker();
  villagerDialog.showModal();
});

document.getElementById("close-villager-dialog").addEventListener("click", () => villagerDialog.close());

document.getElementById("add-villager-search").addEventListener("input", renderVillagerPicker);

document.getElementById("add-villager-options").addEventListener("click", e => {
  if (e.target.dataset.action !== "pick") return;
  const item = e.target.closest(".picker-item");
  addVillager(item.dataset.name, item.dataset.realm, item.dataset.emoji, item.dataset.portrait);
  renderVillagerPicker();
});

document.getElementById("custom-villager-form").addEventListener("submit", e => {
  e.preventDefault();
  const nameInput = document.getElementById("custom-villager-name");
  const realmInput = document.getElementById("custom-villager-realm");
  const name = nameInput.value.trim();
  if (!name) return;
  addVillager(name, realmInput.value.trim(), "⭐");
  nameInput.value = "";
  realmInput.value = "";
  renderVillagerPicker();
});

document.getElementById("clear-villagers-btn").addEventListener("click", () => {
  if (villagers.length === 0) return;
  if (!confirm(`Remove all ${villagers.length} villagers from your tracked list? This can't be undone.`)) return;
  villagers = [];
  save("vl_villagers", villagers);
  renderVillagers();
});

document.getElementById("new-day-btn").addEventListener("click", () => {
  if (!confirm("Start a new day? This clears today's gifts, Scramblecoin, and discussion for everyone (friendship levels are kept).")) return;
  villagers.forEach(v => {
    v.gifts = ["", "", ""];
    v.scramblecoin = false;
    v.discussion = false;
  });
  save("vl_villagers", villagers);
  renderVillagers();
});

// ---------- tasks ----------

const CATEGORY_ORDER = ["Daily", "Weekly", "Quest", "Other"];

let editingTaskId = null;

function renderTasks() {
  const container = document.getElementById("task-list");
  container.innerHTML = "";

  if (tasks.length === 0) {
    container.innerHTML = `<p class="empty-state">No tasks yet — add one above.</p>`;
    return;
  }

  CATEGORY_ORDER.forEach(cat => {
    const group = tasks.filter(t => t.category === cat);
    if (group.length === 0) return;

    const section = document.createElement("div");
    section.className = "task-group";
    section.innerHTML = `<h3>${cat}</h3>`;

    group.forEach(t => {
      const item = document.createElement("div");
      item.className = "task-item" + (t.done ? " done" : "");
      item.dataset.id = t.id;

      if (t.id === editingTaskId) {
        item.innerHTML = `
          <input type="text" class="task-edit-text" value="${escapeAttr(t.text)}">
          <select class="task-edit-category">
            ${CATEGORY_ORDER.map(c => `<option value="${c}" ${c === t.category ? "selected" : ""}>${c}</option>`).join("")}
          </select>
          <button class="btn-compact" data-action="save-edit">Save</button>
          <button class="secondary btn-compact" data-action="cancel-edit">Cancel</button>
        `;
      } else {
        item.innerHTML = `
          <input type="checkbox" data-action="toggle" ${t.done ? "checked" : ""}>
          <span>${escapeHtml(t.text)}</span>
          <button class="secondary btn-compact" data-action="edit">Edit</button>
          <button class="danger btn-compact" data-action="delete">Delete</button>
        `;
      }
      section.appendChild(item);
    });

    container.appendChild(section);
  });
}

document.getElementById("task-list").addEventListener("click", e => {
  const item = e.target.closest(".task-item");
  if (!item) return;
  const t = tasks.find(x => x.id === item.dataset.id);
  const action = e.target.dataset.action;
  if (action === "toggle") {
    t.done = e.target.checked;
    save("vl_tasks", tasks);
    renderTasks();
  } else if (action === "delete") {
    tasks = tasks.filter(x => x.id !== t.id);
    save("vl_tasks", tasks);
    renderTasks();
  } else if (action === "edit") {
    editingTaskId = t.id;
    renderTasks();
  } else if (action === "cancel-edit") {
    editingTaskId = null;
    renderTasks();
  } else if (action === "save-edit") {
    const text = item.querySelector(".task-edit-text").value.trim();
    const category = item.querySelector(".task-edit-category").value;
    if (text) {
      t.text = text;
      t.category = category;
      save("vl_tasks", tasks);
    }
    editingTaskId = null;
    renderTasks();
  }
});

document.getElementById("add-task-form").addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("task-text");
  const category = document.getElementById("task-category").value;
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: genId(), text, category, done: false });
  save("vl_tasks", tasks);
  input.value = "";
  renderTasks();
});

// ---------- recipes ----------

function renderRecipes() {
  const query = document.getElementById("recipe-search").value.trim().toLowerCase();
  const list = document.getElementById("recipe-list");
  list.innerHTML = "";

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(query) || (r.mealType || "").toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    list.innerHTML = `<p class="empty-state">No recipes found.</p>`;
    return;
  }

  filtered.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = r.id;
    const stats = [
      r.stars ? `${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}` : "",
      r.energy ? `+${r.energy} energy` : "",
      r.sellPrice ? `${r.sellPrice} coins` : "",
    ].filter(Boolean).join(" · ");
    card.innerHTML = `
      <div class="card-head">
        <span class="card-emoji">${r.emoji || "🍽️"}</span>
        <div>
          <div class="card-title">${escapeHtml(r.name)}</div>
          <div class="card-subtitle">${escapeHtml(r.mealType || "")}</div>
        </div>
      </div>
      <div class="field-row">
        <label>Ingredients</label>
        <div>${escapeHtml(r.ingredients || "—")}</div>
      </div>
      ${stats ? `<div class="field-row"><label>Reference</label><div>${escapeHtml(stats)}</div></div>` : ""}
      ${r.notes ? `<div class="field-row"><label>Notes</label><div>${escapeHtml(r.notes)}</div></div>` : ""}
      <div class="toggle-row">
        <button class="toggle-btn ${r.discovered ? "on" : ""}" data-action="discovered">${r.discovered ? "🔓 Discovered" : "🔒 Not Made Yet"}</button>
      </div>
      <div class="card-footer">
        <button class="danger" data-action="delete">Delete</button>
      </div>
    `;
    list.appendChild(card);
  });
}

document.getElementById("recipe-list").addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (!card) return;
  const r = recipes.find(x => x.id === card.dataset.id);
  const action = e.target.dataset.action;
  if (action === "discovered") {
    r.discovered = !r.discovered;
    save("vl_recipes", recipes);
    renderRecipes();
  } else if (action === "delete") {
    if (confirm("Remove this recipe from your tracked list?")) {
      recipes = recipes.filter(x => x.id !== r.id);
      save("vl_recipes", recipes);
      renderRecipes();
    }
  }
});

document.getElementById("recipe-search").addEventListener("input", renderRecipes);

function addRecipe(name, mealType, emoji, ingredients, stars, energy, sellPrice) {
  recipes.push({
    id: genId(), name, mealType: mealType || "", emoji: emoji || "🍽️",
    ingredients: ingredients || "", stars: stars || null, energy: energy || null,
    sellPrice: sellPrice || null, discovered: false, notes: "",
  });
  save("vl_recipes", recipes);
  renderRecipes();
}

function renderRecipePicker() {
  const query = document.getElementById("add-recipe-search").value.trim().toLowerCase();
  const addedNames = new Set(recipes.map(r => r.name.toLowerCase()));
  const options = KNOWN_RECIPES.filter(r =>
    !addedNames.has(r.name.toLowerCase()) &&
    (r.name.toLowerCase().includes(query) || r.mealType.toLowerCase().includes(query) ||
      r.ingredients.some(i => i.toLowerCase().includes(query)))
  );

  const list = document.getElementById("add-recipe-options");
  if (options.length === 0) {
    list.innerHTML = `<p class="empty-state">No matching recipes left to add.</p>`;
    return;
  }
  list.innerHTML = options.map(r => `
    <div class="picker-item" data-name="${escapeAttr(r.name)}" data-type="${escapeAttr(r.mealType)}" data-emoji="${escapeAttr(r.emoji)}"
      data-ingredients="${escapeAttr(r.ingredients.join(", "))}" data-stars="${r.stars || ""}" data-energy="${escapeAttr(r.energy || "")}" data-sell="${escapeAttr(r.sellPrice || "")}">
      <span class="card-emoji">${r.emoji}</span>
      <div>
        <div class="result-name">${escapeHtml(r.name)}</div>
        <div class="result-detail">${escapeHtml(r.mealType)} · ${escapeHtml(r.ingredients.join(", "))}</div>
      </div>
      <button data-action="pick">+ Add</button>
    </div>
  `).join("");
}

const recipeDialog = document.getElementById("add-recipe-dialog");

document.getElementById("add-recipe-btn").addEventListener("click", () => {
  document.getElementById("add-recipe-search").value = "";
  renderRecipePicker();
  recipeDialog.showModal();
});

document.getElementById("close-recipe-dialog").addEventListener("click", () => recipeDialog.close());

document.getElementById("add-recipe-search").addEventListener("input", renderRecipePicker);

document.getElementById("add-recipe-options").addEventListener("click", e => {
  if (e.target.dataset.action !== "pick") return;
  const item = e.target.closest(".picker-item");
  addRecipe(
    item.dataset.name, item.dataset.type, item.dataset.emoji, item.dataset.ingredients,
    Number(item.dataset.stars) || null, item.dataset.energy, item.dataset.sell
  );
  renderRecipePicker();
});

document.getElementById("custom-recipe-form").addEventListener("submit", e => {
  e.preventDefault();
  const nameInput = document.getElementById("custom-recipe-name");
  const typeInput = document.getElementById("custom-recipe-type");
  const name = nameInput.value.trim();
  if (!name) return;
  addRecipe(name, typeInput.value.trim(), "🍽️", "", null, null, null);
  nameInput.value = "";
  typeInput.value = "";
  renderRecipePicker();
});

document.getElementById("clear-recipes-btn").addEventListener("click", () => {
  if (recipes.length === 0) return;
  if (!confirm(`Remove all ${recipes.length} recipes from your tracked list? This can't be undone.`)) return;
  recipes = [];
  save("vl_recipes", recipes);
  renderRecipes();
});

// ---------- reference tables (crops / creatures / fish / gems / vendor ware) ----------
// Generic sortable + searchable table over a static reference array (KNOWN_*), used
// for browsing the whole category rather than picking items into a tracked list.

function initDataTable({ tableId, searchId, data, columns, matchesQuery }) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector("tbody");
  const searchInput = document.getElementById(searchId);
  let sortKey = null;
  let sortDir = 1;

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    let rows = query ? data.filter(row => matchesQuery(row, query)) : data.slice();

    if (sortKey) {
      const col = columns.find(c => c.key === sortKey);
      rows.sort((a, b) => {
        const av = col.sortValue(a), bv = col.sortValue(b);
        if (av < bv) return -1 * sortDir;
        if (av > bv) return 1 * sortDir;
        return 0;
      });
    }

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${columns.length}" class="empty-state">${data.length === 0 ? "No data yet — check back once this table is populated." : "No matches found."}</td></tr>`;
      return;
    }
    tbody.innerHTML = rows.map(row => `
      <tr data-id="${escapeAttr(row.name || row.vendor)}">${columns.map(c => `<td>${c.render(row)}</td>`).join("")}</tr>
    `).join("");
  }

  searchInput.addEventListener("input", render);

  table.querySelectorAll("th[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      sortDir = sortKey === key ? sortDir * -1 : 1;
      sortKey = key;
      table.querySelectorAll("th[data-sort]").forEach(h => h.classList.remove("sort-asc", "sort-desc"));
      th.classList.add(sortDir === 1 ? "sort-asc" : "sort-desc");
      render();
    });
  });

  render();
}

// Same idea as initDataTable, but splits rows into separate headed sections by a group key
// (e.g. one section per vendor) instead of one flat table. Search filters across every
// section at once; a section disappears only once none of its rows match, and keeps its
// header for as long as at least one row still does.
function initGroupedDataTable({ containerId, searchId, data, groupKey, columns, matchesQuery }) {
  const container = document.getElementById(containerId);
  const searchInput = document.getElementById(searchId);
  let sortKey = null;
  let sortDir = 1;

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    let rows = query ? data.filter(row => matchesQuery(row, query)) : data.slice();

    if (data.length === 0) {
      container.innerHTML = `<p class="empty-state">No data yet — check back once this table is populated.</p>`;
      return;
    }
    if (rows.length === 0) {
      container.innerHTML = `<p class="empty-state">No matches found.</p>`;
      return;
    }

    if (sortKey) {
      const col = columns.find(c => c.key === sortKey);
      rows.sort((a, b) => {
        const av = col.sortValue(a), bv = col.sortValue(b);
        if (av < bv) return -1 * sortDir;
        if (av > bv) return 1 * sortDir;
        return 0;
      });
    }

    const groups = {};
    rows.forEach(r => {
      const key = groupKey(r);
      (groups[key] ||= []).push(r);
    });

    container.innerHTML = Object.entries(groups).map(([group, groupRows]) => `
      <h3 class="section-heading">${escapeHtml(group)}</h3>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>${columns.map(c => `<th data-sort="${c.key}" class="${sortKey === c.key ? (sortDir === 1 ? "sort-asc" : "sort-desc") : ""}">${c.label}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${groupRows.map(row => `<tr>${columns.map(c => `<td>${c.render(row)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
    `).join("");

    container.querySelectorAll("th[data-sort]").forEach(th => {
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        sortDir = sortKey === key ? sortDir * -1 : 1;
        sortKey = key;
        render();
      });
    });
  }

  searchInput.addEventListener("input", render);
  render();
}

function renderZones(zones) {
  return (zones || []).map(z => `<span class="badge">${escapeHtml(z)}</span>`).join(" ") || "—";
}

initDataTable({
  tableId: "crops-table", searchId: "crops-search", data: KNOWN_CROPS,
  columns: [
    { key: "name", sortValue: r => r.name.toLowerCase(), render: r => escapeHtml(r.name) },
    { key: "ingredientType", sortValue: r => (r.ingredientType || "").toLowerCase(), render: r => escapeHtml(r.ingredientType || "—") },
    { key: "zones", sortValue: r => (r.zones || []).join(","), render: r => renderZones(r.zones) },
    { key: "growTime", sortValue: r => r.growTime || "", render: r => escapeHtml(r.growTime || "—") },
    { key: "waterings", sortValue: r => Number(r.waterings) || 0, render: r => escapeHtml(r.waterings ?? "—") },
    { key: "yield", sortValue: r => Number(r.yield) || 0, render: r => escapeHtml(r.yield ?? "—") },
    { key: "seedPrice", sortValue: r => Number(String(r.seedPrice || "").replace(/,/g, "")) || 0, render: r => escapeHtml(r.seedPrice ?? "—") },
    { key: "sellPrice", sortValue: r => Number(String(r.sellPrice || "").replace(/,/g, "")) || 0, render: r => escapeHtml(r.sellPrice ?? "—") },
    { key: "profit", sortValue: r => Number(String(r.profit || "").replace(/,/g, "")) || 0, render: r => escapeHtml(r.profit ?? "—") },
    { key: "coinsPerMin", sortValue: r => Number(r.coinsPerMin) || 0, render: r => escapeHtml(r.coinsPerMin ?? "—") },
  ],
  matchesQuery: (r, q) => r.name.toLowerCase().includes(q) || (r.ingredientType || "").toLowerCase().includes(q) || (r.zones || []).some(z => z.toLowerCase().includes(q)),
});

initDataTable({
  tableId: "creatures-table", searchId: "creatures-search", data: KNOWN_CREATURES,
  columns: [
    { key: "name", sortValue: r => r.name.toLowerCase(), render: r => `${r.emoji || ""} ${escapeHtml(r.name)}` },
    { key: "family", sortValue: r => r.family.toLowerCase(), render: r => escapeHtml(r.family) },
  ],
  matchesQuery: (r, q) => r.name.toLowerCase().includes(q) || r.family.toLowerCase().includes(q),
});

initDataTable({
  tableId: "fish-table", searchId: "fish-search", data: KNOWN_FISH,
  columns: [
    { key: "name", sortValue: r => r.name.toLowerCase(), render: r => escapeHtml(r.name) },
    { key: "zones", sortValue: r => (r.zones || []).join(","), render: r => renderZones(r.zones) },
    { key: "ripples", sortValue: r => (r.ripples || "").toLowerCase(), render: r => escapeHtml(r.ripples || "—") },
    { key: "sellPrice", sortValue: r => Number(String(r.sellPrice || "").replace(/,/g, "")) || 0, render: r => escapeHtml(r.sellPrice ?? "—") },
    { key: "energy", sortValue: r => Number(String(r.energy || "").replace(/,/g, "")) || 0, render: r => escapeHtml(r.energy ?? "—") },
    { key: "ingredientCategory", sortValue: r => (r.ingredientCategory || "").toLowerCase(), render: r => escapeHtml(r.ingredientCategory || "—") },
    { key: "notes", sortValue: r => (r.notes || "").toLowerCase(), render: r => escapeHtml(r.notes || "—") },
  ],
  matchesQuery: (r, q) => r.name.toLowerCase().includes(q) || (r.zones || []).some(z => z.toLowerCase().includes(q)) ||
    (r.ripples || "").toLowerCase().includes(q) || (r.ingredientCategory || "").toLowerCase().includes(q) || (r.notes || "").toLowerCase().includes(q),
});

initDataTable({
  tableId: "gems-table", searchId: "gems-search", data: KNOWN_GEMS,
  columns: [
    { key: "icon", sortValue: () => 0, render: r => r.icon ? `<img class="table-icon" src="${escapeAttr(r.icon)}" alt="">` : "" },
    { key: "name", sortValue: r => r.name.toLowerCase(), render: r => escapeHtml(r.name) },
    { key: "color", sortValue: r => (r.color || "").toLowerCase(), render: r => escapeHtml(r.color || "—") },
    { key: "shape", sortValue: r => (r.shape || "").toLowerCase(), render: r => escapeHtml(r.shape || "—") },
    { key: "sellPrice", sortValue: r => Number(String(r.sellPrice || "").replace(/[^0-9.-]/g, "")) || 0, render: r => escapeHtml(r.sellPrice ?? "—") },
    { key: "zones", sortValue: r => (r.zones || []).join(","), render: r => renderZones(r.zones) },
  ],
  matchesQuery: (r, q) => r.name.toLowerCase().includes(q) || (r.color || "").toLowerCase().includes(q) ||
    (r.shape || "").toLowerCase().includes(q) || (r.zones || []).some(z => z.toLowerCase().includes(q)),
});

initGroupedDataTable({
  containerId: "vendor-groups", searchId: "vendor-search", data: KNOWN_VENDOR_ITEMS,
  groupKey: r => r.vendor,
  columns: [
    { key: "name", label: "Item", sortValue: r => r.name.toLowerCase(), render: r => escapeHtml(r.name) },
    { key: "itemType", label: "Type", sortValue: r => (r.itemType || "").toLowerCase(), render: r => escapeHtml(r.itemType || "—") },
    { key: "zone", label: "Zone", sortValue: r => (r.zone || "").toLowerCase(), render: r => escapeHtml(r.zone || "—") },
    { key: "realm", label: "Realm", sortValue: r => (r.realm || "").toLowerCase(), render: r => escapeHtml(r.realm || "—") },
    { key: "price", label: "Price", sortValue: r => Number(String(r.price || "").replace(/[^0-9.-]/g, "")) || 0, render: r => escapeHtml(r.price ?? "—") },
  ],
  matchesQuery: (r, q) => r.name.toLowerCase().includes(q) || (r.vendor || "").toLowerCase().includes(q) ||
    (r.itemType || "").toLowerCase().includes(q) || (r.zone || "").toLowerCase().includes(q) || (r.realm || "").toLowerCase().includes(q),
});

function renderMaterials(materials) {
  return (materials || []).map(m => `<span class="badge">${escapeHtml(m)}</span>`).join(" ") || "—";
}

initDataTable({
  tableId: "crafting-table", searchId: "crafting-search", data: KNOWN_CRAFTING,
  columns: [
    { key: "name", sortValue: r => r.name.toLowerCase(), render: r => escapeHtml(r.name) },
    { key: "category", sortValue: r => (r.category || "").toLowerCase(), render: r => escapeHtml(r.category || "—") },
    { key: "materials", sortValue: r => (r.materials || []).join(","), render: r => renderMaterials(r.materials) },
  ],
  matchesQuery: (r, q) => r.name.toLowerCase().includes(q) || (r.category || "").toLowerCase().includes(q) ||
    (r.materials || []).some(m => m.toLowerCase().includes(q)),
});

// ---------- global search ----------

function globalSearchResults(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results = [];

  villagers.forEach(v => {
    const haystack = [v.name, v.realm, ...v.gifts].join(" ").toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Villagers", tab: "villagers", id: v.id,
        name: v.name, detail: v.realm || `Level ${v.level}/10`,
      });
    }
  });

  tasks.forEach(t => {
    if (t.text.toLowerCase().includes(q)) {
      results.push({
        group: "Tasks", tab: "tasks", id: t.id,
        name: t.text, detail: t.category,
      });
    }
  });

  recipes.forEach(r => {
    const haystack = [r.name, r.mealType, r.ingredients, r.notes].join(" ").toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Recipes", tab: "recipes", id: r.id,
        name: r.name, detail: r.ingredients || r.mealType,
      });
    }
  });

  KNOWN_CROPS.forEach(c => {
    const haystack = [c.name, c.ingredientType, ...(c.zones || [])].join(" ").toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Crops", tab: "crops", id: c.name,
        name: c.name, detail: (c.zones || []).join(", ") || c.ingredientType,
      });
    }
  });

  KNOWN_CREATURES.forEach(c => {
    const haystack = [c.name, c.family].join(" ").toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Creatures", tab: "creatures", id: c.name,
        name: c.name, detail: c.family,
      });
    }
  });

  KNOWN_FISH.forEach(f => {
    const haystack = [f.name, ...(f.zones || []), f.rarity || ""].join(" ").toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Fish", tab: "fish", id: f.name,
        name: f.name, detail: (f.zones || []).join(", "),
      });
    }
  });

  KNOWN_GEMS.forEach(g => {
    const haystack = [g.name, g.color || "", ...(g.zones || [])].join(" ").toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Gems & Minerals", tab: "gems", id: g.name,
        name: g.name, detail: g.color || (g.zones || []).join(", "),
      });
    }
  });

  KNOWN_VENDOR_ITEMS.forEach(v => {
    const haystack = [v.name, v.vendor || "", v.zone || "", v.realm || "", v.itemType || ""].join(" ").toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Vendor Ware", tab: "vendor", id: v.name,
        name: v.name, detail: `${v.vendor}${v.zone ? " · " + v.zone : ""}`,
      });
    }
  });

  KNOWN_CRAFTING.forEach(c => {
    const haystack = [c.name, c.category, ...(c.materials || [])].join(" ").toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Crafting", tab: "crafting", id: c.name,
        name: c.name, detail: c.category,
      });
    }
  });

  return results;
}

function renderGlobalSearch() {
  const query = document.getElementById("global-search").value;
  const box = document.getElementById("global-search-results");
  const results = globalSearchResults(query);

  if (!query.trim()) {
    box.classList.remove("open");
    box.innerHTML = "";
    return;
  }

  if (results.length === 0) {
    box.innerHTML = `<div class="no-results">No matches for "${escapeHtml(query)}"</div>`;
    box.classList.add("open");
    return;
  }

  const groups = {};
  results.forEach(r => {
    (groups[r.group] ||= []).push(r);
  });

  box.innerHTML = Object.entries(groups).map(([group, items]) => `
    <div class="result-group-label">${group}</div>
    ${items.map(r => `
      <div class="search-result-item" data-tab="${r.tab}" data-id="${r.id}">
        <span class="result-name">${escapeHtml(r.name)}</span>
        <span class="result-detail">${escapeHtml(r.detail || "")}</span>
      </div>
    `).join("")}
  `).join("");

  box.classList.add("open");
}

document.getElementById("global-search").addEventListener("input", renderGlobalSearch);

document.getElementById("global-search-results").addEventListener("click", e => {
  const item = e.target.closest(".search-result-item");
  if (!item) return;
  jumpTo(item.dataset.tab, item.dataset.id);
});

document.addEventListener("click", e => {
  if (!e.target.closest(".global-search")) {
    document.getElementById("global-search-results").classList.remove("open");
  }
});

// ---------- utils ----------

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function escapeAttr(str) {
  return escapeHtml(str);
}

// ---------- init ----------

renderVillagers();
renderTasks();
renderRecipes();
