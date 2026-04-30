// Order management
import { supabase } from "./supabase.js";
import { generateOrderId, toast, formatCurrency } from "./utils.js";
import { cart } from "./cart.js";

export class Order {
  static async submit(customerData) {
    try {
      const orderId = generateOrderId();
      const total = cart.getTotal();
      
      // Insert order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{
          id: orderId,
          customer_name: customerData.name,
          roblox_username: customerData.robloxUsername,
          total: total,
          subtotal: total,
          discount: 0,
          payment_method: "gcash_manual",
          gcash_ref: customerData.gcashRef || null,
          proof_image_url: customerData.proofImageUrl || null,
          status: "pending",
          created_at: new Date().toISOString(),
          trusted_buyer_tier: "regular"
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const items = cart.items.map(item => ({
        order_id: orderId,
        product_id: item.productId,
        qty: item.qty,
        unit_price: item.price,
        line_total: item.price * item.qty
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items);

      if (itemsError) throw itemsError;

      // Clear cart
      cart.clear();

      // Store order confirmation in session
      sessionStorage.setItem("lastOrderId", orderId);
      
      toast("✓ Order submitted successfully!", "success");
      return orderId;
    } catch (err) {
      console.error("Order submission error:", err);
      toast("✗ Failed to submit order: " + err.message, "error");
      throw err;
    }
  }

  static async fetchById(orderId) {
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *,
            products ( name, image_url )
          )
        `)
        .eq("id", orderId)
        .single();

      if (error) throw error;
      return order;
    } catch (err) {
      console.error("Fetch order error:", err);
      return null;
    }
  }

  static async addReview(orderId, productId, stars, text) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert([{
          order_id: orderId,
          product_id: productId,
          roblox_username: "", // Will be fetched from order
          stars: stars,
          text: text,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      toast("✓ Review submitted!", "success");
      return data;
    } catch (err) {
      console.error("Review submission error:", err);
      toast("✗ Failed to submit review: " + err.message, "error");
      throw err;
    }
  }

  static async updateStatus(orderId, newStatus, reason = null) {
    try {
      const updateData = { status: newStatus };
      if (reason) updateData.rejection_reason = reason;
      if (newStatus === "fulfilled") updateData.fulfilled_at = new Date().toISOString();

      const { error } = await supabase
        .from("orders")
        .update(updateData)
        .eq("id", orderId);

      if (error) throw error;
      toast(`✓ Order ${orderId} updated to ${newStatus}`, "success");
      return true;
    } catch (err) {
      console.error("Status update error:", err);
      toast("✗ Failed to update status: " + err.message, "error");
      return false;
    }
  }

  static generateChatMessage(order) {
    const items = order.order_items.map(oi => `${oi.products.name} x${oi.qty}`).join(", ");
    return `Hi! Order #${order.id}
Name: ${order.customer_name} | Roblox: ${order.roblox_username}
Items: ${items}
Total: ${formatCurrency(order.total)}
Payment: ${order.payment_method === "gcash_manual" ? "GCash Manual" : "GCash QR"}`;
  }
}
