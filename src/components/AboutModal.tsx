/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Sparkles, ShieldCheck, ShoppingBag, Terminal } from 'lucide-react';
import { Language } from '../types/skincare';
import { translations } from '../i18n/translations';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-[#E8DFD1] text-[#1E2320] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-left rtl:text-right space-y-6 animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-1.5 rounded-full text-[#6E7B74] hover:text-[#1B382B] hover:bg-[#EDE7DE] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#EAE3D6] pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#1B382B] flex items-center justify-center text-[#D7C4A7]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-editorial text-2xl font-bold text-[#1B382B]">
              SKINTRACE AI
            </h2>
            <p className="text-xs text-[#6F7C75]">
              {t.about.hackathonTitle}
            </p>
          </div>
        </div>

        {/* Zero-Cost Safeguard Note */}
        <div className="p-4 rounded-2xl bg-[#EAF2ED] border border-[#CAD8CE] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1B382B]">
            <ShieldCheck className="w-4 h-4 text-[#2E5844]" />
            <span>{t.about.zeroCostPolicyTitle}</span>
          </div>
          <p className="text-xs text-[#395646] leading-relaxed">
            {t.about.zeroCostPolicyDesc}
          </p>
        </div>

        {/* Hackathon Narrative */}
        <div className="space-y-2 text-xs sm:text-sm text-[#46534C] leading-relaxed">
          <h3 className="font-semibold text-sm text-[#1B382B]">
            Problem & Solution Overview
          </h3>
          <p>
            {t.about.hackathonDesc}
          </p>
        </div>

        {/* Future eCommerce VTO Synergy */}
        <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E9DEC9] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6E5528]">
            <ShoppingBag className="w-4 h-4 text-[#9C7938]" />
            <span>{t.about.vtoSynergyTitle}</span>
          </div>
          <p className="text-xs text-[#5C4D2E] leading-relaxed">
            {t.about.vtoSynergyDesc}
          </p>
        </div>

        {/* Tech Stack & Architecture */}
        <div className="space-y-3 pt-2 border-t border-[#EAE3D6]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1B382B]">
            <Terminal className="w-4 h-4" />
            <span>{t.about.architectureOverview}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EFE9DF]">
              <span className="text-[10px] text-[#76847D] block">Framework</span>
              <span className="font-semibold text-[#1B382B]">React 19 + TypeScript</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EFE9DF]">
              <span className="text-[10px] text-[#76847D] block">Styling</span>
              <span className="font-semibold text-[#1B382B]">Tailwind CSS v4</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EFE9DF]">
              <span className="text-[10px] text-[#76847D] block">Charts</span>
              <span className="font-semibold text-[#1B382B]">Recharts Analytics</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EFE9DF]">
              <span className="text-[10px] text-[#76847D] block">I18n</span>
              <span className="font-semibold text-[#1B382B]">English & Arabic (RTL)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EFE9DF]">
              <span className="text-[10px] text-[#76847D] block">Backend</span>
              <span className="font-semibold text-[#1B382B]">Express Server Scaffold</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EFE9DF]">
              <span className="text-[10px] text-[#76847D] block">Target API</span>
              <span className="font-semibold text-[#1B382B]">Perfect Corp YouCam API</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#254A39] transition-colors cursor-pointer"
          >
            {t.common.close}
          </button>
        </div>

      </div>
    </div>
  );
};
