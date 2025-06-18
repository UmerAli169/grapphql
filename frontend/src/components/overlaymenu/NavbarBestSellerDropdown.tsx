import React from "react";
import bestsellers from "../../Data/header/BestSeller.json";
const ProductCard = ({ product }:any) => {
  return (
    <div className="text-start   shaodw-[rgba(255, 255, 255, 1)]  rounded-[6px] ">
      <img
        src={product.image}
        alt={product.name}
        className="w-full  object-cover  rounded-[6px] "
      />

      <div className=" flex flex-col gap-y-[10px] p-[10px] ">

      <h4 className="text-[16px] leading-[24px] font-semibold text-[#383838]">{product.name}</h4>
      <p className="text-[14px] leading-[20px] font-normal text-[#697586]" >{product.description}</p>
      <span className="text-[16px] leading-[19px] font-[Montserrat] font-normal text-[#383838]">{product.price}</span>
      </div>
    </div>
  );
};

const NavbarBestSellerDropdown = () => {
  return (
    <div className="absolute  top-full left-0 top-0 w-full bg-white shadow-sm  flex  justify-center   z-20">
      <div className="flex w-full max-w-[809px] py-[50px]">
        <div className="w-1/4 ">
          <ul className="space-y-2">
            {bestsellers.bestsellers.categories.map((category, index) => (
              <li
                key={index}
                className="font-medium text-[15px] text-[#4F4F4F] hover:text-[#F5A3B7] cursor-pointer flex gap-x-[14px]"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

<div className="px-[40px]">

        <img src="howerline.svg" alt="" />
</div>

        <div className="w-3/4  grid grid-cols-4 gap-x-[10px]  ">
          {bestsellers.bestsellers.products.map((product: any, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarBestSellerDropdown;
