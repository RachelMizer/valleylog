import { useState } from "react";
import KNOWN_CREATURES from "../data/creatures.json";
import DataTable from "./DataTable";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Availability rotates on a weekly cycle, so "today" is the reading that actually matters.
const todayIndex = new Date().getDay();
const todayKey = DAY_KEYS[todayIndex];

const todayWindow = r => r.schedule?.[todayKey] || null;

const columns = [
  {
    // Only the snippets carry artwork so far, so the header stays blank and
    // creatures without an image simply leave the cell empty.
    key: "image", label: "",
    render: r => (r.image
      ? <img className="table-thumb" src={encodeURI(`/${r.image}`)} alt="" loading="lazy" />
      : ""),
  },
  {
    key: "name", label: "Name",
    sortValue: r => r.name.toLowerCase(),
    render: r => r.name,
  },
  {
    // Snippets come in families (Birds, Demons, Frogs); the befriendable
    // creatures have no equivalent grouping in the source data.
    key: "type", label: "Type",
    sortValue: r => (r.type || "￿").toLowerCase(),
    render: r => r.type || "—",
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
  {
    key: "today", label: `Today (${DAY_NAMES[todayIndex]})`, wrap: true,
    sortValue: r => (todayWindow(r) || "￿").toLowerCase(),
    render: r => todayWindow(r) || "—",
  },
  {
    // Sorts unpriced rows last in both directions, matching how the text
    // columns push their nulls to the end.
    key: "sellPrice", label: "Sell Price",
    sortValue: r => (r.sellPrice == null ? Number.POSITIVE_INFINITY : r.sellPrice),
    render: r => (r.sellPrice == null ? "—" : r.sellPrice),
  },
];

export default function CreaturesTab() {
  const [search, setSearch] = useState("");
  const [todayOnly, setTodayOnly] = useState(false);

  const query = search.trim().toLowerCase();
  const filtered = KNOWN_CREATURES.filter(r =>
    (!todayOnly || todayWindow(r)) && (
      r.name.toLowerCase().includes(query) ||
      (r.type || "").toLowerCase().includes(query) ||
      (r.locationOrigin || "").toLowerCase().includes(query) ||
      (r.favoriteFood || "").toLowerCase().includes(query) ||
      (r.timesAvailable || "").toLowerCase().includes(query)
    )
  );

  return (
    <div>
      <div className="panel-toolbar">
        <input
          type="search"
          placeholder="Search creatures, type, location, food, or times..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-row">
        <span className="filter-label">Filters</span>
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={todayOnly}
            onChange={e => setTodayOnly(e.target.checked)}
          />
          Only show creatures out on {DAY_NAMES[todayIndex]}
        </label>
      </div>
      <DataTable columns={columns} rows={filtered} getRowKey={r => r.name} />
    </div>
  );
}
