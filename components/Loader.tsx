
import React from 'react';

interface LoaderProps {
    message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <div className="relative flex justify-center items-center">
            <div className="absolute w-16 h-16 rounded-full bg-soft-purple animate-ping"></div>
            <div className="absolute w-24 h-24 rounded-full bg-soft-purple/50 animate-ping" style={{animationDelay: '0.5s'}}></div>
            <div className="w-8 h-8 rounded-full bg-glow-purple"></div>
        </div>
      <p className="mt-8 text-xl font-semibold text-slate-300">{message}</p>
    </div>
  );
};

export default Loader;
