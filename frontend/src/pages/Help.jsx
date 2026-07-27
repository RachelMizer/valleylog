const CONTACT_EMAIL = "valleylog.app@gmail.com";

export default function Help() {
  return (
    <div className="page info-page">
      <header className="panel-header">
        <h2>Help</h2>
        <p>
          Questions, bug reports, and suggestions are all welcome — Valley Log is
          a small project and feedback genuinely shapes it.
        </p>
      </header>

      <section className="info-section">
        <h3>Get in touch</h3>
        <p>
          Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and
          you'll get a reply as soon as possible.
        </p>
      </section>

      <section className="info-section">
        <h3>What to include</h3>
        <p>
          If something looks wrong, these details make it much faster to track
          down:
        </p>
        <ul>
          <li>Which tab or page you were on.</li>
          <li>What you expected to happen, and what happened instead.</li>
          <li>
            For incorrect reference data, the item name and the value you believe
            is right.
          </li>
          <li>Your browser, and a screenshot if you have one handy.</li>
        </ul>
      </section>

      <section className="info-section">
        <h3>A note on the data</h3>
        <p>
          The reference tables are compiled from published guides and in-game
          information. Game updates change recipes, prices, and drop locations
          regularly, so if a value looks out of date it may well be — please do
          report it.
        </p>
      </section>
    </div>
  );
}
