/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkinAnalysisResult, RoutineStep, UserPreferences } from '../types/skincare';

const STORAGE_KEYS = {
  HISTORY: 'skintrace_history_v2',
  ROUTINES: 'skintrace_routines_v2',
  PREFS: 'skintrace_prefs_v1',
  LAST_DATE: 'skintrace_last_calendar_date_v2',
};

// Default starter routine steps with separate morning and evening states
const DEFAULT_ROUTINE_STEPS: RoutineStep[] = [
  {
    id: 'step_cleanse',
    title: 'Gentle Hydrating Cleanser',
    category: 'cleanse',
    timeOfDay: 'both',
    productName: 'Balancing Botanical Cleansing Gel',
    completedMorning: true,
    completedEvening: false,
    notes: 'Wash with lukewarm water and pat dry gently with a soft towel.',
  },
  {
    id: 'step_antioxidant_am',
    title: 'Vitamin C Radiance Booster',
    category: 'treat',
    timeOfDay: 'morning',
    productName: '10% Ascorbic Acid Serum',
    completedMorning: true,
    completedEvening: false,
    notes: 'Apply after cleansing to support visible radiance throughout the day.',
  },
  {
    id: 'step_moisturizer',
    title: 'Barrier Support Moisture Cream',
    category: 'moisturize',
    timeOfDay: 'both',
    productName: 'Ceramide NP & Squalane Complex',
    completedMorning: false,
    completedEvening: false,
    notes: 'Hydrates and softens visible skin texture.',
  },
  {
    id: 'step_spf_am',
    title: 'Broad-Spectrum Daily SPF 50+',
    category: 'protect',
    timeOfDay: 'morning',
    productName: 'Daily Hydrating Mineral Fluid Sunscreen',
    completedMorning: false,
    completedEvening: false,
    notes: 'Crucial for defending against daytime UV rays and visible uneven tone.',
  },
  {
    id: 'step_gentle_night_pm',
    title: 'Nourishing Night Elixir',
    category: 'treat',
    timeOfDay: 'evening',
    productName: '2% Niacinamide & Peptide Night Drops',
    completedMorning: false,
    completedEvening: false,
    notes: 'Gentle evening care to support smooth-looking surface texture.',
  },
];

