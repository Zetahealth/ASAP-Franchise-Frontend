import React, { useState, useEffect, useRef } from "react";
import {
  UserPlus,
  Edit2,
  Trash2,
  XCircle,
  CheckCircle,
  Search as SearchIcon,
  RefreshCcw,
  Eye,
  EyeOff
} from "lucide-react";

const initialFormState = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  status: "Active",
};

const roles = ["Super Admin", "Admin", "Moderator"];
const statuses = ["Active", "Inactive"];
const ITEMS_PER_PAGE = 5;
const PASSWORD_MIN_LENGTH = 8;

const FIXED_OTP = "123456"; // Demo fixed OTP

// Simulate logged-in user role
const LOGGED_IN_USER_ROLE = "Super Admin"; // Change to "Admin" or "Moderator" to test restrictions

const AdminRegistration = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      fullName: "Ravi Kiran",
      email: "ravi@example.com",
      phone: "9876543210",
      role: "Super Admin",
      status: "Active",
    },
    {
      id: 2,
      fullName: "Sneha Rao",
      email: "sneha@example.com",
      phone: "9123456780",
      role: "Admin",
      status: "Inactive",
    },
  ]);

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [otpTimer, setOtpTimer] = useState(120); // 2 minutes countdown
  const otpTimerRef = useRef(null);
  // State for password fields and toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePwdMode, setChangePwdMode] = useState(false); // for edit mode password toggle
  // Inside your component:
