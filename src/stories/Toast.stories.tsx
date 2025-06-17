import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, ToastContainer, ToastProps } from '../components/Toast';
import { Button } from '../components/Button';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    autoClose: {
      control: 'boolean',
    },
    duration: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastDemo = () => {
  const [toasts, setToasts] = useState<Array<Omit<ToastProps, 'onClose'>>>([]);

  const addToast = (type: ToastProps['type'], message: string, autoClose = true) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message, autoClose }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={() => addToast('info', 'This is an info message')}>
          Show Info
        </Button>
        <Button onClick={() => addToast('success', 'Operation completed successfully!')}>
          Show Success
        </Button>
        <Button onClick={() => addToast('warning', 'Please check your input')}>
          Show Warning
        </Button>
        <Button onClick={() => addToast('error', 'An error occurred')}>
          Show Error
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button onClick={() => addToast('info', 'This toast will not auto-close', false)}>
          Manual Close Toast
        </Button>
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};

export const Interactive: Story = {
  render: () => <ToastDemo />,
};

const SingleToastStory = (args: any) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Show Toast</Button>
      {show && (
        <div style={{ position: 'fixed', top: 16, right: 16 }}>
          <Toast
            {...args}
            id="demo-toast"
            onClose={() => setShow(false)}
          />
        </div>
      )}
    </>
  );
};

export const InfoToast: Story = {
  render: (args) => <SingleToastStory {...args} />,
  args: {
    message: 'This is an informational message',
    type: 'info',
  },
};

export const SuccessToast: Story = {
  render: (args) => <SingleToastStory {...args} />,
  args: {
    message: 'Your changes have been saved!',
    type: 'success',
  },
};

export const WarningToast: Story = {
  render: (args) => <SingleToastStory {...args} />,
  args: {
    message: 'Your session will expire in 5 minutes',
    type: 'warning',
  },
};

export const ErrorToast: Story = {
  render: (args) => <SingleToastStory {...args} />,
  args: {
    message: 'Failed to save changes. Please try again.',
    type: 'error',
  },
};

export const LongMessage: Story = {
  render: (args) => <SingleToastStory {...args} />,
  args: {
    message: 'This is a very long message that should wrap to multiple lines when displayed in the toast notification component',
    type: 'info',
  },
};

export const NoAutoClose: Story = {
  render: (args) => <SingleToastStory {...args} />,
  args: {
    message: 'This toast will not automatically close',
    type: 'info',
    autoClose: false,
  },
};

export const CustomDuration: Story = {
  render: (args) => <SingleToastStory {...args} />,
  args: {
    message: 'This toast will close after 10 seconds',
    type: 'info',
    duration: 10000,
  },
};

const PositionDemo = () => {
  const [toasts, setToasts] = useState<Array<Omit<ToastProps, 'onClose'>>>([]);
  const [position, setPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'>('top-right');

  const addToast = () => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type: 'info', message: `Toast at ${position}` }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value as any)}
          style={{ padding: '8px' }}
        >
          <option value="top-right">Top Right</option>
          <option value="top-left">Top Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="top-center">Top Center</option>
          <option value="bottom-center">Bottom Center</option>
        </select>
        <Button onClick={addToast}>Show Toast</Button>
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} position={position} />
    </div>
  );
};

export const ToastPositions: Story = {
  render: () => <PositionDemo />,
};