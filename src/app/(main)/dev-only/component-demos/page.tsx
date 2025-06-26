import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import Button from '@/components/base/button';
import DiscoverIcon from '@/components/base/icons/discover.svg';
import ExternalLinkIcon from '@/components/base/icons/external-link.svg';
import HelpIcon from '@/components/base/icons/help.svg';
import HistoryIcon from '@/components/base/icons/history.svg';
import HomeIcon from '@/components/base/icons/home.svg';
import MailIcon from '@/components/base/icons/mail.svg';
import PlusIcon from '@/components/base/icons/plus.svg';
import SentientIcon from '@/components/base/icons/sentient.svg';
import SpinnerIcon from '@/components/base/icons/spinner.svg';

export const metadata: Metadata = {
  title: 'Component Demos | Sentient Agent',
};

const ComponentDemosPage = async () => {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <div className="p-4">
      <div className="border-b-2 border-gray-300 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Icons
        </h1>
        <p className="text-gray-950 mb-6">
          SVG icons should be resizable and should be modifiable with fill/stroke colors.
          <br />
          Render all icons here to test them for all requirements.
        </p>
        <h2 className="text-xl font-bold text-gray-700 mb-6">
            Default | 24x24 px | current color
        </h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <DiscoverIcon className="size-6 fill-current" />
          <ExternalLinkIcon className="size-6 stroke-current" />
          <HelpIcon className="size-6 stroke-current" />
          <HistoryIcon className="size-6 fill-current" />
          <HomeIcon className="size-6 stroke-current" />
          <MailIcon className="size-6 fill-current" />
          <PlusIcon className="size-6 fill-current" />
          <SentientIcon className="size-6 fill-current" />
          <SpinnerIcon className="size-6 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-6">
            Small | 16x16 px | current color
        </h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <DiscoverIcon className="size-4 fill-current" />
          <ExternalLinkIcon className="size-4 stroke-current" />
          <HelpIcon className="size-4 stroke-current" />
          <HistoryIcon className="size-4 fill-current" />
          <HomeIcon className="size-4 stroke-current" />
          <MailIcon className="size-4 fill-current" />
          <PlusIcon className="size-4 fill-current" />
          <SentientIcon className="size-4 fill-current" />
          <SpinnerIcon className="size-4 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-6">
            Large | 96x96 px | current color
        </h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <DiscoverIcon className="size-32 fill-current" />
          <ExternalLinkIcon className="size-32 stroke-current" />
          <HelpIcon className="size-32 stroke-current" />
          <HistoryIcon className="size-32 fill-current" />
          <HomeIcon className="size-32 stroke-current" />
          <MailIcon className="size-32 fill-current" />
          <PlusIcon className="size-32 fill-current" />
          <SentientIcon className="size-32 fill-current" />
          <SpinnerIcon className="size-32 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-6">
            Colored | 24x24 px | orange
        </h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <DiscoverIcon className="size-6 fill-orange-500" />
          <ExternalLinkIcon className="size-6 stroke-orange-500" />
          <HelpIcon className="size-6 stroke-orange-500" />
          <HistoryIcon className="size-6 fill-orange-500" />
          <HomeIcon className="size-6 stroke-orange-500" />
          <MailIcon className="size-6 fill-orange-500" />
          <PlusIcon className="size-6 fill-orange-500" />
          <SentientIcon className="size-6 fill-orange-500" />
          <SpinnerIcon className="size-6 animate-spin text-orange-500" />
        </div>
      </div>

      <div className="border-b-2 border-gray-300 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Buttons
        </h1>
        <p className="text-gray-950 mb-6">
          Buttons handle rounding, tooltips, ripple effects, and accessibility.
          <br />
          All buttons include proper aria labels and keyboard navigation support.
        </p>

        <h2 className="text-xl font-bold text-gray-700 mb-6">
          Navigation Buttons | Rectangular | With Icons
        </h2>
        <p className="text-gray-600 mb-4">
          Used in navbar and sidebar navigation with icons and text labels.
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            className="w-18 h-18 flex flex-col items-center justify-center gap-1 bg-surface-sidebar hover:bg-surface-sidebar-hover text-navbar-unselected"
            label="Go to Home"
            rounding="rectangular"
          >
            <HomeIcon className="size-6 stroke-current" />
            <span className="font-navbar">Home</span>
          </Button>
          <Button
            className="w-18 h-18 flex flex-col items-center justify-center gap-1 bg-surface-sidebar hover:bg-surface-sidebar-hover text-navbar-unselected"
            label="Go to History"
            rounding="rectangular"
          >
            <HistoryIcon className="size-6 fill-current" />
            <span className="font-navbar">History</span>
          </Button>
          <Button
            className="w-18 h-18 flex flex-col items-center justify-center gap-1 bg-surface-sidebar hover:bg-surface-sidebar-hover text-navbar-unselected"
            label="Go to Discover"
            rounding="rectangular"
          >
            <DiscoverIcon className="size-6 fill-current" />
            <span className="font-navbar">Discover</span>
          </Button>
        </div>

        <h2 className="text-xl font-bold text-gray-700 mb-6">
          Icon-Only Action Buttons | Rounded | Small
        </h2>
        <p className="text-gray-600 mb-4">
          Used for toolbar actions like new chat and user avatar.
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            className="w-9 h-9 p-1.5 bg-surface-global hover:bg-surface-global-hover"
            label="Start a new conversation with Sentient"
          >
            <PlusIcon className="size-6 fill-current" />
          </Button>
          <Button
            className="w-9 h-9 bg-surface-global hover:bg-surface-global-hover"
            label="View user profile and available actions"
          >
            <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">U</span>
            </div>
          </Button>
          <Button
            className="w-8.5 h-8.5 bg-surface-global hover:bg-surface-global-hover"
            label="Go to Sentient Home"
          >
            <SentientIcon className="size-8.5 fill-current" />
          </Button>
        </div>

        <h2 className="text-xl font-bold text-gray-700 mb-6">
          Action Buttons | Rounded | Medium
        </h2>
        <p className="text-gray-600 mb-4">
          Used for project actions and user interactions.
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md"
            label="Reset Redis Database"
            tooltip="Clear all data from Redis database"
          >
            Reset Database
          </Button>
          <Button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md"
            label="Sign out of current session"
            tooltip="End your current session"
          >
            Sign Out
          </Button>
          <Button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md"
            label="Send email to developer"
            tooltip="Contact the project developer"
          >
            <MailIcon className="size-5 fill-current mr-2" />
            Contact
          </Button>
        </div>

        <h2 className="text-xl font-bold text-gray-700 mb-6">
          Disabled States
        </h2>
        <p className="text-gray-600 mb-4">
          Buttons can be disabled and show appropriate visual feedback.
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            className="px-4 py-2 bg-gray-100 text-gray-400 font-semibold rounded-md"
            label="Disabled action button"
            disabled
          >
            Disabled Button
          </Button>
          <Button
            className="w-18 h-18 flex flex-col items-center justify-center gap-1 bg-surface-sidebar text-gray-400"
            label="You're already on Home"
            rounding="rectangular"
            disabled
          >
            <HomeIcon className="size-6 stroke-current" />
            <span className="font-navbar">Home</span>
          </Button>
          <Button
            className="w-9 h-9 p-1.5 bg-gray-100 text-gray-400"
            label="Already in new conversation"
            disabled
          >
            <PlusIcon className="size-6 fill-current" />
          </Button>
        </div>

        <h2 className="text-xl font-bold text-gray-700 mb-6">
          Loading States
        </h2>
        <p className="text-gray-600 mb-4">
          Buttons can show loading states with spinners.
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            className="w-18 h-18 flex flex-col items-center justify-center gap-1 bg-surface-sidebar text-global"
            label="Loading Home ..."
            rounding="rectangular"
            disabled
          >
            <SpinnerIcon className="size-6 animate-spin" />
            <span className="font-navbar">Home</span>
          </Button>
          <Button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md flex items-center justify-center gap-2"
            label="Processing request ..."
            disabled
          >
            <SpinnerIcon className="size-5 animate-spin mr-2" />
            Processing ...
          </Button>
        </div>

        <h2 className="text-xl font-bold text-gray-700 mb-6">
          Different Sizes
        </h2>
        <p className="text-gray-600 mb-4">
          Buttons can be sized differently for various use cases.
        </p>
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <Button
            className="w-6 h-6 p-1 bg-gray-200 hover:bg-gray-300"
            label="Extra small button"
          >
            <PlusIcon className="size-4 fill-current" />
          </Button>
          <Button
            className="w-9 h-9 p-1.5 bg-gray-200 hover:bg-gray-300"
            label="Small button"
          >
            <PlusIcon className="size-6 fill-current" />
          </Button>
          <Button
            className="w-12 h-12 p-3 bg-gray-200 hover:bg-gray-300"
            label="Medium button"
          >
            <PlusIcon className="size-6 fill-current" />
          </Button>
          <Button
            className="w-16 h-16 p-4 bg-gray-200 hover:bg-gray-300"
            label="Large button"
          >
            <PlusIcon className="size-8 fill-current" />
          </Button>
        </div>

        <h2 className="text-xl font-bold text-gray-700 mb-6">
          Ripple Effect Examples
        </h2>
        <p className="text-gray-600 mb-4">
          Test the ripple effect by clicking on the buttons below. The ripple starts from the click point and expands outward.
        </p>

        <h3 className="text-lg font-bold text-gray-600 mb-4">
          Default Ripple (White)
        </h3>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white"
            label="Default Ripple Button"
          >
            Default Ripple
          </Button>
          <Button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white"
            label="Green Button with Default Ripple"
          >
            Green Button
          </Button>
        </div>

        <h3 className="text-lg font-bold text-gray-600 mb-4">
          Custom Ripple Colors
        </h3>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white"
            label="Purple Button with Yellow Ripple"
            rippleClassName="bg-yellow-500/40"
          >
            Yellow Ripple
          </Button>
          <Button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white"
            label="Red Button with White Ripple"
            rippleClassName="bg-white/60"
          >
            White Ripple
          </Button>
          <Button
            className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white"
            label="Dark Button with Black Ripple"
            rippleClassName="bg-black/30"
          >
            Black Ripple
          </Button>
        </div>

        <h3 className="text-lg font-bold text-gray-600 mb-4">
          Disabled Ripple
        </h3>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white"
            label="Button without Ripple Effect"
            disableRipple
          >
            No Ripple
          </Button>
          <Button
            className="w-12 h-12 p-3 bg-gray-200 hover:bg-gray-300"
            label="Icon Button without Ripple"
            disableRipple
          >
            <PlusIcon className="size-6 fill-current" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComponentDemosPage;
