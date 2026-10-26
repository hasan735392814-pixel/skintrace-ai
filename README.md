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
| **YouCam Server Scaffold** | **Implemented** | Typed server module (`/src/server/youcamService.ts`) mirroring the official Perfect Corp API contract, with active `DEMO_MODE=true` server gate. |
| **Live YouCam API Network Polling** | *Planned (Gated)* | Live outbound task creation (`POST /v1.0/skin_analysis`) and polling loop (`GET /v1.0/skin_analysis/{id}`) is intentionally gated with a safety exception to prevent credit consumption. |
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
│  - Deterministic Simulation Engine (Zero External Calls)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
            Internal Local API │ /api/status, /api/analyze
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    NODE.JS EXPRESS SERVER                   │
│  - Vite Middleware Server (server.ts)                       │
│  - System Status Prober (GET /api/status)                   │
│  - Guarded Analysis Endpoint (POST /api/analyze)            │
│  - DEMO_MODE=true Safety Barrier (Rejects Unsafe Calls)     │
│  - YOUCAM_API_KEY Isolated in Server-Side Memory Only       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ [GATED IN DEMO MODE]
                               ▼
┌─────────────────────────────────────────────────────────────┐
│            OFFICIAL PERFECT CORP YOUCAM SKIN AI API         │
│  - POST https://api.perfectcorp.com/v1.0/skin_analysis      │
│  - GET  https://api.perfectcorp.com/v1.0/skin_analysis/{id} │
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

## 5. Live YouCam API Integration Blueprint (Future Production Setup)

To transition from the current safety-gated build to live YouCam API calls, the following exact steps and files must be updated based on the [Official Perfect Corp AI Skin Analysis Documentation](https://docs.perfectcorp.com/reference/ai_skin_analysis):

### Documented Official API Endpoints (Perfect Corp):
- **Base Domain:** `https://yce-api-01.makeupar.com`
- **Step 1 (File Target Initialization):** `POST https://yce-api-01.makeupar.com/s2s/v2.0/file`
  - **Headers:** `Authorization: Bearer <YOUCAM_API_KEY>`, `Content-Type: application/json`
  - **Output:** Returns pre-signed upload URL and `file_id`. Client/server streams binary image data directly to target.
- **Step 2 (Task Creation):** `POST https://yce-api-01.makeupar.com/s2s/v2.0/task/skin-analysis`
  - **Headers:** `Authorization: Bearer <YOUCAM_API_KEY>`, `Content-Type: application/json`
  - **Body Schema:**
    ```json
    {
      "src_file": {
        "file_id": "<UPLOADED_FILE_ID>"
      }
    }
    ```
  - **Response Schema:** `{ "task_id": "string", "task_status": "pending" }`
- **Step 3 (Status Polling):** `GET https://yce-api-01.makeupar.com/s2s/v2.0/task/skin-analysis/{task_id}`
  - **Polling Loop:** Queries until `task_status === "success"` (returns metrics, skin age, and overlay coordinates) or `"error"`.

### Exact Files to Modify for Live Activation:
1. **`.env`:**
   - Change `DEMO_MODE="false"`
   - Replace `YOUCAM_API_KEY="demo-placeholder"` with verified production Perfect Corp key.
2. **`/src/server/youcamService.ts`:**
   - In `analyzeSkin()`: Replace the safety exception with the 3-step pipeline: (a) file registration `POST /s2s/v2.0/file`, (b) binary upload, (c) task trigger `POST /s2s/v2.0/task/skin-analysis`.
   - Implement exponential backoff polling on `GET /s2s/v2.0/task/skin-analysis/{task_id}` until status is `success`.
   - Map real Perfect Corp metric scores into `SkinAnalysisResult`.
3. **`/src/components/AnalysisView.tsx`:**
   - Hook into live endpoint with an explicit confirmation dialog informing the user that 1 account credit will be consumed.
   - Transmit image bytes securely through the `/api/analyze` server proxy.

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

## 7. Devpost Submission Screenshots Checklist

Capture and upload these 7 screenshots for your Devpost project gallery:

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
