
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-yellow-50 p-4 border-t-4 border-black w-full mt-12">
      <div className="container mx-auto text-center">
        <p className="text-sm">Built with React, Tailwind CSS, and the Google Gemini API.</p>
      </div>
    </footer>
  );
};

export default Footer;
