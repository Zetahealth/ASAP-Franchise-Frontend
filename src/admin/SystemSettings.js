import React, { useState, useEffect } from "react";
import { Settings, Edit2, Trash2, Plus } from "lucide-react";
import Modal from "../components/Modal"; // Your modal component

// Sample settings with types and options for select type
const initialSettings = [
  { id: 1, key: "Site Title", value: "ASAP Franchise", type: "text" },
  {
    id: 2,
    key: "Default Language",
    value: "English",
    type: "select",
    options: ["English", "Spanish", "French", "Hindi"],
  },
  { id: 3, key: "Timezone", value: "UTC+5:30", type: "text" },
  { id: 4, key: "Maintenance Mode", value: false, type: "boolean" },
];

export default function SystemSettings() {
  const [settings, setSettings] = useState(initialSettings);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [editKey, setEditKey] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editType, setEditType] = useState("text");
  const [editOptions, setEditOptions] = useState(""); // comma-separated string for select options

  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newType, setNewType] = useState("text");
  const [newOptions, setNewOptions] = useState("");

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter & paginate
  const filteredSettings = settings.filter(
    (s) =>
      s.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof s.value === "string" &&
        s.value.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof s.value === "boolean" && String(s.value).includes(searchTerm))
  );

  const totalPages = Math.ceil(filteredSettings.length / itemsPerPage);
  const paginatedSettings = filteredSettings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [totalPages, currentPage]);

  // Start editing a setting
  function startEdit(setting) {
    setEditId(setting.id);
    setEditKey(setting.key);
    setEditValue(setting.value);
    setEditType(setting.type);
    setEditOptions(
      setting.type === "select" && setting.options
        ? setting.options.join(", ")
        : ""
    );
  }

  // Cancel editing
  function cancelEdit() {
    setEditId(null);
    setEditKey("");
    setEditValue("");
    setEditOptions("");
    setEditType("text");
  }

  // Validate edited setting
  function validateEdit() {
    if (!editKey.trim()) {
      setToast({ type: "error", message: "Key cannot be empty." });
      return false;
    }
    // Check duplicate key except current edited id
    const duplicate = settings.find(
      (s) =>
        s.key.toLowerCase() === editKey.trim().toLowerCase() && s.id !== editId
    );
    if (duplicate) {
      setToast({ type: "error", message: "Key already exists." });
      return false;
    }
    if (
      (editType === "text" || editType === "select") &&
      (editValue === null || editValue === "")
    ) {
      setToast({ type: "error", message: "Value cannot be empty." });
      return false;
    }
    if (editType === "select" && !editOptions.trim()) {
      setToast({ type: "error", message: "Select options required." });
      return false;
    }
    return true;
  }

  // Save edit
  function saveEdit() {
    if (!validateEdit()) return;

    let newOptionsArray = [];
    if (editType === "select") {
      newOptionsArray = editOptions
        .split(",")
        .map((opt) => opt.trim())
        .filter(Boolean);
      if (!newOptionsArray.length) {
        setToast({ type: "error", message: "At least one option required." });
        return;
      }
    }

    setSettings((prev) =>
      prev.map((s) =>
        s.id === editId
          ? {
              ...s,
              key: editKey.trim(),
              value:
                editType === "boolean"
                  ? Boolean(editValue)
                  : editValue,
              type: editType,
              options: editType === "select" ? newOptionsArray : undefined,
            }
          : s
      )
    );
    setToast({ type: "success", message: "Setting updated successfully." });
    cancelEdit();
  }

  // Prompt delete modal
  function promptDelete(id) {
    setDeleteId(id);
    setShowConfirmDelete(true);
  }

  // Confirm delete
  function confirmDelete() {
    setSettings((prev) => prev.filter((s) => s.id !== deleteId));
    setShowConfirmDelete(false);
    setDeleteId(null);
    setToast({ type: "success", message: "Setting deleted." });
  }

  // Validate new setting
  function validateNew() {
    if (!newKey.trim()) {
      setToast({ type: "error", message: "Key cannot be empty." });
      return false;
    }
    if (settings.find((s) => s.key.toLowerCase() === newKey.trim().toLowerCase())) {
      setToast({ type: "error", message: "Key already exists." });
      return false;
    }
    if ((newType === "text" || newType === "select") && !newValue.trim()) {
      setToast({ type: "error", message: "Value cannot be empty." });
      return false;
    }
    if (newType === "select" && !newOptions.trim()) {
      setToast({ type: "error", message: "Select options required." });
      return false;
    }
    return true;
  }

  // Add new setting
  function addSetting(e) {
    e.preventDefault();
    if (!validateNew()) return;

    let optionsArray = [];
    if (newType === "select") {
      optionsArray = newOptions
        .split(",")
        .map((opt) => opt.trim())
        .filter(Boolean);
      if (!optionsArray.length) {
        setToast({ type: "error", message: "At least one option required." });
        return;
      }
      // Validate newValue is in options
      if (!optionsArray.includes(newValue)) {
        setToast({
          type: "error",
          message: "Value must be one of the options.",
        });
        return;
      }
    }

    const newSetting = {
      id: settings.length ? Math.max(...settings.map((s) => s.id)) + 1 : 1,
      key: newKey.trim(),
      value: newType === "boolean" ? Boolean(newValue) : newValue.trim(),
      type: newType,
      options: newType === "select" ? optionsArray : undefined,
    };
    setSettings((prev) => [...prev, newSetting]);
    setNewKey("");
    setNewValue(newType === "boolean" ? false : "");
    setNewType("text");
    setNewOptions("");
    setToast({ type: "success", message: "Setting added successfully." });
    setCurrentPage(totalPages);
  }

  // Render input by type (for editing and new)
  function renderInput(type, value, onChange, options) {
    switch (type) {
      case "select":
        return (
          <select
            value={value}
            onChange={onChange}
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
            aria-label="Select option"
          >
            <option value="">Select option</option>
            {options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange({ target: { value: e.target.checked } })}
            aria-label="Toggle option"
            className="w-6 h-6"
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
            aria-label="Text input"
          />
        );
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="flex items-center text-3xl font-bold text-[#8b2f2f] mb-6">
        <Settings className="mr-2" size={50} /> System Settings
      </h1>

      {/* Search */}
      <div className="mb-4 max-w-md">
        <input
          type="text"
          placeholder="Search settings..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8b2f2f]"
          aria-label="Search settings"
        />
      </div>

      {/* Add New Setting Form */}
      <form
        onSubmit={addSetting}
        className="mb-6 max-w-4xl grid grid-cols-[2fr_2fr_1fr_3fr_auto] gap-2 items-center"
      >
        <input
          type="text"
          placeholder="Setting Key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
          aria-label="New setting key"
          required
        />
        <input
          type="text"
          placeholder="Setting Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          disabled={newType === "boolean"}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f] ${
            newType === "boolean" ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          aria-label="New setting value"
          required={newType !== "boolean"}
        />
        <select
          value={newType}
          onChange={(e) => {
            setNewType(e.target.value);
            setNewValue(e.target.value === "boolean" ? false : "");
          }}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
          aria-label="New setting type"
        >
          <option value="text">Text</option>
          <option value="select">Select</option>
          <option value="boolean">Boolean</option>
        </select>
        {newType === "select" && (
          <input
            type="text"
            placeholder="Options (comma separated)"
            value={newOptions}
            onChange={(e) => setNewOptions(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
            aria-label="New setting select options"
            required
          />
        )}
        <button
          type="submit"
          className="flex items-center justify-center px-3 py-2 bg-[#8b2f2f] text-white rounded hover:bg-[#732525] transition"
          aria-label="Add new setting"
          title="Add new setting"
        >
          <Plus size={20} />
        </button>
      </form>

      {/* Settings Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded text-left text-sm">
          <thead className="bg-[#8b2f2f] text-white">
            <tr>
              <th className="px-4 py-3">Key</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Options</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSettings.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No settings found.
                </td>
              </tr>
            )}
            {paginatedSettings.map(({ id, key, value, type, options }) => (
              <tr
                key={id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Key */}
                <td className="px-4 py-3">
                  {editId === id ? (
                    <input
                      type="text"
                      value={editKey}
                      onChange={(e) => setEditKey(e.target.value)}
                      className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                      aria-label={`Edit key for ${key}`}
                    />
                  ) : (
                    key
                  )}
                </td>

                {/* Value */}
                <td className="px-4 py-3">
                  {editId === id
                    ? renderInput(type, editValue, (e) => {
                        let val =
                          type === "boolean"
                            ? e.target.value === true || e.target.value === "true" || e.target.checked
                            : e.target.value;
                        setEditValue(val);
                      }, options)
                    : type === "boolean"
                    ? value
                      ? "Yes"
                      : "No"
                    : value}
                </td>

                {/* Type */}
                <td className="px-4 py-3">
                  {editId === id ? (
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                      aria-label="Edit setting type"
                    >
                      <option value="text">Text</option>
                      <option value="select">Select</option>
                      <option value="boolean">Boolean</option>
                    </select>
                  ) : (
                    type.charAt(0).toUpperCase() + type.slice(1)
                  )}
                </td>

                {/* Options */}
                <td className="px-4 py-3">
                  {editId === id ? (
                    editType === "select" ? (
                      <input
                        type="text"
                        value={editOptions}
                        onChange={(e) => setEditOptions(e.target.value)}
                        placeholder="Comma separated options"
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                        aria-label="Edit select options"
                      />
                    ) : (
                      "-"
                    )
                  ) : editType === "select" ? (
                    options?.join(", ") || "-"
                  ) : (
                    "-"
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 flex justify-center gap-3">
                  {editId === id ? (
                    <>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label={`Cancel edit for ${key}`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="text-[#8b2f2f] hover:text-[#732525]"
                        aria-label={`Save edit for ${key}`}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit({ id, key, value, type, options })}
                        className="text-blue-600 hover:text-blue-800"
                        aria-label={`Edit ${key}`}
                      >
                        <Edit2 />
                      </button>
                      <button
                        onClick={() => promptDelete(id)}
                        className="text-red-600 hover:text-red-800"
                        aria-label={`Delete ${key}`}
                      >
                        <Trash2 />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
              aria-label="Previous Page"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
              aria-label="Next Page"
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {showConfirmDelete && (
        <Modal onClose={() => setShowConfirmDelete(false)}>
          <h3 className="text-lg font-semibold mb-4">Confirm Delete Setting</h3>
          <p className="mb-6">Are you sure you want to delete this setting?</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="alert"
          className={`fixed bottom-6 right-6 px-6 py-3 rounded shadow-lg text-white font-semibold ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
