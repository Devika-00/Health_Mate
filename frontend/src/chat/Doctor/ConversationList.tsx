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

        

        return () => {
        };
    }, []);

    return (
        <div>
            {conversations.map(conversation => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation} lastMessage={{
                        text: "",
                        senderId: "",
                        createdAt: ""
                    }}                />
            ))}
        </div>
    );
};

export default ConversationsList;
