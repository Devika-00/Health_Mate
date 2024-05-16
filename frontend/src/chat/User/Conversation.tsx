import React, { useEffect, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";

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
    const [doctorData, setDoctorData] = useState<any>({});
    

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const doctorId = conversation.members[1];
                const response = await axiosJWT.get(`${USER_API}/doctor/${doctorId}`);
                setDoctorData(response.data.doctor);
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
              src={doctorData.profileImage} 
              alt="Doctor Profile"
          />
          <span className="font-medium">{doctorData.doctorName}</span>
      </div>
  );
};


export default Conversation;
