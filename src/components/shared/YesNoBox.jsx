import React from 'react';

function YesNoBox({ label, children }) {
  return (
    <div>
      {label && (
        <p className="text-[#1E4A28] font-[700] md:text-[16px] sm:text-[14px] mb-2 max-w-[500px]">
          {label}
        </p>
      )}
      <div className="bg-white rounded-[11px] flex gap-4 w-fit justify-between py-2 px-3 min-w-[250px] border border-black">
        {children}
      </div>
    </div>
  );
}

export default YesNoBox;
