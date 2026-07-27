import { useState } from "react";
import { changeEmail, changePassword, changeUsername } from "../api";
import { useAuth } from "../context/AuthContext";

function AccountRow({ label, value, isEditing, onChange, onCancel, children }) {
  if (isEditing) {
    return (
      <div className="account-row account-row-editing">
        {children}
        <button type="button" className="link-button account-row-cancel" onClick={onCancel}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="account-row">
      <div>
        <div className="account-row-label">{label}</div>
        <div className="account-row-value">{value}</div>
      </div>
      <button type="button" className="link-button" onClick={onChange}>Change</button>
    </div>
  );
}

function UsernameForm({ user, onSaved }) {
  const [newUsername, setNewUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const updated = await changeUsername(newUsername, password);
      onSaved(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="auth-form account-inline-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <label>
        New username
        <input value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
      </label>
      <label>
        Current password
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button type="submit" disabled={submitting}>{submitting ? "Saving…" : "Save username"}</button>
    </form>
  );
}

function EmailForm({ user, onSaved }) {
  const [newEmail, setNewEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const updated = await changeEmail(newEmail, password);
      onSaved(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="auth-form account-inline-form" onSubmit={handleSubmit}>
      <p>Changing your email will require you to verify the new address again.</p>
      {error && <p className="form-error">{error}</p>}
      <label>
        New email
        <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} required />
      </label>
      <label>
        Current password
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button type="submit" disabled={submitting}>{submitting ? "Saving…" : "Save email"}</button>
    </form>
  );
}

function PasswordForm({ onSaved }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="auth-form account-inline-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <label>
        Current password
        <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
      </label>
      <label>
        New password
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
      </label>
      <button type="submit" disabled={submitting}>{submitting ? "Saving…" : "Save password"}</button>
    </form>
  );
}

export default function Account() {
  const { user, refreshUser } = useAuth();
  const [editing, setEditing] = useState(null);

  if (!user) return null;

  function toggle(field) {
    setEditing(editing === field ? null : field);
  }

  async function handleSaved() {
    await refreshUser();
    setEditing(null);
  }

  return (
    <div className="page">
      <h1>Account Settings</h1>
      <dl className="account-details">
        <dt>Joined</dt>
        <dd>{new Date(user.created_at).toLocaleDateString()}</dd>
      </dl>

      <div className="account-rows">
        <AccountRow
          label="Username"
          value={user.username}
          isEditing={editing === "username"}
          onChange={() => toggle("username")}
          onCancel={() => setEditing(null)}
        >
          <UsernameForm user={user} onSaved={handleSaved} />
        </AccountRow>

        <AccountRow
          label="Email"
          value={user.email}
          isEditing={editing === "email"}
          onChange={() => toggle("email")}
          onCancel={() => setEditing(null)}
        >
          <EmailForm user={user} onSaved={handleSaved} />
        </AccountRow>

        <AccountRow
          label="Password"
          value="••••••••"
          isEditing={editing === "password"}
          onChange={() => toggle("password")}
          onCancel={() => setEditing(null)}
        >
          <PasswordForm onSaved={handleSaved} />
        </AccountRow>
      </div>
    </div>
  );
}
