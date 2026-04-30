/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./product.html",
    "./cart.html",
    "./checkout.html",
    "./confirmation.html",
    "./tracker.html",
    "./receipt.html",
    "./admin/login.html",
    "./admin/dashboard.html",
    "./admin/orders.html",
    "./admin/products.html",
    "./admin/announcements.html",
    "./admin/settings.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
        cyan: "#00D9FF",
        "navy": "#0F172A",
        "dark-navy": "#020617"
      },
      spacing: {
        "safe-bottom": "max(1rem, env(safe-area-inset-bottom))"
      }
    }
  },
  darkMode: "class",
  plugins: []
}
