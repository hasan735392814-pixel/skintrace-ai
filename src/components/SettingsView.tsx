/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Lock, Download, Trash2, Globe, AlertTriangle, FileText, CheckCircle2, Server } from 'lucide-react';
import { Language } from '../types/skincare';
import { translations } from '../i18n/translations';
import { storageService } from '../services/storageService';

interface SettingsViewProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onDataReset: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  lang,
  onLanguageChange,
  onDataReset
}) => {
  const t = translations[lang];
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleExportData = () => {
    const backup = {
      app: 'SKINTRACE AI',
      exportDate: new Date().toISOString(),
      history: storageService.getHistory(),
      routines: storageService.getRoutines(),
      preferences: storageService.getPreferences(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skintrace_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleConfirmReset = () => {
    storageService.clearAllApplicationData();
    onDataReset();
    setShowResetConfirm(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left rtl:text-right">
      
      {/* Title */}
      <div className="border-b border-[#EAE3D6] pb-6 space-y-1">
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#16251E]">
          {t.settings.title}
        </h1>
        <p className="text-sm text-[#5C6961]">
          {t.settings.subtitle}
        </p>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-xl bg-[#E2EBE5] text-[#1B382B] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#2E5844]" />
          <span>All local application data has been successfully reset.</span>
        </div>
      )}

      {/* Demo Mode & Credit Guard Card */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E2EBE5] text-[#1B382B] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#1B382B]">
              {t.settings.unitGuardTitle}
            </h2>
            <p className="text-xs text-[#6F7B74]">
              Mandatory Hackathon Safeguard Active
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE4D8] space-y-1">
            <span className="text-[11px] text-[#717E77] block">Status</span>
            <span className="font-semibold text-xs text-[#2E5844] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2E5844]" />
              DEMO_MODE=true
            </span>
            <span className="text-[10px] text-[#86948C] block">Client & Server Protected</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE4D8] space-y-1">
            <span className="text-[11px] text-[#717E77] block">YouCam Bonus Credits</span>
            <span className="font-mono text-sm font-bold text-[#1B382B] tabular-nums block">
              40 / 40 UNITS SAFE
            </span>
            <span className="text-[10px] text-[#2E5844] block">0 Units Consumed</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE4D8] space-y-1">
            <span className="text-[11px] text-[#717E77] block">Execution Pipeline</span>
            <span className="font-semibold text-xs text-[#1B382B] block">
              100% In-Browser Local
            </span>
            <span className="text-[10px] text-[#86948C] block">Zero external HTTP calls</span>
          </div>
        </div>

        <p className="text-xs text-[#55625B] leading-relaxed">
          {t.settings.unitGuardDesc}
        </p>
      </div>

      {/* Official YouCam API Architecture Scaffold */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF1E3] text-[#7D5B28] flex items-center justify-center shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#1B382B]">
              {t.settings.youcamArchTitle}
            </h2>
            <p className="text-xs text-[#6F7B74]">
              {t.settings.endpointLabel}: <code>https://yce-api-01.makeupar.com/s2s/v2.0/task/skin-analysis</code>
            </p>
          </div>
        </div>

        <p className="text-xs text-[#525F58] leading-relaxed">
          {t.settings.youcamArchDesc}
        </p>

        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EBE3D7] space-y-2 text-xs font-mono text-[#38433D]">
          <div className="flex items-center justify-between text-[11px] text-[#697770]">
            <span>Future Real-Analysis Safety Checklist:</span>
            <span className="text-[#9B2C2C] font-semibold">[Currently Disabled by Default]</span>
          </div>
          <ul className="space-y-1 list-disc list-inside text-[#4B5851]">
            <li>Server environment variable <code>DEMO_MODE=false</code> explicitly configured</li>
            <li>Valid server secret <code>YOUCAM_API_KEY</code> loaded in process memory</li>
            <li>Explicit opt-in prompt alerting user that units will be consumed</li>
            <li>No automatic retries after ambiguous timeouts to prevent double billing</li>
          </ul>
        </div>
      </div>

      {/* Language Selector */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-[#1B382B]" />
          <h2 className="text-base font-semibold text-[#1B382B]">
            {t.settings.languageSectionTitle}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              lang === 'en'
                ? 'bg-[#1B382B] text-white shadow-xs font-semibold'
                : 'bg-[#F5F1E9] text-[#4E5A53] hover:bg-[#EAE3D6]'
            }`}
          >
            English (LTR)
          </button>
          <button
            onClick={() => onLanguageChange('ar')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              lang === 'ar'
                ? 'bg-[#1B382B] text-white shadow-xs font-semibold'
                : 'bg-[#F5F1E9] text-[#4E5A53] hover:bg-[#EAE3D6]'
            }`}
          >
            العربية (RTL)
          </button>
        </div>
      </div>

      {/* Local Storage & Data Privacy */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-[#1B382B]" />
          <h2 className="text-base font-semibold text-[#1B382B]">
            {t.settings.storageSectionTitle}
          </h2>
        </div>

        <p className="text-xs text-[#525F58] leading-relaxed">
          {t.settings.storageDesc}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-white border border-[#D9D0C3] rounded-xl text-xs font-medium text-[#2F3C35] hover:bg-[#FAF8F5] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.settings.exportData}</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 border border-[#DEC4C4] rounded-xl text-xs font-medium text-[#9B2C2C] hover:bg-[#FDF2F2] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.settings.resetDemoData}</span>
          </button>
        </div>
      </div>

      {/* Disclaimers & Legal Notice */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#1B382B]" />
          <h2 className="text-base font-semibold text-[#1B382B]">
            {t.settings.disclaimerSectionTitle}
          </h2>
        </div>

        <div className="space-y-3 text-xs text-[#5B6760] leading-relaxed">
          <p>{t.settings.disclaimerFull}</p>
          <p>{t.settings.privacyFull}</p>
        </div>

        <div className="pt-3 border-t border-[#F0EBE2] text-[11px] font-mono text-[#86948C]">
          {t.settings.versionInfo}
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] border border-[#E8DFD1] rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-left rtl:text-right">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FDF2F2] text-[#9B2C2C] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-[#1B382B]">
                Reset All Local Application Data?
              </h3>
            </div>
            <p className="text-xs text-[#5B6861] leading-relaxed">
              This will clear your saved skin scan history, daily routine checklists, and local preferences from this browser. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-[#DDD4C7] rounded-xl text-xs font-medium text-[#4D5A52] hover:bg-[#F0EBE2]"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-[#9B2C2C] text-white rounded-xl text-xs font-medium hover:bg-[#7D2323]"
              >
                {t.common.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
