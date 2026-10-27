/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Trash2, AlertTriangle, Calendar, RefreshCw, Sparkles, Eye } from 'lucide-react';
import { SkinAnalysisResult, NavigationPage, Language } from '../types/skincare';
import { translations } from '../i18n/translations';

interface JourneyViewProps {
  history: SkinAnalysisResult[];
  onDeleteEntry: (id: string) => void;
  onClearAll: () => void;
  onLoadDemoHistory: () => void;
  onSelectScan: (scan: SkinAnalysisResult) => void;
  onNavigate: (page: NavigationPage) => void;
  lang: Language;
}

export const JourneyView: React.FC<JourneyViewProps> = ({
  history,
  onDeleteEntry,
  onClearAll,
  onLoadDemoHistory,
  onSelectScan,
  onNavigate,
  lang
}) => {
  const t = translations[lang];
  const [activeMetricFilter, setActiveMetricFilter] = useState<'overall' | 'texture' | 'pores' | 'redness' | 'tone' | 'spots'>('overall');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

  // Prepare chart dataset chronologically (oldest to newest)
  const chartData = [...history]
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((item, idx) => {
      const textureMetric = item.metrics.find(m => m.id === 'texture')?.score || item.overallScore;
      const poresMetric = item.metrics.find(m => m.id === 'pores')?.score || item.overallScore;
      const rednessMetric = item.metrics.find(m => m.id === 'redness')?.score || item.overallScore;
      const toneMetric = item.metrics.find(m => m.id === 'unevenTone')?.score || item.overallScore;
      const spotsMetric = item.metrics.find(m => m.id === 'spots')?.score || item.overallScore;

      return {
        label: item.dateFormatted || `Scan ${idx + 1}`,
        overall: item.overallScore,
        texture: textureMetric,
        pores: poresMetric,
        redness: rednessMetric,
        tone: toneMetric,
        spots: spotsMetric,
        hydration: item.hydrationLevel,
        radiance: item.radianceIndex,
      };
    });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-6">
        <div className="space-y-1 text-left rtl:text-right">
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#16251E]">
            {t.journey.title}
          </h1>
          <p className="text-sm text-[#5B6760]">
            {t.journey.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {history.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-3.5 py-2 rounded-xl border border-[#DEC4C4] text-xs font-medium text-[#9B2C2C] hover:bg-[#FDF2F2] transition-colors cursor-pointer"
            >
              {t.journey.clearAll}
            </button>
          )}

          <button
            onClick={() => onNavigate('analyze')}
            className="px-4 py-2 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#254A39] transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D7C4A7]" />
            <span>{t.nav.startScan}</span>
          </button>
        </div>
      </div>

      {/* Progress Chart Container */}
      {history.length >= 2 ? (
        <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 text-left rtl:text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0ECE3] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6A766F]">
                {t.journey.chartTitle}
              </span>
              <h2 className="text-lg font-semibold text-[#1B382B]">
                Longitudinal Health Trajectory
              </h2>
            </div>

            {/* Metric Segmented Control */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F5F1E9] rounded-xl text-xs font-medium">
              {[
                { id: 'overall', label: t.journey.allMetrics },
                { id: 'texture', label: t.results.textureName },
                { id: 'pores', label: t.results.poresName },
                { id: 'redness', label: t.results.rednessName },
                { id: 'tone', label: t.results.toneName },
                { id: 'spots', label: t.results.spotsName },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMetricFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeMetricFilter === tab.id
                      ? 'bg-white text-[#1B382B] shadow-xs font-semibold'
                      : 'text-[#616E67] hover:text-[#1B382B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE7DC" vertical={false} />
                <XAxis dataKey="label" stroke="#87958D" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#87958D" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FAF8F5',
                    borderColor: '#DDD4C7',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#1B382B'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={activeMetricFilter}
                  stroke="#1B382B"
                  strokeWidth={2.5}
                  dot={{ fill: '#1B382B', r: 4 }}
                  activeDot={{ r: 6, fill: '#D7C4A7', stroke: '#1B382B', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-[#717E77] italic text-center">
            Notice: Trend chart reflects simulated demo milestones. These data points demonstrate longitudinal visualization and do not reflect real biological skin changes.
          </p>
        </div>
      ) : null}

      {/* Timeline of Records */}
      <div className="space-y-4 text-left rtl:text-right">
        <div className="flex items-center gap-2">
          <h2 className="font-editorial text-2xl text-[#1B382B]">
            {t.journey.historyTimeline} ({history.length})
          </h2>
          <span className="text-[10px] font-mono bg-[#EAE2D5] text-[#1B382B] px-2 py-0.5 rounded">
            DEMO DATA
          </span>
        </div>

        {history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map(item => (
              <div
                key={item.id}
                className="bg-white border border-[#E8E1D5] rounded-2xl overflow-hidden shadow-xs hover:border-[#CAD8CE] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 bg-[#F0EBE2] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt="Skin analysis preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-mono font-medium">
                      DEMO DATA (SIMULATED)
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 text-[#1B382B] text-xs font-bold px-2.5 py-0.5 rounded-md font-editorial tabular-nums shadow-xs">
                      {item.overallScore} / 100
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#6F7C75]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.dateFormatted}</span>
                      </span>
                      <span className="font-medium text-[#1B382B]">{item.skinType}</span>
                    </div>

                    <p className="text-xs text-[#4F5B54] line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F2ECE3] text-center text-xs">
                      <div className="bg-[#FAF9F5] p-2 rounded-lg">
                        <span className="text-[10px] text-[#717E77] block">Texture</span>
                        <span className="font-semibold text-[#1B382B] tabular-nums">
                          {item.metrics.find(m => m.id === 'texture')?.score || item.overallScore}%
                        </span>
                      </div>
                      <div className="bg-[#FAF9F5] p-2 rounded-lg">
                        <span className="text-[10px] text-[#717E77] block">Redness</span>
                        <span className="font-semibold text-[#1B382B] tabular-nums">
                          {item.metrics.find(m => m.id === 'redness')?.score || item.overallScore}%
                        </span>
                      </div>
                      <div className="bg-[#FAF9F5] p-2 rounded-lg">
                        <span className="text-[10px] text-[#717E77] block">Tone</span>
                        <span className="font-semibold text-[#1B382B] tabular-nums">
                          {item.metrics.find(m => m.id === 'unevenTone')?.score || item.overallScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF9F6] border-t border-[#EDE6DC] flex items-center justify-between">
                  <button
                    onClick={() => {
                      onSelectScan(item);
                      onNavigate('results');
                    }}
                    className="text-xs font-semibold text-[#1B382B] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Report</span>
                  </button>

                  <button
                    onClick={() => setEntryToDelete(item.id)}
                    className="text-xs text-[#9B2C2C] hover:text-[#7A1E1E] p-1.5 rounded-lg hover:bg-[#FCE8E8] transition-colors cursor-pointer"
                    title={t.journey.deleteEntry}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-12 text-center space-y-4">
            <h3 className="text-lg font-semibold text-[#1B382B]">
              {t.journey.emptyJourneyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#6C7971] max-w-md mx-auto">
              {t.journey.emptyJourneyDesc}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('analyze')}
                className="px-5 py-2.5 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#254A39]"
              >
                {t.journey.startFirstScan}
              </button>
              <button
                onClick={onLoadDemoHistory}
                className="px-4 py-2.5 bg-white border border-[#D9D0C3] text-[#344039] rounded-xl text-xs font-medium hover:bg-[#F5EFE6] flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.journey.loadDemoHistory}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal: Delete Single Entry */}
      {entryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] border border-[#E8DFD1] rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FDF2F2] text-[#9B2C2C] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-base text-[#1B382B]">
              {t.journey.deleteConfirm}
            </h3>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setEntryToDelete(null)}
                className="px-4 py-2 border border-[#DDD4C7] rounded-xl text-xs font-medium text-[#4D5A52] hover:bg-[#F0EBE2]"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={() => {
                  onDeleteEntry(entryToDelete);
                  setEntryToDelete(null);
                }}
                className="px-4 py-2 bg-[#9B2C2C] text-white rounded-xl text-xs font-medium hover:bg-[#7D2323]"
              >
                {t.common.delete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Clear Entire Journey */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] border border-[#E8DFD1] rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-left rtl:text-right">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FDF2F2] text-[#9B2C2C] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-[#1B382B]">
                {t.journey.clearAllConfirm}
              </h3>
            </div>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              {t.journey.clearAllWarning}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 border border-[#DDD4C7] rounded-xl text-xs font-medium text-[#4D5A52] hover:bg-[#F0EBE2]"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 bg-[#9B2C2C] text-white rounded-xl text-xs font-medium hover:bg-[#7D2323]"
              >
                {t.journey.clearAll}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
