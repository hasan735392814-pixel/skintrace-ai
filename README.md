# SKINTRACE AI — Premium AI Skincare Tracking Platform

> **Hackathon Track:** YouCam API Skin AI & eCommerce VTO Hackathon  
> **Tagline:** Understand Your Skin. Track Your Progress.  
> **Repository:** Final Hackathon Submission Build

---

## 1. Executive Summary: Problem & Solution

### The Problem
Traditional skincare consumers struggle with two key problems:
1. **Subjective Uncertainty:** It is difficult to evaluate whether a new skincare product or routine is actually improving visible surface texture, pore appearance, or redness over time without clinical instruments.
2. **Disconnected Commerce:** Skincare recommendations often feel generic or disconnected from the user's specific skin undertone, moisture level, and daily ritual consistency.

### The Solution: SKINTRACE AI
**SKINTRACE AI** bridges the gap between diagnostic clarity, daily habit adherence, and beauty commerce:
- **Visual Skin Analysis:** Evaluates key visible cosmetic metrics (Texture, Pore Visibility, Redness Balance, Even Skin Tone, and Clarity & Spots) with an interactive face concern map.
- **Longitudinal Tracking:** Recharts analytics comparing historical milestones over time to visualize progress without false biological promises.
- **Daily Skincare Rituals:** Morning (AM) and Evening (PM) trackers that calculate separate completion states and reset daily.
- **Bilingual Accessibility:** Full English (LTR) and native Arabic (العربية - RTL) support with bidirectional typography.
- **Zero-Consumption Architecture:** Built with an ironclad default safeguard (`DEMO_MODE=true`) protecting the developer's 40 bonus API units during judging, testing, and evaluation.

---

## 2. Feature Matrix: Implemented vs. Planned

| Feature Area | Status | Implementation Details |
| :--- | :---: | :--- |
| **Editorial Beauty-Tech UI** | **Implemented** | Warm ivory (`#FAF8F5`), forest green (`#1B382B`), champagne accents (`#D7C4A7`), zero-pill metadata discipline, and high-fidelity cosmetic photography. |
| **Bilingual i18n (EN / AR RTL)** | **Implemented** | Full English (LTR) and Arabic (RTL) localization covering all navigation, labels, metric cards, routine checklists, tooltips, and modal dialogs. |
| **Zero-Credit Safeguard** | **Implemented** | `DEMO_MODE=true` hard-coded default on client and server. 40 YouCam bonus credits preserved with 0 units consumed. Top indicator banner with audit modal. |
| **Client-Side Image Processing** | **Implemented** | Local file upload (drag-and-drop, JPEG/PNG/WebP up to 10MB) and live webcam capture with face-framing guide. 100% in-browser memory; 0 bytes sent externally. |
| **Local Simulation Analysis Engine** | **Implemented** | 4-stage cosmetic evaluation pipeline generating deterministic scores for Texture, Pores, Redness, Tone, and Spots. Prominently labeled `DEMO DATA`. |
| **Interactive Face Concern Map** | **Implemented** | Interactive marker points on the portrait with toggles to inspect target zones and localized cosmetic care suggestions. |
| **Longitudinal Progress Charts** | **Implemented** | Responsive Recharts time-series chart with multi-metric segment switching (Overall Vitality, Texture, Pores, Redness, Tone, Spots). |
| **Daily Ritual Tracker (AM & PM)** | **Implemented** | Independent Morning and Evening completion states, accurate daily progress ring, midnight reset logic, custom step creation, and one-click additions from analysis. |
| **Offline Data Management** | **Implemented** | Complete data storage in `localStorage`, one-click JSON backup export, individual milestone deletion, and secure full-wipe confirmation dialog. |
| **YouCam v2.1 Server Integration** | **Implemented** | Official YouCam Skin AI v2.1 client (`/src/server/youcamService.ts`) with image validation (max 10MB, JPEG/PNG/WebP), task payload construction, polling loop, and schema transformer. |
| **Zero-Credit Safeguard** | **Implemented** | `DEMO_MODE=true` hard-coded default on client and server. 40 YouCam bonus credits preserved with 0 units consumed. Top indicator banner with audit modal. |
| **Live YouCam API Execution** | *Gated for Safety* | Ready for production activation. Outbound HTTP requests to `https://yce-api-01.makeupar.com` are intercepted by the `DEMO_MODE=true` safety shutter to prevent accidental consumption. |
| **eCommerce Virtual Try-On (VTO)** | *Planned (Roadmap)* | Integration with Perfect Corp's Virtual Makeup and Foundation Shade Matcher to preview tinted SPF and complexion products calibrated to the user's analyzed undertone. |

---

