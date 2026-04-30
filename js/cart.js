// Cart management
import { getLocalStorage, setLocalStorage } from "./utils.js";

const CART_KEY = "hans_shop_cart";

export class Cart {
  constructor() {
    this.items = getLocalStorage(CART_KEY, []);
  }

  add(productId, productName, price, qty = 1) {
    const existing = this.items.find(item => item.productId === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ productId, productName, price, qty });
    }
    this.save();
  }

  remove(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    this.save();
  }

  updateQty(productId, qty) {
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.qty = Math.max(0, qty);
      if (item.qty === 0) this.remove(productId);
      else this.save();
    }
  }

  clear() {
    this.items = [];
    this.save();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  save() {
    setLocalStorage(CART_KEY, this.items);
    this.updateUI();
  }

  updateUI() {
    const count = this.getCount();
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? "flex" : "none";
    }
  }

  toJSON() {
    return this.items;
  }

  static fromJSON(data) {
    const cart = new Cart();
    cart.items = data || [];
    return cart;
  }
}

export const cart = new Cart();
cart.updateUI();
