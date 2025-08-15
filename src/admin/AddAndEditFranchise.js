import React, { useState, useEffect } from "react";
import { Plus, Save, X } from "lucide-react";

const AddAndEditFranchise = ({ mode = "add", franchiseData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    owner: "",
    contact: "",
    description: "",
  });

  useEffect(() => {
    if (mode === "edit" && franchiseData) {
      setFormData(franchiseData);
    }
  }, [mode, franchiseData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-4">
        {mode === "add" ? <Plus className="text-green-600" /> : <Save className="text-blue-600" />}
        <h2 className="text-xl font-bold">
          {mode === "add" ? "Add New Franchise" : "Edit Franchise"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Franchise Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Franchise Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Owner Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Owner Name</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <X size={18} /> Cancel
          </button>
          <button
            type="submit"
            className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg transition ${
              mode === "add" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Save size={18} /> {mode === "add" ? "Save" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAndEditFranchise;
