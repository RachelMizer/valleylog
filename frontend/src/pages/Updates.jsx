import UPDATES from "../data/updates.json";

// Entries are stored newest-first in updates.json; posting one is a single edit
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

export default function Updates() {
  return (
    <div className="page info-page">
      <header className="panel-header">
        <h2>Site Updates</h2>
        <p>What's changed on Valley Log, newest first.</p>
      </header>

      {ENTRIES.length === 0 ? (
        // The nav link is unconditional now, so unlike the old header widget
        // this page is reachable with nothing to show and needs to say so.
        <section className="info-section">
          <p>No updates have been posted yet. Check back soon!</p>
        </section>
      ) : (
        <ol className="updates-list">
          {ENTRIES.map(entry => (
            <li key={`${entry.date}|${entry.note.slice(0, 32)}`}>
              <time dateTime={entry.date}>{formatDate(entry.date)}</time>
              <p>{entry.note}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
