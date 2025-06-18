"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Button from "./Button";

interface FiltersProps {
  onFilterChange: (filterType: string, value: string | string[]) => void;
  onPriceInput: (type: 'min' | 'max', value: string) => void;
}

export default function Filters({ onFilterChange, onPriceInput }: FiltersProps) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    productType: false,
    ingredientType: false,
    skinType: true,
    priceRange: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSkinTypeChange = (type: string) => {
    onFilterChange('skinType', type === 'All' ? ['All'] : [type]);
  };

  const handlePriceRangeChange = (range: string) => {
    onFilterChange('priceRange', [range]);
  };

  return (
    <div className="md:max-w-[250px] w-full bg-[#FFFFFF] p-[20px] rounded-[6px] flex flex-col gap-[10px]">
      <div>
        <p className="text-[24px] leading-[36px] text-[#383838] font-bold flex items-center gap-1">
          FILTERS
        </p>
      </div>

      <div>
        <div className="border-b py-2 text-[#383838] text-[14px] leading-[21px] font-semibold">
          <button
            className="w-full flex justify-between items-center text-[#383838] text-[14px] leading-[21px] font-semibold"
            onClick={() => toggleSection("productType")}
          >
            <div className="text-[#383838] text-[14px] leading-[21px] font-normal">
              Product Type
            </div>
            {openSections.productType ? (  
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
        </div>

        <div className="border-b py-2 text-[#383838] text-[14px] leading-[21px] font-semibold">
          <button
            className="w-full flex justify-between items-center text-gray-700"
            onClick={() => toggleSection("ingredientType")}
          >
            <div className="text-[#383838] text-[14px] leading-[21px] font-normal">
              Ingredient Type
            </div>
            {openSections.ingredientType ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
        </div>

        <div className="border-b py-2 text-[#383838] text-[14px] leading-[21px] font-semibold">
          <button
            className="w-full flex justify-between items-center text-gray-700"
            onClick={() => toggleSection("skinType")}
          >
            <div className="text-[#383838] text-[14px] leading-[21px] font-normal">
              Skin Type
            </div>
            {openSections.skinType ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
          {openSections.skinType && (
            <div className="mt-2 space-y-2 text-[#383838] text-[16px] leading-[21px] font-normal">
              {["All", "Combination/Oily", "Dry", "Normal", "Sensitive"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <input 
                      type="checkbox" 
                      name="skinType" 
                      className="w-4 h-4" 
                      onChange={() => handleSkinTypeChange(type)}
                    />
                    {type}
                  </label>
                )
              )}
            </div>
          )}
        </div>

        <div className="border-b py-2 text-[#383838] text-[14px] leading-[21px] font-semibold">
          <button
            className="w-full flex justify-between items-center text-gray-700"
            onClick={() => toggleSection("priceRange")}
          >
            <div className="text-[#383838] text-[16px] leading-[21px] font-normal">
              Price Range
            </div>
            {openSections.priceRange ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
          {openSections.priceRange && (
            <div className="mt-2 space-y-2 text-[#383838] text-[16px] leading-[21px] font-normal">
              {["Under $25", "$25 - $50", "$50 - $100"].map((range) => (
                <label
                  key={range}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <input 
                    type="radio" 
                    name="price" 
                    className="w-4 h-4" 
                    onChange={() => handlePriceRangeChange(range)}
                  />
                  {range}
                </label>
              ))}
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="price" className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="$ Min"
                  className="border p-1 w-16 text-center text-sm rounded"
                  onChange={(e) => onPriceInput('min', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="$ Max"
                  className="border p-1 w-16 text-center text-sm rounded"
                  onChange={(e) => onPriceInput('max', e.target.value)}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <div>
        <Button className="lg:p-[10px] px-[10px] py-[8px] bg-white text-black border border-black hover:bg-custom-gradienthover:text-white">
          Apply
        </Button>
      </div>
    </div>
  );
}