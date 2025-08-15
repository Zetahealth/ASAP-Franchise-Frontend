import React from 'react';

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
import HeaderImg from "../assets/services/FranchiseBusiness Header.jpg";
import SubscribeImg from "../assets/HomePage/subscribebgImg.png";
// News images
import NewsImgone from "../assets/HomePage/news-1.png";
import NewsImgtwo from "../assets/HomePage/news-2.png";
import NewsImgThree from "../assets/HomePage/news-3.png";
import ExploreByIndustry from '../components/ExploreByIndustry';
import NewsCompinent from '../components/NewsCompinent';

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
function News() {
  return (
    <div className='w-full bg-white'>
      <section className="w-full pb-12  mx-auto">
        <div className="relative overflow-hidden h-[400px] flex items-center justify-center text-center px-6">
          {/* Background Image */}
          <img
            src={HeaderImg} // replace with your actual image path
            alt="Mentor Background"
            className="absolute inset-0 w-full h-[400px] object-fill object-center z-0"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/40 to-black/20 z-10"></div>

          {/* Content */}
          {/* <div className="absolute mx-auto left-1/2 transform -translate-x-1/2 z-20 w-full max-w-7xl px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
              Ready to Expand Your Business Through Franchising?
            </h2>
            <p className="max-w-6xl text-2xl md:text-4xl font-normal text-white md:pl-12 leading-none">
              If you have a successful business model and dream of growing your brand across regions or globally — franchising is your gateway to scale. At ASAP Franchise, we help turn your business into a franchise-ready brand, and connect you with qualified investors eager to partner with proven concepts.
            </p>
          </div> */}
        </div>
      </section>
      {/*News section */}
      <section className=" px-2  max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Franchise News
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {franchiseNews.map((item, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[300px] object-cover rounded-xl mb-4"
              />
              <div className="p-4">
                <h3 className="pr-16 text-2xl font-semibold mb-2">{item.title}</h3>
                <div className="flex items-center text-gray-500 text-lg">
                  <Clock className="w-8 h-8 mr-2" />
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/*email section */}
      <section className="pb-12  max-w-7xl mx-auto">
        <div className="relative overflow-hidden h-[350px] flex items-center justify-center text-center px-6">
          {/* Background Image */}
          <img
            src={SubscribeImg} // replace with your actual image path
            alt="Mentor Background"
            className="absolute inset-0 w-full h-[350px] object-cover object-center z-0"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/60 to-black/30 z-10"></div>

          {/* Content */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-2xl px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-10">Subscribe</h2>
            <div className=" bg-white text-center rounded-full ">
              <input
                type="text"
                placeholder="Your Emails"
                className="w-full px-4 py-2.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              />
            </div>

            {/* Button Centered */}
            <div className="mt-6 flex justify-center">
              <button
                // onClick={() => setShowForm(true)}
                className="bg-[#943032ff] text-white px-20 py-3 rounded-full font-semibold text-lg hover:bg-red-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
      {/*Industry section*/}
      <ExploreByIndustry />

      { /*NewsSection */}
      <div className='py-16'>
        <NewsCompinent />
      </div>
    </div>
  )
}

export default News