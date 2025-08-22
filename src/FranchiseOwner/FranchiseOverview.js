import React, { useState } from "react";
import { MapPin, Heart, Mail } from "lucide-react";
import EditFranchiseModal from "./EditFranchiseOverviewModal"; // New modal component
import FranchiseDetail from './FranchiseDetails';
import HeaderImg from "../assets/services/Business overview.png";
import AboutFranchiseOne from "../assets/Business Details/FranchiseImage-1.png";
import AboutFranchiseTwo from "../assets/Business Details/FranchiseImage-2.png";
import AboutFranchiseThree from "../assets/Business Details/FranchiseImage-3.png";

const FranchiseDetails = () => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Franchise data (in real app, fetch from API)
    const [franchise, setFranchise] = useState({
        name: "Urban Coffee Co.",
        location: "West Coast",
        investment: "$150k - $300k",
        breakeven: "12-18 mo",
        area: "1000 - 2000 sq.ft",
        roi: "15-20% ROI",
        locations: "4",
        year: "2025",
        about:
            "Urban Coffee Co. is a premium coffee franchise offering specialty coffee in a modern, welcoming environment. With over 50 locations nationwide, we’re expanding rapidly and looking for passionate entrepreneurs to join our family.",
        origin: "United States",
        available: ["United States", "Singapore", "Philippines", "Japan"],
        requirements: [
            "Minimum liquid capital: $100,000",
            "Net worth: $300,000+",
            "Business experience preferred",
            "Passion for coffee and customer service",
        ],
        support:
            "We provide comprehensive training including barista training, business operations, marketing support, and ongoing operational guidance. Our team supports you from site selection through grand opening and beyond.",

        whoWeLookFor: [
            "Passionate about coffee and customer service",
            "Detail-oriented with strong leadership skills",
            "Able to manage and motivate a team",
            "Business-savvy with a community-first mindset",
        ],
        training: {
            preOpening: [
                "Barista training (coffee knowledge, drink prep, equipment use)",
                "Store setup & supplier coordination",
                "Hiring and team training support",
                "Site selection and lease negotiation",
            ],
            grandOpening: [
                "Marketing launch toolkit",
                "On-site opening assistance",
                "Ongoing operations coaching",
                "Regional performance reviews and business mentoring",
            ],
            note: "We believe in a partnership-first approach — your success is our priority.",
        },
    headerImage:HeaderImg,
        // ✅ replace string paths with imported images
        images: [AboutFranchiseOne, AboutFranchiseTwo, AboutFranchiseThree],
    });


    return (
        <div className="w-full bg-white">
            {/* Header Section */}
            <section className="w-full pb-16 mx-auto max-w-8xl">
                <div className="md:col-span-7">
                    <section className="w-full pb-4  mx-auto">
                        <div className="relative overflow-hidden h-[450px] flex items-center justify-center text-center px-6">
                            <img
                                src={franchise.headerImage}
                                alt="Business overview header"
                                className="absolute inset-0 w-full h-[450px] object-fill object-top z-0"
                            />
                        </div>
                    </section>
                    <div className="text-black space-y-2 py-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold">{franchise.name}</h1>
                            <p className="flex text-gray-400 text-2xl font-bold">
                                <MapPin size={32} />
                                {franchise.location}
                            </p>
                        </div>
                        {/* Edit Button */}
                        <button
                            onClick={() => setIsEditOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Edit Details
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 gap-2 px-4">
                    <div className="space-y-2 text-center">
                        <div className="bg-[#b9deffff] py-1">
                            <h1 className="text-[#1d92f9ff] text-xl font-bold">
                                {franchise.investment}
                            </h1>
                            <p className="text-gray-500 text-sm font-semibold">
                                Initial Investment
                            </p>
                        </div>
                        <div className="bg-[#b9deffff] py-1">
                            <h1 className="text-[#1d92f9ff] text-xl font-bold">
                                {franchise.breakeven}
                            </h1>
                            <p className="text-gray-500 text-sm font-semibold">Break Even</p>
                        </div>
                        <div className="bg-[#b9deffff] py-1">
                            <h1 className="text-[#1d92f9ff] text-xl font-bold">
                                Area Requirements
                            </h1>
                            <p className="text-gray-500 text-sm font-semibold">
                                {franchise.area}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2 text-center">
                        <div className="bg-[#cbf7d2ff] py-1">
                            <h1 className="text-[#29d849ff] text-xl font-bold">
                                {franchise.roi}
                            </h1>
                            <p className="text-gray-500 text-sm font-semibold">Average</p>
                        </div>
                        <div className="bg-[#cbf7d2ff] py-1">
                            <h1 className="text-[#29d849ff] text-xl font-bold">
                                {franchise.locations}
                            </h1>
                            <p className="text-gray-500 text-sm font-semibold">Locations</p>
                        </div>
                        <div className="bg-[#cbf7d2ff] py-1">
                            <h1 className="text-[#29d849ff] text-xl font-bold">
                                {franchise.year}
                            </h1>
                            <p className="text-gray-500 text-sm font-semibold">
                                Establishment Year
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Content */}
            <section className="max-w-7xl mx-auto px-4 mb-12 bg-white">
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
                {activeTab === "details" && (
                    <FranchiseDetail franchise={franchise} setFranchise={setFranchise} />
                )}

                {/* Content */}
                {activeTab === 'overview' && (
                    <section className="max-w-7xl mx-auto px-4 mb-12 bg-white">
                        <div className="space-y-6">
                            <div className="pb-2 border-b-2">
                                <h3 className="font-semibold text-xl">About</h3>
                                <p className="text-lg text-gray-700">{franchise.about}</p>
                            </div>

                            <div className="pb-2 border-b-2">
                                <h3 className="font-semibold text-xl">Country of Origin</h3>
                                <p className="text-lg text-gray-700">{franchise.origin}</p>
                            </div>

                            <div className="pb-2 border-b-2">
                                <h3 className="font-semibold text-xl">Available Locations</h3>
                                <ul className="list-disc pl-6 text-lg text-gray-700">
                                    {franchise.available.map((loc, idx) => (
                                        <li key={idx}>{loc}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pb-2 border-b-2">
                                <h3 className="font-semibold text-xl">Franchisee Requirements</h3>
                                <ul className="list-disc pl-6 text-lg text-gray-700">
                                    {franchise.requirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pb-2 border-b-2">
                                <h3 className="font-semibold text-xl">Support & Training</h3>
                                <p className="text-lg text-gray-700">{franchise.support}</p>
                            </div>

                            {/* CTA Buttons */}
                            {/* <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <button className="border border-[#943032ff] text-[#943032ff] px-24 py-2 rounded-full flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Save
            </button>
            <button className="bg-[#943032ff] text-white px-24 py-2 rounded-full flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact
            </button>
          </div> */}
                        </div>
                    </section>
                )}
            </section>

            {/* Modal */}
            {isEditOpen && (
                <EditFranchiseModal
                    franchise={franchise}
                    setFranchise={setFranchise}
                    onClose={() => setIsEditOpen(false)}
                />
            )}
        </div>
    );
};

export default FranchiseDetails;
