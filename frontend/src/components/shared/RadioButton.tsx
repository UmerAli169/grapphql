import React from "react";

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange: (value: string) => void;
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
  className = "",
}) => {
  return (
    <label className={`flex items-center gap-2 text-[16px] text-[#383838] font-normal ${className}`}>
      <input
        type="radio"
        name={name}
        className="w-4 h-4"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      {label}
    </label>
  );
};

export default RadioButton;
