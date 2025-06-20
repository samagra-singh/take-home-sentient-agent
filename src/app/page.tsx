import type { Metadata } from 'next';
import React from 'react';

import type { GetProjectInfoResponse } from '@/actions/getProjectInfo';
import { getProjectInfo } from '@/actions/getProjectInfo';
import ExternalLinkIcon from '@/components/icons/external-link.svg';
import MailIcon from '@/components/icons/mail.svg';
import { TooltipIds } from '@/utils/constants/global';

export const metadata: Metadata = {
  title: 'Sentient Agent',
  description:
    'A basic AI chat agent built with Next.js and mock API routes (Take home assignment for Sentient Foundation)',
};

const HomePage = async () => {
  let data: GetProjectInfoResponse | null = null;
  let error: string | null = null;

  try {
    data = await getProjectInfo();
  } catch (err) {
    console.error('Server action `getProjectInfo` failed:', err);
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
              Please check your `package.json` file for issues.
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
              <p className="text-xl text-gray-700 mb-2">
                By{' '}
                <span className="font-semibold text-gray-800">
                  {data.author.name}
                </span>{' '}
                {data.author.email && (
                    <a
                      href={`mailto:${data.author.email}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      aria-label={`Send email to ${data.author.name}`}
                      data-tooltip-id={TooltipIds.CLICKABLE_NO_FOCUS}
                      data-tooltip-content={`Send email to ${data.author.name}`}
                    >
                      <MailIcon className="w-6 h-6 inline-block fill-current" />
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
                    data-tooltip-content="View repository <br />(in a new tab)"
                  >
                    View Repository
                    <ExternalLinkIcon className="w-5 h-5 ml-2 stroke-current" />
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
