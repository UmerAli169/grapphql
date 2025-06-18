import { create } from "zustand";
import { getAllCategories } from "../services/internal";

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

interface CategoryState {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const response = await getAllCategories();
      set({ categories: response });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
}));

export default useCategoryStore;
