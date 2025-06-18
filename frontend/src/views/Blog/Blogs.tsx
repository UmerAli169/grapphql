import React from "react";
import BlogSection from "../../components/shared/FrameSetcion";
import CategoryFilter from "../../components/blog/CategoryFilter";
import Wrapper from "@/app/wrapper";
import data from "../../Data/blog/blog.json";

const Blog = () => {
  return (
    <>
      <CategoryFilter />
      <Wrapper>
        <div>
          <BlogSection
            product={data.blogs[0]}
            buttonClassName="lg:p-[10px] px-[10px] py-[8px] bg-white text-black border border-black hover:bg-custom-gradienthover:text-white"
            isImageFirst={false}
          />
          <BlogSection
            product={data.blogs[1]}
            buttonClassName="lg:p-[10px] px-[10px] py-[8px] bg-white text-black border border-black hover:bg-custom-gradienthover:text-white"
            isImageFirst={true}
          />
          <BlogSection
            product={data.blogs[2]}
            buttonClassName="lg:p-[10px] px-[10px] py-[8px] bg-white text-black border border-black hover:bg-custom-gradienthover:text-white"
            isImageFirst={false}
          />
          <BlogSection
            product={data.blogs[3]}
            buttonClassName="lg:p-[10px] px-[10px] py-[8px] bg-white text-black border border-black hover:bg-custom-gradienthover:text-white"
            isImageFirst={true}
          />
        </div>

        <div className="flex flex-col items-center my-[20px] gap-[10px]">
          <div className="flex items-center gap-2">
            <button className="text-[#383838] text-[14px] font-medium">
              Show More
            </button>
            <img src="/svgs/seemore/arrow.svg" alt="" />
          </div>

          <div className="flex items-center gap-[20px] mt-2">
            <div className="w-[20px]">
              <img src="/svgs/Shared/ProductSection/leftArrow.svg" alt="" />
            </div>
            <button className="text-[#383838] text-[16px] font-regular leading-[24px]">
              1
            </button>
            <button className="text-[#383838] text-[16px] font-regular leading-[24px]">
              2
            </button>
            <span className="text-[#383838] text-[16px] font-regular leading-[24px]">
              ...
            </span>
            <button className="text-[#383838] text-[16px] font-regular leading-[24px]">
              7
            </button>
            <div className="w-[20px]">
              <img src="/svgs/Shared/ProductSection/rightArrow.svg" alt="" />
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Blog;
