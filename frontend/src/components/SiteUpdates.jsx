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
  // Nothing to announce yet -- render nothing at all rather than an empty panel
  // taking up header space on every page.
  if (!ENTRIES.length) return null;

  return (
    <section className="site-updates" aria-labelledby="site-updates-heading">
      <h2 className="site-updates-heading" id="site-updates-heading">Site Updates</h2>
      <ol className="site-updates-list">
        {ENTRIES.map(entry => (
          <li key={`${entry.date}|${entry.note.slice(0, 32)}`}>
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            <p>{entry.note}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
