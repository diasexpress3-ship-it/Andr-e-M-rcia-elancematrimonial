import React, { useState, useEffect } from 'react';
import PresenteCard from '../components/PresenteCard';
import { fetchPresentes, atualizarQuantidadePresente } from '../services/presentesService';
import { Link } from 'react-router-dom';

const PresentesPage: React.FC = () => {
  const [presentes, setPresentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const admin = localStorage.getItem('isAdmin') === 'true';
      setIsAdmin(admin);
    };
    checkAdmin();

    const carregarPresentes = async () => {
      const dados = await fetchPresentes();
      if (dados) {
        setPresentes(dados.presentes);
      }
      setLoading(false);
    };
    carregarPresentes();
  }, []);

  const handleSelecionarPresente = async (id: string, quantidade: number) => {
    const success = await atualizarQuantidadePresente(id, quantidade);
    if (success) {
      // Recarregar dados
      const dados = await fetchPresentes();
      if (dados) setPresentes(dados.presentes);
      alert('✅ Presente selecionado com sucesso! Obrigado!');
    }
  };

  const categorias = [
    { id: 'todos', nome: 'Todos' },
    { id: 'casa', nome: 'Casa' },
    { id: 'decoracao', nome: 'Decoração' },
    { id: 'eletro', nome: 'Eletrodomésticos' },
    { id: 'outros', nome: 'Outros' }
  ];

  const presentesFiltrados = categoriaSelecionada === 'todos'
    ? presentes
    : presentes.filter(p => p.categoria === categoriaSelecionada);

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
            Selecione os presentes que gostaria de oferecer aos noivos. 
            Cada presente pode ser escolhido por mais de um convidado.
          </p>
          <Link 
            to="/"
            className="inline-block mt-4 text-[#d4af37] hover:text-[#c9a032] transition-colors"
          >
            ← Voltar para página principal
          </Link>
        </div>

        {/* Filtros */}
        {!isAdmin && (
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
                {cat.nome}
              </button>
            ))}
          </div>
        )}

        {/* Grid de Presentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {presentesFiltrados.map(presente => (
            <PresenteCard
              key={presente.id}
              {...presente}
              onSelecionar={handleSelecionarPresente}
            />
          ))}
        </div>

        {presentesFiltrados.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">Nenhum presente nesta categoria.</p>
          </div>
        )}

        {/* Painel Admin (visível apenas para admin) */}
        {isAdmin && (
          <div className="mt-16 p-8 bg-white rounded-3xl shadow-xl border-2 border-[#d4af37] border-dashed">
            <h2 className="text-2xl font-serif text-[#2c1810] mb-4">Painel Admin - Gerenciar Presentes</h2>
            <p className="mb-4">Área restrita para administradores gerenciarem a lista de presentes.</p>
            <p className="text-sm text-gray-500">Para adicionar/editar presentes, use o console do navegador com os comandos adequados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentesPage;
