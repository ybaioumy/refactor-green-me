import React from 'react';

function Card({ children, title }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#1E4A28] text-[22px] font-[700]">{title}</label>
      <div className="bg-[#EFEFEF] p-[25px] flex flex-col gap-[22px] w-full rounded-[15px]">
        {children}
      </div>
    </div>
  );
}

export default Card;