// Pre-curated demo milestones for hackathon presentation
// Sorted latest first: [0] = Yesterday (Latest), [1] = 7 days ago, [2] = 14 days ago (Baseline)
export const SAMPLE_DEMO_SCANS: SkinAnalysisResult[] = [
  {
    id: 'demo_scan_3',
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
    dateFormatted: 'Yesterday',
    imageUrl: '/src/assets/images/sample_skin_scan_demo_1793037795841.jpg',
    isDemo: true,
    overallScore: 88,
    skinType: 'Normal',
    radianceIndex: 86,
    hydrationLevel: 85,
    metrics: [
      {
        id: 'texture',
        name: 'Skin Texture',
        score: 87,
        status: 'optimal',
        headline: 'Smooth, supple surface appearance',
        description: 'Visual skin surface shows even light diffusion and a smooth cosmetic finish.',
        recommendation: 'Maintain gentle non-abrasive cleansing and consistent barrier hydration.',
        overlayPoints: [
          { x: 40, y: 50, label: 'Cheek surface smoothness' }
        ]
      },
      {
        id: 'pores',
        name: 'Pore Visibility',
        score: 86,
        status: 'optimal',
        headline: 'Clean, refined pore appearance',
        description: 'T-zone pore margins appear clean and visually balanced with minimal surface oiliness.',
        recommendation: 'Continue gentle evening double cleansing.',
        overlayPoints: [
          { x: 50, y: 48, label: 'T-zone pore appearance' }
        ]
      },
      {
        id: 'redness',
        name: 'Redness Balance',
        score: 88,
        status: 'optimal',
        headline: 'Calm, balanced visual undertone',
        description: 'Cheek area exhibits a serene visual tone without prominent temporary flushing.',
        recommendation: 'Sustain gentle barrier care with Centella or green tea extract.',
        overlayPoints: [
          { x: 45, y: 48, label: 'Calm cheek area' }
        ]
      },
      {
        id: 'unevenTone',
        name: 'Even Skin Tone',
        score: 89,
        status: 'optimal',
        headline: 'Uniform, luminous complexion',
        description: 'Cosmetic light distribution appears harmonious across forehead and cheeks.',
        recommendation: 'Daily broad-spectrum SPF 50+ safeguards skin appearance against UV-induced shifts.',
        overlayPoints: [
          { x: 52, y: 35, label: 'Forehead tone clarity' }
        ]
      },
      {
        id: 'spots',
        name: 'Clarity & Spots',
        score: 90,
        status: 'optimal',
        headline: 'Clear, luminous surface appearance',
        description: 'Visual clarity is high with faint, stable sun freckles along the upper bridge.',
        recommendation: 'Antioxidant serums support cosmetic luminosity.',
        overlayPoints: [
          { x: 49, y: 44, label: 'Clear central zone' }
        ]
      }
    ],
    summary: '[DEMO DATA — SIMULATED] Illustrative milestone showing calm visual undertone and hydrated cosmetic appearance after consistent routine habits. (Synthetic demonstration data, not a medical measurement).',
    topConcern: 'Maintaining daily hydration and consistent UV defense',
    suggestedRoutineSteps: [
      {
        title: 'Plant Squalane Moisture Lock',
        productCategory: 'Hydration',
        reason: 'Helps seal in moisture for a dewy cosmetic appearance.'
      }
    ]
  },
  {
    id: 'demo_scan_2',
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    dateFormatted: '7 days ago',
    imageUrl: '/src/assets/images/sample_skin_scan_demo_1793037795841.jpg',
    isDemo: true,
    overallScore: 81,
    skinType: 'Combination',
    radianceIndex: 79,
    hydrationLevel: 76,
    metrics: [
      {
        id: 'texture',
        name: 'Skin Texture',
        score: 79,
        status: 'optimal',
        headline: 'Improved surface smoothness across cheeks',
        description: 'Consistent cosmetic moisturization has visibly supported surface suppleness.',
        recommendation: 'Continue nightly barrier-support cream.',
        overlayPoints: [
          { x: 38, y: 52, label: 'Refined cheek appearance' }
        ]
      },
      {
        id: 'pores',
        name: 'Pore Visibility',
        score: 80,
        status: 'optimal',
        headline: 'Balanced pore margin appearance',
        description: 'Visible surface shine around the T-zone appears moderate and balanced.',
        recommendation: 'Keep using gentle, non-stripping cleansers.',
        overlayPoints: [
          { x: 50, y: 48, label: 'Nasal wing area' }
        ]
      },
      {
        id: 'redness',
        name: 'Redness Balance',
        score: 78,
        status: 'optimal',
        headline: 'Reduced visible cheek redness',
        description: 'Temporary surface flush appears visibly reduced compared to initial baseline.',
        recommendation: 'Maintain soothing botanical ingredients like Centella.',
        overlayPoints: [
          { x: 44, y: 47, label: 'Mid-cheek tone' }
        ]
      },
      {
        id: 'unevenTone',
        name: 'Even Skin Tone',
        score: 82,
        status: 'optimal',
        headline: 'Even surface light reflection',
        description: 'Visual complexion shows balanced light reflection across cheeks and forehead.',
        recommendation: 'Maintain continuous broad-spectrum photoprotection.',
        overlayPoints: [
          { x: 50, y: 34, label: 'Forehead luminosity' }
        ]
      },
      {
        id: 'spots',
        name: 'Clarity & Spots',
        score: 84,
        status: 'optimal',
        headline: 'Good visible clarity with mild freckles',
        description: 'Clean surface appearance with faint, scattered sun freckles on upper bridge.',
        recommendation: 'Morning antioxidant serum helps support clear appearance.',
        overlayPoints: [
          { x: 48, y: 42, label: 'Bridge freckle appearance' }
        ]
      }
    ],
    summary: '[DEMO DATA — SIMULATED] Illustrative milestone showing moderate improvements in surface moisture balance and calm visual tone. (Synthetic demonstration data, not a medical measurement).',
    topConcern: 'Supporting surface hydration balance across changing weather',
    suggestedRoutineSteps: [
      {
        title: 'Hydrating Botanical Essence',
        productCategory: 'Hydration',
        reason: 'Sustains moisture throughout the day.'
      }
    ]
  },
  {
    id: 'demo_scan_1',
    timestamp: Date.now() - 14 * 24 * 60 * 60 * 1000,
    dateFormatted: '14 days ago',
    imageUrl: '/src/assets/images/sample_skin_scan_demo_1793037795841.jpg',
    isDemo: true,
    overallScore: 74,
    skinType: 'Combination',
    radianceIndex: 72,
    hydrationLevel: 68,
    metrics: [
      {
        id: 'texture',
        name: 'Skin Texture',
        score: 71,
        status: 'moderate',
        headline: 'Mild visible dryness on cheek perimeter',
        description: 'Skin surface appearance shows slight dryness and uneven light reflection.',
        recommendation: 'Incorporate hydrating toners with hyaluronic acid and gentle moisturizers.',
        overlayPoints: [
          { x: 38, y: 52, label: 'Cheek surface dryness' },
          { x: 62, y: 54, label: 'Lateral cheek area' }
        ]
      },
      {
        id: 'pores',
        name: 'Pore Visibility',
        score: 75,
        status: 'optimal',
        headline: 'Normal T-zone pore appearance',
        description: 'Pore contours appear standard around the nose, smooth across the forehead.',
        recommendation: 'Maintain gentle cleansing routines.',
        overlayPoints: [
          { x: 50, y: 48, label: 'Nasal wing pore structure' }
        ]
      },
      {
        id: 'redness',
        name: 'Redness Balance',
        score: 69,
        status: 'attention',
        headline: 'Appearance of mild temporary redness',
        description: 'Noticeable surface flush around central cheeks, often associated with temperature shifts or dry air.',
        recommendation: 'Prioritize soothing ingredients like green tea or Centella.',
        overlayPoints: [
          { x: 42, y: 46, label: 'Mid-cheek area' },
          { x: 58, y: 47, label: 'Cheek redness focus' }
        ]
      },
      {
        id: 'unevenTone',
        name: 'Even Skin Tone',
        score: 77,
        status: 'optimal',
        headline: 'Subtle perimeter tone variation',
        description: 'Overall visual tone is consistent with minor post-sun shifts on high cheek planes.',
        recommendation: 'Daily broad-spectrum sunscreen prevents appearance of uneven tone.',
        overlayPoints: [
          { x: 50, y: 34, label: 'Forehead tone' }
        ]
      },
      {
        id: 'spots',
        name: 'Clarity & Spots',
        score: 78,
        status: 'optimal',
        headline: 'Natural clarity with light freckles',
        description: 'Good visual clarity with faint scattered sun freckles across upper nose bridge.',
        recommendation: 'Niacinamide serums support clear, luminous skin appearance.',
        overlayPoints: [
          { x: 48, y: 42, label: 'Nose bridge freckles' }
        ]
      }
    ],
    summary: '[DEMO DATA — SIMULATED] Illustrative baseline milestone showing appearance of surface dryness and mild cheek redness. (Synthetic demonstration data, not a medical measurement).',
    topConcern: 'Central visible redness and surface moisture replenishment',
    suggestedRoutineSteps: [
      {
        title: 'Centella Soothing Serum',
        productCategory: 'Calming Active',
        reason: 'Helps calm the appearance of temporary surface redness.'
      },
      {
        title: 'Ceramide Moisture Balm',
        productCategory: 'Moisturizer',
        reason: 'Helps soften skin surface and retain moisture.'
      }
    ]
  }
];

