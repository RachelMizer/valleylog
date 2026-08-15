import { useEffect, useRef, useState } from "react";
import UPDATES from "../data/updates.json";

// Entries are stored newest-first in updates.json; adding one is a single edit
// to that file and needs no change here.
const ENTRIES = UPDATES;

// Dates are plain "YYYY-MM-DD" strings. `new Date("2026-08-15")` parses those as
// UTC midnight, which formats as the *previous* day for every reader west of
// Greenwich, so the parts are passed separately to build a local date instead.
function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function SiteUpdates() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e) {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Nothing to announce yet -- render no control at all rather than an empty one.
  if (!ENTRIES.length) return null;

  return (
    <div className="site-updates" ref={wrapRef}>
      <button
        type="button"
        className="site-updates-toggle"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        Site Updates
        <span className="site-updates-latest">{formatDate(ENTRIES[0].date)}</span>
      </button>

      {open && (
        <div className="site-updates-panel">
          <h2 className="site-updates-heading">Site Updates</h2>
          <ol className="site-updates-list">
            {ENTRIES.map(entry => (
              <li key={`${entry.date}|${entry.note.slice(0, 32)}`}>
                <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                <p>{entry.note}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
