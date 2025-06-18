"use client";
import React, { useState } from "react";
import productsData from "../../Data/mainPage/cardSection/products.json";
import ProductCard from "@/components/shared/ProductCard";
import { CartModal } from "../../components/model/RightModal";
import AccountLayout from "@/components/account/AccountLayout";

function Page() {
  const [isCartOpen, setIsCartOpen] = useState(false);  
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCartItems((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  return (
    <div>
      <AccountLayout>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
          {productsData.newArrivals.map((product: any) => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} addToCart={addToCart} toggleWishlist={function (productId: number): void {
                throw new Error("Function not implemented.");
              } } isInWishlist={false} />
            </div>
          ))}
        </div>

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
        />

        <div className="flex flex-col items-center my-[20px] gap-[10px]">
          <div className="flex items-center gap-2">
            <button className="text-[#383838] text-[14px] font-medium">
              Show More
            </button>
            <img src="/svgs/seemore/arrow.svg" alt="" />
          </div>

          <div className="flex items-center gap-[20px] mt-2">
            <div className="w-[20px]">
              <img src="/svgs/Shared/ProductSection/leftArrow.svg" alt="" />
            </div>
            <button className="text-[#383838] text-[16px] font-regular leading-[24px]">
              1
            </button>
            <button className="text-[#383838] text-[16px] font-regular leading-[24px]">
              2
            </button>
            <span className="text-[#383838] text-[16px] font-regular leading-[24px]">
              ...
            </span>
            <button className="text-[#383838] text-[16px] font-regular leading-[24px]">
              7
            </button>
            <div className="w-[20px]">
              <img src="/svgs/Shared/ProductSection/rightArrow.svg" alt="" />
            </div>
          </div>
        </div>
      </AccountLayout>
    </div>
  );
}

export default Page;
