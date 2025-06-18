import React from "react";
import Button from "../shared/Button";
import Wrapper from "@/app/wrapper";
import data from "../../Data/mainPage/frameSection/frame.json";

interface FrameSectionProps {
  productIndex: number;
  isImageFirst?: boolean;
}

const FrameSection: React.FC<FrameSectionProps> = ({ productIndex, isImageFirst }) => {
  const product = data.products[productIndex];

  if (!product) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2   gap-5 items-center lg:pt-[60px] pt-[71px]">
      {isImageFirst && (
        <div className="rounded-[6px] flex justify-center items-center">
          <img src={product.image} alt={product.title} className="w-full h-auto max-h-[500px] object-cover" />
        </div>
      )}

      <div className="rounded-[6px] flex flex-col gap-[30px]">
        <p className="lg:text-[36px] text-[32px] font-medium text-[#383838]">{product.title}</p>
        <p className="lg:text-[16px] text-[12px] font-normal text-[#697586]">{product.description}</p>

        <div className="flex flex-wrap gap-[6px]">
          {product.buttonLabels.map((label, index) => (
            <Button key={index} className="max-w-[90px] rounded-[70px] text-[12px]  lg:p-[10px] px-[8px]  px-[10px] bg-[#B4B0BE]/80 text-black">
              {label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-[10px] pb-[20px]">
          <Button className="max-w-[246px] lg:p-[10px] px-[10px] py-[8px]">{product.shopNowText}</Button>
          <div className="flex items-center gap-[4px]">
            <Button className="max-w-[137px] bg-[#F9FAFC] text-black">{product.exploreMoreText}</Button>
            <img src={product.exploreIcon} alt="Explore More" className="w-[12px]" />
          </div>
        </div>
      </div>

      {!isImageFirst && (
        <div className="rounded-[6px] flex justify-center items-center">
          <img src={product.image} alt={product.title} className="w-full h-auto max-h-[500px] object-cover" />
        </div>
      )}
    </div>
  );
};

export default FrameSection;
