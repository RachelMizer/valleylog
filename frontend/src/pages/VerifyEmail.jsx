import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState("");
  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    if (!token) {
      setStatus("error");
      setError("Missing verification token.");
      return;
    }

    verifyEmail(token)
      .then(async () => {
        if (user) await refreshUser();
        setStatus("verified");
      })
      .catch(err => {
        setError(err.message);
        setStatus("error");
      });
  }, [token, user, refreshUser]);

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h1>Email verification</h1>
        {status === "verifying" && <p>Verifying your email…</p>}
        {status === "verified" && (
          <>
            <p>Your email is verified.</p>
            {user ? (
              <button type="button" onClick={() => navigate("/")}>Continue</button>
            ) : (
              <p className="auth-switch"><Link to="/login">Log in to continue</Link></p>
            )}
          </>
        )}
        {status === "error" && <p className="form-error">{error}</p>}
      </div>
    </div>
  );
}
