import React from 'react'
import AboutUsImg from "../assets/services/Aboutusimage.png"
import ExploreByIndustry from '../components/ExploreByIndustry'
import NewsCompinent from '../components/NewsCompinent'

function AboutUs() {
  return (
    <div className='w-full bg-white py-12'>
      {/*Why ASAP section */}
      < section className="w-full pb-16 px-4 md:px-0 mx-auto max-w-7xl" >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          {/* Left Content */}
          <div className="md:col-span-7 ">
            <div className="text-black space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Welcome to ASAP Franchise – Your Fast Track to Business Ownership.</h1>
              <p className="text-gray-800 text-xl pr-16">
                At ASAP Franchise, we believe that success in business shouldn’t take years to build. That’s why we specialize in quick-launch, high-potential franchise opportunities designed for aspiring entrepreneurs, seasoned investors, and anyone ready to take control of their financial future — ASAP.
              </p>
              <p className="text-gray-800 text-xl pr-16">
                Founded on the principles of accessibility, speed, and scalability,
                we partner with proven brands across various industries to help individuals
                like you start a franchise with minimal hassle and maximum support.
                Whether you’re looking to open a food outlet, a service-based business, or an innovative tech franchise,
                we provide everything you need to hit the ground running — from brand matching and training to marketing and operational guidance.
              </p>
              <h2 className="text-4xl md:text-4xl font-bold mt-10">Why Choose Us?</h2>

              <div className="">
                <ul className="list-disc list-inside text-gray-800 text-lg pl-4 pr-16">
                  <li>
                    Fast-Track Setup: From inquiry to launch, we streamline the process.
                  </li>
                  <li>
                    Proven Brands: We work only with vetted, scalable franchise models.
                  </li>
                  <li>
                    Ongoing Support: Marketing, operations, and mentorship every step of the way.
                  </li>
                  <li>
                    Flexible Investment: Opportunities suited for every budget.
                  </li>
                </ul>
                <p className="text-xl font-semibold mt-4">Take the leap. Own your future. Start your franchise journey — ASAP.</p>
              </div>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="md:col-span-5">
            <img
              src={AboutUsImg} // replace with your actual image path
              alt="Mentor Background"
              className=" w-full h-[600px] object-fill object-center"
            />
          </div>
        </div>
      </section >
      {/*Industry Section */}
      <ExploreByIndustry/>

      {/*News Section  */}
      <div className='pt-16'>
      <NewsCompinent/>
      </div>
    </div>
  )
}

export default AboutUs