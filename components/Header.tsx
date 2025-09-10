
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-lime-300 p-4 border-b-4 border-black w-full">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tighter">
          ✈️ AI Travel Itinerary
        </h1>
        <p className="text-sm md:text-base text-gray-800 mt-1">Your Personal Trip Planner, Powered by Gemini</p>
      </div>
    </header>
  );
};

export default Header;
