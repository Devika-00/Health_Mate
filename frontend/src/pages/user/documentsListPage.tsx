import React from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import DocumentList from '../../components/user/documentsList';



const DocumentListPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <DocumentList/>
      <Footer />
    </>
  );
};

export default DocumentListPage;