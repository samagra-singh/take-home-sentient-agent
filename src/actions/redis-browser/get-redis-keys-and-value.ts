'use server';

import { getClient } from '@/actions/utils/redis';

import { type GetRedisDataResponse } from './redis-browser.types';

const getRedisKeysAndValue = async (selectedKey?: string): Promise<GetRedisDataResponse> => {
  const response: GetRedisDataResponse = {
    error: null,
  };

  try {
    const redisClient = await getClient();
    if (redisClient === null) {
      throw new Error('Redis client is not connected.');
    }

    const keys = await redisClient.keys('*');
    keys.sort(); // Sort keys for consistent display

    let value: string | null = null;
    let badSelectedKey = false;
    const currentSelectedKey: string | null = selectedKey || keys[0];

    if (currentSelectedKey) {
      const keyType = await redisClient.type(currentSelectedKey);
      try {
        if (keyType === 'ReJSON-RL') {
          const jsonValue = await redisClient.json.get(currentSelectedKey);
          if (jsonValue === null) {
            throw new Error(`Error getting JSON value for key "${currentSelectedKey}".`);
          }
          value = JSON.stringify(jsonValue, null, 2); // Pretty print JSON
        } else if (keyType === 'string') {
          value = await redisClient.get(currentSelectedKey);
        } else if (keyType === 'none') {
          badSelectedKey = true;
        } else {
          // Fallback for all other types
          console.warn(`Unknown key type. Key "${currentSelectedKey}" is of type "${keyType}".`);
          value = await redisClient.get(currentSelectedKey);
        }

        value = `[${keyType}]\n\n${value}`;
      } catch (error){
        console.error(`Error fetching value for key "${currentSelectedKey}". Key type: "${keyType}".`, error);
        throw new Error(`Error fetching value for key "${currentSelectedKey}".`);
      }
    }

    response.badSelectedKey = badSelectedKey;
    response.redisData = {
      keys,
      // To be set only when key is auto-selected.
      selectedKey: selectedKey ? null : currentSelectedKey,
      value,
    };
  } catch (error) {
    console.error('Error getting Redis data.', error);
    response.error = new Error('Error getting Redis data.');
  }

  console.info('getRedisKeysAndValue', 'response', response, 'input', { selectedKey });
  return response;
};

export default getRedisKeysAndValue;
