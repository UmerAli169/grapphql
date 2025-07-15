import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};
const wrapper: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className={`px-[20.25px] md:px-[30px]  mx-auto container `}>
      {children}
    </div>
  );
};

export default wrapper;
