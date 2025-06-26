import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

import { getRedisKeysAndValue } from '@/actions/redis-browser';

import RedisBrowserClient from './RedisBrowserClient';

export const metadata: Metadata = {
  title: 'Redis Browser | Sentient Agent',
};

// Data needs to be fresh.
export const dynamic = 'force-dynamic';

const RedisBrowserPage = async (
  { params }: { params: Promise<{ redisKey?: string[] }> },
) => {
  const { redisKey: redisKeyParam } = await params;
  const redisKey = redisKeyParam ? redisKeyParam[0] : undefined;
  const {
    error,
    badSelectedKey,
    redisData,
  } = await getRedisKeysAndValue(redisKey);

  if (error || !redisData) {
    return (
      <div className="flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error:</strong>{' '}
          <span className="block sm:inline">{error ? error.message : 'Unknown error'}</span>
          <p className="mt-2 text-sm">
            Please ensure your Redis server is running and accessible from the environment where this application is deployed.
          </p>
        </div>
      </div>
    );
  }

  if (redisKey === undefined) {
    redirect(`/redis-browser/${redisData.selectedKey}`);
  }

  return (
    <RedisBrowserClient
      initialKeys={redisData.keys}
      initialSelectedKey={redisData.selectedKey || redisKey}
      initialValue={redisData.value}
      initialBadSelectedKey={badSelectedKey || false}
    />
  );
};

export default RedisBrowserPage;
