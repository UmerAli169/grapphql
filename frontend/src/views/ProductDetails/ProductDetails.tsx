"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductSection from "@/components/main/ProductSection";
import ProductDetails from "@/components/productdetails/ProductDetails";
import ReviewSection from "@/components/productdetails/ReviewSection";
import { useProductStore } from "@/store/productStore";
import {useWishlistStore} from "@/store/useWishlistStore";
import useCartStore from "@/store/cartStore";
import { useParams } from "react-router-dom";

function Page() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");   
  const { product, fetchProduct, likeproduct, productdetails }: any =
    useProductStore();
  // const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  useEffect(() => {
    const getProduct = async () => {
      if (!productId) return;

      try {
     await fetchProduct(productId);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [productId]);

  return (
    <div className="py-[40px]">
      {product && <ProductDetails productInfo={product} />}
      <ReviewSection productId={productId as string} />
      
    </div>
  );
}

export default Page;
