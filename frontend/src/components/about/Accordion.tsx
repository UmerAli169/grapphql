"use client";
import { useState } from "react";

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#DFE1E3]">
      <button
        className={`w-full text-left p-3 lg:text-[16px] text-[14px] font-medium text-[#383838] leading-[27px] flex justify-between ${
          open ? "bg-[rgba(176,166,189,0.1)]" : " "
        }`}
        onClick={() => setOpen(!open)}
      >
        {question}
        <span className="text-[18px] my-auto">{open ? <img src="/svgs/Shared/OpenAndCloaed/accodionClosed.svg" alt="" /> :<img src="/svgs/Shared/OpenAndCloaed/accodionOpen.svg" alt="" /> }</span>
      </button>
      {open && (
        <p className=" p-3 leading-[22px] font-normal font-[Montserrat] font-normal text-[16px] text-[#383838]">
          {answer}
        </p>
      )}
    </div>
  );
};

export default Accordion;
