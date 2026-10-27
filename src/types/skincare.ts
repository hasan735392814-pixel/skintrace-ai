/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ar';

export type NavigationPage = 
  | 'landing' 
  | 'dashboard' 
  | 'analyze' 
  | 'results' 
  | 'journey' 
  | 'routine' 
  | 'settings';

export interface SkinMetric {
  id: 'texture' | 'pores' | 'redness' | 'unevenTone' | 'spots';
  name: string;
  score: number; // 0 - 100 (higher = healthier / more balanced appearance)
  status: 'optimal' | 'moderate' | 'attention';
  headline: string;
  description: string;
  recommendation: string;
  overlayPoints: Array<{ x: number; y: number; label: string }>;
}

export interface SkinAnalysisResult {
  id: string;
  timestamp: number;
  dateFormatted: string;
  imageUrl: string;
  isDemo: boolean;
  overallScore: number;
  skinType: 'Normal' | 'Combination' | 'Dry' | 'Oily' | 'Sensitive';
  radianceIndex: number;
  hydrationLevel: number;
  metrics: SkinMetric[];
  summary: string;
  topConcern: string;
  suggestedRoutineSteps: Array<{
    title: string;
    productCategory: string;
    reason: string;
  }>;
  // YouCam v2.1 Integration & Verification Metadata
  dataSource?: 'youcam_v2.1_live' | 'youcam_v2.1_simulated' | 'local_demo';
  youcamTaskId?: string;
  isRealApiResult?: boolean;
  apiProvider?: string;
  rawApiFeatures?: Record<string, { score: number; level?: string }>;
}

export interface RoutineStep {
  id: string;
  title: string;
  category: 'cleanse' | 'hydrate' | 'treat' | 'moisturize' | 'protect';
  timeOfDay: 'morning' | 'evening' | 'both';
  productName?: string;
  completedMorning: boolean;
  completedEvening: boolean;
  notes?: string;
  isCustom?: boolean;
}

export interface DailyRoutineLog {
  date: string; // YYYY-MM-DD
  completedStepIds: string[];
  allCompleted: boolean;
}

export interface YouCamAPIStatus {
  demoMode: boolean;
  apiKeyConfigured: boolean;
  realExecutionAllowed: boolean;
  bonusUnitsProtected: number;
  unitsConsumed: number;
  guardEnforced: boolean;
  lastChecked: string;
}

export interface UserPreferences {
  language: Language;
  hasSeenIntro: boolean;
  notificationsEnabled: boolean;
  lastActiveDate: string;
}
