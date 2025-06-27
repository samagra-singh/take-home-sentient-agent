'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useUser } from '@/contexts/user-context';
import { TooltipIds } from '@/utils/constants/global';

import Button from '../base/button';
import CopyIcon from '../base/icons/copy.svg';
import SentientIcon from '../base/icons/sentient.svg';
import { ImageWithFallback } from '../common/image';
import { type Message } from '.';
import { getMockPromptSummary } from './getAgentMockResponse';

interface MessagesProps {
  title: string;
  messages: Message[];
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

const Messages: React.FC<MessagesProps> = ({
  title,
  messages,
  scrollContainerRef,
  className = '',
}) => {
  const user = useUser();
  const responseContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      // [TODO] Track if user scrolled manually and prevent scrolling until user scrolls back to the bottom.
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, scrollContainerRef]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage?.role === 'agent' &&
      lastMessage.agentStatus === 'completed' &&
      responseContainerRef.current
    ) {
      // Use a small timeout to ensure the DOM is fully painted before focusing
      setTimeout(() => {
        responseContainerRef.current?.focus();
      }, 1000);
    }
  }, [messages]); // This effect runs whenever the mes

  return (
    <div className={clsx(className, 'flex flex-col gap-3.5')}>
      {messages.map((message, index) => {
        return (
          <div
            key={index}
            className={clsx(
              'flex',
              {
                'justify-start mr-4 tablet:mr-25 tablet:ml-4': message.role === 'agent',
                'justify-end ml-4 tablet:ml-25 tablet:mr-4': message.role === 'user',
              },
            )}
          >
            <div
              className="flex flex-col gap-3.5 max-w-full"
            >
              <div
                className={clsx(
                  'flex items-center gap-2',
                  {
                    'justify-start': message.role === 'agent',
                    'justify-end': message.role === 'user',
                  },
                )}
                {...(index === messages.length - 1 /* && message.agentStatus !== 'completed' */ && {
                  'aria-label': 'Sentient is thinking ...',
                  'aria-live': /* message.agentStatus === 'completed' ? 'assertive' : */ 'polite',
                  // 'aria-atomic': 'true',
                })}
              >
                {message.role === 'user'
                  ? (
                    <>
                      <p className="text-message-meta-size leading-message-meta font-message-meta text-nowrap text-ellipsis overflow-hidden">Searched for</p>
                      <div
                        className="shrink-0"
                        data-tooltip-id={TooltipIds.CLICKABLE_NO_FOCUS}
                        data-tooltip-content={`Prompt received from ${user.name.split(' ')[0]}`}
                      >
                        <ImageWithFallback
                          src={`/avatars/${user.id}.png`}
                          alt={`${user.name}'s avatar`}
                          fallbackSrc="/avatars/default.png"
                          fallbackAlt="Default avatar. Sorry, we couldn't load your avatar."
                          width={24}
                          height={24}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="shrink-0"
                        tabIndex={0}
                        aria-label={
                          message.agentStatus === 'searching'
                            ? `Sentient is searching with ${message.model}`
                            : message.agentStatus === 'browsing'
                              ? `Sentient is browsing with ${message.model}`
                              : `Sentient responded using ${message.model}`}
                        data-tooltip-id={TooltipIds.CLICKABLE_NO_FOCUS}
                        data-tooltip-content={
                          message.agentStatus === 'searching'
                            ? `Sentient is searching with ${message.model}`
                            : message.agentStatus === 'browsing'
                              ? `Sentient is browsing with ${message.model}`
                              : `Sentient responded using ${message.model}`}
                      >
                        <SentientIcon
                          className={clsx(
                            'w-6 h-6 text-global',
                            {
                              'animate-pulse duration-700': message.agentStatus !== 'completed',
                            },
                          )}
                        />
                      </div>
                      <p
                        tabIndex={0}
                        className={clsx(
                          'grow text-message-meta-size leading-message-meta font-message-meta text-nowrap text-ellipsis overflow-hidden',
                          {
                            'animate-pulse duration-700': message.agentStatus !== 'completed',
                          },
                        )}
                        // {...(index === messages.length - 1 /* && message.agentStatus !== 'completed' */ && {
                        //   'aria-live': message.agentStatus === 'completed' ? 'assertive' : 'polite',
                        //   'aria-atomic': 'true',
                        // })}
                      >
                        {message.agentStatus === 'searching'
                          ? `Searching for ${messages.length === 2 ? title : getMockPromptSummary(messages[messages.length - 2].content[0].text ?? 'it')}`
                          : message.agentStatus === 'browsing'
                            ? `Browsing for ${messages.length === 2 ? title : getMockPromptSummary(messages[messages.length - 2].content[0].text ?? 'it')}`
                            : message.wasStopped
                              ? 'Do try again !!'
                              : 'All done !!'}
                      </p>
                    </>
                  )}
              </div>

              {/* Placeholder while generating response. */}
              {index === messages.length - 1
              && message.role === 'agent'
              && message.agentStatus !== 'completed'
              && <div className="h-50"></div>}

              <div
                className="flex flex-col gap-3.5"
                {...(index === messages.length - 1 /* && message.agentStatus === 'completed' */ && {
                  tabIndex: 0,
                  'aria-label': 'Response from Sentient',
                  ref: responseContainerRef,
                  // 'aria-live': 'assertive',
                  // 'aria-atomic': 'true',
                })}
              >
                {message.content.map((block, index) => {
                  switch (block.type) {
                    case 'plain':
                      return <p tabIndex={0} key={`p-${index}`}>{block.text?.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}</p>;
                    case 'bullets':
                      return (
                        <div key={`bullets-${index}`}>
                          {block.heading && <h1 tabIndex={0} key={`h1-${index}`} className="font-bold">{block.heading}</h1>}
                          {/* Let user's read each bullet point one by one. */}
                          <ul key={`ul-${index}`} className="list-disc list-inside">
                            {block.items?.map((item, index) => (
                              <li tabIndex={0} key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}

                {message.role === 'agent' && message.wasStopped && (
                  <p tabIndex={0} className="italic font-bold">
                    You stopped this search.
                  </p>
                )}

                {message.role === 'agent' && message.agentStatus === 'completed' && !message.wasStopped && (
                  <div className="w-full flex align-start justify-start items-center gap-2">
                    <div className="grow flex align-center justify-start items-center gap-2">
                      <Button
                        className="text-navbar-unselected flex items-center gap-2 px-3 py-1 hover:bg-surface-global-hover focus-visible:bg-surface-global-hover"
                        label="Copy response"
                        onClick={() => {
                          navigator.clipboard.writeText(message.content.map(block => {
                            switch (block.type) {
                              case 'plain':
                                return block.text;
                              case 'bullets':
                                return `${block.heading ? `${block.heading}\n` : ''}${block.items?.map(item => `- ${item}`).join('\n')}`;
                              default:
                                return '';
                            }
                          }).join('\n'));
                          toast.success('Copied to clipboard !!');
                        }}
                      >
                        <CopyIcon className="size-5 stroke-current" />
                        <span>Copy</span>
                      </Button>
                    </div>
                    <div className="shrink-0 flex align-center justify-end items-center gap-2"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
