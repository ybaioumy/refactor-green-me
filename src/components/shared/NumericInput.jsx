import React, { forwardRef } from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

const NumericInput = forwardRef(
  (
    {
      maxValu = 100000000000, // waiting confirmation
      label,
      placeholder = `0`,
      onChange,
      value,
      disabled = false,
      unit = '',
      decimals = false,
    },
    ref
  ) => {
    const increment = () => {
      onChange(Math.min((value || 0) + 1, maxValu));
    };

    const decrement = () => {
      onChange(Math.max((value || 0) - 1, 0));
    };

    const handleInputChange = (event) => {
      const newValue = decimals
        ? parseFloat(event.target.value)
        : parseInt(event.target.value, 10);
      if (isNaN(newValue)) {
        return; // Ignore non-numeric input
      }
      onChange(Math.max(0, Math.min(newValue, maxValu)));
    };

    return (
      <div>
        {label && (
          <label
            htmlFor={label}
            className="block text-[#202020] text-[14px] font-medium mb-2 font-abel">
            {label}
          </label>
        )}
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center justify-around overflow-hidden p-1 rounded-lg bg-white md:max-w-[300px] w-full ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
            <button
              type="button"
              onClick={decrement}
              className="focus:outline bg-[#D90000] text-white rounded-full p-1"
              disabled={disabled}
              aria-label="Decrease value" // Accessibility
            >
              <IoMdRemove />
            </button>
            <input
              id={label}
              ref={ref} // Forward the ref here
              placeholder={placeholder}
              type="number"
              value={value || ''}
              onChange={handleInputChange}
              className={`w-1/2 text-center border-x-2 border-[#8C8C8C] ${
                value ? 'text-black font-semibold' : 'text-[#8E8E8E]'
              } focus:outline-none bg-transparent`}
              disabled={disabled}
              aria-label={label || 'Number input'} // Accessibility
              step="any"
            />
            <button
              type="button"
              onClick={increment}
              className="focus:outline bg-[#186129] text-white rounded-full p-1"
              disabled={disabled}
              aria-label="Increase value" // Accessibility
            >
              <IoMdAdd />
            </button>
          </div>
          {unit && (
            <span className="text-[#1E4A28] font-abel text-[18px] capitalize">
              {unit}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default NumericInput;
