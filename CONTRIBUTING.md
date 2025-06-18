# Contributing to React UI Kit

Thank you for your interest in contributing to React UI Kit! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/react-ui-kit.git
   cd react-ui-kit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development environment**
   ```bash
   # Start Storybook for component development
   npm run storybook
   
   # Or start the dev server
   npm run dev
   ```

## 📋 Development Workflow

### Branch Naming Convention

- `feature/component-name` - New components or major features
- `fix/issue-description` - Bug fixes
- `docs/update-description` - Documentation updates
- `refactor/component-name` - Code refactoring
- `test/component-name` - Adding or updating tests

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(button): add loading state with spinner
fix(modal): prevent body scroll on mobile
docs(readme): update installation instructions
test(input): add validation tests
```

## 🧩 Adding New Components

### 1. Component Structure

Create a new component following this structure:

```
src/components/ComponentName/
├── ComponentName.tsx      # Main component
├── ComponentName.css      # Styles
├── index.ts              # Exports
├── __tests__/
│   └── ComponentName.test.tsx
└── ComponentName.stories.tsx (in src/stories/)
```

### 2. Component Template

```tsx
import React, { forwardRef } from 'react';
import { BaseComponentProps, AccessibilityProps } from '../../types/common';
import './ComponentName.css';

export interface ComponentNameProps 
  extends BaseComponentProps, 
         AccessibilityProps {
  // Component-specific props
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
}

/**
 * ComponentName description
 * 
 * @example
 * ```tsx
 * <ComponentName variant="primary" size="medium">
 *   Content
 * </ComponentName>
 * ```
 */
export const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      className = '',
      children,
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const classes = [
      'component-name',
      `component-name--${variant}`,
      `component-name--${size}`,
      className
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        data-testid={testId}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### 3. Required Files

Every component must include:

- **TypeScript component** with proper typing
- **CSS styles** with design system tokens
- **Unit tests** with good coverage
- **Storybook stories** for documentation
- **Export in index files**

## 🧪 Testing Guidelines

### Test Requirements

- **Unit tests** for all components
- **Accessibility tests** using jest-axe
- **User interaction tests** with Testing Library
- **Edge case coverage**
- **Minimum 80% code coverage**

### Test Structure

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<ComponentName>Test</ComponentName>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    // Test different variants
  });

  describe('Accessibility', () => {
    // Test ARIA attributes, keyboard navigation, etc.
  });

  describe('User Interactions', () => {
    // Test click, hover, focus, etc.
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

## 🎨 Styling Guidelines

### CSS Architecture

- Use **CSS custom properties** for theming
- Follow **BEM methodology** for class naming
- Include **responsive design** considerations
- Support **dark mode** and **high contrast**
- Consider **reduced motion** preferences

### Design Tokens

Use CSS custom properties defined in component styles:

```css
:root {
  --component-bg: white;
  --component-border: #d1d5db;
  --component-text: #111827;
  --component-border-radius: 6px;
  --component-transition: all 0.2s ease-in-out;
}
```

### Accessibility Requirements

- **Color contrast** meets WCAG AA standards
- **Focus indicators** are clearly visible
- **Interactive elements** have minimum 44px touch targets
- **Motion** can be disabled via `prefers-reduced-motion`

## 📚 Documentation

### Storybook Stories

Create comprehensive stories showing:

- **Default state**
- **All variants and sizes**
- **Interactive examples**
- **Accessibility features**
- **Edge cases**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../components/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Component description and usage guidelines.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default ComponentName',
  },
};
```

### JSDoc Comments

Include comprehensive JSDoc comments:

```tsx
/**
 * ComponentName provides [functionality description]
 * 
 * @param variant - Visual style variant
 * @param size - Component size
 * @param children - Content to display
 * 
 * @example
 * Basic usage:
 * ```tsx
 * <ComponentName variant="primary">
 *   Content
 * </ComponentName>
 * ```
 * 
 * @example
 * With custom styling:
 * ```tsx
 * <ComponentName 
 *   variant="secondary" 
 *   className="custom-class"
 * >
 *   Content
 * </ComponentName>
 * ```
 */
```

## 🔍 Code Quality

### Pre-commit Checks

Before committing, ensure:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format

# Tests
npm run test:ci

# All checks
npm run validate
```

### Code Review Checklist

- [ ] Component follows established patterns
- [ ] TypeScript types are comprehensive
- [ ] Tests cover all functionality
- [ ] Accessibility requirements met
- [ ] Documentation is complete
- [ ] Performance considerations addressed
- [ ] Browser compatibility verified

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes

### Release Steps

1. **Update version** in package.json
2. **Update CHANGELOG.md** with changes
3. **Create release PR** to main branch
4. **Tag release** after merge
5. **Deploy Storybook** automatically via CI

## 🤝 Community

### Getting Help

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Questions and community chat
- **Storybook** - Component documentation and examples

### Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for all contributors.

## 📄 License

By contributing to React UI Kit, you agree that your contributions will be licensed under the MIT License.