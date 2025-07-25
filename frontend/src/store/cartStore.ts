import { create } from "zustand";
import {
  addToCart,
  fetchCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../services/internal";

interface CartItem {
  _id: string; 
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  incrementQuantity: (cartItemId: string) => Promise<void>;
  decrementQuantity: (cartItemId: string) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  
  fetchCart: async () => {
    try {
      const cartData = await fetchCart();
      set({ cart: cartData.items || [] });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      await addToCart(productId, quantity);
      get().fetchCart(); 
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },

  incrementQuantity: async (cartItemId) => {
    try {
      const cart = get().cart;
      const item: any = cart.find((item) => item._id === cartItemId);
      if (item) {
        await updateCartItemQuantity(cartItemId, item.quantity + 1);
        get().fetchCart(); 
      }
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  },

  decrementQuantity: async (cartItemId) => {
    try {
      const cart = get().cart;
      const item: any = cart.find((item) => item._id === cartItemId);
      if (item && item.quantity > 1) {
        await updateCartItemQuantity(cartItemId, item.quantity - 1); 
        get().fetchCart(); // Refresh cart
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  },

  removeFromCart: async (cartItemId) => {
            console.log(cartItemId, 'previous quantity');

    try {
      await removeCartItem(cartItemId);
      get().fetchCart(); 
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  },
}));

export default useCartStore;
