'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { type Id as ToastID, toast } from 'react-toastify';

import { signOut } from '@/actions/users';
import useServerAction from '@/hooks/use-server-action';
import { signInPagePathName, ToastConfigs } from '@/utils/constants/global';

const SignOut: React.FC<Record<string, never>> = () => {
  const toastIDRef = useRef<ToastID | null>(null);
  const router = useRouter();

  const {
    action: executeSignOutAction,
    loading: isSignOutLoading,
    response: signOutResponse,
  } = useServerAction(signOut, null);

  // Dismiss toast on unmount
  useEffect(() => {
    return () => {
      if (toastIDRef.current) {
        toast.dismiss(toastIDRef.current);
      }
      if (signOutResponse?.success) {
        router.push(signInPagePathName);
      }
    };
  }, [signOutResponse, router]);

  const handleResetClick = () => {
    toastIDRef.current = toast.loading('Signing out ...');
    executeSignOutAction();
  };

  // Update toast content when loading state resolves
  useEffect(() => {
    if (toastIDRef.current && !isSignOutLoading && signOutResponse) {
      if (signOutResponse.error !== null) {
        toast.update(toastIDRef.current, {
          render: signOutResponse.error.message,
          type: 'error',
          isLoading: false,
          ...ToastConfigs,
        });
        toastIDRef.current = null;
      }
    }
  }, [isSignOutLoading, signOutResponse]);

  return (
    <div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-400 transition-colors duration-200 text-base"
        type="button"
        onClick={handleResetClick}
        disabled={isSignOutLoading}
      >
        {isSignOutLoading ? 'Signing out ...' : 'Sign out'}
      </button>
    </div>
  );
};

export default SignOut;
