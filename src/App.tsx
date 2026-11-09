import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilmmakingDashboard } from './components/journey/FilmmakingDashboard';
import { CurriculumBrowser } from './components/curriculum/CurriculumBrowser';
import { ColorGradingLab } from './components/labs/ColorGradingLab';
import { ShotFramingLab } from './components/labs/ShotFramingLab';
import { CameraMovementLab } from './components/labs/CameraMovementLab';
import { CutPointsLab } from './components/labs/CutPointsLab';
import { StorywritingLab } from './components/labs/StorywritingLab';
import { ProductionPlanner } from './components/labs/ProductionPlanner';

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'curriculum' | 'lab-color' | 'lab-framing' | 'lab-camera' | 'lab-editing' | 'lab-story' | 'lab-production'>('dashboard');

  // Completed modules stored in localStorage
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cineflow_completed_modules');
      return saved ? JSON.parse(saved) : ['storywriting']; // start with 1 completed as encouragement
    } catch {
      return ['storywriting'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cineflow_completed_modules', JSON.stringify(completedModules));
    } catch (e) {
      console.error(e);
    }
  }, [completedModules]);

  const handleToggleCompleteModule = (moduleId: string) => {
    setCompletedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const handleOpenLab = (labId: string) => {
    if (labId === 'color') setActiveView('lab-color');
    else if (labId === 'framing') setActiveView('lab-framing');
    else if (labId === 'camera') setActiveView('lab-camera');
    else if (labId === 'editing') setActiveView('lab-editing');
    else if (labId === 'story') setActiveView('lab-story');
    else if (labId === 'production') setActiveView('lab-production');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModule = (moduleId: string) => {
    setActiveView('curriculum');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Strict 3-Zone Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        completedCount={completedModules.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-12">
        {/* Render View Based on Active Tab */}
        {activeView === 'dashboard' && (
          <div className="space-y-14">
            <HeroSection
              onStartJourney={() => {
                setActiveView('curriculum');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenColorLab={() => {
                setActiveView('lab-color');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <FilmmakingDashboard
              completedModules={completedModules}
              onOpenModule={handleOpenModule}
              onOpenLab={handleOpenLab}
            />
          </div>
        )}

        {activeView === 'curriculum' && (
          <CurriculumBrowser
            onOpenLab={handleOpenLab}
            completedModules={completedModules}
            onToggleCompleteModule={handleToggleCompleteModule}
          />
        )}

        {activeView === 'lab-color' && <ColorGradingLab />}

        {activeView === 'lab-framing' && <ShotFramingLab />}

        {activeView === 'lab-camera' && <CameraMovementLab />}

        {activeView === 'lab-editing' && <CutPointsLab />}

        {activeView === 'lab-story' && <StorywritingLab />}

        {activeView === 'lab-production' && <ProductionPlanner />}
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 px-6 lg:px-8 py-8 mt-16 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-amber-500"></span>
            <span className="font-bold tracking-widest text-zinc-200 uppercase">CINEFLOW</span>
            <span className="text-zinc-600">·</span>
            <span>The Auteur's Filmmaking Academy & Creative Studio</span>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <span>Directing</span>
            <span>Cinematography</span>
            <span>Color Grading</span>
            <span>Sound & Montage</span>
          </div>

          <div className="text-zinc-400 text-right">
            24 FPS · 180° Shutter · Rec.709 Standard
          </div>
        </div>
      </footer>
    </div>
  );
}
