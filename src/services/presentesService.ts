// ============================================
// CONFIGURAÇÕES DO JSONBIN.IO - PRESENTES
// ============================================
const BIN_ID_PRESENTES = '698dea3143b1c97be979bd74'; // NOVO BIN! Crie no jsonbin.io
const X_MASTER_KEY = '$2a$10$0zWHGBmJLD9aOtvEwkGq/uu64QP9mgyKqLrMtHj9M3SPXQLjYe3Wq';

export interface Presente {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  quantidadeTotal: number;
  quantidadeEscolhida: number;
  linkCompra?: string;
  categoria: 'casa' | 'decoracao' | 'eletro' | 'outros';
}

export interface PresentesData {
  presentes: Presente[];
  ultimaAtualizacao: string;
}

// ============================================
// BUSCAR PRESENTES DO SERVIDOR
// ============================================
export async function fetchPresentes(): Promise<PresentesData | null> {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID_PRESENTES}/latest`, {
      headers: {
        'X-Master-Key': X_MASTER_KEY,
        'X-Bin-Meta': 'false',
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        presentes: data.presentes || [],
        ultimaAtualizacao: data.ultimaAtualizacao || new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('❌ Erro ao buscar presentes:', error);
  }
  return null;
}

// ============================================
// SALVAR PRESENTES NO SERVIDOR (ADMIN)
// ============================================
export async function savePresentes(presentes: Presente[]): Promise<boolean> {
  try {
    const dados = {
      presentes,
      ultimaAtualizacao: new Date().toISOString()
    };

    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID_PRESENTES}`, {
      method: 'PUT',
      headers: {
        'X-Master-Key': X_MASTER_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    return response.ok;
  } catch (error) {
    console.error('❌ Erro ao salvar presentes:', error);
    return false;
  }
}

// ============================================
// ATUALIZAR QUANTIDADE DE PRESENTE
// ============================================
export async function atualizarQuantidadePresente(
  presenteId: string, 
  quantidade: number
): Promise<boolean> {
  try {
    const dados = await fetchPresentes();
    if (!dados) return false;
    
    const presentesAtualizados = dados.presentes.map(p => 
      p.id === presenteId 
        ? { ...p, quantidadeEscolhida: p.quantidadeEscolhida + quantidade }
        : p
    );
    
    return await savePresentes(presentesAtualizados);
  } catch (error) {
    console.error('❌ Erro ao atualizar quantidade:', error);
    return false;
  }
}
