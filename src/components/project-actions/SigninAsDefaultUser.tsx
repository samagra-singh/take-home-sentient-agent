'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { type Id as ToastID, toast } from 'react-toastify';

import { signinAsDefaultUser } from '@/actions/users';
import useServerAction from '@/hooks/use-server-action';
import { ToastConfigs } from '@/utils/constants/global';

interface SigninAsDefaultUserProps {
  redirectUrl: string;
}

const SigninAsDefaultUser: React.FC<SigninAsDefaultUserProps> = ({ redirectUrl }) => {
  const toastIDRef = useRef<ToastID | null>(null);
  const router = useRouter();

  const {
    action: executeSigninAction,
    loading: isSigninLoading,
    response: signInResponse,
  } = useServerAction(signinAsDefaultUser, null);

  // Dismiss toast on unmount
  useEffect(() => {
    return () => {
      if (toastIDRef.current) {
        toast.dismiss(toastIDRef.current);
      }
    };
  }, []);

  const handleResetClick = () => {
    toastIDRef.current = toast.loading('Signing in as default user ...');
    executeSigninAction();
    // [TEMP]
    // router.push(redirectUrl);
  };

  // Update toast content when loading state resolves
  useEffect(() => {
    if (toastIDRef.current && !isSigninLoading && signInResponse) {
      if (signInResponse.error !== null) {
        toast.update(toastIDRef.current, {
          render: signInResponse.error.message,
          type: 'error',
          isLoading: false,
          ...ToastConfigs,
        });
      } else {
        toast.update(toastIDRef.current, {
          render: 'Signed in as default user successful.',
          type: 'success',
          isLoading: false,
          ...ToastConfigs,
        });

        router.push(redirectUrl);
      }
      toastIDRef.current = null;
    }
  }, [isSigninLoading, signInResponse, redirectUrl, router]);

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200 text-base"
        type="button"
        onClick={handleResetClick}
        disabled={isSigninLoading}
      >
        {isSigninLoading ? 'Signing in ...' : 'Sign in as default user'}
      </button>
    </div>
  );
};

export default SigninAsDefaultUser;
