export default function Legal() {
  return (
    <div className="page info-page">
      <header className="panel-header">
        <h2>Legal</h2>
        <p>
          Valley Log is an unofficial, fan-made companion tool for Disney
          Dreamlight Valley. It is not affiliated with, authorised by, endorsed
          by, or in any way officially connected to The Walt Disney Company or
          Gameloft.
        </p>
      </header>

      <section className="info-section">
        <h3>Disney-owned material</h3>
        <p>
          All Disney branding, logos, character names, character likenesses,
          artwork, icons, and other game imagery appearing on this site are the
          property of their respective owners, including The Walt Disney Company
          and its affiliates. No claim of ownership is made over any of it.
        </p>
        <p>
          These materials are reproduced here for informational and educational
          purposes — to help players identify items and characters while using
          this reference tool. They are not offered for sale, and no commercial
          use is intended.
        </p>
        <p>
          If you represent a rights holder and would like any material removed,
          please get in touch via the <a href="/help">Help</a> page and it will
          be taken down promptly.
        </p>
      </section>

      <section className="info-section">
        <h3>Everything else</h3>
        <p>
          All other content on this site — the source code, site design, layout,
          written copy, and the organisation and presentation of the reference
          data — is copyright © {new Date().getFullYear()} Iconic Arts. All
          rights reserved.
        </p>
      </section>

      <section className="info-section">
        <h3>No warranty</h3>
        <p>
          The reference data here is compiled on a best-effort basis and is
          provided as-is, without warranty of any kind. Game content changes with
          updates, so values may be incomplete or out of date. Please don't rely
          on it as an authoritative source.
        </p>
      </section>
    </div>
  );
}
