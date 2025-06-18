import React from "react";
import OrderCard from "./OrderCard";

interface Order {
  id: string;
  date: string;
  status: string;
  items: any[];
}

const OrderList = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
 
export default OrderList;
