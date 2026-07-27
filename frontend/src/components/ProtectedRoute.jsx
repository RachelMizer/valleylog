import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// stage: "app" (the regular protected pages), "verify-pending", or "onboarding".
// Redirects to whichever stage the user actually belongs in, in order:
// logged in -> email verified -> onboarded -> the app.
export default function ProtectedRoute({ children, stage = "app" }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  if (!user.is_verified) {
    return stage === "verify-pending" ? children : <Navigate to="/verify-pending" replace />;
  }
  if (!user.has_onboarded) {
    return stage === "onboarding" ? children : <Navigate to="/onboarding" replace />;
  }
  return stage === "app" ? children : <Navigate to="/" replace />;
}
