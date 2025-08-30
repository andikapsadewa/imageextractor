
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ReportDisplay } from './components/ReportDisplay';
import { analyzeImage } from './services/geminiService';
import { AppStatus } from './types';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [report, setReport] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setStatus(AppStatus.IDLE);
    setReport('');
    setError(null);
  };

  const handleAnalysis = useCallback(async () => {
    if (!imageFile) return;

    setStatus(AppStatus.LOADING);
    setError(null);
    setReport('');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        if (!base64String) {
           throw new Error("Gagal membaca file gambar.");
        }
        
        const generatedReport = await analyzeImage(base64String, imageFile.type);
        setReport(generatedReport);
        setStatus(AppStatus.SUCCESS);
      };
      reader.onerror = () => {
        throw new Error("Gagal memproses gambar.");
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui.';
      console.error(err);
      setError(errorMessage);
      setStatus(AppStatus.ERROR);
    }
  }, [imageFile]);

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setImageFile(null);
    setImageUrl(null);
    setReport('');
    setError(null);
  };

  const renderContent = () => {
    switch (status) {
      case AppStatus.LOADING:
        return <LoadingSpinner />;
      case AppStatus.SUCCESS:
        return <ReportDisplay imageUrl={imageUrl!} report={report} onReset={handleReset} />;
      case AppStatus.ERROR:
        return (
          <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
            <h3 className="text-xl font-bold text-red-400 mb-2">Analisis Gagal</h3>
            <p className="text-red-300">{error}</p>
            <button
              onClick={handleReset}
              className="mt-6 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Coba Lagi
            </button>
          </div>
        );
      default:
        return (
          <ImageUploader 
            onImageUpload={handleImageUpload} 
            onAnalyze={handleAnalysis} 
            imageUrl={imageUrl} 
            hasImage={!!imageFile}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
            Image Extractor AI
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Unggah gambar untuk dianalisis dan dapatkan laporan mendetail.
          </p>
        </header>
        <main className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-slate-950/50 p-4 sm:p-8 transition-all duration-500">
          {renderContent()}
        </main>
         <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Gemini AI</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
