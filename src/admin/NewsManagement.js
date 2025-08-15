import React, { useState } from "react";
import {
    Plus,
    Pencil,
    Trash,
    Image as ImageIcon,
    Save,
    X,
    List,
    FileText,
} from "lucide-react";


const NewsManagement = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState("add");
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        date: "",
        image: "",
        paragraphs: [""],
        listItems: [""],
    });
    const [newsList, setNewsList] = useState([
        {
            id: 1,
            title: "BurgerVerse Plans East Coast Takeover",
            date: "2025-07-24",
            image: "https://via.placeholder.com/150x100?text=BurgerVerse",
            paragraphs: [
                "BurgerVerse, the rapidly growing gourmet burger chain known for its bold flavors and futuristic-themed dining experience, has announced an ambitious expansion plan targeting key cities along the U.S. East Coast.",
                "The brand plans to open 25 new locations over the next 18 months, focusing on metropolitan areas such as New York City, Boston, Philadelphia, and Miami."
            ],
            listItems: [
                "Boosts franchise opportunities for entrepreneurs",
                "Creates over 1,000 new jobs in the region",
                "Brings innovative dining concepts to major East Coast cities"
            ]
        },
        {
            id: 2,
            title: "TechByte Launches AI-Powered Learning Platform",
            date: "2025-08-05",
            image: "https://via.placeholder.com/150x100?text=TechByte",
            paragraphs: [
                "TechByte has unveiled a new AI-powered learning platform aimed at revolutionizing online education.",
                "The platform uses adaptive algorithms to personalize learning experiences for each student."
            ],
            listItems: [
                "AI-driven course recommendations",
                "Gamified learning experience",
                "24/7 tutor assistance powered by AI"
            ]
        },
        {
            id: 3,
            title: "GreenEarth Announces 2025 Sustainability Goals",
            date: "2025-08-01",
            image: "https://via.placeholder.com/150x100?text=GreenEarth",
            paragraphs: [
                "GreenEarth has released its 2025 sustainability goals focusing on renewable energy, waste reduction, and eco-friendly packaging.",
                "The company plans to achieve carbon neutrality by 2030."
            ],
            listItems: [
                "50% renewable energy usage by 2026",
                "Zero single-use plastics by 2027",
                "Partnerships with eco-friendly suppliers"
            ]
        }
    ]);


    // Add new field for paragraph
    const addParagraph = () => {
        setFormData({
            ...formData,
            paragraphs: [...formData.paragraphs, ""],
        });
    };

    // Add new field for list item
    const addListItem = () => {
        setFormData({
            ...formData,
            listItems: [...formData.listItems, ""],
        });
    };

    const handleAddClick = () => {
        setFormMode("add");
        setFormData({
            id: null,
            title: "",
            date: "",
            image: "",
            paragraphs: [""],
            listItems: [""],
        });
        setIsFormOpen(true);
    };

    const handleEditClick = (news) => {
        setFormMode("edit");
        setFormData(news);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (id) => {
        setNewsList(newsList.filter((n) => n.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formMode === "add") {
            setNewsList([...newsList, { ...formData, id: Date.now() }]);
        } else {
            setNewsList(newsList.map((n) => (n.id === formData.id ? formData : n)));
        }
        setIsFormOpen(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">News Management</h2>
                <button
                    onClick={handleAddClick}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                    <Plus size={18} /> Add News
                </button>
            </div>

            {/* News Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">Image</th>
                            <th className="border border-gray-200 px-4 py-2">Title</th>
                            <th className="border border-gray-200 px-4 py-2">Date</th>
                            <th className="border border-gray-200 px-4 py-2 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsList.map((news) => (
                            <tr key={news.id} className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2 text-center">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-20 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="border border-gray-200 px-4 py-2">{news.title}</td>
                                <td className="border border-gray-200 px-4 py-2">{news.date}</td>
                                <td className="border border-gray-200 px-4 py-2 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleEditClick(news)}
                                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(news.id)}
                                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {newsList.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No news found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
                    <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
                        <h3 className="text-lg font-bold mb-4">
                            {formMode === "add" ? "Add News" : "Edit News"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="mt-1 block w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium">Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({ ...formData, date: e.target.value })
                                    }
                                    className="mt-1 block w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium">Image URL</label>
                                <div className="flex items-center gap-2">
                                    <ImageIcon className="text-gray-500" size={20} />
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) =>
                                            setFormData({ ...formData, image: e.target.value })
                                        }
                                        className="mt-1 block w-full border rounded-lg px-3 py-2"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>

                            {/* Paragraphs */}
                            <div>
                                <label className="block text-sm font-medium flex items-center gap-2">
                                    <FileText size={16} /> Paragraphs
                                </label>
                                {formData.paragraphs.map((para, index) => (
                                    <textarea
                                        key={index}
                                        value={para}
                                        onChange={(e) => {
                                            const updated = [...formData.paragraphs];
                                            updated[index] = e.target.value;
                                            setFormData({ ...formData, paragraphs: updated });
                                        }}
                                        className="mt-1 block w-full border rounded-lg px-3 py-2 mb-2"
                                        placeholder={`Paragraph ${index + 1}`}
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={addParagraph}
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    + Add another paragraph
                                </button>
                            </div>

                            {/* List Items */}
                            <div>
                                <label className="block text-sm font-medium flex items-center gap-2">
                                    <List size={16} /> List Items
                                </label>
                                {formData.listItems.map((item, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const updated = [...formData.listItems];
                                            updated[index] = e.target.value;
                                            setFormData({ ...formData, listItems: updated });
                                        }}
                                        className="mt-1 block w-full border rounded-lg px-3 py-2 mb-2"
                                        placeholder={`List item ${index + 1}`}
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={addListItem}
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    + Add another list item
                                </button>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                                >
                                    <X size={18} /> Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 text-white px-4 py-2 rounded-lg transition bg-green-600 hover:bg-green-700"
                                >
                                    <Save size={18} /> {formMode === "add" ? "Save" : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsManagement;
