import React, { useState } from "react";
import Link from "next/link";
import NavbarShowAllDropDown from "../overlaymenu/NavbarShowAllDropDown";
import NavbarBestSellerDropdown from "../overlaymenu/NavbarBestSellerDropdown";
import { useRouter } from "next/navigation";

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
  const router = useRouter(); // 👈 Add router here
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (onClick) onClick();
    router.push(
      // 👈 Handle routing manually
      label.toLowerCase() === "shop all"
        ? "/Catalog"
        : label.toLowerCase() === "about us"
        ? "/AboutUs"
        : label.toLowerCase() === "blog"
        ? "/Blogs"
        : "/"
    );
  };
  return (
    <div
      className="  flex justify-between items-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href="#"
        onClick={handleClick} 
        className={`flex w-full items-center ${
          enabled ? "text-black" : "text-gray-400"
        }`}
      >
        <span
          className={`relative text-[16px] text-[#383838] hover:text-[#F5A3B7] font-medium whitespace-nowrap 
          ${
            !disableHover
              ? "hover:bg-gray-200 after:content-[''] after:absolute after:left-0 after:bottom-[-22px] after:w-full after:h-[4px] after:bg-[#F5A3B7] after:opacity-0 hover:after:opacity-100 hover:after:h-[4px]"
              : ""
          }`}
        >
          {label}
        </span>
      </Link>

      {hasSubmenu && (
        <img
          src="/chevron.svg"
          alt="submenu"
          className="w-[12px]  md:block sm:block hidden "
        />
      )}

      {isHovered && label === "SHOP ALL" && <NavbarShowAllDropDown />}
      {isHovered && label === "BESTSELLERS" && <NavbarBestSellerDropdown />}
    </div>
  );
};

export default MenuItem;
