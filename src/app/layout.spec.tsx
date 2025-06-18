import { render, screen } from '@testing-library/react';

import RootLayout, { metadata } from './layout';

// Mock the Inter font
jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({
    className: 'mocked-inter-font',
    style: { fontFamily: 'Inter' },
  })),
}));

// Mock clsx
jest.mock('clsx', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const testContent = <div data-testid="test-child">Test Content</div>;
    render(<RootLayout>{testContent}</RootLayout>);
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toHaveTextContent('Test Content');
  });

  it('renders multiple children correctly', () => {
    render(
      <RootLayout>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </RootLayout>,
    );
    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
    expect(screen.getByText('Third Child')).toBeInTheDocument();
  });

  it('renders complex nested children correctly', () => {
    const complexChild = (
      <div>
        <header>
          <h1>Header</h1>
        </header>
        <main>
          <p>Main content</p>
        </main>
        <footer>
          <p>Footer</p>
        </footer>
      </div>
    );
    render(<RootLayout>{complexChild}</RootLayout>);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders with string children', () => {
    render(<RootLayout>Simple string content</RootLayout>);
    expect(screen.getByText('Simple string content')).toBeInTheDocument();
  });

  it('renders with number children', () => {
    render(<RootLayout>{42}</RootLayout>);
    expect(screen.getByText('42')).toBeInTheDocument();
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
