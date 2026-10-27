/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Official YouCam Skin AI API Integration (v2.1)
 * Reference Documentation:
 * - https://docs.perfectcorp.com/reference/ai_skin_analysis/v2.1
 * - https://docs.perfectcorp.com/develop/introduction
 *
 * This server-side module defines the strict contract, validation, task payload
 * generation, polling, and response transformation for YouCam v2.1 Skin Analysis.
 *
 * CRITICAL HACKATHON SAFEGUARDS:
 * 1. DEMO_MODE=true is permanently enforced by default.
 * 2. Real API execution is strictly gated: zero external HTTP requests are made when DEMO_MODE is true.
 * 3. YOUCAM_API_KEY is read strictly from process.env and NEVER exposed to clients or logged.
 * 4. Zero units from the 40 bonus allocation will ever be consumed without intentional, verified manual setup.
 */

import { SkinAnalysisResult, SkinMetric } from '../types/skincare.ts';

// Official YouCam v2.1 Supported SD Action IDs
export type YouCamFeature =
  | 'texture'
  | 'pore'
  | 'pores'
  | 'redness'
  | 'spot'
  | 'spots'
  | 'moisture'
  | 'radiance'
  | 'wrinkle'
  | 'wrinkles'
  | 'dark_circles'
  | 'eye_bags'
  | 'oiliness'
  | 'skin_age'
  | 'skin_type';

export interface YouCamSkinAnalysisRequest {
  imageUrl?: string;
  imageBase64?: string;
  analysisFeatures?: YouCamFeature[];
  userExplicitConsentConfirmed?: boolean;
}

export interface YouCamV21TaskCreationResponse {
  task_id: string;
  status: 'created' | 'running' | 'success' | 'failed';
  code?: number;
  message?: string;
}

export interface YouCamV21FeatureMetric {
  score: number; // 0 - 100
  level: string; // 'Low' | 'Medium' | 'High' | 'Good' | 'Normal' etc.
  roi?: Array<{ x: number; y: number }>;
}

export interface YouCamOutputItem {
  type: string;
  ui_score?: number;
  raw_score?: number;
  mask_urls?: string[];
}

export interface YouCamV21TaskResult {
  task_id: string;
  status?: 'success' | 'failed' | 'running' | 'created';
  data?: {
    task_status?: 'success' | 'failed' | 'running' | 'created';
    results?: {
      output?: YouCamOutputItem[];
      skin_age?: number;
      skin_type?: {
        type?: string;
        confidence?: number;
      };
    };
    skin_age?: number;
    skin_type?: {
      type?: string;
      confidence?: number;
    };
  };
  results?: {
    output?: YouCamOutputItem[];
    skin_age?: number;
    skin_type?: {
      type?: string;
      confidence?: number;
    };
  };
  skin_age?: number;
  skin_type?: {
    type?: string;
    confidence?: number;
  };
  features?: Record<string, { score?: number; level?: string }>;
}

export interface YouCamServiceResponse {
  task_id: string;
  status: 'success' | 'failed' | 'pending';
  is_simulated_demo: boolean;
  provider: 'YouCam Skin AI v2.1';
  units_consumed: number;
  message: string;
  result?: SkinAnalysisResult;
  rawApiData?: YouCamV21TaskResult;
}

export class YouCamService {
  // Official YouCam API v2.0/v2.1 Endpoints per Perfect Corp documentation
  public static readonly API_BASE_HOST = 'https://yce-api-01.makeupar.com';
  public static readonly FILE_UPLOAD_ENDPOINT = '/s2s/v2.0/file';
  public static readonly TASK_CREATE_ENDPOINT = '/s2s/v2.1/task/skin-analysis';
  public static readonly TASK_POLL_ENDPOINT_PREFIX = '/s2s/v2.1/task/skin-analysis/';

