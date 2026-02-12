// Substitua a função handleUpload por esta:

const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target || !e.target.files || e.target.files.length === 0) {
    return;
  }

  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);

  const reader = new FileReader();
  
  reader.onload = async (event: ProgressEvent<FileReader>) => {
    if (!event.target || !event.target.result) {
      return;
    }

    const imageData = event.target.result as string;
    
    try {
      // ✅ 1. Atualiza localmente (rápido)
      onImageChange(imageData);
      localStorage.setItem(storageKey, imageData);
      
      // ✅ 2. Salva no servidor (para todos os visitantes)
      const saved = await saveGlobalImage(storageKey, imageData);
      
      if (saved) {
        alert('✅ Imagem atualizada para TODOS os visitantes!');
        
        // ✅ 3. Dispara evento para outras abas
        window.dispatchEvent(new CustomEvent('imagemAtualizada', { 
          detail: { key: storageKey, imageData } 
        }));
      } else {
        alert('⚠️ Imagem salva localmente! (modo offline)');
      }
    } catch (err) {
      console.error("Erro no upload:", err);
      alert('✅ Imagem salva localmente!');
    } finally {
      setUploading(false);
    }
  };

  reader.readAsDataURL(file);
  e.target.value = '';
};
