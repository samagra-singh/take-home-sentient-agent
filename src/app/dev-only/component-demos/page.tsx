import { notFound } from 'next/navigation';

import ExternalLinkIcon from '@/components/icons/external-link.svg';
import HelpIcon from '@/components/icons/help.svg';
import MailIcon from '@/components/icons/mail.svg';
import SentientIcon from '@/components/icons/sentient.svg';

const ComponentDemosPage = async () => {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <div className="p-4">
      <div className="border-b-2 border-gray-300 pb-4">
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
          <ExternalLinkIcon className="w-6 h-6 stroke-current" />
          <HelpIcon className="w-6 h-6 stroke-current" />
          <MailIcon className="w-6 h-6 fill-current" />
          <SentientIcon className="w-6 h-6 fill-current" />
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-6">
            Small | 16x16 px | current color
        </h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <ExternalLinkIcon className="w-4 h-4 stroke-current" />
          <HelpIcon className="w-4 h-4 stroke-current" />
          <MailIcon className="w-4 h-4 fill-current" />
          <SentientIcon className="w-4 h-4 fill-current" />
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-6">
            Large | 96x96 px | current color
        </h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <ExternalLinkIcon className="w-32 h-32 stroke-current" />
          <HelpIcon className="w-32 h-32 stroke-current" />
          <MailIcon className="w-32 h-32 fill-current" />
          <SentientIcon className="w-32 h-32 fill-current" />
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-6">
            Colored | 24x24 px | orange
        </h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <ExternalLinkIcon className="w-6 h-6 stroke-orange-500" />
          <HelpIcon className="w-6 h-6 stroke-orange-500" />
          <MailIcon className="w-6 h-6 fill-orange-500" />
          <SentientIcon className="w-6 h-6 fill-orange-500" />
        </div>
      </div>
    </div>
  );
};

export default ComponentDemosPage;
