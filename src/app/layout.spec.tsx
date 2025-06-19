import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from './layout';

describe('RootLayout', () => {
  it('renders children correctly', () => {
    // Suppress expected console errors
    const originalConsoleError = console.error;
    console.error = jest.fn();

    render(<RootLayout><div data-testid="test-child">Test Content</div></RootLayout>);
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toHaveTextContent('Test Content');

    // Note: Jest/React will suppress same errors from more tests in the same file.
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenLastCalledWith(
      'In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s',
      '<html>',
      'div',
      '',
      '',
    );

    console.error = originalConsoleError;
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Sentient Agent');
  });

  it('has correct description', () => {
    expect(metadata.description).toBe(
      'A basic AI chat agent built with Next.js and mock API routes (Take home assignment for Sentient Foundation)',
    );
  });

  it('is a valid metadata object', () => {
    expect(metadata).toHaveProperty('title');
    expect(metadata).toHaveProperty('description');
    expect(typeof metadata.title).toBe('string');
    expect(typeof metadata.description).toBe('string');
  });
});
