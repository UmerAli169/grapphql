"use client";
import { useEffect } from "react";
import Dashboard from "../../components/main/Dashboard";
import ProductSection from "../../components/main/ProductSection";
import Frame from "../../components/main/Frame";
import BlogSection from "../../components/shared/BlogSections";
import SkinQuiz from "@/components/main/SkinQuiz"; 
import InstagramGallery from "../../components/main/InstagramGallery";
import { useProductStore } from "@/store/productStore";
import {useWishlistStore} from "@/store/useWishlistStore";
import useCartStore from "@/store/cartStore";

function MainPage() {
  const { bestSellers, newArrivals, fetchProducts, blogs } = useProductStore();
  const { toggleWishlist, isInWishlist,fetchWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  useEffect(() => {
    fetchProducts();
    fetchWishlist()
  }, []);
  
  return (
    <div>
      <Dashboard />
      <ProductSection
        products={newArrivals as any}
        cardWidth={289}
        addToCart={addToCart as any}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
      <ProductSection
        products={bestSellers as any}
        cardWidth={289}
        addToCart={addToCart as any}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
      <Frame />
      <BlogSection products={blogs as any} cardWidth={392} />
      <SkinQuiz />
      <InstagramGallery />
    </div>
  );
}

export default MainPage;
