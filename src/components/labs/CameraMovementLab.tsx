import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Video, Compass, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface MovementType {
  id: string;
  name: string;
  rig: string;
  emotionalMotivation: string;
  classicExample: string;
  mechanicalAction: string;
  floorTrack: 'static' | 'pan' | 'tilt' | 'dolly-in' | 'dolly-out' | 'truck' | 'crane' | 'whip' | 'zolly';
}

const MOVEMENTS: MovementType[] = [
  {
    id: 'dolly-in',
    name: 'Dolly In (Push-In)',
    rig: 'Dolly on Dana Dolly Track / Fisher 11',
    emotionalMotivation: 'Intimacy, realization, an internal decision being made. The character reaches an epiphany.',
    classicExample: 'The Godfather (Michael Corleone in hospital), Vertigo, Goodfellas',
    mechanicalAction: 'Camera physically moves closer to the subject on wheeled track.',
    floorTrack: 'dolly-in'
  },
  {
    id: 'dolly-out',
    name: 'Dolly Out (Pull-Out)',
    rig: 'Dolly Track / Steadicam',
    emotionalMotivation: 'Isolation, abandonment, helplessness. Pulling away shows the character trapped or left behind.',
    classicExample: 'Taxi Driver (Travis Bickle payphone call), Citizen Kane',
    mechanicalAction: 'Camera physically retreats away from the subject, expanding the environment.',
    floorTrack: 'dolly-out'
  },
  {
    id: 'truck',
    name: 'Truck / Tracking Shot',
    rig: 'Steadicam / Long Dolly Rail',
    emotionalMotivation: 'Kinetic momentum, walking and talking, walking alongside characters into their world.',
    classicExample: 'Paths of Glory (Trench run), 1917, Goodfellas (Copacabana entrance)',
    mechanicalAction: 'Camera moves laterally, parallel to the subject as they walk.',
    floorTrack: 'truck'
  },
  {
    id: 'pan',
    name: 'Pan (Horizontal Swivel)',
    rig: 'O\'Connor Fluid Head Tripod',
    emotionalMotivation: 'Connecting cause to effect, revealing a surprise spectator, or following an eyeline glance.',
    classicExample: 'Seven Samurai, Rear Window, Wes Anderson whip pans',
    mechanicalAction: 'Tripod head pivots horizontally left or right from a fixed point.',
    floorTrack: 'pan'
  },
  {
    id: 'tilt',
    name: 'Tilt (Vertical Pivot)',
    rig: 'Fluid Head Tripod / Jib',
    emotionalMotivation: 'Revealing power (tilting up at a towering villain or skyscraper) or defeat (tilting down to shoes).',
    classicExample: 'Star Wars: A New Hope (Star Destroyer intro), Citizen Kane',
    mechanicalAction: 'Camera pivots vertically up or down from a stationary position.',
    floorTrack: 'tilt'
  },
  {
    id: 'crane',
    name: 'Crane / Jib Shot',
    rig: 'Technocrane / 24ft Jib Arm',
    emotionalMotivation: 'Transcendence, omniscience, moving from an intimate human detail to the broad universe.',
    classicExample: 'Touch of Evil (opening 3-minute crane shot), High Noon, Gone with the Wind',
    mechanicalAction: 'Camera sweeps vertically and horizontally on a counter-weighted mechanical crane arm.',
    floorTrack: 'crane'
  },
  {
    id: 'whip',
    name: 'Whip Pan (Swish Pan)',
    rig: 'Fluid Head / Handheld quick snap',
    emotionalMotivation: 'High-energy comedic beats, sudden temporal jumps, kinetic transitions without cutting.',
    classicExample: 'Whiplash, Boogie Nights, Edgar Wright films (Hot Fuzz)',
    mechanicalAction: 'Camera snaps sideways so rapidly that motion blur turns the frame into a dynamic cut point.',
    floorTrack: 'whip'
  },
  {
    id: 'zolly',
    name: 'The Vertigo "Dolly Zoom" (Zolly)',
    rig: 'Dolly Track + Electronic Follow Focus Zoom',
    emotionalMotivation: 'Sudden existential vertigo, shocking revelation, world crumbling beneath character\'s feet.',
    classicExample: 'Vertigo (1958), Jaws (beach attack), Goodfellas (diner scene)',
    mechanicalAction: 'Physical camera dollies backward while the optical lens zooms in simultaneously.',
    floorTrack: 'zolly'
  }
];

