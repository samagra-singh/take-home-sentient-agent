'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useUser } from '@/contexts/user-context';
import { TooltipIds } from '@/utils/constants/global';

import Button from '../base/button';
import CopyIcon from '../base/icons/copy.svg';
import SentientIcon from '../base/icons/sentient.svg';
import { ImageWithFallback } from '../common/image';
import { type Message } from '.';

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

  useEffect(() => {
    if (scrollContainerRef.current) {
      // [TODO] Track if user scrolled manually and prevent scrolling until user scrolls back to the bottom.
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, scrollContainerRef]);

  return (
    <div className={clsx(className, 'flex flex-col gap-3.5')}>
      {messages.map((message, index) => {
        return (
          <div
            key={index}
            className={clsx(
              'flex flex-col gap-3.5',
              {
                'mr-4 tablet:mr-12 tablet:ml-4': message.role === 'agent',
                'ml-4 tablet:ml-12 tablet:mr-4': message.role === 'user',
              },
            )}
          >
            <div className={clsx(
              'flex items-center gap-2',
              {
                'justify-start': message.role === 'agent',
                'justify-end': message.role === 'user',
              },
            )}>
              {message.role === 'user'
                ? (
                  <>
                    <p className="text-message-meta-size leading-message-meta font-message-meta">Searched for</p>
                    <div
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
                    <p className={clsx(
                      'text-message-meta-size leading-message-meta font-message-meta',
                      {
                        'animate-pulse duration-700': message.agentStatus !== 'completed',
                      },
                    )}>
                      {message.agentStatus === 'searching'
                        ? `Searching for ${title}`
                        : message.agentStatus === 'browsing'
                          ? `Browsing for ${title}`
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

            {message.content.map((block, index) => {
              switch (block.type) {
                case 'plain':
                  return <p key={index}>{block.text?.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}</p>;
                case 'bullets':
                  return (
                    <>
                      {block.heading && <h1 key={index} className="font-bold">{block.heading}</h1>}
                      <ul key={index} className="list-disc list-inside">
                        {block.items?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </>
                  );
                default:
                  return null;
              }
            })}

            {message.role === 'agent' && message.wasStopped && (
              <p className="italic font-bold">
                You stopped this search.
              </p>
            )}

            {message.role === 'agent' && !message.wasStopped && (
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
        );
      })}
    </div>
  );
};

export default Messages;
