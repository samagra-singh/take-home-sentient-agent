'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { homePagePathName } from '@/utils/constants/global';

const useHomeNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isAlreadyOnHomePage, setIsAlreadyOnHomePage] = useState(pathname === homePagePathName);

  useEffect(() => {
    setIsAlreadyOnHomePage(pathname === homePagePathName);
  }, [pathname]);

  const handleHomeNav = useCallback(() => {
    if (isAlreadyOnHomePage) {
      return;
    }
    router.push(homePagePathName);
  }, [isAlreadyOnHomePage, router]);

  return {
    isAlreadyOnHomePage,
    handleHomeNav,
  };
};

export default useHomeNav;
