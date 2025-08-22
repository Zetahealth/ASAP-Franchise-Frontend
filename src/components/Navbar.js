import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser")); // 👈 use this instead

    if (token && loggedUser) {
      setIsLoggedIn(true);
      setUser(loggedUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };
  const linkClasses =
    "px-2 text-[#943032ff] rounded-full text-center " +
    "transition-all duration-300 ease-out transform " +
    "hover:scale-105 hover:-translate-y-1 " +
    "active:scale-95";
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-8xl mx-auto px-10 lg:pl-8 pr-2 py-4 flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <Link to="/" className="no-underline">
          <h1
            className="text-4xl md:text-4xl font-bold text-[#943032ff]
                   transition-all duration-300 ease-in-out 
                   hover:scale-105 "
          >
            ASAP FRANCHISE
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 text-xl font-semibold">
          <Link
            to="/about-us"
            className={linkClasses}
          >
            About Us
          </Link>
          <Link
            to="/services"
            className={linkClasses}
          >
            Services
          </Link>
          <Link
            to="/franchise-directory"
            className={linkClasses}
          >
            Franchise Directory
          </Link>
          <Link
            to="/franchise-Your-business"
            className={linkClasses}
          >
            Franchise Your Business
          </Link>
          <Link
            to="/news"
            className={linkClasses}
          >
            News
          </Link>

          <Link
            to="/contact-us"
            className={linkClasses}
          >
            Contact Us
          </Link>


          {/* Auth Section */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-4 ml-6">
              <Link
                to="/login"
                className=" flex items-center px-2 py-2 bg-[#943032ff] text-white rounded-lg 
             transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg 
             active:scale-95"
              >
                <LogIn className="text-white mr-2" size={16} />
                Login
              </Link>
              {/* <Link
                to="/user/register"
                className="px-4 py-2 border border-[#943032ff] text-[#943032ff] rounded-lg hover:bg-[#943032ff] hover:text-white"
              >
                Register
              </Link> */}
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-6">
              {/* Profile Pic */}
              {/* Profile Pic */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  if (user?.role === "owner") {
                    navigate(`/owner/account/${user.username}`); // 👈 navigate to owner account
                  } else {
                    navigate(`/user/account/${user.username}`); // 👈 normal user
                  }
                }}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=943032&color=fff`}
                  alt="profile"
                  className="w-14 h-14 rounded-full border-2 border-gray-800 transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg 
             active:scale-95"
                />
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center px-2 py-2 bg-[#943032ff] text-white rounded-lg 
             transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg 
             active:scale-95"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[400px] opacity-100 pb-4" : "max-h-0 opacity-0"
          } px-12 pt-2 space-y-2`}
      >
        <Link
          to="/about-us"
          onClick={() => setIsOpen(false)}
          className="block text-lg text-[#943032ff] font-bold transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 
             active:scale-95"
        >
          About Us
        </Link>
        <Link
          to="/services"
          onClick={() => setIsOpen(false)}
          className="block text-lg text-[#943032ff] font-bold transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 
             active:scale-95"
        >
          Services
        </Link>
        <Link
          to="/franchise-directory"
          onClick={() => setIsOpen(false)}
          className="block text-lg text-[#943032ff] font-bold transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 
             active:scale-95"
             >
          Franchise Directory
        </Link>
        <Link
          to="/franchise-Your-business"
          onClick={() => setIsOpen(false)}
          className="block text-lg text-[#943032ff] font-bold transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 
             active:scale-95"
        >
          Franchise Your Business
        </Link>
        <Link
          to="/news"
          onClick={() => setIsOpen(false)}
          className="block text-lg text-[#943032ff] font-bold transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 
             active:scale-95"
        >
          News
        </Link>
        <Link
          to="/contact-us"
          onClick={() => setIsOpen(false)}
          className="block text-lg font-bold text-[#943032ff] font-bold transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 
             active:scale-95"
        >
          Contact Us
        </Link>

        {/* Auth Section (Mobile) */}
        {!isLoggedIn ? (
          <div className="flex flex-col gap-2 pt-4 text-center">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className=" flex justify-center items-center text-center px-2 py-2 bg-[#943032ff] text-white rounded-lg 
             transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg 
             active:scale-95"
            >
              <LogIn className="text-white mr-2" size={16} />
              Login
            </Link>
            {/* <Link
              to="/user/register"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 border border-[#943032ff] text-[#943032ff] rounded-lg"
            >
              Register
            </Link> */}
          </div>
        ) : (
          <div className="flex flex-col gap-3 pt-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                navigate(`/user/account/${user.username}`); // 👈 navigate with id/username
              }}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=943032&color=fff`}
                alt="profile"
                className="w-14 h-14 rounded-full border border-gray-300 transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg 
             active:scale-95"
              />
              <span className="text-[#943032ff] font-semibold transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 
             active:scale-95">{user.username}</span>
            </div>

            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg 
             active:scale-95"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
