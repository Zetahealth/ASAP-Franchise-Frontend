import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileEdit,
  Newspaper,
  Wrench,
  MessageSquare,
  FileText,
  MailCheck,
  UserPlus,
  BarChart3,
  CreditCard,
  MapPin,
  Bell,
  Star,
  Shield,
  Settings
} from "lucide-react";

// Optional features (hidden by default)
const optionalMenuItems = [
  { name: "Services Management", icon: <Wrench size={50} className="text-[#8b2f2f]" />, path: "/admin/services-management" },
  { name: "Location Settings", icon: <MapPin size={50} className="text-[#8b2f2f]" />, path: "/admin/location-settings" }
];

// Default features (always shown)
const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={50} className="text-[#8b2f2f]" />, path: "/admin/dashboard" },
  { name: "Manage Franchises", icon: <Building2 size={50} className="text-[#8b2f2f]" />, path: "/admin/manage-franchises" },
  { name: "Add/Edit Franchise", icon: <FileEdit size={50} className="text-[#8b2f2f]" />, path: "/admin/add-edit-franchise" },
  { name: "Manage Users", icon: <Users size={50} className="text-[#8b2f2f]" />, path: "/admin/manage-users" },
  { name: "News Management", icon: <Newspaper size={50} className="text-[#8b2f2f]" />, path: "/admin/news-management" },
  { name: "Related Documents", icon: <FileText size={50} className="text-[#8b2f2f]" />, path: "/admin/related-document" },
  { name: "Messages & Inquiries", icon: <MessageSquare size={50} className="text-[#8b2f2f]" />, path: "/admin/messages" },
  { name: "Update Mail Templates", icon: <MailCheck size={50} className="text-[#8b2f2f]" />, path: "/admin/update-mail" },
  { name: "Payments & Transactions", icon: <CreditCard size={50} className="text-[#8b2f2f]" />, path: "/admin/payments" },
  { name: "Reports & Analytics", icon: <BarChart3 size={50} className="text-[#8b2f2f]" />, path: "/admin/reports" },
  { name: "Push Notifications", icon: <Bell size={50} className="text-[#8b2f2f]" />, path: "/admin/notifications" },
  { name: "Reviews & Ratings", icon: <Star size={50} className="text-[#8b2f2f]" />, path: "/admin/reviews" },
  { name: "Admin Registration", icon: <UserPlus size={50} className="text-[#8b2f2f]" />, path: "/admin/admin-registration" },
  { name: "Security & Roles", icon: <Shield size={50} className="text-[#8b2f2f]" />, path: "/admin/security" },
  { name: "System Settings", icon: <Settings size={50} className="text-[#8b2f2f]" />, path: "/admin/system-settings" }
];

function AdminDashboard({ showOptional = false }) {
  const navigate = useNavigate();
  const finalMenu = showOptional ? [...menuItems, ...optionalMenuItems] : menuItems;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 bg-white min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-[#8b2f2f] mb-6"
      >
        Admin Dashboard
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {finalMenu.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-64 h-64 bg-[#8b2f2f] rounded-2xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <div className="p-4 bg-white rounded-full shadow-md">{item.icon}</div>
            <span className="mt-4 text-2xl text-center px-2 font-semibold text-white">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
