import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BotaoPresentesAnimado: React.FC = () => {
  const [animacao, setAnimacao] = useState(false);

  useEffect(() => {
    // Animação de pulso a cada 5 segundos
    const interval = setInterval(() => {
      setAnimacao(true);
      setTimeout(() => setAnimacao(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      to="/presentes"
      className={`
        fixed bottom-6 right-6 z-50
        bg-gradient-to-r from-[#d4af37] to-[#c9a032]
        hover:from-[#c9a032] hover:to-[#b38f2d]
        text-white px-8 py-4 rounded-full
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        flex items-center gap-3
        transform hover:scale-105
        ${animacao ? 'animate-pulse-gold scale-110' : ''}
        group
      `}
    >
      {/* Ícone de presente animado */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
      
      <span className="font-bold text-lg tracking-wide">
        Lista de Presentes
      </span>
      
      {/* Badge de novidade animado */}
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
        NOVO
      </span>
    </Link>
  );
};

export default BotaoPresentesAnimado;
