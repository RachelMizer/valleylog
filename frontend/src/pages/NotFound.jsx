import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page info-page">
      <header className="panel-header">
        <h2>Page not found</h2>
        <p>
          That address doesn't lead anywhere in Valley Log. It may have been
          mistyped, or it may be a link that no longer points at anything.
        </p>
      </header>

      <section className="info-section">
        <h3>Looking for a tab?</h3>
        <p>
          The reference tabs — Villagers, Tasks, Cooking, Crops, Creatures, Fish,
          Gems, Vendor Ware and Crafting — all live together on the main page
          rather than at their own addresses, so something like{" "}
          <code>/cooking</code> won't resolve on its own. Head back and pick the
          tab from there.
        </p>
        <p>
          <Link to="/">Back to Valley Log</Link>
        </p>
      </section>

      <section className="info-section">
        <h3>Still stuck?</h3>
        <p>
          If you followed a link from inside the app and landed here, that's a
          bug worth reporting — the <Link to="/help">Help</Link> page has the
          details worth including.
        </p>
      </section>
    </div>
  );
}
