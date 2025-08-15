import React, { useState } from "react";
import { MailCheck, Edit, Save, X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UpdateMailTemplates = () => {
  const [adminEmail, setAdminEmail] = useState("admin@asapfranchise.com");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState(adminEmail);

  const [templates, setTemplates] = useState([
    { id: 1, name: "Welcome Email", subject: "Welcome to ASAP Franchise!", body: "<p>Hi {{name}},</p><p>Welcome to our family!</p>" },
    { id: 2, name: "Password Reset", subject: "Reset Your ASAP Franchise Password", body: "<p>Hi {{name}},</p><p>Click below to reset your password:</p>" },
    { id: 3, name: "Franchise Inquiry Response", subject: "Thanks for Your Inquiry", body: "<p>Hi {{name}},</p><p>Thank you for your interest. We will contact you soon.</p>" }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editedSubject, setEditedSubject] = useState("");
  const [editedBody, setEditedBody] = useState("");

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setEditedSubject(template.subject);
    setEditedBody(template.body);
  };

  const handleCancelTemplateEdit = () => {
    setSelectedTemplate(null);
    setEditedSubject("");
    setEditedBody("");
  };

  const handleSaveTemplate = () => {
    if (!editedSubject.trim() || !editedBody.trim()) {
      alert("Please fill in both subject and body");
      return;
    }
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === selectedTemplate.id
          ? { ...t, subject: editedSubject, body: editedBody }
          : t
      )
    );
    alert("Template updated successfully!");
    handleCancelTemplateEdit();
  };

  const handleSaveEmail = () => {
    if (!newEmail.includes("@") || !newEmail.includes(".")) {
      alert("Please enter a valid email address");
      return;
    }
    setAdminEmail(newEmail);
    alert("Admin email updated successfully!");
    setIsEmailModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MailCheck size={36} className="text-[#8b2f2f]" />
          <h1 className="text-2xl font-bold text-[#8b2f2f]">Update Mail Templates</h1>
        </div>

        {/* Change Email Button */}
        <button
          onClick={() => setIsEmailModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Mail size={18} /> Change Admin Email
        </button>
      </div>

      {/* Current Email */}
      <p className="mb-4 text-gray-700">
        <strong>Current Admin Email:</strong> {adminEmail}
      </p>

      {/* Templates Table */}
      {!selectedTemplate ? (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#8b2f2f] text-white text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Template Name</th>
                <th className="px-6 py-3">Subject</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.length > 0 ? (
                templates.map((template) => (
                  <tr key={template.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">{template.name}</td>
                    <td className="px-6 py-4 truncate max-w-sm">{template.subject}</td>
                    <td className="px-6 py-4 flex justify-center">
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                      >
                        <Edit size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                    No templates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Edit Template Form */
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-lg font-semibold mb-4 text-[#8b2f2f]">
            Editing: {selectedTemplate.name}
          </h2>

          <label className="block mb-2 text-sm font-medium text-gray-700">Email Subject</label>
          <input
            type="text"
            value={editedSubject}
            onChange={(e) => setEditedSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-[#8b2f2f]"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Email Body (HTML allowed)</label>
          <textarea
            rows="6"
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#8b2f2f] font-mono"
          />

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={handleCancelTemplateEdit}
              className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              <X size={16} /> Cancel
            </button>
            <button
              onClick={handleSaveTemplate}
              className="flex items-center gap-1 px-4 py-2 bg-[#8b2f2f] text-white rounded-lg hover:bg-red-800"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Gmail-style Slide Down Email Modal */}
      <AnimatePresence>
        {isEmailModalOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEmailModalOpen(false)}
            />
            {/* Sliding Modal */}
            <motion.div
              className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white rounded-b-lg shadow-lg z-50 p-6"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h2 className="text-xl font-semibold text-[#8b2f2f] mb-4 flex items-center gap-2">
                <Mail size={20} /> Change Admin Email
              </h2>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
                placeholder="Enter new email"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEmailModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEmail}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
              {/* Close Icon */}
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpdateMailTemplates;
