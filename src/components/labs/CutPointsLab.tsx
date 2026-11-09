import React, { useState, useEffect } from 'react';
import { Play, Pause, Scissors, Volume2, Film, Layers, CheckCircle, Info } from 'lucide-react';

interface CutType {
  id: string;
  name: string;
  category: 'Continuity' | 'Audio Lead' | 'Stylistic' | 'Montage';
  timelineLayout: 'hard' | 'j-cut' | 'l-cut' | 'match' | 'jump';
  shotADesc: string;
  shotBDesc: string;
  audioBehavior: string;
  psychologicalEffect: string;
  famousExample: string;
}

const CUT_TYPES: CutType[] = [
  {
    id: 'cut-on-action',
    name: 'Cutting on Action',
    category: 'Continuity',
    timelineLayout: 'hard',
    shotADesc: 'Shot A: Detective kicks a locked wooden door, starting forward swing.',
    shotBDesc: 'Shot B: Interior reverse angle as door bursts inward and swings open.',
    audioBehavior: 'Impact sound bridges precisely across the cut point frame.',
    psychologicalEffect: 'The viewer\'s visual cortex focuses on the kinetic velocity of the kick, rendering the physical change of camera setup completely invisible.',
    famousExample: 'The Bourne Ultimatum (Paul Greengrass), John Wick hand-to-hand fight choreography.'
  },
  {
    id: 'j-cut',
    name: 'J-Cut (Audio Lead)',
    category: 'Audio Lead',
    timelineLayout: 'j-cut',
    shotADesc: 'Shot A: Detective sitting alone at desk, looking at old case photograph.',
    shotBDesc: 'Shot B: Busy train station concourse with crowded passengers.',
    audioBehavior: 'Train screech and station announcement enters 2.5 seconds BEFORE video cuts.',
    psychologicalEffect: 'Subconscious curiosity: our ears hear the upcoming world before our eyes see it, preparing the brain and avoiding abrupt cognitive shock.',
    famousExample: 'The Godfather (Baptism sequence organ music leading into executions), Apocalypse Now.'
  },
  {
    id: 'l-cut',
    name: 'L-Cut (Audio Carryover / Reaction)',
    category: 'Audio Lead',
    timelineLayout: 'l-cut',
    shotADesc: 'Shot A: Prosecutor delivers passionate final argument to jury.',
    shotBDesc: 'Shot B: Defendant\'s face in tight close-up as eyes dart with guilt.',
    audioBehavior: 'Prosecutor\'s spoken words continue playing over defendant\'s silent face.',
    psychologicalEffect: 'Human nature: when someone speaks intense words in real life, you immediately watch how the other person reacts rather than staring at the speaker.',
    famousExample: 'The Social Network (Mark Zuckerberg listening to Eduardo), 12 Angry Men.'
  },
  {
    id: 'match-cut',
    name: 'Match Cut (Graphic / Concept Match)',
    category: 'Montage',
    timelineLayout: 'match',
    shotADesc: 'Shot A: Spinning bone weapon hurled into the prehistoric sky.',
    shotBDesc: 'Shot B: Orbital nuclear satellite drifting through black outer space.',
    audioBehavior: 'Swell of orchestral overture bridges millions of years of human evolution.',
    psychologicalEffect: 'Intellectual synthesis: the graphic similarity between two objects instantly connects them thematically across immense spans of time or space.',
    famousExample: '2001: A Space Odyssey (Kubrick), Lawrence of Arabia (match extinguished to desert sun).'
  },
  {
    id: 'jump-cut',
    name: 'Jump Cut (Temporal Rupture)',
    category: 'Stylistic',
    timelineLayout: 'jump',
    shotADesc: 'Shot A: Character smoking a cigarette by window (Frame 1-40).',
    shotBDesc: 'Shot B: Same character at same window, but cigarette is burned to filter (Frame 41+).',
    audioBehavior: 'Auditory clicks or continuous music with visual stutter.',
    psychologicalEffect: 'Deliberately jars continuity to portray impatience, psychological anxiety, or time passing in jagged fragments without slow cross-dissolves.',
    famousExample: 'Breathless (Jean-Luc Godard), The Royal Tenenbaums bathroom breakdown.'
  }
];

