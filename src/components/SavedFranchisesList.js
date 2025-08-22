import React from "react";
import { MapPin, Star } from "lucide-react";
import HeaderImgTwo from "../assets/services/Business overview.png"; // fallback if no image

const SavedFranchisesList = ({ savedFranchises, onNavigate }) => {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-semibold text-[#8b2f2f] mb-6">
        ⭐ My Saved Franchises
      </h3>

      {savedFranchises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {savedFranchises.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow border hover:shadow-lg transition"
            >
              {/* Franchise Image */}
              <img
                src={ HeaderImgTwo}
                alt={item.name}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => onNavigate(item)}
              />

              {/* Franchise Details */}
              <div className="p-4">
                {/* Title + Rating */}
                <div
                  className="flex justify-between font-bold text-xl md:text-2xl cursor-pointer"
                  onClick={() => onNavigate(item)}
                >
                  {item.name}
                  <span className="flex items-center">
                    {[...Array(5)].map((_, i) =>
                      i < item.rating ? (
                        <Star
                          key={i}
                          size={20}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ) : (
                        <Star key={i} size={20} className="text-gray-300" />
                      )
                    )}
                  </span>
                </div>

                {/* Location */}
                <div className="flex font-bold text-lg md:text-xl text-gray-600 mt-1">
                  <MapPin size={28} className="mr-2 text-gray-500" />
                  {item.location}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-between gap-2 mt-3 text-sm font-medium">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {item.investment}
                  </span>
                  <span className={`${item.roiColor} px-2 py-1 rounded-full`}>
                    {item.roi}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven’t saved any franchises yet.</p>
      )}
    </div>
  );
};

export default SavedFranchisesList;
