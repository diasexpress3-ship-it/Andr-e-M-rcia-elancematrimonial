import React from 'react';

interface ItemMenu {
  id: string;
  nome: string;
  descricao: string;
  icone?: string;
}

interface MenuSectionProps {
  titulo: string;
  itens: ItemMenu[];
  cor?: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({ titulo, itens, cor = "text-[#2c1810]" }) => {
  if (!itens || itens.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className={`font-serif text-2xl mb-4 border-b-2 border-[#d4af37]/30 pb-2 ${cor}`}>
        {titulo}
      </h3>
      <div className="space-y-3">
        {itens.map(item => (
          <div key={item.id} className="flex items-start gap-3">
            {item.icone && <span className="text-2xl">{item.icone}</span>}
            <div>
              <p className="font-semibold text-[#2c1810]">{item.nome}</p>
              <p className="text-sm text-gray-600">{item.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
