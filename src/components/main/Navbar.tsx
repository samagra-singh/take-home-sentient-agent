'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import Button from '@/components/base/button';
import DiscoverIcon from '@/components/base/icons/discover.svg';
import HistoryIcon from '@/components/base/icons/history.svg';
import HomeIcon from '@/components/base/icons/home.svg';
import SpinnerIcon from '@/components/base/icons/spinner.svg';
import { homePagePathName } from '@/utils/constants/global';

const navPages = [
  {
    label: 'Home',
    href: homePagePathName,
    icon: <HomeIcon className="size-6 stroke-current" />,
  },
  {
    label: 'History',
    href: '/history',
    icon: <HistoryIcon className="size-6 fill-current" />,
  },
  {
    label: 'Discover',
    href: '/discover',
    icon: <DiscoverIcon className="size-6 fill-current" />,
  },
];

const getPageIdxFromPathname = (pathname: string) => {
  return navPages.findIndex((page) => page.href === pathname);
};

interface NavbarProps {
  forTablet: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ forTablet }) => {
  const router = useRouter();
  const pathname = usePathname();

  const navBarRef = useRef<HTMLDivElement>(null);

  const [navPageState, setNavPageState] = useState({
    selectedIdx: getPageIdxFromPathname(pathname),
    isLoading: false,
  });
  const [selectedIndicatorStyles, setSelectedIndicatorStyles] = useState<
    { top: string; left: string } | null>(null);

  const handleIndicatorUpdate = useCallback((selectedIdx: number) => {
    if (navBarRef.current && selectedIdx !== -1) {
      const selectedItem = navBarRef.current.children[selectedIdx];
      const selectedItemRect = selectedItem.getBoundingClientRect();
      setSelectedIndicatorStyles({
        top: `${selectedItemRect.top}px`,
        left: `${selectedItemRect.left}px`,
      });
    }
  }, []);

  useLayoutEffect(() => {
    const selectedIdx = navPageState.selectedIdx;
    handleIndicatorUpdate(selectedIdx);

    const handleResize = () => {
      handleIndicatorUpdate(selectedIdx);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleIndicatorUpdate, navPageState.selectedIdx]);

  useEffect(() => {
    const selectedIdx = getPageIdxFromPathname(pathname);
    setNavPageState({
      selectedIdx,
      isLoading: selectedIdx === -1 ? false : pathname !== navPages[selectedIdx].href,
    });
  }, [pathname]);

  useEffect(() => {
    // [TODO] Manual prefetch for performance. Use 'Link' instead.
    navPages.forEach((option) => {
      router.prefetch(option.href);
    });
  }, [router]);

  return (
    <div
      className={clsx(
        'shrink-0 tablet:grow relative tablet:static h-18 tablet:h-auto flex tablet:flex-col align-center justify-center items-stretch tablet:items-center gap-15 tablet:gap-9.5 bg-surface-sidebar tablet:bg-transparent border-t border-t-boundary-global-light tablet:border-t-0 text-navbar-unselected',
        // We render 2 navbars. One inside the sidebar and one outside for mobile.
        // Hide mobile navbar on tablets.
        { 'tablet:hidden': !forTablet },
      )}
      ref={navBarRef}
    >
      {navPages.map((option, index) => (
        <Button
          key={option.label}
          className={clsx(
            'w-18 tablet:w-12 tablet:h-12 flex flex-col align-center justify-center items-center gap-1 hover:bg-surface-sidebar-hover focus-visible:bg-surface-sidebar-hover',
            { 'text-global': navPageState.selectedIdx === index },
          )}
          label={
            navPageState.selectedIdx === index
              ? navPageState.isLoading
                ? `Loading ${option.label} ...`
                : `You're already on ${option.label}`
              : navPageState.isLoading
                ? 'Loading...'
                : `Go to ${option.label}`
          }
          disabled={navPageState.selectedIdx === index}
          onClick={() => {
            setNavPageState({
              selectedIdx: index,
              isLoading: pathname !== option.href,
            });
            router.push(option.href);
          }}
          rounding="rectangular"
        >
          {navPageState.isLoading && navPageState.selectedIdx === index
            ? <SpinnerIcon className="size-6 animate-spin" />
            : option.icon}
          <span className="tablet:hidden font-navbar">{option.label}</span>
        </Button>
      ))}
      {navPageState.selectedIdx !== -1 && selectedIndicatorStyles && <span
        className="absolute bg-global w-18 h-[0.1875rem] tablet:w-[0.375rem] tablet:h-12 rounded-b-[0.625rem] tablet:rounded-br-none tablet:rounded-l-[0.375rem] transition-all"
        style={
          forTablet
            ? { right: 0, top: selectedIndicatorStyles.top }
            : { top: 0, left: selectedIndicatorStyles.left }
        }
      />}
    </div>
  );
};

export default Navbar;
