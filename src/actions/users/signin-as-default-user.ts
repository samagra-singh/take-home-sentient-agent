'use server';

import { cookies } from 'next/headers';

import { authTokenCookieName, defaultUser } from '@/utils/constants/global';

import { type SigninAsDefaultUserResponse } from './users.types';

const signinAsDefaultUser = async (): Promise<SigninAsDefaultUserResponse> => {
  const response: SigninAsDefaultUserResponse = {
    error: null,
  };

  try {
    const cookieStore = await cookies();
    cookieStore.set(authTokenCookieName, defaultUser.tokens[0], {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: true,
      httpOnly: true,
    });
    response.success = true;
  } catch (error) {
    console.error('Error signing in as default user.', error);
    response.error = new Error('Error signing in as default user.');
  }

  console.info('signinAsDefaultUser', 'response', response);
  return response;
};

export default signinAsDefaultUser;
