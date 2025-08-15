import React, { useState } from "react";
import { Eye, Trash2, Mail, X, Send, Paperclip } from "lucide-react";

const MessagesInquiries = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Franchise inquiry",
      date: "2025-08-10",
      status: "Unread",
      body: "Hello, I am interested in learning more about your franchise opportunities. Could you send me more details?"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Need more info",
      date: "2025-08-09",
      status: "Read",
      body: "Hi, I need more details regarding the investment requirements for your franchise."
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handleView = (message) => {
    setSelectedMessage(message);
    setReplyText("");
    setAttachments([]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendReply = () => {
    alert(
      `Reply sent to: ${selectedMessage.email}\nMessage: ${replyText}\nAttachments: ${attachments.map(
        (file) => file.name
      ).join(", ")}`
    );
    setReplyText("");
    setAttachments([]);
    setSelectedMessage(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-screen">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <Mail size={36} className="text-[#8b2f2f]" />
        <h1 className="text-2xl font-bold text-[#8b2f2f]">Messages & Inquiries</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-[#8b2f2f] text-white text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <tr
                  key={msg.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{msg.name}</td>
                  <td className="px-6 py-4">{msg.email}</td>
                  <td className="px-6 py-4">{msg.subject}</td>
                  <td className="px-6 py-4">{msg.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        msg.status === "Unread"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleView(msg)}
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Gmail-style Popup */}
      {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-bold text-[#8b2f2f]">
                {selectedMessage.subject}
              </h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message Info */}
            <div className="p-4 border-b">
              <p className="font-semibold">{selectedMessage.name}</p>
              <p className="text-sm text-gray-500">{selectedMessage.email}</p>
              <p className="text-xs text-gray-400">{selectedMessage.date}</p>
            </div>

            {/* Message Body */}
            <div className="p-4 flex-1 overflow-y-auto">
              <p className="text-gray-700">{selectedMessage.body}</p>
            </div>

            {/* Reply Box */}
            <div className="border-t p-4 bg-gray-50">
              <textarea
                rows="3"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#8b2f2f] resize-none"
              />

              {/* Attachment Preview */}
              {attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded"
                    >
                      <span className="text-sm truncate">{file.name}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-3 flex justify-between items-center">
                {/* Attach Button */}
                <label className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                  <Paperclip size={18} />
                  <span className="text-sm">Attach files</span>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>

                {/* Send Button */}
                <button
                  onClick={handleSendReply}
                  className="flex items-center gap-2 bg-[#8b2f2f] text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
                >
                  <Send size={16} /> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesInquiries;
