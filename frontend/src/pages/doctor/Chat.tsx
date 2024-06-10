import React, { useEffect, useRef, useState } from "react";
import Conversation from "../../chat/Doctor/Conversation";
import Message from "../../chat/Doctor/Message";
import Navbar from "../../components/doctor/Navbar/navbar";
import { FiSend } from "react-icons/fi";
import { useAppSelector } from "../../redux/store/Store";
import axiosJWT from "../../utils/axiosService";
import { CHAT_API, DOCTOR_API } from "../../constants";
import { useSocket } from "../../Context/SocketContext";

const Chat: React.FC = () => {
  const doctor = useAppSelector((state) => state.DoctorSlice);

  const [conversations, setConversations] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [receiverData, setReceiverData] = useState<string | null>(null);
  const socket = useSocket();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket?.on("getMessage", (data: any) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    socket?.on("updateLastMessage", (data: any) => {
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conversation) =>
          conversation._id === data.conversationId
            ? { ...conversation, lastMessage: data.lastMessage }
            : conversation
        );

        updatedConversations.sort(
          (a, b) =>
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
        );

        return updatedConversations;
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      if (currentChat?.members.includes(arrivalMessage.senderId)) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conversation) =>
          conversation._id === currentChat?._id
            ? { ...conversation, lastMessage: arrivalMessage }
            : conversation
        );

        updatedConversations.sort(
          (a, b) =>
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
        );

        return updatedConversations;
      });
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.emit("addUser", doctor.id);
    socket?.on("getUsers", () => {});
  }, [doctor]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axiosJWT.get(
          `${CHAT_API}/conversations/${doctor.id}`
        );
        const conversationData = response.data;

        const updatedConversations = await Promise.all(
          conversationData.map(async (conversation: any) => {
            const messagesResponse = await axiosJWT.get(
              `${CHAT_API}/messages/${conversation._id}`
            );
            const messages = messagesResponse.data.messages;
            const lastMessage = messages[messages.length - 1];
            return { ...conversation, lastMessage };
          })
        );

        updatedConversations.sort(
          (a, b) =>
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
        );

        setConversations(updatedConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    getConversations();
  }, [doctor.id]);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return;
      try {
        const response = await axiosJWT.get(
          `${CHAT_API}/messages/${currentChat._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleConversationClick = async (conversation: any) => {
    setCurrentChat(conversation);

    const id = conversation.members.find((member: any) => member !== doctor.id);

    try {
      const response = await axiosJWT.get(`${DOCTOR_API}/user/${id}`);
      setReceiverData(response.data.user);
    } catch (error) {
      console.error("Error fetching receiver details:", error);
    }

    const lastMessageResponse = await axiosJWT.get(
      `${CHAT_API}/messages/${conversation._id}`
    );
    const lastMessageData = lastMessageResponse.data.messages.slice(-1)[0];
    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.map((conv) =>
        conv._id === conversation._id
          ? { ...conv, lastMessage: lastMessageData }
          : conv
      );

      updatedConversations.sort(
        (a, b) =>
          new Date(b.lastMessage.createdAt).getTime() -
          new Date(a.lastMessage.createdAt).getTime()
      );

      return updatedConversations;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = {
      senderId: doctor.id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member: any) => member !== doctor.id
    );

    socket?.emit("sendMessage", {
      senderId: doctor.id,
      receiverId,
      text: newMessage,
      conversationId: currentChat?._id,
    });

    try {
      const response = await axiosJWT.post(`${CHAT_API}/messages`, message);
      setMessages([...messages, response.data]);
      setNewMessage("");
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conversation) =>
          conversation._id === currentChat?._id
            ? { ...conversation, lastMessage: response.data }
            : conversation
        );

        updatedConversations.sort(
          (a, b) =>
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
        );

        return updatedConversations;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col lg:flex-row">
        {/* Chat Menu */}
        <div className="w-full lg:w-1/4 bg-gray-200">
          <div className="p-4 h-full flex flex-col">

            {conversations.map((conversation, index) => (
              <div
                key={index}
                onClick={() => handleConversationClick(conversation)}
                className="cursor-pointer hover:bg-gray-300 p-2 rounded-lg"
              >
                <Conversation
                  conversation={conversation}
                  lastMessage={conversation.lastMessage}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Chat Box */}
        <div className="w-full lg:w-3/4 bg-gray-100 flex flex-col">
          <div className="flex-1 flex flex-col overflow-y-scroll p-4">
            {currentChat ? (
              <>
                {messages.map((m, index) => (
                  <div key={index} ref={scrollRef}>
                    <Message
                      message={m}
                      own={m.senderId === doctor.id}
                      receiverProfilePicture={receiverData?.profilePicture}
                      receiverName={receiverData?.name}
                    />
                  </div>
                ))}
                <div className="flex items-center mt-auto">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none resize-none"
                    placeholder="Write a message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg cursor-pointer focus:outline-none hover:bg-blue-600"
                    onClick={handleSubmit}
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-xl text-gray-400 mt-20 lg:mt-52">
                Open a chat to start conversation..
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
