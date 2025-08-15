import React from 'react'
import AboutFranchiseOne from "../assets/Business Details/FranchiseImage-1.png";
import AboutFranchiseTwo from "../assets/Business Details/FranchiseImage-2.png";
import AboutFranchiseThree from "../assets/Business Details/FranchiseImage-3.png";
import { Heart, Mail } from 'lucide-react';
const BusinessDetails = () => {
    return (
        <div className="space-y-4">
            <div className='pb-2'>
                <h3 className="font-semibold text-xl">About</h3>
                <p className="text-lg text-gray-700">
                    Urban Coffee Co. is a premium coffee franchise offering specialty coffee in a modern,
                    welcoming environment. With over 50 locations nationwide, we’re expanding rapidly and
                    looking for passionate entrepreneurs to join our family.
                </p>
                <div className="w-full mx-auto max-w-7xl">
                    <div className="relative overflow-hidden h-full flex items-center justify-center text-center py-4">
                        <img
                            src={AboutFranchiseOne} // replace with your actual image path
                            alt="about franchise"
                            className=" max-w-7xl h-[350px] md:h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className='pb-2 '>
                    <h3 className="font-semibold text-2xl">Who We're Looking For</h3>
                    <p className=" text-lg text-gray-700">
                        We’re seeking passionate individuals who are ready to bring the Urban Coffee Co. experience to their local communities. Ideal franchise partners are:
                    </p>
                    <ul className="list-disc text-lg pl-6 text-gray-700">
                        <li>Passionate about coffee and customer service</li>
                        <li>Detail-oriented with strong leadership skills</li>
                        <li>Able to manage and motivate a team</li>
                        <li>Business-savvy with a community-first mindse</li>
                    </ul>
                </div>
                <div className="w-full mx-auto max-w-7xl">
                    <div className="relative overflow-hidden h-full flex items-center justify-center text-center py-4">
                        <img
                            src={AboutFranchiseTwo} // replace with your actual image path
                            alt="about franchise"
                            className=" max-w-7xl h-[350px] md:h-full object-cover"
                        />
                    </div>
                </div>
                <div className='pb-2 '>
                    <h3 className="font-semibold text-2xl">Training & Support</h3>
                    <p className=" text-lg text-gray-700">
                        Urban Coffee Co. offers a complete, hands-on franchise training program:
                    </p>
                    <p className=" text-lg text-gray-700">
                        Pre-Opening
                    </p>
                    <ul className="list-disc text-lg pl-6 text-gray-700">
                        <li>Barista training (coffee knowledge, drink prep, equipment use)</li>
                        <li>Store setup & supplier coordination</li>
                        <li>Hiring and team training support</li>
                        <li>Site selection and lease negotiation</li>
                    </ul>
                    <p className=" text-lg text-gray-700">
                        Grand Opening & Beyond
                    </p>
                    <ul className="list-disc text-lg pl-6 text-gray-700">
                        <li>Marketing launch toolkit</li>
                        <li>On-site opening assistance</li>
                        <li>Ongoing operations coaching</li>
                        <li>Regional performance reviews and business mentoring</li>
                    </ul>
                    <p className=" text-lg text-gray-700">
                        We believe in a partnership-first approach — your success is our priority.
                    </p>
                </div>
                <div className="w-full mx-auto max-w-7xl">
                    <div className="relative overflow-hidden h-full flex items-center justify-center text-center py-4">
                        <img
                            src={AboutFranchiseThree} // replace with your actual image path
                            alt="about franchise"
                            className=" max-w-7xl h-[350px] md:h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                <button className="border border-[#943032ff] text-[#943032ff] mx-auto  px-24 py-2 rounded-full flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Save
                </button>
                <button className="bg-[#943032ff] text-white px-24 py-2 mx-auto rounded-full flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact
                </button>
            </div>
        </div>
    )
}

export default BusinessDetails