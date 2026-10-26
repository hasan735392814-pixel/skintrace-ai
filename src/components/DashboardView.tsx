/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, CheckCircle2, Calendar, RefreshCw, Eye, Sun, Moon } from 'lucide-react';
import { SkinAnalysisResult, RoutineStep, NavigationPage, Language } from '../types/skincare';
import { translations } from '../i18n/translations';

interface DashboardViewProps {
  latestScan: SkinAnalysisResult | null;
  history: SkinAnalysisResult[];
  routines: RoutineStep[];
  onNavigate: (page: NavigationPage) => void;
  onSelectScan: (scan: SkinAnalysisResult) => void;
  onLoadStarterData: () => void;
  lang: Language;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  latestScan,
  history,
  routines,
  onNavigate,
  onSelectScan,
  onLoadStarterData,
  lang
}) => {
  const t = translations[lang];

  // Accurate breakdown of Morning vs Evening routine steps
  const morningSteps = routines.filter(r => r.timeOfDay === 'morning' || r.timeOfDay === 'both');
  const completedMorning = morningSteps.filter(r => r.completedMorning).length;

  const eveningSteps = routines.filter(r => r.timeOfDay === 'evening' || r.timeOfDay === 'both');
  const completedEvening = eveningSteps.filter(r => r.completedEvening).length;

  const totalDailyTasks = morningSteps.length + eveningSteps.length;
  const completedDailyTasks = completedMorning + completedEvening;
  const routinePercent = totalDailyTasks > 0 ? Math.round((completedDailyTasks / totalDailyTasks) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE4D8] pb-6">
        <div className="space-y-1 text-left rtl:text-right">
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#16251E]">
            {t.dashboard.welcome}
          </h1>
          <p className="text-sm text-[#5C6861]">
            {t.dashboard.welcomeSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('analyze')}
            className="px-5 py-2.5 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#254A39] transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D7C4A7]" />
            <span>{t.dashboard.quickScanCta}</span>
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Latest Scan Synthesis */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs text-left rtl:text-right space-y-6">
            <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#68766E]">
                    {t.dashboard.latestScanTitle}
                  </span>
                  <span className="text-[10px] font-mono bg-[#F2ECE1] text-[#1B382B] px-2 py-0.5 rounded border border-[#E3D9CC]">
                    DEMO DATA
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-[#1B382B]">
                  {latestScan ? `Milestone: ${latestScan.dateFormatted}` : t.dashboard.noScansTitle}
                </h2>
              </div>

              {latestScan && (
                <button
                  onClick={() => {
                    onSelectScan(latestScan);
                    onNavigate('results');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B382B] hover:text-[#2E5844] underline underline-offset-4 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.dashboard.viewFullAnalysis}</span>
                </button>
              )}
            </div>

            {latestScan ? (
              <div className="space-y-6">
                {/* Score & Key Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#EAE3D6] space-y-1">
                    <span className="text-xs text-[#6A766F]">{t.dashboard.overallSkinIndex}</span>
                    <div className="text-3xl font-editorial font-bold text-[#1B382B] tabular-nums">
                      {latestScan.overallScore}
                      <span className="text-sm font-normal text-[#8A968E]">/100</span>
                    </div>
                    <span className="text-[11px] font-medium text-[#2E5844] block">
                      {t.common.optimal}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#EAE3D6] space-y-1">
                    <span className="text-xs text-[#6A766F]">{t.results.skinType}</span>
                    <div className="text-xl font-semibold text-[#1B382B] mt-1">
                      {latestScan.skinType}
                    </div>
                    <span className="text-[11px] text-[#717E76] block">Observed profile</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#EAE3D6] space-y-1">
                    <span className="text-xs text-[#6A766F]">{t.dashboard.hydrationLevel}</span>
                    <div className="text-3xl font-editorial font-bold text-[#1B382B] tabular-nums">
                      {latestScan.hydrationLevel}%
                    </div>
                    <span className="text-[11px] text-[#2E5844] block">Surface hydration</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#EAE3D6] space-y-1">
                    <span className="text-xs text-[#6A766F]">{t.dashboard.radianceLevel}</span>
                    <div className="text-3xl font-editorial font-bold text-[#1B382B] tabular-nums">
                      {latestScan.radianceIndex}%
                    </div>
                    <span className="text-[11px] text-[#2E5844] block">Light reflection</span>
                  </div>

                </div>

                {/* Metric Bars */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold text-[#4A554E] block">
                    Observed Metric Distribution (Demo Data)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {latestScan.metrics.map(metric => (
                      <div key={metric.id} className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EFE9DF] space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-[#2E3732]">{metric.name}</span>
                          <span className="font-mono text-[#1B382B] font-semibold tabular-nums">{metric.score}%</span>
                        </div>
                        <div className="w-full bg-[#E5ECE7] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#1B382B] transition-all duration-500"
                            style={{ width: `${metric.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary quote */}
                <div className="p-4 rounded-2xl bg-[#F0F5F2] border border-[#D5E2D9] text-xs text-[#2A4537] leading-relaxed">
                  <p className="font-medium mb-1">Cosmetic Observation Summary:</p>
                  <p>{latestScan.summary}</p>
                </div>
              </div>
            ) : (
              /* Empty state */
              <div className="py-12 text-center space-y-4">
                <p className="text-sm text-[#6C7971]">
                  {t.dashboard.noScansDesc}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => onNavigate('analyze')}
                    className="px-4 py-2 bg-[#1B382B] text-white rounded-xl text-xs font-medium hover:bg-[#254A39]"
                  >
                    {t.nav.startScan}
                  </button>
                  <button
                    onClick={onLoadStarterData}
                    className="px-4 py-2 bg-white border border-[#D6CDC0] text-[#344139] rounded-xl text-xs font-medium hover:bg-[#F7F2EB] flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t.dashboard.loadStarterData}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Daily Ritual Status & Quick History */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Daily Ritual Card with Exact Morning/Evening Breakdown */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 shadow-xs text-left rtl:text-right space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#68766E]">
                {t.dashboard.routineTitle}
              </span>
              <button
                onClick={() => onNavigate('routine')}
                className="text-xs font-semibold text-[#1B382B] hover:underline"
              >
                {t.dashboard.routineGoTo}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#E7E2D8]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#1B382B]"
                    strokeDasharray={`${routinePercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-editorial font-bold text-sm text-[#1B382B] tabular-nums">
                  {routinePercent}%
                </span>
              </div>

              <div>
                <div className="text-base font-semibold text-[#1B382B]">
                  {completedDailyTasks} of {totalDailyTasks} {t.dashboard.routineCompleted}
                </div>
                <div className="flex items-center gap-3 text-xs text-[#637068] mt-1 font-mono">
                  <span className="flex items-center gap-1">
                    <Sun className="w-3 h-3 text-[#C5A880]" />
                    AM: {completedMorning}/{morningSteps.length}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Moon className="w-3 h-3 text-[#4A6456]" />
                    PM: {completedEvening}/{eveningSteps.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#F2ECE1]">
              {routines.slice(0, 4).map(step => {
                const isAm = step.timeOfDay === 'morning' || step.timeOfDay === 'both';
                const isPm = step.timeOfDay === 'evening' || step.timeOfDay === 'both';
                const isFullyDone = (isAm ? step.completedMorning : true) && (isPm ? step.completedEvening : true);

                return (
                  <div
                    key={step.id}
                    className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-[#FAF8F5] border border-[#EFEBE3]"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] text-[#717E77] font-mono">
                        {step.timeOfDay === 'both' ? 'AM/PM' : step.timeOfDay.toUpperCase()}
                      </span>
                      <span className={`font-medium truncate ${isFullyDone ? 'line-through text-[#8F9A92]' : 'text-[#35403A]'}`}>
                        {step.title}
                      </span>
                    </div>
                    {isFullyDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#2E5844] shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#D4DFD7] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick History Milestones */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 shadow-xs text-left rtl:text-right space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#68766E]">
                {t.journey.historyTimeline}
              </span>
              <button
                onClick={() => onNavigate('journey')}
                className="text-xs font-semibold text-[#1B382B] hover:underline"
              >
                View All ({history.length})
              </button>
            </div>

            <div className="space-y-3">
              {history.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectScan(item);
                    onNavigate('results');
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-[#EFEAE2] hover:bg-[#FAF8F5] transition-colors cursor-pointer group"
                >
                  <img
                    src={item.imageUrl}
                    alt="Scan thumbnail"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-lg object-cover bg-[#E9E3D8] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#25312B] truncate group-hover:text-[#1B382B]">
                      {item.dateFormatted}
                    </p>
                    <p className="text-[11px] text-[#6E7B73]">
                      Vitality: {item.overallScore}/100 · {item.skinType}
                    </p>
                  </div>
                  <Eye className="w-4 h-4 text-[#98A59D] group-hover:text-[#1B382B] transition-transform" />
                </div>
              ))}

              {history.length === 0 && (
                <p className="text-xs text-[#7A877F] italic text-center py-2">
                  No scan history recorded.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
