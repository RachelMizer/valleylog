import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="footer-links">
        <Link to="/help">Help</Link>
        <span className="footer-sep" aria-hidden="true">•</span>
        <Link to="/legal">Legal</Link>
      </nav>
      <p className="footer-note">
        Valley Log — a fan-made companion for Disney Dreamlight Valley.
        Not affiliated with or endorsed by Disney or Gameloft.
      </p>
    </footer>
  );
}
