/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Calendar, Lock } from 'lucide-react';
import { NavigationPage, Language } from '../types/skincare';
import { translations } from '../i18n/translations';

interface LandingViewProps {
  onNavigate: (page: NavigationPage) => void;
  lang: Language;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left rtl:text-right">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1B382B]">
              <span className="w-2 h-2 rounded-full bg-[#1B382B]" />
              <span>{t.landing.heroKicker}</span>
              <span aria-hidden="true" className="text-[#A5AFA8]">·</span>
              <span className="text-[#64726A]">Hackathon Edition</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#16251E] leading-[1.08] text-balance">
              {t.landing.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-[#4E5A53] max-w-xl leading-relaxed font-normal">
              {t.landing.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('analyze')}
                className="px-6 py-3.5 bg-[#1B382B] text-white rounded-xl font-medium text-sm hover:bg-[#254A39] transition-all shadow-xs flex items-center gap-2 group cursor-pointer"
              >
                <span>{t.landing.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3.5 bg-white border border-[#D9D0C3] text-[#24332B] rounded-xl font-medium text-sm hover:bg-[#F5EFE6] transition-colors cursor-pointer"
              >
                {t.landing.ctaSecondary}
              </button>
            </div>

            <div className="pt-4 flex items-center gap-2 text-xs text-[#6B7870]">
              <ShieldCheck className="w-4 h-4 text-[#1B382B] shrink-0" />
              <span>{t.landing.guaranteeText}</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Editorial Hero Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E9E1D5] bg-[#EBE5DB]">
              <img
                src="/src/assets/images/hero_skincare_portrait_1793037795462.jpg"
                alt="Portrait with luminous, natural skin"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] object-cover object-center"
              />
              
              {/* Subtle glass reflection card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-white/60 p-4 rounded-2xl shadow-sm text-left rtl:text-right">
                <div className="flex items-center justify-between text-xs text-[#525E57] mb-1">
                  <span className="font-mono text-[10px] bg-[#FAF8F5] text-[#1B382B] px-1.5 py-0.5 rounded border border-[#E0D8CB]">
                    SIMULATED DEMO DATA
                  </span>
                  <span className="font-semibold text-[#1B382B] tabular-nums">94% Surface Hydration</span>
                </div>
                <div className="w-full bg-[#E5ECE7] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#1B382B] h-full rounded-full" style={{ width: '94%' }} />
                </div>
                <p className="text-[11px] text-[#717E76] mt-2 italic">
                  Illustrative cosmetic tracking demonstration. Does not represent medical measurement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#16251E]">
            {t.landing.featuresTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#525F57]">
            {t.landing.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-[#E8E1D5] rounded-2xl p-7 shadow-xs hover:border-[#CAD8CE] transition-colors text-left rtl:text-right space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#EAF2ED] text-[#1B382B] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#1B382B]">
              {t.landing.f1Title}
            </h3>
            <p className="text-sm text-[#505D55] leading-relaxed">
              {t.landing.f1Desc}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E8E1D5] rounded-2xl p-7 shadow-xs hover:border-[#CAD8CE] transition-colors text-left rtl:text-right space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#EAF2ED] text-[#1B382B] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#1B382B]">
              {t.landing.f2Title}
            </h3>
            <p className="text-sm text-[#505D55] leading-relaxed">
              {t.landing.f2Desc}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E8E1D5] rounded-2xl p-7 shadow-xs hover:border-[#CAD8CE] transition-colors text-left rtl:text-right space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#EAF2ED] text-[#1B382B] flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#1B382B]">
              {t.landing.f3Title}
            </h3>
            <p className="text-sm text-[#505D55] leading-relaxed">
              {t.landing.f3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Zero Consumption Safeguard & Privacy Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B382B] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D7C4A7]">
              <span>[ Zero-Consumption Architecture ]</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#FAF7F2]">
              {t.landing.zeroCostTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#D4DDD7] leading-relaxed">
              {t.landing.zeroCostDesc}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('settings')}
                className="px-5 py-2.5 bg-[#FAF8F5] text-[#1B382B] rounded-xl text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
              >
                Inspect Safety Architecture
              </button>
              <div className="flex items-center gap-2 text-xs text-[#CAD8CE]">
                <Lock className="w-4 h-4 text-[#D7C4A7]" />
                <span>{t.landing.privacyBannerTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Non-Medical Disclaimer Footer Callout */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-[#707C74] space-y-2 border-t border-[#E8DFD1] pt-8">
        <p className="max-w-2xl mx-auto leading-relaxed">
          {t.common.medicalDisclaimer}
        </p>
        <p className="text-[#8B988F]">
          Built for the YouCam API Skin AI & eCommerce VTO Hackathon · SKINTRACE AI v1.0.0
        </p>
      </footer>
    </div>
  );
};
