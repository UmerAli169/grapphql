"use client";
import Wrapper from "@/app/wrapper";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import navbar from "../../Data/header/navbar.json";
import ModalManager from "../auth/modals/ModalManager";
import { CartModal } from "../model/RightModal";
import Link from "next/link";
import SearchBar from "../navbar/SearchBar";
import DesktopMenu from "../navbar/DesktopMenu";
import IconSection from "../navbar/IconSection";
import MobileMenu from "../navbar/MobileMenu";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import useProductStore from "@/store/productStore";

const Header = () => {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [icons, setIcons] = useState<any[]>([]);
  const [mobileMenu, setMobileMenu] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products } = useProductStore();

  const { cart, fetchCart } = useCartStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    setMenuItems(navbar.menuItems);
    setIcons(navbar.icons);
    setMobileMenu(navbar.mobileMenu);
  }, []);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const closeModal = () => setActiveModal(null);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAccountClick = () => {
    if (isLoggedIn) {
      router.push("/Account/changepassword");
    } else {
      setActiveModal("login");
    }
  };

  const searchResults = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <nav className="bg-[#FFFFFF] relative">
        <Wrapper>
          {isSearchActive && isAuthenticated ? (
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsSearchActive={setIsSearchActive}
            />
          ) : (
            <div className="flex justify-between py-[16px]">
              <div className="lg:hidden flex justify-center items-center">
                <button
                  onClick={toggleMenu}
                  className="flex flex-col items-center"
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenu && (
                    <img
                      src={mobileMenu.img}
                      alt={mobileMenu.label}
                      className="w-[24px] h-[24px]"
                    />
                  )}
                  <span className="text-[12px] font-normal">MENU</span>
                </button>
              </div>

              <Link
                href="/"
                className="text-[#383838] flex justify-center items-center text-[24px] font-medium leading-[25px] gap-[10px]"
              >
                <span className="text-[#F5A3B7]">Bloom </span> Beauty
              </Link>

              <DesktopMenu menuItems={menuItems} />
              <IconSection
                icons={icons}
                handleAccountClick={handleAccountClick}
                setIsSearchActive={setIsSearchActive}
                setIsCartOpen={setIsCartOpen}
              />
            </div>
          )}
        </Wrapper>
      </nav>

      <ModalManager
        activeModal={activeModal}
        closeModal={closeModal}
        setActiveModal={setActiveModal}
      />

      {isAuthenticated && (
        <>
          <MobileMenu
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            mobileMenu={mobileMenu}
            menuItems={menuItems}
            icons={icons}
          />
          <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart as any}
            fetchCart={fetchCart as any}
          />
        </>
      )}
    </>
  );
};

export default Header;
