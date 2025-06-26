import { type MessageContent } from './conversation.types';

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
