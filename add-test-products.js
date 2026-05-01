const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://cfofyhqozqdfebyvibgn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmb2Z5aHFvenFkZmVieXZpYmduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NzYxODIsImV4cCI6MjA5MzE1MjE4Mn0.WIteVaI8wRzQM5a0joNOOtWE1WsGSKE0LSnjxT8Rm0M";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const testProducts = [
  {
    name: "Robux 400",
    description: "400 Robux for your Roblox account",
    image_url: "https://images.unsplash.com/photo-1579546066866-1ad4bbd267f5?w=400&h=400&fit=crop",
    stock: 50,
    rate: 15000,
    featured: false
  },
  {
    name: "Premium Pass (30 Days)",
    description: "30-day premium pass with exclusive benefits",
    image_url: "https://images.unsplash.com/photo-1602570945546-5da7b1f81f70?w=400&h=400&fit=crop",
    stock: 30,
    rate: 20000,
    featured: false
  },
  {
    name: "Exclusive Avatar Set",
    description: "Limited edition avatar items and accessories",
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
    stock: 10,
    rate: 25000,
    featured: true
  },
  {
    name: "VIP Game Pass",
    description: "VIP access to premium game experiences",
    image_url: "https://images.unsplash.com/photo-1511512578615-a3ec3c760115?w=400&h=400&fit=crop",
    stock: 15,
    rate: 30000,
    featured: true
  },
  {
    name: "Pet Bundle",
    description: "5 limited edition pets for your Roblox avatar",
    image_url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop",
    stock: 20,
    rate: 18000,
    featured: false
  }
];

async function addProducts() {
  console.log("Adding test products to Supabase...");
  
  for (const product of testProducts) {
    const { data, error } = await supabase
      .from("products")
      .insert([product])
      .select();
    
    if (error) {
      console.error(`Error adding ${product.name}:`, error);
    } else {
      console.log(`✓ Added: ${product.name}`);
    }
  }
  
  console.log("Done!");
}

addProducts().catch(err => console.error("Script error:", err));
