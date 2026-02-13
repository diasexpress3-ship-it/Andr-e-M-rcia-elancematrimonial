// ============================================
// CONFIGURAÇÕES DO JSONBIN.IO - MENU
// ============================================
const BIN_ID_MENU = '698dea3143b1c97be979bd75'; // NOVO BIN! Crie no jsonbin.io
const X_MASTER_KEY = '$2a$10$0zWHGBmJLD9aOtvEwkGq/uu64QP9mgyKqLrMtHj9M3SPXQLjYe3Wq';

export interface ItemMenu {
  id: string;
  nome: string;
  descricao: string;
  categoria: 'welcome-drink' | 'entrada' | 'principal' | 'sobremesa' | 'bebidas';
  icone?: string;
}

export interface MenuData {
  welcomeDrink: ItemMenu[];
  menuCasual: ItemMenu[];
  menuOficial: ItemMenu[];
  ultimaAtualizacao: string;
}

// ============================================
// BUSCAR MENU DO SERVIDOR
// ============================================
export async function fetchMenu(): Promise<MenuData | null> {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID_MENU}/latest`, {
      headers: {
        'X-Master-Key': X_MASTER_KEY,
        'X-Bin-Meta': 'false'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        welcomeDrink: data.welcomeDrink || [],
        menuCasual: data.menuCasual || [],
        menuOficial: data.menuOficial || [],
        ultimaAtualizacao: data.ultimaAtualizacao || new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('❌ Erro ao buscar menu:', error);
  }
  return null;
}

// ============================================
// SALVAR MENU NO SERVIDOR (ADMIN)
// ============================================
export async function saveMenu(menu: MenuData): Promise<boolean> {
  try {
    const dados = {
      ...menu,
      ultimaAtualizacao: new Date().toISOString()
    };

    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID_MENU}`, {
      method: 'PUT',
      headers: {
        'X-Master-Key': X_MASTER_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    return response.ok;
  } catch (error) {
    console.error('❌ Erro ao salvar menu:', error);
    return false;
  }
}
