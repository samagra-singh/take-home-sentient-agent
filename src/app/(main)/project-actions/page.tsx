import { type Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import { getProjectInfo } from '@/actions/project-info';
import { getCurrentUser } from '@/actions/users';
import Button from '@/components/base/button';
import ExternalLinkIcon from '@/components/base/icons/external-link.svg';
import MailIcon from '@/components/base/icons/mail.svg';
import { ResetRedisDB, SignOut } from '@/components/project-actions';
import { TooltipIds } from '@/utils/constants/global';

export const metadata: Metadata = {
  title: 'Home - New conversation | Sentient Agent',
};

/**
 * Rendering home page requires validating user through cookies.
 * So, the page must be dynamic.
 */
export const dynamic = 'force-dynamic';

const HomePage = async () => {
  // [TODO] Simpler error handling would be conditional. Review layout to implement that once we start work on the core app.
  const userData = await getCurrentUser();
  const projectInfoData = await getProjectInfo();

  if (userData.error) {
    throw userData.error;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-200">

        {/* Current User */}
        {userData.user && (
          <>
            {projectInfoData.error && (
              <div className="text-red-600">
                <h2 className="font-bold text-xl mb-2">Error:</h2>
                <p>{projectInfoData.error.message}</p>
              </div>
            )}
            {projectInfoData.projectInfo && (
              <>
                {/* Current User */}
                <p className="text-gray-600 mb-4 italic border-b-2 border-gray-300 pb-3">
                  Current User: {userData.user.name}, ID: {userData.user.id}, Email: {userData.user.email}
                </p>

                {/* Project Name and Version */}
                <h1 className="text-3xl font-extrabold pb-3 mb-4 border-b-2 border-gray-300">
                  {projectInfoData.projectInfo.name}{' '}
                  <span className="font-mono text-xl text-teal-600">
                    v{projectInfoData.projectInfo.version}
                  </span>
                </h1>

                {/* Author Information */}
                {projectInfoData.projectInfo.author && (
                  <p className="text-xl text-gray-700 mb-2">
                    By{' '}
                    <span className="font-semibold text-gray-800">
                      {projectInfoData.projectInfo.author.name}
                    </span>{' '}
                    {projectInfoData.projectInfo.author.email && (
                      <a
                        href={`mailto:${projectInfoData.projectInfo.author.email}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        aria-label={`Send email to ${projectInfoData.projectInfo.author.name}`}
                        data-tooltip-id={TooltipIds.CLICKABLE_NO_FOCUS}
                        data-tooltip-content={`Send email to ${projectInfoData.projectInfo.author.name}`}
                      >
                        <MailIcon className="size-6 inline-block fill-current" />
                      </a>
                    )}{' '}
                    {projectInfoData.projectInfo.author.url && (
                      <a
                        href={projectInfoData.projectInfo.author.url}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        aria-label={`Learn more about ${projectInfoData.projectInfo.author.name} (in a new tab)`}
                        data-tooltip-id={TooltipIds.CLICKABLE_NO_FOCUS}
                        data-tooltip-content={`Learn more about ${projectInfoData.projectInfo.author.name} (in a new tab)`}
                      >
                        <ExternalLinkIcon className="size-6 inline-block stroke-current" />
                      </a>
                    )}
                  </p>
                )}

                {/* Project Description */}
                {projectInfoData.projectInfo.description && (
                  <p className="text-gray-600 mb-4 italic">{projectInfoData.projectInfo.description}</p>
                )}

                {/* Project Homepage */}
                {projectInfoData.projectInfo.homepage && (
                  <div className="mt-4">
                    <a
                      href={projectInfoData.projectInfo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200 text-base"
                      aria-label="Open project homepage (in a new tab)"
                      data-tooltip-id={TooltipIds.CLICKABLE_NO_FOCUS}
                      data-tooltip-content="Open project homepage (in a new tab)"
                    >
                        View project
                      <ExternalLinkIcon className="w-5 h-5 ml-2 stroke-current" />
                    </a>
                  </div>
                )}

                {/* Link to Redis Browser */}
                <Link href="/redis-browser">
                  <Button
                    label="Redis Browser"
                    className="mt-4 px-4 py-2 bg-orange-200 text-orange-800 font-semibold rounded-md shadow-md hover:bg-orange-300 transition-colors duration-200 text-base"
                  >
                    Redis Browser
                  </Button>
                </Link>

                {/* Reset Redis DB */}
                <ResetRedisDB />

                {/* Sign Out */}
                <SignOut />
                {/* [TEMP] */}
                <div className="h-screen" />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
