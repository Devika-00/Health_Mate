import React from "react";
import Navbar from "../../components/user/Navbar/navbar";
import Navbars from "../../components/doctor/Navbar/navbar";
import DocumentList from "../../components/user/documentsList";
import { useAppSelector } from "../../redux/store/Store";

const DocumentListPage: React.FC = () => {
  const user = useAppSelector((state) => state.UserSlice);
  return (
    <>
     {user.role === "user" ? (
      <Navbar />):(

      <Navbars/>
      )}
      <DocumentList />
    </>
  );
};

export default DocumentListPage;
