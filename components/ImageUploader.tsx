
import React, { useRef, useState, useCallback } from 'react';
import { ImageIcon } from './icons/ImageIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  onAnalyze: () => void;
  imageUrl: string | null;
  hasImage: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onAnalyze, imageUrl, hasImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={!hasImage ? triggerFileInput : undefined}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`w-full max-w-lg p-6 border-2 border-dashed rounded-xl text-center transition-all duration-300 ease-in-out
          ${!hasImage ? 'cursor-pointer hover:border-sky-500 hover:bg-slate-700/50' : ''}
          ${isDragging ? 'border-sky-400 bg-slate-700/70 scale-105' : 'border-slate-600'}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {imageUrl ? (
          <div className="relative group">
             <img src={imageUrl} alt="Pratinjau Unggahan" className="max-h-80 w-auto mx-auto rounded-lg shadow-lg" />
             <div 
                onClick={triggerFileInput} 
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center transition-all duration-300 cursor-pointer rounded-lg">
                <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Ganti Gambar</p>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <ImageIcon className="w-16 h-16 mb-4 text-slate-500" />
            <p className="font-semibold text-slate-300">
              Seret & Jatuhkan gambar di sini
            </p>
            <p className="text-sm mt-1">atau klik untuk memilih file</p>
            <p className="text-xs text-slate-500 mt-4">PNG, JPG, GIF, WEBP</p>
          </div>
        )}
      </div>
      {hasImage && (
        <button
          onClick={onAnalyze}
          className="mt-8 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-900/50"
        >
          Analisis Gambar
        </button>
      )}
    </div>
  );
};
