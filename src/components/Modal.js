import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        className="bg-white rounded p-6 max-w-md w-full shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        {children}
      </div>
    </div>
  );
}
