import React from 'react';
import './Button.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  disabled = false,
  onClick,
  children,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
}) => {
  const baseClasses = 'btn';
  const variantClass = `btn--${variant}`;
  const disabledClass = disabled ? 'btn--disabled' : '';
  const classes = `${baseClasses} ${variantClass} ${disabledClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};