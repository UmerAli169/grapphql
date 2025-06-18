import React from "react";
import RadioButton from "../shared/RadioButton";

interface DeliveryMethodProps {
  selectedMethod: string;
  onChange: (method: string) => void;
  onEdit?: () => void; 

}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ selectedMethod, onChange }) => {
  return (
    <div>
      <h2 className="text-[20px] text-[#383838] font-medium">Delivery Method</h2>
      <div className="flex flex-col gap-2">
        <RadioButton
          name="delivery"
          label="Ship"
          value="ship"
          checked={selectedMethod === "ship"}
          onChange={onChange}
        />
        <RadioButton
          name="delivery"
          label="Pick Up"
          value="pickup"
          checked={selectedMethod === "pickup"}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default DeliveryMethod;
