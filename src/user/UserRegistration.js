import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Phone, UserPlus, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function UserRegistration() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        country: "us",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [countryList] = useState([
        { code: "au", name: "Australia", dialCode: "+61" },
        { code: "dz", name: "Algeria", dialCode: "+213" },
        { code: "br", name: "Brazil", dialCode: "+55" },
        { code: "ca", name: "Canada", dialCode: "+1" },
        { code: "cn", name: "China", dialCode: "+86" },
        { code: "eg", name: "Egypt", dialCode: "+20" },
        { code: "fr", name: "France", dialCode: "+33" },
        { code: "in", name: "India", dialCode: "+91" },
        { code: "jp", name: "Japan", dialCode: "+81" },
        { code: "ke", name: "Kenya", dialCode: "+254" },
        { code: "ma", name: "Morocco", dialCode: "+212" },
        { code: "na", name: "Namibia", dialCode: "+264" },
        { code: "ng", name: "Nigeria", dialCode: "+234" },
        { code: "za", name: "South Africa", dialCode: "+27" },
        { code: "ug", name: "Uganda", dialCode: "+256" },
        { code: "uk", name: "United Kingdom", dialCode: "+1" },
        { code: "us", name: "United States", dialCode: "+1" },
        { code: "zm", name: "Zambia", dialCode: "+260" },
    ]);
    const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle submit
    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // validations
        if (!formData.firstName || !formData.lastName || !formData.username) {
            toast.error("Please fill all required fields ❌");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Invalid email address ❌");
            return;
        }

        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            toast.error("Enter a valid 10-digit phone number 📱");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match ❌");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            // ✅ build full phone with country code
            const fullPhone = `${selectedCountryCode} ${formData.phoneNumber}`;

            // save to localStorage
            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                email: formData.email,
                phone: fullPhone, // ✅ saved with country code
                password: formData.password,
            };

            localStorage.setItem("registeredUser", JSON.stringify(userData));

            toast.success("✅ Registration successful!");

            // redirect after short delay
            setTimeout(() => {
                navigate("/login"); // ✅ you had "/user/login" but your routes use "/login"
            }, 1200);
        }, 1200);
    };

    useEffect(() => {
        const selectedCountry = countryList.find(
            (country) => country.code === formData.country
        );
        if (selectedCountry) {
            setSelectedCountryCode(selectedCountry.dialCode);
        }
    }, [formData.country, countryList]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <ToastContainer position="top-right" autoClose={1200} hideProgressBar />

            <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl p-8">
                <h2 className="text-center text-4xl font-bold text-[#8b2f2f] py-6">ASAP Franchise</h2>
                <div className="flex items-center justify-center mb-6">
                    <UserPlus className="text-[#8b2f2f] mr-2" size={40} />
                    <h2 className="text-2xl font-bold text-gray-800">Register</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First & Last Name */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                                placeholder="Doe"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {/* Username */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                                    placeholder="johndoe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                                    placeholder="user@example.com"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {/* Phone */}

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Country
                            </label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2  focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                            >
                                {countryList.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900  border border-r-0 border-gray-300 rounded-l-md ">
                                    {selectedCountryCode}
                                </span>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="F border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#8b2f2f] block w-full p-2.5"
                                    placeholder="Phone number"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {/* Password */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type={showPwd ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-500 hover:text-[#8b2f2f]"
                                    onClick={() => setShowPwd(!showPwd)}
                                >
                                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type={showConfirmPwd ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
                                    placeholder="Confirm password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-500 hover:text-[#8b2f2f]"
                                    onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                                >
                                    {showConfirmPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:max-w-md bg-[#8b2f2f] text-white text-lg py-2 rounded hover:bg-[#732525] flex items-center justify-center gap-2 disabled:opacity-60 mx-auto"
                    >
                        {loading ? (
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        ) : (
                            <UserPlus size={24} />
                        )}
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#8b2f2f] hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
