import React from 'react';
import { ArrowRight, Play, Sparkles, Sliders, Film } from 'lucide-react';

interface Props {
  onStartJourney: () => void;
  onOpenColorLab: () => void;
}

export const HeroSection: React.FC<Props> = ({ onStartJourney, onOpenColorLab }) => {
  return (
    <div className="space-y-12">
      {/* 2-Column Split Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Typographic Hierarchy */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-mono-cinema text-amber-400">
              Complete Filmmaking Masterclass & Creative Studio
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-100 text-balance leading-tight">
              Master the Craft of Cinema From First Script to Final Cut.
            </h1>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            An interactive filmmaking conservatory teaching the physics of light, color harmonies, lens compression, motivated camera movement, cutting on action, and actor directing with real-time digital simulators.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartJourney}
              className="px-5 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
              <span>Begin Filmmaker Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenColorLab}
              className="px-5 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Launch Color Studio</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Container (ARRI Cinema Camera on Soundstage) */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-zinc-800 bg-black min-h-[320px] lg:h-full shadow-2xl">
          <img
            src="/src/assets/images/hero_cinematic_camera_1794210229970.jpg"
            alt="ARRI Cinema Camera on moody soundstage"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Metaground Note */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-cinema text-white/90 drop-shadow">
            <span className="bg-black/60 px-2.5 py-1 rounded backdrop-blur-md border border-zinc-700/60">
              ARRI ALEXA 35 · ANAMORPHIC T1.5
            </span>
            <span className="text-amber-400 bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-zinc-700/60">
              24.00 FPS
            </span>
          </div>
        </div>
      </div>

      {/* Full-width 4-Column KPI Strip below the hero split */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
        <div>
          <span className="text-2xl font-bold font-mono-cinema text-zinc-100 tabular-nums">08</span>
          <span className="text-xs text-zinc-400 block mt-0.5 font-medium">Core Disciplines</span>
          <p className="text-[11px] text-zinc-500 mt-0.5">Scripting to Post-Production</p>
        </div>
        <div>
          <span className="text-2xl font-bold font-mono-cinema text-zinc-100 tabular-nums">06</span>
          <span className="text-xs text-zinc-400 block mt-0.5 font-medium">Interactive Labs</span>
          <p className="text-[11px] text-zinc-500 mt-0.5">Real-time scopes & viewfinders</p>
        </div>
        <div>
          <span className="text-2xl font-bold font-mono-cinema text-zinc-100 tabular-nums">16+</span>
          <span className="text-xs text-zinc-400 block mt-0.5 font-medium">Auteur Lessons</span>
          <p className="text-[11px] text-zinc-500 mt-0.5">Lighting ratios to J/L cuts</p>
        </div>
        <div>
          <span className="text-2xl font-bold font-mono-cinema text-amber-400 tabular-nums">100%</span>
          <span className="text-xs text-zinc-400 block mt-0.5 font-medium">Practical & Hands-On</span>
          <p className="text-[11px] text-zinc-500 mt-0.5">Printable shot sheets & plan</p>
        </div>
      </div>
    </div>
  );
};
