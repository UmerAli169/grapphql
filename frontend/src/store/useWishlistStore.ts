import { create } from "zustand";
import {
  getWishlist,
  addToWishlist as apiAddToWishlist,
  removeFromWishlist as apiRemoveFromWishlist,
} from "../services/internal";

interface WishlistState {
  wishlist: string[];
  fetchWishlist: () => Promise<void>;
  addToWishlist: (id: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  toggleWishlist: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],

  fetchWishlist: async () => {
    try {
      const fetchedWishlist: any = await getWishlist();
      set({
        wishlist: Array.isArray(fetchedWishlist.products)
          ? fetchedWishlist.products
          : [],
      });
      return fetchedWishlist;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  },

  addToWishlist: async (product: any) => {
    try {
      await apiAddToWishlist(product._id);
      const { wishlist } = get();

      if (!wishlist.includes(product._id)) {
        set({ wishlist: [...wishlist, product] });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  },

  removeFromWishlist: async (product: any) => {
    try {
      await apiRemoveFromWishlist(product._id);
      const { wishlist } = get();
      set({ wishlist: wishlist.filter((item) => item !== product) });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  },

  toggleWishlist: async (product: any) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = get();
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product);
    } else {
      await addToWishlist(product);
    }
  },

  isInWishlist: (id: string) => {
    const { wishlist } = get();

    return (
      Array.isArray(wishlist) && wishlist.some((item: any) => item._id === id)
    );
  },
}));
