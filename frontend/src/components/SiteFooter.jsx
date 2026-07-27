import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="footer-links">
        <Link to="/help">Help</Link>
        <span className="footer-sep" aria-hidden="true">•</span>
        <Link to="/legal">Legal</Link>
      </nav>
    </footer>
  );
}
