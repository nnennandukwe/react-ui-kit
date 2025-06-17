import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Dropdown.css';

export type DropdownOption<T = unknown> = {
  value: string;
  label: string;
  disabled?: boolean;
  data?: T;
};

export type RenderOptionProps<T = unknown> = {
  option: DropdownOption<T>;
  isSelected: boolean;
  isFocused: boolean;
  index: number;
};

export interface DropdownProps<T = unknown> {
  options: DropdownOption<T>[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: DropdownOption<T>) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  renderOption?: (props: RenderOptionProps<T>) => React.ReactNode;
  controlled?: boolean;
  className?: string;
  dropdownClassName?: string;
  fullWidth?: boolean;
}

export function Dropdown<T = unknown>({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  label,
  error,
  renderOption,
  controlled = false,
  className = '',
  dropdownClassName = '',
  fullWidth = false,
}: DropdownProps<T>) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const value = controlled ? controlledValue : internalValue;
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && optionsRef.current && focusedIndex >= 0) {
      const focusedElement = optionsRef.current.children[focusedIndex] as HTMLElement;
      focusedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  const handleSelect = useCallback(
    (option: DropdownOption<T>) => {
      if (option.disabled) return;

      if (!controlled) {
        setInternalValue(option.value);
      }
      onChange?.(option.value, option);
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    },
    [controlled, onChange]
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          const option = options[focusedIndex];
          if (option && !option.disabled) {
            handleSelect(option);
          }
        } else {
          setIsOpen(true);
          setFocusedIndex(0);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next >= options.length ? 0 : next;
          });
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(options.length - 1);
        } else {
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? options.length - 1 : next;
          });
        }
        break;
    }
  };

  const defaultRenderOption = ({ option, isSelected, isFocused }: RenderOptionProps<T>) => (
    <>
      {option.label}
      {isSelected && <span className="dropdown-option-check">✓</span>}
    </>
  );

  const renderFunc = renderOption || defaultRenderOption;
  const hasError = !!error;
  const wrapperClasses = `dropdown-wrapper ${fullWidth ? 'dropdown--full-width' : ''} ${className}`.trim();

  return (
    <div className={wrapperClasses}>
      {label && <label className="dropdown-label">{label}</label>}
      <div ref={dropdownRef} className="dropdown">
        <button
          ref={buttonRef}
          type="button"
          className={`dropdown-trigger ${hasError ? 'dropdown-trigger--error' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? undefined : 'dropdown-label'}
        >
          <span className="dropdown-value">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="dropdown-arrow">▼</span>
        </button>

        {isOpen && (
          <ul
            ref={optionsRef}
            className={`dropdown-options ${dropdownClassName}`.trim()}
            role="listbox"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isFocused = index === focusedIndex;

              return (
                <li
                  key={option.value}
                  className={`dropdown-option ${
                    isSelected ? 'dropdown-option--selected' : ''
                  } ${isFocused ? 'dropdown-option--focused' : ''} ${
                    option.disabled ? 'dropdown-option--disabled' : ''
                  }`}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                >
                  {renderFunc({ option, isSelected, isFocused, index })}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {error && <span className="dropdown-error">{error}</span>}
    </div>
  );
}