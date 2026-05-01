-- Run this SQL in Supabase SQL Editor to fix the RLS policy
-- This allows public inserts to the products table (needed for testing)

CREATE POLICY "Public insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update products" ON products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete products" ON products FOR DELETE USING (true);
