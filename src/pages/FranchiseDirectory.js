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
  Clock,
} from 'lucide-react';
import HeaderImg from "../assets/HomePage/Business directory header.png";
import SubscribeImg from "../assets/HomePage/subscribebgImg.png";
//feature Franchise images 
import FranchiseImgOne from "../assets/HomePage/featured-1.png";
import FranchiseImgtwo from "../assets/HomePage/featured-2.png";
import FranchiseImgThree from "../assets/HomePage/featured-3.png";
import FranchiseImgfour from "../assets/HomePage/featured-4.png";
import FranchiseImgfive from "../assets/HomePage/featured-5.png";
import FranchiseImgsix from "../assets/HomePage/featured-6.png";
import FranchiseImgseven from "../assets/HomePage/featured-7.png";
import FranchiseImgeight from "../assets/HomePage/featured-8.png";
import FranchiseImgnine from "../assets/HomePage/featured-9.png";
import FranchiseImgten from "../assets/HomePage/featured-10.png";
import FranchiseImgeleven from "../assets/HomePage/featured-11.png";
import FranchiseImgtwelve from "../assets/HomePage/featured-12.png";
// News images
import NewsImgone from "../assets/HomePage/news-1.png";
import NewsImgtwo from "../assets/HomePage/news-2.png";
import NewsImgThree from "../assets/HomePage/news-3.png";
import NewsCompinent from '../components/NewsCompinent';

const franchiseLogos = [
  { src: FranchiseImgOne, alt: 'Hippo Mart' },
  { src: FranchiseImgtwo, alt: 'Auto Body' },
  { src: FranchiseImgThree, alt: 'Cafe Brand' },
  { src: FranchiseImgfour, alt: 'Many&Me' },
  { src: FranchiseImgfive, alt: 'Fresh Food' },
  { src: FranchiseImgsix, alt: 'Bass Pro Shops' },
  { src: FranchiseImgseven, alt: 'Chickenlicious' },
  { src: FranchiseImgeight, alt: 'Sandwiches' },
  { src: FranchiseImgnine, alt: 'Bakery' },
  { src: FranchiseImgten, alt: 'Hot Grill' },
  { src: FranchiseImgtwelve, alt: 'Kleene Car' },
  { src: FranchiseImgeleven, alt: "Jowen's Water Station" },
  // { src: FranchiseImgthirteen, alt: 'Extra Brand' },
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
function FranchiseDirectory() {
  const franchiseLogosFirst = franchiseLogos.slice(0, 10);
  const franchiseLogosLast = franchiseLogos.slice(10); // last 2 items
  return (
    <div className='w-full bg-white'>
      <section className="w-full pb-4  mx-auto">
        <div className="relative overflow-hidden h-[450px] flex items-center justify-center text-center px-6">
          <img
            src={HeaderImg}
            alt="Business Directory header"
            className="absolute inset-0 w-full h-[400px] md:h-[450px] object-fill object-top z-0"
          />
        </div>
      </section>
      <section className="w-full  md:py-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Content */}
          <div className="md:col-span-4 bg-[#943032ff] rounded">
            <h3 className="text-white text-4xl bg-[#943032ff] px-4 py-4 rounded font-bold  text-center">
              Franchise Directory
            </h3>

            <ul className="w-full ">
              {industries.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-white px-3 py-3 border-2 brder-gray-600 text-xl rounded text-[#943032ff] font-medium hover:bg-red-100 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-red-800">{item.icon}</span>
                    {item.label}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-red-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>


          {/* Right Content - Form */}
          <div className="md:col-span-8">
            {/*featured Franchise */}
            <section className=" px-4 max-w-7xl mx-auto">
              <h2 className="text-3xl pb-4 font-bold border-b-2 border-gray-700">Result</h2>
              {/* Grid of first 10 logos */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 py-6 gap-4">
                {franchiseLogos.map((logo, idx) => (
                  <div
                    key={idx}
                    className="border border-[#943032ff] rounded-md bg-white p-4 flex items-center justify-center h-[160px]"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-[150px] object-contain"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
      {/*News section */}
      <div className='py-16'>
        <NewsCompinent />
      </div>
      {/*email section */}
      <section className="pb-12 md:px-2 max-w-7xl mx-auto">
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
                onClick={() => setShowForm(true)}
                className="bg-[#943032ff] text-white px-20 py-3 rounded-full font-semibold text-lg hover:bg-red-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FranchiseDirectory;