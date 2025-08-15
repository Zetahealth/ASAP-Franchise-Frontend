import React, { useState, useMemo, useEffect } from "react";
import { Shield, Edit2, Trash2 } from "lucide-react";

const initialRoles = [
  { id: 1, roleName: "Admin", description: "Full access to the system" },
  { id: 2, roleName: "Editor", description: "Can edit content" },
  { id: 3, roleName: "Viewer", description: "Read-only access" },
  { id: 4, roleName: "Moderator", description: "Manage user comments" },
  { id: 5, roleName: "Contributor", description: "Can contribute content" },
  { id: 6, roleName: "Support", description: "Customer support role" },
];

const ITEMS_PER_PAGE = 5;

export default function SecurityAndRoles() {
  const [roles, setRoles] = useState(initialRoles);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ roleName: "", description: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Toast state
  const [toast, setToast] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!form.roleName.trim()) newErrors.roleName = "Role name is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    if (editId) {
      setRoles((prev) =>
        prev.map((r) => (r.id === editId ? { ...r, ...form } : r))
      );
      showToast("Role updated successfully!");
      setEditId(null);
    } else {
      setRoles((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);
      showToast("Role added successfully!");
    }

    setForm({ roleName: "", description: "" });
    setIsSubmitting(false);
    setCurrentPage(1);
  };

  const handleEdit = (role) => {
    setEditId(role.id);
    setForm({ roleName: role.roleName, description: role.description });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ roleName: "", description: "" });
    setErrors({});
  };

  // Open delete confirmation modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Actual delete after confirmation
  const handleDelete = () => {
    setRoles((prev) => prev.filter((r) => r.id !== deleteId));
    if (editId === deleteId) handleCancelEdit();
    setShowDeleteModal(false);
    setDeleteId(null);
    showToast("Role deleted successfully!");
  };

  const filteredRoles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return roles;
    return roles.filter(
      (r) =>
        r.roleName.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term)
    );
  }, [searchTerm, roles]);

  const totalPages = Math.ceil(filteredRoles.length / ITEMS_PER_PAGE);
  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow relative">
      <h1 className="flex items-center text-3xl font-bold text-[#8b2f2f] mb-6">
        <Shield size={50} className="mr-3" />
        Security & Roles
      </h1>

      {/* Search */}
      <div className="mb-4 max-w-md flex items-center gap-2">
        <input
          type="text"
          placeholder="Search roles by name or description..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8b2f2f]"
          aria-label="Search roles"
        />
      </div>

      {/* Role Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mb-8 max-w-md grid grid-cols-1 gap-4"
      >
        <div>
          <label htmlFor="roleName" className="block font-semibold mb-1">
            Role Name<span className="text-red-600">*</span>
          </label>
          <input
            id="roleName"
            name="roleName"
            type="text"
            value={form.roleName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.roleName ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.roleName}
            aria-describedby={errors.roleName ? "error-roleName" : undefined}
            required
          />
          {errors.roleName && (
            <p
              className="text-red-600 text-sm mt-1"
              id="error-roleName"
              role="alert"
            >
              {errors.roleName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description<span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={3}
            aria-invalid={!!errors.description}
            aria-describedby={
              errors.description ? "error-description" : undefined
            }
            required
          />
          {errors.description && (
            <p
              className="text-red-600 text-sm mt-1"
              id="error-description"
              role="alert"
            >
              {errors.description}
            </p>
          )}
        </div>

        <div className="flex space-x-4 justify-end items-center">
          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel Edit
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#8b2f2f] text-white rounded hover:bg-[#732525] transition"
          >
            {editId ? "Save Changes" : "Add Role"}
          </button>
        </div>
      </form>

      {/* Roles Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded text-left text-sm">
          <thead className="bg-[#8b2f2f] text-white">
            <tr>
              <th className="px-4 py-3">Role Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRoles.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No roles found.
                </td>
              </tr>
            ) : (
              paginatedRoles.map((role) => (
                <tr
                  key={role.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{role.roleName}</td>
                  <td className="px-4 py-3">{role.description}</td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(role)}
                      title="Edit Role"
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Edit role ${role.roleName}`}
                    >
                      <Edit2 />
                    </button>
                    <button
                      onClick={() => confirmDelete(role.id)}
                      title="Delete Role"
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete role ${role.roleName}`}
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
            aria-label="Previous Page"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-[#8b2f2f] text-white"
                  : "hover:bg-gray-100"
              }`}
              aria-label={`Page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
            aria-label="Next Page"
          >
            &gt;
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white rounded p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete Role</h3>
            <p className="mb-6">
              Are you sure you want to delete this role? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          role="alert"
          className={`fixed bottom-6 right-6 px-6 py-3 rounded shadow-lg text-white font-semibold z-50 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
