// Vercel Web Analytics
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject({
  mode: import.meta.env?.MODE === 'development' ? 'development' : 'production',
});

// Export for potential custom event tracking
export { track } from '@vercel/analytics';
