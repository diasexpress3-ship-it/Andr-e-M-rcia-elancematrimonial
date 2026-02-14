import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Countdown from './components/Countdown';
import ImageUploader from './components/ImageUploader';
import RSVPForm from './components/RSVPForm';
import BotaoPresentesAnimado from './components/BotaoPresentesAnimado';
import BotaoMenuAnimado from './components/BotaoMenuAnimado';
import BotaoPresentesCompacto from './components/BotaoPresentesCompacto';
import PresentesPage from './pages/Presentes';
import MenuPage from './pages/Menu';
import ProgramaDia from './components/ProgramaDia'; // ✅ NOVO COMPONENTE
import { PLACEHOLDERS } from './constants';
import { StorageKey } from './types';
import { fetchGlobalImages, testJSONBinConnection } from './services/imageService';

const App: React.FC = () => {
  // ===== ESTADO INICIAL =====
  const [images, setImages] = useState({
    wedding_cover: localStorage.getItem('wedding_cover') || PLACEHOLDERS.wedding_cover,
    wedding_moment: localStorage.getItem('wedding_moment') || PLACEHOLDERS.wedding_moment,
    wedding_location: localStorage.getItem('wedding_location') || PLACEHOLDERS.wedding_location,
  });
  const [loading, setLoading] = useState(true);

  // ===== CARREGAR IMAGENS DA NUVEM =====
  useEffect(() => {
    const carregarImagensGlobais = async () => {
      try {
        setLoading(true);
        console.log('🚀 Iniciando carga de imagens da nuvem...');
        
        const conexaoOK = await testJSONBinConnection();
        console.log('🔌 Conexão com JSONBin:', conexaoOK ? '✅' : '❌');
        
        if (conexaoOK) {
          const imagensGlobais = await fetchGlobalImages();
          console.log('📦 Dados brutos recebidos da nuvem:', imagensGlobais);
          
          if (imagensGlobais) {
            setImages(prev => ({
              wedding_cover: imagensGlobais.wedding_cover || prev.wedding_cover,
              wedding_moment: imagensGlobais.wedding_moment || prev.wedding_moment,
              wedding_location: imagensGlobais.wedding_location || prev.wedding_location,
            }));
            
            if (imagensGlobais.wedding_cover) {
              localStorage.setItem('wedding_cover', imagensGlobais.wedding_cover);
              console.log('💾 Capa salva no localStorage');
            }
            if (imagensGlobais.wedding_moment) {
              localStorage.setItem('wedding_moment', imagensGlobais.wedding_moment);
              console.log('💾 Momento salvo no localStorage');
            }
            if (imagensGlobais.wedding_location) {
              localStorage.setItem('wedding_location', imagensGlobais.wedding_location);
              console.log('💾 Local salvo no localStorage');
            }
            
            console.log('✅ Estado atualizado com imagens da nuvem!');
          }
        }
      } catch (error) {
        console.error('❌ Erro crítico ao carregar imagens globais:', error);
      } finally {
        setLoading(false);
      }
    };
    
    carregarImagensGlobais();
  }, []);

  // ===== FALLBACK PARA LOCALSTORAGE =====
  useEffect(() => {
    if (images.wedding_moment.includes('placehold') || 
        images.wedding_location.includes('placehold') ||
        images.wedding_cover.includes('placehold')) {
      
      console.log('🔄 Fallback: tentando carregar imagens do localStorage...');
      
      const capa = localStorage.getItem('wedding_cover');
      const momento = localStorage.getItem('wedding_moment');
      const local = localStorage.getItem('wedding_location');
      
      setImages(prev => ({
        wedding_cover: capa || prev.wedding_cover,
        wedding_moment: momento || prev.wedding_moment,
        wedding_location: local || prev.wedding_location,
      }));
    }
  }, []);

  // ===== ATUALIZAR IMAGEM =====
  const updateImage = (key: StorageKey, value: string) => {
    setImages(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(key, value);
    console.log(`📤 Imagem ${key} atualizada localmente`);
    
    window.dispatchEvent(new CustomEvent('imagemAtualizada', { 
      detail: { key, imageData: value } 
    }));
  };

  // ===== ESCUTAR ATUALIZAÇÕES =====
  useEffect(() => {
    const handleImagemAtualizada = (e?: CustomEvent) => {
      if (e?.detail) {
        const { key, imageData } = e.detail;
        setImages(prev => ({ ...prev, [key]: imageData }));
        console.log(`🔄 Imagem ${key} sincronizada entre abas`);
      }
    };

    window.addEventListener('imagemAtualizada', handleImagemAtualizada as EventListener);
    window.addEventListener('storage', handleImagemAtualizada as EventListener);
    
    return () => {
      window.removeEventListener('imagemAtualizada', handleImagemAtualizada as EventListener);
      window.removeEventListener('storage', handleImagemAtualizada as EventListener);
    };
  }, []);

  const handleOpenMap = () => {
    window.open('https://maps.app.goo.gl/2bkdZqCTxKwZDdAk9', '_blank');
  };

  // ===== COMPONENTE DA PÁGINA PRINCIPAL =====
  const HomePage = () => (
    <>
      {/* Header Section - Capa */}
      <header className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 brightness-[0.7] animate-kenburns" 
          style={{ 
            backgroundImage: `url(${images.wedding_cover})`
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto space-y-4 md:space-y-6 reveal-up">
          <span className="text-white text-xs md:text-sm uppercase tracking-[0.5em] font-medium drop-shadow-md">SALVEM A DATA</span>
          
          <h1 className="text-4xl md:text-8xl font-serif text-white leading-tight drop-shadow-2xl">
            André Nauana & <br className="md:hidden" /> Márcia Mapsanganhe
          </h1>
          
          <p className="text-white/90 text-sm md:text-xl italic font-light tracking-wide max-w-2xl px-4">
            "Onde quer que fores, irei eu; e onde quer que pousares, pousarei eu."
          </p>
          
          <div className="pt-6 md:pt-10">
            <Countdown />
          </div>

          <div className="pt-6 space-y-2">
            <p className="text-white text-xl md:text-3xl font-serif drop-shadow-md">25 de Abril de 2026</p>
            <div className="flex flex-col items-center">
                <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold">Moçambique</span>
                <svg className="w-6 h-6 text-white mt-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" />
                </svg>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
             <ImageUploader 
                storageKey="wedding_cover" 
                currentImage={images.wedding_cover} 
                onImageChange={(img: string) => updateImage('wedding_cover', img)}
                label="Mudar Foto de Capa"
              />
          </div>
        </div>
      </header>

      {/* Seção de Introdução */}
      <section className="max-w-4xl mx-auto py-32 px-6 text-center overflow-hidden">
        <div className="animate-sway-x inline-block mb-8">
            <svg className="w-10 h-10 text-[#b76e79] mx-auto opacity-60" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.22l-.61-.6a5.5 5.5 0 00-7.78 7.77L10 18.16l8.39-7.77a5.5 5.5 0 00-7.78-7.77l-.61.61z" />
            </svg>
        </div>
        <div className="animate-sway-x">
          <h2 className="text-5xl md:text-6xl font-serif text-[#2c1810] mb-10 italic">"O Início do Nosso Sempre"</h2>
          <p className="text-xl md:text-2xl text-[#2c1810]/80 leading-relaxed font-light max-w-2xl mx-auto">
            Amigos, família e amores. Estamos radiantes em compartilhar com vocês este momento único das nossas vidas em Maputo. Preparem os corações para celebrar o amor e a união.
          </p>
        </div>
      </section>

      {/* ===== NOVA SEÇÃO: PROGRAMA DO DIA / CRONOGRAMA ===== */}
      <ProgramaDia />

      {/* Seção da Foto Especial - MOMENTO */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#d4af37]/10 reveal-up">
          <div className="md:w-3/5 relative h-[500px] md:h-auto overflow-hidden">
            <img 
              src={images.wedding_moment} 
              alt="Momento Especial do Casal" 
              className="w-full h-full object-cover animate-sway-all"
            />
            <div className="absolute bottom-6 left-6 z-20">
               <ImageUploader 
                storageKey="wedding_moment" 
                currentImage={images.wedding_moment} 
                onImageChange={(img: string) => updateImage('wedding_moment', img)}
                label="Mudar Imagem Especial"
              />
            </div>
          </div>
          <div className="md:w-2/5 p-12 md:p-20 flex flex-col justify-center bg-[#fff9f0]/40">
            <div className="animate-sway-x">
              <h3 className="text-4xl font-serif text-[#2c1810] mb-8 italic">Nossa História...</h3>
              <p className="text-[#2c1810]/70 text-lg mb-8 leading-relaxed italic border-l-4 border-[#b76e79]/30 pl-6">
                "Um casamento não é apenas a união de duas pessoas, mas a celebração de todas as histórias que nos trouxeram até aqui."
              </p>
              <div className="h-[2px] w-16 bg-[#b76e79] opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Local do Evento */}
      <section className="bg-white py-32 border-y border-[#d4af37]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 italic text-[#2c1810] text-center reveal-up">O Local do Grande Dia</h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-3/5 relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-[#fff9f0] animate-sway-all">
               <img 
                src={images.wedding_location} 
                alt="Salão Enigma - Local do Evento" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute top-4 left-4 z-20">
                <ImageUploader 
                  storageKey="wedding_location" 
                  currentImage={images.wedding_location} 
                  onImageChange={(img: string) => updateImage('wedding_location', img)}
                  label="Mudar Foto do Salão"
                />
              </div>
            </div>

            <div className="w-full lg:w-2/5 text-left space-y-8 animate-sway-x">
                <div className="space-y-4">
                  <h4 className="text-5xl font-serif italic text-[#d4af37]">Salão Enigma</h4>
                  <div className="h-[1px] w-32 bg-[#d4af37]/40" />
                  <p className="text-xl text-[#2c1810]/80 font-light leading-relaxed">
                    📍 Próximo à Portagem de Zintava, <br />
                    defronte da Casa Jovem.<br />
                    <span className="font-semibold text-[#2c1810]">Maputo, Moçambique</span>
                  </p>
                </div>
                
                <div className="pt-4">
                  <button 
                    onClick={handleOpenMap}
                    className="flex items-center space-x-3 bg-[#d4af37] text-white px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95 animate-pulse-gold group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="font-semibold tracking-wide uppercase text-sm">Ver localização</span>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-32 px-6 bg-[#fff9f0]">
        <div className="animate-sway-all">
          <RSVPForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center reveal-up">
          <div className="max-w-xs mx-auto mb-10 h-[1px] bg-[#d4af37] opacity-20" />
          <p className="font-serif italic text-3xl md:text-5xl text-[#2c1810] leading-snug">
            André Victor Nauana & <br className="md:hidden" /> Márcia Sandra Mapsanganhe
          </p>
          <p className="text-sm md:text-lg uppercase tracking-[0.5em] text-[#2c1810]/40 mt-6 font-medium">25 • Abril • 2026</p>
          <p className="mt-12 text-[10px] text-[#2c1810]/30 uppercase tracking-widest font-semibold">Feito com amor • Maputo, Moçambique</p>
        </div>

        {/* Developer Credit */}
        <div className="absolute bottom-6 left-6 text-left opacity-80 hover:opacity-100 transition-all duration-500 cursor-default hidden md:block bg-orange-500 p-3 rounded-lg shadow-md">
          <p className="text-[10px] uppercase tracking-wider text-white font-bold">Developer (Vicente Dias) Tech</p>
          <p className="text-[9px] uppercase tracking-[0.2em] text-black font-black mt-0.5">CEO and Founder - DEX</p>
        </div>
        
        <div className="md:hidden mt-16 text-center opacity-80 bg-orange-500 p-4 mx-6 rounded-xl shadow-md">
          <p className="text-[9px] uppercase tracking-wider text-white font-bold">Developer (Vicente Dias) Tech</p>
          <p className="text-[8px] uppercase tracking-[0.2em] text-black font-black mt-1">CEO and Founder - DEX</p>
        </div>
      </footer>

      {/* Botões flutuantes animados */}
      <BotaoPresentesAnimado />
      <BotaoMenuAnimado />
      <BotaoPresentesCompacto />
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff9f0]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2c1810] font-serif text-xl">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/presentes" element={<PresentesPage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
