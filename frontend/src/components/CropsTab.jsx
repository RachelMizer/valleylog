import { useState } from "react";
import KNOWN_CROPS from "../data/crops.json";
import DataTable from "./DataTable";

function parseNum(str) {
  if (!str) return 0;
  return Number(String(str).replace(/,/g, "")) || 0;
}

const INGREDIENT_TYPES = [...new Set(KNOWN_CROPS.map(r => r.ingredientType || "Other"))];

const columns = [
  {
    key: "name", label: "Name",
    sortValue: r => r.name.toLowerCase(),
    render: r => r.name,
  },
  {
    key: "ingredientType", label: "Type",
    sortValue: r => (r.ingredientType || "").toLowerCase(),
    render: r => r.ingredientType || "—",
  },
  {
    key: "zones", label: "Zones", wrap: true,
    sortValue: r => (r.zones || []).join(","),
    render: r => (r.zones || []).join(", ") || "—",
  },
  {
    key: "growTime", label: "Grow Time",
    sortValue: r => r.growTime || "",
    render: r => r.growTime || "—",
  },
  {
    key: "waterings", label: "Waterings",
    sortValue: r => Number(r.waterings) || 0,
    render: r => r.waterings ?? "—",
  },
  {
    key: "yield", label: "Yield",
    sortValue: r => Number(r.yield) || 0,
    render: r => r.yield ?? "—",
  },
  {
    key: "seedPrice", label: "Seed Price",
    sortValue: r => parseNum(r.seedPrice),
    render: r => r.seedPrice ?? "—",
  },
  {
    key: "sellPrice", label: "Sell Price",
    sortValue: r => parseNum(r.sellPrice),
    render: r => r.sellPrice ?? "—",
  },
  {
    key: "profit", label: "Profit",
    sortValue: r => parseNum(r.profit),
    render: r => r.profit ?? "—",
  },
  {
    key: "coinsPerMin", label: "Coins/Min",
    sortValue: r => Number(r.coinsPerMin) || 0,
    render: r => r.coinsPerMin ?? "—",
  },
];

export default function CropsTab() {
  const [search, setSearch] = useState("");
  const [activeTypes, setActiveTypes] = useState(() => new Set(INGREDIENT_TYPES));

  function handleToggleType(type) {
    setActiveTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  const query = search.trim().toLowerCase();
  const filtered = KNOWN_CROPS.filter(r => {
    const type = r.ingredientType || "Other";
    const zones = r.zones || [];
    return (
      activeTypes.has(type) &&
      (r.name.toLowerCase().includes(query) ||
        type.toLowerCase().includes(query) ||
        zones.some(z => z.toLowerCase().includes(query)))
    );
  });

  return (
    <div>
      <div className="panel-toolbar">
        <input
          type="search"
          placeholder="Search crops, types, or zones..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-row">
        <span className="filter-label">Filters</span>
        {INGREDIENT_TYPES.map(type => (
          <label key={type} className="filter-checkbox">
            <input
              type="checkbox"
              checked={activeTypes.has(type)}
              onChange={() => handleToggleType(type)}
            />
            {type}
          </label>
        ))}
        <span className="filter-actions">
          <button
            type="button"
            className="link-button"
            onClick={() => setActiveTypes(new Set(INGREDIENT_TYPES))}
          >
            Select all
          </button>
          <button
            type="button"
            className="link-button"
            onClick={() => setActiveTypes(new Set())}
          >
            Clear filters
          </button>
        </span>
      </div>
      <DataTable columns={columns} rows={filtered} getRowKey={r => r.name} />
    </div>
  );
}
