import React from 'react';
import { Link } from 'react-router-dom';

const BotaoPresentesCompacto: React.FC = () => {
  return (
    <Link
      to="/presentes"
      className="
        fixed bottom-4 right-4 z-50
        bg-[#d4af37] text-white
        p-4 rounded-full
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        animate-pulse-gold
        md:hidden
      "
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    </Link>
  );
};

export default BotaoPresentesCompacto;
