import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient> | null;

declare global {
  var redisClient: RedisClient;
}

global.redisClient = null;

/**
 * Should be used only in server components.
 *
 * ‼ DO NOT use redis clients directly in client components.
 */
let redisClient: RedisClient = null;

const createRedisClient = async () => {
  let client: RedisClient = null;
  try {
    console.log('Connecting to Redis...');
    client = await createClient({ url: process.env.STORAGE_REDIS_URL }).connect();
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
  return client;
};

const getClient = async () => {
  if (process.env.NODE_ENV === 'production' && redisClient === null) {
    redisClient = await createRedisClient();
  } else {
    // In development, use a global variable to avoid multiple connections
    // caused by hot-reloading
    if (global.redisClient === null) {
      global.redisClient = await createRedisClient();
    }
    redisClient = global.redisClient;
  }
  return redisClient;
};

export default getClient;
