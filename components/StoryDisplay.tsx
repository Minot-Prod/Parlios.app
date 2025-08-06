
import React from 'react';
import { NarrationState } from '../types';
import { PlayIcon, PauseIcon, StopIcon, RestartIcon } from './icons';

interface StoryDisplayProps {
  story: string;
  narrationState: NarrationState;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onRestart: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, narrationState, onPlay, onPause, onStop, onRestart }) => {
  return (
    <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl animate-fade-in-slow w-full">
      <h2 className="text-3xl font-bold text-center mb-6 text-glow-purple">Votre Histoire Merveilleuse</h2>
      
      <div className="max-h-80 overflow-y-auto p-4 bg-slate-900/50 rounded-lg mb-6 border border-slate-700">
        <p className="whitespace-pre-wrap text-slate-300 leading-relaxed text-lg">{story}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2">
            {narrationState !== NarrationState.PLAYING && (
                <button
                    onClick={onPlay}
                    className="flex items-center gap-2 bg-calm-indigo hover:bg-soft-purple text-white font-bold py-2 px-4 rounded-full transition-colors transform hover:scale-105"
                >
                    <PlayIcon />
                    <span>{narrationState === NarrationState.PAUSED ? "Reprendre" : "Écouter"}</span>
                </button>
            )}
            {narrationState === NarrationState.PLAYING && (
                <button
                    onClick={onPause}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-colors transform hover:scale-105"
                >
                    <PauseIcon />
                    <span>Pause</span>
                </button>
            )}
            <button
                onClick={onStop}
                disabled={narrationState === NarrationState.IDLE}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
                <StopIcon />
                <span>Arrêter</span>
            </button>
        </div>
        <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full transition-colors transform hover:scale-105"
        >
            <RestartIcon />
            <span>Recommencer</span>
        </button>
      </div>
    </div>
  );
};

export default StoryDisplay;
