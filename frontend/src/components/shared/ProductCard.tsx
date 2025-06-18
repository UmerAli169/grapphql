"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CustomCard } from "./CustomCard";
import Button from "./Button";

interface Product {
  image: string | undefined;
  _id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  discount?: number;
  reviews: { rating: number }[];
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: any) => void;
  toggleWishlist: (productId: any) => void;
  isInWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addToCart,
  toggleWishlist,
  isInWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/ProductDetails?id=${product._id}`);
  };
  const averageRating = product.reviews?.length
    ? product.reviews.reduce((sum, rate) => sum + rate.rating, 0) /
      product.reviews.length
    : 0;
  return (
    <CustomCard
      className="w-full rounded-[6px] cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.discount && (
        <div className="absolute top-[30px] left-[1px] bg-[#F5A3B7] rounded-r-full text-white text-[12px] font-bold px-3 py-1 z-10">
          -{product.discount}%
        </div>
      )}

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <div
            className="absolute top-[20px] right-[23px] cursor-pointer transition-opacity duration-300"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
          >
            <img
              src={
                isInWishlist
                  ? "/svgs/Shared/ProductSection/heart-filled.svg"
                  : "/svgs/Shared/ProductSection/heart.svg"
              }
              alt="wishlist"
              className="w-[18px] h-[19px]"
            />
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          onClick={handleRedirect}
          className="w-full h-full max-h-[442x] object-cover rounded-[6px]"
        />
      </div>

      <div className="px-[20px] py-[10px]">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[16px]  text-[#383838] font-medium hover:text-[#F5A3B7]">
            {product.name}
          </p>

          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.round(averageRating)
                    ? "/svgs/Shared/reviews/starts.svg"
                    : "/svgs/Shared/ProductSection/cardStar.svg"
                }
                alt="star"
                className="w-4 h-4"
              />
            ))}
            <span className="text-[14px] text-[#383838] font-medium">
              ({averageRating.toFixed(0)})
            </span>
          </div>
          <div className=" h-full  py-[1px]">
            <p className="font-[Montserrat] text-[14px] text-[#697586] font-normal leading-[22px] ">
              {product.description.slice(0, 60)}...
            </p>
          </div>
          <div className="font-[Montserrat] text-[16px] text-[#383838] font-normal">
            {product.price}$
          </div>
        </div>

        <div className="my-[20px]">
          <Button
            className="py-[10px] text-[14px] font-medium bg-white text-black border border-black hover:bg-custom-gradient hover:text-white"
            onClick={() => addToCart(product?._id)}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </CustomCard>
  );
};

export default ProductCard;
