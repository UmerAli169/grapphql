import { create } from "zustand";
import { getAllProducts, getProductById } from "../services/internal";

interface Product {
  id: string;
  tittle: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  category: string;
  subcategory: string;
  description: string;
  imageUrl: string;
  thumbnailImages: string[];
  rating: number;
  reviews: number;
  size: string[];
  recommendFor: string;
  blog: string;
}  

interface ProductState {
  products: Product[];
  product: Product | null;
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  product: null,

  fetchProducts: async () => {
    try {
      const response = await getAllProducts();
      set({
        products: response,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  fetchProduct: async (id) => {
    try {
      const response = await getProductById(id);
      set({ product: response });
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
}));

export default useProductStore;
