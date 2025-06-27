import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import { Conversation } from '@/components/conversation';

export const metadata: Metadata = {
  title: 'Home | Sentient Agent',
  description: 'Sentient\'s here. Shoot your questions at me.',
};

const ConversationPage = async ({ params }: {
  params: Promise<{
    convID?: string[]
  }>
}) => {
  const { convID } = await params;
  if (
    convID &&
    (convID.length > 1
      // [TEMP] for testing.
      || convID[0] === '404')
  ) {
    notFound();
  }

  return (
    <>
      <Conversation key={convID?.[0]} convID={convID?.[0]} />
    </>
  );
};

export default ConversationPage;
