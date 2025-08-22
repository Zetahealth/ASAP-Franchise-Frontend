import React from "react";

const Sidebar = ({ owner, menuItems, activeItem, onSelect }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      {/* Owner Info */}
      <div className="p-6 border-b border-gray-700 text-center">
        <img
          src={owner.picture}
          alt="Owner"
          className="w-40 h-40 rounded-full mx-auto mb-2"
        />
        <h2 className="text-xl font-semibold">{owner.name}</h2>
        <p className="text-md text-gray-400">{owner.role}</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item} className="mb-2">
              <button
                onClick={() => onSelect(item)}
                className={`w-full text-left text-xl px-4 py-2 rounded-lg ${
                  activeItem === item
                    ? "bg-gray-600 font-semibold"
                    : "hover:bg-gray-700"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
