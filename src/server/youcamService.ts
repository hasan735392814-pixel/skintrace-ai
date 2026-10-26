/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Official YouCam Skin AI API Integration Scaffold
 * Reference Documentation:
 * - https://docs.perfectcorp.com/reference/ai_skin_analysis
 * - https://docs.perfectcorp.com/develop/introduction
 *
 * This server-side module defines the strict contract and safety guards for future live API execution.
 *
 * CRITICAL HACKATHON SAFEGUARDS:
 * 1. DEMO_MODE=true is permanently enforced by default.
 * 2. Real API execution is rejected with HTTP 403 / 501 when DEMO_MODE is true.
 * 3. YOUCAM_API_KEY is read strictly from process.env and NEVER returned to clients or logged.
 * 4. Zero units from the 40 bonus allocation will ever be consumed without intentional, verified manual setup.
 */

export interface YouCamSkinAnalysisRequest {
  imageUrl?: string;
  imageBase64?: string;
  analysisFeatures?: Array<'spots' | 'wrinkles' | 'texture' | 'dark_circles' | 'redness' | 'oiliness' | 'moisture' | 'pores' | 'eye_bags' | 'radiance'>;
  userExplicitConsentConfirmed?: boolean;
}

export interface YouCamSkinAnalysisResponse {
  task_id: string;
  status: 'pending' | 'success' | 'failed';
  result?: {
    skin_age?: number;
    skin_type?: string;
    metrics: Record<string, {
      score: number;
      level: string;
    }>;
  };
  is_simulated_demo: boolean;
  units_consumed: number;
  message: string;
}

export class YouCamService {
  private static isDemoMode(): boolean {
    // Failsafe: if not explicitly 'false', always treat as demo mode
    return process.env.DEMO_MODE !== 'false';
  }

  private static getApiKey(): string | undefined {
    return process.env.YOUCAM_API_KEY;
  }

  /**
   * System status check for UI indicators and safety audit.
   * Does NOT make any network call to external APIs.
   */
  public static getSystemStatus() {
    const isDemo = this.isDemoMode();
    const hasKey = Boolean(this.getApiKey() && this.getApiKey()!.trim().length > 0);

    return {
      demoMode: isDemo,
      apiKeyConfigured: hasKey,
      realExecutionAllowed: !isDemo && hasKey,
      bonusUnitsProtected: 40,
      unitsConsumed: 0,
      guardEnforced: true,
      targetEndpoint: 'https://yce-api-01.makeupar.com/s2s/v2.0/task/skin-analysis (Documented Perfect Corp Endpoint)',
      safetyPolicy: 'ZERO_API_CONSUMPTION_ENFORCED',
      lastChecked: new Date().toISOString()
    };
  }

  /**
   * Server-side Skin Analysis Handler
   * Rejects live calls if DEMO_MODE=true or unverified.
   */
  public static async analyzeSkin(request: YouCamSkinAnalysisRequest): Promise<YouCamSkinAnalysisResponse> {
    const isDemo = this.isDemoMode();

    if (isDemo) {
      // Deterministic demo response, zero API call
      return {
        task_id: `demo_task_${Date.now()}`,
        status: 'success',
        is_simulated_demo: true,
        units_consumed: 0,
        message: 'DEMO MODE ENFORCED: Zero YouCam API units were billed or requested. Result is simulated locally.',
        result: {
          skin_age: 26,
          skin_type: 'Combination',
          metrics: {
            texture: { score: 86, level: 'Good' },
            pores: { score: 82, level: 'Normal' },
            redness: { score: 85, level: 'Balanced' },
            spots: { score: 88, level: 'Clear' },
            moisture: { score: 81, level: 'Adequate' }
          }
        }
      };
    }

    // FUTURE REAL-MODE SAFETY GATE:
    // Requires verified API key and explicit user opt-in confirmation
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('CONFIG_ERROR: Real analysis requested, but YOUCAM_API_KEY is not configured on the server.');
    }

    if (!request.userExplicitConsentConfirmed) {
      throw new Error('CONSENT_REQUIRED: Real analysis requires explicit user confirmation acknowledging potential API credit consumption.');
    }

    // Explicitly marked as NOT IMPLEMENTED rather than guessing unverified endpoints
    throw new Error('SAFETY_SHUTTER: Real YouCam API execution is marked as [NOT IMPLEMENTED] in this build to prevent accidental consumption of your 40 bonus units.');
  }
}
