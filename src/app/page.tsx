import React from 'react';
import type { Metadata } from 'next';
import { TooltipIds } from '@/utils/constants/global';
import ExternalLinkIcon from '@/components/icons/external-link.svg';
import MailIcon from '@/components/icons/mail.svg';
import type { ProjectInfoAPIResponse } from '@/app/api/project-info/route';

export const metadata: Metadata = {
  title: 'Sentient Agent',
  description:
    'A basic AI chat agent built with Next.js and mock API routes (Take home assignment for Sentient Foundation)',
};

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  let data: ProjectInfoAPIResponse | null = null;
  let error: string | null = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/project-info`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! Status: ${response.status}`,
      );
    }

    data = await response.json();
  } catch (err) {
    console.error('Server-side fetch for /api/project-info failed:', err);
    error = (err as Error).message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-200">
        {error && (
          <div className="text-red-600">
            <h2 className="font-bold text-xl mb-2">Error:</h2>
            <p>{error}</p>
            <p className="text-sm mt-2">
              Please check your `package.json` file or the `/api/project-info`
              route for issues. Ensure `NEXT_PUBLIC_BASE_URL` is correctly set
              in your `.env` for production, or remove it if running locally
              without one.
            </p>
          </div>
        )}

        {data && (
          <>
            {/* Project Name and Version */}
            <h1 className="text-3xl font-extrabold pb-3 mb-4 border-b-2 border-gray-300">
              {data.name}{' '}
              <span className="font-mono text-xl text-teal-600">
                v{data.version}
              </span>
            </h1>

            {/* Author Information */}
            {data.author && (
              <p className="text-xl text-gray-700 mb-2 flex items-center justify-center gap-2">
                By{' '}
                <span className="font-semibold text-gray-800">
                  {data.author.name}
                </span>
                {data.author.email && (
                    <a
                      href={`mailto:${data.author.email}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      aria-label={`Send email to ${data.author.name}`}
                      data-tooltip-id={TooltipIds.CLICKABLE_NO_FOCUS}
                      data-tooltip-content={`Send email to ${data.author.name}`}
                    >
                      <MailIcon className="w-6 h-6 inline-block" />
                    </a>
                )}
              </p>
            )}

            {/* Project Description */}
            {data.description && (
              <p className="text-gray-600 mb-4 italic">{data.description}</p>
            )}

            {/* Repository Link */}
            {data.homepage && (
              <div className="mt-4">
                  <a
                    href={data.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200 text-base"
                    aria-label="View repository in a new tab"
                    data-tooltip-id={TooltipIds.CLICKABLE_NO_FOCUS}
                    data-tooltip-content="View repository in a new tab"
                  >
                    View Repository
                    <ExternalLinkIcon className="w-5 h-5 ml-2" />
                  </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
