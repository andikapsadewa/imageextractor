
import React from 'react';

// A simple markdown-to-html renderer
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');
    const elements = lines.map((line, index) => {
        if (line.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold mt-6 mb-3 text-sky-300">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-semibold mt-5 mb-2 text-sky-400 border-b-2 border-slate-600 pb-1">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-slate-300">{line.substring(4)}</h3>;
        }
        if (line.trim() === '') {
            return <br key={index} />;
        }
        return <p key={index} className="my-1 text-slate-300 leading-relaxed">{line}</p>;
    });
    return <>{elements}</>;
};

interface ReportDisplayProps {
  imageUrl: string;
  report: string;
  onReset: () => void;
}

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ imageUrl, report, onReset }) => {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-center text-slate-300">Gambar yang Dianalisis</h2>
          <img 
            src={imageUrl} 
            alt="Uploaded content" 
            className="rounded-lg shadow-2xl shadow-slate-950/70 max-h-[60vh] w-auto object-contain"
          />
        </div>
        <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700 max-h-[70vh] overflow-y-auto">
          <SimpleMarkdown text={report} />
        </div>
      </div>
      <div className="text-center mt-10">
        <button
          onClick={onReset}
          className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
        >
          Analisis Gambar Lain
        </button>
      </div>
    </div>
  );
};
