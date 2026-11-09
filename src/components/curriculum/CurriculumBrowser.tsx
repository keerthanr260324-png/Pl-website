import React, { useState } from 'react';
import { BookOpen, CheckCircle, HelpCircle, ArrowRight, Award, Film, Play, ChevronRight, Check } from 'lucide-react';
import { CURRICULUM_MODULES } from '../../data/curriculumData';
import { CurriculumModule } from '../../types/filmmaking';

interface Props {
  onOpenLab: (labId: string) => void;
  completedModules: string[];
  onToggleCompleteModule: (moduleId: string) => void;
}

export const CurriculumBrowser: React.FC<Props> = ({
  onOpenLab,
  completedModules,
  onToggleCompleteModule
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(CURRICULUM_MODULES[0].id);
  const [activeTab, setActiveTab] = useState<'lessons' | 'quiz' | 'assignment'>('lessons');
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const activeModule = CURRICULUM_MODULES.find((m) => m.id === activeModuleId) || CURRICULUM_MODULES[0];
  const isModuleDone = completedModules.includes(activeModule.id);
  const activeLesson = activeModule.lessons[selectedLessonIndex] || activeModule.lessons[0];

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    setSelectedLessonIndex(0);
    setActiveTab('lessons');
    setQuizAnswers({});
    setShowQuizResults(false);
  };

  const handleAnswerQuiz = (qIdx: number, optIdx: number) => {
    if (showQuizResults) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    activeModule.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) score += 1;
    });
    return score;
  };

  return (
    <div className="space-y-8">
      {/* Curriculum Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-500 font-mono-cinema">Masterclass Academy</span>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100 mt-1">
            Complete Filmmaker Curriculum & Progression Map
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            8 core disciplines of cinema: from screenwriting architecture to lighting physics, color theory, cutting on action, and on-set directing.
          </p>
        </div>

        {/* Global Progress Indicator */}
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl shrink-0">
          <div className="text-right">
            <span className="text-[11px] font-mono-cinema text-zinc-400 block">JOURNEY PROGRESS</span>
            <span className="text-sm font-bold text-amber-400 font-mono-cinema">
              {completedModules.length} / {CURRICULUM_MODULES.length} MODULES ({Math.round((completedModules.length / CURRICULUM_MODULES.length) * 100)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Module Sidebar List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 px-1 block mb-2">
            The 8 Disciplines of Cinema
          </span>

          <div className="space-y-2">
            {CURRICULUM_MODULES.map((mod) => {
              const isSelected = mod.id === activeModule.id;
              const isDone = completedModules.includes(mod.id);

              return (
                <button
                  key={mod.id}
                  onClick={() => handleSelectModule(mod.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 text-white shadow-lg'
                      : 'border-zinc-800/80 bg-zinc-900/70 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-cinema text-amber-400">TRACK {mod.number} · {mod.category}</span>
                    {isDone && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <h4 className="text-sm font-bold mt-1 text-zinc-100">{mod.title}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-1">{mod.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Content Stage (8 cols) */}
        <div className="lg:col-span-8 p-6 lg:p-8 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-6 shadow-xl">
          {/* Module Banner with Image */}
          <div className="relative rounded-xl overflow-hidden aspect-21/9 border border-zinc-800 bg-black">
            <img
              src={activeModule.image}
              alt={activeModule.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono-cinema text-amber-400 uppercase tracking-wider">
                  DISCIPLINE {activeModule.number} · {activeModule.category}
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-white mt-0.5">{activeModule.title}</h3>
                <p className="text-xs text-zinc-300 line-clamp-1">{activeModule.subtitle}</p>
              </div>

              <button
                onClick={() => onToggleCompleteModule(activeModule.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                  isModuleDone
                    ? 'bg-emerald-500 text-black'
                    : 'bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                {isModuleDone ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
          </div>

          {/* Module Sub-Navigation */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'lessons'
                    ? 'bg-zinc-800 text-amber-400 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
                Lessons ({activeModule.lessons.length})
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'quiz'
                    ? 'bg-zinc-800 text-amber-400 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 inline mr-1.5" />
                Knowledge Quiz ({activeModule.quiz.length})
              </button>
              <button
                onClick={() => setActiveTab('assignment')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'assignment'
                    ? 'bg-zinc-800 text-amber-400 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Award className="w-3.5 h-3.5 inline mr-1.5" />
                Practical Assignment
              </button>
            </div>

            {/* Quick Link to Corresponding Creative Lab */}
            {activeModule.id === 'colorpalettes' && (
              <button
                onClick={() => onOpenLab('color')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                Open Color Grading Lab <ArrowRight className="w-3 h-3" />
              </button>
            )}
            {activeModule.id === 'shotdesign' && (
              <button
                onClick={() => onOpenLab('framing')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                Open Shot Framing Lab <ArrowRight className="w-3 h-3" />
              </button>
            )}
            {activeModule.id === 'cameramovement' && (
              <button
                onClick={() => onOpenLab('camera')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                Open Camera Movement Lab <ArrowRight className="w-3 h-3" />
              </button>
            )}
            {activeModule.id === 'editing' && (
              <button
                onClick={() => onOpenLab('editing')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                Open Cut Points Lab <ArrowRight className="w-3 h-3" />
              </button>
            )}
            {activeModule.id === 'storywriting' && (
              <button
                onClick={() => onOpenLab('story')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                Open Storywriting Lab <ArrowRight className="w-3 h-3" />
              </button>
            )}
            {activeModule.id === 'production' && (
              <button
                onClick={() => onOpenLab('production')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                Open Production Suite <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* TAB 1: In-Depth Lessons */}
          {activeTab === 'lessons' && (
            <div className="space-y-6">
              {/* Lesson Picker Tabs */}
              <div className="flex gap-2">
                {activeModule.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonIndex(idx)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                      selectedLessonIndex === idx
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Lesson {idx + 1}: {lesson.title.split(':')[0]}
                  </button>
                ))}
              </div>

              {/* Lesson Content Body */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                  <h3 className="text-lg font-bold text-zinc-100">{activeLesson.title}</h3>
                  <span className="text-xs font-mono-cinema text-zinc-400">{activeLesson.duration}</span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                  {activeLesson.summary}
                </p>

                {/* Key Concepts Box */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono-cinema">
                    Core Architectural Principles:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {activeLesson.keyConcepts.map((concept, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">·</span>
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Director Insight Quote */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <p className="text-sm font-editorial text-amber-200/90 italic leading-relaxed">
                    {activeLesson.directorInsight}
                  </p>
                </div>

                {/* Detailed Paragraphs */}
                <div className="space-y-3 text-xs lg:text-sm text-zinc-300 leading-relaxed">
                  {activeLesson.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Film Study References */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-zinc-300 block">Recommended Film Case Studies:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeLesson.filmExamples.map((film, i) => (
                      <div key={i} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs">
                        <div className="flex items-center justify-between font-bold text-zinc-100">
                          <span>{film.title} ({film.year})</span>
                          <span className="text-zinc-400 font-normal">{film.director}</span>
                        </div>
                        <p className="text-zinc-400 mt-1 italic text-[11px]">{film.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Knowledge Check Quiz */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-zinc-100">Discipline Mastery Check</h3>
                  <p className="text-xs text-zinc-400">Answer the questions below to test your understanding.</p>
                </div>
                {showQuizResults && (
                  <span className="text-sm font-bold font-mono-cinema text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/30">
                    SCORE: {calculateScore()} / {activeModule.quiz.length}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {activeModule.quiz.map((q, qIdx) => {
                  const userAnswer = quizAnswers[qIdx];
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div key={qIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                      <span className="text-xs font-mono-cinema text-amber-400">QUESTION {qIdx + 1}</span>
                      <p className="text-sm font-semibold text-zinc-200">{q.question}</p>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = userAnswer === optIdx;
                          let btnStyle = 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700';

                          if (showQuizResults) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-200 font-semibold';
                            } else if (isOptionSelected) {
                              btnStyle = 'border-red-500 bg-red-500/10 text-red-200';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'border-amber-500 bg-amber-500/10 text-white font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerQuiz(qIdx, optIdx)}
                              className={`w-full p-2.5 rounded-lg border text-xs text-left transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {showQuizResults && (
                        <div className={`p-3 rounded-lg text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300' : 'bg-red-950/40 border border-red-500/30 text-red-300'}`}>
                          <strong className="block mb-0.5">{isCorrect ? 'Correct!' : 'Incorrect'}</strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                {!showQuizResults ? (
                  <button
                    onClick={() => setShowQuizResults(true)}
                    disabled={Object.keys(quizAnswers).length < activeModule.quiz.length}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-semibold text-xs transition-colors"
                  >
                    Check Answers
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowQuizResults(false);
                      setQuizAnswers({});
                    }}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
                  >
                    Retry Quiz
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Practical Assignment */}
          {activeTab === 'assignment' && (
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-base font-bold text-zinc-100">{activeModule.practicalExercise.title}</h3>
                <span className="text-xs font-mono-cinema text-amber-400">FIELD DRILL</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Step-by-Step Instructions:</span>
                <ul className="space-y-2 text-xs text-zinc-300 list-decimal list-inside leading-relaxed">
                  {activeModule.practicalExercise.instructions.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-xs space-y-1">
                <span className="text-amber-400 font-semibold block">Target Deliverable:</span>
                <p className="text-zinc-300">{activeModule.practicalExercise.deliverable}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
