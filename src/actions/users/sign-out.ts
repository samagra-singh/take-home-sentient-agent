'use server';

import { cookies } from 'next/headers';

import { authTokenCookieName } from '@/utils/constants/global';

import { type SignOutResponse } from './users.types';

const signOut = async (): Promise<SignOutResponse> => {
  const response: SignOutResponse = {
    error: null,
  };

  try {
    const cookieStore = await cookies();
    cookieStore.delete(authTokenCookieName);
    response.success = true;
  } catch (error) {
    console.error('Error signing out.', error);
    response.error = new Error('Error signing out.');
  }

  console.info('signOut', 'response', response);
  return response;
};

export default signOut;
