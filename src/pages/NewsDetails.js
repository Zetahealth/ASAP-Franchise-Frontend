import React from 'react';
import BurgerVerseImg from "../assets/HomePage/news-1.png"; // News-specific image
import ExploreByIndustry from '../components/ExploreByIndustry';
import NewsCompinent from '../components/NewsCompinent';

function NewsDetails() {
  return (
    <div className="w-full bg-white py-12">
      {/* News Details Section */}
      <section className="w-full pb-16 px-4 md:px-0 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Content */}
          <div className="md:col-span-7">
            <div className="text-black space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                BurgerVerse Plans East Coast Takeover
              </h1>
              <p className="text-gray-500 text-lg">Published on 24 July 2025</p>

              <p className="text-gray-800 text-xl pr-4">
                BurgerVerse, the rapidly growing gourmet burger chain known for
                its bold flavors and futuristic-themed dining experience, has
                announced an ambitious expansion plan targeting key cities along
                the U.S. East Coast. This strategic move is set to position
                BurgerVerse as one of the dominant players in the premium burger
                segment.
              </p>

              <p className="text-gray-800 text-xl pr-4">
                The brand plans to open 25 new locations over the next 18 months,
                focusing on metropolitan areas such as New York City, Boston,
                Philadelphia, and Miami. Each location will feature BurgerVerse’s
                signature neon-lit interiors, interactive ordering kiosks, and
                a menu packed with innovative burger creations inspired by global
                flavors.
              </p>

              <p className="text-gray-800 text-xl pr-4">
                “We’ve seen tremendous success in our existing markets, and the
                East Coast presents an incredible opportunity for us to connect
                with a diverse and food-loving audience,” said CEO Alex Carter.
                “Our goal is not just to sell burgers but to create a memorable
                dining experience that customers will keep coming back for.”
              </p>

              <h2 className="text-3xl font-bold mt-8">Why This Matters</h2>
              <ul className="list-disc list-inside text-gray-800 text-lg pl-4">
                <li>Boosts franchise opportunities for entrepreneurs.</li>
                <li>Creates over 1,000 new jobs in the region.</li>
                <li>Brings innovative dining concepts to major East Coast cities.</li>
              </ul>

              <p className="text-xl font-semibold mt-4">
                With its unique branding, immersive ambiance, and high-quality
                ingredients, BurgerVerse is poised to make a significant mark on
                the East Coast dining scene.
              </p>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="md:col-span-5">
            <img
              src={BurgerVerseImg}
              alt="BurgerVerse Expansion"
              className="w-full h-[600px] object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Industry Section */}
      <ExploreByIndustry />

      {/* More News Section */}
      <div className="pt-16">
        <NewsCompinent />
      </div>
    </div>
  );
}

export default NewsDetails;
