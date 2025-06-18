import React from "react";
import dropdownData from "../../Data/header/ShowApp.json";

const NavbarShowAllDropDown: React.FC = () => {
  return (
    <div className="absolute  top-full left-0 top-0 w-full bg-[#FFFFFF] shadow-lg  flex  justify-center   z-20">
      <div className="flex w-full max-w-[809px] py-[50px]">
        <div className="w-1/4 ">
          <ul className="space-y-2">
            {dropdownData.categories?.map((category: string, index: number) => (
              <li
                key={index}
                className="font-medium text-[15px] text-[#4F4F4F] hover:text-[#F5A3B7] cursor-pointer flex gap-x-[14px]"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-[80px]">
          <img src="howerline.svg" alt="" />
        </div>
        <div className="w-3/4 grid grid-cols-3 gap-6">
          {dropdownData.dropdownItems?.map(
            (category: { title: string; links: string[] }, index: number) => (
              <div key={index}>
                <h4 className="font-semibold text-[14px] text-[#383838]">
                  {category.title}
                </h4>
                <ul className="mt-2 space-y-1">
                  {category.links?.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="font-normal text-[14px] text-[#4F4F4F] hover:text-black cursor-pointer flex gap-x-[14px]"
                    >
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default NavbarShowAllDropDown;
