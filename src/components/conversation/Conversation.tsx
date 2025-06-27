'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { ChatInput, type ConversationObject } from '.';
import { type AgentModel } from './conversation.types';
import { getAgentMockResponse, getMockConversation, getMockPromptSummary } from './getAgentMockResponse';
import Messages from './Messages';

interface ConversationProps {
  convID?: string;
}

const Conversation: React.FC<ConversationProps> = ({ convID }) => {
  const [conversation, setConversation] = useState<ConversationObject>({
    id: convID || '',
    title: '',
    messages: [],
  });
  const [isConversationLoading, setIsConversationLoading] = useState(!!convID);
  const [conversationLastUsedModel, setConversationLastUsedModel] = useState<AgentModel | null>(null);

  useEffect(() => {
    if (convID && isConversationLoading) {
      setTimeout(() => {
        const conversation = getMockConversation(convID);
        setConversation(conversation);
        setConversationLastUsedModel(conversation.messages[conversation.messages.length - 1]?.model ?? null);
        setIsConversationLoading(false);
      }, 3500);
    }
  }, [convID, isConversationLoading]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [titleStyles, setTitleStyles] = useState<React.CSSProperties | null>(null);

  const inProgressRef = useRef({
    id: null as NodeJS.Timeout | null,
    message: '',
  });
  const [isInProgress, setIsInProgress] = useState(false);

  const handleMessageSend = useCallback((message: string, model: AgentModel) => {
    if (inProgressRef.current && !inProgressRef.current.id && !isInProgress) {
      setIsInProgress(true);
      inProgressRef.current = {
        id: setTimeout(() => {
          setConversation(prevConversation => {
            const newMessages = [...prevConversation.messages];
            newMessages[newMessages.length - 1] = {
              ...newMessages[newMessages.length - 1],
              agentStatus: 'browsing',
            };
            return {
              ...prevConversation,
              messages: newMessages,
            };
          });

          inProgressRef.current = {
            id: setTimeout(() => {
              setIsInProgress(false);
              inProgressRef.current = {
                id: null,
                message: '',
              };

              setConversation(prevConversation => {
                const newMessages = [...prevConversation.messages];
                newMessages[newMessages.length - 1] = {
                  ...newMessages[newMessages.length - 1],
                  agentStatus: 'completed',
                  content: getAgentMockResponse(),
                };
                return {
                  ...prevConversation,
                  messages: newMessages,
                };
              });
            }, 2500),
            message: inProgressRef.current.message,
          };
        },
        1500),
        message,
      };
      setConversation(prevConversation => ({
        ...prevConversation,
        id: prevConversation.id || uuidV4(),
        title:
          prevConversation.title ||
          getMockPromptSummary(message),
        messages: [...prevConversation.messages, {
          role: 'user',
          content: [{
            type: 'plain',
            text: message,
          }],
        }, {
          role: 'agent',
          model,
          agentStatus: 'searching',
          content: [],
        }],
      }));
    }
  }, [isInProgress]);

  const handleMessageStop = useCallback(() => {
    const prevMessage = inProgressRef.current.message;
    if (inProgressRef.current.id || isInProgress) {
      if (inProgressRef.current.id) {
        clearTimeout(inProgressRef.current.id);
      }
      inProgressRef.current = {
        id: null,
        message: '',
      };
      setIsInProgress(false);

      setConversation(prevConversation => {
        const newMessages = [...prevConversation.messages];
        newMessages[newMessages.length - 1] = {
          ...newMessages[newMessages.length - 1],
          wasStopped: true,
          agentStatus: 'completed',
          content: [],
        };
        return {
          ...prevConversation,
          messages: newMessages,
        };
      });
    }

    return prevMessage || '';
  }, [isInProgress]);

  useEffect(() => {
    const updateTitlePosition = () => {
      if (scrollContainerRef.current) {
        setTitleStyles({
          left: scrollContainerRef.current.offsetLeft,
          width: scrollContainerRef.current.clientWidth,
        });
      } else {
        setTitleStyles(null);
      }
    };
    updateTitlePosition();
    window.addEventListener('resize', updateTitlePosition);
    return () => window.removeEventListener('resize', updateTitlePosition);
  }, [scrollContainerRef]);

  return (
    <>
      <div className="grow overflow-y-auto" ref={scrollContainerRef}>
        {conversation.title && titleStyles && (
          <h1
            className="absolute top-0 left-0 w-full px-4.5 py-3 text-center text-ellipsis overflow-hidden bg-surface-global border border-boundary-global-light rounded-b-[1.25rem]"
            style={titleStyles}
          >
            {conversation.title}
          </h1>
        )}
        <Messages
          // To account for the title. 48px + 12px padding - 28px/34px padding in layout..
          className="pt-10 tablet:pt-6.5"
          title={conversation.title}
          messages={conversation.messages}
          scrollContainerRef={scrollContainerRef}
        />
      </div>
      <ChatInput
        isNew={conversation.id === ''}
        isConversationLoading={isConversationLoading}
        sendMessage={handleMessageSend}
        stopMessage={handleMessageStop}
        isInProgress={isInProgress}
        conversationLastUsedModel={conversationLastUsedModel || undefined}
      />
    </>
  );
};

export default Conversation;
