import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  describe('Basic Rendering', () => {
    it('renders with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders without children', () => {
      render(<Button aria-label="Icon button" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      expect(screen.getByText('Custom')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Button ref={ref}>Button</Button>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });
  });

  describe('Variants', () => {
    it('applies primary variant by default', () => {
      render(<Button>Primary</Button>);
      expect(screen.getByText('Primary')).toHaveClass('btn--primary');
    });

    it('applies secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByText('Secondary')).toHaveClass('btn--secondary');
    });

    it('applies success variant', () => {
      render(<Button variant="success">Success</Button>);
      expect(screen.getByText('Success')).toHaveClass('btn--success');
    });

    it('applies warning variant', () => {
      render(<Button variant="warning">Warning</Button>);
      expect(screen.getByText('Warning')).toHaveClass('btn--warning');
    });

    it('applies error variant', () => {
      render(<Button variant="error">Error</Button>);
      expect(screen.getByText('Error')).toHaveClass('btn--error');
    });

    it('applies info variant', () => {
      render(<Button variant="info">Info</Button>);
      expect(screen.getByText('Info')).toHaveClass('btn--info');
    });
  });

  describe('Sizes', () => {
    it('applies medium size by default', () => {
      render(<Button>Medium</Button>);
      expect(screen.getByText('Medium')).toHaveClass('btn--medium');
    });

    it('applies small size', () => {
      render(<Button size="small">Small</Button>);
      expect(screen.getByText('Small')).toHaveClass('btn--small');
    });

    it('applies large size', () => {
      render(<Button size="large">Large</Button>);
      expect(screen.getByText('Large')).toHaveClass('btn--large');
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByText('Disabled');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('btn--disabled');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('handles loading state', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('btn--loading');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('shows custom loading text', () => {
      render(<Button isLoading loadingText="Please wait...">Submit</Button>);
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('applies full width', () => {
      render(<Button fullWidth>Full Width</Button>);
      expect(screen.getByText('Full Width')).toHaveClass('btn--full-width');
    });

    it('applies minimal styling', () => {
      render(<Button minimal>Minimal</Button>);
      expect(screen.getByText('Minimal')).toHaveClass('btn--minimal');
    });
  });

  describe('Icons', () => {
    it('renders start icon', () => {
      const StartIcon = () => <span data-testid="start-icon">→</span>;
      render(<Button startIcon={<StartIcon />}>With Start Icon</Button>);
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('renders end icon', () => {
      const EndIcon = () => <span data-testid="end-icon">←</span>;
      render(<Button endIcon={<EndIcon />}>With End Icon</Button>);
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });

    it('renders both icons', () => {
      const StartIcon = () => <span data-testid="start-icon">→</span>;
      const EndIcon = () => <span data-testid="end-icon">←</span>;
      render(
        <Button startIcon={<StartIcon />} endIcon={<EndIcon />}>
          Both Icons
        </Button>
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      await user.click(screen.getByText('Disabled'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Button isLoading onClick={handleClick}>Loading</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles keyboard events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard</Button>);
      
      const button = screen.getByText('Keyboard');
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Button Types', () => {
    it('defaults to button type', () => {
      render(<Button>Default</Button>);
      expect(screen.getByText('Default')).toHaveAttribute('type', 'button');
    });

    it('applies submit type', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
    });

    it('applies reset type', () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByText('Reset')).toHaveAttribute('type', 'reset');
    });
  });

  describe('Accessibility', () => {
    it('applies aria-label', () => {
      render(<Button aria-label="Close dialog">×</Button>);
      expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
    });

    it('applies data-testid', () => {
      render(<Button data-testid="test-button">Test</Button>);
      expect(screen.getByTestId('test-button')).toBeInTheDocument();
    });

    it('maintains focus after click', async () => {
      const user = userEvent.setup();
      render(<Button>Focus me</Button>);
      
      const button = screen.getByText('Focus me');
      await user.click(button);
      expect(document.activeElement).toBe(button);
    });

    it('is focusable with keyboard', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Button>First</Button>
          <Button>Second</Button>
        </div>
      );
      
      await user.tab();
      expect(screen.getByText('First')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByText('Second')).toHaveFocus();
    });
  });

  describe('Loading State Animation', () => {
    it('shows spinner in loading state', () => {
      render(<Button isLoading>Loading</Button>);
      const spinner = document.querySelector('.btn__spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('hides content when loading', () => {
      render(<Button isLoading>Submit Form</Button>);
      expect(screen.queryByText('Submit Form')).not.toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('passes through additional props', () => {
      render(<Button title="Tooltip text">Button</Button>);
      expect(screen.getByText('Button')).toHaveAttribute('title', 'Tooltip text');
    });

    it('handles form attributes', () => {
      render(<Button form="my-form" formAction="/submit">Submit</Button>);
      const button = screen.getByText('Submit');
      expect(button).toHaveAttribute('form', 'my-form');
      expect(button).toHaveAttribute('formAction', '/submit');
    });
  });
});