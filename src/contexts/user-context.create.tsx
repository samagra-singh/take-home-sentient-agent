import { createContext } from 'react';

import { type AuthenticatedUser } from '@/actions/users/users.types';

export const UserContext = createContext<AuthenticatedUser | undefined>(
  undefined,
);
