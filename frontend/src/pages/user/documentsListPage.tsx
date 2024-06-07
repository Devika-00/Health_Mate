import React from "react";
import Navbar from "../../components/user/Navbar/navbar";

import DocumentList from "../../components/user/documentsList";

const DocumentListPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <DocumentList />
    </>
  );
};

export default DocumentListPage;
