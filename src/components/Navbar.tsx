/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { NavigationPage, Language } from '../types/skincare';
import { translations } from '../i18n/translations';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  lang,
  onLanguageChange,
  onOpenAbout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navLinks: Array<{ id: NavigationPage; label: string }> = [
    { id: 'dashboard', label: t.nav.dashboard },
    { id: 'analyze', label: t.nav.analyze },
    { id: 'journey', label: t.nav.journey },
    { id: 'routine', label: t.nav.routine },
    { id: 'settings', label: t.nav.settings },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const toggleLang = () => {
    onLanguageChange(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EDE6DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark with official app icon */}
        <button
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2.5 text-left rtl:text-right group cursor-pointer whitespace-nowrap shrink-0"
        >
          <img
            src="/skintrace-icon.png"
            alt="SKINTRACE AI"
            className="w-9 h-9 rounded-xl object-cover shadow-xs border border-[#1B382B]/10 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#1B382B] leading-none">
              SKINTRACE AI
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#6E7B73] font-medium mt-0.5">
              Beauty-Tech Intelligence
            </span>
          </div>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#464F4A]">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-[#1B382B] font-semibold'
                    : 'text-[#58625B] hover:text-[#1B382B]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B382B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language switcher + 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#DDD4C7] bg-[#F4EFE6] text-xs font-medium text-[#38413B] hover:bg-[#EAE3D6] transition-colors cursor-pointer"
            title="Switch Language / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-[#1B382B]" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* About / Hackathon button */}
          <button
            onClick={onOpenAbout}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-medium text-[#4B5650] hover:text-[#1B382B] hover:bg-[#F2ECE2] transition-colors cursor-pointer"
          >
            About
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('analyze')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-white bg-[#1B382B] rounded-lg hover:bg-[#254A39] transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.startScan}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2C3530] hover:bg-[#EFEAE0] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EDE6DC] bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left rtl:text-right px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#E5ECE7] text-[#1B382B] font-semibold'
                    : 'text-[#48524D] hover:bg-[#F3ECE1]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#EDE6DC] flex items-center justify-between">
            <button
              onClick={onOpenAbout}
              className="text-xs text-[#525E57] hover:text-[#1B382B] py-2 px-3"
            >
              About SKINTRACE AI
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
