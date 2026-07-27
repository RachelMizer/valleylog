import { useState } from "react";
import { resendVerification } from "../api";
import { useAuth } from "../context/AuthContext";

export default function VerifyPending() {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleResend() {
    setStatus("sending");
    setError("");
    try {
      await resendVerification();
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h1>Verify your email</h1>
        <p>
          We sent a verification link to <strong>{user?.email}</strong>. Click it to
          activate your account, then come back here.
        </p>
        <p>Don't see it? Check your spam or junk folder — it can sometimes land there.</p>
        {status === "sent" && <p className="auth-switch">Sent — check your inbox.</p>}
        {error && <p className="form-error">{error}</p>}
        <button type="button" onClick={handleResend} disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Resend email"}
        </button>
        <p className="auth-switch">
          Wrong account? <button className="link-button" onClick={logout}>Log out</button>
        </p>
      </div>
    </div>
  );
}
