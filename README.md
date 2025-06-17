# React UI Kit

A modern React component library built with TypeScript, featuring reusable UI components with comprehensive testing and documentation.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-ui-kit
```

2. Install dependencies:
```bash
npm install
```

### Running the Project

#### 🎨 Storybook (Component Development)
```bash
npm run storybook
```
This will start Storybook on http://localhost:6006 where you can:
- View all components in isolation
- Interact with component props
- See different component states and variants

#### 🧪 Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

#### 🚧 Development Server
```bash
npm run dev
```
This starts the Vite development server on http://localhost:5173

#### 📦 Building for Production
```bash
npm run build
```

#### 🔍 Linting
```bash
npm run lint
```

## 📁 Project Structure

```
react-ui-kit/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   ├── index.ts
│   │   │   └── __tests__/
│   │   │       └── Button.test.tsx
│   │   ├── Modal/
│   │   ├── Input/
│   │   ├── Dropdown/
│   │   └── Toast/
│   └── stories/
│       ├── Button.stories.tsx
│       ├── Modal.stories.tsx
│       ├── Input.stories.tsx
│       ├── Dropdown.stories.tsx
│       └── Toast.stories.tsx
├── .storybook/
├── jest.config.js
├── jest.setup.ts
└── package.json
```

## 🧩 Available Components

### Button
A versatile button component with primary and secondary variants.
```tsx
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
```

### Modal
An accessible modal dialog with keyboard support.
```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="My Modal">
  Modal content here
</Modal>
```

### Input
Form input with validation states.
```tsx
<Input 
  label="Email" 
  type="email" 
  error="Invalid email address"
/>
```

### Dropdown
Fully accessible dropdown with custom rendering capabilities.
```tsx
<Dropdown
  options={options}
  value={value}
  onChange={handleChange}
  renderOption={customRenderer}
/>
```

### Toast
Notification system with auto-dismiss.
```tsx
<ToastContainer toasts={toasts} position="top-right" />
```

## 🔧 Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Storybook** - Component documentation
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **ESLint & Prettier** - Code quality

## 📝 Development Notes

- The Dropdown component features a powerful `renderOption` function for custom item rendering
- Components are built with accessibility in mind
- Full TypeScript support for type safety

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and ensure they pass
4. Submit a pull request

## 📄 License

This project is part of a demonstration for showcasing development capabilities.