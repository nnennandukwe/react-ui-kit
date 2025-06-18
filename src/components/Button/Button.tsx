import React, { forwardRef } from 'react';
import { 
  BaseComponentProps, 
  Size, 
  ColorVariant, 
  LoadingState,
  AccessibilityProps,
  PolymorphicProps 
} from '../../types/common';
import './Button.css';

export interface ButtonProps 
  extends BaseComponentProps, 
         LoadingState, 
         AccessibilityProps,
         Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Visual style variant */
  variant?: ColorVariant;
  /** Button size */
  size?: Size;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Whether button should take full width */
  fullWidth?: boolean;
  /** Icon to display before text */
  startIcon?: React.ReactNode;
  /** Icon to display after text */
  endIcon?: React.ReactNode;
  /** Whether button should have minimal styling */
  minimal?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Button component with comprehensive styling and accessibility features
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      disabled = false,
      type = 'button',
      fullWidth = false,
      minimal = false,
      isLoading = false,
      loadingText = 'Loading...',
      startIcon,
      endIcon,
      className = '',
      children,
      onClick,
      'data-testid': testId,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const classes = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      disabled && 'btn--disabled',
      isLoading && 'btn--loading',
      fullWidth && 'btn--full-width',
      minimal && 'btn--minimal',
      className
    ]
      .filter(Boolean)
      .join(' ');

    const buttonContent = isLoading ? (
      <>
        <span className="btn__spinner" aria-hidden="true" />
        <span className="btn__loading-text">{loadingText}</span>
      </>
    ) : (
      <>
        {startIcon && <span className="btn__start-icon" aria-hidden="true">{startIcon}</span>}
        {children && <span className="btn__text">{children}</span>}
        {endIcon && <span className="btn__end-icon" aria-hidden="true">{endIcon}</span>}
      </>
    );

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || isLoading}
        onClick={handleClick}
        data-testid={testId}
        aria-label={ariaLabel}
        aria-disabled={disabled || isLoading}
        {...rest}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';