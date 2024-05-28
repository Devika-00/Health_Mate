import React, { useEffect, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";
import Conversation from "./Conversation";

const ConversationsList: React.FC = () => {
    const [conversations, setConversations] = useState<any[]>([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axiosJWT.get(`${USER_API}/conversations`);
                const sortedConversations = response.data.conversations.sort((a: any, b: any) => {
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                });
                setConversations(sortedConversations);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };

        fetchConversations();
    }, []);

    useEffect(() => {
        const handleNewMessage = (newMessage: any) => {
            setConversations(prevConversations => {
                const updatedConversations = prevConversations.map(conversation => {
                    if (conversation._id === newMessage.conversationId) {
                        return {
                            ...conversation,
                            lastMessage: newMessage,
                            updatedAt: newMessage.createdAt,
                        };
                    }
                    return conversation;
                });
                return updatedConversations.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            });
        };

        // Assuming you have a websocket or similar mechanism to receive new messages
        // websocket.on("newMessage", handleNewMessage);

        return () => {
            // Clean up the websocket listener
            // websocket.off("newMessage", handleNewMessage);
        };
    }, []);

    return (
        <div>
            {conversations.map(conversation => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                />
            ))}
        </div>
    );
};

export default ConversationsList;
