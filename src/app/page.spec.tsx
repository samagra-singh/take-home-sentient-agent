import { render, screen, waitFor } from '@testing-library/react';

import HomePage from './page';

// Mock the server action
jest.mock('@/actions/getProjectInfo', () => ({
  getProjectInfo: jest.fn(),
}));

import { getProjectInfo } from '@/actions/getProjectInfo';

const mockGetProjectInfo = getProjectInfo as jest.MockedFunction<typeof getProjectInfo>;

describe('HomePage', () => {
  beforeEach(() => {
    mockGetProjectInfo.mockClear();
  });

  it('renders without error', async () => {
    // Mock successful server action response
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
    mockGetProjectInfo.mockResolvedValueOnce(mockProjectInfoData);

    render(await HomePage());

    // Wait for the component to finish loading and render
    await waitFor(() => {
      expect(screen.getByText(mockProjectInfoData.name)).toBeInTheDocument();
    });
    expect(mockGetProjectInfo).toHaveBeenCalledTimes(1);
  });
});
