'use client';

import './globals.css';
import 'react-tooltip/dist/react-tooltip.css';

import cx from 'clsx';
import { Nunito_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { TooltipIds } from '@/utils/constants/global';

const plusJakartaSans = Plus_Jakarta_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-jakarta',
});
const nunitoSans = Nunito_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-nunito',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={cx(
          plusJakartaSans.variable,
          nunitoSans.variable,
          'font-(family-name:--font-jakarta) bg-gray-50 text-gray-800',
        )}
      >
        {children}
        {/* Default tooltip */}
        <ReactTooltip
          id={TooltipIds.CLICKABLE_NO_FOCUS}
          /**
           * Any new content on hover should be clickable.
           * https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
           * https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
           */
          clickable
          delayShow={300}
          globalCloseEvents={{
            escape: true,
            scroll: true,
            resize: true,
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
