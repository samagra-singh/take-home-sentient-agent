import { type ConversationObject, type MessageContent } from './conversation.types';

const agentMockResponse: MessageContent[] = [
  {
    type: 'plain',
    text: 'Sentient refers to the ability to experience feelings or sensations. It means being capable of sensing or feeling, conscious of or responsive to the sensations of seeing, hearing. feeling, tasting, or smelling.',
  },
  {
    type: 'bullets',
    heading: 'Key Points:',
    items: [
      'Sentient beings are able to feel things or sense them.',
      'The term is often used in phrases like "sentient beings" and "sentient creatures," emphasizing that things that don\'t have life don\'t have feelings.',
      'Sentient is a formal adjective that can be used in different contexts and languages.',
      'The word has its roots in Latin, with the earliest known use dating back to the early 1600s',
    ],
  },
  {
    type: 'bullets',
    heading: 'Examples and Usage:',
    items: [
      'Man is a sentient being.',
      'There was no sign of any sentient life or activity.',
      'Sentient is used nouns like "being" to describe entities that possess consciousness or the ability to feel.',
    ],
  },
  {
    type: 'bullets',
    heading: 'Related Concepts:',
    items: [
      'Sentience is an important concept in ethics, particularly in utilitarianism, as it forms a basis for determining which entities deserve moral consideration.',
      'In Asian religions, the word "sentience" has been used to translate various concepts.',
      'In science fiction, the word "sentience" is often used to describe the ability of artificial intelligence or other non-human entities to experience consciousness or emotions.',
    ],
  },
];

export const getAgentMockResponse = (): MessageContent[] => {
  const blockCount = Math.max(1, new Date().getTime() % agentMockResponse.length);
  return agentMockResponse.slice(0, blockCount);
};

export const getMockPromptSummary = (prompt: string) => {
  return `${prompt.replace(/\n/g, ' ').slice(0, 80)}${prompt.replace(/\n/g, ' ').length > 80 ? ' ...' : ''}`;
};

export const getMockConversation = (id: string): ConversationObject => {
  return {
    id,
    title: 'What is the meaning of life?',
    messages: [
      {
        role: 'user',
        content: [{
          type: 'plain',
          text: 'What is the meaning of life?',
        }],
      },
      {
        role: 'agent',
        model: '4s-mini',
        agentStatus: 'completed',
        content: agentMockResponse.slice(0, 3),
      },
      {
        role: 'user',
        content: [{
          type: 'plain',
          text: 'Sentient refers to the ability to experience feelings or sensations. It means being capable of sensing or feeling, conscious of or responsive to the sensations of seeing, hearing. feeling, tasting, or smelling.\nKey Points:\n- Sentient beings are able to feel things or sense them.\n- The term is often used in phrases like "sentient beings" and "sentient creatures," emphasizing that things that don\'t have life don\'t have feelings.\n- Sentient is a formal adjective that can be used in different contexts and languages.\n- The word has its roots in Latin, with the earliest known use dating back to the early 1600s\nExamples and Usage:\n- Man is a sentient being.\n- There was no sign of any sentient life or activity.\n- Sentient is used nouns like "being" to describe entities that possess consciousness or the ability to feel.',
        }],
      },
      {
        role: 'agent',
        model: '4s-mini',
        agentStatus: 'completed',
        content: agentMockResponse.slice(0),
      },
      {
        role: 'user',
        content: [{
          type: 'plain',
          text: '### Project Structure\n\n```\nsrc/\n├── actions/ # Server actions\n├── app/ # Next.js App Router pages\n├── components/ # React components\n├── contexts/ # React contexts\n├── hooks/ # Custom hooks\n├── types/ # TypeScript type definitions\n└── utils/ # Utility functions\n```',
        }],
      },
      {
        role: 'agent',
        model: 's1-preview',
        agentStatus: 'completed',
        content: agentMockResponse.slice(0, 3),
      },
      {
        role: 'user',
        content: [{
          type: 'plain',
          text: '# Start development server with Turbopack\nnpm run dev\n```\n\nThe app runs on `http://localhost:3000` with Turbopack enabled for faster development builds.\n\n### Environment Variables\n\nThe app automatically configures `NEXT_PUBLIC_BASE_URL` based on the deployment environment:\n- Production: Uses Vercel production URL\n- Preview: Uses Vercel preview URL\n- Development: `http://localhost:3000`\n\n',
        }],
      },
      {
        role: 'agent',
        model: '4s-mini',
        agentStatus: 'completed',
        wasStopped: true,
        content: [],
      },
      {
        role: 'user',
        content: [{
          type: 'plain',
          text: 'One more search',
        }],
      },
      {
        role: 'agent',
        model: 's1-preview',
        agentStatus: 'completed',
        content: agentMockResponse.slice(0, 1),
      },
    ],
  };
};
