
import React, { useState } from 'react';
import { CONTACT_1, CONTACT_2, RSVP_DEADLINE } from '../constants';

const RSVPForm: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleRSVP = (phoneNumber: string) => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    setError(false);
    const message = `Confirme sua presença no evento até o dia 15 de março. Meu nome é ${name}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-2xl mx-auto border border-[#d4af37]/10 reveal-up">
      <h2 className="text-4xl font-serif text-[#2c1810] mb-4 text-center italic">Confirmação de Presença</h2>
      <p className="text-[#2c1810] text-center mb-8 font-light">
        Pedimos a gentileza de confirmar sua presença até <br />
        <span className="font-semibold text-[#b76e79] text-xl">{RSVP_DEADLINE}</span>
      </p>

      <div className="space-y-6">
        <div className="reveal-up" style={{ animationDelay: '0.2s' }}>
          <label className="block text-xs uppercase tracking-widest text-[#2c1810]/60 mb-2 ml-1">Seu Nome Completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.trim()) setError(false);
            }}
            placeholder="Digite seu nome aqui..."
            className={`w-full p-5 rounded-2xl border-2 transition-all outline-none focus:ring-4 ${
              error ? 'border-red-200 ring-red-50 bg-red-50' : 'border-[#fff9f0] focus:border-[#d4af37] ring-[#d4af37]/5 bg-[#fff9f0]/50'
            }`}
          />
          {error && <p className="text-red-500 text-xs mt-2 ml-1 font-medium italic">Por favor, insira seu nome para confirmar.</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 reveal-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => handleRSVP(CONTACT_1)}
            className="flex flex-col items-center justify-center p-6 bg-[#d4af37] hover:bg-[#c4a030] text-white rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 group"
          >
            <span className="text-lg font-serif italic">Confirmar com o Contato Um</span>
          </button>
          
          <button
            onClick={() => handleRSVP(CONTACT_2)}
            className="flex flex-col items-center justify-center p-6 bg-[#8aa78a] hover:bg-[#7a967a] text-white rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 group"
          >
            <span className="text-lg font-serif italic">Confirmar com o Contato Dois</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm;
