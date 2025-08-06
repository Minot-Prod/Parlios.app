
import React from 'react';
import type { StoryPart } from '../types';

interface StoryGeneratorProps {
  part: StoryPart;
  onSelect: (choice: string) => void;
  historyCount: number;
  totalCount: number;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({ part, onSelect, historyCount, totalCount }) => {
  return (
    <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl animate-fade-in w-full">
        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6">
            <div className="bg-gradient-to-r from-calm-indigo to-soft-purple h-2.5 rounded-full" style={{ width: `${(historyCount / totalCount) * 100}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>
        
        <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-p:text-lg prose-p:leading-relaxed mb-6">
            <p className="animate-fade-in">{part.storySegment}</p>
        </div>
      
      <p className="text-xl font-semibold text-glow-purple mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        {part.question}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {part.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onSelect(choice)}
            className="w-full bg-slate-700/80 hover:bg-calm-indigo text-light-slate font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-left transform hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${0.7 + index * 0.1}s` }}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoryGenerator;
