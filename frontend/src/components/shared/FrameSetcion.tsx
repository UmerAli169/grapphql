import React from "react";
import Button from "./Button";

interface FrameSectionProps {
  product?: {
    id?: string;
    date?: any;
    title?: string;
    description?: string;
    image?: string;
    buttonLabels?: string[];
    shopNowText?: string;
    exploreMoreText?: string;
    exploreIcon?: string;
  };
  isImageFirst?: boolean;
  buttonClassName?: string;
}

const FrameSection: React.FC<FrameSectionProps> = ({
  product,
  isImageFirst,
  buttonClassName,
}) => {
  if (!product) return null;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center lg:pt-[80px] pt-[71px]">
      {isImageFirst && (
        <div className=" flex justify-center items-center">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-[6px]"
          />
        </div>
      )}
      <div>
        <p className="lg:text-[16px] text-[12px] font-normal text-[#697586]">
          {product?.date}
        </p>
        <div className="rounded-[6px] flex flex-col gap-[30px]">
          <p className="lg:text-[36px] text-[32px] font-medium text-[#383838]">
            {product.title}
          </p>
          <p className="lg:text-[16px] text-[12px] font-normal lg:leading-[27px] leading-[20px] text-[Montserrat] text-[#697586]">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-[6px]">
            {product?.buttonLabels?.map((label, index) => (
              <button
                key={index}
                className="max-w-[190px] rounded-[70px] text-[12px] py-[8px]  bg-[rgba(180,176,190,0.2)] text-black p-[10px] hover:bg-[#F5A3B7] hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-[30px] md:flex-row flex-col ">
            <Button
              className={`lg:max-w-[246px] max-w-[200px] w-full  text-[14px] text-[#FFFFFF] font-semibold lg:py-[8.5px] px-[10px] py-[8px] hover:bg-custom-gradient hover:text-white`}
              href={`/BlogDetail `}
            >
              {product.shopNowText}
            </Button>
            <div className="flex items-center gap-[4px]  hover:text-[#F5A3B7]  ">
              <button className="max-w-[137px] bg-[#F9FAFC]   hover:text-[#F5A3B7] text-black">
                {product.exploreMoreText}
              </button>
              <img
                src={product.exploreIcon ? product.exploreIcon : " "}
                alt=""
                className="ml-[8px] w-[12px] "
              />
            </div>
          </div>
        </div>{" "}
      </div>

      {!isImageFirst && (
        <div className="rounded-[6px] flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-[6px]"
          />
        </div>
      )}
    </div>
  );
};

export default FrameSection;
