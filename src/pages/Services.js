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
import HeaderImg from "../assets/services/headerImg.png";
// News images
import NewsImgone from "../assets/HomePage/news-1.png";
import NewsImgtwo from "../assets/HomePage/news-2.png";
import NewsImgThree from "../assets/HomePage/news-3.png";
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

const Services = () => {
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
          <div className="absolute mx-auto left-1/2 transform -translate-x-1/2 z-20 w-full max-w-6xl px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Start Your Franchise Journey with Confidence
            </h2>
            <p className="max-w-5xl text-2xl md:text-4xl font-normal text-white pl-6 md:pl-12 leading-none">
              Discover top franchise opportunities across industries. We connect future franchisees with trusted businesses — fast and efficiently.
            </p>
          </div>
        </div>
      </section>
      {/*Why ASAP section */}
      <section className="w-full pb-16 mx-auto max-w-7xl px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          {/* Left Content */}
          <div className="md:col-span-7 ">
            <div className="text-black space-y-4">
              <h1 className="text-4xl font-bold">Why ASAP Franchise?</h1>
              <p className="text-gray-800 text-base pr-16">
                ASAP Franchise is your go-to platform for discovering and listing franchise opportunities across
                various industries. Whether you're an entrepreneur looking to invest or a brand ready to expand,
                we simplify the process with expert support, data-driven insights, and a fast, seamless <br />experience.
              </p>

              <h2 className="text-3xl font-bold mt-10">What We Offer</h2>

              <div className="">
                <p className="font-semibold">For Franchisors (Business Owners)</p>
                <ol className="list-decimal list-inside text-gray-800 text-base pl-4 pr-16">
                  <li>
                    Franchise Listing Service<br />
                    Showcase your franchise opportunity on our high-traffic platform and reach thousands of potential investors.
                  </li>
                  <li>
                    Brand Marketing & Advertising<br />
                    We promote your brand through digital ads, email campaigns, social media, and targeted outreach.
                  </li>
                  <li>
                    Lead Generation & Management<br />
                    Get quality leads from interested franchisees, complete with contact info and business interest.
                  </li>
                  <li>
                    Franchise Profile Development<br />
                    We help you create compelling listings with business descriptions, benefits, costs, and visuals.
                  </li>
                  <li>
                    Franchise Consulting (Optional Add-on)<br />
                    Need help building your franchise program? Our experts guide you through the process.
                  </li>
                </ol>

                <p className="font-semibold mt-4">For Franchise Buyers (Investors)</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-800 text-base pl-4">
                  <li>
                    Industry-Based Franchise Search<br />
                    Browse 16+ business categories tailored to your interests and budget.
                  </li>
                  <li>
                    Compare Franchise Opportunities<br />
                    Get detailed insights on investment range, ROI, requirements, and brand support.
                  </li>
                  <li>
                    Franchise Matchmaking Tool<br />
                    Answer a few questions, and we’ll match you with franchises that suit your goals.
                  </li>
                  <li>
                    Request Franchise Info<br />
                    Contact franchise brands directly through our platform to start the conversation.
                  </li>
                  <li>
                    Franchise Education Hub<br />
                    Access guides, checklists, and blogs to help you start, evaluate, and run a franchise.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="md:col-span-5">
            <div className="bg-[#943032ff] text-white rounded-lg shadow-lg p-6">
              <h3 className="text-3xl font-semibold mb-2">Advertise your service with us</h3>
              <p className="text-sm mb-4">
                Fill out the form below to find out more about advertising your business with us.
              </p>

              <form className="space-y-4 bg-white rounded-xl text-black px-4 pb-6">
                {/* Contact Information */}
                <h3 className="text-xl font-bold pt-2">Contact Information</h3>
                <div>
                  {/* <label className="block text-sm font-medium mb-1">Full Name</label> */}
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
                  />
                </div>
                <div>
                  {/* <label className="block text-sm font-medium mb-1">Email Address</label> */}
                  <input
                    type="Email Address"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-md rounded-md border border-gray-300 text-black"
                  />
                </div>
                <div>
                  {/* <label className="block text-sm font-medium mb-1">Phone Number</label> */}
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 rounded-md rounded-md border border-gray-300 text-black"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Company Information</h3>
                {/* Company Info */}
                <div>
                  {/* <label className="block text-sm font-medium mb-1">Company Name</label> */}
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full px-4 py-2 rounded-md rounded-md border border-gray-300 text-black"
                  />
                </div>
                <div>
                  {/* <label className="block text-sm font-medium mb-1">Location</label> */}
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full px-4 py-2 rounded-md rounded-md border border-gray-300 text-black"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Comments</h3>
                {/* Message */}
                <div>
                  {/* <label className="block text-sm font-medium mb-1">Your Message</label> */}
                  <textarea
                    placeholder="Your Message..."
                    className="w-full px-4 py-2 rounded-md rounded-md border border-gray-300 text-black"
                    rows={3}
                  ></textarea>
                </div>


                <button
                  type="submit"
                  className="w-full bg-[#943032ff] text-lg items-center justify-center text-white py-2 rounded-full font-medium
                  flex  text-lg font-semibold bg-[#943032ff] text-white rounded-full 
             transition-all duration-300 ease-out 
             hover:shadow-lg hover:bg-white hover:text-[#943032ff]
             hover:border-2 border-[#943032ff]"
                >
                  Submit
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/*Industry section*/}
      <ExploreByIndustry />

      {/*News section */}
      <div className='pt-16'>
        <NewsCompinent />
      </div>
    </div >
  )
}

export default Services