import { type Metadata } from 'next';

import { SigninAsDefaultUser } from '@/components/project-actions';
import { homePagePathName, redirectUrlParamName } from '@/utils/constants/global';

export const metadata: Metadata = {
  title: 'Signin | Sentient Agent',
};

const SigninPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [redirectUrlParamName]?: string;
  }>;
}) => {
  const {
    [redirectUrlParamName]: redirectUrl,
  } = await searchParams;

  return (
    <div className="w-screen h-screen flex items-center justify-center p-8">
      <div className="w-[80%] max-w-sm flex flex-col items-center justify-center bg-gray-50 shadow-md rounded-2xl px-4 py-12 gap-4">
        <p>Please sign in to continue.</p>
        <SigninAsDefaultUser redirectUrl={redirectUrl || homePagePathName} />
      </div>
    </div>
  );
};

export default SigninPage;
