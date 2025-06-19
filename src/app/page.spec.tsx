import { render, screen } from '@testing-library/react';
import HomePage from './page';

// Define the interfaces locally to match what the component expects
interface AuthorObject {
  name: string;
  email?: string;
  url?: string;
}

interface RepositoryObject {
  type: string;
  url: string;
}

interface ProjectInfoAPIResponse {
  name: string;
  version: string;
  description?: string;
  repository?: RepositoryObject;
  homepage?: string;
  author?: AuthorObject;
  license?: string;
}

// Mock the environment variable
const originalEnv = process.env;
const originalFetch = global.fetch;

describe('HomePage', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  const mockProjectInfo: ProjectInfoAPIResponse = {
    name: 'Test Project',
    version: '1.0.0',
    description: 'A test project for unit testing',
    author: {
      name: 'Test Author',
      email: 'test@example.com',
    },
    repository: {
      type: 'git',
      url: 'https://github.com/test/test-repo',
    },
    homepage: 'https://test-project.com',
  };

  it('renders project information when API call succeeds', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjectInfo,
    });
    render(await HomePage());
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    expect(screen.getByText('A test project for unit testing')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('View Repository')).toBeInTheDocument();
    // Check that the repository link uses homepage URL
    const repositoryLink = screen.getByRole('link', { name: /view repository/i });
    expect(repositoryLink).toHaveAttribute('href', 'https://test-project.com');
  });

  it('renders error state when API call fails', async () => {
    // Suppress expected console errors
    const originalConsoleError = console.error;
    console.error = jest.fn();
    const errorMessage = 'Failed to fetch project info';

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: errorMessage }),
    });

    render(await HomePage());
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenLastCalledWith('Server-side fetch for /api/project-info failed:', new Error(errorMessage));

    console.error = originalConsoleError;
  });

  it('renders error state when fetch throws an exception', async () => {
    // Suppress expected console errors
    const originalConsoleError = console.error;
    console.error = jest.fn();
    const errorMessage = 'Network error';

    global.fetch = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    render(await HomePage());
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenLastCalledWith('Server-side fetch for /api/project-info failed:', new Error(errorMessage));

    console.error = originalConsoleError;
  });

  it('renders without author information when not provided', async () => {
    const projectInfoWithoutAuthor = { ...mockProjectInfo };
    delete projectInfoWithoutAuthor.author;
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => projectInfoWithoutAuthor,
    });
    render(await HomePage());
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.queryByText('By')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Author')).not.toBeInTheDocument();
  });

  it('renders without description when not provided', async () => {
    const projectInfoWithoutDescription = { ...mockProjectInfo };
    delete projectInfoWithoutDescription.description;
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => projectInfoWithoutDescription,
    });
    render(await HomePage());
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.queryByText('A test project for unit testing')).not.toBeInTheDocument();
  });

  it('renders without repository link when homepage is not provided', async () => {
    const projectInfoWithoutHomepage = { ...mockProjectInfo };
    delete projectInfoWithoutHomepage.homepage;
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => projectInfoWithoutHomepage,
    });
    render(await HomePage());
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.queryByText('View Repository')).not.toBeInTheDocument();
  });

  it('renders email icon when author email is provided', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjectInfo,
    });
    render(await HomePage());
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    // Check that the email link exists with the correct href
    const emailLink = screen.getByRole('link', { name: /send email to test author/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
  });

  it('renders external link icon in repository button', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjectInfo,
    });
    render(await HomePage());
    expect(screen.getByText('View Repository')).toBeInTheDocument();
    // Check that the repository link exists with the correct attributes
    const repositoryLink = screen.getByRole('link', { name: /view repository/i });
    expect(repositoryLink).toHaveAttribute('href', 'https://test-project.com');
    expect(repositoryLink).toHaveAttribute('target', '_blank');
    expect(repositoryLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
