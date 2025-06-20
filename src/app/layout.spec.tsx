import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

describe('RootLayout', () => {
  it('renders without error', () => {
    // Suppress known console errors
    const originalConsoleError = console.error;
    const mockConsoleError = jest.fn();
    console.error = mockConsoleError;

    render(
      <RootLayout>
        <p>Test content</p>
      </RootLayout>,
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();

    expect(mockConsoleError).toHaveBeenCalledTimes(1);
    expect(mockConsoleError).toHaveBeenCalledWith(
      'In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s',
      '<html>',
      'div',
      '',
      '',
    );

    console.error = originalConsoleError;
  });
});
