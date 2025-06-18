import React from 'react';

export const CustomCard = ({ children, className ,onClick}:any) => (
  <div className={`bg-[#FFFFFF] rounded-[6px] ${className}`}  onClick={onClick}>
    {children}
  </div>
);