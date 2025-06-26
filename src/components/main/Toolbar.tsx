'use client';

import { useMemo } from 'react';
import { toast } from 'react-toastify';

import { useUser } from '@/contexts/user-context';

import Button from '../base/button';
import PlusIcon from '../base/icons/plus.svg';
import { ImageWithFallback } from '../common/image';
import type useHomeNav from './hooks/use-home-nav';

interface ToolbarProps {
  forTablet: boolean;
  homeNav: ReturnType<typeof useHomeNav>;
}

const Toolbar: React.FC<ToolbarProps> = ({ forTablet, homeNav }) => {
  const user = useUser();
  const { isAlreadyOnHomePage, handleHomeNav } = homeNav;

  const newChatButton = useMemo(() => {
    return (
      <Button
        className="w-9 h-9 p-1.5 tablet:w-12 tablet:h-12 tablet:p-3 hover:bg-surface-global-hover focus-visible:bg-surface-global-hover tablet:hover:bg-surface-sidebar-hover tablet:focus-visible:bg-surface-sidebar-hover"
        label={
          isAlreadyOnHomePage
            ? 'Sentient\'s ready. Shoot your questions at me. You\'re already in a new conversation.'
            : 'Start a new conversation with Sentient'
        }
        onClick={handleHomeNav}
        disabled={isAlreadyOnHomePage}
      >
        <PlusIcon className="size-6 fill-current" />
      </Button>
    );
  }, [isAlreadyOnHomePage, handleHomeNav]);

  const userAvatarButton = useMemo(() => {
    return (
      <Button
        className="w-9 h-9 tablet:w-8 tablet:h-8 invert-0 hover:invert-[0.15] focus-visible:invert-[0.15]"
        label="View user profile and available actions"
        onClick={() => {
          toast.info(
            'Sentient\'s gears are turning rapidly to make this feature available soon. Stay tuned!',
          );
        }}
      >
        <ImageWithFallback
          src={`/avatars/${user.id}.png`}
          alt={`${user.name}'s avatar`}
          fallbackSrc="/avatars/default.png"
          fallbackAlt="Default avatar. Sorry, we couldn't load your avatar."
          width={forTablet ? 32 : 36}
          height={forTablet ? 32 : 36}
        />
      </Button>
    );
  }, [forTablet, user]);

  const leftToolbar = useMemo(() => {
    return (
      <div className="grow flex align-center justify-start items-center gap-2">
        {newChatButton}
      </div>
    );
  }, [newChatButton]);

  const rightToolbar = useMemo(() => {
    return (
      <div className="shrink-0 flex align-center justify-end items-center gap-2">
        {userAvatarButton}
      </div>
    );
  }, [userAvatarButton]);

  return forTablet ? (
    <div className="shrink-0 flex flex-col align-center justify-start items-center gap-10">
      {newChatButton}
      {userAvatarButton}
    </div>
  ) : (
    <div className="tablet:hidden shrink-0 h-20 flex align-start justify-start items-center gap-2 px-4 py-6 border-b border-boundary-global-light">
      {leftToolbar}
      {rightToolbar}
    </div>
  );
};

export default Toolbar;
