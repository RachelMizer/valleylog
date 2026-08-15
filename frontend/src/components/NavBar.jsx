import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SiteUpdates from "./SiteUpdates";

export default function NavBar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="top-nav">
      <div className="brand-row">
        <Link to="/" className="brand">
          <img src="/images/valley_log_logo_lt.png" alt="Valley Log" />
        </Link>
      </div>
      <div className="nav-links">
        {loading ? null : user ? (
          <>
            <span className="nav-greeting welcome-heading">Welcome back, {user.username}</span>
            <Link to="/account">Account Settings</Link>
            <button className="link-button" onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
      {/* Its own row in the header's normal flow, below the links, so the
          entries are on screen without a click. */}
      <SiteUpdates />
    </nav>
  );
}
