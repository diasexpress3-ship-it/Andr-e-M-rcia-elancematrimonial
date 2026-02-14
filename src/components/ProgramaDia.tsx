import React from 'react';

interface EventoItem {
  hora: string;
  titulo: string;
  descricao?: string;
  destaque?: boolean;
}

const ProgramaDia: React.FC = () => {
  const eventos: EventoItem[] = [
    { hora: '10:00', titulo: 'Cerimônia Civil', descricao: 'Palácio dos Casamentos', destaque: true },
    { hora: '13:00', titulo: 'Welcome Drink & Sessão de Fotos', descricao: 'No local do evento' },
    { hora: '14:30', titulo: 'Entrada dos Noivos', descricao: 'No salão de eventos e discurso', destaque: true },
    { hora: '15:30', titulo: 'Refeição Principal', descricao: 'Rodízio' },
    { hora: '18:00', titulo: 'Abertura de Sala', descricao: 'Abertura da pista de dança' },
    { hora: '21:00', titulo: 'Corte do Bolo', descricao: '', destaque: true },
    { hora: '21:40', titulo: 'Entrega de Buquê', descricao: 'Lacinho' },
    { hora: '22:35', titulo: 'Entrega de Brindes', descricao: '' },
    { hora: '23:00', titulo: 'Encerramento do Evento', descricao: '', destaque: true }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#fff9f0] to-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Título */}
        <div className="text-center mb-12 reveal-up">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2c1810] mb-4 italic">
            Programa do Dia
          </h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto opacity-60"></div>
          <p className="text-lg text-gray-600 mt-4">
            Cronograma das celebrações
          </p>
        </div>

        {/* Linha do tempo */}
        <div className="relative">
          {/* Linha vertical decorativa */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#d4af37] via-[#d4af37] to-[#d4af37] opacity-20"></div>

          {/* Eventos */}
          {eventos.map((evento, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-start mb-8 md:mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Círculo na linha do tempo */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#d4af37] rounded-full z-10 shadow-lg"></div>

              {/* Hora - visível apenas no mobile */}
              <div className="ml-12 md:ml-0 md:hidden mb-2">
                <span className="inline-block px-4 py-1 bg-[#d4af37] text-white text-sm font-bold rounded-full">
                  {evento.hora}
                </span>
              </div>

              {/* Conteúdo do evento */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-12 md:ml-0`}>
                <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 ${
                  evento.destaque ? 'border-[#d4af37]' : 'border-[#b76e79]/30'
                }`}>
                  <div className="flex items-center gap-4 mb-2">
                    {/* Hora - desktop */}
                    <span className="hidden md:inline-block px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] text-sm font-bold rounded-full">
                      {evento.hora}
                    </span>
                    <h3 className="text-xl font-serif text-[#2c1810]">
                      {evento.titulo}
                    </h3>
                  </div>
                  {evento.descricao && (
                    <p className="text-gray-600 ml-0 md:ml-16">
                      {evento.descricao}
                    </p>
                  )}
                </div>
              </div>

              {/* Espaço vazio para alinhamento */}
              <div className="hidden md:block md:w-1/2"></div>
            </div>
          ))}
        </div>

        {/* Nota de rodapé */}
        <div className="mt-12 text-center text-gray-500 text-sm italic reveal-up">
          *Programação sujeita a alterações
        </div>
      </div>
    </section>
  );
};

export default ProgramaDia;
