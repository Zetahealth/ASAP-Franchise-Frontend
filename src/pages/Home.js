import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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

import HeaderVideo from "../assets/Videos/Home-page header.mp4";
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
//Video images 
import franchiseVideoone from "../assets/HomePage/videoImg-1.png";
import franchiseVideotwo from "../assets/HomePage/videoImg-2.png";
import franchiseVideothree from "../assets/HomePage/videoImg-3.png";
import franchiseVideofour from "../assets/HomePage/videoImg-4.png";
import franchiseVideofive from "../assets/HomePage/videoImg-5.png";
import franchiseVideosix from "../assets/HomePage/videoImg-6.png";
import franchiseVideoseven from "../assets/HomePage/videoImg-7.png";
import franchiseVideoeight from "../assets/HomePage/videoImg-8.png";
import franchiseVideonine from "../assets/HomePage/videoImg-9.png";
import franchiseVideoten from "../assets/HomePage/videoImg-10.png";
import NewsCompinent from '../components/NewsCompinent';
import ExploreByIndustry from '../components/ExploreByIndustry';

// import FranchiseImgthirteen from "../assets/HomePage/featured-13.png";

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

const franchiseVideos = [
  { src: franchiseVideoone, alt: 'chiken starter' },
  { src: franchiseVideotwo, alt: 'Auto Body' },
  { src: franchiseVideothree, alt: 'Cafe Brand' },
  { src: franchiseVideofour, alt: 'Many&Me' },
  { src: franchiseVideofive, alt: 'Fresh Food' },
  { src: franchiseVideosix, alt: 'Bass Pro Shops' },
  { src: franchiseVideoseven, alt: 'Chickenlicious' },
  { src: franchiseVideoeight, alt: 'Sandwiches' },
  { src: franchiseVideonine, alt: 'Bakery' },
  { src: franchiseVideoten, alt: 'Hot Grill' },
  // { src: FranchiseImgthirteen, alt: 'Extra Brand' },
];


function Home() {
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [investment, setInvestment] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/search-result", {
      state: { industry, location, investment },
    });
  };
  const franchiseLogosFirst = franchiseLogos.slice(0, 10);
  const franchiseLogosLast = franchiseLogos.slice(10); // last 2 items
  const franchiseVideosFirst = franchiseVideos.slice(0, 8);
  const franchiseVideosLast = franchiseVideos.slice(8); // last 2 items
  return (
    <div className='w-full bg-white'>
      {/* Hero */}
      <div className="relative w-full bg-[#943032ff] p-4 md:p-0">
        {/* Background + Heading Section */}
        <div className="relative overflow-hidden h-[270px] sm:h-[680px] px-4 sm:px-6">
          {/* Background Image */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={HeaderVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-black bg-opacity-20 z-10" /> */}

          {/* Heading Content */}
          {/* <div className="relative md:px-14 py-6 md:py-16 z-20 text-white">
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
          </div> */}

          {/* Desktop Filter Section */}
          {/* <div className="hidden sm:block absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-4xl px-4">
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
                className="bg-[#CF1C2F] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-red-700 transition"
              >
                FIND YOUR FRANCHISE
              </button>
            </div>
          </div> */}
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
              className=" flex items-center text-xl font-semibold px-8 py-3 bg-[#943032ff] text-white rounded-full 
             transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg border-2 border-white hover:bg-white hover:text-[#943032ff]
             active:scale-95"
            >
              FIND YOUR FRANCHISE
            </button>
          </div>
        </div>
      </div>

      {/*featured Franchise */}
      <div className="hidden sm:block pt-10 w-full max-w-7xl px-4 mx-auto">
        <div className="bg-white text-center rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-lg border-2 border-gray-800">
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
            className="flex items-center text-2xl font-semibold px-8 py-3 bg-[#943032ff] text-white rounded-full 
             transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg 
             active:scale-95"
          >
            FIND YOUR FRANCHISE
          </button>
        </div>
      </div>
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">Featured Franchise</h2>
        <div className="w-24 h-1 bg-[#943032ff] mx-auto mb-12 rounded-full" />

        {/* Grid of first 10 logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {franchiseLogosFirst.map((logo, idx) => (
            <div
              key={idx}
              className="border border-[#943032ff] rounded-md bg-white p-4 flex items-center justify-center h-[150px]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-[150px] object-contain"
              />
            </div>
          ))}
        </div>

        {/* Centered last row */}
        <div className="mt-6 flex justify-center gap-6 flex-wrap">
          {franchiseLogosLast.map((logo, idx) => (
            <div
              key={idx}
              className="border border-[#943032ff] rounded-md bg-white p-4 flex items-center justify-center h-[110px] w-[200px]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-[80px] object-contain"
              />
            </div>
          ))}
        </div>
        {/* Button */}
        <div className="mt-6 flex justify-center">
          <button className="flex items-center text-lg font-semibold px-8 py-3 bg-[#943032ff] text-white rounded-full 
             transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-transparent hover:text-[#943032ff] 
             hover:border-2 border-[#943032ff] 
             active:scale-95"
          >
            Search Franchise Directory
          </button>
        </div>
      </section>

      {/*Industry section*/}
      <ExploreByIndustry />
      {/*featured Videos */}
      <section className="py-12 px-2 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">Featured Videos</h2>
        <div className="w-24 h-1 bg-[#943032ff] mx-auto mb-12 rounded-full" />

        {/* Grid of first 10 logos */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {franchiseVideosFirst.map((logo, idx) => (
            <div
              key={idx}
              className="relative group rounded-xl overflow-hidden shadow rounded-lg flex items-center justify-center h-[150px] md:h-[160px]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full  md:h-[160px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <PlayCircle className="text-white w-10 h-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Centered last row */}
        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          {franchiseVideosLast.map((logo, idx) => (
            <div
              key={idx}
              className="relative group rounded-xl overflow-hidden shadow  w-[218px] md:w-[295px]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-[160px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <PlayCircle className="text-white w-10 h-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-center">
          <button className="flex items-center text-lg font-semibold px-8 py-3 bg-[#943032ff] text-white rounded-full 
             transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-transparent hover:text-[#943032ff] 
             hover:border-2 border-[#943032ff] 
             active:scale-95"
          >
            Watch All Videos
          </button>
        </div>
      </section>

      {/*email section */}
      <section className="pb-12 px-2 max-w-7xl mx-auto">
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
                className="w-full px-4 py-2.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#943032ff] text-black"
              />
            </div>

            {/* Button Centered */}
            <div className="mt-6 flex justify-center">
              <button
                // onClick={() => setShowForm(true)}
                className="
               flex items-center text-lg font-semibold px-20 py-3 bg-[#943032ff] text-white rounded-full 
             transition-all duration-300 ease-out 
             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-white hover:text-[#943032ff]
             hover:border-2 border-[#943032ff]
             active:scale-95"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*News section */}
      <NewsCompinent />


    </div>
  )
}

export default Home