import { useEffect, useRef, useState } from "react";
import {
  addVillager as apiAddVillager,
  clearVillagers,
  deleteVillager,
  listVillagers,
  newDayVillagers,
  reorderVillager,
  updateVillager,
} from "../api";
import AddVillagerDialog from "./AddVillagerDialog";
import VillagerCard from "./VillagerCard";

export default function VillagersTab() {
  const [villagers, setVillagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const dialogRef = useRef(null);
  const moveQueue = useRef(Promise.resolve());

  useEffect(() => {
    listVillagers().then(setVillagers).finally(() => setLoading(false));
  }, []);

  function handleLevelChange(id, level) {
    setVillagers(vs => vs.map(v => (v.id === id ? { ...v, level } : v)));
  }

  function handleLevelCommit(id, level) {
    updateVillager(id, { level });
  }

  function handleGiftChange(id, n, value) {
    setVillagers(vs => vs.map(v => (v.id === id ? { ...v, [`gift_${n}`]: value } : v)));
  }

  function handleGiftCommit(id, n, value) {
    updateVillager(id, { [`gift_${n}`]: value });
  }

  function handleNotesChange(id, notes) {
    setVillagers(vs => vs.map(v => (v.id === id ? { ...v, notes } : v)));
  }

  function handleNotesCommit(id, notes) {
    updateVillager(id, { notes });
  }

  function handleToggle(id, field, value) {
    setVillagers(vs => vs.map(v => (v.id === id ? { ...v, [field]: value } : v)));
    updateVillager(id, { [field]: value });
  }

  function handleRoleChange(id, hangout_role) {
    setVillagers(vs => vs.map(v => (v.id === id ? { ...v, hangout_role } : v)));
    updateVillager(id, { hangout_role });
  }

  function handleMove(id, direction) {
    // Reorder works out the swap from the order it reads server-side, so two
    // requests in flight at once both plan their move from the same pre-move
    // list and the second one undoes or repeats the first. Chaining them means
    // a quick double-click moves two places instead of one or none.
    moveQueue.current = moveQueue.current
      .then(() => reorderVillager(id, direction))
      .then(setVillagers, err => console.error("[villagers] reorder failed:", err));
  }

  async function handleDelete(id, name) {
    if (!confirm(`Remove ${name} from your villager list?`)) return;
    await deleteVillager(id);
    setVillagers(vs => vs.filter(v => v.id !== id));
  }

  async function handleAdd(pick) {
    const created = await apiAddVillager(pick);
    setVillagers(vs => [...vs, created]);
  }

  async function handleNewDay() {
    if (!confirm("Start a new day? This clears today's gifts, Scramblecoin, and discussion for everyone (friendship levels are kept).")) return;
    const updated = await newDayVillagers();
    setVillagers(updated);
  }

  async function handleClearAll() {
    if (villagers.length === 0) return;
    if (!confirm(`Remove all ${villagers.length} villagers from your tracked list? This can't be undone.`)) return;
    await clearVillagers();
    setVillagers([]);
  }

  if (loading) return <p>Loading…</p>;

  const query = search.trim().toLowerCase();
  const filtered = villagers.filter(v =>
    v.name.toLowerCase().includes(query) || (v.realm || "").toLowerCase().includes(query)
  );

  return (
    <div>
      <div className="panel-toolbar">
        <input
          type="search"
          placeholder="Search villagers or realms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="button" title="Clear today's gifts, Scramblecoin, and discussion for everyone (keeps friendship levels)" onClick={handleNewDay}>
          🌅 New Day
        </button>
        <button type="button" onClick={() => dialogRef.current?.showModal()}>+ Add Villager</button>
        <button type="button" className="danger" title="Remove every villager from your tracked list" onClick={handleClearAll}>
          🗑 Clear All
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No villagers found.</p>
      ) : (
        <div className="card-grid">
          {filtered.map(v => {
            const realIndex = villagers.findIndex(x => x.id === v.id);
            return (
              <VillagerCard
                key={v.id}
                villager={v}
                // Up and down move a villager one place in the real list, which
                // is invisible — or looks broken — when a search is hiding the
                // neighbour it swaps with. Reordering waits for a full list.
                canReorder={query === ""}
                isFirst={realIndex === 0}
                isLast={realIndex === villagers.length - 1}
                onLevelChange={handleLevelChange}
                onLevelCommit={handleLevelCommit}
                onGiftChange={handleGiftChange}
                onGiftCommit={handleGiftCommit}
                onNotesChange={handleNotesChange}
                onNotesCommit={handleNotesCommit}
                onToggle={handleToggle}
                onRoleChange={handleRoleChange}
                onMove={handleMove}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      )}

      <AddVillagerDialog
        ref={dialogRef}
        trackedNames={villagers.map(v => v.name)}
        onAdd={pick => {
          handleAdd(pick);
        }}
      />
    </div>
  );
}
