import React, { useState } from 'react';
import { Camera, Maximize2, Grid, Compass, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

interface AspectRatioDef {
  id: string;
  name: string;
  ratio: string;
  widthRatio: number;
  heightRatio: number;
  films: string;
  aesthetic: string;
}

const ASPECT_RATIOS: AspectRatioDef[] = [
  {
    id: 'cinemascope',
    name: '2.39:1 Cinemascope (Anamorphic)',
    ratio: '2.39:1',
    widthRatio: 2.39,
    heightRatio: 1,
    films: 'Blade Runner, Interstellar, Lawrence of Arabia',
    aesthetic: 'Epic horizontal panoramic expanse, shallow depth of field, horizontal lens flares.'
  },
  {
    id: 'theatrical-flat',
    name: '1.85:1 DCI Flat (Theatrical)',
    ratio: '1.85:1',
    widthRatio: 1.85,
    heightRatio: 1,
    films: 'Jurassic Park, Parasite, No Country for Old Men',
    aesthetic: 'Versatile vertical headroom balancing intimate character dialogue and environmental height.'
  },
  {
    id: 'standard-widescreen',
    name: '16:9 / 1.78:1 (Streaming & TV)',
    ratio: '16:9',
    widthRatio: 1.777,
    heightRatio: 1,
    films: 'Modern Television, HBO Dramas, Streaming Originals',
    aesthetic: 'Standard digital sensor aspect ratio filling 4K monitors with zero letterboxing.'
  },
  {
    id: 'academy-ratio',
    name: '4:3 / 1.33:1 Academy Ratio',
    ratio: '4:3',
    widthRatio: 1.333,
    heightRatio: 1,
    films: 'The Lighthouse, Citizen Kane, First Cow, Cold War',
    aesthetic: 'Claustrophobic, intimate vertical portraiture. Emphasizes towering architecture and trapped psyche.'
  },
  {
    id: 'vertical-reel',
    name: '9:16 Social Vertical',
    ratio: '9:16',
    widthRatio: 0.5625,
    heightRatio: 1,
    films: 'Mobile First Cinema, Reels, TikTok Storytelling',
    aesthetic: 'Strict single-subject vertical focus. High vertical gaze with minimal lateral peripheral vision.'
  }
];

const FOCAL_LENGTHS = [
  { mm: 18, name: '18mm Ultra-Wide', fov: '100° FOV', character: 'Exaggerated perspective, deep field of focus, background appears distant and expansive.', bokeh: 'Deep / sharp background' },
  { mm: 35, name: '35mm Narrative Standard', fov: '63° FOV', character: 'The classic documentary & indie lens. Natural context with slight environmental presence.', bokeh: 'Moderate separation' },
  { mm: 50, name: '50mm Normal ("Human Eye")', fov: '47° FOV', character: 'Matches natural human spatial perception. Zero geometric distortion; honest and unadorned.', bokeh: 'Soft natural rolloff' },
  { mm: 85, name: '85mm Portrait Telephoto', fov: '28° FOV', character: 'Flattering facial compression, creamy bokeh, isolates character from distracting backgrounds.', bokeh: 'Creamy blurred background' },
  { mm: 135, name: '135mm Extreme Telephoto', fov: '18° FOV', character: 'Intense background compression; subjects appear flattened against distant cityscapes or crowds.', bokeh: 'Total background abstraction' }
];

const SHOT_SIZES = [
  { id: 'ELS', name: 'Extreme Long Shot (ELS)', scale: 0.6, yOffset: 0, desc: 'Subject is tiny within a vast landscape. Conveys isolation, loneliness, or colossal scale.' },
  { id: 'WS', name: 'Wide Shot (WS)', scale: 0.85, yOffset: 0, desc: 'Subject full body visible from head to toe. Establishes character within immediate spatial geometry.' },
  { id: 'MS', name: 'Medium Shot (MS)', scale: 1.25, yOffset: -15, desc: 'Waist-up. The workhorse of cinematic dialogue, showing body language and gestures.' },
  { id: 'MCU', name: 'Medium Close-Up (MCU)', scale: 1.6, yOffset: -30, desc: 'Chest to top of head. Escalates emotional intimacy without losing shoulder posture.' },
  { id: 'CU', name: 'Close-Up (CU)', scale: 2.1, yOffset: -45, desc: 'Head and neck. Captures nuanced micro-expressions, blinks, and silent inner calculations.' },
  { id: 'ECU', name: 'Extreme Close-Up (ECU)', scale: 3.2, yOffset: -70, desc: 'Only eyes or mouth. Hyper-focused sensory shock or psychological breakdown.' }
];

export const ShotFramingLab: React.FC = () => {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioDef>(ASPECT_RATIOS[0]);
  const [selectedFocal, setSelectedFocal] = useState(FOCAL_LENGTHS[1]); // 35mm
  const [selectedShotSize, setSelectedShotSize] = useState(SHOT_SIZES[2]); // MS
  const [gridOverlay, setGridOverlay] = useState<'none' | 'thirds' | 'cross' | 'spiral' | 'axis'>('thirds');
  const [aspectMask, setAspectMask] = useState(true);

  // Dynamic zoom calculation combining shot size scale and focal length compression
  const effectiveZoom = selectedShotSize.scale * (selectedFocal.mm / 40);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-500 font-mono-cinema">Cinematography Lab · Module 04</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100 mt-1">Shot Framing & Optical Lens Simulator</h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Experiment with cinematic aspect ratios (from 2.39:1 Cinemascope to 4:3 Academy), prime lens focal compression (18mm to 135mm), and spatial composition grids.
          </p>
        </div>

        {/* Mask toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAspectMask(!aspectMask)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              aspectMask
                ? 'bg-amber-500/10 border-amber-500/80 text-amber-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 inline mr-1.5" />
            {aspectMask ? 'Matte Letterbox: ACTIVE' : 'Matte Letterbox: OFF'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Viewfinder Stage (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 aspect-16/9 shadow-2xl flex items-center justify-center">
            {/* Aspect Ratio Matted Window */}
            <div
              className="relative overflow-hidden transition-all duration-300 ease-out bg-black flex items-center justify-center border border-zinc-700/60 shadow-inner"
              style={{
                width: aspectMask
                  ? selectedRatio.widthRatio >= 1.777
                    ? '100%'
                    : `${Math.min(100, (selectedRatio.widthRatio / 1.777) * 100)}%`
                  : '100%',
                height: aspectMask
                  ? selectedRatio.widthRatio >= 1.777
                    ? `${(1.777 / selectedRatio.widthRatio) * 100}%`
                    : '100%'
                  : '100%',
                maxHeight: '100%',
                maxWidth: '100%'
              }}
            >
              {/* Scaled Scene Actor & Set Image */}
              <div
                className="w-full h-full relative transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${effectiveZoom}) translateY(${selectedShotSize.yOffset}px)`,
                  filter: selectedFocal.mm >= 85 ? 'blur(0.2px)' : 'none'
                }}
              >
                <img
                  src="/src/assets/images/hero_cinematic_camera_1794210229970.jpg"
                  alt="Framing Subject"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>

              {/* Composition Overlays */}
              {gridOverlay === 'thirds' && (
                <div className="absolute inset-0 pointer-events-none z-20 grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-amber-400/40"></div>
                  <div className="border-r border-b border-amber-400/40"></div>
                  <div className="border-b border-amber-400/40"></div>
                  <div className="border-r border-b border-amber-400/40"></div>
                  <div className="border-r border-b border-amber-400/40"></div>
                  <div className="border-b border-amber-400/40"></div>
                  <div className="border-r border-amber-400/40"></div>
                  <div className="border-r border-amber-400/40"></div>
                  <div></div>
                </div>
              )}

              {gridOverlay === 'cross' && (
                <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                  <div className="w-full h-px bg-cyan-400/40 absolute"></div>
                  <div className="h-full w-px bg-cyan-400/40 absolute"></div>
                  <div className="w-12 h-12 rounded-full border border-cyan-400/60"></div>
                </div>
              )}

              {gridOverlay === 'spiral' && (
                <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                  <svg className="w-full h-full text-amber-400/50" viewBox="0 0 100 100" fill="none">
                    <path
                      d="M10,90 A80,80 0 0,1 90,10 A50,50 0 0,1 40,60 A30,30 0 0,1 70,70"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                  </svg>
                </div>
              )}

              {gridOverlay === 'axis' && (
                <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4">
                  <div className="h-0.5 w-full bg-red-500/80 dashed my-auto shadow-sm"></div>
                  <div className="text-[10px] font-mono-cinema text-red-400 bg-black/80 px-2 py-0.5 rounded self-center">
                    180° AXIS OF ACTION (DO NOT CROSS CAMERA OVER THIS LINE)
                  </div>
                </div>
              )}

              {/* Viewfinder Reticle Corners */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/60 pointer-events-none"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/60 pointer-events-none"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/60 pointer-events-none"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/60 pointer-events-none"></div>

              {/* Viewfinder Live HUD Telemetry */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono-cinema text-white/90 pointer-events-none z-30 drop-shadow">
                <span>FPS: 24.00 · SHTR: 180.0°</span>
                <span className="text-amber-400">{selectedRatio.ratio}</span>
                <span>ISO 800 · T2.0</span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono-cinema text-white/90 pointer-events-none z-30 drop-shadow">
                <span>LENS: {selectedFocal.name}</span>
                <span className="text-zinc-300">{selectedShotSize.id} ({selectedShotSize.name})</span>
              </div>
            </div>
          </div>

          {/* Grid Selection Buttons */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800">
            <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-amber-500" />
              Composition Overlay Guides:
            </span>
            <div className="flex gap-1">
              {(['none', 'thirds', 'cross', 'spiral', 'axis'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setGridOverlay(mode)}
                  className={`px-2.5 py-1 text-xs capitalize rounded-md transition-colors ${
                    gridOverlay === mode
                      ? 'bg-zinc-800 text-amber-400 font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {mode === 'none' ? 'Off' : mode === 'thirds' ? 'Rule of 3rds' : mode === 'cross' ? 'Crosshair' : mode === 'spiral' ? 'Golden Spiral' : '180° Axis'}
                </button>
              ))}
            </div>
          </div>

          {/* Optical Analysis Details */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200">Current Framing & Optical Characteristics:</span>
              <span className="font-mono-cinema text-amber-400">{selectedFocal.fov}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong className="text-zinc-300">{selectedShotSize.name}:</strong> {selectedShotSize.desc}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong className="text-zinc-300">{selectedFocal.name}:</strong> {selectedFocal.character} Bokeh profile: <span className="text-amber-400/90">{selectedFocal.bokeh}</span>.
            </p>
          </div>
        </div>

        {/* Viewfinder Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Shot Size Selector */}
          <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">1. Select Shot Size (Proximity)</span>
              <span className="text-xs font-mono-cinema text-amber-400">{selectedShotSize.id}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SHOT_SIZES.map((sz) => {
                const isActive = selectedShotSize.id === sz.id;
                return (
                  <button
                    key={sz.id}
                    onClick={() => setSelectedShotSize(sz)}
                    className={`p-2 rounded-lg border text-xs text-left transition-all ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/10 text-white font-semibold'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <span className="block font-bold">{sz.id}</span>
                    <span className="text-[10px] text-zinc-400 truncate block mt-0.5">{sz.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focal Length Selector */}
          <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">2. Prime Cinema Lens (Focal Length)</span>
              <span className="text-xs font-mono-cinema text-amber-400">{selectedFocal.mm}mm T2.0</span>
            </div>
            <div className="space-y-1.5">
              {FOCAL_LENGTHS.map((focal) => {
                const isActive = selectedFocal.mm === focal.mm;
                return (
                  <button
                    key={focal.mm}
                    onClick={() => setSelectedFocal(focal)}
                    className={`w-full p-2.5 rounded-lg border text-xs text-left flex items-center justify-between transition-all ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/10 text-white font-semibold'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <div>
                      <span className="font-bold">{focal.name}</span>
                      <span className="text-zinc-400 text-[11px] block">{focal.fov}</span>
                    </div>
                    <span className="text-[11px] font-mono-cinema text-zinc-400">{focal.bokeh}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">3. Cinematic Aspect Ratio</span>
              <span className="text-xs font-mono-cinema text-amber-400">{selectedRatio.ratio}</span>
            </div>
            <div className="space-y-2">
              {ASPECT_RATIOS.map((ratio) => {
                const isActive = selectedRatio.id === ratio.id;
                return (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio)}
                    className={`w-full p-2.5 rounded-lg border text-xs text-left transition-all ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{ratio.name}</span>
                      <span className="font-mono-cinema text-[11px] text-amber-400">{ratio.ratio}</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">Films: {ratio.films}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
