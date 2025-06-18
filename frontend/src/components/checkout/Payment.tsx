"use client";

import React, { useState } from "react";
import { FaCcVisa, FaGooglePay, FaPaypal } from "react-icons/fa";
import Button from "../shared/Button";
import PaymentOption from "./PaymentOption";
import ContactInfo from "../shared/ContactInfo";
import TextInput from "../shared/InputField";
import SuccessModal from "../shared/SuccessModal"; // Import success modal
import { useRouter } from "next/navigation";

interface PaymentProps {
  user: any;
  method: string;
  isLoggedIn: boolean;
  onBack: () => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const Payment: React.FC<PaymentProps> = ({
  user,
  isLoggedIn,
  onBack,
  paymentMethod,
  setPaymentMethod,
  method,
}) => {

  const [showSuccess, setShowSuccess] = useState(false);
  const orderId = "167749-0500";

  const handlePayment = () => {
    setShowSuccess(true);
  };
  return (
    <div className="mx-auto flex flex-col gap-[40px]">
      <ContactInfo
        email={user.email}
        address={user.address}
        isLoggedIn={isLoggedIn}
        method={method}
        onChange={() => {}}
      />

      <div>
        <div className="text-[20px] text-[#383838] font-medium">
          Payment Method
        </div>
        <PaymentOption
          value="credit-card"
          label="Credit Card"
          icon={<img src="/svgs/payment/visa.svg" alt="Visa" />}
          selected={paymentMethod}
          onSelect={setPaymentMethod}
        />
        <PaymentOption
          value="gpay"
          label="Google Pay"
          icon={<img src="/svgs/payment/gpay.svg" alt="GPay" />}
          selected={paymentMethod}
          onSelect={setPaymentMethod}
        />
        <PaymentOption
          value="paypal"
          label="PayPal"
          icon={<img src="/svgs/payment/paypal.svg" alt="PayPal" />}
          selected={paymentMethod}
          onSelect={setPaymentMethod}
        />
      </div>

      {(paymentMethod === "credit-card" ||
        paymentMethod === "gpay" ||
        paymentMethod === "paypal") && (
        <div className="mt-4 space-y-3">
          <TextInput placeholder="Card Number" />
          <TextInput placeholder="Card Name" />
          <div className="flex flex-col sm:flex-row gap-2">
            <TextInput
              placeholder="Expiration Date (MM/YY)"
              className="w-full sm:w-5/4"
            />
            <TextInput
              placeholder="Security Code"
              className="w-full sm:w-5/4"
            />
          </div>
        </div>
      )}

      <div className="flex gap-[40px]">
        <Button
          onClick={handlePayment}
          className="max-w-[362px] w-full text-[#FFFFFF] text-[16px] font-semibold py-[10px] hover:bg-custom-gradient hover:text-white"
        >
          Pay Now
        </Button>

        <div className="flex items-center gap-[4px]">
          <button
            onClick={onBack}
            className="max-w-[173px] bg-[#FFFFFF] text-[16px] text-[#B0A6BD] font-normal hover:text-[#F5A3B7] "
          >
            Return to Shopping
          </button>
          <img
            src="/explore.svg"
            alt="Explore"
            className="ml-[8px] w-[12px] fill-current text-[#B0A6BD]"
          />
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        orderId={orderId}
      />
    </div>
  );
};

export default Payment;
