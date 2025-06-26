'use client';

import useHomeNav from './hooks/use-home-nav';
import Toolbar from './Toolbar';

const MobileToolbar: React.FC<Record<string, never>> = () => {
  const homeNav = useHomeNav();

  return <Toolbar forTablet={false} homeNav={homeNav} />;
};

export default MobileToolbar;
