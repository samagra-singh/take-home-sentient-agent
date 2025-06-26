'use client';

import Button from '@/components/base/button';
import SentientIcon from '@/components/base/icons/sentient.svg';

import { Navbar } from '.';
import useHomeNav from './hooks/use-home-nav';
import Toolbar from './Toolbar';

const TabletSidebar: React.FC<Record<string, never>> = () => {
  const homeNav = useHomeNav();
  const { isAlreadyOnHomePage, handleHomeNav } = homeNav;

  return (
    <div className="hidden relative tablet:flex shrink-0 flex-col align-start justify-start items-center gap-4 w-19 px-1 pt-6.5 pb-5.5 bg-surface-sidebar border-r border-boundary-global-light">
      <Button
        className="shrink-0 w-8.5 h-8.5 invert-0 hover:invert-[0.35] focus-visible:invert-[0.35]"
        label={
          isAlreadyOnHomePage
            ? 'Welcome to Sentient !! You\'re already on the home page.'
            : 'Go to Sentient Home'
        }
        onClick={handleHomeNav}
        disabled={isAlreadyOnHomePage}
      >
        <SentientIcon className="size-8.5 fill-current" />
      </Button>
      <Navbar forTablet />
      <Toolbar forTablet homeNav={homeNav} />
    </div>
  );
};

export default TabletSidebar;
