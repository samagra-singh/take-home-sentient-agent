import { z as zod } from 'zod';

// File object schema
export const ZFile = zod.object({
  name: zod.string().trim().min(1, 'File name is required'),
  size: zod.number().int().nonnegative('File size must be 0 or greater'),
});
export type File = zod.infer<typeof ZFile>;

// Message object schema
export const ZMessage = zod.object({
  from: zod.enum(['user', 'agent'], {
    errorMap: () => ({ message: 'Message from must be either "user" or "agent"' }),
  }),
  model: zod.string().trim().min(1, 'Model is required'),
  files: zod.array(ZFile).default([]),
  blocks: zod.array(zod.string().trim().min(1, 'Message block cannot be empty')),
  wasStopped: zod.boolean().default(false),
});
export type Message = zod.infer<typeof ZMessage>;

// Conversation object schema
export const ZConversation = zod.object({
  id: zod.string().trim().uuid({
    message: 'Conversation ID is required and must be a valid UUID v4.',
  }),
  lastViewed: zod.number().int().positive('Last viewed timestamp must be a positive integer'),
  title: zod.string().trim().min(1, 'Conversation title is required'),
});
export type Conversation = zod.infer<typeof ZConversation>;

// User conversations object schema
export const ZUserConversations = zod.object({
  conversations: zod.array(ZConversation).default([]),
});
export type UserConversations = zod.infer<typeof ZUserConversations>;

// Conversation detail object schema
export const ZConversationDetail = zod.object({
  lastViewed: zod.number().int().positive('Last viewed timestamp must be a positive integer'),
  messages: zod.array(ZMessage),
});
export type ConversationDetail = zod.infer<typeof ZConversationDetail>;

// Input schemas for server actions
export const ZCreateConversationInput = zod.object({
  message: zod.string().trim().min(1, 'Message is required'),
  model: zod.string().trim().min(1, 'Model is required'),
  files: zod.array(ZFile).optional(),
});
export type CreateConversationInput = zod.infer<typeof ZCreateConversationInput>;

export const ZProcessMessageInput = zod.object({
  message: zod.string().trim().min(1, 'Message is required'),
  model: zod.string().trim().min(1, 'Model is required'),
  files: zod.array(ZFile).optional(),
});
export type ProcessMessageInput = zod.infer<typeof ZProcessMessageInput>;

export const ZStopConversationInput = zod.object({
  stoppedAt: zod.number().int().nonnegative('Stopped at must be a non-negative integer'),
  messageIdx: zod.number().int().nonnegative('Message index must be a non-negative integer'),
  id: zod.string().trim().uuid('Conversation ID must be a valid UUID v4'),
});
export type StopConversationInput = zod.infer<typeof ZStopConversationInput>;

// Response types (no Zod needed since these are created by our code)
export type CreateConversationResult = {
  conversation: {
    id: string;
    title: string;
  };
  responseBlocks: string[];
};

export type CreateConversationResponse =
  { error: Error } |
  { error: null, createConversationResult: CreateConversationResult };

export type ProcessMessageResponse =
  { error: Error } |
  { error: null, responseBlocks: string[] };

export type StopConversationResponse =
  { error: Error } |
  { error: null, success: boolean };
