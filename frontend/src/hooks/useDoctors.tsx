import { useEffect, useState } from "react";
import axiosJWT from "../utils/axiosService";
import { DoctorInterface } from "../types/DoctorInterface";
import { ADMIN_API } from "../constants";

const useDoctors = () => {
  const [doctors, setDoctors] = useState<DoctorInterface[]>([]);

  useEffect(() => {
    axiosJWT
      .get(ADMIN_API + "/doctors",{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
        }
      })
      .then(({ data }) => {
        console.log(data);
        setDoctors(data.doctors)
      })
      .catch((error: any) => console.log(error));
  }, [setDoctors]);

  return { doctors, setDoctors };
};

export default useDoctors;