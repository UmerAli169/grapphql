import { useState } from "react";
import Button from "@/components/shared/Button";

export const SampleSelection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const samples = [
    { id: 1, name: "The Dewy Skin Cream", image: "/cart/sample.png" },
    { id: 2, name: "Water Cream", image: "/cart/sample.png" },
    { id: 3, name: "Silk Peony", image: "/cart/sample.png" },
    { id: 4, name: "Indigo Cream", image: "/cart/sample.png" },
    { id: 5, name: "Rice Polish", image: "/cart/sample.png" },
  ];

  const visibleSamples = samples.slice(currentIndex, currentIndex + 3);

  const nextSamples = () => {
    if (currentIndex + 3 < samples.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSamples = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-[10px] relative">
      <div className="flex items-center gap-2">
        <img src="/svgs/cart/lock.svg" alt="" className="w-[18px]" />
        <h3 className="text-[14px] leading-[21px] font-normal">
          Pick 2 Free Samples with every order!
        </h3>
      </div>

      <div className="relative flex items-center">
        {currentIndex > 0 && (
          <button
            onClick={prevSamples}
            className="absolute left-[1px] top-1/2 -translate-y-1/2 "
          >
            <img src="/svgs/Shared/ProductSection/leftArrow.svg" alt=""  className="w-[30px]" />
            </button>
        )}

        <div className="grid grid-cols-3 gap-4 flex-1">
          {visibleSamples.map((sample) => (
            <div key={sample.id} className="text-center">
              <img
                src={sample.image}
                alt={sample.name}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <Button className="border px-[17px] py-[2px] rounded text-[12px] w-full max-w-[106px] font-normal text-[#383838] bg-[#FFFFFF]">
                ADD
              </Button>
              <p className="text-xs mt-1 text-gray-600">{sample.name}</p>
            </div>
          ))}
        </div>

        {currentIndex + 3 < samples.length && (
          <button
            onClick={nextSamples}
            className="absolute right-[-6px] top-1/2 -translate-y-1/2  p-2 "
          >
            <img src="/svgs/Shared/ProductSection/rightArrow.svg" alt="" className="w-[30px]" />
            </button>
        )}
      </div>

      <div className="flex justify-center gap-1 mt-2">
        {Array.from({ length: Math.ceil(samples.length / 3) }).map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === Math.floor(currentIndex / 3) ? "bg-black" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};
