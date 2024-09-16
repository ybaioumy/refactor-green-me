import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React, { forwardRef, useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Input = forwardRef(
  (
    {
      type = 'text',
      onChange,
      placeHolder,
      label,
      readOnly = false,
      variant = 'primary',
      value,
      ...props
    },
    ref
  ) => {
       const handleInputChange = (e) => {
         let inputValue = e.target.value;

         // If the input is of type number, convert the value to a number
         if (type === 'number') {
           inputValue = e.target.valueAsNumber || ''; // Ensure empty strings are handled
         }

         if (onChange) {
           onChange(inputValue);
         }
       };
    const handleDateChange = (dateString) => {
      if (onChange) {
        // Handle null or empty date (date cleared)
        onChange(dateString ? dayjs(dateString).toISOString() : null); // Pass null if the date is cleared
      }
    };
    const [togglePassword, setTogglePassword] = useState(false);
    const primary =
      'w-full pt-2.5 pb-1.5 pl-1 md:pl-4 pr-1 bg-[#F7F7F7] [box-shadow:0px_2px_6px_1px_rgba(0,_0,_0,_0.20)_inset] rounded-md justify-start items-center inline-flex focus:outline-none hover:outline placeholder-[#1E4A28] font-typeMono';
    const secondary =
      'w-full pt-2.5 pb-1.5 pl-2 md:pl-4 pr-1 rounded-md justify-start items-center inline-flex border border-black focus:outline-none placeholder-[#1E4A28] bg-[#BFE0C6]';
    const date =
      'w-full py-2 border-0 pl-0  border-b-2 border-[#8c8c8c] outline-none custom-date-picker rounded-none bg-[##F1F1F1] focus:border-transparent focus:ring-0 hover:border-b-[#77AF00] focus:border-b-[#77AF00] placeholder-[#1E4A28] text-[#1E4A28]';
    const borderBottom =
      'border-b-2 pb-1.5 border-[#8c8c8c] w-full outline-none hover:border-b-[#77AF00] focus:border-b-[#77AF00]';
    const innerShadowClasses =
      'w-full py-2.5 px-2 md:pl-9 bg-[#F7F7F7] [box-shadow:0px_2px_6px_1px_rgba(0,_0,_0,_0.20)_inset] rounded-md justify-between items-center inline-flex focus:outline-none placeholder-[#1E4A28] text-[#1E4A28] hover:outline';

    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return primary;
        case 'secondary':
          return secondary;
        case 'date':
          return date;
        case 'borderBottom':
          return borderBottom;
        case 'innerShadow':
          return innerShadowClasses;
        default:
          return primary;
      }
    };

    if (type === 'text' || type === 'number') {
      return (
        <div className="flex flex-col gap-2 justify-end items-start w-full">
          {label && (
            <label className="text-[#1E4A28] text-[14px] font-semibold">
              {label}
            </label>
          )}
          <input
            ref={ref} // Forward the ref
            placeholder={placeHolder || ''}
            type={type}
            className={getVariantStyles()}
            onChange={handleInputChange} // Use the custom handler
            readOnly={readOnly}
            value={value || ''}
            {...props}
          />
        </div>
      );
    } else if (type === 'textarea') {
      return (
        <div className="flex flex-col gap-2 justify-end items-start w-full">
          {label && (
            <label className="text-[#1E4A28] text-[14px] font-semibold">
              {label}
            </label>
          )}
          <textarea
            ref={ref} // Forward the ref
            placeholder={placeHolder || ''}
            className={getVariantStyles()}
            onChange={onChange}
            readOnly={readOnly}
            value={value || ''}
            {...props}
          />
        </div>
      );
    } else if (type === 'date') {
      return (
        <DatePicker
          ref={ref} // Forward the ref
          onChange={handleDateChange}
          placeholder={placeHolder}
          value={value ? dayjs(value) : null} // Handle null value properly
          className={`${getVariantStyles()} hover:outline-none focus:border-0 focus:outline-none`}
          {...props}
        />
      );
    } else if (type === 'password') {
      return (
        <div className="flex flex-col gap-2 justify-end items-start w-full">
          {label && (
            <label className="text-[#1E4A28] text-[14px] font-semibold">
              {label}
            </label>
          )}
          <div className="w-full flex relative">
            <input
              ref={ref} // Forward the ref
              placeholder={placeHolder || ''}
              type={togglePassword ? 'text' : 'password'}
              className={getVariantStyles()}
              onChange={onChange}
              readOnly={readOnly}
              autoComplete="current-password" // Suggest new password
              value={value || ''}
              {...props}
            />
            <button
              onClick={() => setTogglePassword((prev) => !prev)}
              className="focus:outline-none absolute right-2"
              type="button">
              {togglePassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-2 justify-end items-start w-full">
          {label && (
            <label className="text-[#1E4A28] text-[14px] font-semibold">
              {label}
            </label>
          )}
          <input
            ref={ref} // Forward the ref
            placeholder={placeHolder || ''}
            type={type}
            className={getVariantStyles()}
            onChange={onChange}
            readOnly={readOnly}
            value={value || ''}
            {...props}
          />
        </div>
      );
    }
  }
);

export default Input;
