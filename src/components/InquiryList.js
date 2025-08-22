import React, { useState, useRef } from "react";
import {
    Mail,
    ChevronDown,
    ChevronUp,
    Send,
    Paperclip,
    Calendar,
} from "lucide-react";

const InquiryList = ({ inquiries = [] }) => {
    const [openThread, setOpenThread] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [allInquiries, setAllInquiries] = useState(inquiries);
    const textareaRef = useRef(null);

    const toggleThread = (id) => {
        setOpenThread(openThread === id ? null : id);
    };

    const handleReply = (inqId) => {
        if (!replyText.trim() && attachments.length === 0) return;

        setAllInquiries((prev) =>
            prev.map((inq) =>
                inq.id === inqId
                    ? {
                        ...inq,
                        messages: [
                            ...inq.messages,
                            {
                                sender: "user",
                                text: replyText,
                                date: new Date().toLocaleString(),
                                attachments,
                            },
                        ],
                        status: "Pending",
                    }
                    : inq
            )
        );

        setReplyText("");
        setAttachments([]);
        if (textareaRef.current) textareaRef.current.style.height = "40px";
    };

    const handleInputChange = (e) => {
        setReplyText(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "40px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        const fileData = files.map((file) => ({
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            url: URL.createObjectURL(file),
        }));
        setAttachments([...attachments, ...fileData]);
    };

    return (
        <div className="mb-10">
            <h3 className="flex items-center gap-2 text-2xl font-bold mb-6 text-[#8b2f2f]">
                <Mail className="w-6 h-6" /> My Inquiries
            </h3>

            {allInquiries.length > 0 ? (
                <div className="space-y-5">
                    {allInquiries.map((inq) => (
                        <div
                            key={inq.id}
                            className="bg-white border rounded-lg shadow-sm overflow-hidden"
                        >
                            {/* Compact Header */}
                            <div
                                className="flex justify-between items-center px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                                onClick={() => toggleThread(inq.id)}
                            >
                                <div>
                                    <p className="font-semibold text-lg text-gray-800">
                                        {inq.subject}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Franchise: {inq.franchise}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${inq.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : inq.status === "Replied"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {inq.status}
                                    </span>
                                    {openThread === inq.id ? (
                                        <ChevronUp className="w-5 h-5 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-600" />
                                    )}
                                </div>
                            </div>

                            {/* Expanded Email Thread */}
                            {openThread === inq.id && (
                                <div className="px-6 py-5 bg-white space-y-6 transition-all duration-300">
                                    {/* Email Header */}
                                    <div className="border-b pb-4 mb-4 text-sm text-gray-700 space-y-1">
                                        <p>
                                            <span className="font-semibold">From:</span> You
                                        </p>
                                        <p>
                                            <span className="font-semibold">To:</span> {inq.franchise}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Subject:</span>{" "}
                                            {inq.subject}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Status:</span> {inq.status}
                                        </p>
                                    </div>

                                    {/* Messages */}
                                    {inq.messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className="border-b pb-4 last:border-b-0 last:pb-0"
                                        >
                                            <div className="text-sm text-gray-600 mb-1 flex items-center gap-4">
                                                <span className="font-semibold">
                                                    {msg.sender === "user"
                                                        ? "From: You"
                                                        : `From: ${inq.franchise}`}
                                                </span>
                                                <span className="flex items-center text-gray-500">
                                                    <Calendar size={14} className="mr-1" />
                                                    {msg.date}
                                                </span>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-3 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                                                {msg.text}

                                                {/* Attachments */}
                                                {msg.attachments && msg.attachments.length > 0 && (
                                                    <div className="mt-3 space-y-1">
                                                        {msg.attachments.map((file, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex items-center gap-2 text-blue-600 text-sm"
                                                            >
                                                                <Paperclip size={16} />
                                                                <a
                                                                    href={file.url}
                                                                    download={file.name}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="hover:underline"
                                                                >
                                                                    {file.name}
                                                                </a>
                                                                <span className="text-gray-500 text-xs">
                                                                    ({file.size})
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Reply Box */}
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Reply
                                        </label>
                                        <div className="flex items-end gap-3">
                                            <textarea
                                                ref={textareaRef}
                                                rows={1}
                                                placeholder="Write your reply..."
                                                value={replyText}
                                                onChange={handleInputChange}
                                                className="flex-1 px-4 py-2 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-[#8b2f2f] min-h-[40px] max-h-[200px] overflow-y-auto"
                                            />
                                            <button
                                                onClick={() => handleReply(inq.id)}
                                                className=" flex items-center px-6 py-2 bg-[#943032ff] text-white rounded-lg 
                                                            transition-all duration-300 ease-out 
                                                            transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg 
                                                            active:scale-95"
                                            >
                                                <Send size={16}  className="mr-2"/> Send
                                            </button>
                                        </div>

                                        {/* File Upload */}
                                        <div className="flex items-center gap-3 mt-3">
                                            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                                                <Paperclip size={18} />
                                                <span className="text-sm">Attach Files</span>
                                                <input
                                                    type="file"
                                                    multiple
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            {attachments.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {attachments.map((file, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
                                                        >
                                                            {file.name} ({file.size})
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No inquiries yet.</p>
            )}
        </div>
    );
};

export default InquiryList;
