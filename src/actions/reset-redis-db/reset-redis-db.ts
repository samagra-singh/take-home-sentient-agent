'use server';

import { defaultUser } from '@/utils/constants/global';

import { getClient } from '../utils/redis';
import { type ResetRedisDbResponse } from './reset-redis-db.types';

const resetRedisDB = async (): Promise<ResetRedisDbResponse> => {
  const response: ResetRedisDbResponse = {
    error: null,
  };

  try {
    const redisClient = await getClient();
    if (redisClient === null) {
      throw new Error('Redis client is not connected.');
    }

    const keysBeforeReset = await redisClient.keys('*');
    await redisClient.flushAll();
    response.resetResult = {
      success: true,
      keysBeforeReset,
    };

    // Initialize users array
    const usersInitStatus = await redisClient.json.set('users', '$', [
      {
        ...defaultUser,
      },
    ]);
    if (usersInitStatus !== 'OK') {
      throw new Error(`Failed to initialize users. Response: ${usersInitStatus}`);
    }

    const userConversationsInitStatus = await redisClient.json.set(defaultUser.id, '$', {
      conversations: [],
    });
    if (userConversationsInitStatus !== 'OK') {
      throw new Error(`Failed to initialize user conversations. Response: ${userConversationsInitStatus}`);
    }

    response.initResult = {
      success: true,
      keysAfterReset: await redisClient.keys('*'),
    };
  } catch (error) {
    console.error('Error resetting Redis DB.', error);
    response.error = new Error('Error resetting Redis DB.');
  }

  console.info('resetRedisDB', 'response', response);
  return response;
};

export default resetRedisDB;
