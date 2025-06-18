import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { BaseComponentProps, AccessibilityProps } from '../../types/common';
import './Modal.css';

export interface ModalProps extends BaseComponentProps, AccessibilityProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Whether to close on Escape key */
  closeOnEscape?: boolean;
  /** Whether to close when clicking overlay */
  closeOnOverlayClick?: boolean;
  /** Custom overlay class name */
  overlayClassName?: string;
  /** Size of the modal */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Custom close button content */
  closeButtonContent?: React.ReactNode;
  /** Portal container element */
  portalContainer?: Element;
  /** Prevent body scroll when modal is open */
  preventBodyScroll?: boolean;
  /** Initial focus element selector */
  initialFocus?: string;
  /** Return focus element selector */
  returnFocus?: string;
  /** Animation duration in ms */
  animationDuration?: number;
}

/**
 * Accessible modal dialog component with focus management and keyboard support
 * 
 * @example
 * ```tsx
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={handleClose} 
 *   title="Confirm Action"
 *   size="medium"
 * >
 *   <p>Are you sure you want to continue?</p>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  className = '',
  overlayClassName = '',
  size = 'medium',
  showCloseButton = true,
  closeButtonContent = '×',
  portalContainer,
  preventBodyScroll = true,
  initialFocus,
  returnFocus,
  animationDuration = 200,
  'data-testid': testId,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...rest
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

  // Store the previously focused element
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Handle escape key
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (closeOnEscape && event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  }, [closeOnEscape, onClose]);

  // Handle focus trap
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!modalRef.current) return;

    if (event.key === 'Tab') {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }
  }, []);

  // Setup event listeners and body scroll
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleKeyDown);
      
      if (preventBodyScroll) {
        document.body.style.overflow = 'hidden';
      }

      // Set initial focus
      const focusElement = initialFocus 
        ? document.querySelector(initialFocus) as HTMLElement
        : modalRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
      
      if (focusElement) {
        // Delay focus to ensure modal is rendered
        setTimeout(() => focusElement.focus(), 10);
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyDown);
      
      if (preventBodyScroll) {
        document.body.style.overflow = '';
      }

      // Return focus to previous element
      if (!isOpen && previousActiveElement.current) {
        const returnElement = returnFocus 
          ? document.querySelector(returnFocus) as HTMLElement
          : previousActiveElement.current;
        
        if (returnElement && document.contains(returnElement)) {
          returnElement.focus();
        }
      }
    };
  }, [isOpen, handleEscape, handleKeyDown, preventBodyScroll, initialFocus, returnFocus]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === overlayRef.current) {
      onClose();
    }
  };

  // Handle close with animation
  const handleClose = () => {
    if (overlayRef.current) {
      overlayRef.current.classList.add('modal-overlay--closing');
      closeTimeoutRef.current = setTimeout(() => {
        onClose();
      }, animationDuration);
    } else {
      onClose();
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  const modalClasses = [
    'modal',
    `modal--${size}`,
    className
  ].filter(Boolean).join(' ');

  const overlayClasses = [
    'modal-overlay',
    overlayClassName
  ].filter(Boolean).join(' ');

  const titleId = title ? 'modal-title' : undefined;
  const effectiveAriaLabelledBy = ariaLabelledBy || titleId;

  const modalContent = (
    <div
      ref={overlayRef}
      className={overlayClasses}
      onClick={handleOverlayClick}
      data-testid={testId ? `${testId}-overlay` : undefined}
      style={{ animationDuration: `${animationDuration}ms` }}
    >
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={effectiveAriaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-testid={testId}
        {...rest}
      >
        {(title || showCloseButton) && (
          <div className="modal__header">
            {title && (
              <h2 id={titleId} className="modal__title">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="modal__close-button"
                onClick={handleClose}
                aria-label="Close modal"
                data-testid={testId ? `${testId}-close` : undefined}
              >
                {closeButtonContent}
              </button>
            )}
          </div>
        )}
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );

  const container = portalContainer || document.body;
  return createPortal(modalContent, container);
};

Modal.displayName = 'Modal';