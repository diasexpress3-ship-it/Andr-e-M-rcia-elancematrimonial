import React, { useState } from 'react';

interface Selecao {
  nome: string;
  data: string;
  quantidade: number;
}

interface PresenteCardProps {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  quantidadeTotal: number;
  quantidadeEscolhida: number;
  selecionadoPor?: Selecao[];
  onSelecionar: (id: string, quantidade: number, nomeConvidado: string) => void;
  isAdmin?: boolean;
}

const PresenteCard: React.FC<PresenteCardProps> = ({
  id,
  nome,
  descricao,
  imagem,
  quantidadeTotal,
  quantidadeEscolhida,
  selecionadoPor = [],
  onSelecionar,
  isAdmin = false
}) => {
  const [quantidade, setQuantidade] = useState(1);
  const [nomeConvidado, setNomeConvidado] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  
  const disponivel = quantidadeTotal - quantidadeEscolhida;

  const handleSelecionar = () => {
    if (quantidade <= disponivel && nomeConvidado.trim()) {
      onSelecionar(id, quantidade, nomeConvidado);
      setMostrarForm(false);
      setNomeConvidado('');
      alert(`✅ Obrigado ${nomeConvidado}! Seu presente foi registrado.`);
    } else if (!nomeConvidado.trim()) {
      alert('❌ Por favor, insira seu nome.');
    } else if (quantidade > disponivel) {
      alert('❌ Quantidade indisponível.');
    }
  };

  if (disponivel <= 0) {
    return (
      <div className="relative group overflow-hidden rounded-2xl shadow-lg opacity-50 cursor-not-allowed bg-white">
        <img src={imagem} alt={nome} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-white text-xl font-bold rotate-12">ESGOTADO</span>
        </div>
        <div className="p-4">
          <h3 className="font-serif text-xl text-[#2c1810] mb-1">{nome}</h3>
          <p className="text-sm text-gray-600 line-through">{descricao}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-white">
      <img src={imagem} alt={nome} className="w-full h-64 object-cover" />
      
      <div className="absolute top-2 right-2 bg-[#d4af37] text-white px-3 py-1 rounded-full text-sm font-bold">
        {disponivel} {disponivel === 1 ? 'disponível' : 'disponíveis'}
      </div>
      
      <div className="p-4">
        <h3 className="font-serif text-xl text-[#2c1810] mb-1">{nome}</h3>
        <p className="text-sm text-gray-600 mb-3">{descricao}</p>
        
        {!mostrarForm ? (
          <button
            onClick={() => setMostrarForm(true)}
            className="w-full bg-[#d4af37] hover:bg-[#c9a032] text-white py-2 rounded-lg transition-all font-semibold"
          >
            🎁 Selecionar Presente
          </button>
        ) : (
          <div className="space-y-3 border-t pt-3">
            <p className="text-sm text-gray-600">Disponível: {disponivel}</p>
            <input
              type="text"
              placeholder="Seu nome completo *"
              value={nomeConvidado}
              onChange={(e) => setNomeConvidado(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold">{quantidade}</span>
                <button
                  onClick={() => setQuantidade(Math.min(disponivel, quantidade + 1))}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleSelecionar}
                className="flex-1 bg-[#d4af37] hover:bg-[#c9a032] text-white py-2 rounded-lg transition-all font-semibold"
              >
                Confirmar
              </button>
              <button
                onClick={() => setMostrarForm(false)}
                className="px-3 py-2 border rounded-lg hover:bg-gray-100"
                title="Cancelar"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Lista de quem já escolheu - VISÍVEL APENAS PARA ADMIN */}
        {isAdmin && selecionadoPor.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2">
              👥 Quem já escolheu:
            </p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selecionadoPor.map((item, idx) => (
                <div key={idx} className="text-xs bg-gray-50 p-2 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{item.nome}</span>
                    <span className="text-gray-400 text-[10px]">
                      {new Date(item.data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="text-gray-500">
                    Quantidade: {item.quantidade}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {isAdmin && selecionadoPor.length === 0 && (
          <p className="text-xs text-gray-400 italic mt-2">
            Ninguém escolheu este presente ainda.
          </p>
        )}
      </div>
    </div>
  );
};

export default PresenteCard;
