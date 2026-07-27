import { useState } from "react";
import KNOWN_GEMS from "../data/gems.json";
import DataTable from "./DataTable";

function parseNum(str) {
  if (!str) return 0;
  return Number(String(str).replace(/[^0-9.-]/g, "")) || 0;
}

const columns = [
  {
    key: "icon", label: "Icon",
    render: r => (r.icon
      ? <img className="table-thumb" src={`/${r.icon}`} alt="" loading="lazy" />
      : ""),
  },
  {
    key: "name", label: "Name",
    sortValue: r => r.name.toLowerCase(),
    render: r => r.name,
  },
  {
    key: "color", label: "Color",
    sortValue: r => (r.color || "").toLowerCase(),
    render: r => r.color || "—",
  },
  {
    key: "shape", label: "Shape",
    sortValue: r => (r.shape || "").toLowerCase(),
    render: r => r.shape || "—",
  },
  {
    key: "sellPrice", label: "Sell Price",
    sortValue: r => parseNum(r.sellPrice),
    render: r => r.sellPrice ?? "—",
  },
  {
    key: "zones", label: "Zones", wrap: true,
    sortValue: r => (r.zones || []).join(","),
    render: r => (r.zones || []).join(", ") || "—",
  },
];

export default function GemsTab() {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filtered = KNOWN_GEMS.filter(r =>
    r.name.toLowerCase().includes(query) ||
    (r.color || "").toLowerCase().includes(query) ||
    (r.shape || "").toLowerCase().includes(query) ||
    (r.zones || []).some(z => z.toLowerCase().includes(query))
  );

  return (
    <div>
      <div className="panel-toolbar">
        <input
          type="search"
          placeholder="Search gems, colors, or zones..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <DataTable columns={columns} rows={filtered} getRowKey={r => r.name} />
    </div>
  );
}