## 3. Architecture & Security Model

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENT BROWSER                        │
│  - React 19 + TypeScript SPA (Vite)                         │
│  - Tailwind CSS v4 + Cormorant Garamond / Cairo Typography  │
│  - Recharts Progress Visualizer                             │
│  - HTML5 Canvas & getUserMedia Camera Feed                  │
│  - LocalStorage Engine (Preferences, Routines, Milestones)  │
│  - Deterministic Simulation Engine & Local Fallback         │
└──────────────────────────────┬──────────────────────────────┘
                               │
            Internal Local API │ /api/status, /api/analyze
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    NODE.JS EXPRESS SERVER                   │
│  - Vite Middleware Server (server.ts)                       │
│  - System Status Prober (GET /api/status)                   │
│  - Guarded Analysis Endpoint (POST /api/analyze)            │
│  - Image Pre-Validator (10MB limit, JPEG/PNG/WebP)          │
│  - YouCam v2.1 Task Generator & Result Transformer          │
│  - DEMO_MODE=true Safety Barrier (Zero API Consumption)     │
│  - YOUCAM_API_KEY Isolated in Server-Side Memory Only       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ [GATED IN DEMO MODE — 0 CALLS]
                               ▼
┌─────────────────────────────────────────────────────────────┐
│            OFFICIAL PERFECT CORP YOUCAM SKIN AI v2.1        │
│  - Host: https://yce-api-01.makeupar.com                    │
│  - Task: POST /s2s/v2.1/task/skin-analysis                  │
│  - Poll: GET  /s2s/v2.1/task/skin-analysis/{task_id}        │
│  - 40 Evaluation Bonus Units 100% Intact & Protected        │
└─────────────────────────────────────────────────────────────┘
```

### Privacy Protections
- **No Cloud Uploads in Demo Mode:** All user selfies remain strictly inside volatile browser memory.
- **No Biometric Fingerprinting:** No biometric vectors or facial embeddings are stored or transmitted.
- **Zero Tracker Injections:** No Google Analytics, cookies, or third-party tracking scripts are installed.
- **Non-Medical Cosmetic Disclaimer:** Explicitly stated on all screens that the platform provides cosmetic-education guidance, not medical diagnosis or clinical treatment.

---

## 4. Setup & Verification Instructions

### Clean Setup:
```bash
# 1. Install dependencies
npm install

# 2. Verify TypeScript types and lint
npm run lint

# 3. Build production bundle
npm run build

# 4. Start the application
npm run dev
```
The server will start on `http://0.0.0.0:3000` with `DEMO_MODE=true` active by default.

---

## 5. Official YouCam Skin AI API v2.1 Integration

