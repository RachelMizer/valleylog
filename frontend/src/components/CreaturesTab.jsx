import { useState } from "react";
import KNOWN_CREATURES from "../data/creatures.json";
import DataTable from "./DataTable";

const columns = [
  {
    key: "name", label: "Name",
    sortValue: r => r.name.toLowerCase(),
    render: r => r.name,
  },
  {
    key: "locationOrigin", label: "Location/Origin",
    // Nulls sort last in both directions so the populated rows stay together.
    sortValue: r => (r.locationOrigin || "￿").toLowerCase(),
    render: r => r.locationOrigin || "—",
  },
  {
    key: "favoriteFood", label: "Favorite Food", wrap: true,
    sortValue: r => (r.favoriteFood || "￿").toLowerCase(),
    render: r => r.favoriteFood || "—",
  },
  {
    key: "timesAvailable", label: "Times Available", wrap: true,
    sortValue: r => (r.timesAvailable || "￿").toLowerCase(),
    render: r => r.timesAvailable || "—",
  },
];

export default function CreaturesTab() {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filtered = KNOWN_CREATURES.filter(r =>
    r.name.toLowerCase().includes(query) ||
    (r.locationOrigin || "").toLowerCase().includes(query) ||
    (r.favoriteFood || "").toLowerCase().includes(query) ||
    (r.timesAvailable || "").toLowerCase().includes(query)
  );

  return (
    <div>
      <div className="panel-toolbar">
        <input
          type="search"
          placeholder="Search creatures, location, food, or times..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <DataTable columns={columns} rows={filtered} getRowKey={r => r.name} />
    </div>
  );
}
