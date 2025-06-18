import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: {
    _id: string; // ✅ Use `_id` instead of `id` (matches API & Zustand store)
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } =
    useCartStore();

  return (
    <div className="flex items-center justify-between border-b py-4">
      <img
        src={item.image || "/cart/cart1.png"}
        alt={item.name}
        className="w-16 h-16 object-cover"
      />
      <div className="flex-1 ml-4 gap-[10px]">
        <h3 className="text-[16px] leading-[24px] font-medium">{item.name}</h3>
        <h3 className="text-[14px] leading-[21px] font-normal">
          ${item.price}
        </h3>

        <div className="flex items-center mt-2">
          {/* Quantity Controls */}
          <div className="border rounded-[4px] flex items-center">
            <button
              className="px-2 text-[14px] leading-[21px] font-normal"
              onClick={() => decrementQuantity(item._id)}
            >
              -
            </button>
            <span className="mx-2 text-[14px] leading-[21px] font-normal">
              {item.quantity}
            </span>
            <button
              className="px-2 text-[14px] leading-[21px] font-normal"
              onClick={() => incrementQuantity(item._id)}
            >
              +
            </button>
          </div>

          {/* Remove Item */}
          <div
            className="ml-[10px] cursor-pointer"
            onClick={() => removeFromCart(item._id)}
          >
            <img
              src="/svgs/Shared/cross/cross.svg"
              alt="Remove"
              className="w-[8px] filter invert"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
