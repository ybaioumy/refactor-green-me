import React, { forwardRef } from 'react';
import Icon from './Icon';

const Section = forwardRef(({ label, children }, ref) => {
  return (
    <div ref={ref} className="flex flex-col my-10 w-full">
      <label className="text-[#1E4A28] text-[20px] font-semibold">
        {label}
      </label>
      <div className="bg-[#EFEFEF] md:p-6 p-2 py-4 w-full md:w-full rounded-[10px] mt-1 relative">
        {children}
      </div>
    </div>
  );
});
const ItemRow = ({
  label,
  children,
  hasBorder = false,
  canEdit,
  onRemove,
  ...props
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row
         w-full items-center mb-[25px] ${
           hasBorder ? 'border-b-[1px] border-black pb-4' : ''
         }`}
      {...props}>
      <label className="text-[#000000] text-[18px] font-abel w-full md:w-1/3 mb-2 md:mb-0">
        {label}
      </label>
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-10">
        {children}
      </div>
      {canEdit && (
        <button onClick={onRemove} className="ml-5">
          <Icon name={'remove'} />
        </button>
      )}
    </div>
  );
};

export default Section;
export { ItemRow };
