import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        {/* Outside the auth branches so it shows in both states, and rendered
            during `loading` too — it's public, so there's nothing to wait for. */}
        <Link to="/updates">Site Updates</Link>
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
    </nav>
  );
}
