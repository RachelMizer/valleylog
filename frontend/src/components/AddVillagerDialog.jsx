import { forwardRef, useState } from "react";
import KNOWN_VILLAGERS from "../data/villagers.json";

const AddVillagerDialog = forwardRef(function AddVillagerDialog({ trackedNames, onAdd }, ref) {
  const [query, setQuery] = useState("");
  const [customName, setCustomName] = useState("");
  const [customRealm, setCustomRealm] = useState("");

  const trackedLower = new Set([...trackedNames].map(n => n.toLowerCase()));
  const q = query.trim().toLowerCase();
  const options = KNOWN_VILLAGERS.filter(v =>
    !trackedLower.has(v.name.toLowerCase()) &&
    (v.name.toLowerCase().includes(q) || v.realm.toLowerCase().includes(q))
  );

  function handleCustomSubmit(e) {
    e.preventDefault();
    const name = customName.trim();
    if (!name) return;
    onAdd({ name, realm: customRealm.trim(), emoji: "⭐", portrait: null });
    setCustomName("");
    setCustomRealm("");
  }

  return (
    <dialog ref={ref}>
      <h2>Add a Villager</h2>
      <input
        type="search"
        placeholder="Search villagers or realms..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="picker-list">
        {options.length === 0 ? (
          <p className="empty-state">No matching villagers left to add.</p>
        ) : (
          options.map(v => (
            <div className="picker-item" key={v.name}>
              {v.portrait ? (
                <img className="card-portrait small" src={`/${v.portrait}`} alt="" />
              ) : (
                <span className="card-emoji">{v.emoji}</span>
              )}
              <div>
                <div className="result-name">{v.name}</div>
                <div className="result-detail">{v.realm}</div>
              </div>
              <button type="button" onClick={() => onAdd(v)}>+ Add</button>
            </div>
          ))
        )}
      </div>

      <hr />

      <p className="dialog-hint">Not on the list?</p>
      <form className="panel-toolbar" onSubmit={handleCustomSubmit}>
        <input
          type="text"
          placeholder="Custom villager name"
          value={customName}
          onChange={e => setCustomName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Realm (optional)"
          value={customRealm}
          onChange={e => setCustomRealm(e.target.value)}
        />
        <button type="submit">+ Add Custom</button>
      </form>

      <div className="dialog-footer">
        <button type="button" className="secondary" onClick={() => ref.current?.close()}>Close</button>
      </div>
    </dialog>
  );
});

export default AddVillagerDialog;
