import React, { useState } from "react";
import Sidebar from "./Sidebar";
import FranchiseOverview from "./FranchiseOverview";

const OwnerLayout = () => {
  const [activeItem, setActiveItem] = useState("Franchise Details");

  const owner = {
    name: "john Doe",
    role: "Franchise Owner",
    picture: "https://i.pravatar.cc/150?img=12", // dummy image
  };

  const menuItems = [
    "Franchise Details",
    "Manage Services",
    "Set Pricing",
    "Sub-Users (Staff)",
  ];

  const renderContent = () => {
    switch (activeItem) {
      case "Franchise Details":
        return <FranchiseOverview />;
      case "Manage Services":
        return (
          <div>
            <h1>Manage Services</h1>
            <p>Service management screen...</p>
          </div>
        );
      case "Set Pricing":
        return (
          <div>
            <h1>Set Pricing</h1>
            <p>Pricing configuration here...</p>
          </div>
        );
      case "Sub-Users (Staff)":
        return (
          <div>
            <h1>Sub-Users (Staff)</h1>
            <p>Staff list & permissions...</p>
          </div>
        );
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div className="flex min-h-screen items-stretch">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800">
        <Sidebar
          owner={owner}
          menuItems={menuItems}
          activeItem={activeItem}
          onSelect={setActiveItem}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar bg-white">
        {renderContent()}
      </div>
    </div>
  );
};

export default OwnerLayout;
