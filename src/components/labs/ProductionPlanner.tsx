import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Printer, CheckSquare, Film, ListFilter, ClipboardCheck, Sparkles } from 'lucide-react';
import { ShotListItem } from '../../types/filmmaking';

const INITIAL_SHOTS: ShotListItem[] = [
  {
    id: 'shot-1',
    sceneNumber: '1',
    shotNumber: '1A',
    shotSize: 'WS',
    cameraAngle: 'Eye Level',
    focalLength: '24mm',
    movement: 'Static',
    subjectAction: 'Establishing interior basement studio. Rain lashes against high basement window.',
    soundCue: 'Distant thunderstorm, buzzing neon tube',
    equipment: 'Fluid Head Tripod, Dana Dolly'
  },
  {
    id: 'shot-2',
    sceneNumber: '1',
    shotNumber: '1B',
    shotSize: 'MS',
    cameraAngle: 'Low Angle',
    focalLength: '35mm',
    movement: 'Dolly In',
    subjectAction: 'Protagonist enters frame, sits at mixing desk, places tape onto spool.',
    soundCue: 'Click of mechanical tape deck lever',
    equipment: 'Slider, 35mm Prime T2.0'
  },
  {
    id: 'shot-3',
    sceneNumber: '1',
    shotNumber: '1C',
    shotSize: 'CU',
    cameraAngle: 'Eye Level',
    focalLength: '50mm',
    movement: 'Static',
    subjectAction: 'Protagonist\'s eyes widen as he isolates a faint voice in the tape hiss.',
    soundCue: 'Muffled whispered voice: "He knows"',
    equipment: '50mm Cinema Prime, Eye-light LED'
  },
  {
    id: 'shot-4',
    sceneNumber: '1',
    shotNumber: '1D',
    shotSize: 'ECU',
    cameraAngle: 'Dutch Tilt',
    focalLength: '85mm',
    movement: 'Whip Pan',
    subjectAction: 'Whip pan to the doorknob slowly turning from outside the hallway.',
    soundCue: 'Sharp metallic click, sudden silence in tape hiss',
    equipment: '85mm Macro lens, high-speed fluid head'
  }
];

