"use client";
import React from "react";
import Wrapper from "@/app/wrapper";
import ProductCard from "../shared/ProductCard";
import Link from "next/link";

interface Product {
  title: string;
  category: string;
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  reviews: string;
}

interface ProductSectionProps {
  addToCart: (productId: string) => void;
  toggleWishlist: (id: any) => void;
  isInWishlist: (id: string) => boolean;
  products: Product[];
  cardWidth: number;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  cardWidth,
  toggleWishlist,
  isInWishlist,
  addToCart,
}) => {
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center w-full lg:pt-[80px] pt-[71px] pb-[30px]">
        {products?.length === 0 ? (
          <p className="text-gray-500 mt-4">No products available.</p>
        ) : (
          <>
            <div className="overflow-x-auto w-full">
              <div className="flex gap-4 w-fit" style={{ minWidth: "100%" }}>
                {products?.map((product, index) => (
                  <div
                    key={`${product._id}-${index}`}
                    style={{ width: `${cardWidth}px` }}
                  >
                    <ProductCard
                      product={product as any}
                      addToCart={() => addToCart(product._id)}
                      toggleWishlist={() => toggleWishlist(product)}
                      isInWishlist={isInWishlist(product._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default ProductSection;
