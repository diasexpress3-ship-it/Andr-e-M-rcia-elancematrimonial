// ============================================
// SERVIÇO PARA BUSCAR IMAGENS DO PEXELS
// ============================================
const PEXELS_API_KEY = 'SUA_CHAVE_AQUI'; // ← Coloque sua chave!

export async function buscarImagemPexels(termo: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(termo)}&per_page=5`, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        // Retorna a primeira imagem em tamanho médio
        return data.photos[0].src.medium;
      }
    }
  } catch (error) {
    console.error('❌ Erro ao buscar imagem do Pexels:', error);
  }
  return null;
}

// Buscar imagens para todos os presentes
export async function buscarImagensParaPresentes(presentes: any[]) {
  const presentesComImagens = [];
  
  for (const presente of presentes) {
    console.log(`🔍 Buscando imagem para: ${presente.nome}`);
    const imagem = await buscarImagemPexels(presente.nome);
    
    presentesComImagens.push({
      ...presente,
      imagem: imagem || 'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?w=400' // fallback
    });
    
    // Pequena pausa para não exceder limite da API
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  return presentesComImagens;
}
