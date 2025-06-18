import MenuItem from "./MetuItems";

const DesktopMenu = ({ menuItems }:any) => {
  return (
    <ul className="hidden lg:flex gap-[40px]">
      {menuItems.map((item:any) => (
        <MenuItem key={item.label} label={item.label} enabled={item.enabled} />
      ))}
    </ul>
  );
};

export default DesktopMenu;
