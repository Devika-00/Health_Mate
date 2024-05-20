import React, { useEffect, useState } from "react";
import {
  AiOutlineFilePdf,
  AiOutlineFileImage,
  AiOutlineClose,
} from "react-icons/ai";
import axiosJWT from "../../utils/axiosService";
import { useParams } from "react-router-dom";
import { USER_API } from "../../constants";
import showToast from "../../utils/toaster"; // Assuming you have a toast utility for notifications

const DocumentList = () => {
  const { id } = useParams<{ id: string }>();
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/documents/${id}`);
        setDocuments(response.data.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [id]);

  const handleDelete = async (documentId: string) => {
    try {
      await axiosJWT.delete(`${USER_API}/documents/${documentId}`);
      setDocuments(documents.filter((doc) => doc._id !== documentId));
      showToast("Document deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting document:", error);
      showToast("Error deleting document", "error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((document, index) => (
          <div
            key={index}
            className="relative border rounded-lg shadow-lg overflow-hidden"
          >
            <button
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              onClick={() => handleDelete(document._id)}
            >
              <AiOutlineClose className="text-2xl" />
            </button>
            <div className="p-4 bg-gray-200">
              <h2 className="text-lg font-semibold mb-2">
                {document.fileName}
              </h2>
              <div className="h-64 overflow-hidden">
                {document.fileData.endsWith(".pdf") ? (
                  <div className="flex justify-center items-center h-full">
                    <AiOutlineFilePdf className="text-9xl text-red-600" />
                  </div>
                ) : (
                  <img
                    src={document.fileData}
                    alt={document.fileName}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <a
                href={document.fileData}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-blue-500 hover:underline"
              >
                View Document
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
