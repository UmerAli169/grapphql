"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarShowAllDropDown from "../overlaymenu/NavbarShowAllDropDown";
import NavbarBestSellerDropdown from "../overlaymenu/NavbarBestSellerDropdown";

interface MenuItemProps {
  label: string;
  enabled: boolean;
  hasSubmenu?: boolean;
  disableHover?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  enabled,
  hasSubmenu,
  disableHover,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();

    const lower = label.toLowerCase();
    if (lower === "shop all") router.push("/Catalog");
    else if (lower === "about us") router.push("/AboutUs");
    else if (lower === "blog") router.push("/Blogs");
    else if (lower === "addproduct") router.push("/AddProduct");
    else router.push("/");
  };

  return (
    <div
      className="flex justify-between items-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleClick}
        className={`flex w-full items-center ${
          enabled ? "text-black" : "text-gray-400"
        }`}
      >
        <span
          className={`relative text-[16px] text-[#383838] font-medium whitespace-nowrap 
            ${
              !disableHover
                ? "hover:text-[#F5A3B7] hover:bg-gray-200 after:content-[''] after:absolute after:left-0 after:bottom-[-22px] after:w-full after:h-[4px] after:bg-[#F5A3B7] after:opacity-0 hover:after:opacity-100"
                : ""
            }`}
        >
          {label}
        </span>
      </button>

      {hasSubmenu && (
        <img
          src="/chevron.svg"
          alt="submenu"
          className="w-[12px] md:block sm:block hidden"
        />
      )}

      {isHovered && label.toUpperCase() === "SHOP ALL" && (
        <NavbarShowAllDropDown />
      )}
      {isHovered && label.toUpperCase() === "BESTSELLERS" && (
        <NavbarBestSellerDropdown />
      )}
    </div>
  );
};

export default MenuItem;
