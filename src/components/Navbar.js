import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full ">
      <div className={`max-w-8xl mx-auto px-10 lg:px-8 py-4 flex justify-between items-center transition-all duration-300 `}>
        {/* Logo */}
        <Link to="/" className=" text-4xl lg:text-3xl font-bold px-0 lg:px-10 tracking-wide">
          <h1 className="text-[#943032ff]">ASAP FRANCHISE</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-xl  font-semibold">
          <Link to="/about-us" className="text-[#943032ff]">About Us</Link>
          <Link to="/services" className="text-[#943032ff]">Services</Link>
          <Link to="/franchise-directory" className="text-[#943032ff]">Franchise Directory</Link>
          <Link to="/franchise-Your-business" className="text-[#943032ff]">Franchise Your Business</Link>
          <Link to="/news" className="text-[#943032ff]">News</Link>

          {/* Contact Us Button */}
          <div className="px-4">
            <Link
              to="/contact-us"
              className={` py-2 text-[#943032ff] rounded-lg transition-all text-md font-semibold`}
            >
              Contact Us
            </Link>
          </div>
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
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          } px-12 pt-2  space-y-2`}
      >
        <Link to="/about-us" onClick={() => setIsOpen(false)} className="block text-lg text-[#943032ff] font-semibold">About Us</Link>
        <Link to="/services" onClick={() => setIsOpen(false)} className="block text-lg text-[#943032ff] font-semibold">Services</Link>
        <Link to="/franchise-directory" onClick={() => setIsOpen(false)} className="block text-lg text-[#943032ff] font-semibold">Franchise Directory</Link>
        <Link to="/franchise-Your-business" onClick={() => setIsOpen(false)} className="block text-lg text-[#943032ff] font-semibold">Franchise Your Business</Link>
        <Link to="/news" onClick={() => setIsOpen(false)} className="block text-lg text-[#943032ff] font-semibold">News</Link>
        <Link
          to="/contact-us"
          onClick={() => setIsOpen(false)}
          className={`inline-block  rounded-full text-lg text-[#943032ff] font-semibold`}
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
