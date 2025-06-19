/**
 * Common types and utilities for the UI Kit
 */

// Base component props that all components should extend
export interface BaseComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Test identifier for automated testing */
  'data-testid'?: string;
  /** Custom CSS properties */
  style?: React.CSSProperties;
}

// Size variants used across components
export type Size = 'small' | 'medium' | 'large';

// Color variants for theming
export type ColorVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

// Common spacing values
export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Polymorphic component props for flexible element rendering
export type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

// Utility type for forwarded ref components
export type ForwardRefComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

// Event handler types
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type KeyboardHandler = (event: React.KeyboardEvent<HTMLElement>) => void;

// Accessibility props
export interface AccessibilityProps {
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ARIA described by reference */
  'aria-describedby'?: string;
  /** ARIA labelled by reference */
  'aria-labelledby'?: string;
  /** Role attribute */
  role?: string;
}

// Loading state type
export interface LoadingState {
  isLoading?: boolean;
  loadingText?: string;
}

// Validation state
export interface ValidationState {
  isValid?: boolean;
  isInvalid?: boolean;
  validationMessage?: string;
}