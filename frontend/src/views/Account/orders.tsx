import AccountLayout from "../../components/account/AccountLayout";
import React from "react";
import OrderList from "../../components/order/OrderList";
import ordersData from "../../Data/order/order.json"; 

function Page() {
  return (
    <div>
      <AccountLayout>
        <p className="font-[poppins] text-[20px] leading-[30px] text-[#383838] font-medium   hover:text-[#F5A3B7] pb-[20px] ">Your Orders</p>
        <OrderList orders={ordersData} />
      </AccountLayout>
    </div>
  );
}

export default Page;
