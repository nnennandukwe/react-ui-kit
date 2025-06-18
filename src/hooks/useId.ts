import { useRef } from 'react';

let idCounter = 0;

/**
 * Generate a unique ID for component instances
 * Useful for accessibility attributes like aria-labelledby, aria-describedby
 * 
 * @param prefix - Optional prefix for the ID
 * @returns A unique ID string
 */
export function useId(prefix = 'ui'): string {
  const idRef = useRef<string>();
  
  if (!idRef.current) {
    idRef.current = `${prefix}-${++idCounter}`;
  }
  
  return idRef.current;
}