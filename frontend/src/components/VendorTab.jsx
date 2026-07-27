import { useState } from "react";
import KNOWN_VENDOR_ITEMS from "../data/vendor.json";
import DataTable from "./DataTable";

const ITEM_TYPES = [...new Set(KNOWN_VENDOR_ITEMS.map(r => r.itemType))];
const REALMS = [...new Set(KNOWN_VENDOR_ITEMS.map(r => r.realm))];

// Only one vendor is sourced so far, so its column is hidden until a second one
// exists — at which point it appears on its own with no other change needed.
const MULTI_VENDOR = new Set(KNOWN_VENDOR_ITEMS.map(r => r.vendor)).size > 1;

const columns = [
  ...(MULTI_VENDOR ? [{
    key: "vendor", label: "Vendor",
    sortValue: r => r.vendor.toLowerCase(),
    render: r => r.vendor,
  }] : []),
  {
    key: "name", label: "Item",
    sortValue: r => r.name.toLowerCase(),
    render: r => r.name,
  },
  {
    key: "zone", label: "Zone",
    sortValue: r => r.zone.toLowerCase(),
    render: r => r.zone,
  },
  {
    key: "realm", label: "Realm", wrap: true,
    sortValue: r => r.realm.toLowerCase(),
    render: r => r.realm,
  },
  {
    key: "price", label: "Price",
    sortValue: r => r.price,
    render: r => `${r.price.toLocaleString()} Coins`,
  },
];

export default function VendorTab() {
  const [search, setSearch] = useState("");
  const [activeTypes, setActiveTypes] = useState(() => new Set(ITEM_TYPES));
  const [activeRealms, setActiveRealms] = useState(() => new Set(REALMS));

  function toggle(setter, value) {
    setter(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  const query = search.trim().toLowerCase();
  const filtered = KNOWN_VENDOR_ITEMS.filter(r =>
    activeTypes.has(r.itemType) &&
    activeRealms.has(r.realm) &&
    (r.name.toLowerCase().includes(query) ||
      r.zone.toLowerCase().includes(query) ||
      r.realm.toLowerCase().includes(query) ||
      r.itemType.toLowerCase().includes(query) ||
      r.vendor.toLowerCase().includes(query))
  );

  return (
    <div>
      <div className="panel-toolbar">
        <input
          type="search"
          placeholder="Search items, zones, or realms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-row">
        <span className="filter-label">Filters</span>
        {ITEM_TYPES.map(type => (
          <label key={type} className="filter-checkbox">
            <input
              type="checkbox"
              checked={activeTypes.has(type)}
              onChange={() => toggle(setActiveTypes, type)}
            />
            {type}
          </label>
        ))}
        <span className="filter-divider" />
        {REALMS.map(realm => (
          <label key={realm} className="filter-checkbox">
            <input
              type="checkbox"
              checked={activeRealms.has(realm)}
              onChange={() => toggle(setActiveRealms, realm)}
            />
            {realm}
          </label>
        ))}
        <span className="filter-actions">
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setActiveTypes(new Set(ITEM_TYPES));
              setActiveRealms(new Set(REALMS));
            }}
          >
            Select all
          </button>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setActiveTypes(new Set());
              setActiveRealms(new Set());
            }}
          >
            Clear filters
          </button>
        </span>
      </div>
      {/* The same item name recurs across zones (Wheat Seed in several), so the
          row key combines vendor, name and zone. */}
      <DataTable
        columns={columns}
        rows={filtered}
        getRowKey={r => `${r.vendor}|${r.zone}|${r.name}`}
      />
    </div>
  );
}
