
import React from 'react'
import { useNavigate } from "react-router-dom";
// News images
import NewsImgone from "../assets/HomePage/news-1.png";
import NewsImgtwo from "../assets/HomePage/news-2.png";
import NewsImgThree from "../assets/HomePage/news-3.png";
import { Clock } from 'lucide-react';
// You can store this in a separate file if needed
const franchiseNews = [
  {
    id: "burgerverse-east-coast",
    title: "BurgerVerse Plans East Coast Takeover",
    date: "24 July 2025",
    image: NewsImgone,
  },
  {
    id: "beanbolt-drive-thru",
    title: "BeanBolt Coffee Launches Drive-Thru-Only Concept",
    date: "24 July 2025",
    image: NewsImgtwo,
  },
  {
    id: "pupngo-expands",
    title: "PupN'Go Grooming Expands Nationwide",
    date: "24 July 2025",
    image: NewsImgThree,
  },
];
function NewsCompinent() {

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/news-details/${id}`);
  };

  return (

    <section className="mb-6 px-2 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Franchise News
      </h2>

      <div className="overflow-x-auto md:overflow-visible">
        <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-12 min-w-[600px] sm:min-w-full">
          {franchiseNews.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleCardClick(item.id)}
              className="relative rounded-xl overflow-hidden min-w-[60%] sm:min-w-0 shrink-0 md:shrink cursor-pointer "
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[350px] md:w-full h-[250px] md:h-[300px] object-cover rounded-xl mb-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10"
              />
              <div className="max-w-sm p-4 pb-12">
                <h3 className="md:pr-16 text-2xl font-semibold mb-2">{item.title}</h3>
                <div className="flex items-center text-gray-500 text-lg">
                  <Clock className="w-8 h-8 mr-2" />
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsCompinent