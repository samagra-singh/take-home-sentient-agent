'use client';

import { useEffect } from 'react';

import SentientIcon from '@/components/base/icons/sentient.svg';

export type NextError = Error & { digest?: string };

interface ErrorPageProps {
  error: NextError;
  reset: () => void;
  title?: string;
  description?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  error,
  reset,
  title,
  description,
}) => {
  useEffect(() => {
    console.error('An unexpected error occurred.', error);

    if (error.digest) {
      console.error('Error digest:', error.digest);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col items-center justify-center gap-6 max-w-md">
        <SentientIcon className="size-21 inline-block fill-red-200" />
        <div>
          <p className="text-2xl text-center font-bold mb-4">
            <span className="inline-block border-b-2 border-red-400 py-2 px-4">
              {title ||'Something went wrong'}
            </span>
          </p>
          <p className="text-lg text-center mb-2">
            Error: {error.message}
          </p>
          <p className="text-lg text-center mb-2">
            {description || 'We are unable to complete your request. Please try again in a few moments.'}
          </p>
        </div>
        {reset && (
          <>
            <button onClick={reset} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Try again
            </button>
            <p className="text-lg text-center">
              The above button can sometimes help.
            </p>
          </>
        )}
      </div>
    </div>);
};

export default ErrorPage;
