import { ChatRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/chatRepositoryMongodb";
import { newMessageInterface } from "../../types/chat";

export default function chatDbRepository(
    repository: ReturnType<ChatRepositoryMongodbType>
  ) {
    
    const isChatExists = async (senderId: string, recieverId: string) =>
        repository.isChatExists(senderId, recieverId);

    const createNewChat = async (members: string[]) =>
        await repository.addNewChat(members);

    const getConversationById = async (id: string) =>
        repository.getConversationById(id);
    
    const getAllConversations = async (id: string) =>
        await repository.getChatsByMembers(id);

    const addNewMessage = async (newMessageData: newMessageInterface) =>
        await repository.addNewMessage(newMessageData);

    const getLatestMessage = async (filter: Record<string, any>) =>
        await repository.messages(filter);
    
      const getPaginatedMessage = async (conversationId:string) => await repository.paginatedMessages(conversationId);
    
    

    return {
        isChatExists,
        createNewChat,
        getConversationById,
        getAllConversations,
        addNewMessage,
        getLatestMessage,
        getPaginatedMessage,
    }

  }

  export type ChatDbRepositoryInterace = typeof chatDbRepository;