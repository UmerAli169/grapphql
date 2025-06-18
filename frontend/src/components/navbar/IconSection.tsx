const IconSection = ({
    icons,
    handleAccountClick,
    setIsSearchActive,
    setIsCartOpen,
  }:any) => {
    return (
      <div className="flex gap-[20px] text-[#383838] font-normal">
        {icons.map(({ img, label }:any) => (
          <div
            key={label}
            className={`group flex flex-col items-center cursor-pointer ${
              label.toLowerCase() !== "cart" ? "hidden lg:flex" : ""
            }`} 
            onClick={() => {
              if (label.toLowerCase() === "account") {
                handleAccountClick();
              } else if (label.toLowerCase() === "search") {
                setIsSearchActive(true);
              } else if (label.toLowerCase() === "cart") {
                setIsCartOpen(true);
              }
            }}
          >
            <img src={img} alt={label} className="w-[24px] h-[24px]" />
            <p className="text-[12px] font-normal group-hover:text-[#F5A3B7]">
              {label}
            </p>
          </div>
        ))}
      </div>
    );
  };
  
  export default IconSection;
  