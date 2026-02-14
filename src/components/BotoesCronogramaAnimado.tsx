import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

const BotoesCronogramaAnimado: React.FC = () => {
  const [animacao, setAnimacao] = useState(false);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    // Mostrar botões após scroll
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisivel(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    // Animação periódica
    const interval = setInterval(() => {
      setAnimacao(true);
      setTimeout(() => setAnimacao(false), 1000);
    }, 8000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  if (!visivel) return null;

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
      {/* Botão do Cronograma */}
      <Link
        to="cronograma"
        smooth={true}
        duration={500}
        offset={-100}
        className={`
          group relative flex items-center
          bg-gradient-to-r from-[#d4af37] to-[#c9a032]
          hover:from-[#c9a032] hover:to-[#b38f2d]
          text-white px-4 py-3 rounded-r-2xl
          shadow-lg hover:shadow-2xl
          transition-all duration-500 ease-out
          transform translate-x-0 hover:translate-x-2
          ${animacao ? 'animate-pulse-gold' : ''}
          cursor-pointer
        `}
        style={{
          animation: animacao ? 'slideIn 0.5s ease-out' : 'none'
        }}
      >
        {/* Ícone de calendário */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        
        <span className="font-bold text-sm tracking-wide">
          Cronograma
        </span>
        
        {/* Tooltip que aparece no hover */}
        <span className="absolute left-full ml-2 px-3 py-1 bg-[#2c1810] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ver programação do dia
        </span>
      </Link>

      {/* Botão da História (opcional) */}
      <Link
        to="nossa-historia"
        smooth={true}
        duration={500}
        offset={-100}
        className="
          group relative flex items-center
          bg-gradient-to-r from-[#2c1810] to-[#3d2519]
          hover:from-[#3d2519] hover:to-[#2c1810]
          text-white px-4 py-3 rounded-r-2xl
          shadow-lg hover:shadow-2xl
          transition-all duration-500 ease-out
          transform translate-x-0 hover:translate-x-2
          cursor-pointer
          border-l-2 border-[#d4af37]
        "
      >
        {/* Ícone de coração */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        
        <span className="font-bold text-sm tracking-wide">
          Nossa História
        </span>
        
        <span className="absolute left-full ml-2 px-3 py-1 bg-[#d4af37] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Conheça nosso romance
        </span>
      </Link>
    </div>
  );
};

export default BotoesCronogramaAnimado;
