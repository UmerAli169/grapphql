import React from "react";
import { AuthButton } from "../auth/common/AuthButton";
import { X } from "lucide-react"; // For close icon

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, orderId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={20} />
        </button>

        <h2 className="text-[20px] font-medium mb-4">Thanks for your order</h2>

        <div className="flex items-center gap-2 bg-[#E9F6EE] text-[#1E4620] px-4 py-2 rounded-md">
          <img src="/check.svg" alt="Success" className="w-5" />
          <p className="text-[14px] text-left">
            Your order no. <span className="">#{orderId}</span> has been successfully paid and submitted for processing.
          </p>
        </div>

        <p className="text-[14px] text-gray-700 mt-3">
          Monitor the status in your{" "}
          <a href="/" className="underline">
            account
          </a>
        </p>

        <AuthButton type="button" onClick={onClose} className="mt-4 bg-[#E91E63] text-white px-6 py-2 rounded-md hover:bg-custom-gradienthover:text-white">
          Home
        </AuthButton>
      </div>
    </div>
  );
};

export default SuccessModal;
