'use client';

import React, { useContext } from 'react';

import { type AuthenticatedUser } from  '@/actions/users/users.types';

import { UserContext } from './user-context.create';

type UserContextType = AuthenticatedUser;

export const UserProvider: React.FC<{
  children: React.ReactNode;
  value: UserContextType;
}> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
