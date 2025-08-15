import React, { useState } from "react";
import { FileText, Upload, Trash2, Eye } from "lucide-react";

function RelatedDocuments() {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Franchise Agreement.pdf", type: "PDF", uploadedBy: "Admin", date: "2025-08-10" },
    { id: 2, name: "Training Guide.docx", type: "DOCX", uploadedBy: "John Doe", date: "2025-08-09" },
  ]);

  const [newFile, setNewFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: documents.length + 1,
        name: file.name,
        type: file.name.split(".").pop().toUpperCase(),
        uploadedBy: "Current Admin",
        date: new Date().toISOString().split("T")[0],
      };
      setDocuments([...documents, newDoc]);
      setNewFile(null);
    }
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#8b2f2f] mb-6 flex items-center gap-3">
        <FileText size={36} />
        Related Documents
      </h1>

      {/* Upload Section */}
      <div className="bg-gray-100 p-6 rounded-xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <label className="flex items-center gap-3 cursor-pointer bg-[#8b2f2f] text-white px-5 py-3 rounded-lg hover:bg-red-700 transition">
          <Upload size={20} />
          Upload Document
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        <span className="text-gray-600 text-sm">Accepted formats: PDF, DOCX, XLSX</span>
      </div>

      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-[#8b2f2f] text-white">
            <tr>
              <th className="px-6 py-3 text-left">Document Name</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Uploaded By</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{doc.name}</td>
                <td className="px-6 py-4">{doc.type}</td>
                <td className="px-6 py-4">{doc.uploadedBy}</td>
                <td className="px-6 py-4">{doc.date}</td>
                <td className="px-6 py-4 flex items-center justify-center gap-4">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => alert(`Previewing ${doc.name}`)}
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}

            {documents.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No documents uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RelatedDocuments;
