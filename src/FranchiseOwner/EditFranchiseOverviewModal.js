import React, { useState } from "react";

const EditFranchiseModal = ({ franchise, setFranchise, onClose }) => {
    const [form, setForm] = useState(franchise);
    const [activeTab, setActiveTab] = useState("overview"); // "overview" | "details"

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (field, index, value) => {
        const updated = [...form[field]];
        updated[index] = value;
        setForm((prev) => ({ ...prev, [field]: updated }));
    };

    const handleTrainingArrayChange = (phase, index, value) => {
        const updated = [...form.training[phase]];
        updated[index] = value;
        setForm((prev) => ({
            ...prev,
            training: { ...prev.training, [phase]: updated },
        }));
    };

    const handleImageUpload = (index, file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updated = [...form.images];
                updated[index] = reader.result;
                setForm((prev) => ({ ...prev, images: updated }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setFranchise(form);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-2/3 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl text-center text-[#943032ff] font-bold mb-4 ">Edit Franchise Details</h2>

                {/* Tabs */}
                <div className="flex border-b-2 mb-4">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-2 font-medium text-xl border-b-2 ${activeTab === 'overview'
                            ? 'border-red-800 text-white bg-[#943032ff]'
                            : 'border-transparent text-gray-600'
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`px-6 py-2 font-medium text-xl border-b-2 ${activeTab === 'details'
                            ? 'border-red-800 text-white bg-[#943032ff]'
                            : 'border-transparent text-gray-600'
                            }`}
                    >
                        Details
                    </button>
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setForm((prev) => ({ ...prev, headerImage: reader.result }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="w-full border p-2 mb-2"
                        />

                        {form.headerImage && (
                            <div className="m-2">
                                <img
                                    src={form.headerImage}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-lg border"
                                />
                            </div>
                        )}

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                            placeholder="Franchise Name"
                        />
                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                            placeholder="Location"
                        />
                        <input
                            type="text"
                            name="year"
                            value={form.year}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                            placeholder="Establishment Year"
                        />

                        {/* Financial Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="investment"
                                value={form.investment}
                                onChange={handleChange}
                                className="w-full border p-2"
                                placeholder="Investment Range"
                            />
                            <input
                                type="text"
                                name="breakeven"
                                value={form.breakeven}
                                onChange={handleChange}
                                className="w-full border p-2"
                                placeholder="Break Even Period"
                            />
                            <input
                                type="text"
                                name="roi"
                                value={form.roi}
                                onChange={handleChange}
                                className="w-full border p-2"
                                placeholder="ROI"
                            />
                            <input
                                type="text"
                                name="area"
                                value={form.area}
                                onChange={handleChange}
                                className="w-full border p-2"
                                placeholder="Area Requirement"
                            />
                        </div>

                        <input
                            type="text"
                            name="locations"
                            value={form.locations}
                            onChange={handleChange}
                            className="w-full border p-2 mt-2 mb-2"
                            placeholder="No. of Current Locations"
                        />

                        {/* About Section */}
                        <h3 className="font-semibold">About</h3>
                        <textarea
                            name="about"
                            value={form.about}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                            placeholder="About"
                        />

                        {/* Available Locations */}
                        <h3 className="font-semibold">Available Locations</h3>
                        {form.available?.map((loc, idx) => (
                            <input
                                key={idx}
                                type="text"
                                value={loc}
                                onChange={(e) =>
                                    handleArrayChange("available", idx, e.target.value)
                                }
                                className="w-full border p-2 mb-2"
                            />
                        ))}

                        {/* Requirements */}
                        <h3 className="font-semibold">Requirements</h3>
                        {form.requirements?.map((req, idx) => (
                            <input
                                key={idx}
                                type="text"
                                value={req}
                                onChange={(e) =>
                                    handleArrayChange("requirements", idx, e.target.value)
                                }
                                className="w-full border p-2 mb-2"
                            />
                        ))}

                        {/* Support */}
                        <textarea
                            name="support"
                            value={form.support}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                            placeholder="Support & Training"
                        />
                    </div>
                )}

                {/* Details Tab */}
                {activeTab === "details" && (
                    <div>
                        {/* About Image */}
                        <h3 className="font-semibold">About Image</h3>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(0, e.target.files[0])}
                            className="w-full border p-2 mb-2"
                        />
                        {form.images[0] && (
                            <img
                                src={form.images[0]}
                                alt="About"
                                className="w-40 h-40 object-cover rounded-lg border"
                            />
                        )}

                        {/* Who We’re Looking For */}
                        <h3 className="font-semibold">Who We’re Looking For</h3>
                        {form.whoWeLookFor?.map((item, idx) => (
                            <input
                                key={idx}
                                type="text"
                                value={item}
                                onChange={(e) =>
                                    handleArrayChange("whoWeLookFor", idx, e.target.value)
                                }
                                className="w-full border p-2 mb-2"
                            />
                        ))}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(1, e.target.files[0])}
                            className="w-full border p-2 mb-2"
                        />
                        {form.images[1] && (
                            <img
                                src={form.images[1]}
                                alt="Who We’re Looking For"
                                className="w-40 h-40 object-cover rounded-lg border"
                            />
                        )}

                        {/* Training & Support */}
                        <h3 className="font-semibold">Training & Support</h3>
                        <h4 className="font-semibold">Pre-Opening</h4>
                        {form.training?.preOpening?.map((item, idx) => (
                            <input
                                key={idx}
                                type="text"
                                value={item}
                                onChange={(e) =>
                                    handleTrainingArrayChange("preOpening", idx, e.target.value)
                                }
                                className="w-full border p-2 mb-2"
                            />
                        ))}

                        <h4 className="font-semibold">Grand Opening</h4>
                        {form.training?.grandOpening?.map((item, idx) => (
                            <input
                                key={idx}
                                type="text"
                                value={item}
                                onChange={(e) =>
                                    handleTrainingArrayChange("grandOpening", idx, e.target.value)
                                }
                                className="w-full border p-2 mb-2"
                            />
                        ))}

                        <textarea
                            name="note"
                            value={form.training?.note || ""}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    training: { ...prev.training, note: e.target.value },
                                }))
                            }
                            className="w-full border p-2 mb-2"
                            placeholder="Training Notes"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(2, e.target.files[0])}
                            className="w-full border p-2 mb-2"
                        />
                        {form.images[2] && (
                            <img
                                src={form.images[2]}
                                alt="Training"
                                className="w-40 h-40 object-cover rounded-lg border"
                            />
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditFranchiseModal;
