import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Icon from './Icon';
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  hasIcon = false,
  iconName,
  iconPosition = 'left',
  className,
  isLoading = false,
  to,
  ...props
}) => {
  const baseStyles = `rounded-full focus:outline-none focus:ring-2 inline-flex items-center gap-2 justify-center md:min-h-[30px]  transition ease-in-out duration-200`;

  const variantStyles = {
    primary: 'bg-primary-gradient text-white focus:ring-green-500 shadow',
    secondary:
      'bg-secondary-gradient text-[#1E4A28] focus:ring-green-500 font-semibold shadow-md ',
    danger: 'bg-[#D90000] hover:bg-red-600 text-white focus:ring-red-500 ',
    transparent: 'bg-transparent text-[#1E4A28] focus:outline-none ',
    blue: 'flex justify-between items-center rounded-full pr-2 pl-2 bg-[#0050C8] text-white font-bold shadow-sm text-md',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-5 py-2 text-md',
    lg: 'px-12 py-3 text-lg ',
  };

  const buttonClass = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
    { 'opacity-50 cursor-not-allowed': disabled || isLoading }
  );

  const content = isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="flex  items-center gap-2 justify-center">
      {hasIcon && iconPosition === 'left' && <Icon name={iconName} />}
      {children}
      {hasIcon && iconPosition === 'right' && <Icon name={iconName} />}
    </div>
  );

  if (type === 'link') {
    return (
      <Link {...props} to={to} className={`${buttonClass} hover:text-white`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}>
      {content}
    </button>
  );
};

export default Button;
