import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Filter, MapPin, SlidersHorizontalIcon, Star } from "lucide-react";
import HeaderImg from "../assets/HomePage/home-header.jpg";
import HeaderImgTwo from "../assets/services/Business overview.png";

const franchiseData = [
    {
        name: "Urban Coffee Co.",
        location: "West Coast",
        investment: "$150K - $300K",
        roi: "15-20% ROI",
        roiColor: "bg-green-200 text-green-800",
        image: "https://source.unsplash.com/featured/?coffee",
        rating: 4, // out of 5
    },
    {
        name: "Urban Coffee Co.",
        location: "Midwest Region",
        investment: "$150K - $300K",
        roi: "20-25% ROI",
        roiColor: "bg-green-100 text-green-700",
        image: "https://source.unsplash.com/featured/?cafe",
        rating: 4, // out of 5
    },
    {
        name: "Urban Coffee Co.",
        location: "Midwest Region",
        investment: "$150K - $300K",
        roi: "20-25% ROI",
        roiColor: "bg-green-100 text-green-700",
        image: "https://source.unsplash.com/featured/?coffee-shop",
        rating: 4, // out of 5
    },
];

export default function SearchResults() {
    const [industry, setIndustry] = useState("");
    const [location, setLocation] = useState("");
    const [investment, setInvestment] = useState("");
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/business-overview");
    };
    const handleSearch = () => {
        navigate("/search-result", {
            state: { industry, location, investment },
        });
    };
    return (
        <div className='w-full bg-white'>
            <div className="relative w-full bg-[#943032ff] p-4 md:p-0">
                {/* Background + Heading Section */}
                <div className="relative overflow-hidden h-[270px] sm:h-[680px] px-4 sm:px-6">
                    {/* Background Image */}
                    <img
                        src={HeaderImg}
                        alt="Franchise Background"
                        className="absolute inset-0 w-full h-full object-fill object-center z-0"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 z-10" />

                    {/* Heading Content */}
                    <div className="relative md:px-14 py-6 md:py-16 z-20 text-white">
                        <div className="z-20 text-white max-w-4xl space-y-4">
                            <h1 className="text-3xl md:text-6xl font-bold leading-tight">
                                Find Your Perfect Franchise<br />
                                Match Start Building Your <br />Business Empire Today
                            </h1>
                            <p className="text-2xl md:text-[45px] leading-none">
                                Discover franchise opportunities with investment levels to match every<br />
                                budget
                            </p>
                        </div>
                    </div>

                    {/* Desktop Filter Section */}
                    <div className="hidden sm:block absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-4xl px-4">
                        <div className="bg-white text-center rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-lg">
                            <select
                                className="w-full px-4 py-2 border rounded-full text-gray-700"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                            >
                                <option>Industry</option>
                                <option value="food">Food</option>
                                <option value="retail">Retail</option>
                            </select>
                            <select
                                className="w-full px-4 py-2 border rounded-full text-gray-700"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option>Location</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="delhi">Delhi</option>
                            </select>
                            <select
                                className="w-full px-4 py-2 border rounded-full text-gray-700"
                                value={investment}
                                onChange={(e) => setInvestment(e.target.value)}
                            >
                                <option>Investment</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={handleSearch}
                                className="bg-[#943032ff] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-red-800 transition"
                            >
                                FIND YOUR FRANCHISE
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Section (below image) */}
                <div className="block sm:hidden bg-[#943032ff] w-full py-8">
                    <div className="bg-white text-center text-xl rounded-xl p-4 grid grid-cols-1 gap-4 max-w-xl mx-auto">
                        <select
                            className="w-full px-4 py-3 border rounded-full text-gray-700"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                        >
                            <option>Industry</option>
                            <option value="food">Food</option>
                            <option value="retail">Retail</option>
                        </select>
                        <select
                            className="w-full px-4 py-3 border rounded-full text-gray-700"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option>Location</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">Delhi</option>
                        </select>
                        <select
                            className="w-full px-4 py-3 border rounded-full text-gray-700"
                            value={investment}
                            onChange={(e) => setInvestment(e.target.value)}
                        >
                            <option>Investment</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleSearch}
                            className="bg-white text-[#CF1C2F] px-6 py-3 text-xl rounded-full font-semibold text-sm hover:bg-gray-100 transition"
                        >
                            FIND YOUR FRANCHISE
                        </button>
                    </div>
                </div>
            </div>


            {/* Search Results */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-xl md:text-2xl">Search Results</h2>
                    <div className="flex text-2xl text-black ">
                        <SlidersHorizontalIcon className="w-7 h-7 text-gray-700  pt-2 mr-1" />
                        Filter
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                    {franchiseData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow border"
                        >
                            <img
                                src={HeaderImgTwo}
                                alt={item.name}
                                className="w-full h-72 object-cover cursor-pointer"
                                onClick={handleNavigate}
                            />
                            <div className="p-4">
                                <div
                                    className="flex justify-between font-bold text-xl md:text-2xl cursor-pointer"
                                    onClick={handleNavigate}
                                >
                                    {item.name}
                                    <span className="flex items-center">
                                        {[...Array(5)].map((_, i) =>
                                            i < item.rating ? (
                                                <Star
                                                    key={i}
                                                    size={20}
                                                    className="text-yellow-400 fill-yellow-400"
                                                />
                                            ) : (
                                                <Star key={i} size={20} className="text-gray-300" />
                                            )
                                        )}
                                    </span>
                                </div>
                                <div className="flex font-bold text-lg md:text-xl text-gray-600 mt-1">
                                    <MapPin size={32} />
                                    {item.location}
                                </div>
                                <div className="flex flex-wrap justify-between gap-2 mt-3 text-sm font-medium">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                        {item.investment}
                                    </span>
                                    <span className={`${item.roiColor} px-2 py-1 rounded-full`}>
                                        {item.roi}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
