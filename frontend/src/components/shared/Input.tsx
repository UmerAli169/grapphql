import { useState } from "react";
import { Field, ErrorMessage, useField } from "formik";

interface AuthInputProps {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  label?: string;
}

export const AuthInput = ({ name, type, label, placeholder, required }: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(name); // Bind with Formik

  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={name} className="block text-[12px] text-[#B0A6BD] font-normal">
          {label}
        </label>
      )}
      <Field
        {...field}
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        required={required}
        className={`w-full border rounded-[4px] p-[10px] pr-10 outline-none ${
          meta.touched && meta.error ? "border-[#E77373]" : "border-[#DFE1E3]"
        }`}
      />

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-5 transform -translate-y-1/2"
        >
          <img
            src={showPassword ? "/eye.svg" : "/eye.svg"}
            alt="Toggle Password Visibility"
            className="w-[24px]"
          />
        </button>
      )}

      {meta.touched && meta.error && (
        <div className="text-[#E77373] text-[14px] mt-1">{meta.error}</div>
      )}
    </div>
  );
};
