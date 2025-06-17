import React, { forwardRef } from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success = false,
      helperText,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const stateClass = hasError ? 'input--error' : success ? 'input--success' : '';
    const widthClass = fullWidth ? 'input--full-width' : '';
    const inputClasses = `input ${stateClass} ${className}`.trim();
    const wrapperClasses = `input-wrapper ${widthClass}`.trim();

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={
            error || helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {(error || helperText) && (
          <span
            id={`${inputId}-helper`}
            className={`input-helper ${hasError ? 'input-helper--error' : ''}`}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';