export const ProductionPlanner: React.FC = () => {
  const [shots, setShots] = useState<ShotListItem[]>(() => {
    const saved = localStorage.getItem('cineflow_shotlist');
    return saved ? JSON.parse(saved) : INITIAL_SHOTS;
  });

  const [projectTitle, setProjectTitle] = useState('THE MIDNIGHT FREQUENCY');
  const [directorName, setDirectorName] = useState('Student Director');
  const [activeTab, setActiveTab] = useState<'shotlist' | 'checklist'>('shotlist');

  // Pre-production checklist items
  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Script Breakdown: Highlight Cast (Red), Props (Blue), Wardrobe (Yellow)', done: true },
    { id: 'c2', label: 'Location Tech Scout: Check ambient sound, power outlets, sun direction', done: true },
    { id: 'c3', label: 'Actor Auditions & Table Read: Clarify character objectives and subtext', done: false },
    { id: 'c4', label: 'Overhead Lighting & Floor Plan: Map 180-degree axis line for every scene', done: false },
    { id: 'c5', label: 'Camera Test & Lens Check: Sensor cleaning, format high-speed SD/CFast cards', done: true },
    { id: 'c6', label: 'Sound Kit Check: Fresh batteries for wireless lavs, test deadcat for wind', done: false },
    { id: 'c7', label: 'Call Sheet Distribution: Send 24 hours in advance with nearest ER hospital', done: false }
  ]);

  useEffect(() => {
    localStorage.setItem('cineflow_shotlist', JSON.stringify(shots));
  }, [shots]);

  const handleAddShot = () => {
    const newShot: ShotListItem = {
      id: `shot-${Date.now()}`,
      sceneNumber: '1',
      shotNumber: `${shots.length + 1}A`,
      shotSize: 'MS',
      cameraAngle: 'Eye Level',
      focalLength: '35mm',
      movement: 'Static',
      subjectAction: 'Action description...',
      soundCue: 'Sound cue...',
      equipment: 'Tripod'
    };
    setShots([...shots, newShot]);
  };

  const handleUpdateShot = (id: string, field: keyof ShotListItem, value: string) => {
    setShots(shots.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleDeleteShot = (id: string) => {
    setShots(shots.filter((s) => s.id !== id));
  };

  const toggleChecklist = (id: string) => {
    setChecklist(checklist.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-500 font-mono-cinema">Production Suite · Module 08</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100 mt-1">Director's Production Planner & Shot Lister</h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Build your short film's shooting schedule. Specify focal lengths, camera movement rigs, and sound cues, and export a film set shot list.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('shotlist')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              activeTab === 'shotlist'
                ? 'bg-zinc-800 border-amber-500/80 text-amber-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Film className="w-3.5 h-3.5 inline mr-1.5" />
            Shot List ({shots.length})
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              activeTab === 'checklist'
                ? 'bg-zinc-800 border-amber-500/80 text-amber-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5 inline mr-1.5" />
            Pre-Flight Checklist
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs transition-colors flex items-center gap-1.5 ml-2 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / PDF
          </button>
        </div>
      </div>

      {activeTab === 'shotlist' && (
        <div className="space-y-6">
          {/* Project Details Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
            <div>
              <label className="text-zinc-400 block mb-1">Project Title:</label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full p-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-100 font-bold focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1">Director / DP:</label>
              <input
                type="text"
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
                className="w-full p-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddShot}
                className="w-full py-2 px-3 rounded bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Shot
              </button>
            </div>
          </div>

          {/* Shot List Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/80 font-mono-cinema text-zinc-400">
                  <th className="p-3 w-16">SCENE</th>
                  <th className="p-3 w-16">SHOT</th>
                  <th className="p-3 w-24">SIZE</th>
                  <th className="p-3 w-28">LENS</th>
                  <th className="p-3 w-28">MOVEMENT</th>
                  <th className="p-3">SUBJECT ACTION & FRAMING</th>
                  <th className="p-3 w-48">SOUND CUE</th>
                  <th className="p-3 w-12 text-center">DEL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {shots.map((s) => (
                  <tr key={s.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="p-2.5 font-mono-cinema">
                      <input
                        type="text"
                        value={s.sceneNumber}
                        onChange={(e) => handleUpdateShot(s.id, 'sceneNumber', e.target.value)}
                        className="w-10 bg-transparent text-zinc-200 border-b border-transparent focus:border-amber-500 focus:outline-none"
                      />
                    </td>
                    <td className="p-2.5 font-mono-cinema font-bold text-amber-400">
                      <input
                        type="text"
                        value={s.shotNumber}
                        onChange={(e) => handleUpdateShot(s.id, 'shotNumber', e.target.value)}
                        className="w-12 bg-transparent text-amber-400 border-b border-transparent focus:border-amber-500 focus:outline-none"
                      />
                    </td>
                    <td className="p-2.5">
                      <select
                        value={s.shotSize}
                        onChange={(e) => handleUpdateShot(s.id, 'shotSize', e.target.value)}
                        className="bg-zinc-950 text-zinc-200 rounded px-2 py-1 border border-zinc-800 text-xs focus:outline-none"
                      >
                        <option value="ELS">ELS</option>
                        <option value="WS">WS</option>
                        <option value="MWS">MWS</option>
                        <option value="MS">MS</option>
                        <option value="MCU">MCU</option>
                        <option value="CU">CU</option>
                        <option value="ECU">ECU</option>
                      </select>
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={s.focalLength}
                        onChange={(e) => handleUpdateShot(s.id, 'focalLength', e.target.value)}
                        className="w-20 bg-zinc-950 text-zinc-200 rounded px-2 py-1 border border-zinc-800 text-xs focus:outline-none font-mono-cinema"
                      />
                    </td>
                    <td className="p-2.5">
                      <select
                        value={s.movement}
                        onChange={(e) => handleUpdateShot(s.id, 'movement', e.target.value)}
                        className="bg-zinc-950 text-zinc-200 rounded px-2 py-1 border border-zinc-800 text-xs focus:outline-none"
                      >
                        <option value="Static">Static</option>
                        <option value="Pan">Pan</option>
                        <option value="Tilt">Tilt</option>
                        <option value="Dolly In">Dolly In</option>
                        <option value="Dolly Out">Dolly Out</option>
                        <option value="Track / Truck">Track / Truck</option>
                        <option value="Handheld">Handheld</option>
                        <option value="Steadicam">Steadicam</option>
                        <option value="Crane / Jib">Crane / Jib</option>
                        <option value="Whip Pan">Whip Pan</option>
                      </select>
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={s.subjectAction}
                        onChange={(e) => handleUpdateShot(s.id, 'subjectAction', e.target.value)}
                        className="w-full bg-transparent text-zinc-200 border-b border-transparent focus:border-amber-500 focus:outline-none"
                        placeholder="Describe action..."
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={s.soundCue}
                        onChange={(e) => handleUpdateShot(s.id, 'soundCue', e.target.value)}
                        className="w-full bg-transparent text-zinc-400 border-b border-transparent focus:border-amber-500 focus:outline-none text-xs italic"
                        placeholder="Sound cue..."
                      />
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => handleDeleteShot(s.id)}
                        className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Delete shot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-zinc-400 text-right">
            Auto-saved locally in browser storage · Ready to print for your 1st AD and Camera Operator.
          </p>
        </div>
      )}

      {activeTab === 'checklist' && (
        <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4 max-w-3xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-zinc-100">Director & DP Pre-Flight Checklist</h3>
            <span className="text-xs font-mono-cinema text-amber-400">
              {checklist.filter((c) => c.done).length} / {checklist.length} READY
            </span>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`p-3.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                  item.done
                    ? 'bg-zinc-950/90 border-emerald-500/40 text-zinc-200'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${item.done ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-zinc-700'}`}>
                    {item.done && <CheckSquare className="w-3 h-3 text-zinc-950" />}
                  </div>
                  <span className={item.done ? 'line-through text-zinc-400' : 'text-zinc-200 font-medium'}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
            <strong className="text-amber-400 block mb-1">Set Etiquette Rule:</strong>
            The most expensive word on a film set is "Wait." Proper pre-production eliminates 90% of set crises before you call "Roll Sound, Roll Camera, Action!"
          </div>
        </div>
      )}
    </div>
  );
};
