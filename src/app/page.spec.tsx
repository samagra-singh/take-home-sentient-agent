import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './page';

let mockFetch: jest.Mock;

describe('HomePage', () => {
  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without error', async () => {
    // Mock successful fetch response
    const mockProjectInfoData = {
      name: 'Test Project',
      version: '1.0.0',
      description: 'Test description',
      author: {
        name: 'Test Author',
        email: 'test@example.com',
      },
      homepage: 'https://example.com',
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjectInfoData,
    });

    render(await HomePage());

    // Wait for the component to finish loading and render
    await waitFor(() => {
      expect(screen.getByText(mockProjectInfoData.name)).toBeInTheDocument();
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('/api/project-info');
  });
});
