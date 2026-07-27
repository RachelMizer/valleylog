import { useState } from "react";
import KNOWN_FISH from "../data/fish.json";
import DataTable from "./DataTable";

function parseNum(str) {
  if (!str) return 0;
  return Number(String(str).replace(/,/g, "")) || 0;
}

const columns = [
  {
    key: "name", label: "Name",
    sortValue: r => r.name.toLowerCase(),
    render: r => r.name,
  },
  {
    key: "zones", label: "Zones", wrap: true,
    sortValue: r => (r.zones || []).join(","),
    render: r => (r.zones || []).join(", ") || "—",
  },
  {
    key: "ripples", label: "Ripples",
    sortValue: r => (r.ripples || "").toLowerCase(),
    render: r => r.ripples || "—",
  },
  {
    key: "sellPrice", label: "Sell Price",
    sortValue: r => parseNum(r.sellPrice),
    render: r => r.sellPrice ?? "—",
  },
  {
    key: "energy", label: "Energy",
    sortValue: r => parseNum(r.energy),
    render: r => r.energy ?? "—",
  },
  {
    key: "notes", label: "Notes", wrap: true,
    sortValue: r => (r.notes || "").toLowerCase(),
    render: r => r.notes || "—",
  },
];

export default function FishTab() {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filtered = KNOWN_FISH.filter(r =>
    r.name.toLowerCase().includes(query) ||
    (r.zones || []).some(z => z.toLowerCase().includes(query)) ||
    (r.ripples || "").toLowerCase().includes(query) ||
    (r.notes || "").toLowerCase().includes(query)
  );

  return (
    <div>
      <div className="panel-toolbar">
        <input
          type="search"
          placeholder="Search fish, zones, or ripples..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <DataTable columns={columns} rows={filtered} getRowKey={r => r.name} />
    </div>
  );
}
