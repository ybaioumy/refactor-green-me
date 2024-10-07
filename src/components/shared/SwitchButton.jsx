import React from 'react';

const SwitchButton = ({ handleChange, isChecked, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`flex items-center cursor-pointer ${
        disabled && 'opacity-45 cursor-not-allowed'
      }`}
      onClick={handleChange}
      style={{ outline: 'none', border: 'none', background: 'none' }}>
      <span className="relative inline-block w-12 h-6 border-2 border-[#8E8E8E] rounded-xl">
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 inline-block w-4 h-4 transition transform duration-200 ease-in-out ${
            isChecked ? 'translate-x-6' : 'translate-x-1'
          }`}
          style={{
            backgroundColor: isChecked ? '#3D9751' : '#F93535',
            borderRadius: '50%',
          }}></span>
      </span>
    </button>
  );
};

export default SwitchButton;