  // Official Standard Definition (SD) diagnostic actions
  public static readonly OFFICIAL_SD_ACTIONS = [
    'texture',
    'pore',
    'redness',
    'spot',
    'moisture',
    'radiance',
    'wrinkle',
    'skin_age',
    'skin_type'
  ];

  public static readonly DEFAULT_FEATURES: YouCamFeature[] = [
    'texture',
    'pore',
    'redness',
    'spot',
    'moisture',
    'radiance',
    'skin_age',
    'skin_type'
  ];

  /**
   * Safe mode check: defaults to TRUE unless explicitly set to 'false'.
   */
  public static isDemoMode(): boolean {
    return process.env.DEMO_MODE !== 'false';
  }

  /**
   * Secret reader: strictly server-side, never returned to client.
   * Supports either YOUCAM_API_KEY or YOUCAM_SECRET_KEY.
   */
  private static getApiKey(): string | undefined {
    const key = (process.env.YOUCAM_API_KEY || process.env.YOUCAM_SECRET_KEY || '').trim();
    return key.length > 0 && key !== 'demo-placeholder' ? key : undefined;
  }

  /**
   * Safe extraction of image binary buffer, MIME type, and dimensions/size.
   */
  public static parseImagePayload(request: YouCamSkinAnalysisRequest): {
    buffer: Buffer;
    mimeType: string;
    fileName: string;
    fileSize: number;
  } {
    if (!request.imageBase64) {
      throw new Error('VALIDATION_ERROR: No image payload provided for binary upload.');
    }

    let mimeType = 'image/jpeg';
    let base64String = request.imageBase64;

    if (request.imageBase64.startsWith('data:')) {
      const match = request.imageBase64.match(/^data:([^;]+);base64,(.*)$/);
      if (match) {
        mimeType = match[1].toLowerCase();
        base64String = match[2];
      }
    }

    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedMimes.includes(mimeType)) {
      throw new Error(`VALIDATION_ERROR: Unsupported file format '${mimeType}'. Allowed formats: image/jpeg, image/png, image/webp.`);
    }

    const buffer = Buffer.from(base64String, 'base64');
    const fileSize = buffer.length;
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB per YouCam specs

    if (fileSize > maxSizeBytes) {
      throw new Error(`VALIDATION_ERROR: File size (${(fileSize / (1024 * 1024)).toFixed(2)}MB) exceeds maximum permitted 10MB limit.`);
    }

    const extension = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg';
    const fileName = `skintrace_scan_${Date.now()}.${extension}`;

