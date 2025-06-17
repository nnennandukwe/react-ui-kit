import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWithState = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    title: 'Modal Title',
    children: 'This is the modal content. You can put any content here.',
  },
};

export const WithLongContent: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    title: 'Terms and Conditions',
    children: (
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit.</p>
        <p>Excepteur sint occaecat cupidatat non proident.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    children: 'This modal has no title, just content.',
  },
};

export const NoCloseOnEscape: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    title: 'No Escape Key Close',
    children: 'Press Escape key - this modal will not close.',
    closeOnEscape: false,
  },
};

export const NoCloseOnOverlay: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    title: 'No Overlay Click Close',
    children: 'Click outside - this modal will not close.',
    closeOnOverlayClick: false,
  },
};

export const WithForm: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    title: 'Login Form',
    children: (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label>
          Email:
          <input type="email" style={{ marginLeft: '8px' }} />
        </label>
        <label>
          Password:
          <input type="password" style={{ marginLeft: '8px' }} />
        </label>
        <Button variant="primary">Submit</Button>
      </form>
    ),
  },
};