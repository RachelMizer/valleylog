import { useState } from "react";
import KNOWN_CRAFTING from "../data/crafting.json";
import DataTable from "./DataTable";

const CATEGORIES = [...new Set(KNOWN_CRAFTING.map(r => r.category))];

function materialText(m) {
  // A few rows omit the quantity in the source document itself.
  return m.qty ? `${m.qty} ${m.name}` : m.name;
}

// Names are not unique — the source lists two Iron Ingot recipes and two
// Yellow Light Low Beach Torch variants — so rows carry an index-based id.
const ROWS = KNOWN_CRAFTING.map((r, i) => ({
  ...r,
  id: `${r.name}|${i}`,
  materialsText: r.materials.map(materialText).join(", "),
}));

const columns = [
  {
    key: "image", label: "Item",
    render: r => (r.image
      ? <img className="table-thumb" src={encodeURI(`/${r.image}`)} alt="" loading="lazy" />
      : ""),
  },
  {
    key: "name", label: "Name",
    sortValue: r => r.name.toLowerCase(),
    render: r => (r.yield ? `${r.name} ×${r.yield}` : r.name),
  },
  {
    key: "category", label: "Category",
    sortValue: r => r.category.toLowerCase(),
    render: r => r.category,
  },
  {
    key: "materials", label: "Materials", wrap: true,
    sortValue: r => r.materialsText.toLowerCase(),
    render: r => r.materialsText,
  },
];

export default function CraftingTab() {
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState(() => new Set(CATEGORIES));

  function handleToggleCategory(category) {
    setActiveCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  const query = search.trim().toLowerCase();
  const filtered = ROWS.filter(r =>
    activeCategories.has(r.category) &&
    (r.name.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query) ||
      r.materials.some(m => m.name.toLowerCase().includes(query)))
  );

  return (
    <div>
      <div className="panel-toolbar">
        <input
          type="search"
          placeholder="Search items, categories, or materials..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-row">
        <span className="filter-label">Filters</span>
        {CATEGORIES.map(category => (
          <label key={category} className="filter-checkbox">
            <input
              type="checkbox"
              checked={activeCategories.has(category)}
              onChange={() => handleToggleCategory(category)}
            />
            {category}
          </label>
        ))}
        <span className="filter-actions">
          <button
            type="button"
            className="link-button"
            onClick={() => setActiveCategories(new Set(CATEGORIES))}
          >
            Select all
          </button>
          <button
            type="button"
            className="link-button"
            onClick={() => setActiveCategories(new Set())}
          >
            Clear filters
          </button>
        </span>
      </div>
      <DataTable columns={columns} rows={filtered} getRowKey={r => r.id} />
    </div>
  );
}
