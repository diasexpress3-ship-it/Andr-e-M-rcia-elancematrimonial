// ============================================
// CONFIGURAÇÕES DO JSONBIN.IO - SEUS DADOS!
// ============================================
const BIN_ID = '698dea3143b1c97be979bd73';
const X_MASTER_KEY = '$2a$10$0zWHGBmJLD9aOtvEwkGq/uu64QP9mgyKqLrMtHj9M3SPXQLjYe3Wq';

export interface ImagesData {
  wedding_cover: string;
  wedding_moment: string;
  wedding_location: string;
}

// ============================================
// BUSCAR IMAGENS DO SERVIDOR (TODOS OS VISITANTES)
// ============================================
export async function fetchGlobalImages(): Promise<ImagesData | null> {
  try {
    console.log('📥 Buscando imagens do JSONBin...');
    
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': X_MASTER_KEY,
        'X-Bin-Meta': 'false',
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Imagens carregadas:', data);
      
      return {
        wedding_cover: data.wedding_cover || '',
        wedding_moment: data.wedding_moment || '',
        wedding_location: data.wedding_location || ''
      };
    } else {
      console.error('❌ Erro na resposta:', response.status);
    }
  } catch (error) {
    console.error('❌ Erro ao buscar imagens globais:', error);
  }
  return null;
}

// ============================================
// SALVAR IMAGEM NO SERVIDOR (SÓ O ADMIN)
// ============================================
export async function saveGlobalImage(key: string, imageData: string): Promise<boolean> {
  try {
    console.log(`📤 Salvando imagem ${key} no JSONBin...`);
    
    // Primeiro, busca as imagens atuais
    const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': X_MASTER_KEY,
        'X-Bin-Meta': 'false'
      }
    });
    
    if (getResponse.ok) {
      const currentData = await getResponse.json();
      
      // Se o bin estiver vazio, cria estrutura inicial
      const dataToSave = Object.keys(currentData).length === 0 
        ? {
            wedding_cover: '',
            wedding_moment: '',
            wedding_location: ''
          }
        : currentData;
      
      // Atualiza apenas a imagem modificada
      const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'X-Master-Key': X_MASTER_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...dataToSave,
          [key]: imageData
        })
      });
      
      if (updateResponse.ok) {
        console.log('✅ Imagem salva com sucesso!');
        return true;
      } else {
        console.error('❌ Erro no PUT:', await updateResponse.text());
      }
    } else {
      // Se o bin não existir, cria um novo
      const createResponse = await fetch(`https://api.jsonbin.io/v3/b`, {
        method: 'POST',
        headers: {
          'X-Master-Key': X_MASTER_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wedding_cover: key === 'wedding_cover' ? imageData : '',
          wedding_moment: key === 'wedding_moment' ? imageData : '',
          wedding_location: key === 'wedding_location' ? imageData : ''
        })
      });
      
      return createResponse.ok;
    }
  } catch (error) {
    console.error('❌ Erro ao salvar imagem global:', error);
  }
  return false;
}

// ============================================
// TESTAR CONEXÃO COM JSONBIN
// ============================================
export async function testJSONBinConnection() {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      headers: {
        'X-Master-Key': X_MASTER_KEY
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Conexão com JSONBin OK!');
      console.log('📦 Dados atuais:', data.record);
      return true;
    } else {
      console.error('❌ Falha na conexão:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Erro na conexão:', error);
    return false;
  }
}
