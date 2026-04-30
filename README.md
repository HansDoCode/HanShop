# Hans Shop - Roblox Digital Goods Store

## Phase 1: MVP (Complete)

A fully responsive, dark-mode-first e-commerce platform for selling Roblox digital goods with GCash payments.

### ✅ Completed Features

**Customer Storefront:**
- Responsive homepage (375px, 768px, 1200px breakpoints)
- Product grid with search & filtering
- Product detail pages with reviews
- Shopping cart with promo codes
- Checkout form (GCash manual + QR)
- Order confirmation page
- Public order tracker (by Order ID)
- Shareable receipt pages
- Multi-select mode with floating cart tray
- Waitlist for sold-out products
- Dark mode default + light mode toggle

**Seller Admin Panel:**
- Admin login (password-protected)
- Dashboard with summary cards & recent orders
- Order management (approve/reject/fulfill)
- Product manager (add/edit/delete/toggle featured)
- Announcements manager (3 types: info/promo/warning)
- Shop settings (GCash, contact links, order limits, terms)

**Backend:**
- Supabase PostgreSQL database
- Row-level security (RLS) configured
- Authentication: simple password check
- Order management, product catalog, reviews, waitlist

---

## Quick Start

### 1. Set Up Supabase

1. Go to https://supabase.com and create a new project
2. Once created, get your **Project URL** and **Anon Key** from Settings > API

### 2. Create Database Tables

Run these SQL queries in Supabase SQL Editor:

```sql
-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  stock INT DEFAULT 0,
  rate INT DEFAULT 0,
  max_qty_per_order INT DEFAULT 10,
  low_stock_threshold INT DEFAULT 3,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  roblox_username TEXT NOT NULL,
  total INT DEFAULT 0,
  subtotal INT DEFAULT 0,
  discount INT DEFAULT 0,
  payment_method TEXT,
  gcash_ref TEXT,
  proof_image_url TEXT,
  status TEXT DEFAULT 'pending',
  rejection_reason TEXT,
  seller_note TEXT,
  trusted_buyer_tier TEXT DEFAULT 'regular',
  created_at TIMESTAMP DEFAULT NOW(),
  fulfilled_at TIMESTAMP
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  qty INT DEFAULT 1,
  unit_price INT DEFAULT 0,
  line_total INT DEFAULT 0
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT UNIQUE REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  roblox_username TEXT,
  stars INT CHECK (stars >= 1 AND stars <= 5),
  text TEXT,
  seller_reply TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Waitlist
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  roblox_username TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Announcements
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  start_date TIMESTAMP,
  expiry_date TIMESTAMP,
  dismissible BOOLEAN DEFAULT TRUE,
  force_show BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Settings
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- Promo Codes
CREATE TABLE promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE,
  discount_type TEXT,
  discount_value INT,
  expiry_date TIMESTAMP,
  usage_limit INT,
  usage_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public read on products
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public read order_items" ON order_items FOR SELECT USING (true);

-- Allow public inserts for orders and reviews
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert waitlist" ON waitlist FOR INSERT WITH CHECK (true);
```

### 3. Update Configuration

1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials

### 4. Install Dependencies & Build

```bash
npm install
npm run build:css
```

### 5. Run Local Development

```bash
npm run watch:css
# In another terminal, open index.html in a live server
```

### 6. Admin Login

**URL:** `/admin/login.html`  
**Demo Credentials:**
- Username: `seller`
- Password: `hans123`

---

## File Structure

```
/
  index.html .......................... Homepage
  product.html ........................ Product detail
  cart.html ........................... Shopping cart
  checkout.html ....................... Checkout form
  confirmation.html ................... Order confirmation
  tracker.html ........................ Order tracker (public)
  receipt.html ........................ Receipt page (public)
  
  admin/
    login.html ........................ Admin login
    dashboard.html .................... Admin dashboard
    orders.html ....................... Order management
    products.html ..................... Product manager
    announcements.html ................ Announcements
    settings.html ..................... Shop settings
  
  css/
    input.css ......................... Tailwind source
  
  js/
    supabase.js ....................... Supabase client
    utils.js .......................... Utility functions
    cart.js ........................... Cart management
    order.js .......................... Order operations
    admin.js .......................... Admin auth
  
  output.css .......................... Compiled Tailwind (auto-generated)
  package.json ........................ Dependencies
  tailwind.config.js .................. Tailwind config
```

---

## Styling

- **Color Scheme:** Dark navy/black with gold & cyan accents (Roblox-themed)
- **Dark Mode:** Default, toggle stored in localStorage
- **Responsive:** Mobile (375px), Tablet (768px), Desktop (1200px)
- **Framework:** Tailwind CSS v4 + custom components

---

## Payment Integration

GCash payments configured in Admin > Settings:
- Upload QR code image URL
- Store account name & number
- Customers choose: QR scan OR manual transfer + proof upload

---

## Next Steps (Phase 2)

- Full bundle manager + analytics
- Advanced analytics dashboard
- Stock reservation (15-min cart hold)
- Promo/voucher code system (full management)
- Custom order requests board
- Trusted buyer tier manual controls
- Email notifications
- Receipt PNG export with html2canvas
- Receipt settings (logo upload, color theme)

---

## Deployment

### Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

---

## Support

For issues or questions:
- **Facebook:** [Your Facebook URL]
- **Discord:** [Your Discord Invite]
- **Instagram:** [Your Instagram URL]

---

**Built with ❤️ for Hans Shop**
