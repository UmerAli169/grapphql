import Wrapper from "@/app/wrapper";
import Button from "../shared/Button";
import Link from "next/link";

const images = [
  "/imageGallary.png",
  "/imageGallary.png",
  "/imageGallary.png",
  "/imageGallary.png",
  "/imageGallary.png",
  "/imageGallary.png",
  "/imageGallary.png",
  "/imageGallary.png",
];
const InstagramGallery = () => {
  return (
    <Wrapper>
      <div className="text-center lg:py-[80px] py-[71px]">
        <div className="w-full text-center">
          <div className="flex items-center  w-full justify-center">
            <img
              src="/svgs/Shared/ProductSection/leftflower.svg"
              alt="Left Flower"
            />
            <p className="lg:text-[24px] text-[20px] text-[#383838] font-bold">
              SHARE HOW YOU BLOSSOMED WITH
              <span className="text-[#F5A3B7] "> #BLOOMBEAUTY</span>
            </p>
            <img
              src="/svgs/Shared/ProductSection/rightflower.svg"
              alt="Right Flower"
            />
          </div>
          <Link href="/Catalog">
            <p className="text-[18px] text-[#697586] font-normal hover:text-[#F5A3B7] cursor-pointer">
              See All
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] py-[30px]">
          {images.map((src, index) => (
            <div key={index} className="relative group overflow-hidden">
              <img
                src={src}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover transition duration-300 "
              />

              <div className="absolute inset-0 bg-white/30 flex flex-col items-center justify-end opacity-0 group-hover:opacity-100 transition duration-300">
                <Button className="whitespace-nowrap w-full max-w-[195px] py-[10px] px-[66px] bg-[#383838]/20  hover:text-white  text-white   hover:text-white mb-2 flex items-center justify-center gap-2">
                  See In{" "}
                  <img src="/svgs/Shared/icons/instra.svg" alt="Instagram" />
                </Button>
                <Button className="whitespace-nowrap w-full max-w-[195px] py-[10px] px-[66px]  text-white  hover:bg-[#F5A3B7] bg-[#F5A3B7]  hover:text-white mb-[20px]">
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button className="lg:max-w-[226px] text-[14px] text-[#FFFFFF] font-semibold w-full lg:p-[10px] px-[10px] py-[8px] bg-[#F5A3B7] hover:bg-custom-gradient  hover:text-white">
          Follow Us{" "}
        </Button>
      </div>
    </Wrapper>
  );
};

export default InstagramGallery;
