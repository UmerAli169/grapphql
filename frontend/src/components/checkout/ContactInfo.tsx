import React from "react";
import Button from "../shared/Button";
import InputField from "../shared/InputField";
import Checkbox from "../shared/Checkbox";

const ContactInfo: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <p className="text-sm text-gray-600">
          Do you already have an account?{" "}
          <span className="text-blue-500 cursor-pointer">Login</span>
        </p>
      </div>

      <div className="mt-3">
        <InputField type="email" placeholder="Enter your email" />
      </div>

      <div className="mt-2">
        <Checkbox label="Yes, I want to subscribe to the newsletter." />
      </div>
    </div>
  );
};

export default ContactInfo;
