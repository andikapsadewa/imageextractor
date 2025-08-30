
import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/70 backdrop-blur-sm border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0 flex items-center gap-2">
              <LogoIcon className="h-8 w-auto text-sky-400" />
              <span className="text-xl font-bold text-slate-100">Image Extractor AI</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Login
            </button>
            <button className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-bold transition-colors shadow-md shadow-sky-900/40">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
