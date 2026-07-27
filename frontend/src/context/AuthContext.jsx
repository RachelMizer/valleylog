import { createContext, useContext, useEffect, useState } from "react";
import {
  clearToken,
  fetchCurrentUser,
  getToken,
  loginUser,
  registerUser,
} from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [justOnboarded, setJustOnboarded] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    fetchCurrentUser()
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  async function login(username, password) {
    await loginUser({ username, password });
    const me = await fetchCurrentUser();
    setUser(me);
  }

  async function signup(username, email, password) {
    await registerUser({ username, email, password });
    await login(username, password);
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  async function refreshUser() {
    const me = await fetchCurrentUser();
    setUser(me);
    return me;
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    refreshUser,
    justOnboarded,
    markOnboarded: () => setJustOnboarded(true),
    clearJustOnboarded: () => setJustOnboarded(false),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
