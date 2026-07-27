import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthed from "./components/RedirectIfAuthed";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Signup from "./pages/Signup";
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
        </Routes>
      </main>
    </>
  );
}
