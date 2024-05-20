import React, { useEffect, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { DOCTOR_API, USER_API } from "../../constants";

interface ConversationProps {
    conversation: {
        _id: string;
        createdAt: string;
        members: string[];
        updatedAt: string;
        __v: number;
    };
    lastMessage: {
        text: string;
    };
}

const Conversation: React.FC<ConversationProps> = ({ conversation,lastMessage }) => {
    const [userData, setUserData] = useState<any>({});
    

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const userId = conversation.members[0];
                const response = await axiosJWT.get(`${DOCTOR_API}/user/${userId}`);
                console.log(response,"usersssss");
                setUserData(response.data.user);
            } catch (error) {
                console.error("Error fetching doctor data:", error);
            }
        };

        fetchDoctorData();
    }, [conversation]);


    return (
        <div className="bg-white rounded-lg shadow-md p-2 flex flex-col mb-1">
            <div className="flex items-center">
                <img
                    className="w-14 h-14 rounded-full object-cover mr-4"
                    src={userData.profilePicture} 
                    alt="Doctor Profile"
                />
                <div className="flex flex-col">
                    <span className="font-medium">{userData.name}</span>
                    <span className="text-gray-500 text-sm">{lastMessage?.text}</span>
                </div>
            </div>
        </div>
    );
};


export default Conversation;
