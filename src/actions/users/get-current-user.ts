'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getClient } from '@/actions/utils/redis';
import { authTokenCookieName, signInPagePathName } from '@/utils/constants/global';

import { type GetCurrentUserResponse, ZUsers } from './users.types';

// [TODO] Separate logic, create a login route (unprotected) and add middleware for more robust auth.
// [TODO] Accept pathname arg and redirect appropriately.
const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
  let response: GetCurrentUserResponse;

  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get(authTokenCookieName)?.value;
    if (
      authToken === undefined ||
      // When a cookie is deleted, it can come up as an empty string.
      authToken.trim() === ''
    ) {
      console.warn('No auth token found. Redirecting to sign in page. This should not have happened. Middleware should have handled this.');
      redirect(signInPagePathName);
    }

    const redisClient = await getClient();
    if (redisClient === null) {
      throw new Error('Redis client is not connected.');
    }

    const rawUsers = await redisClient.json.get('users');
    const users = ZUsers.parse(rawUsers);

    // Find the user with the matching token
    const currentUser = users.find(user =>
      user.tokens.includes(authToken),
    );
    if (currentUser === undefined) {
      console.warn(`No user found with the given token. Token: ${authToken}`);
      redirect(signInPagePathName);
    }

    response = {
      error: null,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
      },
    };
  } catch (error) {
    console.error('Error fetching current user.', error);
    response = {
      error: new Error('Error fetching current user.'),
    };
  }

  console.info('getCurrentUser', 'response', response);
  return response;
};

export default getCurrentUser;
