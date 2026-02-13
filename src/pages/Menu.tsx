import React, { useState, useEffect } from 'react';
import MenuSection from '../components/MenuSection';
import { fetchMenu } from '../services/menuService';
import { Link } from 'react-router-dom';

// Interfaces para tipagem
interface ItemMenu {
  id: string;
  nome: string;
  descricao: string;
  categoria: 'welcome-drink' | 'entrada' | 'principal' | 'sobremesa' | 'bebidas';
  icone?: string;
}

interface MenuData {
  welcomeDrink: ItemMenu[];
  menuCasual: ItemMenu[];
  menuOficial: ItemMenu[];
  ultimaAtualizacao: string;
}

const MenuPage: React.FC = () => {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const admin = localStorage.getItem('isAdmin') === 'true';
      setIsAdmin(admin);
    };
    checkAdmin();

    const carregarMenu = async () => {
      const dados = await fetchMenu();
      if (dados) {
        setMenu(dados);
      }
      setLoading(false);
    };
    carregarMenu();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff9f0]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2c1810] font-serif text-xl">Carregando menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff9f0] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif text-[#2c1810] mb-4">Buffet & Menu</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça as opções deliciosas que preparamos para celebrar este dia especial.
          </p>
          <Link 
            to="/"
            className="inline-block mt-4 text-[#d4af37] hover:text-[#c9a032] transition-colors"
          >
            ← Voltar para página principal
          </Link>
        </div>

        {/* Welcome Drink */}
        {menu?.welcomeDrink && menu.welcomeDrink.length > 0 && (
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl">
            <MenuSection 
              titulo="🥂 Welcome Drink" 
              itens={menu.welcomeDrink}
              cor="text-[#d4af37]"
            />
          </div>
        )}

        {/* Menu Casual */}
        {menu?.menuCasual && menu.menuCasual.length > 0 && (
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl">
            <h2 className="font-serif text-3xl text-[#2c1810] mb-6 border-b-2 border-[#d4af37]/30 pb-2">
              Menu Casual
            </h2>
            <p className="text-sm text-gray-500 mb-6 italic">Opção mais simples e descontraída</p>
            <MenuSection 
              titulo="Entradas" 
              itens={menu.menuCasual.filter((item: ItemMenu) => item.categoria === 'entrada')} 
            />
            <MenuSection 
              titulo="Prato Principal" 
              itens={menu.menuCasual.filter((item: ItemMenu) => item.categoria === 'principal')} 
            />
            <MenuSection 
              titulo="Sobremesa" 
              itens={menu.menuCasual.filter((item: ItemMenu) => item.categoria === 'sobremesa')} 
            />
          </div>
        )}

        {/* Menu Oficial */}
        {menu?.menuOficial && menu.menuOficial.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#d4af37]">
            <h2 className="font-serif text-3xl text-[#2c1810] mb-6 border-b-2 border-[#d4af37]/30 pb-2">
              Menu Oficial
            </h2>
            <p className="text-sm text-gray-500 mb-6 italic">Opção completa e sofisticada</p>
            <MenuSection 
              titulo="Entradas" 
              itens={menu.menuOficial.filter((item: ItemMenu) => item.categoria === 'entrada')} 
            />
            <MenuSection 
              titulo="Prato Principal" 
              itens={menu.menuOficial.filter((item: ItemMenu) => item.categoria === 'principal')} 
            />
            <MenuSection 
              titulo="Sobremesa" 
              itens={menu.menuOficial.filter((item: ItemMenu) => item.categoria === 'sobremesa')} 
            />
            <MenuSection 
              titulo="Bebidas" 
              itens={menu.menuOficial.filter((item: ItemMenu) => item.categoria === 'bebidas')} 
            />
          </div>
        )}

        {(!menu?.welcomeDrink?.length && !menu?.menuCasual?.length && !menu?.menuOficial?.length) && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">Menu em breve disponível...</p>
          </div>
        )}

        {/* Painel Admin */}
        {isAdmin && (
          <div className="mt-16 p-8 bg-white rounded-3xl shadow-xl border-2 border-[#d4af37] border-dashed">
            <h2 className="text-2xl font-serif text-[#2c1810] mb-4">Painel Admin - Gerenciar Menu</h2>
            <p className="mb-4">Área restrita para administradores atualizarem o menu.</p>
            <p className="text-sm text-gray-500">Para adicionar/editar itens, use o console do navegador com os comandos adequados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
