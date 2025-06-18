import React, { useState } from "react";
import Button from "../shared/Button";
import InputField from "../shared/InputField";
import toast from "react-hot-toast";
import { updateAddress } from "../../services/internal";

const ShippingAddress = ({
  onContinue,
  user,
  setUser,
}: {
  onContinue: () => void;
  user: any;
  setUser: (user: any) => void;
}): any => {
  const [isLoggedIn] = useState(!!user);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    country: user?.country || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
    phone: user?.phone || "",
    recipientNotMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLoggedIn) {
        const updatedAddress = await updateAddress(formData);
        setUser({ ...user.user, ...updatedAddress });
      } else {
        toast.error("Please log in to update the address.");
      }
      onContinue();
    } catch (error) {
      toast.error("Failed to update shipping address.");
    }
  };
  return (
    <div className="mx-auto">
      <h2 className="text-[22px] text-[#383838] font-medium pb-[20px]">
        Shipping Address
      </h2>
      {isLoggedIn ? (
        <div className="space-y-[20px]">
          <InputField
            label="Saved Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            readOnly
          />
          <InputField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <InputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-1/2"
            />
            <InputField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-1/2"
            />
          </div>
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <label className="flex items-center gap-2 text-[#383838] text-[14px]">
            <input
              type="checkbox"
              name="recipientNotMe"
              className="w-4 h-4 border-[#D9D9D9]"
              checked={formData.recipientNotMe}
              onChange={(e) =>
                setFormData({ ...formData, recipientNotMe: e.target.checked })
              }
            />
            The recipient is not me
          </label>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-3">
            <InputField
              label="First Name"
              placeholder="Enter first name"
              className="w-1/2"
              value={formData.firstName || ""}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              placeholder="Enter last name"
              className="w-1/2"
              value={formData.lastName || ""}
              onChange={handleChange}
            />
          </div>
          <InputField
            label="Country"
            placeholder="Enter country"
            value={formData.country || ""}
            onChange={handleChange}
          />
          <InputField
            label="Address"
            placeholder="Enter your address"
            value={formData.address || ""}
            onChange={handleChange}
          />

          <div className="flex gap-3">
            <InputField
              label="City"
              placeholder="Enter city"
              className="w-1/2"
              value={formData.city || ""}
              onChange={handleChange}
            />
            <InputField
              label="Postal Code"
              placeholder="Enter postal code"
              className="w-1/2"
              value={formData.postalCode || ""}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Phone"
            placeholder="Enter phone number"
            value={formData.phone || ""}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="pt-[40px]">
        <Button
          className="max-w-[285px] w-full py-[12px] px-[33px] text-white font-semibold font-[16px] hover:bg-custom-gradienthover:text-white"
          onClick={handleSubmit}
        >
          Continue to Shipping
        </Button>
      </div>
    </div>
  );
};

export default ShippingAddress;
