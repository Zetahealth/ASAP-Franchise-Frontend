import React, { useState, useEffect } from "react";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RippleButton from "../ReusableComponents/RippleButton";

const SettingsSection = () => {
    const [reason, setReason] = useState("");
    const [comments, setComments] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [errors, setErrors] = useState({
        currentVsNew: "",
        confirmMismatch: "",
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        let newErrors = { currentVsNew: "", confirmMismatch: "" };

        if (currentPassword && newPassword && currentPassword === newPassword) {
            newErrors.currentVsNew =
                "⚠️ Current password and new password cannot be the same.";
        }

        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            newErrors.confirmMismatch = "❌ New password and confirm password do not match.";
        }

        setErrors(newErrors);
    }, [currentPassword, newPassword, confirmPassword]);

    const handlePasswordChange = () => {
        if (errors.currentVsNew || errors.confirmMismatch) {
            alert("Please fix errors before submitting.");
            return;
        }
        alert("✅ Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };


    const handleDeleteAccount = () => {
        if (!reason) {
            toast.error(" Please select a reason before deleting your account.");
            return;
        }
        setShowDeleteModal(true); // show confirmation modal
    };

    const confirmDelete = () => {
        setShowDeleteModal(false);
        toast.warn(" Account deleted permanently!");
        setReason("");
        setComments("");
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 relative">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Change Password */}
            <h3 className="text-2xl font-bold text-[#943032ff] mb-4">
                Change Password
            </h3>

            <div className="space-y-4 mb-8">
                {/* Current Password */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-[#943032ff] outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showCurrentPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-[#943032ff] outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    {errors.currentVsNew && (
                        <p className="text-red-600 text-sm mt-1">{errors.currentVsNew}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-[#943032ff] outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    {errors.confirmMismatch && (
                        <p className="text-red-600 text-sm mt-1">{errors.confirmMismatch}</p>
                    )}
                </div>

                <RippleButton onClick={handlePasswordChange}>
                    Update Password
                </RippleButton>

            </div>

            {/* Delete Account */}
            <h3 className="text-2xl font-bold text-[#943032ff] mb-4">
                Delete Account
            </h3>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Reason for deleting account
                </label>
                <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                    <option value="">Select a reason</option>
                    <option value="created_by_mistake">
                        I created this account by mistake
                    </option>
                    <option value="multiple_accounts">I have another account</option>
                    <option value="privacy_concerns">I have privacy concerns</option>
                    <option value="too_many_emails">
                        I receive too many emails/notifications
                    </option>
                    {/* <option value="not_useful">I don’t find the platform useful</option> */}
                    <option value="switching_service">
                        I’m switching to a different service
                    </option>
                    <option value="temporary_leave">I just want to take a break</option>
                    <option value="cost_issues">It’s too expensive / not worth it</option>
                    <option value="technical_issues">Too many technical issues</option>
                    <option value="customer_support">
                        Not happy with customer support
                    </option>
                    <option value="other">Other (please specify)</option>
                </select>
            </div>

            {/* Comment Box */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Additional Comments (optional)
                </label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-red-500 outline-none"
                    rows={4}
                    placeholder="Please provide more details..."
                />
            </div>

            {/* Terms */}
            <div className="mb-4 flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <p className="text-gray-600 text-sm">
                    I understand that deleting my account is permanent and cannot be
                    undone.
                </p>
            </div>

            <RippleButton
                onClick={handleDeleteAccount}
            >
                Delete Account
            </RippleButton>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] relative">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="text-red-600 w-6 h-6" />
                            <h2 className="text-xl font-bold text-gray-800">
                                Confirm Deletion
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to permanently delete your account? This
                            action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsSection;
