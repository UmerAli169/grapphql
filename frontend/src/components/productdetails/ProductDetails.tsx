"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../shared/Button";
import Wrapper from "@/app/wrapper";
import { CartModal } from "../model/RightModal";
import { useProductStore } from "@/store/productStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useCartStore } from "../../store/cartStore";
import aboutData from "../../Data/productDetails/details.json";

interface ProductProps {
  productInfo: string | number;
}

const ProductDetails = ({ productInfo }: ProductProps) => {
  const { product } = useProductStore();

  // const { wishlist, fetchWishlist, toggleWishlist, isInWishlist }: any =
  //   useWishlistStore();
  // const { addToCart, cart } = useCartStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <p className="text-center">Loading product...</p>;
  }
  const reviewsArray = Array.isArray(product.reviews) ? product.reviews : [];
  const averageRating =
    reviewsArray.length > 0
      ? reviewsArray.reduce(
          (sum: number, review: any) => sum + (review.rating || 0),
          0
        ) / reviewsArray.length
      : 0;

  const handleAddToCart = async () => {
    try {
      // await addToCart(product.id, 1);
      setIsCartOpen(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // let checkIsWishList = isInWishlist(product.id);

  // fetchWishlist();
  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row justify-between lg:gap-[0px] gap-[80px]">
        <div className="flex flex-col items-center w-full md:w-1/3 relative">
          <button className="absolute left-[-20px] top-1/3 -translate-y-1/2 rounded-full hidden lg:flex z-[10]">
            <img src="/svgs/Shared/ProductSection/leftArrow.svg" alt="left" />
          </button>
          <img
            src="/Product/productDetils/pic.png"
            alt=""
            className="w-full h-full max-w-[495px] max-h-[495px] object-cover"
          />

          <button className="absolute right-[-20px] top-1/3 -translate-y-1/2 rounded-full hidden lg:flex z-[10]">
            <img src="/svgs/Shared/ProductSection/rightArrow.svg" alt="right" />
          </button>
          <div className="w-full relative">
            <div
              ref={scrollRef}
              className="flex mt-[20px] gap-[20px] overflow-x-auto scrollbar-hide"
            >
              <img
                src="/Product/productDetils/pic.png"
                alt="thumbnail"
                className="max-w-[83px] w-full max-h-[83px] object-cover cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[10px] md:w-1/2 ">
          <p className="lg:text-[22px]  text-[20px] font-medium text-[#383838]  ">
            {product.name}
          </p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.round(averageRating)
                    ? "/svgs/Shared/ProductSection/productDetials.svg"
                    : "/svgs/Shared/ProductSection/cardStar.svg"
                }
                alt="star"
                className="w-[16px] h-[16px]"
              />
            ))}
            <span className="lg:text-[14px] ml-[8px] text-[12px] font-medium font-[Montserrat]  text-[#697586] lg:leading-[22px] leading-[20px]">
              {Array.isArray(product.reviews) ? product.reviews.length : 0}{" "}
              reviews
            </span>
          </div>
          <p className="lg:text-[16px] text-[14px] font-medium text-[#383838] lg:leading-[27px] leading-[24px]">
            ${product.price.toFixed(2)}
          </p>
          <div className="lg:text-[14px] text-[12px] font-normal font-[Montserrat] text-[#697586] lg:leading-[22px] leading-[20px]">
            <p>{product.description}</p>
            <p>Size: {product.size || "N/A"}</p>
            <div className="flex flex-col gap-[6px]">
              <div className=" leading-[20px] font-medium text-[#383838]">
                Recommended For
              </div>
              <span className="flex flex-col font-[14px] leading-[20px]  text-[#697586] font-[Montserrat]">
                {product.recommendFor}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <Button
              className="max-w-[246px] w-full py-[10px] px-[70.5px] text-[14px] lg:text-[16px] font-bold text-white lg:leading-[21px] leading-[18px] hover:bg-custom-gradient hover:text-white"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
            {/* <img
              src={
                checkIsWishList
                  ? "/svgs/Shared/ProductSection/heart-filled.svg"
                  : "/svgs/Shared/ProductSection/heart.svg"
              }
              alt="wishlist"
              className="cursor-pointer"
              onClick={() => toggleWishlist(product)}
            /> */}
          </div>
          {/* <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
          /> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductDetails;
