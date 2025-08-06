
import React from 'react';
import type { Theme } from '../types';
import Loader from './Loader';

interface ThemeSelectorProps {
  themes: Theme[];
  onSelect: (theme: Theme) => void;
  isLoading: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, onSelect, isLoading }) => {
  return (
    <div className="text-center p-4 animate-fade-in relative">
      {isLoading && <div className="absolute inset-0 bg-deep-slate/70 flex items-center justify-center z-20 rounded-lg"><Loader message="Préparation de la magie..."/></div>}
      <h2 className="text-3xl font-bold mb-2">Choisissez un Monde de Rêves</h2>
      <p className="text-slate-300 mb-8">Où notre voyage commence-t-il ce soir ?</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme)}
            disabled={isLoading}
            className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-calm-indigo hover:bg-slate-800 transition-all duration-300 text-left flex items-center space-x-6 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <div className="text-calm-indigo flex-shrink-0">{theme.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-light-slate">{theme.title}</h3>
              <p className="text-slate-400 mt-1">{theme.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