export const CameraMovementLab: React.FC = () => {
  const [selectedMovement, setSelectedMovement] = useState<MovementType>(MOVEMENTS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zollyPosition, setZollyPosition] = useState(50); // 0 (wide near) to 100 (tele far)
  const [animationTick, setAnimationTick] = useState(0);

  // Animation cycle loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAnimationTick((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Compute dynamic transform styles for Viewport and Floor Plan
  const getCameraViewportStyle = () => {
    const progress = (animationTick % 100) / 100;
    const oscillation = Math.sin(progress * Math.PI * 2);

    switch (selectedMovement.floorTrack) {
      case 'dolly-in': {
        const scale = 1 + progress * 0.45;
        return { transform: `scale(${scale})` };
      }
      case 'dolly-out': {
        const scale = 1.45 - progress * 0.45;
        return { transform: `scale(${scale})` };
      }
      case 'truck': {
        const xOffset = oscillation * 35;
        return { transform: `translateX(${xOffset}px)` };
      }
      case 'pan': {
        const xOffset = oscillation * 40;
        return { transform: `translateX(${xOffset}px) scale(1.05)` };
      }
      case 'tilt': {
        const yOffset = oscillation * 30;
        return { transform: `translateY(${yOffset}px) scale(1.05)` };
      }
      case 'crane': {
        const yOffset = oscillation * 45;
        const scale = 1 + (1 - progress) * 0.25;
        return { transform: `translateY(${yOffset}px) scale(${scale})` };
      }
      case 'whip': {
        const snap = Math.sin(progress * Math.PI * 4);
        const blur = Math.abs(snap) > 0.7 ? 12 : 0;
        return {
          transform: `translateX(${snap * 80}px)`,
          filter: `blur(${blur}px)`
        };
      }
      case 'zolly': {
        // Dynamic counter zoom & distance based on zollyPosition
        const normalized = zollyPosition / 100; // 0 to 1
        const zoom = 1 + (1 - normalized) * 0.6; // subject stays similar
        const bgDistortion = 1 + normalized * 0.8;
        return {
          transform: `scale(${zoom})`,
          filter: `contrast(${100 + normalized * 20}%)`
        };
      }
      default:
        return {};
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-500 font-mono-cinema">Cinematography Lab · Module 05</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100 mt-1">Camera Movements & Motivated Motion Visualizer</h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Visualize the mechanical and emotional physics of camera motion. Compare the Director's Viewport against the Top-Down Soundstage Floor Plan in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            {isPlaying ? 'Pause Motion' : 'Play Motion'}
          </button>
          <button
            onClick={() => setAnimationTick(0)}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Reset position"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Stage Viewports (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Dual Stage (Top: Director Viewport, Bottom: Top-Down Floor Plan) */}
          <div className="space-y-4">
            {/* Viewport 1: The Director's Screen */}
            <div className="relative rounded-xl overflow-hidden bg-black border border-zinc-800 aspect-16/9 shadow-2xl">
              <div
                className="w-full h-full relative transition-transform duration-75 ease-linear overflow-hidden"
                style={getCameraViewportStyle()}
              >
                <img
                  src="/src/assets/images/directing_actor_blocking_1794210231177.jpg"
                  alt="Director Framing"
                  className="w-full h-full object-cover select-none"
                />
              </div>

              {/* Viewport Overlay HUD */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-cinema text-white/90 pointer-events-none drop-shadow">
                <span className="bg-black/60 px-2 py-0.5 rounded border border-zinc-700/60 text-amber-400">
                  RIG: {selectedMovement.name.toUpperCase()}
                </span>
                <span className="bg-black/60 px-2 py-0.5 rounded border border-zinc-700/60 text-zinc-300">
                  TRACK: {Math.round((animationTick % 100))}%
                </span>
              </div>

              <div className="absolute bottom-3 left-3 bg-black/70 px-2.5 py-1 rounded text-xs text-zinc-300 pointer-events-none border border-zinc-800">
                <Eye className="w-3 h-3 inline mr-1.5 text-cyan-400" />
                Director's Camera Viewport
              </div>
            </div>

            {/* Viewport 2: Top-Down Floor Plan Diagram */}
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-500" />
                  Soundstage Floor Plan (Bird's Eye Technical Rig)
                </span>
                <span className="text-[11px] font-mono-cinema text-zinc-400">STAGE A</span>
              </div>

              {/* SVG 2D Floor Plan Canvas */}
              <div className="h-32 w-full bg-zinc-950 rounded-lg border border-zinc-800/80 relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 120">
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="400" y2="30" stroke="#27272a" strokeWidth="0.5" />
                  <line x1="0" y1="60" x2="400" y2="60" stroke="#27272a" strokeWidth="0.5" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="#27272a" strokeWidth="0.5" />
                  <line x1="100" y1="0" x2="100" y2="120" stroke="#27272a" strokeWidth="0.5" />
                  <line x1="200" y1="0" x2="200" y2="120" stroke="#27272a" strokeWidth="0.5" />
                  <line x1="300" y1="0" x2="300" y2="120" stroke="#27272a" strokeWidth="0.5" />

                  {/* Actor / Subject Node */}
                  <circle cx="200" cy="35" r="9" fill="#f59e0b" />
                  <text x="200" y="20" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="bold">ACTOR (TARGET)</text>

                  {/* Camera Rig Node & Animated Vector */}
                  {selectedMovement.floorTrack === 'dolly-in' && (
                    <g transform={`translate(200, ${100 - (animationTick % 100) * 0.45})`}>
                      <line x1="0" y1="0" x2="0" y2="-20" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                      <polygon points="0,-25 -4,-18 4,-18" fill="#38bdf8" />
                      <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#38bdf8" />
                      <circle cx="0" cy="0" r="3" fill="#09090b" />
                      <text x="0" y="20" fill="#94a3b8" fontSize="8" textAnchor="middle">DOLLY RIG</text>
                    </g>
                  )}

                  {selectedMovement.floorTrack === 'dolly-out' && (
                    <g transform={`translate(200, ${60 + (animationTick % 100) * 0.45})`}>
                      <line x1="0" y1="0" x2="0" y2="20" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                      <polygon points="0,25 -4,18 4,18" fill="#38bdf8" />
                      <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#38bdf8" />
                      <circle cx="0" cy="0" r="3" fill="#09090b" />
                      <text x="0" y="20" fill="#94a3b8" fontSize="8" textAnchor="middle">DOLLY RIG</text>
                    </g>
                  )}

                  {selectedMovement.floorTrack === 'truck' && (
                    <g transform={`translate(${140 + Math.sin((animationTick % 100) / 100 * Math.PI * 2) * 45}, 85)`}>
                      <line x1="-30" y1="0" x2="30" y2="0" stroke="#4ade80" strokeWidth="1" strokeDasharray="2 2" />
                      <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#4ade80" />
                      <circle cx="0" cy="0" r="3" fill="#09090b" />
                      <text x="0" y="20" fill="#94a3b8" fontSize="8" textAnchor="middle">TRUCK TRACK</text>
                    </g>
                  )}

                  {(selectedMovement.floorTrack === 'pan' || selectedMovement.floorTrack === 'whip') && (
                    <g transform="translate(200, 85)">
                      <circle cx="0" cy="0" r="14" fill="#6366f1" />
                      {/* Swiveling head */}
                      <line
                        x1="0"
                        y1="0"
                        x2={Math.sin((animationTick % 100) / 100 * Math.PI * 2) * 25}
                        y2="-25"
                        stroke="#a855f7"
                        strokeWidth="2.5"
                      />
                      <text x="0" y="20" fill="#94a3b8" fontSize="8" textAnchor="middle">PAN HEAD</text>
                    </g>
                  )}

                  {selectedMovement.floorTrack === 'zolly' && (
                    <g transform={`translate(200, ${60 + (zollyPosition / 100) * 40})`}>
                      <line x1="0" y1="-10" x2="0" y2="10" stroke="#f43f5e" strokeWidth="2" />
                      <rect x="-12" y="-9" width="24" height="18" rx="3" fill="#f43f5e" />
                      <text x="0" y="-14" fill="#f43f5e" fontSize="8" textAnchor="middle" fontWeight="bold">
                        ZOOM LENS ({Math.round(24 + (zollyPosition / 100) * 60)}mm)
                      </text>
                    </g>
                  )}

                  {selectedMovement.floorTrack === 'crane' && (
                    <g transform="translate(200, 85)">
                      <line x1="-40" y1="15" x2="40" y2="-15" stroke="#eab308" strokeWidth="3" />
                      <circle cx="0" cy="0" r="8" fill="#eab308" />
                      <text x="0" y="22" fill="#94a3b8" fontSize="8" textAnchor="middle">CRANE BOOM</text>
                    </g>
                  )}

                  {selectedMovement.floorTrack === 'tilt' && (
                    <g transform="translate(200, 85)">
                      <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#06b6d4" />
                      <text x="0" y="20" fill="#94a3b8" fontSize="8" textAnchor="middle">TILT HEAD</text>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Special Zolly Slider if selected */}
          {selectedMovement.id === 'zolly' && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Interactive Vertigo Zolly Slider (Dolly Distance ↔ Lens Focal Zoom)
                </span>
                <span className="font-mono-cinema text-amber-300">{zollyPosition}% Compression</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={zollyPosition}
                onChange={(e) => setZollyPosition(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>Wide Angle (Dolly Close)</span>
                <span>Balanced Midpoint</span>
                <span>Telephoto (Dolly Far Away)</span>
              </div>
            </div>
          )}
        </div>

        {/* Movement Selector & Auteur Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-200 block">
              1. Choose Camera Movement Type
            </span>
            <div className="space-y-1.5">
              {MOVEMENTS.map((mov) => {
                const isActive = selectedMovement.id === mov.id;
                return (
                  <button
                    key={mov.id}
                    onClick={() => {
                      setSelectedMovement(mov);
                      setAnimationTick(0);
                    }}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/10 text-white font-semibold'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{mov.name}</span>
                      <span className="text-[10px] font-mono-cinema text-zinc-400">{mov.rig.split('/')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep Narrative Motivation Analysis */}
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="text-sm font-bold text-zinc-100">{selectedMovement.name} Breakdown</h4>
              <span className="text-xs font-mono-cinema text-amber-400">AUTEUR GRAMMAR</span>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-zinc-400 font-semibold block">Psychological & Emotional Purpose:</span>
              <p className="text-zinc-200 leading-relaxed">{selectedMovement.emotionalMotivation}</p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-zinc-400 font-semibold block">Physical Rig & Execution:</span>
              <p className="text-zinc-300 leading-relaxed font-mono-cinema text-[11px]">{selectedMovement.mechanicalAction}</p>
            </div>

            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs space-y-1">
              <span className="text-amber-400 font-semibold block">Legendary Film Example:</span>
              <p className="text-zinc-300 italic">{selectedMovement.classicExample}</p>
            </div>

            <div className="text-xs text-zinc-400 leading-relaxed border-t border-zinc-800 pt-3">
              <strong className="text-zinc-200">The Golden Rule:</strong> Never move the camera just because you have a motorized gimbal. Unmotivated movement makes the audience aware of the film crew. Motivated movement pulls them deeper into the character's soul.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
