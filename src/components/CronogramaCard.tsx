import React from 'react';

const CronogramaCard: React.FC = () => {
  const cronograma = [
    { hora: '10:00', evento: 'Cerimônia Civil', local: 'Palácio dos Casamentos' },
    { hora: '13:00', evento: 'Welcome Drink', local: 'Local do evento + Sessão de fotos' },
    { hora: '14:30', evento: 'Entrada dos Noivos', local: 'Discurso no salão' },
    { hora: '15:30', evento: 'Refeição Principal', local: 'Rodízio' },
    { hora: '18:00', evento: 'Abertura da Pista de Dança', local: '' },
    { hora: '21:00', evento: 'Corte do Bolo', local: '' },
    { hora: '21:40', evento: 'Entrega de Buquê', local: 'Lacinho' },
    { hora: '22:35', evento: 'Entrega de Brindes', local: '' },
    { hora: '23:00', evento: 'Encerramento', local: '' }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-[#2c1810] mb-4 italic">
          Programa do Dia
        </h2>
        <p className="text-center text-gray-500 mb-12">Cronograma das celebrações</p>

        <div className="space-y-4">
          {cronograma.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-[#fff9f0] rounded-xl hover:shadow-md transition-all border border-[#d4af37]/10"
            >
              <div className="md:w-24 text-center">
                <span className="inline-block px-4 py-2 bg-[#d4af37] text-white font-bold rounded-lg">
                  {item.hora}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-serif text-[#2c1810]">{item.evento}</h3>
                {item.local && (
                  <p className="text-gray-600 text-sm mt-1">{item.local}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8 italic">
          *Horários aproximados
        </p>
      </div>
    </section>
  );
};

export default CronogramaCard;
