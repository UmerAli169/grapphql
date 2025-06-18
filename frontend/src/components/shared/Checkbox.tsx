import React from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, className = "" }) => {
  return (
    <label className={`flex items-center gap-2 text-sm text-gray-600 ${className}`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4" />
      {label}
    </label>
  );
};

export default Checkbox;
