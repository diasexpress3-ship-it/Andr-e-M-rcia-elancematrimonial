// ============================================
// CONFIGURAÇÕES DO JSONBIN.IO - PRESENTES
// ============================================
const BIN_ID_PRESENTES = '698f482a43b1c97be97c6e20';
const X_MASTER_KEY = '$2a$10$0zWHGBmJLD9aOtvEwkGq/uu64QP9mgyKqLrMtHj9M3SPXQLjYe3Wq';

export interface Selecao {
  nome: string;
  data: string;
  quantidade: number;
}

export interface Presente {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  quantidadeTotal: number;
  quantidadeEscolhida: number;
  selecionadoPor?: Selecao[];
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
        'X-Bin-Meta': 'false'
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
// SALVAR PRESENTES NO SERVIDOR
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
// SELECIONAR PRESENTE (COM NOME DO CONVIDADO)
// ============================================
export async function selecionarPresente(
  presenteId: string, 
  quantidade: number,
  nomeConvidado: string
): Promise<boolean> {
  try {
    const dados = await fetchPresentes();
    if (!dados) return false;
    
    const presentesAtualizados = dados.presentes.map(p => {
      if (p.id === presenteId) {
        const novasSelecoes = p.selecionadoPor || [];
        novasSelecoes.push({
          nome: nomeConvidado,
          data: new Date().toISOString(),
          quantidade
        });
        
        return {
          ...p,
          quantidadeEscolhida: p.quantidadeEscolhida + quantidade,
          selecionadoPor: novasSelecoes
        };
      }
      return p;
    });
    
    return await savePresentes(presentesAtualizados);
  } catch (error) {
    console.error('❌ Erro ao selecionar presente:', error);
    return false;
  }
}
