import React from 'react';
import { Film } from 'lucide-react';

interface Props {
  activeView: string;
  onNavigate: (view: string) => void;
  completedCount: number;
}

export const Navbar: React.FC<Props> = ({ activeView, onNavigate, completedCount }) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 lg:px-10 py-4 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('dashboard');
        }}
        className="text-lg lg:text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2 whitespace-nowrap shrink-0 group"
      >
        <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 group-hover:scale-125 transition-transform" />
        <span className="tracking-widest uppercase">CINEFLOW</span>
      </a>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium text-zinc-400">
        <button
          onClick={() => onNavigate('curriculum')}
          className={`hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'curriculum' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Curriculum
        </button>
        <button
          onClick={() => onNavigate('lab-color')}
          className={`hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'lab-color' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Color Lab
        </button>
        <button
          onClick={() => onNavigate('lab-framing')}
          className={`hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'lab-framing' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Framing & Optics
        </button>
        <button
          onClick={() => onNavigate('lab-camera')}
          className={`hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'lab-camera' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Camera Motion
        </button>
        <button
          onClick={() => onNavigate('lab-editing')}
          className={`hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'lab-editing' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Editing & Montage
        </button>
        <button
          onClick={() => onNavigate('lab-production')}
          className={`hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'lab-production' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Production Suite
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
        >
          <Film className="w-3.5 h-3.5" />
          <span>Director Passport</span>
          {completedCount > 0 && (
            <span className="ml-1 text-[10px] font-mono-cinema bg-zinc-950 text-amber-400 px-1.5 py-0.5 rounded-full">
              {completedCount}/8
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
