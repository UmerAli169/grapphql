import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  const baseStyles =
    "w-full bg-[rgba(245,163,183,1)]  lg:text-[16px] text-[14px] font-normal rounded-[4px] hover:bg-[#383838] hover:text-[#FFFFFF";

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${
          className || ""
        } inline-block text-center py-[8px] px-[10px]`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={`w-full bg-[#F5A3B7] hover:text-white  hover:bg-custom-gradient lg:text-[16px] text-[14px] font-normal rounded-[4px] ${
        className || ""
      } `}
    >
      {children}
    </button>
  );
};

export default Button;
