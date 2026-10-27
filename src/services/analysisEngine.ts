/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkinAnalysisResult, SkinMetric } from '../types/skincare';

export interface AnalysisProgressCallback {
  (stage: number, message: string): void;
}

/**
 * Deterministic local simulation engine for SKINTRACE AI.
 * GUARANTEED ZERO API CONSUMPTION:
 * Strictly computes illustrative, non-medical cosmetic metrics locally inside the browser.
 * Absolutely no network requests, no biometric transmission, and 0 YouCam bonus credits consumed.
 */
export async function runSimulatedSkinAnalysis(
  imageSource: string,
  onProgress?: AnalysisProgressCallback
): Promise<SkinAnalysisResult> {
  // Step 1: Aligning facial landmarks
  if (onProgress) onProgress(1, 'stage1');
  await new Promise(r => setTimeout(r, 650));

  // Step 2: Surface texture & light reflection scan
  if (onProgress) onProgress(2, 'stage2');
  await new Promise(r => setTimeout(r, 700));

  // Step 3: Visual redness & tone harmony assessment
  if (onProgress) onProgress(3, 'stage3');
  await new Promise(r => setTimeout(r, 700));

  // Step 4: Synthesizing non-medical cosmetic insights
  if (onProgress) onProgress(4, 'stage4');
  await new Promise(r => setTimeout(r, 550));

  // Generate deterministic variations so successive scans feel organic while strictly labeled as simulated
  const hashSeed = Math.abs(
    imageSource.length + Math.floor(Date.now() / 60000)
  );
  const scoreVariance = (hashSeed % 9) - 4; // -4 to +4

  const textureScore = Math.min(96, Math.max(72, 84 + scoreVariance));
  const poresScore = Math.min(95, Math.max(70, 82 - scoreVariance));
  const rednessScore = Math.min(94, Math.max(71, 85 + (scoreVariance % 3)));
  const toneScore = Math.min(96, Math.max(74, 86 - (scoreVariance % 2)));
  const spotsScore = Math.min(97, Math.max(75, 88 + (scoreVariance % 4)));

  const overallScore = Math.round(
    (textureScore + poresScore + rednessScore + toneScore + spotsScore) / 5
  );

  const metrics: SkinMetric[] = [
    {
      id: 'texture',
      name: 'Skin Texture',
      score: textureScore,
      status: textureScore >= 85 ? 'optimal' : textureScore >= 75 ? 'moderate' : 'attention',
      headline: textureScore >= 85 
        ? 'Smooth, well-hydrated visual surface appearance' 
        : 'Appearance of slight surface roughness around cheeks',
      description: 'Visible surface uniformity reflects regular cosmetic hydration and gentle barrier care.',
      recommendation: 'Pair a gentle polyhydroxy acid (PHA) or hydrating essence with squalane to sustain suppleness.',
      overlayPoints: [
        { x: 38, y: 52, label: 'Cheek surface smoothness' },
        { x: 62, y: 53, label: 'Cheek perimeter area' }
      ]
    },
    {
      id: 'pores',
      name: 'Pore Visibility',
      score: poresScore,
      status: poresScore >= 82 ? 'optimal' : 'moderate',
      headline: poresScore >= 82 
        ? 'Clean, refined pore margins' 
        : 'Slight visible pore prominence across central T-zone',
      description: 'T-zone appearance exhibits balanced visual surface shine with clean-looking pore margins.',
      recommendation: 'Use a gentle non-foaming cleanser and periodic low-strength BHA (salicylic acid 1-2%).',
      overlayPoints: [
        { x: 50, y: 49, label: 'Central nasal pores' }
      ]
    },
    {
      id: 'redness',
      name: 'Redness Balance',
      score: rednessScore,
      status: rednessScore >= 84 ? 'optimal' : rednessScore >= 76 ? 'moderate' : 'attention',
      headline: rednessScore >= 84 
        ? 'Calm, balanced visual undertone' 
        : 'Appearance of slight temporary redness across cheek areas',
      description: 'Visual skin undertone appears calm with no prominent patches of irritation or hot spots.',
      recommendation: 'Prioritize Centella Asiatica, Madecassoside, and avoid hot water during facial cleansing.',
      overlayPoints: [
        { x: 42, y: 46, label: 'Mid-cheek tone' },
        { x: 58, y: 46, label: 'Cheek redness zone' }
      ]
    },
    {
      id: 'unevenTone',
      name: 'Even Skin Tone',
      score: toneScore,
      status: toneScore >= 84 ? 'optimal' : 'moderate',
      headline: toneScore >= 84 
        ? 'Harmonious light dispersion across facial planes' 
        : 'Subtle forehead and perimeter tone variability',
      description: 'Surface light reflection indicates even cosmetic appearance and consistent daily sun protection.',
      recommendation: 'Apply broad-spectrum mineral or hybrid SPF 50+ every morning as your primary tonal defense.',
      overlayPoints: [
        { x: 50, y: 35, label: 'Forehead tonal clarity' }
      ]
    },
    {
      id: 'spots',
      name: 'Clarity & Spots',
      score: spotsScore,
      status: spotsScore >= 85 ? 'optimal' : 'moderate',
      headline: spotsScore >= 85 
        ? 'Clear, tranquil complexion with minimal visible marks' 
        : 'Scattered micro-freckles and post-sun marks',
      description: 'Visible surface marks and freckles appear mild and non-prominent across the complexion.',
      recommendation: 'Antioxidants such as 10% Vitamin C and Niacinamide help preserve cosmetic surface radiance.',
      overlayPoints: [
        { x: 48, y: 42, label: 'Nasal bridge clarity' }
      ]
    }
  ];

  const now = new Date();
  const dateFormatted = now.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    id: `scan_${Date.now()}_simulated`,
    timestamp: Date.now(),
    dateFormatted,
    imageUrl: imageSource,
    isDemo: true,
    isRealApiResult: false,
    dataSource: 'local_demo',
    apiProvider: 'Local Client Simulator (Demo Safeguard)',
    youcamTaskId: `local_sim_${Date.now()}`,
    overallScore,
    skinType: overallScore > 84 ? 'Normal' : 'Combination',
    radianceIndex: Math.round(overallScore * 0.98),
    hydrationLevel: Math.round(textureScore * 0.96),
    metrics,
    summary: '[DEMO DATA — SIMULATED] Illustrative cosmetic evaluation generated locally for demonstration. Highlights visible surface hydration and evenness without medical or diagnostic assessment.',
    topConcern: rednessScore < 82 ? 'Visual surface redness and moisture replenishment' : 'Daily cosmetic hydration and UV protection',
    suggestedRoutineSteps: [
      {
        title: 'Centella + Ceramide Calming Serum',
        productCategory: 'Barrier Defense',
        reason: 'Sustains moisture retention and helps calm the appearance of temporary surface redness.'
      },
      {
        title: 'Antioxidant Defense SPF 50+',
        productCategory: 'Daily Protection',
        reason: 'Protects skin surface against daytime UV rays and environmental exposure.'
      }
    ]
  };
}
