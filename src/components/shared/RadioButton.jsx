import React from 'react';

const RadioButton = ({
  label,
  name,
  value,
  checked = false,
  onChange,
  disabled = false,
  variant = 'default',
  ...props
}) => {
  const backgroundColor = variant === 'green' ? 'bg-[#3D9751]' : 'bg-[#818181]';

  const handleKeyDown = (e) => {
    // Check if the user presses "Enter" or "Space"
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onChange({ target: { value } }); // Manually call onChange with the value
    }
  };

  return (
    <label
      key={label}
      className={`inline-flex items-center cursor-pointer w-fit capitalize mr-4   ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      aria-label={label}
      aria-checked={checked}
      role="radio"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      {...props}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="w-5 h-5 rounded-full border-2 border-[#818181] flex items-center justify-center">
          <div
            className={`w-3 h-3 rounded-full border-2 border-[#818181] transition-all duration-150 ${
              checked ? backgroundColor : ''
            }`}></div>
        </div>
      </div>
      <span className="ml-2 min-w-[25px] line-clamp-3 overflow-hidden">
        {label}
      </span>
    </label>
  );
};

export default RadioButton;