export const CutPointsLab: React.FC = () => {
  const [selectedCut, setSelectedCut] = useState<CutType>(CUT_TYPES[0]);
  const [playheadPos, setPlayheadPos] = useState(30); // 0 to 100 on timeline
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play timeline scrub loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlayheadPos((prev) => {
        if (prev >= 98) return 5;
        return prev + 1.2;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Cut boundary is at timeline 50%
  const cutPoint = 50;
  const isVideoShotB = playheadPos >= cutPoint;

  // Audio boundary depends on cut type
  let isAudioShotB = playheadPos >= cutPoint;
  if (selectedCut.timelineLayout === 'j-cut') {
    isAudioShotB = playheadPos >= 35; // audio leads before 50
  } else if (selectedCut.timelineLayout === 'l-cut') {
    isAudioShotB = playheadPos >= 65; // audio lingers after 50
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-500 font-mono-cinema">Editing Lab · Module 07</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100 mt-1">Editing, Cut Points & Montage Lab</h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Inspect the microscopic mechanics of cinematic cuts. Drag the playhead to scrub across Cut on Action, J-Cuts, L-Cuts, and Graphic Match Cuts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            {isPlaying ? 'Pause Timeline' : 'Play Timeline'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline Editor & Video Player (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Preview Monitor */}
          <div className="relative rounded-xl overflow-hidden bg-black border border-zinc-800 aspect-16/9 shadow-2xl">
            <img
              src={isVideoShotB ? '/src/assets/images/hero_cinematic_camera_1794210229970.jpg' : '/src/assets/images/editing_timeline_suite_1794210231541.jpg'}
              alt="Cut Point Preview"
              className="w-full h-full object-cover transition-all duration-75"
            />

            {/* In-Monitor Cut HUD */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono-cinema text-white pointer-events-none drop-shadow">
              <span className={`px-2 py-0.5 rounded border ${isVideoShotB ? 'bg-amber-500/80 border-amber-400 text-black font-bold' : 'bg-zinc-900/90 border-zinc-700 text-zinc-200'}`}>
                VIDEO: {isVideoShotB ? 'SHOT B (INCOMING)' : 'SHOT A (OUTGOING)'}
              </span>
              <span className={`px-2 py-0.5 rounded border ${isAudioShotB ? 'bg-cyan-500/80 border-cyan-400 text-black font-bold' : 'bg-zinc-900/90 border-zinc-700 text-zinc-200'}`}>
                AUDIO: {isAudioShotB ? 'TRACK B' : 'TRACK A'}
              </span>
            </div>

            {/* Audio Wave Indicator Banner */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 bg-black/80 rounded-md border border-zinc-800 backdrop-blur-md text-xs">
              <span className="text-zinc-300 font-mono-cinema flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                {selectedCut.audioBehavior}
              </span>
              <span className="font-mono-cinema text-amber-400">TC: 01:04:12:{Math.floor(playheadPos / 4)}</span>
            </div>
          </div>

          {/* Interactive Multi-Track NLE Timeline */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2">
              <span className="font-bold text-zinc-300 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-amber-500" />
                Multi-Track Timeline Sequence (Scrub to Inspect Cut Point)
              </span>
              <span className="font-mono-cinema text-zinc-400">SNAP: FRAME-ACCURATE</span>
            </div>

            {/* Interactive Timeline Canvas & Scrub Track */}
            <div className="relative pt-4 pb-2">
              {/* Playhead Indicator */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-30 pointer-events-none transition-all duration-75"
                style={{ left: `${playheadPos}%` }}
              >
                <div className="w-3 h-3 bg-amber-400 rounded-sm -ml-1.25 shadow-md flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
              </div>

              {/* VIDEO TRACK (V1) */}
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-8 text-[11px] font-mono-cinema text-zinc-400 font-bold">V1</span>
                  <div className="relative flex-1 h-10 bg-zinc-950 rounded border border-zinc-800 overflow-hidden flex">
                    {/* Shot A Clip */}
                    <div
                      className="h-full bg-zinc-800 border-r border-amber-400/80 px-2 flex items-center justify-between text-[11px] font-medium text-zinc-200 transition-all"
                      style={{ width: '50%' }}
                    >
                      <span className="truncate">Shot A (Outgoing)</span>
                      <Scissors className="w-3 h-3 text-amber-400 shrink-0" />
                    </div>
                    {/* Shot B Clip */}
                    <div
                      className="h-full bg-amber-950/60 border-l border-amber-400/80 px-2 flex items-center justify-between text-[11px] font-medium text-amber-200 transition-all"
                      style={{ width: '50%' }}
                    >
                      <span className="truncate">Shot B (Incoming)</span>
                      <span className="font-mono-cinema text-[10px] text-amber-400">IN</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUDIO TRACK (A1) */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-[11px] font-mono-cinema text-zinc-400 font-bold">A1</span>
                  <div className="relative flex-1 h-10 bg-zinc-950 rounded border border-zinc-800 overflow-hidden flex">
                    {/* Audio Split representation based on cut type */}
                    {selectedCut.timelineLayout === 'j-cut' ? (
                      <>
                        <div
                          className="h-full bg-emerald-950/70 border-r-2 border-cyan-400 px-2 flex items-center text-[11px] text-emerald-200"
                          style={{ width: '35%' }}
                        >
                          <span className="truncate">Audio A</span>
                        </div>
                        <div
                          className="h-full bg-cyan-950/80 px-2 flex items-center justify-between text-[11px] text-cyan-200 border-l border-cyan-500"
                          style={{ width: '65%' }}
                        >
                          <span className="truncate font-semibold text-cyan-300">★ J-Cut Audio Lead (Starts before V1)</span>
                          <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        </div>
                      </>
                    ) : selectedCut.timelineLayout === 'l-cut' ? (
                      <>
                        <div
                          className="h-full bg-cyan-950/80 border-r-2 border-cyan-400 px-2 flex items-center justify-between text-[11px] text-cyan-200"
                          style={{ width: '65%' }}
                        >
                          <span className="truncate font-semibold text-cyan-300">★ L-Cut Audio Linger (Sustains after V1)</span>
                          <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        </div>
                        <div
                          className="h-full bg-emerald-950/70 px-2 flex items-center text-[11px] text-emerald-200 border-l border-cyan-500"
                          style={{ width: '35%' }}
                        >
                          <span className="truncate">Audio B</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="h-full bg-emerald-950/70 border-r border-zinc-700 px-2 flex items-center text-[11px] text-emerald-200"
                          style={{ width: '50%' }}
                        >
                          <span className="truncate">Audio Track A</span>
                        </div>
                        <div
                          className="h-full bg-cyan-950/70 px-2 flex items-center text-[11px] text-cyan-200"
                          style={{ width: '50%' }}
                        >
                          <span className="truncate">Audio Track B</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Scrubber Range Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={playheadPos}
                onChange={(e) => {
                  setPlayheadPos(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-transparent mt-3"
              />
            </div>

            {/* Time markers */}
            <div className="flex justify-between text-[11px] font-mono-cinema text-zinc-400">
              <span>00:00:00</span>
              <span className="text-amber-400 font-bold">50% CUT POINT</span>
              <span>00:00:10</span>
            </div>
          </div>
        </div>

        {/* Cut Type Selector & Walter Murch Theory (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-200 block">
              1. Select Cut Point Architecture
            </span>
            <div className="space-y-2">
              {CUT_TYPES.map((cut) => {
                const isActive = selectedCut.id === cut.id;
                return (
                  <button
                    key={cut.id}
                    onClick={() => {
                      setSelectedCut(cut);
                      setPlayheadPos(30);
                    }}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/10 text-white font-semibold'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{cut.name}</span>
                      <span className="text-[10px] font-mono-cinema text-amber-400/90">{cut.category}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep Cut Analysis */}
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="text-sm font-bold text-zinc-100">{selectedCut.name} Mechanics</h4>
              <span className="text-xs font-mono-cinema text-amber-400">EDIT SUITE</span>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-zinc-400 font-semibold block">Shot Setup A:</span>
              <p className="text-zinc-300">{selectedCut.shotADesc}</p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-zinc-400 font-semibold block">Shot Setup B:</span>
              <p className="text-zinc-300">{selectedCut.shotBDesc}</p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-zinc-400 font-semibold block">Audience Cognitive Perception:</span>
              <p className="text-zinc-200 leading-relaxed">{selectedCut.psychologicalEffect}</p>
            </div>

            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
              <span className="text-amber-400 font-semibold block mb-0.5">Classic Film Example:</span>
              <p className="text-zinc-300 italic">{selectedCut.famousExample}</p>
            </div>
          </div>

          {/* Walter Murch's Rule of Six Card */}
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2.5">
            <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-500" />
              Walter Murch's Rule of Six (Priorities on Where to Cut):
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-zinc-300">
                <span>1. Emotion (True to the heart of the moment)</span>
                <span className="font-mono-cinema font-bold text-amber-400">51%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>2. Story (Advances the narrative plot)</span>
                <span className="font-mono-cinema">23%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>3. Rhythm (Occurs at rhythmic punctuation)</span>
                <span className="font-mono-cinema">10%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>4. Eye-Trace (Where viewer looks on screen)</span>
                <span className="font-mono-cinema">7%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>5. Two-Dimensional Screen Continuity</span>
                <span className="font-mono-cinema">5%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>6. Three-Dimensional Action Space</span>
                <span className="font-mono-cinema">4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
