// The API is a Netlify Function on this same site, mapped to /api by the
// redirect in netlify.toml, so the default is relative: no host to configure,
// no CORS, and nothing that can point at the visitor's own machine the way the
// previous http://localhost:8000 fallback did. Override only to aim a local
// dev server at a deployed API.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const TOKEN_KEY = "vl_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      // response wasn't JSON, fall back to statusText
    }
    throw new Error(detail);
  }

  if (res.status === 204) return null;
  return res.json();
}

export function registerUser({ username, email, password }) {
  return request("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
}

export async function loginUser({ username, password }) {
  const body = new URLSearchParams({ username, password });
  const data = await request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  setToken(data.access_token);
  return data;
}

export function fetchCurrentUser() {
  return request("/auth/me");
}

export function verifyEmail(token) {
  return request("/auth/verify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
}

export function resendVerification() {
  return request("/auth/resend-verification", { method: "POST" });
}

export function completeOnboarding() {
  return request("/auth/complete-onboarding", { method: "POST" });
}

const jsonHeaders = { "Content-Type": "application/json" };

export function listVillagers() {
  return request("/villagers");
}

export function addVillager({ name, realm, emoji, portrait }) {
  return request("/villagers", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ name, realm, emoji, portrait }),
  });
}

export function updateVillager(id, updates) {
  return request(`/villagers/${id}`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify(updates),
  });
}

export function deleteVillager(id) {
  return request(`/villagers/${id}`, { method: "DELETE" });
}

export function reorderVillager(id, direction) {
  return request(`/villagers/${id}/reorder`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ direction }),
  });
}

export function newDayVillagers() {
  return request("/villagers/new-day", { method: "POST" });
}

export function clearVillagers() {
  return request("/villagers", { method: "DELETE" });
}

export function changeUsername(new_username, current_password) {
  return request("/auth/change-username", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ new_username, current_password }),
  });
}

export function changeEmail(new_email, current_password) {
  return request("/auth/change-email", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ new_email, current_password }),
  });
}

export function changePassword(current_password, new_password) {
  return request("/auth/change-password", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ current_password, new_password }),
  });
}

export function listTasks() {
  return request("/tasks");
}

export function addTask(text, category) {
  return request("/tasks", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ text, category }),
  });
}

export function updateTask(id, updates) {
  return request(`/tasks/${id}`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify(updates),
  });
}

export function deleteTask(id) {
  return request(`/tasks/${id}`, { method: "DELETE" });
}

export function listRecipeProgress() {
  return request("/recipes/progress");
}

export function upsertRecipeProgress(name, discovered) {
  return request("/recipes/progress", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ name, discovered }),
  });
}
