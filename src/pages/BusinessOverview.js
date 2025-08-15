import React, { useState } from 'react';
import {
    Utensils,
    ShoppingCart,
    HeartPulse,
    Dumbbell,
    GraduationCap,
    Baby,
    Wrench,
    Car,
    Briefcase,
    Home as IndustruHome,
    Plane,
    Clapperboard,
    PawPrint,
    Truck,
    Banknote,
    Brush,
    PlayCircle,
    Clock,
    MapPin,
    Heart,
    Mail,
} from 'lucide-react';
import HeaderImg from "../assets/services/Business overview.png";
// News images
import NewsImgone from "../assets/HomePage/news-1.png";
import NewsImgtwo from "../assets/HomePage/news-2.png";
import NewsImgThree from "../assets/HomePage/news-3.png";
import BusinessDetails from './BusinessDetails';
import ExploreByIndustry from '../components/ExploreByIndustry';
import NewsCompinent from '../components/NewsCompinent';

const industries = [
    { icon: <Utensils size={18} />, label: 'Food & Beverage' },
    { icon: <ShoppingCart size={18} />, label: 'Retail & Convenience' },
    { icon: <HeartPulse size={18} />, label: 'Health & Wellness' },
    { icon: <Dumbbell size={18} />, label: 'Fitness & Gym Centers' },
    { icon: <GraduationCap size={18} />, label: 'Education & Training' },
    { icon: <Baby size={18} />, label: 'Children & Kids Services' },
    { icon: <Wrench size={18} />, label: 'Home Improvement & Maintenance' },
    { icon: <Car size={18} />, label: 'Automotive & Car Care' },
    { icon: <Briefcase size={18} />, label: 'Professional & Business Services' },
    { icon: <IndustruHome size={18} />, label: 'Real Estate & Property Management' },
    { icon: <Plane size={18} />, label: 'Hospitality & Travel' },
    { icon: <Clapperboard size={18} />, label: 'Entertainment & Recreation' },
    { icon: <PawPrint size={18} />, label: 'Pet Care & Services' },
    { icon: <Truck size={18} />, label: 'Logistics & Delivery' },
    { icon: <Banknote size={18} />, label: 'Finance & Insurance' },
    { icon: <Brush size={18} />, label: 'Beauty & Personal Care' },
];
// You can store this in a separate file if needed
const franchiseNews = [
    {
        title: "BurgerVerse Plans East Coast Takeover",
        date: "24 July 2025",
        image: NewsImgone, // Replace with actual path
    },
    {
        title: "BeanBolt Coffee Launches Drive-Thru-Only Concept",
        date: "24 July 2025",
        image: NewsImgtwo,
    },
    {
        title: "PupN'Go Grooming Expands Nationwide",
        date: "24 July 2025",
        image: NewsImgThree,
    },
];

const BusinessOverview = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className='w-full bg-white'>
            <section className="w-full pb-4  mx-auto">
                <div className="relative overflow-hidden h-[450px] flex items-center justify-center text-center px-6">
                    <img
                        src={HeaderImg}
                        alt="Business overview header"
                        className="absolute inset-0 w-full h-[450px] object-fill object-top z-0"
                    />
                </div>
            </section>

            <section className="w-full pb-16 mx-auto max-w-7xl">
                <div className="md:col-span-7">
                    <div className="text-black space-y-2  py-4">
                        <h1 className="text-4xl font-bold">Urban Coffee Co.</h1>
                        <p className="flex text-gray-400 text-2xl font-bold">
                            <MapPin size={32} />
                            West Coast
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4">
                    <div className='space-y-2 text-center '>
                        <div className='bg-[#b9deffff] py-1'>
                            <h1 className='text-[#1d92f9ff] text-xl font-bold '> $150k - $300k</h1>
                            <p className='text-gray-500 text-sm font-semibold'>Inital Investment</p>
                        </div>
                        <div className='bg-[#b9deffff] py-1'>
                            <h1 className='text-[#1d92f9ff] text-xl font-bold '>12-18 mo</h1>
                            <p className='text-gray-500 text-sm font-semibold'>Break Even</p>
                        </div>
                    </div>
                    <div className='space-y-2 text-center'>
                        <div className='bg-[#cbf7d2ff] py-1 '>
                            <h1 className='text-[#29d849ff] text-xl font-bold '>15-20% ROI</h1>
                            <p className='text-gray-500 text-sm font-semibold'>Average</p>
                        </div>
                        <div className='bg-[#cbf7d2ff] py-1'>
                            <h1 className='text-[#29d849ff] text-xl font-bold '>4</h1>
                            <p className='text-gray-500 text-sm font-semibold'>Locations</p>
                        </div>
                    </div>
                </div>
            </section>

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
                {activeTab === "details" && <BusinessDetails />}
                {/* Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className='pb-2 border-b-2'>
                            <h3 className="font-semibold text-xl">About</h3>
                            <p className="text-lg text-gray-700 ">
                                Urban Coffee Co. is a premium coffee franchise offering specialty coffee in a modern,
                                welcoming environment. With over 50 locations nationwide, we’re expanding rapidly and
                                looking for passionate entrepreneurs to join our family.
                            </p>
                        </div>

                        <div className='pb-2 border-b-2'>
                            <h3 className="font-semibold text-xl">Country of Origin</h3>
                            <p className="text-lg text-gray-700">United States</p>
                        </div>

                        <div className='pb-2 border-b-2'>
                            <h3 className="font-semibold text-xl">Available Locations</h3>
                            <ul className="list-disc pl-6 text-lg text-gray-700">
                                <li>United States</li>
                                <li>Singapore</li>
                                <li>Philippines</li>
                                <li>Japan</li>
                            </ul>
                        </div>

                        <div className='pb-2 border-b-2'>
                            <h3 className="font-semibold text-xl">Franchisee Requirements</h3>
                            <ul className="list-disc pl-6 text-lg text-gray-700">
                                <li>Minimum liquid capital: $100,000</li>
                                <li>Net worth: $300,000+</li>
                                <li>Business experience preferred</li>
                                <li>Passion for coffee and customer service</li>
                            </ul>
                        </div>

                        <div className='pb-2 border-b-2'>
                            <h3 className="font-semibold text-xl">Support & Training</h3>
                            <p className=" text-lg text-gray-700">
                                We provide comprehensive training including barista training, business operations,
                                marketing support, and ongoing operational guidance. Our team supports you from site
                                selection through grand opening and beyond.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                            <button className="border border-[#943032ff] text-[#943032ff] px-24 py-2 rounded-full flex items-center gap-2">
                                <Heart className="w-5 h-5" />
                                Save
                            </button>
                            <button className="bg-[#943032ff] text-white px-24 py-2 rounded-full flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                Contact
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {/*Industry section*/}
            <ExploreByIndustry />

            {/*News section */}
            <div className='py-16'>
                <NewsCompinent />
            </div>
        </div >
    )
}

export default BusinessOverview;