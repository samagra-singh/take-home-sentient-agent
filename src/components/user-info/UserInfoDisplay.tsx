'use client';

import React from 'react';

import { useUser } from '@/contexts/user-context';

const UserInfoDisplay: React.FC<Record<string, never>> = () => {
  const userData = useUser();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <h2 className="text-blue-800 font-semibold text-lg mb-2">Current User Information</h2>
      <div className="space-y-2">
        <p className="text-blue-700">
          <span className="font-medium">Name:</span> {userData.name}
        </p>
        <p className="text-blue-700">
          <span className="font-medium">ID:</span> {userData.id}
        </p>
        <p className="text-blue-700">
          <span className="font-medium">Email:</span> {userData.email}
        </p>
      </div>
    </div>
  );
};

export default UserInfoDisplay;