SKINTRACE AI includes a production-ready, typed integration adhering to the [Official Perfect Corp AI Skin Analysis v2.1 Documentation](https://docs.perfectcorp.com/reference/ai_skin_analysis/v2.1).

### Documented Official API Specification:
- **Base Domain:** `https://yce-api-01.makeupar.com`
- **Authentication:** `Authorization: Bearer <YOUCAM_API_KEY>` (server-side only)
- **Step 1 — Input Validation (`YouCamService.validateImageInput`):**
  - Enforces JPEG, PNG, or WebP formats.
  - Enforces maximum file size limit of 10MB.
- **Step 2 — File Registration & Binary Upload (For Local Images):**
  - **Endpoint:** `POST https://yce-api-01.makeupar.com/s2s/v2.0/file`
  - **Payload:**
    ```json
    {
      "files": [
        {
          "content_type": "image/jpeg",
          "file_name": "selfie.jpg",
          "file_size": 1048576
        }
      ]
    }
    ```
  - **Upload:** Sends image binary buffer via HTTP `PUT` to the returned presigned storage URL (`requests[0].url`).
- **Step 3 — Task Creation:**
  - **Endpoint:** `POST https://yce-api-01.makeupar.com/s2s/v2.1/task/skin-analysis`
  - **Payload (Uploaded File):**
    ```json
    {
      "features": ["texture", "pores", "redness", "spots", "moisture", "radiance", "skin_age", "skin_type"],
      "image": {
        "file_id": "<REGISTERED_FILE_ID>"
      }
    }
    ```
  - **Payload (Public URL Mode):**
    ```json
    {
      "features": ["texture", "pores", "redness", "spots", "moisture", "radiance", "skin_age", "skin_type"],
      "image": {
        "url": "https://example.com/photo.jpg"
      }
    }
    ```
  - **Response:** `{ "task_id": "string", "status": "created" }`
- **Step 4 — Task Status Polling:**
  - **Endpoint:** `GET https://yce-api-01.makeupar.com/s2s/v2.1/task/skin-analysis/{task_id}`
  - **Loop:** Polls with safe backoff (1.5s interval, up to 30s timeout) until `status: "success"`.
- **Step 5 — Schema Transformation (`YouCamService.mapYouCamV21ToSkinTrace`):**
  - Converts raw YouCam feature scores (0-100) and severity levels into the internal `SkinAnalysisResult` model.

### Activating Live API Mode (When Ready):
To disengage the safety shutter and execute real calls against your Perfect Corp account:
1. Update `.env`:
   ```bash
   DEMO_MODE="false"
   YOUCAM_API_KEY="<YOUR_OFFICIAL_PERFECT_CORP_API_KEY>"
   ```
2. Restart the Node server: `npm run dev`
3. In the UI, run a scan. The system will dispatch through `POST /s2s/v2.1/task/skin-analysis` and display the live result with the `[YOUCAM API v2.1 LIVE]` badge and Task ID.

---

## 6. Demo Video Storyboard (2-Minute Presentation)

| Timestamp | Visual | Audio Narrative | Key Screen |
| :--- | :--- | :--- | :--- |
| **0:00 - 0:25** | High-end Landing Page with luxury editorial design and bilingual switcher. | *"Welcome to SKINTRACE AI, built for the YouCam API Skin AI & eCommerce VTO Hackathon. Consumers invest billions in skincare, yet lack an objective way to see if their routines are working. SKINTRACE AI solves this through visual skin analysis, longitudinal tracking, and daily routine consistency."* | **Landing Page** |
| **0:25 - 0:45** | Top Demo Mode banner (`40/40 Units Safe`), click "Learn More" to open Safety Audit. | *"For this hackathon, we built an ironclad zero-consumption safeguard. By default, DEMO_MODE=true protects all 40 bonus account units while showcasing a full, production-ready application."* | **Safety Audit Modal** |
| **0:45 - 1:15** | Navigate to Skin Analysis. Show live webcam preview / studio sample. Click "Analyze Skin (Simulated Demo)". Progress stages animate. | *"Users can capture a photo via camera or upload a selfie. All processing occurs locally in browser memory. In demo mode, our deterministic engine computes illustrative cosmetic scores without contacting external servers."* | **Skin Analysis** |
| **1:15 - 1:40** | Skin Insights overview. Click interactive markers on face map. Show 5 metric cards (Texture, Pores, Redness, Tone, Spots). Click "Save to Journey" and "Add to Routine". | *"Our interactive concern map highlights localized areas like cheek redness and pore appearance. Users get non-medical cosmetic suggestions and can add recommended ingredients directly to their daily ritual."* | **Results View** |
| **1:40 - 2:05** | Navigate to Skin Journey. Show Recharts line graph comparing baseline to latest scan. Filter by Texture and Redness. | *"The Skin Journey timeline tracks changes over time, visualizing multi-metric progress week over week to validate routine consistency."* | **Journey View** |
| **2:05 - 2:20** | Navigate to Daily Routine. Show AM vs. PM tabs. Toggle cleanser. Show completion ring update (50% AM, 29% overall). | *"The routine tracker separates morning and evening completion states, automatically resetting at midnight to encourage daily adherence."* | **Routine View** |
| **2:20 - 2:30** | Switch language to Arabic (RTL). Entire layout instantly flips gracefully. | *"With full English and native Arabic RTL support, SKINTRACE AI delivers an accessible, luxury beauty-tech experience for global consumers."* | **Bilingual Toggle** |

---

## 7. Devpost Submission Screenshots & Video Assets

The repository includes a ready-to-submit presentation package captured directly from the live application:
- **Playable Demo Video:** `presentation/video/skintrace-ai-demo.mp4` (1080p, 2:34 duration, synchronized narration & captions).
- **Presentation Inventory:** `presentation/PRESENTATION-REPORT.md` (complete catalog of scenes, resolution, and timestamps).
- **Pre-captured Screenshots:** 31 full-resolution PNG images are available in `presentation/screenshots/` (covering desktop, mobile, and Arabic RTL views).

Recommended core screenshots for your Devpost project gallery:

1. **`01_hero_editorial.png`**  
   *View:* Landing Page Hero  
   *What it shows:* Headline "Your Skin Journey, Made Visible", luxury editorial photography, 3-zone header, and the persistent Zero-Consumption safeguard banner.
2. **`02_skin_analysis_camera.png`**  
   *View:* Analysis View  
   *What it shows:* Studio sample / live camera view with face-framing oval overlay, upload dropzone, privacy checkbox, and zero-credit badge.
3. **`03_interactive_skin_map.png`**  
   *View:* Results View (Top Half)  
   *What it shows:* Luminous analyzed portrait with interactive numbered target markers, overall Vitality Index (88/100), hydration and radiance scores, and the `DEMO DATA` disclosure.
4. **`04_metric_breakdown_recommendations.png`**  
   *View:* Results View (Bottom Half)  
   *What it shows:* 5 detailed cosmetic metric cards (Texture, Pores, Redness, Tone, Spots) with progress bars, and one-click "Add to Daily Routine" buttons.
5. **`05_longitudinal_journey_chart.png`**  
   *View:* Skin Journey View  
   *What it shows:* Recharts multi-milestone trend line showing progression from 14 days ago to yesterday, metric filter tabs, and milestone card history.
6. **`06_daily_routine_am_pm.png`**  
   *View:* Daily Routine View  
   *What it shows:* Morning vs. Evening tabs, daily completion ring (percentage), step-by-step checklist, and the luxury skincare still-life banner.
7. **`07_arabic_rtl_layout.png`**  
   *View:* Dashboard or Results in Arabic (العربية)  
   *What it shows:* Complete right-to-left orientation, Cairo typography, mirrored navigation, and localized Arabic metrics.
