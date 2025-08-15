import React, { useState } from "react";
import {
  Utensils,
  ShoppingCart,
  HeartPulse,
  Dumbbell,
  GraduationCap,
  Baby,
  Wrench,
  Car,
  Briefcase,
  Home as IndustryHome,
  Plane,
  Clapperboard,
  PawPrint,
  Truck,
  Banknote,
  Brush,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

const initialServices = [
  { id: 1, icon: <Utensils size={20} />, name: "Food & Beverage", description: "Restaurants, cafes, and catering businesses." },
  { id: 2, icon: <ShoppingCart size={20} />, name: "Retail & Convenience", description: "Shops, kiosks, and convenience stores." },
  { id: 3, icon: <HeartPulse size={20} />, name: "Health & Wellness", description: "Clinics, spas, and wellness centers." },
  { id: 4, icon: <Dumbbell size={20} />, name: "Fitness & Gym Centers", description: "Gyms, yoga studios, and fitness franchises." },
  { id: 5, icon: <GraduationCap size={20} />, name: "Education & Training", description: "Tutoring, training, and skill development." },
  { id: 6, icon: <Baby size={20} />, name: "Children & Kids Services", description: "Daycare, after-school programs, and more." },
];

export default function ServiceManagement() {
  const [services, setServices] = useState(initialServices);
  const [form, setForm] = useState({ id: null, name: "", description: "", icon: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description) return;

    if (isEditing) {
      setServices((prev) =>
        prev.map((s) => (s.id === form.id ? { ...s, name: form.name, description: form.description } : s))
      );
      setIsEditing(false);
    } else {
      setServices((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: form.name,
          description: form.description,
          icon: <Brush size={20} />, // default icon if none selected
        },
      ]);
    }
    setForm({ id: null, name: "", description: "", icon: "" });
  };

  const handleEdit = (service) => {
    setForm(service);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Management</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Service Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditing ? "Update Service" : "Add Service"} <Plus size={18} />
          </button>
        </div>
      </form>

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Icon</th>
              <th className="p-3 border">Service Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="p-3 border">{service.icon}</td>
                <td className="p-3 border">{service.name}</td>
                <td className="p-3 border">{service.description}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No services available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
