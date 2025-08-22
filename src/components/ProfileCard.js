import React, { useState } from "react";
import { Mail, Edit, User, Phone, Globe, Shield } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import DummyAvatar from "../assets/Profile Image/Dummy avatar1.jpg"

const ProfileCard = ({ user, onUpdateUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-white shadow-sm rounded-lg p-6">
            {/* Header Section */}
            <div className="flex  justify-center items-center gap-4 border-b pb-4 mb-6">
                {/* Profile Avatar */}
                <img
                    src={DummyAvatar || "https://via.placeholder.com/80?text=User"}
                    alt="User Avatar"
                    className="w-40 h-40 rounded-lg object-cover border"
                />
                <div>
                    <h2 className="text-xl font-semibold">
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2">
                        <User className="w-4 h-4" /> @{user.username}
                    </p>
                </div>
                <button
                    className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700
                                transition-all duration-300 ease-out 
                                transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg 
                                active:scale-95"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Edit className="w-4 h-4" /> Edit Profile
                </button>
            </div>

            {/* User Details */}
            <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{user.email}</span>
                </p>

                <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{user.phone}</span>
                </p>

                <p className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span>{user.country}</span>
                </p>

                {user.role && (
                    <p className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="capitalize">{user.role}</span>
                    </p>
                )}
            </div>

            {/* Modal */}
            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={user}
                onSave={onUpdateUser}
            />
        </div>
    );
};

export default ProfileCard;
