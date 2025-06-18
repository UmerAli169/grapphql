import React from "react";
import OrderItem from "../shared/OrderItem";

interface Order {
  id: string;
  date: string;
  status: string;
  items: any[]; 
}

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className=" p-4 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <p className="font-medium text-[16px] leading-[24px] font-medium">Order No: {order.id}</p>
        <p className="font-medium text-[16px] leading-[24px] font-normal">{order.date}</p>
        <p className={`font-medium text-[16px] leading-[24px] font-medium ${order.status === "Delivered" ? "text-[#7FCCC6]" : "text-[#F09A9B]"}`}>
          {order.status}
        </p>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {order.items.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
