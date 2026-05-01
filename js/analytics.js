// Vercel Web Analytics - Using CDN
// This will be properly bundled when deployed to Vercel
try {
  const analyticsScript = document.createElement('script');
  analyticsScript.src = 'https://cdn.vercel-analytics.com/v1/web.js';
  analyticsScript.async = true;
  analyticsScript.defer = true;
  document.head.appendChild(analyticsScript);
} catch(e) {
  // Analytics is optional, fail gracefully
  console.log('Analytics not available:', e.message);
}

// Export empty track function for compatibility
export function track(event, data) {
  // This will be properly tracked when deployed to Vercel
  if (window.va) {
    window.va('event', event, data);
  }
}
