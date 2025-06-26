'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo,useState } from 'react';

import { getRedisKeysAndValue } from '@/actions/redis-browser';
import useServerAction from '@/hooks/use-server-action';

interface RedisBrowserClientProps {
  initialKeys: string[];
  initialSelectedKey: null | string;
  initialValue: null | string;
  initialBadSelectedKey: boolean;
}

const RedisBrowserClient: React.FC<RedisBrowserClientProps> = ({
  initialKeys,
  initialSelectedKey,
  initialValue,
  initialBadSelectedKey,
}) => {
  const router = useRouter();

  const [selectedKey, setSelectedKey] = useState<string | null>(initialSelectedKey);
  const [keyContent, setKeyContent] = useState<string | null>(initialValue);
  const [keys, setKeys] = useState<string[]>(initialKeys);
  const [badSelectedKey, setBadSelectedKey] = useState<boolean>(initialBadSelectedKey);

  const {
    action: executeFetchKeyAction,
    loading: isFetchingKeyLoading,
    response: fetchKeyResponse,
  } = useServerAction(
    getRedisKeysAndValue,
    {
      error: null,
      badSelectedKey: initialBadSelectedKey,
      redisData: {
        keys: initialKeys,
        selectedKey: initialSelectedKey,
        value: initialValue,
      },
    },
  );

  // Handle response from the server action (when a key is selected or initial load)
  useEffect(() => {
    if (!isFetchingKeyLoading && fetchKeyResponse) {
      if (fetchKeyResponse.error || !fetchKeyResponse.redisData) {
        setKeyContent(`Error: ${fetchKeyResponse.error?.message || 'Unknown error'}`);
      } else {
        setKeys(fetchKeyResponse.redisData.keys);
        setKeyContent(fetchKeyResponse.redisData.value || 'Error getting value for this key.');
        setBadSelectedKey(fetchKeyResponse.badSelectedKey || false);
      }
    }
  }, [fetchKeyResponse, isFetchingKeyLoading, selectedKey]);

  const handleKeySelect = (key: string) => {
    if (key !== selectedKey) {
      setSelectedKey(key);
      setKeyContent(null); // Clear content while loading
      setBadSelectedKey(false);
      router.push(`/redis-browser/${key}`);
      // Needed to show loading state.
      // [TODO] Explore options to update path in the browser while server action is running.
      executeFetchKeyAction(key); // Trigger server action
    }
  };

  // Memoize line-numbered content for performance
  const numberedContent = useMemo(() => {
    if (!keyContent) {
      return '';
    }
    return keyContent.split('\n').map((line, index) => (
      <span key={index} className="flex">
        <span className="text-gray-500 w-8 flex-shrink-0 text-right pr-2 select-none">
          {String(index + 1).padStart(3, ' ')}
        </span>
        <span className="flex-grow">{line}</span>
      </span>
    ));
  }, [keyContent]);

  return (
    <div className="flex flex-col tablet:flex-row bg-gray-50 text-gray-900">
      {/* Mobile Dropdown (visible on smaller screens) */}
      <div className="tablet:hidden p-4 border-b border-gray-200">
        <select
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          value={selectedKey || ''}
          onChange={(e) => handleKeySelect(e.target.value)}
        >
          <option value="" disabled>Select a Redis Key</option>
          {keys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {/* Sidebar (visible on large screens and up) */}
      <div className="hidden tablet:block w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto flex-shrink-0 shadow-md">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300">Redis Keys</h2>
        <ul className="space-y-1">
          {keys.length === 0 && <li className="text-gray-600">No keys found.</li>}
          {keys.map((key) => (
            <li key={key}>
              <button
                type="button"
                className={`w-full text-left p-2 rounded-md transition-colors duration-150 ${
                  selectedKey === key
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => handleKeySelect(key)}
                disabled={isFetchingKeyLoading}
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-4 tablet:p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          Key: <span className="text-blue-700">{selectedKey || 'None Selected'}</span>
        </h1>

        {isFetchingKeyLoading && (
          <div className="text-gray-600">Loading key content...</div>
        )}

        {!isFetchingKeyLoading && (
          <div className="bg-gray-800 text-gray-200 p-4 rounded-lg shadow-inner overflow-x-auto text-sm font-mono whitespace-pre">
            {badSelectedKey ? (
              <span className="text-gray-400">Key does not exist in Redis DB.</span>
            ) : keyContent !== null ? (
              numberedContent
            ) :  (
              <span className="text-gray-400">Select a key to view its content.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RedisBrowserClient;
