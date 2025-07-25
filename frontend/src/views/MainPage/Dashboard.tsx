"use client";
import { useEffect } from "react";
import Dashboard from "../../components/main/Dashboard";
import ProductSection from "../../components/main/ProductSection";

import { useProductStore } from "@/store/productStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import useCartStore from "@/store/cartStore";

function MainPage() {
  const { fetchProducts } = useProductStore();
  const { toggleWishlist, isInWishlist, fetchWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { products } = useProductStore();
  useEffect(() => {
    fetchProducts();
    // fetchWishlist()
  }, []);

  return (
    <div>
      <Dashboard />
      <ProductSection
        products={products as any}
        cardWidth={289}
        addToCart={addToCart as any}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
    </div>
  );
}

export default MainPage;
