import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    country: "us",
    phone: "",
    avatar: user?.avatar || null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        country: user.country || "us",
        phone: user.phone || "",
        avatar: user.avatar || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: previewURL, avatarFile: file });
    }
  };

  const handleSave = () => {
    onSave(formData); // pass updated data back
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              formData.avatar ||
              "https://via.placeholder.com/100?text=No+Avatar"
            }
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border mb-3"
          />
          <label className="cursor-pointer bg-gray-100 px-3 py-1 rounded-md text-sm hover:bg-gray-200">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium mb-1">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="us">United States</option>
            <option value="in">India</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            {/* You can reuse your countryList here */}
          </select>
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-6"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
