// Utility functions
export function formatCurrency(cents) {
  return `₱${(cents / 100).toFixed(2)}`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "short", 
    day: "numeric" 
  });
}

export function generateOrderId() {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `HANS-${year}-${seq}`;
}

export function toast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `fixed top-4 right-4 px-4 py-3 rounded-lg text-white z-50 ${
    type === "success" ? "bg-green-600" : 
    type === "error" ? "bg-red-600" : 
    "bg-blue-600"
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 3000);
}

export function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("localStorage write failed:", err);
  }
}

export function getDarkMode() {
  const stored = getLocalStorage("darkMode", null);
  if (stored !== null) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function setDarkMode(enabled) {
  setLocalStorage("darkMode", enabled);
  if (enabled) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function initDarkMode() {
  const dark = getDarkMode();
  setDarkMode(dark);
  
  const toggleBtn = document.getElementById("dark-mode-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const newMode = !document.documentElement.classList.contains("dark");
      setDarkMode(newMode);
    });
  }
}
