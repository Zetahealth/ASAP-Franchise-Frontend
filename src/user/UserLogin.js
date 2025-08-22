import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const toastTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // ✅ Dummy Owner account
      const dummyOwner = {
        email: "owner@asap.com",
        password: "Owner@123",
        username: "franchise_owner",
        firstName: "John",
        lastName: "Doe",
        role: "owner",
      };

      if (email === dummyOwner.email && password === dummyOwner.password) {
        localStorage.setItem("authToken", "dummy-token-123");
        localStorage.setItem("loggedUser", JSON.stringify(dummyOwner));

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        toast.success("Owner login successful!");
        toastTimeoutRef.current = setTimeout(() => {
          navigate(`/`); // 👈 always go Home
        }, 1200);

        return;
      }

      // ✅ Check for normal registeredUser
      if (
        storedUser &&
        email === storedUser.email &&
        password === storedUser.password
      ) {
        const userData = { ...storedUser, role: "user" };
        localStorage.setItem("authToken", "dummy-token-123");
        localStorage.setItem("loggedUser", JSON.stringify(userData));

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        toast.success("Login successful!");
        toastTimeoutRef.current = setTimeout(() => {
          navigate(`/`); // 👈 always go Home
        }, 1200);
      } else {
        setError("Invalid email or password.");
      }
    }, 1200);
  };


  // Auto-fill email if "Remember Me" was checked
  useEffect(() => {
    const remembered = localStorage.getItem("rememberedEmail");
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar />

      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className=" text-center text-4xl font-bold text-[#8b2f2f] py-6">ASAP Franchise</h2>
        <div className="flex items-center justify-center mb-6">
          <LogIn className="text-[#8b2f2f] mr-2" size={32} />
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
              placeholder="admin@asap.com"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
              placeholder="Admin@123"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-[#8b2f2f]"
              onClick={() => setShowPwd(!showPwd)}
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 text-[#8b2f2f] border-gray-300 rounded"
              />
              Remember Me
            </label>
            <Link
              to="/user/forgot-password"
              className="text-[#8b2f2f] text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8b2f2f] text-white py-2 rounded hover:bg-[#732525] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <LogIn size={18} />
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-4 text-sm text-center">
          <p>
            Don’t have an account?{" "}
            <Link to="/registration" className="text-[#8b2f2f] hover:underline font-semibold">
              Register here
            </Link>
          </p>
        </div>

        {/* Terms & Conditions */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          By logging in, you agree to our{" "}
          <Link to="/terms" className="text-[#8b2f2f] hover:underline">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-[#8b2f2f] hover:underline">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
}
