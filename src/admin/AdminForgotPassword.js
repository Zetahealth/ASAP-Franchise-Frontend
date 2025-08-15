import React, { useState, useEffect } from "react";
import { Mail, KeyRound, RefreshCcw } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AdminForgotPassword() {
    const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (step === 2 && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [step, countdown]);

    const handleSendOtp = () => {
        setError("");
        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Simulate sending OTP
        toast.success(`✅ OTP sent to ${email}`);
        setStep(2);
        setCountdown(60);
        setResendDisabled(true);
    };

    const handleResendOtp = () => {
        toast.info(`🔄 New OTP sent to ${email}`);
        setCountdown(60);
        setResendDisabled(true);
    };

    const handleVerifyOtp = () => {
        setError("");
        if (!otp.trim()) {
            setError("Please enter the OTP.");
            return;
        }
        if (otp.length !== 6) {
            setError("OTP must be 6 digits.");
            return;
        }

        // OTP verified toast
        toast.success("✅ OTP verified! Redirecting...");

        // Navigate to reset password page after short delay
        setTimeout(() => {
            navigate("/admin/reset-password", { state: { email } });
        }, 1500);
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <ToastContainer position="top-right" autoClose={2000} />
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold text-gray-800">Forgot Password</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        To reset your password, enter your registered email here.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Registered Email
                        </label>
                        <div className="flex items-center border border-gray-300 rounded px-3">
                            <Mail className="text-gray-400 mr-2" size={18} />
                            <input
                                type="email"
                                className="w-full py-2 focus:outline-none"
                                placeholder="admin@asap.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleSendOtp}
                            className="mt-4 w-full bg-[#8b2f2f] text-white py-2 rounded hover:bg-[#732525] flex items-center justify-center gap-2"
                        >
                            <KeyRound size={18} />
                            Send OTP
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        {/* Dynamic info message */}
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded mb-4 text-sm text-center">
                            We sent a verification OTP to your registered email{" "}
                            <span className="font-semibold">{email}</span>
                        </div>

                        <label className="block mb-1 font-medium text-gray-700">
                            Enter OTP
                        </label>

                        {/* OTP input boxes */}
                        <div className="flex gap-4 justify-center mb-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="w-10 h-12 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                                    value={otp[index] || ""}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/, ""); // only digits
                                        if (!val && otp[index]) {
                                            setOtp((prev) =>
                                                prev.substring(0, index) + "" + prev.substring(index + 1)
                                            );
                                        } else if (val) {
                                            setOtp((prev) => {
                                                const newOtp =
                                                    prev.substring(0, index) + val + prev.substring(index + 1);
                                                return newOtp;
                                            });
                                            if (index < 5) {
                                                document.getElementById(`otp-${index + 1}`).focus();
                                            }
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Backspace" && !otp[index] && index > 0) {
                                            document.getElementById(`otp-${index - 1}`).focus();
                                        }
                                    }}
                                    id={`otp-${index}`}
                                />
                            ))}
                        </div>

                        {/* Resend section */}
                        <div className="flex justify-between items-center mt-3 text-sm">
                            <span className="text-gray-500">
                                {resendDisabled
                                    ? `Resend OTP in ${countdown}s`
                                    : "You can resend OTP now"}
                            </span>
                            <button
                                onClick={handleResendOtp}
                                disabled={resendDisabled}
                                className={`flex items-center gap-1 px-3 py-1 rounded ${resendDisabled
                                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                        : "bg-[#8b2f2f] text-white hover:bg-[#732525]"
                                    }`}
                            >
                                <RefreshCcw size={14} /> Resend OTP
                            </button>
                        </div>

                        {/* Verify button */}
                        <button
                            onClick={handleVerifyOtp}
                            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
                        >
                            Verify OTP
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
