// 'use server';

// import { getCurrentUser } from '@/actions/users';
// import { getClient } from '@/actions/utils/redis';

// import {
//   type StopConversationInput,
//   type StopConversationResponse,
//   ZConversationDetail,
//   ZStopConversationInput,
// } from './conversations.types';

// const stopConversation = async (input: StopConversationInput): Promise<StopConversationResponse> => {
//   const response: StopConversationResponse = {
//     error: null,
//   };

//   try {
//     // Validate input
//     const validatedInput = ZStopConversationInput.parse(input);

//     // Get current user
//     const userData = await getCurrentUser();
//     if (userData.error) {
//       throw userData.error;
//     }

//     const redisClient = await getClient();
//     if (redisClient === null) {
//       throw new Error('Redis client is not connected.');
//     }

//     // Get conversation detail
//     const conversationDetail = await redisClient.json.get(validatedInput.id);
//     if (conversationDetail === null) {
//       throw new Error('Conversation not found.');
//     }

//     // Validate conversation detail
//     const validatedConversationDetail = ZConversationDetail.parse(conversationDetail);

//     // Check if message index is valid
//     if (validatedInput.messageIdx >= validatedConversationDetail.messages.length) {
//       throw new Error('Invalid message index.');
//     }

//     // Get the message to stop
//     const messageToStop = validatedConversationDetail.messages[validatedInput.messageIdx];
//     if (messageToStop.from !== 'agent') {
//       throw new Error('Can only stop agent messages.');
//     }

//     // Remove text blocks after stoppedAt and set wasStopped to true
//     const updatedBlocks = messageToStop.blocks.slice(0, validatedInput.stoppedAt + 1);
//     messageToStop.blocks = updatedBlocks;
//     messageToStop.wasStopped = true;

//     // Update the conversation in Redis
//     const updateStatus = await redisClient.json.set(
//       validatedInput.id,
//       '$',
//       validatedConversationDetail,
//     );
//     if (updateStatus !== 'OK') {
//       throw new Error(`Failed to update conversation. Response: ${updateStatus}`);
//     }

//     response.success = true;
//   } catch (error) {
//     console.error('Error stopping conversation.', error);
//     response.error = new Error('Error stopping conversation.');
//   }

//   console.info('stopConversation', 'response', response, 'input', input);
//   return response;
// };

// export default stopConversation;
