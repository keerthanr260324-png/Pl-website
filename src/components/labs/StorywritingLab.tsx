import React, { useState } from 'react';
import { PenTool, BookOpen, Sparkles, Download, CheckCircle, FileText, ChevronRight } from 'lucide-react';
import { StoryBeat } from '../../types/filmmaking';

const DEFAULT_BEATS: StoryBeat[] = [
  {
    id: 'beat-1',
    name: '01. Opening Image',
    act: 'Act 1',
    pageTarget: 'Page 1',
    description: 'A snapshot of the protagonist\'s flawed world before the journey begins.',
    userPrompt: 'What does your protagonist\'s everyday status quo look like right before disaster strikes?',
    userInput: 'A weary sound recordist cleans obsolete microphone cables in a dim basement apartment, ignoring eviction notices on the door.'
  },
  {
    id: 'beat-2',
    name: '02. Theme Stated',
    act: 'Act 1',
    pageTarget: 'Page 5',
    description: 'Someone mentions the philosophical truth the hero must learn by the climax.',
    userPrompt: 'What statement or question outlines the moral argument of your film?',
    userInput: '"You spend your whole life listening to recorded noise because you\'re too terrified to hear what someone actually feels."'
  },
  {
    id: 'beat-3',
    name: '03. Catalyst (Inciting Incident)',
    act: 'Act 1',
    pageTarget: 'Page 12',
    description: 'The disruptive knock on the door that shatters the old world forever.',
    userPrompt: 'What event forces the protagonist to leave their comfort zone?',
    userInput: 'While recording ambient midnight wind at an abandoned reservoir, he captures the muffled audio of an apparent abduction in the dark.'
  },
  {
    id: 'beat-4',
    name: '04. Break into Two',
    act: 'Act 1',
    pageTarget: 'Page 25',
    description: 'The protagonist makes a conscious choice to step into the upside-down world.',
    userPrompt: 'What irreversible decision does your character commit to?',
    userInput: 'Instead of handing the magnetic tape to corrupt precinct detectives, he rents high-frequency audio filters to decode the dying words himself.'
  },
  {
    id: 'beat-5',
    name: '05. Midpoint (Stakes Inverted)',
    act: 'Act 2A',
    pageTarget: 'Page 55',
    description: 'False victory or false defeat. The stakes shift from public to personal.',
    userPrompt: 'What unexpected discovery changes the rules of the investigation?',
    userInput: 'He isolates a vocal track in the background and realizes the victim wasn\'t a stranger—it was his estranged sister.'
  },
  {
    id: 'beat-6',
    name: '06. All Is Lost',
    act: 'Act 2B',
    pageTarget: 'Page 75',
    description: 'The lowest emotional point. The "whiff of death" and loss of hope.',
    userPrompt: 'What causes the hero\'s entire plan to implode?',
    userInput: 'His studio is torched by arsonists; all backup tapes are incinerated, and his primary ally turns out to be on the payroll.'
  },
  {
    id: 'beat-7',
    name: '07. Climax & Finale',
    act: 'Act 3',
    pageTarget: 'Page 90-100',
    description: 'Synthesis: the hero uses the theme learned to conquer the antagonist.',
    userPrompt: 'How does the hero overcome the ultimate obstacle using internal growth?',
    userInput: 'Armed only with a wireless boom transmitter, he broadcasts the conspirators\' live confession over the municipal emergency radio tower during a blackout.'
  },
  {
    id: 'beat-8',
    name: '08. Final Image',
    act: 'Act 3',
    pageTarget: 'Page 110',
    description: 'The visual mirror to the Opening Image, proving the world has changed.',
    userPrompt: 'What is the final framing that mirrors the opening?',
    userInput: 'He steps outside into morning sunlight, leaves his headphones resting peacefully on the railing, and listens to the natural city sounds without filtering.'
  }
];

