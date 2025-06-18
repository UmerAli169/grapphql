import React from "react";

interface ShippingOptionProps {
  value: string;
  label: string;
  description: string;
  price: string;
  selected: string;
  onSelect: (value: string) => void;
}

const ShippingOption: React.FC<ShippingOptionProps> = ({ value, label, description, price, selected, onSelect }) => {
  return (
    <label className="flex justify-between items-center">
      <div>
        <input
          type="radio"
          value={value}
          checked={selected === value}
          onChange={() => onSelect(value)}
          className="mr-2"
        />
        <span className="text-[#383838] text-[16px] font-normal">{label}</span>
        <p className=" ml-[20px] text-[#B0A6BD] text-[14px] font-normal">{description}</p>
      </div>
      <span className="text-[#383838] text-[16px] font-normal">{price}</span>
    </label>
  );
};

export default ShippingOption;
