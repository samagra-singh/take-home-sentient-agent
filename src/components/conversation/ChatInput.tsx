'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import PlusCircleIcon from '@/components/base/icons/plus-circle.svg';
import SendIcon from '@/components/base/icons/send.svg';
import SentientLargeIcon from '@/components/base/icons/sentient-large.svg';
import StopIcon from '@/components/base/icons/stop.svg';
import { isTouchDevice } from '@/utils/events';

import Button from '../base/button';
import ToggleSwitch from '../base/toggle-switch';
import { type AgentModel } from './conversation.types';
import Suggestions from './Suggestions';

interface ChatInputProps {
  isNew: boolean;
  isConversationLoading: boolean;
  sendMessage: (message: string, model: AgentModel) => void;
  stopMessage: () => string;
  isInProgress: boolean;
  conversationLastUsedModel?: AgentModel;
}

const ChatInput: React.FC<ChatInputProps> = ({
  isNew,
  isConversationLoading,
  sendMessage,
  stopMessage,
  isInProgress,
  conversationLastUsedModel, // Optional
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState<AgentModel>('4s-mini');
  const [didUserChangeModel, setDidUserChangeModel] = useState(false);

  const handleModelChange = useCallback((value: string) => {
    setDidUserChangeModel(true);
    setModel(value as AgentModel);
  }, []);

  useEffect(() => {
    if (conversationLastUsedModel && !didUserChangeModel && model !== conversationLastUsedModel) {
      setModel(conversationLastUsedModel);
    }
  }, [conversationLastUsedModel, didUserChangeModel, model]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    sendMessage(suggestion.trim(), model);
  }, [sendMessage, model]);

  const handleMessageSend = useCallback(() => {
    if (inputRef.current) {
      const message = inputRef.current.value;
      sendMessage(message.trim(), model);

      inputRef.current.value = '';
      setPrompt('');
    }
  }, [sendMessage, model]);

  const handleMessageStop = useCallback(() => {
    if (inputRef.current) {
      const prevMessage = stopMessage();
      inputRef.current.value = prevMessage;
      setPrompt(prevMessage);
    }
  }, [stopMessage]);

  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }, []);

  const handlePromptKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isTouchDevice()) {
      e.preventDefault();
      handleMessageSend();
    }
  }, [handleMessageSend]);

  return (
    <>
      {(isNew || isConversationLoading) && (
        <div className={clsx(
          'shrink-0 mb-3 tablet:mb-9 text-global flex flex-col items-center gap-4',
          {
            'animate-pulse duration-700': isConversationLoading,
          },
        )}>
          <SentientLargeIcon
            className={clsx(
              'stroke-current',
              {
                'size-20': isNew,
                'size-30': isConversationLoading,
              },
            )}
          />
          {isConversationLoading && (
            <p className="text-global">
              Firing Sentient&apos;s neurons to get our last chat ...
            </p>
          )}
        </div>
      )}
      <div className="shrink-0 p-4.5 border border-boundary-chat-input rounded-[0.625rem]">
        <div className="flex items-center gap-2 mb-2.5">
          <Button
            className="shrink-0 size-10 p-2 text-chat-input-light hover:bg-surface-global-hover focus-visible:bg-surface-global-hover"
            label="Attach files"
          >
            <PlusCircleIcon className="size-6 stroke-current" />
          </Button>
          <TextareaAutosize
            ref={inputRef}
            className="grow min-h-5.5 py-2 leading-chat-input placeholder:leading-chat-input placeholder:text-chat-input-placeholder focus:outline-none focus-visible:outline-none resize-none"
            name="user-prompt"
            minRows={1}
            maxRows={7}
            placeholder="Ask me anything..."
            aria-label="Type your prompt for Sentient here."
            autoFocus
            onChange={handlePromptChange}
            onKeyDown={handlePromptKeyDown}
          />
        </div>
        <div className="flex gap-2">
          {/* Implement model switcher inside this div. */}
          <div className="grow">
            <ToggleSwitch
              value={model}
              options={['4s-mini', 's1-preview']}
              onChange={handleModelChange}
            />
          </div>
          <div className="shrink-0">
            <Button
              className={clsx(
                'shrink-0 size-11 p-3.25 text-chat-input-dark border border-boundary-global-light',
                {
                  'hover:bg-surface-global-hover focus-visible:bg-surface-global-hover':
                    isInProgress || prompt.length === 0,
                  'bg-chat-primary-active hover:bg-chat-primary-active-hover focus-visible:bg-chat-primary-active-hover':
                    !isInProgress && prompt.length > 0,
                  'opacity-25': isConversationLoading,
                },
              )}
              label={
                isConversationLoading ?
                  'Please wait for conversation to load ...'
                  : isInProgress
                    ? 'Stop response generation'
                    : prompt.length > 0
                      ? 'Send prompt to Sentient'
                      : 'Start typing to chat with Sentient'
              }
              disabled={isConversationLoading || (!isInProgress && prompt.length === 0)}
              onClick={
                isConversationLoading
                  ? () => {}
                  : isInProgress
                    ? handleMessageStop
                    : handleMessageSend
              }
            >
              {isInProgress ? (
                <StopIcon className="size-4.5 stroke-current" />
              ) : (
                <SendIcon className="size-4.5 stroke-current" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isNew && <Suggestions onSuggestionClick={handleSuggestionClick} />}
    </>
  );
};

export default ChatInput;
