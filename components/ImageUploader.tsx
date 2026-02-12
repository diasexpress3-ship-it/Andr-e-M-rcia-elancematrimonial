
import React, { useRef } from 'react';
import { StorageKey } from '../types';

interface ImageUploaderProps {
  storageKey: StorageKey;
  currentImage: string;
  onImageChange: (newImage: string) => void;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ storageKey, currentImage, onImageChange, label = "Carregar Foto" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result as string;
      onImageChange(imageData);
      try {
        localStorage.setItem(storageKey, imageData);
      } catch (err) {
        console.error("Storage limit reached or error saving image", err);
        alert("Ops! A imagem é muito grande. Tente uma foto menor.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative inline-block mt-4">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-white/80 hover:bg-white text-[#2c1810] px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all flex items-center space-x-2 backdrop-blur-md border border-[#d4af37]/30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{label}</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
