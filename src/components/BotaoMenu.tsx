import React from 'react';
import { Link } from 'react-router-dom';

const BotaoMenu: React.FC = () => {
  return (
    <Link
      to="/menu"
      className="fixed bottom-6 right-36 z-50 bg-[#2c1810] hover:bg-[#3d2519] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13V10m0-3.747A6 6 0 0118 10v8a6 6 0 01-12 0v-8a6 6 0 015.5-5.96z" />
      </svg>
      <span className="font-semibold">Buffet & Menu</span>
    </Link>
  );
};

export default BotaoMenu;
