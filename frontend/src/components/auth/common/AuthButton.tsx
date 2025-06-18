export const AuthButton = ({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`w-full bg-[#F5A3B7] text-[#FFFFFF] p-[10px] text-[16px] font-normal rounded-[4px] ${className}`}
    >
      {children}
    </button>
  );
};
