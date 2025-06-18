"use client"
import React, { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";
import Wrapper from "@/app/wrapper";
const categories = [
  "ALL CATEGORY",
  "ECOFRIENDLY",
  "INGREDPIENTS",
  "ANTIAGWQING",
  "ORGANIC",
  "TIPS",
  "COMPILATION 1",
  "INGREDIENTS",
  "ANTIAQGING",
  "COMPILATION 2",
];


const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState("ALL CATEGORY");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <div className="pt-[40px]">
      <div className="relative bg-[#F5A3B7]/60 py-[24px]">
        <Wrapper>
          <div
            ref={scrollRef}
            className="flex space-x-3 overflow-x-auto scrollbar-hide "
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-[30px] py-[8px] rounded-[70px] whitespace-nowrap text-[14px] leading-[30px] font-medium ${activeCategory === category
                    ? "bg-[#F5A3B7] text-white"
                    : "bg-white text-black"
                  }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleScroll}
            className="absolute xl:right-[210px]    top-1/2 -translate-y-1/2"
          >
            <img src="/svgs/Shared/ProductSection/rightArrow.svg"  className="w-[40px]" alt="" />
            </button>
        </Wrapper>
      </div>
    </div>
  );  
};

export default CategoryFilter;
