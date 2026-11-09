import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Eye, RefreshCw, Palette, Sparkles, Layers, Check } from 'lucide-react';
import { ColorGradeState } from '../../types/filmmaking';

interface PresetStock {
  id: string;
  name: string;
  era: string;
  description: string;
  settings: ColorGradeState;
}

const PRESET_STOCKS: PresetStock[] = [
  {
    id: 'kodak-5219',
    name: 'Kodak Vision3 5219',
    era: '35mm Modern',
    description: 'The golden standard of Hollywood. Warm skin tones, gentle highlight roll-off, and subtle organic halation.',
    settings: {
      lift: { r: 5, g: 0, b: -5 },
      gamma: { r: 8, g: 2, b: -4 },
      gain: { r: 12, g: 4, b: -8 },
      temperature: 15,
      tint: 4,
      saturation: 108,
      contrast: 106,
      filmGrain: 35,
      selectedStock: 'kodak-5219'
    }
  },
  {
    id: 'teal-orange',
    name: 'Blockbuster Teal & Orange',
    era: 'Contemporary Cinema',
    description: 'Complementary color separation. Deep cold cyan in the shadows balancing radiant warm terracotta on human skin.',
    settings: {
      lift: { r: -18, g: 6, b: 24 },
      gamma: { r: 10, g: -2, b: -8 },
      gain: { r: 24, g: 10, b: -16 },
      temperature: 8,
      tint: -6,
      saturation: 125,
      contrast: 120,
      filmGrain: 20,
      selectedStock: 'teal-orange'
    }
  },
  {
    id: 'fuji-eterna',
    name: 'Fujifilm Eterna 500T',
    era: 'Arthouse Japanese / European',
    description: 'Understated elegance. Soft desaturated shadows, muted pastel greens, and poetic melancholy.',
    settings: {
      lift: { r: -4, g: 8, b: 6 },
      gamma: { r: -2, g: 4, b: 2 },
      gain: { r: -6, g: 2, b: 8 },
      temperature: -10,
      tint: -12,
      saturation: 90,
      contrast: 95,
      filmGrain: 25,
      selectedStock: 'fuji-eterna'
    }
  },
  {
    id: 'noir-monochrome',
    name: 'Silver Nitrate Noir (B&W)',
    era: '1940s Classic Noir',
    description: 'Zero chroma. Pure chiaroscuro drama, deep crushed black shadows and crisp silver highlights.',
    settings: {
      lift: { r: -15, g: -15, b: -15 },
      gamma: { r: 0, g: 0, b: 0 },
      gain: { r: 20, g: 20, b: 20 },
      temperature: 0,
      tint: 0,
      saturation: 0,
      contrast: 140,
      filmGrain: 55,
      selectedStock: 'noir-monochrome'
    }
  },
  {
    id: 'wes-anderson',
    name: 'Pastel Nostalgia',
    era: 'Auteur Stylized',
    description: 'Warm yellow ochre saturation, reduced contrast, and sunny vintage confection inspired by Wes Anderson.',
    settings: {
      lift: { r: 12, g: 8, b: -10 },
      gamma: { r: 15, g: 12, b: -5 },
      gain: { r: 8, g: 6, b: -12 },
      temperature: 28,
      tint: 8,
      saturation: 115,
      contrast: 92,
      filmGrain: 15,
      selectedStock: 'wes-anderson'
    }
  },
  {
    id: 'cyber-neon',
    name: 'Dystopian Cyber Emerald',
    era: 'Sci-Fi Dystopia',
    description: 'Atmospheric green-tinted shadows, sickly fluorescent ambiance, inspired by The Matrix and Blade Runner.',
    settings: {
      lift: { r: -20, g: 16, b: -10 },
      gamma: { r: -10, g: 18, b: 4 },
      gain: { r: -5, g: 12, b: 15 },
      temperature: -15,
      tint: -30,
      saturation: 112,
      contrast: 118,
      filmGrain: 40,
      selectedStock: 'cyber-neon'
    }
  }
];

const DEFAULT_GRADE: ColorGradeState = {
  lift: { r: 0, g: 0, b: 0 },
  gamma: { r: 0, g: 0, b: 0 },
  gain: { r: 0, g: 0, b: 0 },
  temperature: 0,
  tint: 0,
  saturation: 100,
  contrast: 100,
  filmGrain: 0,
  selectedStock: 'custom'
};

