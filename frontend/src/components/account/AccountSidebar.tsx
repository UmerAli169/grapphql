import Sidebar from "../shared/Sidebar"; 

const AccountPage = () => {
  return (
    <Sidebar title="Account"
      links={[
        { label: "Contact Information", href: "/account/contactinformation" },
        { label: "Change Password", href: "/account/changepassword" },
        { label: "Addresses", href: "/account/addresses" },
      ]}
      collapsibleSections={[
        {
          key: "orders",
          title: "Orders",
          href: "/account/orders",
          items: [
            { label: "All period", href: "/account/orders?filter=all" },
            { label: "For this month", href: "/account/orders?filter=this-month" },
            { label: "Last month", href: "/account/orders?filter=last-month" },
            { label: "This year", href: "/account/orders?filter=this-year" },
            { label: "Last year", href: "/account/orders?filter=last-year" },
          ],
        },
        {
          key: "wishlist",
          title: "Wishlist",
          href: "/account/wishlist",
          items: [
            { label: "All period", href: "/account/wishlist?filter=all" },
            { label: "For this month", href: "/account/wishlist?filter=this-month" },
            { label: "Last month", href: "/account/wishlist?filter=last-month" },
            { label: "This year", href: "/account/wishlist?filter=this-year" },
            { label: "Last year", href: "/account/wishlist?filter=last-year" },
          ],
        },
      ]}
    />
  );
};

export default AccountPage;
