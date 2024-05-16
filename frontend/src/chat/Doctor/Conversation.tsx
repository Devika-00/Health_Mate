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
}

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
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
      <div className="bg-white rounded-lg shadow-md p-2 flex items-center mb-1">
          <img
              className="w-14 h-14 rounded-full object-cover mr-4"
              src={userData.profilePicture} 
              alt="Doctor Profile"
          />
          <span className="font-medium">{userData.name}</span>
      </div>
  );
};


export default Conversation;
