/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationPage, Language, SkinAnalysisResult, RoutineStep } from './types/skincare';
import { storageService, SAMPLE_DEMO_SCANS } from './services/storageService';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { DashboardView } from './components/DashboardView';
import { AnalysisView } from './components/AnalysisView';
import { ResultsView } from './components/ResultsView';
import { JourneyView } from './components/JourneyView';
import { RoutineView } from './components/RoutineView';
import { SettingsView } from './components/SettingsView';
import { AboutModal } from './components/AboutModal';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    return storageService.getPreferences().language || 'en';
  });

  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [history, setHistory] = useState<SkinAnalysisResult[]>(() => storageService.getHistory());
  const [routines, setRoutines] = useState<RoutineStep[]>(() => storageService.getRoutines());
  const [activeResult, setActiveResult] = useState<SkinAnalysisResult | null>(() => {
    const hist = storageService.getHistory();
    return hist.length > 0 ? hist[0] : null;
  });
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  // Sync RTL / LTR document attributes when language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    storageService.savePreferences({ language: newLang });
  };

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (newResult: SkinAnalysisResult) => {
    setActiveResult(newResult);
    setCurrentPage('results');
  };

  const handleSaveToJourney = (resultToSave: SkinAnalysisResult) => {
    const updated = storageService.saveAnalysis(resultToSave);
    setHistory(updated);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = storageService.deleteAnalysis(id);
    setHistory(updated);
    if (activeResult?.id === id) {
      setActiveResult(updated.length > 0 ? updated[0] : null);
    }
  };

  const handleClearAllHistory = () => {
    storageService.clearHistory();
    setHistory([]);
    setActiveResult(null);
  };

  const handleLoadDemoHistory = () => {
    const demoScans = storageService.loadCuratedDemoData();
    setHistory(demoScans);
    setActiveResult(demoScans[0]);
  };

  const handleToggleRoutineStep = (id: string, timeOfDay: 'morning' | 'evening') => {
    const updated = storageService.toggleStepCompletion(id, timeOfDay);
    setRoutines(updated);
  };

  const handleAddRoutineStep = (step: Omit<RoutineStep, 'id' | 'completedMorning' | 'completedEvening'>) => {
    const updated = storageService.addRoutineStep(step);
    setRoutines(updated);
  };

  const handleDeleteRoutineStep = (id: string) => {
    const updated = storageService.deleteRoutineStep(id);
    setRoutines(updated);
  };

  const handleAddStepFromAnalysis = (title: string, category: 'treat' | 'moisturize' | 'protect', reason: string) => {
    const updated = storageService.addRoutineStep({
      title,
      category,
      timeOfDay: category === 'protect' ? 'morning' : 'both',
      notes: reason,
      productName: 'Recommended from Cosmetic Assessment'
    });
    setRoutines(updated);
  };

  const handleDataReset = () => {
    setHistory([]);
    setRoutines([]);
    setActiveResult(null);
    setCurrentPage('dashboard');
  };

  const latestScan = history.length > 0 ? history[0] : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2320] flex flex-col font-sans selection:bg-[#E2EBE5] selection:text-[#1B382B]">
      
      {/* 1. Mandatory Top Demo Safe Indicator */}
      <DemoBanner lang={lang} />

      {/* 2. Top Bar Nav (Adhering strictly to Top Bar Contract) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenAbout={() => setAboutModalOpen(true)}
      />

      {/* 3. Main Views */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingView
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardView
            latestScan={latestScan}
            history={history}
            routines={routines}
            onNavigate={handleNavigate}
            onSelectScan={(scan) => {
              setActiveResult(scan);
              handleNavigate('results');
            }}
            onLoadStarterData={handleLoadDemoHistory}
            lang={lang}
          />
        )}

        {currentPage === 'analyze' && (
          <AnalysisView
            onAnalysisComplete={handleAnalysisComplete}
            lang={lang}
          />
        )}

        {currentPage === 'results' && activeResult && (
          <ResultsView
            result={activeResult}
            onSaveToJourney={handleSaveToJourney}
            onAddRoutineStep={handleAddStepFromAnalysis}
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentPage === 'journey' && (
          <JourneyView
            history={history}
            onDeleteEntry={handleDeleteEntry}
            onClearAll={handleClearAllHistory}
            onLoadDemoHistory={handleLoadDemoHistory}
            onSelectScan={(scan) => {
              setActiveResult(scan);
              handleNavigate('results');
            }}
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentPage === 'routine' && (
          <RoutineView
            routines={routines}
            onToggleStep={handleToggleRoutineStep}
            onAddStep={handleAddRoutineStep}
            onDeleteStep={handleDeleteRoutineStep}
            lang={lang}
          />
        )}

        {currentPage === 'settings' && (
          <SettingsView
            lang={lang}
            onLanguageChange={handleLanguageChange}
            onDataReset={handleDataReset}
          />
        )}
      </main>

      {/* 4. Hackathon About & Safety Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
