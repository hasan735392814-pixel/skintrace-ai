/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, BookmarkPlus, Check, Sparkles, Layers, Info, PlusCircle } from 'lucide-react';
import { SkinAnalysisResult, NavigationPage, Language } from '../types/skincare';
import { translations } from '../i18n/translations';

interface ResultsViewProps {
  result: SkinAnalysisResult;
  onSaveToJourney: (result: SkinAnalysisResult) => void;
  onAddRoutineStep: (title: string, category: 'treat' | 'moisturize' | 'protect', reason: string) => void;
  onNavigate: (page: NavigationPage) => void;
  lang: Language;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onSaveToJourney,
  onAddRoutineStep,
  onNavigate,
  lang
}) => {
  const t = translations[lang];
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [addedSteps, setAddedSteps] = useState<Record<string, boolean>>({});
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const handleSave = () => {
    onSaveToJourney(result);
    setIsSaved(true);
  };

  const handleAddStep = (title: string, categoryStr: string, reason: string) => {
    const category = categoryStr.toLowerCase().includes('protect') 
      ? 'protect' 
      : categoryStr.toLowerCase().includes('moistur') 
      ? 'moisturize' 
      : 'treat';
    onAddRoutineStep(title, category, reason);
    setAddedSteps(prev => ({ ...prev, [title]: true }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B382B] hover:text-[#2E5844] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t.results.backToDashboard}</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
              isSaved
                ? 'bg-[#E2EBE5] text-[#1B382B] cursor-default'
                : 'bg-[#1B382B] text-white hover:bg-[#254A39]'
            }`}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
            <span>{isSaved ? t.results.savedSuccess : t.results.saveToJourney}</span>
          </button>
        </div>
      </div>

      {/* YouCam v2.1 Integration & Mode Indicator Banner */}
      <div className={`p-4 rounded-2xl border text-left rtl:text-right flex items-start gap-3 transition-colors ${
        result.isRealApiResult 
          ? 'bg-[#EBF5EF] border-[#BFDDCB]' 
          : 'bg-[#F6F4EE] border-[#DDD5C7]'
      }`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
          result.isRealApiResult
            ? 'bg-[#1B382B] text-white'
            : 'bg-[#1B382B] text-[#D7C4A7]'
        }`}>
          {result.isRealApiResult ? '✓' : '!'}
        </div>
        <div className="space-y-1.5 text-xs flex-1">
          <div className="font-semibold text-[#1B382B] flex flex-wrap items-center gap-2">
            <span className={`font-mono text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
              result.isRealApiResult ? 'bg-[#1B382B]' : 'bg-[#705437]'
            }`}>
              {result.isRealApiResult ? 'YOUCAM API v2.1 LIVE' : 'DEMO DATA — SIMULATED'}
            </span>
            <span>
              {result.isRealApiResult ? 'Verified YouCam Skin Analysis Result' : t.common.simulatedResult}
            </span>
            <span className="font-mono text-[10px] bg-white text-[#1B382B] px-2 py-0.5 rounded border border-[#CCD8D0]">
              {result.isRealApiResult ? '1 Unit Billed' : '0 API Units Consumed (Safeguard Active)'}
            </span>
          </div>

          <p className="text-[#56625B] leading-relaxed">
            {result.isRealApiResult
              ? `Real-time biometric assessment processed through Perfect Corp YouCam Skin Analysis API v2.1. Task ID: ${result.youcamTaskId || 'unknown'}.`
              : t.results.simulatedAlert}
          </p>

          {!result.isRealApiResult && (
            <p className="text-[#717E77] text-[11px] italic">
              Notice: These scores are simulated demonstration data formatted to the official YouCam v2.1 API contract. They were not derived from analyzing the uploaded photo and do not represent actual biological skin measurements.
            </p>
          )}

          {/* Collapsible Telemetry / YouCam Specification Details */}
          <details className="mt-2 text-[11px] text-[#4A5750]">
            <summary className="cursor-pointer font-medium text-[#1B382B] hover:underline inline-flex items-center gap-1">
              <span>View YouCam Skin Analysis v2.1 API Telemetry & Payload Contract</span>
            </summary>
            <div className="mt-2 p-3 bg-white/80 rounded-xl border border-[#DDD5C7] font-mono text-[10px] space-y-1 text-[#2D3B33] overflow-x-auto">
              <div><span className="text-[#717E77]">Provider:</span> YouCam Skin AI v2.1 (Perfect Corp)</div>
              <div><span className="text-[#717E77]">Target Host:</span> https://yce-api-01.makeupar.com</div>
              <div><span className="text-[#717E77]">File Registration:</span> POST /s2s/v2.0/file (Binary PUT to presigned URL)</div>
              <div><span className="text-[#717E77]">Task Creation Endpoint:</span> POST /s2s/v2.1/task/skin-analysis (src_file_id, dst_actions)</div>
              <div><span className="text-[#717E77]">Task Polling Endpoint:</span> GET /s2s/v2.1/task/skin-analysis/{'{task_id}'}</div>
              <div><span className="text-[#717E77]">Task ID:</span> {result.youcamTaskId || 'yc21_demo_simulated_stream'}</div>
              <div><span className="text-[#717E77]">dst_actions Evaluated:</span> texture, pore, redness, spot, moisture, radiance, wrinkle, skin_age, skin_type</div>
              <div><span className="text-[#717E77]">Safe Shutter Status:</span> {result.isRealApiResult ? 'DISENGAGED (Live API Mode)' : 'ENGAGED (DEMO_MODE=true Safeguard)'}</div>
            </div>
          </details>
        </div>
      </div>

      {/* Hero Overview: Photo + Skin Map & High-Level Indices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Face Map with Interactive Overlays */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-5 shadow-xs space-y-4 text-left rtl:text-right">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#68766E]">
                {t.results.interactiveMapTitle}
              </span>
              <button
                onClick={() => setShowOverlays(!showOverlays)}
                className="text-xs text-[#1B382B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{showOverlays ? t.results.hideOverlays : t.results.showOverlays}</span>
              </button>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#E8E2D7] bg-[#F7F4EE]">
              <img
                src={result.imageUrl}
                alt="Analyzed portrait preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Interactive Target Markers */}
              {showOverlays && result.metrics.flatMap(m => m.overlayPoints).map((pt, i) => {
                const isSelected = activeMarker === pt.label;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveMarker(isSelected ? null : pt.label)}
                    style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B382B] text-[#D7C4A7] ring-4 ring-white scale-125 z-20'
                        : 'bg-white/85 text-[#1B382B] hover:scale-110 shadow-md ring-1 ring-black/10 z-10'
                    }`}
                    title={pt.label}
                  >
                    <span className="text-[10px] font-bold">{i + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Active marker label callout */}
            {activeMarker ? (
              <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E8DFD1] text-xs text-[#2F3933] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#1B382B] shrink-0" />
                <span>Target Focus: <strong>{activeMarker}</strong></span>
              </div>
            ) : (
              <p className="text-[11px] text-[#717E77] italic text-center">
                {t.results.interactiveMapDesc}
              </p>
            )}
          </div>
        </div>

        {/* Right: Synthesis Scoreboard */}
        <div className="lg:col-span-7 space-y-6 text-left rtl:text-right">
          
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0EBE2] pb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#6A7870]">
                  Overall Cosmetic Health
                </span>
                <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#1B382B] tracking-tight tabular-nums mt-1">
                  {result.overallScore}
                  <span className="text-xl font-normal text-[#8E9B93]"> / 100</span>
                </h1>
              </div>

              <div className="text-left rtl:text-right sm:text-right sm:rtl:text-left space-y-1">
                <span className="text-xs text-[#6F7B74] block">{t.results.skinType}</span>
                <span className="text-lg font-semibold text-[#1B382B]">{result.skinType}</span>
                <span className="text-[11px] text-[#76837C] block">Optimal barrier balance</span>
              </div>
            </div>

            {/* Sub-indices */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#EAE3D6] space-y-1">
                <span className="text-xs text-[#67736C]">{t.results.hydration}</span>
                <div className="text-2xl font-bold text-[#1B382B] tabular-nums font-editorial">
                  {result.hydrationLevel}%
                </div>
                <span className="text-[11px] text-[#2E5844]">High water retention</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#EAE3D6] space-y-1">
                <span className="text-xs text-[#67736C]">{t.results.radiance}</span>
                <div className="text-2xl font-bold text-[#1B382B] tabular-nums font-editorial">
                  {result.radianceIndex}%
                </div>
                <span className="text-[11px] text-[#2E5844]">Tranquil light reflection</span>
              </div>
            </div>

            {/* Synthesis narrative */}
            <div className="space-y-2 text-xs sm:text-sm text-[#455049] leading-relaxed">
              <p className="font-semibold text-[#1B382B]">Dermal Synthesis Summary</p>
              <p>{result.summary}</p>
            </div>
          </div>

        </div>

      </div>

      {/* Detailed 5-Category Breakdown */}
      <section className="space-y-6 text-left rtl:text-right">
        <div className="space-y-1">
          <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#16251E]">
            {t.results.metricsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6B64]">
            Evaluated against balanced, healthy cosmetic reference baselines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.metrics.map(metric => (
            <div
              key={metric.id}
              className="bg-white border border-[#E8E1D5] rounded-2xl p-6 shadow-xs hover:border-[#CAD8CE] transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base text-[#1B382B]">
                  {metric.name}
                </h3>
                <span className="font-editorial font-bold text-xl text-[#1B382B] tabular-nums">
                  {metric.score}%
                </span>
              </div>

              <div className="w-full bg-[#E5ECE7] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1B382B] h-full rounded-full transition-all duration-500"
                  style={{ width: `${metric.score}%` }}
                />
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-medium text-[#2E3932]">{metric.headline}</p>
                <p className="text-[#64716A] leading-relaxed">{metric.description}</p>
              </div>

              <div className="pt-2 border-t border-[#F2ECE2] text-xs text-[#2A4436] bg-[#F5F8F6] p-3 rounded-xl leading-relaxed">
                <strong>Gentle Care: </strong>
                <span>{metric.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Routine Recommendations Action Box */}
      <section className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 text-left rtl:text-right">
        <div className="space-y-1">
          <h2 className="font-editorial text-2xl text-[#1B382B]">
            {t.results.routineRecommendations}
          </h2>
          <p className="text-xs text-[#637069]">
            Targeted routine additions to complement today's simulated findings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.suggestedRoutineSteps.map((step, idx) => {
            const isAdded = addedSteps[step.title];
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-[#E7E0D4] bg-[#FAF8F5] flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A8780]">
                    {step.productCategory}
                  </span>
                  <p className="font-semibold text-sm text-[#1B382B]">{step.title}</p>
                  <p className="text-xs text-[#5D6B63]">{step.reason}</p>
                </div>

                <button
                  onClick={() => handleAddStep(step.title, step.productCategory, step.reason)}
                  disabled={isAdded}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 flex items-center gap-1 cursor-pointer ${
                    isAdded
                      ? 'bg-[#E2EBE5] text-[#1B382B]'
                      : 'bg-[#1B382B] text-white hover:bg-[#254A39]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.results.stepAdded}</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{t.results.addStepToRoutine}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Non-Medical Advisory Box */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DDD0] text-center text-xs text-[#717E77] leading-relaxed">
        <Info className="w-4 h-4 inline-block mr-1 text-[#1B382B] align-text-bottom" />
        {t.common.medicalDisclaimer}
      </div>

    </div>
  );
};
