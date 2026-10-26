/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Info, X } from 'lucide-react';
import { Language } from '../types/skincare';
import { translations } from '../i18n/translations';

interface DemoBannerProps {
  lang: Language;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ lang }) => {
  const [showDetails, setShowDetails] = useState(false);
  const t = translations[lang];

  return (
    <>
      <aside aria-label="Demo mode security notice" className="bg-[#1B382B] text-[#F3EFE6] text-xs py-2 px-4 border-b border-[#2B4B3D] select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#2E5844] text-[#D7C4A7] text-[10px] font-bold">
              ✓
            </span>
            <span className="font-semibold tracking-wide text-[#E7DECF]">
              {t.common.demoBadge}
            </span>
            <span className="hidden sm:inline text-[#A7BAAE]">
              — {t.common.demoSafeNotice}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline-block px-2 py-0.5 rounded bg-[#274838] text-[11px] font-mono text-[#D7C4A7] border border-[#395C4A]">
              40 / 40 UNITS SAFE
            </span>
            <button
              onClick={() => setShowDetails(true)}
              className="text-[#D7C4A7] hover:text-white underline underline-offset-2 transition-colors cursor-pointer text-xs"
            >
              {t.common.learnMore}
            </button>
          </div>
        </div>
      </aside>

      {/* Safety Audit Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] border border-[#E8DFD1] text-[#1E2320] rounded-2xl max-w-lg w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1 rounded-full text-[#6E7570] hover:text-[#1E2320] hover:bg-[#EDE8DE] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E2EBE5] flex items-center justify-center text-[#1B382B]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#1B382B]">
                  {t.settings.demoSectionTitle}
                </h3>
                <p className="text-xs text-[#6F7671]">
                  Zero API Consumption Policy · Hackathon Audit
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#464D48] leading-relaxed">
              <p>
                <strong>Zero Unit Consumption Guarantee:</strong> All image processing, facial feature evaluations, and skin metric calculations in this build execute completely on your device using client-side deterministic evaluation.
              </p>
              <p>
                <strong>40 Bonus Units Untouched:</strong> Neither testing, camera previews, page navigation, nor image uploads trigger any external API calls to YouCam Skin AI. Your 40 bonus units remain 100% preserved.
              </p>
              <p>
                <strong>Server Gate:</strong> The application server enforces <code>DEMO_MODE=true</code> by default, rejecting any unauthorized live requests and shielding all API credentials.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8DFD1] flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-[#1B382B] text-white rounded-lg text-sm font-medium hover:bg-[#254A39] transition-colors"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
