import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BotaoMenuAnimado: React.FC = () => {
  const [animacao, setAnimacao] = useState(false);

  useEffect(() => {
    // Animação de balanço a cada 7 segundos
    const interval = setInterval(() => {
      setAnimacao(true);
      setTimeout(() => setAnimacao(false), 1500);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      to="/menu"
      className={`
        fixed bottom-6 right-48 z-50
        bg-gradient-to-r from-[#2c1810] to-[#3d2519]
        hover:from-[#3d2519] hover:to-[#2c1810]
        text-white px-8 py-4 rounded-full
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        flex items-center gap-3
        transform hover:scale-105
        ${animacao ? 'animate-sway-x' : ''}
        group
        border-2 border-[#d4af37]/30
      `}
    >
      {/* Ícone de talheres animado */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13V10m0-3.747A6 6 0 0118 10v8a6 6 0 01-12 0v-8a6 6 0 015.5-5.96z" />
      </svg>
      
      <span className="font-bold text-lg tracking-wide">
        Buffet & Menu
      </span>
      
      {/* Brilho animado ao redor */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </Link>
  );
};

export default BotaoMenuAnimado;
