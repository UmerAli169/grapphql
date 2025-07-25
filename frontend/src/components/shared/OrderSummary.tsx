import React from "react";
import OrderItem from "./OrderItem";

interface OrderSummaryProps {
  orders: {
    _id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shipping: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orders, shipping }) => {
  const subtotal = orders.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + shipping; 

  return (
    <div className="p-[20px] rounded-[6px] bg-[#FFFFFF]">
      <p className="text-[20px] font-medium text-[#383838]">Your Order</p>
      <div className="space-y-3">
        {orders.map((item,index) => (
          <OrderItem key={index} item={item} isCartView />
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-[10px] font-normal text-[16px] leading-[18px] text-[#B0A6BD]">
        <p>
          Subtotal: <span className="float-right">${subtotal}</span>
        </p>
        <p>
          Shipping: <span className="float-right">${shipping}</span>
        </p>
        <p className="font-medium text-[16px] leading-[18px] text-[#383838]">
          Estimated Total:{" "}
          <span className="float-right">${total}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
