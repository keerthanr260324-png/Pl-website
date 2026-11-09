import React from 'react';
import { Award, Compass, Play, ArrowRight, Palette, Camera, Video, Scissors, FileText, CheckCircle, Sparkles, Film } from 'lucide-react';
import { CURRICULUM_MODULES } from '../../data/curriculumData';

interface Props {
  completedModules: string[];
  onOpenModule: (moduleId: string) => void;
  onOpenLab: (labId: string) => void;
}

export const FilmmakingDashboard: React.FC<Props> = ({
  completedModules,
  onOpenModule,
  onOpenLab
}) => {
  const totalModules = CURRICULUM_MODULES.length;
  const progressPercent = Math.round((completedModules.length / totalModules) * 100);

  // Director Rank title based on progress
  let directorRank = 'Film Apprentice';
  let rankDescription = 'Starting your journey into cinematic grammar and script mechanics.';
  if (progressPercent >= 75) {
    directorRank = 'Film Auteur & Master Director';
    rankDescription = 'Complete command of visual storytelling, lighting ratios, color palettes, and montage.';
  } else if (progressPercent >= 50) {
    directorRank = 'Director of Photography / Lead Editor';
    rankDescription = 'Proficient in lenses, movement motivation, cut points, and mise-en-scène.';
  } else if (progressPercent >= 25) {
    directorRank = 'Assistant Director & Story Architect';
    rankDescription = 'Firm grasp of narrative beat sheets, screenplay form, and shot sizing.';
  }

  const QUICK_LABS = [
    {
      id: 'color',
      title: 'Color Grading Studio',
      desc: '3-way color wheels, film stocks (Kodak/Fuji), RGB parade scopes & palette harmonies.',
      icon: Palette,
      badge: 'COLOR · MODULE 06',
      accent: 'from-amber-500/20 to-orange-500/5'
    },
    {
      id: 'framing',
      title: 'Shot Framing & Lens Lab',
      desc: '2.39:1 Cinemascope to 4:3 Academy, prime focal lengths 18mm to 135mm, composition grids.',
      icon: Camera,
      badge: 'CINEMATOGRAPHY · MODULE 04',
      accent: 'from-cyan-500/20 to-blue-500/5'
    },
    {
      id: 'camera',
      title: 'Camera Movements Visualizer',
      desc: 'Simulate Pan, Dolly In, Tracking, Crane, Whip Pan, and the legendary Vertigo Dolly Zoom.',
      icon: Video,
      badge: 'MOTION · MODULE 05',
      accent: 'from-emerald-500/20 to-teal-500/5'
    },
    {
      id: 'editing',
      title: 'Cut Points & Montage Lab',
      desc: 'Multi-track NLE timeline. Scrub across J-Cuts, L-Cuts, cutting on action, and match cuts.',
      icon: Scissors,
      badge: 'EDITING · MODULE 07',
      accent: 'from-purple-500/20 to-indigo-500/5'
    },
    {
      id: 'story',
      title: 'Storywriting & Beat Sheets',
      desc: 'Save the Cat 15-beat structural outline, 4-part Hollywood logline formula, and script preview.',
      icon: FileText,
      badge: 'STORY · MODULE 01',
      accent: 'from-rose-500/20 to-pink-500/5'
    },
    {
      id: 'production',
      title: 'Production Suite & Shot Lister',
      desc: 'Build your film project shot list, pre-flight technical checklist, and printable call sheet.',
      icon: Film,
      badge: 'PRODUCTION · MODULE 08',
      accent: 'from-amber-500/20 to-yellow-500/5'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Filmmaker Passport / Rank Strip */}
      <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono-cinema text-amber-400 tracking-wider uppercase">
                FILMMAKER STATUS · {progressPercent}% COMPLETED
              </span>
              <h2 className="text-xl lg:text-2xl font-bold text-zinc-100 mt-0.5">{directorRank}</h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">{rankDescription}</p>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2 shrink-0">
            <div className="flex justify-between text-xs font-mono-cinema">
              <span className="text-zinc-400">Total Curriculum</span>
              <span className="text-amber-400 font-bold">{completedModules.length} / {totalModules} Completed</span>
            </div>
            <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Next Recommended Step */}
        <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="font-semibold text-amber-400">Next Action:</span>
            <span>
              {completedModules.length === 0
                ? 'Begin Module 01: Storywriting & Script Architecture'
                : completedModules.length === totalModules
                ? 'All disciplines mastered! Launch your film project in the Production Suite.'
                : 'Continue with your next uncompleted curriculum module.'}
            </span>
          </div>
          <button
            onClick={() => onOpenModule(CURRICULUM_MODULES[0].id)}
            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            Open Curriculum <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Creative Labs Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-100">Interactive Filmmaker Labs & Simulators</h3>
            <p className="text-xs text-zinc-400">Real-time playgrounds to test optical physics, color wheels, timelines, and camera movement.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUICK_LABS.map((lab) => {
            const Icon = lab.icon;
            return (
              <div
                key={lab.id}
                onClick={() => onOpenLab(lab.id)}
                className="group p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/60 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-amber-500/5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-400 group-hover:border-amber-500/40 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono-cinema text-zinc-400 tracking-wider">
                      {lab.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {lab.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {lab.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-amber-400 transition-colors">
                  <span>Launch Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curriculum Mastery Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-100">Curriculum Syllabus Overview</h3>
            <p className="text-xs text-zinc-400">All 8 core tracks to master the craft of cinema.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CURRICULUM_MODULES.map((mod) => {
            const isDone = completedModules.includes(mod.id);
            return (
              <div
                key={mod.id}
                onClick={() => onOpenModule(mod.id)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isDone
                    ? 'bg-zinc-900/60 border-emerald-500/30 hover:border-emerald-500/60'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono-cinema text-amber-400">{mod.number} · {mod.category}</span>
                  {isDone && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <h4 className="text-sm font-bold text-zinc-100 line-clamp-1">{mod.title}</h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{mod.description}</p>
                <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono-cinema">
                  <span>{mod.lessons.length} LESSONS</span>
                  <span className="text-amber-400 group-hover:underline">Explore</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Auteur Director Wisdom Quote */}
      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider text-amber-500 font-mono-cinema">Auteur Director Maxim</span>
          <p className="text-base font-editorial text-zinc-200 italic leading-relaxed">
            "Cinema is a matter of what's in the frame and what's out. You choose what to show, what to hide, when to move, and when to cut. That is directing."
          </p>
          <span className="text-xs text-zinc-400 block pt-1">— Martin Scorsese</span>
        </div>
      </div>
    </div>
  );
};
