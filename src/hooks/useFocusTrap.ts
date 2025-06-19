import { useEffect, useRef, RefObject } from 'react';

const FOCUSABLE_ELEMENTS = [
  'button',
  '[href]',
  'input',
  'select',
  'textarea',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(', ');

/**
 * Hook to trap focus within a container element
 * 
 * @param enabled - Whether focus trap is enabled
 * @returns Ref to attach to the container element
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  enabled = true
): RefObject<T> {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(FOCUSABLE_ELEMENTS);

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus first element initially
    firstElement.focus();

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [enabled]);

  return containerRef;
}

/**
 * Hook to manage focus restoration
 * 
 * @param enabled - Whether focus restoration is enabled
 * @returns Object with methods to save and restore focus
 */
export function useFocusRestore(enabled = true) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const saveFocus = () => {
    if (enabled) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  };

  const restoreFocus = () => {
    if (enabled && previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  };

  return { saveFocus, restoreFocus };
}