export const storageService = {
  getHistory(): SkinAnalysisResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (data) {
        return JSON.parse(data);
      }
      // Seed with curated demo scans (latest first)
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(SAMPLE_DEMO_SCANS));
      return SAMPLE_DEMO_SCANS;
    } catch {
      return SAMPLE_DEMO_SCANS;
    }
  },

  saveAnalysis(result: SkinAnalysisResult): SkinAnalysisResult[] {
    try {
      const history = this.getHistory();
      const updated = [result, ...history];
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
      return updated;
    } catch {
      return [result];
    }
  },

  deleteAnalysis(id: string): SkinAnalysisResult[] {
    try {
      const history = this.getHistory();
      const updated = history.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
    } catch {
      // ignore
    }
  },

  loadCuratedDemoData(): SkinAnalysisResult[] {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(SAMPLE_DEMO_SCANS));
      return SAMPLE_DEMO_SCANS;
    } catch {
      return SAMPLE_DEMO_SCANS;
    }
  },

  // Routines with separate Morning and Evening completion states
  getRoutines(): RoutineStep[] {
    try {
      this.checkAndResetDailyCompletion();
      const data = localStorage.getItem(STORAGE_KEYS.ROUTINES);
      if (data) {
        const parsed: any[] = JSON.parse(data);
        // Normalize fields if migrated from single completedToday boolean
        const normalized: RoutineStep[] = parsed.map(step => ({
          id: step.id,
          title: step.title,
          category: step.category,
          timeOfDay: step.timeOfDay,
          productName: step.productName,
          completedMorning: typeof step.completedMorning === 'boolean' 
            ? step.completedMorning 
            : (step.timeOfDay === 'morning' || step.timeOfDay === 'both') ? Boolean(step.completedToday) : false,
          completedEvening: typeof step.completedEvening === 'boolean' 
            ? step.completedEvening 
            : (step.timeOfDay === 'evening') ? Boolean(step.completedToday) : false,
          notes: step.notes,
          isCustom: step.isCustom,
        }));
        return normalized;
      }
      localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(DEFAULT_ROUTINE_STEPS));
      return DEFAULT_ROUTINE_STEPS;
    } catch {
      return DEFAULT_ROUTINE_STEPS;
    }
  },

  saveRoutines(steps: RoutineStep[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(steps));
    } catch {
      // ignore
    }
  },

  toggleStepCompletion(stepId: string, timeOfDay: 'morning' | 'evening'): RoutineStep[] {
    const current = this.getRoutines();
    const updated = current.map(step => {
      if (step.id !== stepId) return step;
      if (timeOfDay === 'morning') {
        return { ...step, completedMorning: !step.completedMorning };
      } else {
        return { ...step, completedEvening: !step.completedEvening };
      }
    });
    this.saveRoutines(updated);
    return updated;
  },

  addRoutineStep(step: Omit<RoutineStep, 'id' | 'completedMorning' | 'completedEvening'>): RoutineStep[] {
    const current = this.getRoutines();
    const newStep: RoutineStep = {
      ...step,
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      completedMorning: false,
      completedEvening: false,
      isCustom: true
    };
    const updated = [...current, newStep];
    this.saveRoutines(updated);
    return updated;
  },

  deleteRoutineStep(stepId: string): RoutineStep[] {
    const current = this.getRoutines();
    const updated = current.filter(step => step.id !== stepId);
    this.saveRoutines(updated);
    return updated;
  },

  checkAndResetDailyCompletion(): void {
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastRecordedDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE);
      if (lastRecordedDate && lastRecordedDate !== today) {
        // Reset steps for new calendar day
        const data = localStorage.getItem(STORAGE_KEYS.ROUTINES);
        if (data) {
          const steps: RoutineStep[] = JSON.parse(data);
          const resetSteps = steps.map(s => ({
            ...s,
            completedMorning: false,
            completedEvening: false,
          }));
          localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(resetSteps));
        }
      }
      localStorage.setItem(STORAGE_KEYS.LAST_DATE, today);
    } catch {
      // ignore
    }
  },

  // Preferences & i18n
  getPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFS);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    return {
      language: 'en',
      hasSeenIntro: true,
      notificationsEnabled: false,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
  },

  savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
    const current = this.getPreferences();
    const updated = { ...current, ...prefs };
    try {
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return updated;
  },

  // Full Wipe
  clearAllApplicationData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
      localStorage.removeItem(STORAGE_KEYS.ROUTINES);
      localStorage.removeItem(STORAGE_KEYS.PREFS);
      localStorage.removeItem(STORAGE_KEYS.LAST_DATE);
    } catch {
      // ignore
    }
  }
};
