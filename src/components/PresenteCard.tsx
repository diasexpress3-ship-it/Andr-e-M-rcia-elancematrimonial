import React, { useState } from 'react';

interface PresenteCardProps {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  quantidadeTotal: number;
  quantidadeEscolhida: number;
  onSelecionar: (id: string, quantidade: number) => void;
}

const PresenteCard: React.FC<PresenteCardProps> = ({
  id,
  nome,
  descricao,
  imagem,
  quantidadeTotal,
  quantidadeEscolhida,
  onSelecionar
}) => {
  const [quantidade, setQuantidade] = useState(1);
  const disponivel = quantidadeTotal - quantidadeEscolhida;

  const handleSelecionar = () => {
    if (quantidade <= disponivel) {
      onSelecionar(id, quantidade);
    }
  };

  if (disponivel <= 0) {
    return (
      <div className="relative group overflow-hidden rounded-2xl shadow-lg opacity-50 cursor-not-allowed">
        <img src={imagem} alt={nome} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-white text-xl font-bold rotate-12">ESGOTADO</span>
        </div>
        <div className="p-4 bg-white">
          <h3 className="font-serif text-xl text-[#2c1810]">{nome}</h3>
          <p className="text-sm text-gray-600 line-through">{descricao}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
      <img src={imagem} alt={nome} className="w-full h-64 object-cover" />
      
      <div className="absolute top-2 right-2 bg-[#d4af37] text-white px-3 py-1 rounded-full text-sm">
        {disponivel} disponíveis
      </div>
      
      <div className="p-4 bg-white">
        <h3 className="font-serif text-xl text-[#2c1810] mb-1">{nome}</h3>
        <p className="text-sm text-gray-600 mb-3">{descricao}</p>
        
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max={disponivel}
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-2 border rounded-lg text-center"
          />
          <button
            onClick={handleSelecionar}
            className="flex-1 bg-[#d4af37] hover:bg-[#c9a032] text-white py-2 rounded-lg transition-all"
          >
            Selecionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresenteCard;