export const StorywritingLab: React.FC = () => {
  const [beats, setBeats] = useState<StoryBeat[]>(DEFAULT_BEATS);
  const [selectedBeatId, setSelectedBeatId] = useState<string>('beat-1');
  const [activeTab, setActiveTab] = useState<'beats' | 'screenplay' | 'logline'>('beats');

  // Logline parameters
  const [protagonist, setProtagonist] = useState('An obsessive audio surveillance engineer');
  const [incitingIncident, setIncitingIncident] = useState('accidentally records a high-level government conspiracy');
  const [goal, setGoal] = useState('must expose the broadcast frequency to the press');
  const [antagonist, setAntagonist] = useState('before black-ops fixers erase all traces of his existence');

  const selectedBeat = beats.find((b) => b.id === selectedBeatId) || beats[0];

  const handleUpdateBeatText = (text: string) => {
    setBeats((prev) =>
      prev.map((b) => (b.id === selectedBeat.id ? { ...b, userInput: text } : b))
    );
  };

  const handleExportScript = () => {
    const textContent = `CINEFLOW BEAT SHEET & STORY OUTLINE\n==================================\n\nLOGLINE:\nWhen ${protagonist} ${incitingIncident}, they ${goal} ${antagonist}.\n\n` +
      beats.map((b) => `[${b.name.toUpperCase()} - ${b.pageTarget}]\n${b.userInput}\n\n`).join('');

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'cineflow_story_outline.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-500 font-mono-cinema">Writing Lab · Module 01</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100 mt-1">Storywriting & Script Architecture Lab</h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Build bulletproof narrative architecture using the 3-Act Structure, Blake Snyder beat sheets, and Hollywood-standard screenplay scene formatting.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg shrink-0">
          <button
            onClick={() => setActiveTab('beats')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'beats' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
            15-Beat Sheet
          </button>
          <button
            onClick={() => setActiveTab('logline')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'logline' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
            Logline Formula
          </button>
          <button
            onClick={() => setActiveTab('screenplay')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'screenplay' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 inline mr-1.5" />
            Script Formatter
          </button>
        </div>
      </div>

      {activeTab === 'beats' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Beat Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1 mb-2">
              <span className="font-semibold text-zinc-300">Narrative Beats</span>
              <span className="font-mono-cinema">PAGES 1 - 110</span>
            </div>

            <div className="space-y-1.5">
              {beats.map((b) => {
                const isSelected = b.id === selectedBeat.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBeatId(b.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{b.name}</span>
                      <span className="text-[10px] font-mono-cinema text-amber-400">{b.pageTarget}</span>
                    </div>
                    <span className="text-xs text-zinc-400 line-clamp-1 mt-1">{b.description}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleExportScript}
              className="w-full mt-4 py-2.5 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              Export Full Story Outline (.TXT)
            </button>
          </div>

          {/* Active Beat Editor (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-xs font-mono-cinema text-amber-400">{selectedBeat.act} · {selectedBeat.pageTarget}</span>
                <h3 className="text-lg font-bold text-zinc-100 mt-0.5">{selectedBeat.name}</h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-zinc-800 text-[11px] font-mono-cinema text-zinc-300">
                BEAT TARGET
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
              {selectedBeat.description}
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">
                {selectedBeat.userPrompt}
              </label>
              <textarea
                value={selectedBeat.userInput}
                onChange={(e) => handleUpdateBeatText(e.target.value)}
                rows={5}
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 p-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 font-sans leading-relaxed"
                placeholder="Write your story beat..."
              />
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-400 leading-relaxed">
              <strong className="text-amber-400 block mb-1">Story Doctor Tip:</strong>
              If your protagonist can walk away from this situation with no consequences, you do not have a story. Stakes must be existential (loss of life, love, identity, or freedom).
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logline' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-lg font-bold text-zinc-100">The 4-Part Hollywood Logline Formula</h3>
            <p className="text-xs text-zinc-400">
              When [Inciting Incident] happens to [Flawed Protagonist], they must [Action / Goal] before [Antagonistic Stakes].
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">1. Flawed Protagonist with Adjective:</label>
                <input
                  type="text"
                  value={protagonist}
                  onChange={(e) => setProtagonist(e.target.value)}
                  className="w-full p-2.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">2. Inciting Incident / Catalyst:</label>
                <input
                  type="text"
                  value={incitingIncident}
                  onChange={(e) => setIncitingIncident(e.target.value)}
                  className="w-full p-2.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">3. Clear Active Goal:</label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full p-2.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">4. Antagonistic Force / Stakes:</label>
                <input
                  type="text"
                  value={antagonist}
                  onChange={(e) => setAntagonist(e.target.value)}
                  className="w-full p-2.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
            <span className="text-xs font-mono-cinema text-amber-400 uppercase tracking-wider block">Generated Logline Pitch</span>
            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/80">
              <p className="text-sm font-editorial text-zinc-100 italic leading-relaxed">
                "When {incitingIncident}, {protagonist.toLowerCase()} must {goal} {antagonist}."
              </p>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              A great logline conveys irony, high stakes, and visual momentum in under 35 words. Never reveal the ending in a logline; reveal the irresistible premise.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'screenplay' && (
        <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono-cinema text-amber-400">HOLLYWOOD STANDARD FORMAT</span>
              <h3 className="text-base font-bold text-zinc-100">Screenplay Typography & Industry Rules</h3>
            </div>
            <span className="text-xs font-screenplay text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
              COURIER PRIME 12PT · 1 PAGE = ~1 MINUTE SCREEN TIME
            </span>
          </div>

          {/* Interactive Screenplay Page Preview */}
          <div className="p-8 rounded-lg bg-zinc-950 border border-zinc-800 font-screenplay text-sm text-zinc-300 space-y-4 max-w-2xl mx-auto shadow-2xl leading-relaxed">
            {/* Slugline */}
            <p className="font-bold text-zinc-100 tracking-wide">
              INT. BASEMENT SOUND STUDIO - NIGHT
            </p>

            {/* Action */}
            <p className="text-zinc-300">
              Fluorescent bulbs flicker overhead with an irritating 60Hz hum.
            </p>

            <p className="text-zinc-300">
              MARK (38), gaunt, dark circles carved under his eyes, presses oversized studio headphones against his ears. His trembling fingers hover over the tactile faders of an analog Nagra reel-to-reel deck.
            </p>

            <p className="text-zinc-300">
              On the magnetic tape: STATIC. Then—a faint metallic CLINK.
            </p>

            {/* Character Cue */}
            <div className="text-center pt-2">
              <span className="font-bold text-zinc-100 inline-block uppercase">MARK</span>
              <p className="text-xs italic text-zinc-400">(whispering to the tape)</p>
              <p className="max-w-md mx-auto text-zinc-200 mt-1">
                Say it again. Just one more syllable.
              </p>
            </div>

            {/* Action */}
            <p className="text-zinc-300 pt-2">
              Behind him, the heavy steel door HANDLE slowly turns. Mark freezes. He does not turn around.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs text-zinc-400">
            <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
              <strong className="text-zinc-200 block mb-1">Sluglines (Scene Headings):</strong>
              Always specify INT. or EXT., Location, and Time of Day (DAY or NIGHT).
            </div>
            <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
              <strong className="text-zinc-200 block mb-1">Action Lines:</strong>
              Present tense only. Never write what a camera is doing ("we see")—write what physically occurs.
            </div>
            <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
              <strong className="text-zinc-200 block mb-1">Parentheticals:</strong>
              Use sparingly. Only when the emotional delivery is counter-intuitive to the dialogue.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
