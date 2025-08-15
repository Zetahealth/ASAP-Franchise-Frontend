import React from "react";
import { NavLink } from "react-router-dom";
// import "./sidebar.css"; // Import hidden scrollbar styles

// Optional features that can be enabled later
const optionalMenuItems = [
  { name: "Services Management", path: "/admin/services-management" },
  { name: "Location Settings", path: "/admin/location-settings" }
];

// Core + important features
const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Manage Franchises", path: "/admin/manage-franchises" },
  { name: "Add/Edit Franchise", path: "/admin/add-edit-franchise" },
  { name: "Manage Users", path: "/admin/manage-users" },

  { name: "News Management", path: "/admin/news-management" },
  { name: "Related Documents", path: "/admin/related-document" },
  { name: "Messages & Inquiries", path: "/admin/messages" },
  { name: "Update Mail Templates", path: "/admin/update-mail" },
  { name: "Payments & Transactions", path: "/admin/payments" },
  { name: "Reports & Analytics", path: "/admin/reports" },
  { name: "Push Notifications", path: "/admin/notifications" },
  { name: "Reviews & Ratings", path: "/admin/reviews" },
  { name: "Admin Registration", path: "/admin/admin-registration" },
  { name: "Security & Roles", path: "/admin/security" },
  { name: "System Settings", path: "/admin/system-settings" }
];

const Sidebar = ({ showOptional = false }) => {
  const finalMenu = showOptional
    ? [...menuItems, ...optionalMenuItems]
    : menuItems;

  return (
    <div className="fixed left-0 top-0 w-64 bg-[#943032ff] p-4 space-y-2 h-screen overflow-y-auto no-scrollbar">
      {finalMenu.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          className={({ isActive }) =>
            `block text-lg font-semibold px-4 py-2 rounded transition ${isActive
              ? "bg-white text-[#943032ff]"
              : "text-gray-300 hover:bg-white hover:text-[#943032ff]"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
