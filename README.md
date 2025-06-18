# React UI Kit

[![CI/CD Pipeline](https://github.com/your-username/react-ui-kit/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/your-username/react-ui-kit/actions)
[![Coverage Status](https://codecov.io/gh/your-username/react-ui-kit/branch/main/graph/badge.svg)](https://codecov.io/gh/your-username/react-ui-kit)
[![npm version](https://badge.fury.io/js/react-ui-kit.svg)](https://badge.fury.io/js/react-ui-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, accessible React component library built with TypeScript, featuring comprehensive testing, Storybook documentation, and industry best practices.

## ✨ Features

- 🎨 **Modern Design System** - Consistent, beautiful components
- ♿ **Accessibility First** - WCAG 2.1 AA compliant
- 🔧 **TypeScript** - Full type safety and IntelliSense
- 📱 **Responsive** - Mobile-first design approach
- 🌙 **Dark Mode** - Built-in theme support
- 🧪 **Well Tested** - Comprehensive test coverage
- 📚 **Storybook** - Interactive component documentation
- 🚀 **Performance** - Optimized bundle size
- 🎯 **Developer Experience** - Excellent DX with hooks and utilities

## 🚀 Quick Start

### Installation

```bash
npm install react-ui-kit
# or
yarn add react-ui-kit
# or
pnpm add react-ui-kit
```

### Basic Usage

```tsx
import { Button, Input, Modal } from 'react-ui-kit';

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click me
      </Button>
      
      <Input 
        label="Email" 
        type="email" 
        placeholder="Enter your email"
      />
      
      <Modal isOpen={isOpen} onClose={handleClose} title="Welcome">
        <p>Hello, world!</p>
      </Modal>
    </div>
  );
}
```

## 📦 Components

### Core Components

| Component | Description | Status |
|-----------|-------------|--------|
| **Button** | Versatile button with variants, sizes, and states | ✅ |
| **Input** | Form input with validation and icons | ✅ |
| **Modal** | Accessible modal dialog with focus management | ✅ |
| **Dropdown** | Customizable dropdown with keyboard navigation | ✅ |
| **Toast** | Notification system with auto-dismiss | ✅ |

### Component Features

#### Button
- Multiple variants (primary, secondary, success, warning, error, info)
- Three sizes (small, medium, large)
- Loading states with spinner
- Icon support (start/end icons)
- Full accessibility support

```tsx
<Button 
  variant="primary" 
  size="large" 
  isLoading={loading}
  startIcon={<SaveIcon />}
  onClick={handleSave}
>
  Save Changes
</Button>
```

#### Input
- Validation states and custom validation
- Icon support (start/end icons)
- Character counting
- Helper text and error messages
- Loading states

```tsx
<Input
  label="Password"
  type="password"
  error={errors.password}
  startIcon={<LockIcon />}
  validate={(value) => value.length < 8 ? 'Too short' : null}
  showCharacterCount
  maxLength={50}
/>
```

#### Modal
- Focus trap and restoration
- Keyboard navigation (Escape to close)
- Multiple sizes (small, medium, large, fullscreen)
- Customizable animations
- Portal rendering

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  size="medium"
  closeOnOverlayClick={false}
>
  <p>Are you sure you want to continue?</p>
  <Button onClick={handleConfirm}>Confirm</Button>
</Modal>
```

## 🎨 Theming & Customization

### CSS Custom Properties

The library uses CSS custom properties for easy theming:

```css
:root {
  /* Primary colors */
  --ui-primary: #3b82f6;
  --ui-primary-hover: #2563eb;
  
  /* Spacing */
  --ui-spacing-sm: 8px;
  --ui-spacing-md: 16px;
  --ui-spacing-lg: 24px;
  
  /* Border radius */
  --ui-border-radius: 6px;
  
  /* Transitions */
  --ui-transition: all 0.2s ease-in-out;
}
```

### Dark Mode

Components automatically support dark mode via `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --ui-bg: #1f2937;
    --ui-text: #f9fafb;
    --ui-border: #4b5563;
  }
}
```

## 🧪 Testing

The library includes comprehensive testing utilities:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'react-ui-kit';

test('button handles click events', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  
  render(<Button onClick={handleClick}>Click me</Button>);
  
  await user.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 🔧 Hooks & Utilities

### Custom Hooks

```tsx
import { useId, useClickOutside, useKeyboard, useFocusTrap } from 'react-ui-kit';

function MyComponent() {
  const id = useId('my-component');
  const ref = useClickOutside(() => setOpen(false));
  const focusRef = useFocusTrap(isOpen);
  
  useKeyboard({
    Escape: () => setOpen(false),
    Enter: handleSubmit,
  });
  
  return <div ref={ref} id={id}>...</div>;
}
```

### Available Hooks

- `useId` - Generate unique IDs for accessibility
- `useClickOutside` - Detect clicks outside elements
- `useKeyboard` - Handle keyboard events
- `useEscapeKey` - Handle escape key specifically
- `useFocusTrap` - Trap focus within containers
- `useFocusRestore` - Restore focus after interactions

## 📚 Documentation

### Storybook

Explore all components interactively in our Storybook:

```bash
npm run storybook
```

Visit [https://your-username.github.io/react-ui-kit](https://your-username.github.io/react-ui-kit) for the live documentation.

### TypeScript Support

Full TypeScript definitions are included:

```tsx
import type { ButtonProps, InputProps, ModalProps } from 'react-ui-kit';

interface MyComponentProps {
  buttonProps: ButtonProps;
  inputProps: InputProps;
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm 8+

### Setup

```bash
git clone https://github.com/your-username/react-ui-kit.git
cd react-ui-kit
npm install
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run storybook        # Start Storybook

# Building
npm run build            # Build library
npm run build-storybook  # Build Storybook

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

# Code Quality
npm run lint             # Lint code
npm run lint:fix         # Fix linting issues
npm run format           # Format code
npm run type-check       # Type checking
npm run validate         # Run all checks
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run validate`
5. Commit changes: `git commit -m 'feat: add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📊 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ≥ 90 |
| Firefox | ≥ 88 |
| Safari | ≥ 14 |
| Edge | ≥ 90 |

## 📈 Performance

- **Tree-shakeable** - Import only what you need
- **Small bundle size** - Optimized for production
- **No runtime dependencies** - Only peer dependencies
- **CSS-in-CSS** - No JavaScript styling overhead

## 🔒 Security

- Regular dependency updates
- Security audits in CI/CD
- No known vulnerabilities
- Safe by default configurations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The library this is built for
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [Storybook](https://storybook.js.org/) - For component documentation
- [Testing Library](https://testing-library.com/) - For testing utilities
- [Vite](https://vitejs.dev/) - For build tooling

## 📞 Support

- 📖 [Documentation](https://your-username.github.io/react-ui-kit)
- 🐛 [Issue Tracker](https://github.com/your-username/react-ui-kit/issues)
- 💬 [Discussions](https://github.com/your-username/react-ui-kit/discussions)
- 📧 [Email Support](mailto:support@example.com)

---

<p align="center">
  Made with ❤️ by the React UI Kit team
</p>