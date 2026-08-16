import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthed from "./components/RedirectIfAuthed";
import SiteFooter from "./components/SiteFooter";
import Account from "./pages/Account";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Legal from "./pages/Legal";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Signup from "./pages/Signup";
import Updates from "./pages/Updates";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyPending from "./pages/VerifyPending";

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify-pending"
            element={
              <ProtectedRoute stage="verify-pending">
                <VerifyPending />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute stage="onboarding">
                <Onboarding />
              </ProtectedRoute>
            }
          />
          {/* Public: reachable from the footer whether or not you're signed in. */}
          <Route path="/help" element={<Help />} />
          <Route path="/legal" element={<Legal />} />
          {/* Also public, and linked from the nav in both auth states, so it
              must not sit behind ProtectedRoute. */}
          <Route path="/updates" element={<Updates />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/login"
            element={
              <RedirectIfAuthed>
                <Login />
              </RedirectIfAuthed>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfAuthed>
                <Signup />
              </RedirectIfAuthed>
            }
          />
          {/* Catch-all. netlify.toml rewrites every unknown path to index.html
              so React Router can handle deep links, which means an address like
              /cooking arrives here rather than 404ing at the CDN. Without this
              route nothing matches and <main> renders empty — a blank page
              rather than an explanation. Public, so it works signed out too. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
