import React, { useState, useEffect } from 'react';
import PresenteCard from '../components/PresenteCard';
import { fetchPresentes, selecionarPresente } from '../services/presentesService';
import { Link } from 'react-router-dom';

interface Presente {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  quantidadeTotal: number;
  quantidadeEscolhida: number;
  selecionadoPor?: { nome: string; data: string; quantidade: number }[];
  categoria: 'casa' | 'decoracao' | 'eletro' | 'outros';
}

const PresentesPage: React.FC = () => {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');
  const [isAdmin, setIsAdmin] = useState(false);

  // Verificar se é admin
  useEffect(() => {
    const admin = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(admin);
  }, []);

  // Carregar presentes
  useEffect(() => {
    const carregarPresentes = async () => {
      try {
        setLoading(true);
        const dados = await fetchPresentes();
        if (dados && dados.presentes) {
          setPresentes(dados.presentes);
        }
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };
    
    carregarPresentes();
  }, []);

  const handleSelecionarPresente = async (id: string, quantidade: number, nomeConvidado: string) => {
    try {
      const success = await selecionarPresente(id, quantidade, nomeConvidado);
      if (success) {
        // Recarregar dados
        const dados = await fetchPresentes();
        if (dados && dados.presentes) {
          setPresentes(dados.presentes);
        }
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro ao selecionar presente. Tente novamente.');
    }
  };

  const categorias = [
    { id: 'todos', nome: 'Todos' },
    { id: 'eletro', nome: 'Eletrodomésticos' },
    { id: 'casa', nome: 'Casa & Cozinha' },
    { id: 'decoracao', nome: 'Decoração' },
    { id: 'outros', nome: 'Outros' }
  ];

  const presentesFiltrados = categoriaSelecionada === 'todos'
    ? presentes
    : presentes.filter(p => p.categoria === categoriaSelecionada);

  const totais = {
    todos: presentes.length,
    eletro: presentes.filter(p => p.categoria === 'eletro').length,
    casa: presentes.filter(p => p.categoria === 'casa').length,
    decoracao: presentes.filter(p => p.categoria === 'decoracao').length,
    outros: presentes.filter(p => p.categoria === 'outros').length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff9f0]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2c1810] font-serif text-xl">Carregando presentes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff9f0] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif text-[#2c1810] mb-4">Lista de Presentes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha um ou mais presentes para oferecer aos noivos. 
            {!isAdmin && ' Seu nome será registrado para que saibamos quem presenteou cada item.'}
          </p>
          <Link 
            to="/"
            className="inline-block mt-4 text-[#d4af37] hover:text-[#c9a032] transition-colors"
          >
            ← Voltar para página principal
          </Link>
        </div>

        {/* Filtros com contadores */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSelecionada(cat.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                categoriaSelecionada === cat.id
                  ? 'bg-[#d4af37] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.nome} ({totais[cat.id as keyof typeof totais]})
            </button>
          ))}
        </div>

        {/* Grid de Presentes */}
        {presentesFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {presentesFiltrados.map(presente => (
              <PresenteCard
                key={presente.id}
                {...presente}
                onSelecionar={handleSelecionarPresente}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <p className="text-2xl text-gray-500 mb-4">Nenhum presente nesta categoria.</p>
          </div>
        )}

        {/* Rodapé administrativo */}
        {isAdmin && (
          <div className="mt-16 p-8 bg-white rounded-3xl shadow-xl border-2 border-[#d4af37]">
            <h2 className="text-2xl font-serif text-[#2c1810] mb-4">📊 Painel Administrativo</h2>
            <p className="mb-2">Total de presentes: <strong>{presentes.length}</strong></p>
            <p className="mb-4">Total de itens já escolhidos: <strong>
              {presentes.reduce((acc, p) => acc + p.quantidadeEscolhida, 0)}
            </strong></p>
            <p className="text-sm text-gray-500">
              Apenas você vê a lista de convidados que escolheram cada presente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentesPage;
