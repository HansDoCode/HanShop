// Admin authentication
import { getLocalStorage, setLocalStorage } from "./utils.js";

export function requireAdmin() {
  const session = getLocalStorage("admin_session");
  if (!session) {
    window.location.href = "/admin/login.html";
    return false;
  }
  return true;
}

export function logout() {
  setLocalStorage("admin_session", null);
  window.location.href = "/admin/login.html";
}

export function getAdminUsername() {
  const session = getLocalStorage("admin_session");
  return session?.username || "Admin";
}
