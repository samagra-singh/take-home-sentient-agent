import '@/app/globals.css';
import 'react-tooltip/dist/react-tooltip.css';

import clsx from 'clsx';
import type { Metadata } from 'next';
import { Nunito_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { getProjectInfo } from '@/actions/project-info';
import { TooltipContainers } from '@/components/root';
import { fontVars, ToastConfigs } from '@/utils/constants/global';

// Setup fonts
const plusJakartaSans = Plus_Jakarta_Sans({
  display: 'swap',
  subsets: ['latin'],
  // Keep in sync with `fontVars` in `globals.ts`.
  variable: '--font-jakarta',
});
const nunitoSans = Nunito_Sans({
  display: 'swap',
  subsets: ['latin'],
  // Keep in sync with `fontVars` in `globals.ts`.
  variable: '--font-nunito',
});

export const generateMetadata = async (): Promise<Metadata> => {
  const projectInfoData = await getProjectInfo();
  return {
    description: projectInfoData.projectInfo?.description,
  };
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={clsx(
          plusJakartaSans.variable,
          nunitoSans.variable,
          'bg-surface-global text-global',
          // Default font styles
          `font-(family-name:${fontVars.jakartaSans}) font-global text-global-size text-global leading-global tracking-global`,
          // Other default styles
          'align-middle',
        )}
      >
        {children}
        <TooltipContainers />
        <ToastContainer
        // Not important needed to override default toastify CSS.
          toastClassName={`!font-(family-name:${fontVars.jakartaSans})`}
          newestOnTop
          // The default 80 is too high.
          draggablePercent={60}
          // Not required, but to ensure consistency. See config for more.
          {...ToastConfigs}
        />
      </body>
    </html>
  );};

export default RootLayout;
