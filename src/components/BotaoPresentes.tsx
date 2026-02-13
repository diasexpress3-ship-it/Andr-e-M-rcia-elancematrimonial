import React from 'react';
import { Link } from 'react-router-dom';

const BotaoPresentes: React.FC = () => {
  return (
    <Link
      to="/presentes"
      className="fixed bottom-6 right-6 z-50 bg-[#d4af37] hover:bg-[#c9a032] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all flex items-center gap-2 animate-pulse-gold"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
      <span className="font-semibold">Lista de Presentes</span>
    </Link>
  );
};

export default BotaoPresentes;
