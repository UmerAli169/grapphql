"use client"
import React from "react";
import useCartStore from "../../store/cartStore";

interface OrderItemProps {
  item: {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  isCartView?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, isCartView = false }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCartStore();

  return (
    <div className="flex items-center gap-4 border-b py-2">
      <img
        src={item.image || "/cart/cart1.png"}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <p className="text-lg font-medium text-gray-800">{item.name}</p>
        <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>

        {isCartView && (
          <div className="flex items-center mt-2">
            <div className="border rounded-md flex items-center">
              <button className="px-3" onClick={() => decrementQuantity(item._id)}>-</button>
              <span className="mx-3">{item.quantity}</span>
              <button className="px-3" onClick={() => incrementQuantity(item._id)}>+</button>
            </div>
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center">
        <p className="text-gray-600 text-sm">${(item.quantity * item.price).toFixed(2)}</p>

        {isCartView && (
          <button className="ml-4" onClick={() => removeFromCart(item._id)}>
            <img src="/svgs/Shared/cross/cross.svg" alt="Remove" className="w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
