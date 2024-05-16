import React from "react";
import { format } from "timeago.js";

interface MessageProps {
  message?: {
    text: string;
    createdAt: string;
  };
  own: boolean;
}

const Message: React.FC<MessageProps> = ({ message, own }) => {
  return (
    <div className={`message flex flex-col mt-4 ml-5 ${own ? "items-end" : "items-start"}`}>
      <div className="flex">
        <img
          className="w-8 h-8 rounded-full object-cover mr-2"
          src="https://via.placeholder.com/40"
          alt="User"
        />
        <p className={`messageText p-2 rounded-lg ${own ? "bg-blue-500 text-white": "bg-gray-300 text-black"}`}>
          {message?.text}
        </p>
      </div>
      <div className="text-xs mt-1">
        {message?.createdAt ? format(message.createdAt) : ""}
      </div>
    </div>
  );
};

export default Message;
