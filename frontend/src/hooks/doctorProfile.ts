import { useEffect, useState, ChangeEvent } from "react";
import axiosJWT from "../utils/axiosService";
import showToast from "../utils/toaster";
import { DoctorInterface } from "../types/DoctorInterface";
import { DOCTOR_API, nameRegex, phoneRegex } from "../constants";
import { uploadImagesToCloudinary, uploadCertificateToCloudinary } from "../Api/uploadImages"; // Import named exports individually
import axios from "axios";

axios.defaults.withCredentials = true;

const doctorProfile = () => {
  const [profile, setProfile] = useState<DoctorInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    doctorName: string;
    gender: string;
    email: string;
    age: number | null;
    phoneNumber: string;
    department: string;
    education: string;
    status: string;
    description: string;
    experience:string;
    imageFile: File | null;
    lisenceCertificate: File | null;
  }>({
    doctorName: "",
    gender: "",
    email: "",
    age: null,
    department: "",
    description: "",
    experience: "",
    phoneNumber: "",
    education: "",
    status:"pending",
    imageFile: null,
    lisenceCertificate: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [certificatePreview, setCertificatePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(DOCTOR_API + "/profile", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
        }
      })
      .then(({ data }) => {
        const { doctor } = data;
        setProfile(doctor);
        console.log(doctor);
        setFormData((prev) => ({
          ...prev,
          doctorName: doctor?.doctorName,
          age: doctor?.age,
          gender: doctor?.gender,
          department: doctor?.department,
          description: doctor?.description,
          education: doctor?.education,
          email: doctor?.email,
          phoneNumber: doctor?.phoneNumber,
          experience:doctor?.experience,
          lisenceCertificate: doctor?.lisenceCertificate,
          status:doctor?.status
        }));
      })
      .catch(() => showToast("Oops! Something went wrong", "error"));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "imageFile" || name === "lisenceCertificate") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (name === "imageFile") setImagePreview(reader.result as string);
          else setCertificatePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setFormData((prev) => ({
          ...prev,
          [name]: file, 
        }));
      }
    } else {
      if (name === "name") {
        if (!value.trim()) {
          errorMessage = "Name is required";
        } else if (!nameRegex.test(value)) {
          errorMessage = "First letter must be capital and no leading or trailing space";
        }
      } else if (name === "age") {
        const ageValue = parseInt(value, 10);
        if (isNaN(ageValue) || ageValue < 0) {
          errorMessage = "Age must be a positive number";
        }
      } else if (name === "phoneNumber") {
        if (!value.trim()) {
          errorMessage = "Phone number is required";
        } else if (!phoneRegex.test(value)) {
          errorMessage = "Phone number must have 10 numbers";
        }
      }
      setFormData((prev) => ({
        ...prev,
        [name]: name === "age" ? parseInt(value, 10) : value,
      }));
    }

    setError(errorMessage);
  };

  const handleSubmit = async () => {
    if (!error) {
      setIsSubmitting(true);
      try {
        const imageUrl = await uploadImagesToCloudinary(formData.imageFile);
        const certificateUrl = await uploadCertificateToCloudinary(formData.lisenceCertificate);

        const response = await axiosJWT.patch(DOCTOR_API + "/profile/edit", {
          doctorName: formData.doctorName,
          gender: formData.gender,
          age: formData.age,
          phoneNumber: formData.phoneNumber,
          department: formData.department,
          education: formData.education,
          description: formData.description,
          experience:formData.experience,
          profileImage: imageUrl || profile?.profileImage,
          lisenceCertificate: certificateUrl || profile?.lisenceCertificate,
        }, { headers:{
          'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
        } });

        showToast(response.data.message);
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        showToast("Oops! Something went wrong while updating profile", "error");
      }
    }
  };

  const handleVerify = () => {
    setIsVerified(true);
  };

  return {
    profile,
    formData,
    imagePreview,
    certificatePreview,
    error,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    handleVerify,
  };
};

export default doctorProfile;
