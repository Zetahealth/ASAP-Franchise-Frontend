import React from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // clear login flag
    navigate("/admin-login"); // go to login page
  };
  return (
    <div className="h-screen flex bg-white text-[#943032ff]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1" style={{ marginLeft: "16rem" }}>
        {/* Topbar */}
        <div className="w-full bg-gray-100 px-6 py-6 flex justify-between items-center sticky top-0 z-10">
          <span className="text-3xl font-bold">
            Welcome : info@asapfranchise.com
          </span>
          <div className="space-x-8">
            <button
              onClick={handleLogout}
              className="bg-transparent text-[#943032ff] font-bold px-4 py-2 rounded-lg border-2 border-[#943032ff] text-xl hover:bg-red-600 hover:text-white">
              Logout
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-white p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
