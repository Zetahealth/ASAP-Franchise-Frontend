import React, { useState } from "react";
import { Plus, Eye, Pencil, Trash2, Search } from "lucide-react";

const ManageFranchises = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const franchises = [
    { id: 1, name: "ASAP Franchise Mumbai", owner: "John Doe", location: "Mumbai", status: "Active" },
    { id: 2, name: "ASAP Franchise Delhi", owner: "Jane Smith", location: "Delhi", status: "Pending" },
    { id: 3, name: "ASAP Franchise Bangalore", owner: "Rahul Sharma", location: "Bangalore", status: "Inactive" },
  ];

  const filteredFranchises = franchises.filter((franchise) =>
    franchise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Franchises</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus size={18} /> Add Franchise
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-1/3 mb-6">
        <Search className="text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search franchises..."
          className="ml-2 outline-none w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Franchise Name</th>
              <th className="py-3 px-4 text-left">Owner</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFranchises.map((franchise) => (
              <tr key={franchise.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{franchise.name}</td>
                <td className="py-3 px-4">{franchise.owner}</td>
                <td className="py-3 px-4">{franchise.location}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    franchise.status === "Active"
                      ? "text-green-600"
                      : franchise.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {franchise.status}
                </td>
                <td className="py-3 px-4 flex justify-center gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredFranchises.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No franchises found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFranchises;
