import React, { useEffect, useRef, useState } from "react";
import Conversation from "../../chat/Doctor/Conversation";
import Message from "../../chat/Doctor/Message";
import Navbar from "../../components/doctor/Navbar/navbar";
import { FiSend } from "react-icons/fi";
import { useAppSelector } from "../../redux/store/Store";
import axiosJWT from "../../utils/axiosService";
import { CHAT_API, DOCTOR_API } from "../../constants";
import { io } from "socket.io-client";

const Chat: React.FC = () => {
  const doctor = useAppSelector((state) => state.DoctorSlice);

  const [conversations, setConversations] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setarrivalMessage] = useState<any>(null);
  const [receiverData, setReceiverData] = useState<string | null>(null);
  const socket = useRef<any>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.on("getMessage", (data: any) => {
      setarrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);

    if (arrivalMessage) {
      setConversations((prevConversations) =>
        prevConversations.map((conversation) =>
          conversation._id === currentChat?._id
            ? { ...conversation, lastMessage: arrivalMessage }
            : conversation
        )
      );
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", doctor.id);
    socket.current.on("getUsers", (doctors: any) => {
      console.log(doctors, "hellooooo");
    });
  }, [doctor]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axiosJWT.get(
          `${CHAT_API}/conversations/${doctor.id}`
        );
        const conversationData = response.data;

        // Fetch the last message for each conversation
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

        setConversations(updatedConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    getConversations();
  }, [doctor.id]);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return; // Check if currentChat is defined
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
    // Fetch receiver details
    const id = conversation.members.find(
        (member: any) => member !== doctor.id
    );

    try {
        const response = await axiosJWT.get(`${DOCTOR_API}/user/${id}`);
        console.log(response, "response"); // Check response in console
        setReceiverData(response.data.user); // Assuming the profile picture URL is stored in `profilePicture`
    } catch (error) {
        console.error("Error fetching receiver details:", error);
        // Handle error: Log or display error message
    }
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

    socket.current.emit("sendMessage", {
      senderId: doctor.id,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await axiosJWT.post(`${CHAT_API}/messages`, message);
      setMessages([...messages, response.data]);
      setNewMessage("");
      setConversations((prevConversations) =>
        prevConversations.map((conversation) =>
          conversation._id === currentChat?._id
            ? { ...conversation, lastMessage: response.data }
            : conversation
        )
      );
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
      <div className="h-[664px] flex">
        {/* Chat Menu */}
        <div className="w-1/4 bg-gray-200">
          <div className="p-4 h-full flex flex-col">
            {/* Search Bar */}
            <div className="mb-4 relative">
              <input
                placeholder="Search for friends"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 15l5.79 5.79M4 11a7 7 0 017-7 7 7 0 017 7 7 7 0 01-7 7 7 7 0 01-7-7z"
                />
              </svg>
            </div>

            {conversations.map((conversation, index) => (
              <div
                key={index}
                onClick={() => handleConversationClick(conversation)}
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
        <div className="w-3/4 bg-gray-100">
          <div className="flex flex-col h-full">
            <div className="h-full overflow-y-scroll pr-4">
              {currentChat ? (
                <>
                  {messages.map((m, index) => (
                    <div className="flex-1" key={index} ref={scrollRef}>
                      <Message message={m} own={m.senderId === doctor.id}  receiverProfilePicture={receiverData?.profilePicture} receiverName={receiverData?.name} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="absolute top-10% text-5xl text-gray-400 cursor-default mt-52 ml-40">
                  Open a chat to start conversation..
                </div>
              )}
            </div>
            <div className="flex items-center mt-2">
              <textarea
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none ml-4 mb-5 "
                placeholder="Write a message..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button
                className="ml-2 mb-5 mr-5 px-5  py-3 bg-blue-500 text-white rounded-md cursor-pointer focus:outline-none hover:bg-blue-600"
                onClick={handleSubmit}
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
