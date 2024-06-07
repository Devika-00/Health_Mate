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
import { useAppSelector } from "../../redux/store/Store";

const DocumentList = () => {
  const { id } = useParams<{ id: string }>();
  const [documents, setDocuments] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null
  );
  const user = useAppSelector((state) => state.UserSlice);

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

  const handleDelete = async () => {
    if (!selectedDocumentId) return;

    try {
      await axiosJWT.delete(`${USER_API}/documents/${selectedDocumentId}`);
      setDocuments(documents.filter((doc) => doc._id !== selectedDocumentId));
      showToast("Document deleted successfully", "success");
      setShowModal(false);
      setSelectedDocumentId(null);
    } catch (error) {
      console.error("Error deleting document:", error);
      showToast("Error deleting document", "error");
      setShowModal(false);
      setSelectedDocumentId(null);
    }
  };

  const openModal = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDocumentId(null);
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
            {user.role === "user" && (
              <button
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                onClick={() => openModal(document._id)}
              >
                <AiOutlineClose className="text-2xl" />
              </button>
            )}
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Do you want to delete the document?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