const [showResetOtpModal, setShowResetOtpModal] = useState(false);
const [showSetNewPwdModal, setShowSetNewPwdModal] = useState(false);


  const toastTimeoutRef = useRef();
  // Password strength logic
  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length >= PASSWORD_MIN_LENGTH) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[\W_]/.test(pwd)) score++;
    return score;
  };

  const strengthLabels = [
    "Too Short",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
  ];
  const strengthColors = [
    "bg-gray-300",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-400",
    "bg-green-500",
    "bg-green-700",
  ];

  const passwordStrength = getPasswordStrength(form.password || "");
  // Validation for password complexity (you can add in your validation function)
  const validatePassword = (pwd) => {
    if (pwd.length < PASSWORD_MIN_LENGTH) return false;
    if (!/[A-Z]/.test(pwd)) return false;
    if (!/[a-z]/.test(pwd)) return false;
    if (!/\d/.test(pwd)) return false;
    if (!/[\W_]/.test(pwd)) return false;
    return true;
  };
  useEffect(() => {
    return () => clearTimeout(toastTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (otpSent && otpTimer > 0) {
      otpTimerRef.current = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    }
    if (otpTimer === 0) {
      setOtpSent(false);
      setOtpValue("");
      setOtpError("OTP expired. Please resend.");
    }
    return () => clearTimeout(otpTimerRef.current);
  }, [otpSent, otpTimer]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
  };

  // Validation helper
  const validate = (skipEmailCheck = false) => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    )
      newErrors.email = "Invalid email address";
    if (!skipEmailCheck) {
      if (admins.find((a) => a.email === form.email))
        newErrors.email = "Admin with this email already exists";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone.trim()))
      newErrors.phone = "Phone must be 10 digits";
    if (!form.role) newErrors.role = "Role is required";
    if (!form.status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: null }));
  };

  // Start OTP flow on registration form submit
  const handleStartRegistration = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setOtpSent(true);
    setOtpTimer(120);
    setOtpValue("");
    setOtpError(null);
    showToast(
      `OTP sent to ${form.email} (Demo code: ${FIXED_OTP})`,
      "success"
    );
  };

  // Verify OTP and finish registration
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpValue === FIXED_OTP) {
      setIsSubmitting(true);
      setTimeout(() => {
        const newAdmin = { ...form, id: Date.now() };
        setAdmins((prev) => [...prev, newAdmin]);
        setForm(initialFormState);
        setOtpSent(false);
        setOtpValue("");
        setOtpError(null);
        setIsSubmitting(false);
        setCurrentPage(Math.ceil((admins.length + 1) / ITEMS_PER_PAGE));
        showToast("Admin registered successfully!");
      }, 700);
    } else {
      setOtpError("Invalid OTP, please try again.");
    }
  };

  const resendOtp = () => {
    setOtpTimer(120);
    setOtpValue("");
    setOtpError(null);
    showToast(`OTP resent to ${form.email} (Demo code: ${FIXED_OTP})`, "success");
  };

  const handleEditClick = (admin) => {
    setEditId(admin.id);
    setForm({
      fullName: admin.fullName,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
      status: admin.status,
    });
    setErrors({});
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm(initialFormState);
    setErrors({});
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (!validate(true)) return;
    setShowConfirmSave(true);
  };

  const confirmSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === editId ? { ...admin, ...form, id: editId } : admin
        )
      );
      setEditId(null);
      setForm(initialFormState);
      setIsSubmitting(false);
      setShowConfirmSave(false);
      showToast("Admin details updated successfully!");
    }, 700);
  };

  const cancelSave = () => setShowConfirmSave(false);

  const promptDelete = (id) => {
    setDeleteId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== deleteId));
    if (editId === deleteId) {
      handleCancelEdit();
    }
    setShowConfirmDelete(false);
    setDeleteId(null);
    showToast("Admin deleted successfully!");
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setDeleteId(null);
  };

  const filteredAdmins = admins.filter(
    (a) =>
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  // Keyboard handlers
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (editId) handleCancelEdit();
      if (showConfirmSave) cancelSave();
      if (showConfirmDelete) cancelDelete();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editId, showConfirmSave, showConfirmDelete]);

  // Permission helpers
  const canEditDelete = LOGGED_IN_USER_ROLE === "Super Admin";
  const canAdd = LOGGED_IN_USER_ROLE === "Super Admin" || LOGGED_IN_USER_ROLE === "Admin";

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="flex items-center text-3xl font-bold text-[#8b2f2f] mb-6">
        <UserPlus className="mr-2" /> Admin Registration & Management
      </h1>

      {/* Search */}
      <div className="mb-4 flex items-center max-w-md gap-2">
        <SearchIcon className="text-gray-400" />
        <input
          type="text"
          placeholder="Search admins by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8b2f2f]"
          aria-label="Search admins"
        />
      </div>

      {/* Form & OTP */}
      {!editId && otpSent ? (
        <form
          onSubmit={handleVerifyOtp}
          className="mb-8 max-w-md"
          noValidate
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="mb-2">
            Enter the 6-digit OTP sent to{" "}
            <strong>{form.email}</strong>. OTP expires in{" "}
            <strong>
              {Math.floor(otpTimer / 60)
                .toString()
                .padStart(2, "0")}
              :
              {(otpTimer % 60).toString().padStart(2, "0")}
            </strong>
            .
          </p>
          <input
            type="text"
            inputMode="numeric"
            maxLength="6"
            value={otpValue}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setOtpValue(e.target.value);
                setOtpError(null);
              }
            }}
            className={`w-full border rounded px-3 py-2 mb-2 focus:outline-none ${otpError ? "border-red-500" : "border-gray-300"
              }`}
            aria-label="Enter OTP"
            autoFocus
            required
          />
          {otpError && (
            <p className="text-red-600 text-sm mb-2" role="alert">
              {otpError}
            </p>
          )}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={resendOtp}
              disabled={otpTimer > 0}
              className={`px-4 py-2 rounded border text-sm ${otpTimer > 0
                ? "cursor-not-allowed border-gray-300 text-gray-400"
                : "border-[#8b2f2f] text-[#8b2f2f] hover:bg-[#8b2f2f] hover:text-white"
                } transition`}
            >
              Resend OTP
            </button>
            <button
              type="submit"
              disabled={otpValue.length !== 6 || isSubmitting}
              className={`px-6 py-2 bg-[#8b2f2f] text-white rounded hover:bg-[#732525] transition disabled:opacity-70`}
              aria-disabled={otpValue.length !== 6 || isSubmitting}
            >
              Verify OTP
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={editId ? handleSaveClick : handleStartRegistration}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-3xl"
          noValidate
        >
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block font-semibold mb-1">
              Full Name<span className="text-red-600">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              disabled={isSubmitting || !canAdd && !editId}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "error-fullName" : undefined}
              required
            />
            {errors.fullName && (
              <p
                className="text-red-600 text-sm mt-1"
                id="error-fullName"
                role="alert"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
              disabled={editId || isSubmitting || !canAdd}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "error-email" : undefined}
              required
            />
            {errors.email && (
              <p
                className="text-red-600 text-sm mt-1"
                id="error-email"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block font-semibold mb-1">
              Phone<span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              disabled={isSubmitting || !canAdd && !editId}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "error-phone" : undefined}
              required
            />
            {errors.phone && (
              <p
                className="text-red-600 text-sm mt-1"
                id="error-phone"
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block font-semibold mb-1">
              Role<span className="text-red-600">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={isSubmitting || !canAdd && !editId}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.role ? "border-red-500" : "border-gray-300"
                }`}
              aria-invalid={!!errors.role}
              aria-describedby={errors.role ? "error-role" : undefined}
              required
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.role && (
              <p
                className="text-red-600 text-sm mt-1"
                id="error-role"
                role="alert"
              >
                {errors.role}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block font-semibold mb-1">
              Status<span className="text-red-600">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={isSubmitting || !canAdd && !editId}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.status ? "border-red-500" : "border-gray-300"
                }`}
              aria-invalid={!!errors.status}
              aria-describedby={errors.status ? "error-status" : undefined}
              required
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.status && (
              <p
                className="text-red-600 text-sm mt-1"
                id="error-status"
                role="alert"
              >
                {errors.status}
              </p>
            )}
          </div>
          {/* Insert Password Fields */}
          {(!editId || changePwdMode) && (
            <>
              <div>
                <label htmlFor="password" className="block font-semibold mb-1">
                  Password<span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password || ""}
                    onChange={handleChange}
                    disabled={isSubmitting || (!canAdd && !editId)}
                    className={`w-full border rounded px-3 py-2 pr-10 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "error-password" : undefined}
                    required={!editId || changePwdMode}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-gray-500 hover:text-[#8b2f2f]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1" id="error-password" role="alert">
                    {errors.password}
                  </p>
                )}

                {/* Password strength meter */}
                {form.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className={`h-2 w-24 rounded ${strengthColors[passwordStrength] || "bg-gray-300"
                        }`}
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      {strengthLabels[passwordStrength]}
                    </span>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least {PASSWORD_MIN_LENGTH} characters and include uppercase, lowercase, number, and special character.
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block font-semibold mb-1">
                  Confirm Password<span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword || ""}
                    onChange={handleChange}
                    disabled={isSubmitting || (!canAdd && !editId)}
                    className={`w-full border rounded px-3 py-2 pr-10 focus:outline-none ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                      errors.confirmPassword ? "error-confirmPassword" : undefined
                    }
                    required={!editId || changePwdMode}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-2 text-gray-500 hover:text-[#8b2f2f]"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p
                    className="text-red-600 text-sm mt-1"
                    id="error-confirmPassword"
                    role="alert"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Show Change Password toggle button only if editing and NOT already in changePwdMode */}
          {editId && !changePwdMode && (
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => setChangePwdMode(true)}
                className="flex items-center gap-2 text-[#8b2f2f] font-semibold hover:underline"
              >
                <Eye size={18} /> Change Password
              </button>
            </div>
          )}


          {/* Buttons */}
          <div className="md:col-span-2 flex space-x-4 justify-end items-center">
            <button
              type="button"
              onClick={() => {
                setForm(initialFormState);
                setErrors({});
                if (editId) handleCancelEdit();
              }}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
            >
              Reset
            </button>

            {editId ? (
              <>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel Edit
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#8b2f2f] text-white rounded hover:bg-[#732525] transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !canAdd}
                className={`px-6 py-2 bg-[#8b2f2f] text-white rounded hover:bg-[#732525] transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                title={
                  !canAdd
                    ? `You don't have permission to add admins`
                    : "Register Admin"
                }
              >
                Register Admin
              </button>
            )}
          </div>
        </form>
      )}

      {/* Admins Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded text-left text-sm">
          <thead className="bg-[#8b2f2f] text-white">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              {canEditDelete && (
                <th className="px-4 py-3 text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedAdmins.length === 0 && (
              <tr>
                <td colSpan={canEditDelete ? 6 : 5} className="text-center py-6 text-gray-500">
                  No admins found.
                </td>
              </tr>
            )}

            {paginatedAdmins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3">{admin.fullName}</td>
                <td className="px-4 py-3">{admin.email}</td>
                <td className="px-4 py-3">{admin.phone}</td>
                <td className="px-4 py-3">{admin.role}</td>
                <td className="px-4 py-3">{admin.status}</td>
                {canEditDelete && (
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEditClick(admin)}
                      title="Edit Admin"
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Edit ${admin.fullName}`}
                    >
                      <Edit2 />
                    </button>
                    <button
                      onClick={() => promptDelete(admin.id)}
                      title="Delete Admin"
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete ${admin.fullName}`}
                    >
                      <Trash2 />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

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
                className={`px-3 py-1 border rounded ${currentPage === i + 1
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
      </div>

      {/* Confirm Save Modal */}
      {showConfirmSave && (
        <Modal onClose={cancelSave}>
          <h3 className="text-lg font-semibold mb-4">Confirm Save Changes</h3>
          <p className="mb-6">
            Are you sure you want to save the changes to this admin&apos;s
            details?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={cancelSave}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={confirmSave}
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#8b2f2f] text-white rounded hover:bg-[#732525]"
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}

      {/* Confirm Delete Modal */}
      {showConfirmDelete && (
        <Modal onClose={cancelDelete}>
          <h3 className="text-lg font-semibold mb-4">Confirm Delete Admin</h3>
          <p className="mb-6">
            Are you sure you want to delete this admin? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={cancelDelete}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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
      {showResetOtpModal && (
        <Modal onClose={() => setShowResetOtpModal(false)}>
          <h3 className="text-lg font-semibold mb-4">Reset Password OTP</h3>
          <p className="mb-2">
            Enter the 6-digit OTP sent to <strong>{resetEmail}</strong>.
          </p>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={resetOtp}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) setResetOtp(e.target.value);
            }}
            className={`w-full border rounded px-3 py-2 mb-2 focus:outline-none ${resetOtpError ? "border-red-500" : "border-gray-300"
              }`}
            aria-label="Enter OTP"
            autoFocus
            required
          />
          {resetOtpError && (
            <p className="text-red-600 text-sm mb-2" role="alert">
              {resetOtpError}
            </p>
          )}
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 border rounded hover:bg-gray-100"
              onClick={() => setShowResetOtpModal(false)}
            >
              Cancel
            </button>
            <button
              disabled={resetOtp.length !== 6}
              onClick={handleVerifyResetOtp}
              className="px-4 py-2 bg-[#8b2f2f] text-white rounded hover:bg-[#732525]"
            >
              Verify OTP
            </button>
          </div>
        </Modal>
      )}

      {/* Set New Password Modal */}
      {showSetNewPwdModal && (
        <Modal onClose={() => setShowSetNewPwdModal(false)}>
          <h3 className="text-lg font-semibold mb-4">Set New Password</h3>
          <label className="block mb-4 font-semibold text-gray-700 relative">
            New Password
            <input
              type={showNewPwd ? "text" : "password"}
              className="mt-1 block w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500 hover:text-[#8b2f2f]"
              onClick={() => setShowNewPwd(!showNewPwd)}
              aria-label={showNewPwd ? "Hide password" : "Show password"}
            >
              {showNewPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>

          <label className="block mb-4 font-semibold text-gray-700 relative">
            Confirm New Password
            <input
              type={showConfirmNewPwd ? "text" : "password"}
              className="mt-1 block w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500 hover:text-[#8b2f2f]"
              onClick={() => setShowConfirmNewPwd(!showConfirmNewPwd)}
              aria-label={showConfirmNewPwd ? "Hide password" : "Show password"}
            >
              {showConfirmNewPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowSetNewPwdModal(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              disabled={
                !newPassword ||
                !confirmNewPassword ||
                newPassword !== confirmNewPassword
              }
              onClick={handleSetNewPassword}
              className="px-4 py-2 bg-[#8b2f2f] text-white rounded hover:bg-[#732525]"
            >
              Set Password
            </button>
          </div>
        </Modal>
      )}
      {/* Toast */}
      {toast && (
        <div
          role="alert"
          className={`fixed bottom-6 right-6 px-6 py-3 rounded shadow-lg text-white font-semibold ${toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};
{/* Password Reset OTP Modal */ }


// Simple modal wrapper
const Modal = ({ children, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
  >
    <div
      className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default AdminRegistration;
