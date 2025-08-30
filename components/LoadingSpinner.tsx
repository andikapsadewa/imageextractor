
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-400"></div>
      <h3 className="text-2xl font-bold mt-6 text-slate-200">AI sedang menganalisis...</h3>
      <p className="text-slate-400 mt-2">Ini mungkin memakan waktu beberapa saat.</p>
    </div>
  );
};
