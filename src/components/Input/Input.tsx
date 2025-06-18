import React, { forwardRef, useState, useCallback } from 'react';
import { BaseComponentProps, Size, ValidationState, AccessibilityProps } from '../../types/common';
import { useId } from '../../hooks';
import './Input.css';

export interface InputProps 
  extends BaseComponentProps,
         ValidationState,
         AccessibilityProps,
         Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Success state */
  success?: boolean;
  /** Helper text */
  helperText?: string;
  /** Input size */
  size?: Size;
  /** Whether input should take full width */
  fullWidth?: boolean;
  /** Icon to display at the start of input */
  startIcon?: React.ReactNode;
  /** Icon to display at the end of input */
  endIcon?: React.ReactNode;
  /** Whether to show character count */
  showCharacterCount?: boolean;
  /** Maximum character count */
  maxLength?: number;
  /** Loading state */
  loading?: boolean;
  /** Custom validation function */
  validate?: (value: string) => string | null;
  /** Callback when validation state changes */
  onValidationChange?: (isValid: boolean, message?: string) => void;
}

/**
 * Enhanced input component with validation, icons, and accessibility features
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   error="Please enter a valid email"
 *   startIcon={<EmailIcon />}
 *   fullWidth
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success = false,
      helperText,
      size = 'medium',
      fullWidth = false,
      startIcon,
      endIcon,
      showCharacterCount = false,
      maxLength,
      loading = false,
      validate,
      onValidationChange,
      className = '',
      id,
      value,
      onChange,
      onBlur,
      'data-testid': testId,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId('input');
    const inputId = id || generatedId;
    const [internalValue, setInternalValue] = useState(value || '');
    const [validationError, setValidationError] = useState<string | null>(null);
    
    const currentValue = value !== undefined ? value : internalValue;
    const hasError = !!(error || validationError);
    const hasSuccess = success && !hasError;
    
    // Character count
    const characterCount = typeof currentValue === 'string' ? currentValue.length : 0;
    const showCount = showCharacterCount && (maxLength || characterCount > 0);
    
    // Helper text IDs for aria-describedby
    const helperIds = [];
    if (error || helperText || validationError) {
      helperIds.push(`${inputId}-helper`);
    }
    if (showCount) {
      helperIds.push(`${inputId}-count`);
    }
    
    const effectiveAriaDescribedBy = [
      ariaDescribedBy,
      ...helperIds
    ].filter(Boolean).join(' ') || undefined;

    // Validation logic
    const runValidation = useCallback((val: string) => {
      if (!validate) return null;
      
      const validationResult = validate(val);
      setValidationError(validationResult);
      onValidationChange?.(validationResult === null, validationResult || undefined);
      return validationResult;
    }, [validate, onValidationChange]);

    // Handle change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
      
      // Run validation on change if provided
      if (validate) {
        runValidation(newValue);
      }
      
      onChange?.(event);
    };

    // Handle blur
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      // Run validation on blur
      if (validate) {
        runValidation(event.target.value);
      }
      
      onBlur?.(event);
    };

    // CSS classes
    const wrapperClasses = [
      'input-wrapper',
      `input-wrapper--${size}`,
      fullWidth && 'input-wrapper--full-width',
      hasError && 'input-wrapper--error',
      hasSuccess && 'input-wrapper--success',
      loading && 'input-wrapper--loading',
      (startIcon || endIcon) && 'input-wrapper--with-icons'
    ].filter(Boolean).join(' ');

    const inputClasses = [
      'input',
      startIcon && 'input--with-start-icon',
      endIcon && 'input--with-end-icon',
      className
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className="input__label">
            {label}
          </label>
        )}
        
        <div className="input__container">
          {startIcon && (
            <div className="input__start-icon" aria-hidden="true">
              {startIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            value={currentValue}
            maxLength={maxLength}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasError}
            aria-describedby={effectiveAriaDescribedBy}
            aria-label={ariaLabel}
            data-testid={testId}
            disabled={loading}
            {...props}
          />
          
          {(endIcon || loading) && (
            <div className="input__end-icon" aria-hidden="true">
              {loading ? (
                <div className="input__spinner" />
              ) : (
                endIcon
              )}
            </div>
          )}
        </div>

        {/* Helper text and error messages */}
        {(error || helperText || validationError) && (
          <div
            id={`${inputId}-helper`}
            className={`input__helper ${hasError ? 'input__helper--error' : ''}`}
          >
            {error || validationError || helperText}
          </div>
        )}

        {/* Character count */}
        {showCount && (
          <div
            id={`${inputId}-count`}
            className={`input__character-count ${
              maxLength && characterCount > maxLength ? 'input__character-count--over' : ''
            }`}
          >
            {maxLength ? `${characterCount}/${maxLength}` : characterCount}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';