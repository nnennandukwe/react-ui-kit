import { useEffect } from 'react';

export type KeyboardEventHandler = (event: KeyboardEvent) => void;

interface UseKeyboardOptions {
  /** Whether the hook is enabled */
  enabled?: boolean;
  /** Target element to attach listeners to (defaults to document) */
  target?: HTMLElement | Document;
  /** Event type to listen for */
  eventType?: 'keydown' | 'keyup' | 'keypress';
}

/**
 * Hook for handling keyboard events with specific key combinations
 * 
 * @param keyMap - Object mapping keys to handler functions
 * @param options - Configuration options
 */
export function useKeyboard(
  keyMap: Record<string, KeyboardEventHandler>,
  options: UseKeyboardOptions = {}
): void {
  const { enabled = true, target = document, eventType = 'keydown' } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyboard = (event: KeyboardEvent) => {
      const handler = keyMap[event.key];
      if (handler) {
        handler(event);
      }
    };

    target.addEventListener(eventType, handleKeyboard);

    return () => {
      target.removeEventListener(eventType, handleKeyboard);
    };
  }, [keyMap, enabled, target, eventType]);
}

/**
 * Hook for handling escape key specifically
 * 
 * @param handler - Function to call when escape is pressed
 * @param enabled - Whether the hook is enabled
 */
export function useEscapeKey(
  handler: KeyboardEventHandler,
  enabled = true
): void {
  useKeyboard(
    {
      Escape: handler,
    },
    { enabled }
  );
}