const COLOR_PSYCHOLOGY = [
  { name: 'Red', hex: '#EF4444', emotion: 'Danger, passionate love, raw violence, urgency, forbidden temptation', cinema: 'American Beauty, Cries and Whispers, In the Mood for Love' },
  { name: 'Amber / Orange', hex: '#F97316', emotion: 'Warmth, memory, nostalgia, scorching heat, desert peril', cinema: 'Mad Max: Fury Road, Dune, The Godfather' },
  { name: 'Yellow', hex: '#EAB308', emotion: 'Obsession, innocence, madness, mental illness, sunlit youth', cinema: 'Taxi Driver, Moonrise Kingdom, The Shining' },
  { name: 'Emerald / Green', hex: '#10B981', emotion: 'Uncanny, sickness, technology, greed, otherworldly realm', cinema: 'The Matrix, Vertigo, Parasite' },
  { name: 'Cyan / Teal', hex: '#06B6D4', emotion: 'Calculated calm, sterile technology, underwater isolation', cinema: 'Blade Runner 2049, Tron: Legacy, The Ring' },
  { name: 'Deep Blue', hex: '#3B82F6', emotion: 'Melancholy, grief, vast mystery, cold emotional detachment', cinema: 'Three Colors: Blue, Moonlight, Drive' },
  { name: 'Violet / Purple', hex: '#A855F7', emotion: 'Royalty, psychedelic delusion, ambiguous gender, cruelty', cinema: 'Blade Runner (Joi hologram), Color Out of Space' }
];

