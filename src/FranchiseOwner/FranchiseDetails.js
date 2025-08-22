import React, { useState } from "react";


const FranchiseDetail = ({ franchise, setFranchise }) => {
  return (
    <div className="space-y-4">
      {/* About Section */}
      <div className="pb-2">
        <h3 className="font-semibold text-xl">About</h3>
        <p className="text-lg text-gray-700">{franchise.about}</p>
        <img src={franchise.images[0]} alt="about" className=" object-cover" />
      </div>

      {/* Who We’re Looking For */}
      <div className="pb-2">
        <h3 className="font-semibold text-2xl">Who We're Looking For</h3>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          {franchise.whoWeLookFor.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <img src={franchise.images[1]} alt="who" className=" object-cover" />
      </div>

      {/* Training */}
      <div className="pb-2">
        <h3 className="font-semibold text-2xl">Training & Support</h3>
        <h4 className="font-semibold">Pre-Opening</h4>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          {franchise.training.preOpening.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4 className="font-semibold mt-2">Grand Opening</h4>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          {franchise.training.grandOpening.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <p className="mt-2">{franchise.training.note}</p>
        <img src={franchise.images[2]} alt="training" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};


export default FranchiseDetail;
