'use client';

import { ErrorPage, type NextError } from '@/components/common/util-pages';

const GlobalError: React.FC<{ error: NextError; reset: () => void }> = ({ error, reset }) => {
  return (
    <ErrorPage error={error} reset={reset} />
  );
};

export default GlobalError;
