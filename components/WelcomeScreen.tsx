
import React from 'react';
import { StarsIcon } from './icons';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 animate-fade-in flex flex-col items-center">
      <div className="text-glow-purple mb-6">
        <StarsIcon />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-light-slate mb-4">
        Créateur d'Histoires du Soir
      </h1>
      <p className="text-lg text-slate-300 mb-8 max-w-2xl">
        Bienvenue dans un monde de rêves. Ensemble, nous allons créer une histoire unique et apaisante pour une douce nuit.
      </p>
      <button
        onClick={onStart}
        className="bg-calm-indigo hover:bg-soft-purple text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg shadow-indigo-500/30 transform hover:scale-105 transition-all duration-300"
      >
        Commencer l'aventure
      </button>
    </div>
  );
};

export default WelcomeScreen;
