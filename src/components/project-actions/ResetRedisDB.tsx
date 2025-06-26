'use client';

import { useEffect, useRef } from 'react';
import { type Id as ToastID, toast } from 'react-toastify';

import { resetRedisDB } from '@/actions/reset-redis-db';
import useServerAction from '@/hooks/use-server-action';
import { ToastConfigs } from '@/utils/constants/global';

const ResetRedisDB: React.FC<Record<string, never>> = () => {
  const toastIDRef = useRef<ToastID | null>(null);

  const {
    action: executeResetAction,
    loading: isResetRedisDBLoading,
    response: resetRedisDBResponse,
  } = useServerAction(resetRedisDB, null);

  // Dismiss toast on unmount
  useEffect(() => {
    return () => {
      if (toastIDRef.current) {
        toast.dismiss(toastIDRef.current);
      }
    };
  }, []);

  const handleResetClick = () => {
    toastIDRef.current = toast.loading('Resetting Redis database ...');
    executeResetAction();
  };

  // Update toast content when loading state resolves
  useEffect(() => {
    if (toastIDRef.current && !isResetRedisDBLoading && resetRedisDBResponse) {
      if (resetRedisDBResponse.error !== null) {
        toast.update(toastIDRef.current, {
          render: resetRedisDBResponse.error.message,
          type: 'error',
          isLoading: false,
          ...ToastConfigs,
        });
      } else {
        toast.update(toastIDRef.current, {
          render: 'Redis database reset successfully.',
          type: 'success',
          isLoading: false,
          ...ToastConfigs,
        });
      }
      toastIDRef.current = null;
    }
  }, [isResetRedisDBLoading, resetRedisDBResponse]);

  return (
    <div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-colors duration-200 text-base"
        type="button"
        onClick={handleResetClick}
        disabled={isResetRedisDBLoading}
      >
        {isResetRedisDBLoading ? 'Resetting ...' : 'Reset Redis DB'}
      </button>
    </div>
  );
};

export default ResetRedisDB;
