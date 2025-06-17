import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: 'Modal content',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('renders modal content when open', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders with title when provided', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('renders without title when not provided', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.queryByText('modal-title')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-labelledby');
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEscape is false', () => {
    render(<Modal {...defaultProps} closeOnEscape={false} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when overlay is clicked', () => {
    render(<Modal {...defaultProps} />);
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when modal content is clicked', () => {
    render(<Modal {...defaultProps} />);
    const content = screen.getByText('Modal content');
    fireEvent.click(content);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Modal {...defaultProps} className="custom-modal" />);
    expect(document.querySelector('.modal')).toHaveClass('custom-modal');
  });

  it('applies custom overlayClassName', () => {
    render(<Modal {...defaultProps} overlayClassName="custom-overlay" />);
    expect(screen.getByRole('dialog')).toHaveClass('custom-overlay');
  });

  it('sets body overflow to hidden when open', () => {
    const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);
    expect(document.body.style.overflow).toBe('');

    rerender(<Modal {...defaultProps} isOpen={true} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow when closed', () => {
    const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<Modal {...defaultProps} isOpen={false} />);
    expect(document.body.style.overflow).toBe('');
  });

  it('focuses first focusable element when opened', async () => {
    render(
      <Modal {...defaultProps}>
        <button>First button</button>
        <button>Second button</button>
      </Modal>
    );

    await waitFor(() => {
      const firstButton = screen.getByText('First button');
      expect(document.activeElement).toBe(firstButton);
    });
  });

  it('renders in a portal', () => {
    render(<Modal {...defaultProps} />);
    const modal = screen.getByRole('dialog');
    expect(modal.parentElement).toBe(document.body);
  });

  it('has proper ARIA attributes', () => {
    render(<Modal {...defaultProps} title="Accessible Modal" />);
    const dialog = screen.getByRole('dialog');
    
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('handles multiple modals with separate onClose handlers', () => {
    const onClose1 = jest.fn();
    const onClose2 = jest.fn();

    const { rerender } = render(
      <>
        <Modal isOpen={true} onClose={onClose1}>Modal 1</Modal>
        <Modal isOpen={true} onClose={onClose2}>Modal 2</Modal>
      </>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onClose1).toHaveBeenCalled();
    expect(onClose2).toHaveBeenCalled();
  });
});