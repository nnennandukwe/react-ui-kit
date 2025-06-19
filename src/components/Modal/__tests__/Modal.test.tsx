import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal';

// Mock createPortal to render in the same container
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: React.ReactNode) => children,
}));

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset body styles
    document.body.style.overflow = '';
  });

  describe('Basic Rendering', () => {
    it('renders when open', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(<Modal {...defaultProps} isOpen={false} />);
      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('renders with title', () => {
      render(<Modal {...defaultProps} title="Test Modal" />);
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('renders without title', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<Modal {...defaultProps} title="Test Modal" />);
      const dialog = screen.getByRole('dialog');
      
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('supports custom aria-label', () => {
      render(<Modal {...defaultProps} aria-label="Custom modal" />);
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Custom modal');
    });

    it('supports aria-describedby', () => {
      render(<Modal {...defaultProps} aria-describedby="modal-description" />);
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-describedby', 'modal-description');
    });

    it('prevents body scroll by default', () => {
      render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('allows body scroll when preventBodyScroll is false', () => {
      render(<Modal {...defaultProps} preventBodyScroll={false} />);
      expect(document.body.style.overflow).toBe('');
    });

    it('restores body scroll when unmounted', () => {
      const { unmount } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');
      
      unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Close Functionality', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      
      render(<Modal {...defaultProps} onClose={onClose} title="Test" />);
      
      await user.click(screen.getByLabelText('Close modal'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close on Escape when closeOnEscape is false', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} closeOnEscape={false} />);
      
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('calls onClose when overlay is clicked', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      
      render(<Modal {...defaultProps} onClose={onClose} data-testid="modal" />);
      
      const overlay = screen.getByTestId('modal-overlay');
      await user.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close when modal content is clicked', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      
      render(<Modal {...defaultProps} onClose={onClose} />);
      
      await user.click(screen.getByText('Modal content'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not close on overlay click when closeOnOverlayClick is false', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      
      render(
        <Modal 
          {...defaultProps} 
          onClose={onClose} 
          closeOnOverlayClick={false}
          data-testid="modal"
        />
      );
      
      const overlay = screen.getByTestId('modal-overlay');
      await user.click(overlay);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('hides close button when showCloseButton is false', () => {
      render(<Modal {...defaultProps} title="Test" showCloseButton={false} />);
      expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
    });

    it('renders custom close button content', () => {
      render(
        <Modal 
          {...defaultProps} 
          title="Test" 
          closeButtonContent={<span>Close</span>}
        />
      );
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('applies medium size by default', () => {
      render(<Modal {...defaultProps} data-testid="modal" />);
      expect(screen.getByTestId('modal')).toHaveClass('modal--medium');
    });

    it('applies small size', () => {
      render(<Modal {...defaultProps} size="small" data-testid="modal" />);
      expect(screen.getByTestId('modal')).toHaveClass('modal--small');
    });

    it('applies large size', () => {
      render(<Modal {...defaultProps} size="large" data-testid="modal" />);
      expect(screen.getByTestId('modal')).toHaveClass('modal--large');
    });

    it('applies fullscreen size', () => {
      render(<Modal {...defaultProps} size="fullscreen" data-testid="modal" />);
      expect(screen.getByTestId('modal')).toHaveClass('modal--fullscreen');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Modal {...defaultProps} className="custom-modal" data-testid="modal" />);
      expect(screen.getByTestId('modal')).toHaveClass('custom-modal');
    });

    it('applies custom overlay className', () => {
      render(
        <Modal 
          {...defaultProps} 
          overlayClassName="custom-overlay" 
          data-testid="modal"
        />
      );
      expect(screen.getByTestId('modal-overlay')).toHaveClass('custom-overlay');
    });
  });

  describe('Focus Management', () => {
    it('focuses first focusable element when opened', async () => {
      render(
        <Modal {...defaultProps}>
          <button>First button</button>
          <button>Second button</button>
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByText('First button')).toHaveFocus();
      });
    });

    it('traps focus within modal', async () => {
      const user = userEvent.setup();
      
      render(
        <Modal {...defaultProps} title="Test">
          <button>First button</button>
          <button>Second button</button>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close modal');
      const firstButton = screen.getByText('First button');
      const secondButton = screen.getByText('Second button');

      // Tab forward through elements
      await user.tab();
      expect(firstButton).toHaveFocus();

      await user.tab();
      expect(secondButton).toHaveFocus();

      await user.tab();
      expect(closeButton).toHaveFocus();

      // Tab should wrap to first element
      await user.tab();
      expect(firstButton).toHaveFocus();

      // Shift+Tab should go backwards
      await user.tab({ shift: true });
      expect(closeButton).toHaveFocus();
    });
  });

  describe('Event Handling', () => {
    it('handles keyboard events correctly', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      // Test various keys
      fireEvent.keyDown(document, { key: 'Enter' });
      expect(onClose).not.toHaveBeenCalled();

      fireEvent.keyDown(document, { key: 'Space' });
      expect(onClose).not.toHaveBeenCalled();

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('prevents event propagation on escape', () => {
      const onClose = jest.fn();
      const mockPreventDefault = jest.fn();
      
      render(<Modal {...defaultProps} onClose={onClose} />);

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      event.preventDefault = mockPreventDefault;
      
      document.dispatchEvent(event);
      
      expect(mockPreventDefault).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('Data Attributes', () => {
    it('applies data-testid', () => {
      render(<Modal {...defaultProps} data-testid="test-modal" />);
      expect(screen.getByTestId('test-modal')).toBeInTheDocument();
      expect(screen.getByTestId('test-modal-overlay')).toBeInTheDocument();
      expect(screen.getByTestId('test-modal-close')).toBeInTheDocument();
    });

    it('passes through additional props', () => {
      render(<Modal {...defaultProps} data-custom="value" data-testid="modal" />);
      expect(screen.getByTestId('modal')).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Animation', () => {
    it('applies animation duration', () => {
      render(
        <Modal 
          {...defaultProps} 
          animationDuration={300} 
          data-testid="modal"
        />
      );
      
      const overlay = screen.getByTestId('modal-overlay');
      expect(overlay).toHaveStyle('animation-duration: 300ms');
    });
  });
});