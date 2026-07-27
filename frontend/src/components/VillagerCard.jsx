// The five in-game hangout roles, each granting a gathering bonus.
const HANGOUT_ROLES = [
  "Digging", "Fishing", "Foraging", "Gardening", "Mining", "Timebending",
];

export default function VillagerCard({ villager, isFirst, isLast, onLevelChange, onLevelCommit, onGiftChange, onGiftCommit, onNotesChange, onNotesCommit, onToggle, onRoleChange, onMove, onDelete }) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="reorder-buttons">
          <button type="button" className="reorder-btn" title="Move up" disabled={isFirst} onClick={() => onMove(villager.id, "up")}>▲</button>
          <button type="button" className="reorder-btn" title="Move down" disabled={isLast} onClick={() => onMove(villager.id, "down")}>▼</button>
        </div>
        {villager.portrait ? (
          <img className="card-portrait" src={`/${villager.portrait}`} alt="" />
        ) : (
          <span className="card-emoji">{villager.emoji || "⭐"}</span>
        )}
        <div>
          <div className="card-title">{villager.name}</div>
          <div className="card-subtitle">{villager.realm}</div>
        </div>
      </div>

      <div className="level-row">
        <label style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase" }}>Friendship</label>
        <input
          type="range"
          min="1"
          max="10"
          value={villager.level}
          onChange={e => onLevelChange(villager.id, Number(e.target.value))}
          onMouseUp={e => onLevelCommit(villager.id, Number(e.target.value))}
          onTouchEnd={e => onLevelCommit(villager.id, Number(e.target.value))}
        />
        <span className="level-badge">{villager.level}/10</span>
      </div>

      <div className="field-row">
        <label>Today's Favorite Gifts</label>
        <div className="gift-inputs">
          {[1, 2, 3].map(n => {
            const given = villager[`gift_${n}_given`];
            return (
              <div className="gift-row" key={n}>
                <input
                  type="checkbox"
                  className="gift-check"
                  checked={given}
                  // Nothing to tick off until a gift has been named.
                  disabled={!villager[`gift_${n}`].trim()}
                  aria-label={`Gift ${n} given`}
                  title={given ? "Given — click to undo" : "Mark as given"}
                  onChange={e => onToggle(villager.id, `gift_${n}_given`, e.target.checked)}
                />
                <input
                  type="text"
                  className={given ? "gift-given" : ""}
                  placeholder={`Gift ${n}`}
                  value={villager[`gift_${n}`]}
                  onChange={e => onGiftChange(villager.id, n, e.target.value)}
                  onBlur={e => onGiftCommit(villager.id, n, e.target.value)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="field-row">
        <label htmlFor={`role-${villager.id}`}>Hangout Bonus</label>
        <select
          id={`role-${villager.id}`}
          className="role-select"
          value={villager.hangout_role || ""}
          onChange={e => onRoleChange(villager.id, e.target.value)}
        >
          <option value="">— None assigned —</option>
          {HANGOUT_ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="field-row">
        <label>Additional Tasks</label>
        <div className="toggle-row">
          <button
            type="button"
            className={`toggle-btn ${villager.scramblecoin ? "on" : ""}`}
            onClick={() => onToggle(villager.id, "scramblecoin", !villager.scramblecoin)}
          >
            🪙 Scramblecoin{villager.scramblecoin ? " ✓" : ""}
          </button>
          <button
            type="button"
            className={`toggle-btn ${villager.discussion ? "on" : ""}`}
            onClick={() => onToggle(villager.id, "discussion", !villager.discussion)}
          >
            💬 Discussion{villager.discussion ? " ✓" : ""}
          </button>
        </div>
      </div>

      <div className="field-row">
        <label>Notes</label>
        <textarea
          className="notes-input"
          placeholder="e.g. currently on their fetch quest…"
          value={villager.notes}
          onChange={e => onNotesChange(villager.id, e.target.value)}
          onBlur={e => onNotesCommit(villager.id, e.target.value)}
        />
      </div>

      <div className="card-footer">
        <button type="button" className="danger" onClick={() => onDelete(villager.id, villager.name)}>Delete</button>
      </div>
    </div>
  );
}
