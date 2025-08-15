import React from 'react';
import HeaderImg from "../assets/services/FranchiseBusiness Header.jpg";
import ExploreByIndustry from '../components/ExploreByIndustry';
import NewsCompinent from '../components/NewsCompinent';

function Contact() {
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
          <div className="absolute mx-auto left-1/2 transform -translate-x-1/2 z-20 w-full max-w-7xl px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
              Ready to Expand Your Business Through Franchising?
            </h2>
            <p className="max-w-6xl text-2xl md:text-4xl font-normal text-white md:pl-12 leading-none">
              If you have a successful business model and dream of growing your brand across regions or globally — franchising is your gateway to scale. At ASAP Franchise, we help turn your business into a franchise-ready brand, and connect you with qualified investors eager to partner with proven concepts.
            </p>
          </div>
        </div>
      </section>
      {/*Why ASAP section */}
<section className="w-full pb-16 px-4 md:px-0 mx-auto max-w-7xl">
  <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
    {/* Left Content */}
    <div className="md:col-span-7 ">
      <h1 className="text-4xl md:text-5xl text-[#943032ff] font-bold">ASAP FRANCHISE</h1>

      <div className="text-[#943032ff] text-2xl font-bold pt-16">
        <p>USA Headquarters:</p>
        <ul className="list-none list-inside text-gray-800 text-lg font-semibold pr-16">
          <li>1234 Business Parkway</li>
          <li>Suite 500</li>
          <li>Orlando, FL 32801</li>
          <li>United States of America</li>
        </ul>
      </div>

      <div className="text-[#943032ff] text-2xl font-bold pt-10">
        <p>Philippines Branch Office:</p>
        <ul className="list-none list-inside text-gray-800 text-lg font-semibold pr-16">
          <li>Unit 12, Tower B, Business Center</li>
          <li>Makati City, Metro Manila</li>
          <li>Philippines</li>
        </ul>
      </div>

      <div className="text-[#943032ff] text-xl font-bold pt-10 pr-16">
        <p>Email:</p>
        <span className="text-gray-800 text-lg font-semibold">info@asapfrancise.com</span>
      </div>
    </div>

    {/* Right Content - Form */}
    <div className="md:col-span-5">
      <h2 className="text-4xl font-bold mt-10 pb-4">Interested? Get in Touch!</h2>

      <div className="">
        <p className="text-xl font-semibold">Fill out the form below and our team will get back to you within 24 hours.</p>
      </div>

      <div className="bg-[#943032ff] text-white rounded-lg shadow-lg p-6">
        <h3 className="text-3xl font-semibold mb-2">Advertise your service with us</h3>
        <p className="text-sm mb-4">
          Fill out the form below to find out more about advertising your business with us.
        </p>

        <form className="space-y-4 bg-white rounded-xl text-black px-4 pb-6">
          {/* Contact Information */}
          <h3 className="text-xl font-bold pt-2">Contact Information</h3>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            />
          </div>
          <div>
            <input
              type="Email Address"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            />
          </div>

          <h3 className="text-xl font-bold mb-2">Company Information</h3>
          <div>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            />
          </div>

          <h3 className="text-xl font-bold mb-2">Comments</h3>
          <div>
            <textarea
              placeholder="Your Message..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#943032ff] text-lg text-white py-2 rounded-full font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

      {/* ExploreIndusties section */}
      <ExploreByIndustry />
      {/*News Section */}
      <div className='pt-16'>
        <NewsCompinent />
      </div>
    </div>
  )
}

export default Contact