// ============================================
// CONFIGURAÇÕES DO JSONBIN.IO - PRESENTES
// ============================================
const BIN_ID_PRESENTES = '698f482a43b1c97be97c6e20';
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
    console.log('📥 Buscando presentes do JSONBin...');
    
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID_PRESENTES}/latest`, {
      headers: {
        'X-Master-Key': X_MASTER_KEY,
        'X-Bin-Meta': 'false',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Presentes carregados:', data);
    
    // ✅ GARANTIR QUE O FORMATO ESTÁ CORRETO
    return {
      presentes: data.presentes || [],
      ultimaAtualizacao: data.ultimaAtualizacao || new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Erro ao buscar presentes:', error);
    return null;
  }
}

// ============================================
// SALVAR PRESENTES NO SERVIDOR (ADMIN)
// ============================================
export async function savePresentes(presentes: Presente[]): Promise<boolean> {
  try {
    console.log('📤 Salvando presentes no JSONBin...');
    
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
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    console.log('✅ Presentes salvos com sucesso!');
    return true;
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
    console.log(`🔄 Atualizando presente ${presenteId} com +${quantidade}...`);
    
    const dados = await fetchPresentes();
    if (!dados || !dados.presentes) {
      console.error('❌ Não foi possível carregar presentes atuais');
      return false;
    }
    
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

// ============================================
// FUNÇÃO DE TESTE - EXECUTE NO CONSOLE
// ============================================
export async function testarConexaoPresentes() {
  try {
    console.log('🔍 Testando conexão com JSONBin (presentes)...');
    
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID_PRESENTES}/latest`, {
      headers: {
        'X-Master-Key': X_MASTER_KEY,
        'X-Bin-Meta': 'false'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ CONEXÃO OK!');
      console.log('📦 Dados completos:', data);
      console.log('🎁 Presentes:', data.presentes);
      console.log('🔢 Total:', data.presentes?.length || 0);
      return data;
    } else {
      console.error('❌ Falha na conexão:', response.status);
    }
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}
