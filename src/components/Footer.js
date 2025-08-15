import {
  Linkedin,
  Facebook,
  Instagram,
  X as TwitterX,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-center text-[#943032ff]">
      {/* Top red social bar */}
      <div className="bg-[#943032ff] py-4">
        <div className="flex justify-center gap-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white p-1.5 rounded">
            <Linkedin className="w-6 h-6 text-[#943032ff]" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="bg-white p-1 rounded">
            <TwitterX className="w-8 h-8 text-[#943032ff]" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white p-1.5 rounded">
            <Facebook className="w-6 h-6 text-[#943032ff]" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white p-1.5 rounded">
            <Instagram className="w-6 h-6 text-[#943032ff]" />
          </a>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border border-gray-300 py-4 px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-md sm:text-lg">
          {/* Column 1 */}
          <div className="grid grid-col space-y-1">
            <Link to="/about-us">About Us</Link>
            <Link to="/">Industries</Link>
            <Link to="/">FAQ</Link>
          </div>
          {/* Column 2 */}
          <div className="grid grid-col space-y-1">
            <Link to="/services">Services</Link>
            <Link to="/">Terms and Privacy</Link>
            <Link to="/franchise-directory">Franchise Directory</Link>
          </div>
          {/* Column 3 */}
          <div className="grid grid-col space-y-1">
            <Link to="/franchise-Your-business">Franchise your Business</Link>
            <Link to="/news">News</Link>
            <Link to="/contact-us">Contact Us</Link>
            <Link to="/admin" className=" hover:underline block">
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Logo Title */}
      <div className="py-4">
        <h3 className="text-2xl font-bold">ASAP FRANCHISE</h3>
      </div>

      {/* Bottom copyright bar */}
      <div className="bg-[#943032ff] py-2 text-white text-sm">
        Copyright ©Copy 2025 Asap Franchise
      </div>
    </footer>
  );
};

export default Footer;
