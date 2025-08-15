import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock, Check } from "lucide-react";

export default function AdminResetPassword() {
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [strength, setStrength] = useState({ label: "", color: "" });
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    React.useEffect(() => {
        if (!email) {
            navigate("/admin-forgot-password");
        }
    }, [email, navigate]);


    const checkPasswordStrength = (password) => {
        const reqs = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[^A-Za-z0-9]/.test(password),
        };
        setRequirements(reqs);

        const score = Object.values(reqs).filter(Boolean).length;
        if (score <= 1) {
            setStrength({ label: "Weak", color: "bg-red-500" });
        } else if (score === 2) {
            setStrength({ label: "Medium", color: "bg-yellow-500" });
        } else if (score >= 3) {
            setStrength({ label: "Strong", color: "bg-green-500" });
        }
    };

    const handleReset = (e) => {
        e.preventDefault();

        if (!newPwd.trim() || !confirmPwd.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (newPwd !== confirmPwd) {
            toast.error("Passwords do not match.");
            return;
        }
        if (strength.label !== "Strong") {
            toast.error("Password must be Strong (see requirements).");
            return;
        }

        toast.success("✅ Password reset successfully!");
        setTimeout(() => {
            navigate("/admin-login");
        }, 1500);
    };

    const requirementItem = (label, isMet) => (
        <li
            className={`flex items-center gap-2 transition-all duration-300 ${isMet ? "text-green-600" : "text-gray-500"
                }`}
        >
            <span className="relative flex items-center">
                <span
                    className={`transition-all duration-300 transform ${isMet
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2"
                        }`}
                >
                    <Check size={16} />
                </span>
            </span>
            {label}
        </li>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <ToastContainer position="top-right" autoClose={2000} />
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
                <div className="flex items-center justify-center mb-6">
                    <Lock className="text-[#8b2f2f] mr-2" size={40} />
                    <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                </div>
                <p className="text-center text-gray-600 mb-4">
                    Resetting password for <span className="font-semibold">{email}</span>
                </p>
                <form onSubmit={handleReset} className="space-y-5">
                    {/* New Password */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPwd}
                            onChange={(e) => {
                                setNewPwd(e.target.value);
                                checkPasswordStrength(e.target.value);
                            }}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                            placeholder="Enter new password"
                        />

                        {/* Strength Bar */}
                        {newPwd && (
                            <div className="mt-2">
                                <div className="h-2 w-full bg-gray-200 rounded">
                                    <div
                                        className={`h-2 rounded ${strength.color}`}
                                        style={{
                                            width:
                                                strength.label === "Weak"
                                                    ? "33%"
                                                    : strength.label === "Medium"
                                                        ? "66%"
                                                        : "100%",
                                        }}
                                    ></div>
                                </div>
                                <p className="text-sm mt-1 text-gray-600">
                                    Strength:{" "}
                                    <span
                                        className={
                                            strength.label === "Weak"
                                                ? "text-red-500"
                                                : strength.label === "Medium"
                                                    ? "text-yellow-500"
                                                    : "text-green-500"
                                        }
                                    >
                                        {strength.label}
                                    </span>
                                </p>
                            </div>
                        )}

                        {/* Always visible animated checklist */}
                        <ul className="mt-2 text-xs list-none space-y-1">
                            {requirementItem("At least 8 characters", requirements.length)}
                            {requirementItem("At least 1 uppercase letter", requirements.uppercase)}
                            {requirementItem("At least 1 number", requirements.number)}
                            {requirementItem("At least 1 special character (!@#$%)", requirements.specialChar)}
                        </ul>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block mb-1 font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                            className={`w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f] ${confirmPwd && confirmPwd !== newPwd ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Confirm new password"
                        />

                        {/* Animated green check icon */}
                        {confirmPwd && confirmPwd === newPwd && (
                            <span
                                className="absolute right-3 top-9 text-green-600 transition-all duration-300 ease-in-out transform opacity-0 animate-fadeInCheck"
                            >
                                <Check size={18} />
                            </span>
                        )}

                        {/* Error message when passwords don't match */}
                        {confirmPwd && confirmPwd !== newPwd && (
                            <p className="text-red-500 text-xs mt-1">
                                Passwords do not match
                            </p>
                        )}
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-[#8b2f2f] text-white py-2 rounded hover:bg-[#732525]"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
