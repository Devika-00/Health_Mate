import React, { useState } from 'react';

const UploadForm = () => {
    const [documents, setDocuments] = useState([
        { name: 'Blood Test Report', file: null },
        { name: 'X-ray Scan', file: null }
    ]);

    const handleNameChange = (index: number, value: string) => {
        const updatedDocuments = [...documents];
        updatedDocuments[index].name = value;
        setDocuments(updatedDocuments);
    };

    const handleFileChange = (index: number, file: any) => {
        const updatedDocuments = [...documents];
        updatedDocuments[index].file = file;
        setDocuments(updatedDocuments);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log('Form submitted');
    };

    const addDocument = () => {
        setDocuments([...documents, { name: '', file: null }]);
    };

    const removeDocument = (index:number) => {
        const updatedDocuments = [...documents];
        updatedDocuments.splice(index, 1);
        setDocuments(updatedDocuments);
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Upload Lab Documents</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {documents.map((document, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor={`docName${index}`} className="block text-sm font-medium text-gray-700">Document Name:</label>
                            {index > 0 && (
                                <button type="button" onClick={() => removeDocument(index)} className="text-red-500 font-bold">Remove</button>
                            )}
                        </div>
                        <input 
                            type="text" 
                            id={`docName${index}`} 
                            name={`docName${index}`} 
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                            value={document.name} 
                            onChange={(e) => handleNameChange(index, e.target.value)} 
                            required 
                        />
                        <input 
                            type="file" 
                            id={`docFile${index}`} 
                            name={`docFile${index}`} 
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" 
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                            onChange={(e) => handleFileChange(index, e.target.files[0])} 
                            required 
                        />
                    </div>
                ))}
                <button type="button" onClick={addDocument} className="w-full bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300">Add Document</button>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Upload</button>
            </form>
            <div id="uploadStatus" className="mt-4 text-center">Upload status will be shown here</div>
        </div>
    );
};

export default UploadForm;
