export type AgentModel = '4s-mini' | 's1-preview';

export type MessageContent = {
  type: 'plain' | 'bullets';
  text?: string;
  heading?: string;
  items?: string[];
};

export type Message = {
  role: 'user' | 'agent';
  model?: AgentModel;
  agentStatus?: 'searching' | 'browsing' | 'completed';
  wasStopped?: boolean;
  content: MessageContent[];
};

export type ConversationObject = {
  id: string;
  title: string;
  messages: Message[];
};
