import { type Metadata } from 'next';
import Link from 'next/link';

import SentientIcon from '@/components/base/icons/sentient.svg';

export const notFoundPageMetadata: Metadata = {
  title: 'Resource not found | Sentient Agent',
  description: 'The requested resource was not found. It may have been deleted or moved to a different location.',
};

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col items-center justify-center gap-6 max-w-md">
        <SentientIcon className="size-21 inline-block fill-current" />
        <div>
          <p className="text-2xl text-center font-bold mb-4">
            <span className="inline-block border-b-2 border-gray-300 py-2 px-4">
              Lost in the digital ether
            </span>
          </p>
          <p className="text-lg text-center pt-2">
          Oops !! Looks like this page either never existed or has vanished into the digital unknown.
          </p>
        </div>
        <Link href="/" className="font-bold text-blue-500 hover:text-blue-600 rounded-md hover:bg-blue-100 py-2 px-4">
          Go to home
        </Link>
      </div>
    </div>);
};

export default NotFoundPage;