export const ColorGradingLab: React.FC = () => {
  const [grade, setGrade] = useState<ColorGradeState>(PRESET_STOCKS[0].settings);
  const [showOriginal, setShowOriginal] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'grading' | 'psychology' | 'theory'>('grading');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render simulated RGB Parade / Waveform monitor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Draw background grid lines
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1;

    for (let y = 0; y < h; y += h / 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Baseline RGB offsets influenced by Lift, Gamma, Gain, Temp, Tint
    const rShift = (grade.lift.r * 0.4) + (grade.gamma.r * 0.6) + (grade.gain.r * 0.8) + (grade.temperature * 0.3) - (grade.saturation === 0 ? 0 : 0);
    const gShift = (grade.lift.g * 0.4) + (grade.gamma.g * 0.6) + (grade.gain.g * 0.8) - (grade.tint * 0.3);
    const bShift = (grade.lift.b * 0.4) + (grade.gamma.b * 0.6) + (grade.gain.b * 0.8) - (grade.temperature * 0.3) + (grade.tint * 0.1);

    const segmentW = w / 3;

    // Helper to draw realistic trace curves
    const drawTrace = (startX: number, color: string, shift: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = 0; x < segmentW; x += 3) {
        // Pseudo image luminance wave
        const normalVal = Math.sin(x * 0.08) * 20 + Math.cos(x * 0.14) * 15 + (x / segmentW) * 30 + 50;
        const contrastScale = grade.contrast / 100;
        const adjustedVal = (normalVal - 50) * contrastScale + 50 + shift;
        const clampedY = h - Math.max(10, Math.min(h - 10, (adjustedVal / 120) * h));
        if (x === 0) ctx.moveTo(startX + x, clampedY);
        else ctx.lineTo(startX + x, clampedY);
      }
      ctx.stroke();
    };

    // Draw RED, GREEN, BLUE channels
    drawTrace(0, 'rgba(239, 68, 68, 0.85)', rShift);
    drawTrace(segmentW, 'rgba(34, 197, 94, 0.85)', gShift);
    drawTrace(segmentW * 2, 'rgba(59, 130, 246, 0.85)', bShift);

    // Channel labels
    ctx.font = '10px monospace';
    ctx.fillStyle = '#71717a';
    ctx.fillText('R', 8, 14);
    ctx.fillText('G', segmentW + 8, 14);
    ctx.fillText('B', segmentW * 2 + 8, 14);
  }, [grade]);

  // Compute CSS filter and color tint overlays
  const getFilterStyle = () => {
    if (showOriginal) return {};
    const sat = grade.saturation / 100;
    const con = grade.contrast / 100;
    const tempDeg = (grade.temperature / 100) * 15; // sepia or hue
    const bright = 1 + (grade.gamma.r + grade.gamma.g + grade.gamma.b) / 300;

    return {
      filter: `saturate(${sat}) contrast(${con}) brightness(${bright}) hue-rotate(${tempDeg}deg)`,
      transition: 'filter 0.2s ease-out'
    };
  };

  const getTintOverlay = () => {
    if (showOriginal) return 'transparent';
    const r = Math.max(0, grade.gain.r + grade.lift.r + grade.temperature);
    const b = Math.max(0, grade.gain.b + grade.lift.b - grade.temperature);
    const g = Math.max(0, grade.gain.g - grade.tint);

    if (grade.saturation === 0) return 'rgba(0,0,0,0.1)';
    return `rgba(${r * 3}, ${g * 3}, ${b * 3}, 0.12)`;
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-500 font-mono-cinema">Post-Production Lab · Module 06</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100 mt-1">Cinematic Color Grading & Palette Studio</h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Simulate DaVinci Resolve 3-way color wheels, test legendary 35mm film stocks, inspect live RGB waveforms, and explore psychological color harmonies.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg shrink-0">
          <button
            onClick={() => setActiveTab('grading')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'grading' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 inline mr-1.5" />
            Color Wheels & Grading
          </button>
          <button
            onClick={() => setActiveTab('psychology')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'psychology' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5 inline mr-1.5" />
            Color Psychology
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'theory' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 inline mr-1.5" />
            Log vs Rec.709 Theory
          </button>
        </div>
      </div>

      {activeTab === 'grading' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Display & Scopes (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Viewport Frame */}
            <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-black aspect-16/9 shadow-2xl">
              {/* Film Grain Simulation Overlay */}
              {grade.filmGrain > 0 && !showOriginal && (
                <div
                  className="absolute inset-0 pointer-events-none z-20 film-grain"
                  style={{ opacity: grade.filmGrain / 100 }}
                />
              )}

              {/* Tint overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10 mix-blend-color"
                style={{ backgroundColor: getTintOverlay() }}
              />

              {/* Image Canvas / Stills */}
              <img
                src="/src/assets/images/cinematography_lighting_studio_1794210230438.jpg"
                alt="Cinematic Grading Test Frame"
                className="w-full h-full object-cover"
                style={getFilterStyle()}
              />

              {/* Top Viewport HUD */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30 pointer-events-none">
                <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono-cinema text-amber-400 border border-zinc-700/50">
                  {showOriginal ? 'REC.709 RAW (FLAT)' : `GRADE: ${grade.selectedStock.toUpperCase()}`}
                </div>
                <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono-cinema text-zinc-300 border border-zinc-700/50">
                  SAT {grade.saturation}% · CONT {grade.contrast}% · GRAIN {grade.filmGrain}%
                </div>
              </div>

              {/* Bottom Quick Affordances */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-30">
                <button
                  onMouseDown={() => setShowOriginal(true)}
                  onMouseUp={() => setShowOriginal(false)}
                  onTouchStart={() => setShowOriginal(true)}
                  onTouchEnd={() => setShowOriginal(false)}
                  className="px-3 py-1.5 rounded-md bg-black/80 hover:bg-black text-xs font-medium text-zinc-200 border border-zinc-700 backdrop-blur-md transition-all shadow-lg active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                  Hold to Bypass (Original)
                </button>

                <button
                  onClick={() => setGrade(DEFAULT_GRADE)}
                  className="px-3 py-1.5 rounded-md bg-zinc-900/90 hover:bg-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-800 backdrop-blur-md transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                  Reset Wheels
                </button>
              </div>
            </div>

            {/* Simulated Live Scopes (RGB Parade Waveform) */}
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono-cinema text-zinc-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  RGB PARADE WAVEFORM MONITOR (IRE 0 - 100)
                </span>
                <span className="text-zinc-500 font-mono-cinema">CHROMA DYNAMICS</span>
              </div>
              <div className="w-full h-24 rounded bg-black overflow-hidden border border-zinc-800/80">
                <canvas ref={canvasRef} width={600} height={96} className="w-full h-full block" />
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Notice how Lift pushes the base of each column (shadow density), Gain stretches the peaks toward 100 IRE (highlight headroom), and Temperature shifts the relative height of Red vs Blue channels.
              </p>
            </div>

            {/* Masterclass Film Stock Emulation Presets */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Auteur Film Stock Emulations</span>
                <span className="text-xs text-zinc-400">Click to apply grade</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {PRESET_STOCKS.map((stock) => {
                  const isActive = grade.selectedStock === stock.id;
                  return (
                    <button
                      key={stock.id}
                      onClick={() => setGrade(stock.settings)}
                      className={`text-left p-3 rounded-lg border transition-all ${
                        isActive
                          ? 'border-amber-500/80 bg-amber-500/10 text-white'
                          : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold truncate">{stock.name}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </div>
                      <span className="text-xs text-zinc-400 block mt-0.5">{stock.era}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grading Controls Surface (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">Primary Color Correction Deck</span>
              <span className="text-xs font-mono-cinema text-amber-400">REC.709 MASTER</span>
            </div>

            {/* 3-Way Color Wheels Simulation */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">3-Way Color Balance (Lift · Gamma · Gain)</h4>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                {/* LIFT (Shadows) */}
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                  <span className="text-xs font-semibold text-zinc-300 block">LIFT (Shadows)</span>
                  <div className="w-16 h-16 mx-auto rounded-full border border-zinc-700 flex items-center justify-center relative bg-radial from-zinc-800 to-zinc-950">
                    <div
                      className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md transition-transform"
                      style={{ transform: `translate(${grade.lift.r * 0.4}px, ${-grade.lift.b * 0.4}px)` }}
                    />
                  </div>
                  <div className="flex justify-center gap-1 text-[11px] font-mono-cinema text-zinc-400">
                    <span className="text-red-400">{grade.lift.r > 0 ? `+${grade.lift.r}` : grade.lift.r}</span>
                    <span className="text-blue-400">{grade.lift.b > 0 ? `+${grade.lift.b}` : grade.lift.b}</span>
                  </div>
                </div>

                {/* GAMMA (Midtones / Skin) */}
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                  <span className="text-xs font-semibold text-zinc-300 block">GAMMA (Mids)</span>
                  <div className="w-16 h-16 mx-auto rounded-full border border-zinc-700 flex items-center justify-center relative bg-radial from-zinc-800 to-zinc-950">
                    <div
                      className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md transition-transform"
                      style={{ transform: `translate(${grade.gamma.r * 0.4}px, ${-grade.gamma.b * 0.4}px)` }}
                    />
                  </div>
                  <div className="flex justify-center gap-1 text-[11px] font-mono-cinema text-zinc-400">
                    <span className="text-red-400">{grade.gamma.r > 0 ? `+${grade.gamma.r}` : grade.gamma.r}</span>
                    <span className="text-blue-400">{grade.gamma.b > 0 ? `+${grade.gamma.b}` : grade.gamma.b}</span>
                  </div>
                </div>

                {/* GAIN (Highlights) */}
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                  <span className="text-xs font-semibold text-zinc-300 block">GAIN (Highs)</span>
                  <div className="w-16 h-16 mx-auto rounded-full border border-zinc-700 flex items-center justify-center relative bg-radial from-zinc-800 to-zinc-950">
                    <div
                      className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md transition-transform"
                      style={{ transform: `translate(${grade.gain.r * 0.4}px, ${-grade.gain.b * 0.4}px)` }}
                    />
                  </div>
                  <div className="flex justify-center gap-1 text-[11px] font-mono-cinema text-zinc-400">
                    <span className="text-red-400">{grade.gain.r > 0 ? `+${grade.gain.r}` : grade.gain.r}</span>
                    <span className="text-blue-400">{grade.gain.b > 0 ? `+${grade.gain.b}` : grade.gain.b}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sliders for Primary Adjustments */}
            <div className="space-y-4 pt-2">
              {/* Temperature */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-300">Color Temperature (Cool ↔ Warm)</span>
                  <span className="font-mono-cinema text-amber-400">{grade.temperature > 0 ? `+${grade.temperature}` : grade.temperature} K</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={grade.temperature}
                  onChange={(e) => setGrade({ ...grade, temperature: Number(e.target.value), selectedStock: 'custom' })}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              {/* Tint */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-300">Tint (Green ↔ Magenta)</span>
                  <span className="font-mono-cinema text-amber-400">{grade.tint > 0 ? `+${grade.tint}` : grade.tint}</span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  value={grade.tint}
                  onChange={(e) => setGrade({ ...grade, tint: Number(e.target.value), selectedStock: 'custom' })}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              {/* Saturation */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-300">Saturation (Vibrancy)</span>
                  <span className="font-mono-cinema text-amber-400">{grade.saturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={grade.saturation}
                  onChange={(e) => setGrade({ ...grade, saturation: Number(e.target.value), selectedStock: 'custom' })}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              {/* Contrast */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-300">Contrast (Dynamic S-Curve)</span>
                  <span className="font-mono-cinema text-amber-400">{grade.contrast}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="160"
                  value={grade.contrast}
                  onChange={(e) => setGrade({ ...grade, contrast: Number(e.target.value), selectedStock: 'custom' })}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              {/* Film Grain */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-300">Organic 35mm Film Grain</span>
                  <span className="font-mono-cinema text-amber-400">{grade.filmGrain}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={grade.filmGrain}
                  onChange={(e) => setGrade({ ...grade, filmGrain: Number(e.target.value), selectedStock: 'custom' })}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>
            </div>

            {/* Takeaway Insight */}
            <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80 text-xs text-zinc-400 leading-relaxed">
              <span className="text-amber-400 font-semibold block mb-1">Colorist Secret:</span>
              Always correct exposure and white balance first in Node 1 (Primary Base) before applying creative stylized looks or film emulation in Node 2. Never crush blacks past 0 IRE or clip skin highlights past 85 IRE.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'psychology' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOR_PSYCHOLOGY.map((item) => (
              <div key={item.name} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md shadow-md shrink-0 border border-white/20" style={{ backgroundColor: item.hex }} />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-100">{item.name}</h4>
                    <span className="text-xs font-mono-cinema text-zinc-400">{item.hex}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="text-zinc-400 font-medium block">Emotional Subtext:</span>
                  <p className="text-zinc-300 leading-relaxed">{item.emotion}</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-zinc-800 text-xs">
                  <span className="text-amber-400/90 font-medium block">Key Cinema Examples:</span>
                  <p className="text-zinc-400 italic">{item.cinema}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-3">
            <h3 className="text-base font-bold text-zinc-100">The 60-30-10 Production Rule for Film Color Schemes</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              A cinematic frame must never turn into a rainbow. Strict visual discipline requires:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                <span className="text-xl font-bold font-mono-cinema text-amber-400">60%</span>
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mt-1">Dominant Canvas</h5>
                <p className="text-xs text-zinc-400 mt-1">The ambient environment (walls, shadows, atmospheric haze, pavement).</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                <span className="text-xl font-bold font-mono-cinema text-amber-400">30%</span>
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mt-1">Secondary Character Tone</h5>
                <p className="text-xs text-zinc-400 mt-1">Costumes, prominent vehicle, key practical lamp, skin tone field.</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                <span className="text-xl font-bold font-mono-cinema text-amber-400">10%</span>
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mt-1">Narrative Accent Needle</h5>
                <p className="text-xs text-zinc-400 mt-1">The red coat in Schindler's List, the green ring, the poisoned wine glass.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'theory' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-lg font-bold text-zinc-100">Logarithmic (LOG) vs. Linear (Rec.709) Profiles</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Why does camera raw footage look grey and flat out of an ARRI Alexa or Sony FX3?
            </p>
            <ul className="space-y-3 text-xs text-zinc-400 leading-relaxed list-disc list-inside">
              <li><strong className="text-zinc-200">Log Curves:</strong> Mathematically redistribute sensor stops so that extreme bright clouds and dark shadows both fit inside the 10-bit or 12-bit digital container without clipping.</li>
              <li><strong className="text-zinc-200">Rec.709 Display:</strong> The standard color space of modern televisions and consumer displays. It has only ~6 stops of dynamic range, whereas modern sensors capture 14 to 17 stops.</li>
              <li><strong className="text-zinc-200">LUTs (Look-Up Tables):</strong> Mathematical transforms that remap the Log flat values into a standardized display grade. Never use a 3D LUT as a substitute for proper exposure.</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-lg font-bold text-zinc-100">The Skin Tone Vector Rule</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              On every vectorscope in professional post suites, there is a dedicated diagonal line situated between Yellow and Red (approx 10:30 on a clock face).
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Blood under human skin is identical across all ethnicities. Melanin only affects luminance (brightness), not hue angle. A seasoned colorist isolates skin with a qualifier mask and ensures the hue falls exactly on this line before applying stylistic cross-process looks to shadows.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
