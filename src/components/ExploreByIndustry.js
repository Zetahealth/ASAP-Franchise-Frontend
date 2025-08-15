import React from 'react'
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
} from 'lucide-react';
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

function ExploreByIndustry() {
    return (
        <section className="bg-[#943032ff] text-gray-300 py-12 px-4">
            <h2 className="text-3xl text-white md:text-4xl font-bold text-center mb-8">Explore by Industry</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6 gap-x-12">
                {industries.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-md">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ExploreByIndustry