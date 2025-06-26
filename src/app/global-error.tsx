'use client';

import { ErrorPage, type NextError } from '@/components/common/util-pages';

const GlobalError: React.FC<{ error: NextError; reset: () => void }> = ({ error, reset }) => {
  return (
    <html lang="en">
      <body>
        <ErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
};

export default GlobalError;
