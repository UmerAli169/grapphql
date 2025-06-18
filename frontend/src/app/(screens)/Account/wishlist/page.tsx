"use client";

import AccountLayout from "@/components/account/AccountLayout";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { CartModal } from "@/components/model/RightModal";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/cartStore";

const ITEMS_PER_PAGE = 6;

function WishlistPage() {
  const {
    fetchWishlist,
    wishlist,
    toggleWishlist,
    isInWishlist,
  } = useWishlistStore();

  const { addToCart } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const totalPages = Math.max(
    1,
    Math.ceil(wishlist.length / ITEMS_PER_PAGE)
  );

  const paginatedProducts = wishlist.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <AccountLayout>
      <h2 className="text-2xl font-bold text-[#383838] mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-lg text-gray-500">Your wishlist is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedProducts.map((product:any) => (
              <div key={product._id} className="w-full">
                <ProductCard
                  product={product as any}
                  addToCart={() => addToCart(product._id)}
                  toggleWishlist={() => toggleWishlist(product)}
                  isInWishlist={isInWishlist(product._id)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center my-[20px] gap-[10px]">
            <div className="flex items-center gap-2">
              <button
                className="text-[#383838] text-[14px] font-medium"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Show More
              </button>
              <img src="/svgs/seemore/arrow.svg" alt="Show more arrow" />
            </div>

            <div className="flex items-center gap-[20px] mt-2">
              <button
                className="w-[20px]"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <img
                  src="/svgs/Shared/ProductSection/leftArrow.svg"
                  alt="Previous"
                />
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`text-[#383838] text-[16px] font-regular leading-[24px] ${
                    currentPage === index + 1 ? "font-bold underline" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="w-[20px]"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <img
                  src="/svgs/Shared/ProductSection/rightArrow.svg"
                  alt="Next"
                />
              </button>
            </div>
          </div>
        </>
      )}

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </AccountLayout>
  );
}

export default WishlistPage;