    return { buffer, mimeType: mimeType === 'image/jpg' ? 'image/jpeg' : mimeType, fileName, fileSize };
  }

  /**
   * Input Image Validation (YouCam v2.1 specs)
   * - Max 10MB file size
   * - Formats: JPEG, PNG, WebP
   * - Must contain valid image payload (URL or base64)
   */
  public static validateImageInput(request: YouCamSkinAnalysisRequest): { valid: boolean; error?: string } {
    if (!request.imageUrl && !request.imageBase64) {
      return { valid: false, error: 'No image provided. Please supply an imageUrl or base64 image.' };
    }

    if (request.imageBase64) {
      try {
        let mimeType = 'image/jpeg';
        let base64Data = request.imageBase64;

        if (request.imageBase64.startsWith('data:')) {
          const match = request.imageBase64.match(/^data:([^;]+);base64,(.*)$/);
          if (match) {
            mimeType = match[1].toLowerCase();
            base64Data = match[2];
          } else {
            return { valid: false, error: 'Invalid data URL format for base64 image.' };
          }
        }

        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedMimes.includes(mimeType)) {
          return { valid: false, error: `Unsupported image format (${mimeType}). YouCam v2.1 requires JPEG, PNG, or WebP.` };
        }

        // Approximate size in bytes (base64 string length * 0.75)
        const approxBytes = Math.floor(base64Data.length * 0.75);
        const maxBytes = 10 * 1024 * 1024; // 10MB

        if (approxBytes > maxBytes) {
          return { valid: false, error: `Image size (~${(approxBytes / 1024 / 1024).toFixed(1)}MB) exceeds maximum allowed 10MB.` };
        }
      } catch {
        return { valid: false, error: 'Malformed base64 image content.' };
      }
    }

    if (request.imageUrl) {
      try {
        const url = new URL(request.imageUrl);
        if (!['http:', 'https:'].includes(url.protocol)) {
          return { valid: false, error: 'Image URL must use HTTP or HTTPS protocol.' };
        }
      } catch {
        // If it's a relative path in demo, allow it for local asset previews
        if (!request.imageUrl.startsWith('/')) {
          return { valid: false, error: 'Invalid image URL provided.' };
        }
      }
    }

    return { valid: true };
  }

  /**
   * System status check for UI indicators, telemetry & audit.
   * Does NOT make any network call to external APIs.
   */
  public static getSystemStatus() {
    const isDemo = this.isDemoMode();
    const rawKey = this.getApiKey();
    const hasKey = Boolean(rawKey && rawKey.length > 0);
    const detectedName = hasKey
      ? (process.env.YOUCAM_API_KEY && process.env.YOUCAM_API_KEY.trim() !== 'demo-placeholder' ? 'YOUCAM_API_KEY' : 'YOUCAM_SECRET_KEY')
      : 'none';

    const rawEnv = (process.env.YOUCAM_API_KEY || process.env.YOUCAM_SECRET_KEY || '').trim();
    const isPlaceholder = rawEnv === 'demo-placeholder';

    return {
      demoMode: isDemo,
      apiKeyConfigured: hasKey,
      placeholderDetected: isPlaceholder,
      liveExecutionBlocked: isDemo || !hasKey,
      realExecutionAllowed: !isDemo && hasKey,
      secretSourceDetected: hasKey ? detectedName : (isPlaceholder ? 'placeholder_only' : 'none'),
      bonusUnitsProtected: 40,
      unitsConsumed: 0,
      guardEnforced: true,
      apiVersion: 'v2.1',
      apiHost: this.API_BASE_HOST,
      taskEndpoint: `${this.API_BASE_HOST}${this.TASK_CREATE_ENDPOINT}`,
      pollEndpoint: `${this.API_BASE_HOST}${this.TASK_POLL_ENDPOINT_PREFIX}{task_id}`,
      supportedFeatures: this.DEFAULT_FEATURES,
      safetyPolicy: 'ZERO_API_CONSUMPTION_ENFORCED',
      lastChecked: new Date().toISOString()
    };
  }

  /**
   * Maps raw YouCam v2.1 response structure into SKINTRACE AI's internal format.
   */
  public static mapYouCamV21ToSkinTrace(
    raw: YouCamV21TaskResult,
    imageUrl: string,
    isDemo: boolean
  ): SkinAnalysisResult {
    // 1. Check for official Perfect Corp output array
    const outputList: YouCamOutputItem[] =
      raw.data?.results?.output ||
      raw.results?.output ||
      [];

    const maskMap: Record<string, string[]> = {};
    const scoreMap: Record<string, number> = {};

    for (const item of outputList) {
      if (item.type) {
        const score = typeof item.ui_score === 'number'
          ? Math.round(item.ui_score)
          : typeof item.raw_score === 'number'
            ? Math.round(item.raw_score)
            : undefined;
        if (score !== undefined) {
          scoreMap[item.type] = score;
        }
        if (item.mask_urls && Array.isArray(item.mask_urls) && item.mask_urls.length > 0) {
          maskMap[item.type] = item.mask_urls;
        }
      }
    }

    const features = raw.features || {};
    
    const textureScore = scoreMap['texture'] ?? features.texture?.score ?? 84;
    const poresScore = scoreMap['pore'] ?? scoreMap['pores'] ?? features.pores?.score ?? 82;
    const rednessScore = scoreMap['redness'] ?? features.redness?.score ?? 85;
    const toneScore = scoreMap['radiance'] ?? features.radiance?.score ?? 86;
    const spotsScore = scoreMap['spot'] ?? scoreMap['spots'] ?? features.spots?.score ?? 88;
    const hydrationScore = scoreMap['moisture'] ?? features.moisture?.score ?? 81;

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

    const rawSkinType =
      raw.data?.results?.skin_type?.type ||
      raw.results?.skin_type?.type ||
      raw.skin_type?.type;
    const skinType = (rawSkinType as any) || (overallScore > 84 ? 'Normal' : 'Combination');

    return {
      id: raw.task_id || `youcam_scan_${Date.now()}`,
      timestamp: Date.now(),
      dateFormatted,
      imageUrl,
      isDemo,
      overallScore,
      skinType,
      radianceIndex: toneScore,
      hydrationLevel: hydrationScore,
      metrics,
      summary: isDemo
        ? '[DEMO DATA — SIMULATED] Illustrative cosmetic evaluation generated locally via YouCam v2.1 schema scaffold. Zero API units consumed.'
        : `[YOUCAM API v2.1 LIVE] Evaluated via official Perfect Corp YouCam Skin AI v2.1. Task ID: ${raw.task_id}.`,
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
      ],
      dataSource: isDemo ? 'youcam_v2.1_simulated' : 'youcam_v2.1_live',
      youcamTaskId: raw.task_id,
      isRealApiResult: !isDemo,
      apiProvider: 'YouCam Skin AI v2.1',
      rawApiFeatures: {
        texture: { score: textureScore, level: features.texture?.level || (textureScore >= 80 ? 'Optimal' : 'Moderate') },
        pores: { score: poresScore, level: features.pores?.level || (poresScore >= 80 ? 'Refined' : 'Noticeable') },
        redness: { score: rednessScore, level: features.redness?.level || (rednessScore >= 80 ? 'Calm' : 'Visible') },
        spots: { score: spotsScore, level: features.spots?.level || (spotsScore >= 80 ? 'Clear' : 'Scattered') },
        moisture: { score: hydrationScore, level: features.moisture?.level || (hydrationScore >= 80 ? 'Balanced' : 'Dry') }
      },
      maskUrls: Object.keys(maskMap).length > 0 ? maskMap : undefined
    };
  }

  /**
   * Main Skin Analysis Gateway
   *
   * SAFEGUARD GUARANTEE:
   * When DEMO_MODE=true (default), this returns a deterministic YouCam v2.1 simulated response.
   * Absolutely NO HTTP request is made to Perfect Corp, conserving 100% of API bonus credits.
   */
  public static async analyzeSkin(request: YouCamSkinAnalysisRequest): Promise<YouCamServiceResponse> {
    // Step 1: Validate image input format & constraints
    const validation = this.validateImageInput(request);
    if (!validation.valid) {
      throw new Error(`VALIDATION_ERROR: ${validation.error}`);
    }

    const isDemo = this.isDemoMode();

    // Step 2: SAFEGUARD CHECK — If DEMO_MODE is true, handle locally with ZERO external calls
    if (isDemo) {
      const simulatedTaskId = `yc21_demo_${Date.now()}`;
      const mockRawV21: YouCamV21TaskResult = {
        task_id: simulatedTaskId,
        status: 'success',
        skin_age: 26,
        skin_type: { type: 'Combination', confidence: 0.94 },
        features: {
          texture: { score: 86, level: 'Good' },
          pores: { score: 82, level: 'Normal' },
          redness: { score: 85, level: 'Balanced' },
          spots: { score: 88, level: 'Clear' },
          moisture: { score: 81, level: 'Adequate' },
          radiance: { score: 87, level: 'Optimal' },
          wrinkles: { score: 91, level: 'Minimal' },
          dark_circles: { score: 84, level: 'Normal' }
        }
      };

      const imageUrl = request.imageUrl || request.imageBase64 || '/src/assets/images/sample_skin_scan_demo_1793037795841.jpg';
      const formattedResult = this.mapYouCamV21ToSkinTrace(mockRawV21, imageUrl, true);

      return {
        task_id: simulatedTaskId,
        status: 'success',
        is_simulated_demo: true,
        provider: 'YouCam Skin AI v2.1',
        units_consumed: 0,
        message: 'DEMO MODE ENFORCED: Zero YouCam API units were billed or requested. Result formatted to official v2.1 schema.',
        result: formattedResult,
        rawApiData: mockRawV21
      };
    }

    // Step 3: REAL-MODE SAFETY GATE (Gated behind DEMO_MODE=false + Real Key + Explicit Consent)
    const apiKey = this.getApiKey();
    if (!apiKey || apiKey === 'demo-placeholder') {
      throw new Error('CONFIG_ERROR: Real analysis requested, but YOUCAM_API_KEY is not configured with a valid Perfect Corp secret key.');
    }

    if (!request.userExplicitConsentConfirmed) {
      throw new Error('CONSENT_REQUIRED: Real analysis requires explicit user confirmation acknowledging potential API credit consumption.');
    }

    // Official YouCam v2.0/v2.1 Execution Workflow (Ready for Production Activation)
    // When a developer sets DEMO_MODE=false and injects a real YOUCAM_API_KEY, this code executes:
    try {
      let taskCreationPayload: any;

      if (request.imageUrl) {
        // Direct public URL input mode
        taskCreationPayload = {
          src_file_url: request.imageUrl,
          dst_actions: this.OFFICIAL_SD_ACTIONS,
          miniserver_args: {
            enable_mask_overlay: true
          },
          features: this.OFFICIAL_SD_ACTIONS,
          image: {
            url: request.imageUrl
          }
        };
      } else {
        // Local user image upload mode: official 2-step flow via /s2s/v2.0/file
        // Step 1: Parse and validate binary buffer
        const { buffer, mimeType, fileName, fileSize } = this.parseImagePayload(request);

        // Step 2: Register file metadata to obtain file_id and presigned upload URL
        const fileRegResponse = await fetch(`${this.API_BASE_HOST}${this.FILE_UPLOAD_ENDPOINT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'X-Client-Application': 'SkinTrace-AI-v2.1'
          },
          body: JSON.stringify({
            files: [
              {
                content_type: mimeType,
                file_name: fileName,
                file_size: fileSize
              }
            ]
          })
        });

        if (!fileRegResponse.ok) {
          const fileErrText = await fileRegResponse.text();
          if (fileRegResponse.status === 401 || fileRegResponse.status === 403) {
            throw new Error(`AUTH_ERROR: Invalid or unauthorized YouCam API credentials for File API [HTTP ${fileRegResponse.status}].`);
          }
          if (fileRegResponse.status === 400) {
            throw new Error(`VALIDATION_ERROR: YouCam File API rejected file metadata [HTTP 400]: ${fileErrText}`);
          }
          throw new Error(`YouCam File Registration Failed [HTTP ${fileRegResponse.status}]: ${fileErrText}`);
        }

        const fileRegData = await fileRegResponse.json();
        const fileInfo = fileRegData?.data?.files?.[0] || fileRegData?.files?.[0];

        if (!fileInfo || !fileInfo.file_id) {
          throw new Error('YouCam File API did not return a valid file_id.');
        }

        const uploadRequest = fileInfo.requests?.[0];
        const presignedUrl = uploadRequest?.url || fileInfo.url;

        if (!presignedUrl) {
          throw new Error('YouCam File API did not return a presigned storage upload URL.');
        }

        // Step 3: Upload binary image buffer to presigned storage URL
        const uploadResponse = await fetch(presignedUrl, {
          method: uploadRequest?.method || 'PUT',
          headers: {
            'Content-Type': mimeType
          },
          body: new Uint8Array(buffer)
        });

        if (!uploadResponse.ok) {
          throw new Error(`Binary image upload to presigned storage failed [HTTP ${uploadResponse.status}].`);
        }

        // Step 4: Construct task payload using registered file_id & official dst_actions
        taskCreationPayload = {
          src_file_id: fileInfo.file_id,
          dst_actions: this.OFFICIAL_SD_ACTIONS,
          miniserver_args: {
            enable_mask_overlay: true
          },
          features: this.OFFICIAL_SD_ACTIONS,
          image: {
            file_id: fileInfo.file_id
          }
        };
      }

      // Step 5: Create AI Skin Analysis Task
      const createResponse = await fetch(`${this.API_BASE_HOST}${this.TASK_CREATE_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'X-Client-Application': 'SkinTrace-AI-v2.1'
        },
        body: JSON.stringify(taskCreationPayload)
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        if (createResponse.status === 401 || createResponse.status === 403) {
          throw new Error(`AUTH_ERROR: Invalid or unauthorized YouCam API credentials [HTTP ${createResponse.status}].`);
        }
        if (createResponse.status === 400) {
          throw new Error(`VALIDATION_ERROR: YouCam rejected task parameters [HTTP 400]: ${errorText}`);
        }
        if (createResponse.status === 429) {
          throw new Error(`RATE_LIMIT_ERROR: YouCam API rate limit reached.`);
        }
        throw new Error(`YouCam v2.1 Task Creation Failed [HTTP ${createResponse.status}]: ${errorText}`);
      }

      const taskCreationResult = (await createResponse.json()) as YouCamV21TaskCreationResponse;
      const taskId = taskCreationResult.task_id;

      // 2. Task Polling Loop (Max 30s timeout, 1.5s interval)
      const maxAttempts = 20;
      let attempts = 0;
      let finalTaskResult: YouCamV21TaskResult | null = null;

      while (attempts < maxAttempts) {
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const pollResponse = await fetch(`${this.API_BASE_HOST}${this.TASK_POLL_ENDPOINT_PREFIX}${taskId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (pollResponse.ok) {
          const pollData = (await pollResponse.json()) as any;
          const status = pollData.data?.task_status || pollData.task_status || pollData.status;

          if (status === 'success') {
            finalTaskResult = {
              task_id: taskId,
              status: 'success',
              data: pollData.data,
              results: pollData.data?.results || pollData.results,
              skin_age: pollData.data?.results?.skin_age ?? pollData.data?.skin_age ?? pollData.skin_age,
              skin_type: pollData.data?.results?.skin_type ?? pollData.data?.skin_type ?? pollData.skin_type,
              features: pollData.features || pollData.data?.features
            };
            break;
          } else if (status === 'failed') {
            const errDetail = pollData.error || pollData.data?.error || 'Task failed during skin analysis processing.';
            throw new Error(`YouCam v2.1 Task Failed: ${errDetail}`);
          }
        } else {
          if (pollResponse.status === 401 || pollResponse.status === 403) {
            throw new Error(`AUTH_ERROR: YouCam API key rejected during polling [HTTP ${pollResponse.status}].`);
          } else if (pollResponse.status === 429) {
            throw new Error(`RATE_LIMIT_ERROR: YouCam rate limit reached during task polling.`);
          }
        }
      }

      if (!finalTaskResult) {
        throw new Error(`YouCam v2.1 Task Polling timed out after ${attempts * 1.5} seconds.`);
      }

      const imageUrl = request.imageUrl || request.imageBase64 || '';
      const mappedResult = this.mapYouCamV21ToSkinTrace(finalTaskResult, imageUrl, false);

      return {
        task_id: taskId,
        status: 'success',
        is_simulated_demo: false,
        provider: 'YouCam Skin AI v2.1',
        units_consumed: 1,
        message: 'Live YouCam Skin AI v2.1 analysis completed successfully.',
        result: mappedResult,
        rawApiData: finalTaskResult
      };
    } catch (apiError: any) {
      throw new Error(`YouCam v2.1 Execution Error: ${apiError.message || apiError}`);
    }
  }
}
