import { create } from "zustand";
import { getAllProducts, getProductById } from "../services/internal";

interface Product {
  _id: string;
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
  recommendedFor: string;
  blog: string;
}

interface ProductState {
  blogs: Product[];
  products: Product[];
  bestSellers: Product[];
  newArrivals: Product[];
  likeproduct: Product[];
  productdetails: Product[];
  product: Product | null;
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  bestSellers: [],
  newArrivals: [],
  blogs: [],
  productdetails: [],
  likeproduct: [],
  product: null,

  fetchProducts: async () => {
    try { 
      const response = await getAllProducts();
      const formattedProducts: Product[] = response?.map((product: any) => ({
        _id: product._id,
        tittle: product.tittle,
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.image,
        category: product.category,
        subcategory: product.subcategory,
        description: product.description,
        imageUrl: product.imageUrl,
        thumbnailImages: product.thumbnailImages || [],
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        size: product.size || [],
        recommendedFor: product.recommendedFor || "",
        blog: product.blog || "",
      }));

      set({
        products: formattedProducts,
        bestSellers: formattedProducts?.filter(
          (p) => p.tittle === "Best Sellers"
        ),
        newArrivals: formattedProducts?.filter(
          (p) => p.tittle === "New Arrivals"
        ),
        productdetails: formattedProducts?.filter(
          (p) => p.tittle === "Recently Viewed Products"
        ),
        blogs: formattedProducts?.filter((p) => p.tittle === "On the Blog"),
        likeproduct: formattedProducts?.filter(
          (p) => p.tittle === "You May Also Like"
        ),
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  fetchProduct: async (id) => {
    try {
      const response = await getProductById(id);
      set({ product: response });
      return response
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
}));

export default useProductStore;
