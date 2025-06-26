// 'use server';

// import { v4 as uuidV4 } from 'uuid';

// import { getCurrentUser } from '@/actions/users';
// import { getClient } from '@/actions/utils/redis';

// import {
//   type Conversation,
//   type ConversationDetail,
//   type CreateConversationInput,
//   type CreateConversationResponse,
//   type Message,
//   type UserConversations,
//   ZCreateConversationInput,
// } from './conversations.types';
// import processMessage from './process-message';

// const createConversation = async (input: CreateConversationInput): Promise<CreateConversationResponse> => {
//   let response: CreateConversationResponse;

//   try {
//     const validatedInput = ZCreateConversationInput.parse(input);

//     // Get current user
//     const userData = await getCurrentUser();
//     if (userData.error) {
//       throw userData.error;
//     }

//     const redisClient = await getClient();
//     if (redisClient === null) {
//       throw new Error('Redis client is not connected.');
//     }

//     // Generate conversation ID and title
//     const conversationId = uuidV4();
//     const conversationTitle = validatedInput.message.length > 100
//       ? `${validatedInput.message.substring(0, 100)} ...`
//       : validatedInput.message;

//     const conversation: Conversation = {
//       id: conversationId,
//       lastViewed: Date.now(),
//       title: conversationTitle,
//     };
//     const userMessage: Message = {
//       from: 'user',
//       model: validatedInput.model,
//       files: validatedInput.files || [],
//       blocks: [validatedInput.message],
//       wasStopped: false,
//     };

//     // Process message to get agent response
//     const processResult = await processMessage({
//       message: validatedInput.message,
//       model: validatedInput.model,
//       files: validatedInput.files,
//     });

//     if (processResult.error) {
//       throw processResult.error;
//     }

//     // Create agent message
//     const agentMessage: Message = {
//       from: 'agent',
//       model: validatedInput.model,
//       files: [],
//       blocks: processResult.responseBlocks || [],
//       wasStopped: false,
//     };

//     // Create conversation detail
//     const conversationDetail: ConversationDetail = {
//       lastViewed: new Date().getTime(),
//       messages: [userMessage, agentMessage],
//     };

//     // Save conversation detail to Redis
//     const conversationDetailStatus = await redisClient.json.set(
//       conversationId,
//       '$',
//       conversationDetail,
//     );
//     if (conversationDetailStatus !== 'OK') {
//       throw new Error(`Failed to save conversation detail. Response: ${conversationDetailStatus}`);
//     }

//     // Update user's conversations list
//     const userConversationsKey = userData.user.id;
//     const existingUserConversations = await redisClient.json.get(userConversationsKey);

//     let userConversations: UserConversations;
//     if (existingUserConversations === null) {
//       userConversations = { conversations: [conversation] };
//     } else {
//       userConversations = {
//         conversations: [...(existingUserConversations as UserConversations).conversations || [], conversation],
//       };
//     }

//     const userConversationsStatus = await redisClient.json.set(
//       userConversationsKey,
//       '$',
//       userConversations,
//     );
//     if (userConversationsStatus !== 'OK') {
//       throw new Error(`Failed to update user conversations. Response: ${userConversationsStatus}`);
//     }

//     response.createConversationResult = {
//       conversation: {
//         id: conversationId,
//         title: conversationTitle,
//       },
//       responseBlocks: processResult.responseBlocks || [],
//     };
//   } catch (error) {
//     console.error('Error creating conversation.', error);
//     response.error = new Error('Error creating conversation.');
//   }

//   console.info('createConversation', 'response', response, 'input', input);
//   return response;
// };

// export default createConversation;
