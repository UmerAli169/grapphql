import React from "react";

interface InputFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly?: boolean;
  name?: string; // Added name prop
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  readOnly = false,
  name, // Destructuring name prop
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-[#B0A6BD] text-[12px] font-normal ">{label}</label>}
      <input
        name={name} // Passing name prop to input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`border border-[#D9D9D9] p-[10px] w-full rounded-[4px] text-[#383838] text-[16px] font-normal outline-none  ${className} ${readOnly ? " cursor-not-allowed" : ""}`}
      />
    </div>
  );
};

export default InputField;
