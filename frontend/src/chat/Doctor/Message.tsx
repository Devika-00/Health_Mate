import React from "react";
import { format } from "timeago.js";

interface MessageProps {
  message?: {
    text: string;
    createdAt: string;
  };
  own: boolean;
  receiverProfilePicture: string;
  receiverName:string;
}

const Message: React.FC<MessageProps> = ({ message, own, receiverProfilePicture, receiverName }) => {
  return (
    <div className={`message flex flex-col mt-2 ml-5 ${own ? "items-end" : "items-start"}`}>
      <div className="fixed top-0 left-0 w-3/4 ml-96 mt-16 h-15 bg-gray-200 flex items-center justify-between p-4 ">
            <div className="flex items-center">
                <img src={receiverProfilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                <span className="text-xl font-bold">{receiverName}</span>
            </div>
        </div>
      <div className="flex">
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
