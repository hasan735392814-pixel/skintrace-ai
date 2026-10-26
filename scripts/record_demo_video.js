import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const TEMP_VIDEO_DIR = path.resolve('temp_video');
const OUTPUT_VIDEO = path.resolve('presentation/video/skintrace-ai-demo.mp4');
const TIMING_DATA_PATH = path.resolve('temp_audio/timing_data.json');
const MASTER_AUDIO_PATH = path.resolve('temp_audio/master_narration.wav');

if (!fs.existsSync(TEMP_VIDEO_DIR)) fs.mkdirSync(TEMP_VIDEO_DIR, { recursive: true });
if (!fs.existsSync(path.dirname(OUTPUT_VIDEO))) fs.mkdirSync(path.dirname(OUTPUT_VIDEO), { recursive: true });

async function recordDemo() {
  console.log('🎬 Initiating browser video recording session for SKINTRACE AI...');
  const timingData = JSON.parse(fs.readFileSync(TIMING_DATA_PATH, 'utf-8'));

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
      '--disable-dev-shm-usage'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: TEMP_VIDEO_DIR,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Helper to ensure a scene takes its exact target duration
  const runSceneWithTargetDuration = async (sceneId, actionFn) => {
    const scene = timingData.find(s => s.id === sceneId);
    const targetMs = scene.duration * 1000;
    const start = Date.now();
    console.log(`\n▶ [${scene.startTime.toFixed(1)}s - ${scene.endTime.toFixed(1)}s] Scene ${scene.id}: ${scene.title} (Target: ${scene.duration}s)`);
    
    try {
      await actionFn();
    } catch (err) {
      console.warn(`  Warning in Scene ${sceneId}:`, err.message);
    }

    const elapsed = Date.now() - start;
    const remaining = Math.max(0, targetMs - elapsed);
    if (remaining > 0) {
      await sleep(remaining);
    }
    console.log(`  ✓ Scene ${sceneId} complete (Ran: ${(Date.now() - start) / 1000}s)`);
  };

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // SCENE 1: Introduction & Hackathon Mission (Landing Page Hero)
  await runSceneWithTargetDuration(1, async () => {
    await page.click('button:has-text("SKINTRACE AI")');
    await sleep(2000);
    // Smooth micro mouse movement to show live UI responsiveness
    await page.mouse.move(500, 350);
    await sleep(2500);
    await page.mouse.move(960, 480);
    await sleep(3000);
    // Hover on CTA button
    const cta = await page.$('button:has-text("Start Skin Analysis")');
    if (cta) await cta.hover();
    await sleep(3000);
  });

  // SCENE 2: Landing Page & Architectural Pillars
  await runSceneWithTargetDuration(2, async () => {
    // Smooth scroll down to feature pillars
    await page.evaluate(() => window.scrollBy({ top: 750, behavior: 'smooth' }));
    await sleep(3500);
    await page.mouse.move(400, 600);
    await sleep(2500);
    await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
    await sleep(3500);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await sleep(1500);
  });

  // SCENE 3: Personalized Skincare Dashboard
  await runSceneWithTargetDuration(3, async () => {
    await page.click('header nav button:has-text("Dashboard")');
    await sleep(2500);
    await page.mouse.move(600, 300);
    await sleep(2000);
    // Open safety modal
    const learnMore = await page.$('aside button:has-text("Learn More")');
    if (learnMore) {
      await learnMore.click();
      await sleep(3500);
      const closeBtn = await page.$('button[aria-label="Close"], button[aria-label="Close dialog"]');
      if (closeBtn) await closeBtn.click();
      await sleep(1500);
    }
  });

  // SCENE 4: Local Skin Analysis & Safe Simulation
  await runSceneWithTargetDuration(4, async () => {
    await page.click('header nav button:has-text("Skin Analysis")');
    await sleep(2000);
    // Camera tab preview
    await page.click('button:has-text("Live Camera")');
    await sleep(2500);
    // Upload tab
    await page.click('button:has-text("Upload Photo")');
    await sleep(1500);
    // Load studio sample
    await page.click('button:has-text("Or try our studio sample portrait")');
    await sleep(2500);
    // Click analyze
    const analyzeBtn = await page.$('button:has-text("Analyze Skin (Simulated Demo)")');
    if (analyzeBtn) {
      await analyzeBtn.click();
      // Watch 4-stage modal progress in real time
      await sleep(4000);
    }
  });

  // SCENE 5: Cosmetic Results & Interactive Face Map
  await runSceneWithTargetDuration(5, async () => {
    await sleep(2000);
    // Click markers on face map
    const pins = await page.$$('div.relative.aspect-square button');
    if (pins.length > 0) {
      await pins[0].click();
      await sleep(2000);
      if (pins.length > 1) {
        await pins[1].click();
        await sleep(2000);
      }
    }
    // Scroll to 5 metrics
    await page.evaluate(() => window.scrollBy({ top: 550, behavior: 'smooth' }));
    await sleep(3000);
    // Click add to routine
    const addBtn = await page.$('button:has-text("Add to Daily Routine")');
    if (addBtn) {
      await addBtn.click();
      await sleep(2000);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await sleep(1500);
  });

  // SCENE 6: Longitudinal Skin Journey & Analytics
  await runSceneWithTargetDuration(6, async () => {
    await page.click('header nav button:has-text("Skin Journey")');
    await sleep(2500);
    // Filter texture
    await page.click('button:has-text("Skin Texture")');
    await sleep(2500);
    // Filter redness
    await page.click('button:has-text("Redness Balance")');
    await sleep(2500);
    // Scroll down to milestones
    await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
    await sleep(3500);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await sleep(1500);
  });

  // SCENE 7: Morning & Evening Routine Tracker
  await runSceneWithTargetDuration(7, async () => {
    await page.click('header nav button:has-text("Daily Routine")');
    await sleep(2000);
    // Toggle step
    const checkBtn = await page.$('div.p-5 button:has(svg)');
    if (checkBtn) {
      await checkBtn.click();
      await sleep(2000);
    }
    // Evening tab
    await page.click('button:has-text("Evening Ritual (PM)")');
    await sleep(2500);
    // Add step modal
    const addStepBtn = await page.$('button:has-text("Add Step")');
    if (addStepBtn) {
      await addStepBtn.click();
      await sleep(2500);
      const cancelBtn = await page.$('div.fixed button:has-text("Cancel")');
      if (cancelBtn) await cancelBtn.click();
      await sleep(1500);
    }
  });

  // SCENE 8: Arabic RTL & Global Inclusivity
  await runSceneWithTargetDuration(8, async () => {
    // Switch to Arabic
    await page.click('header button:has-text("العربية")');
    await sleep(2500);
    // Navigate in Arabic
    await page.click('header nav button:has-text("لوحة المتابعة")');
    await sleep(3500);
    await page.click('header nav button:has-text("الروتين اليومي")');
    await sleep(3500);
    // Switch back to English
    await page.click('header button:has-text("English")');
    await sleep(2000);
  });

  // SCENE 9: Settings, Security Safeguards & Official YouCam Architecture
  await runSceneWithTargetDuration(9, async () => {
    await page.click('header nav button:has-text("Settings & Safety")');
    await sleep(3000);
    await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
    await sleep(3500);
    await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
    await sleep(3500);
  });

  // Finish video recording
  console.log('\nClosing browser recording context...');
  const videoObj = page.video();
  await context.close();
  await browser.close();

  const rawVideoPath = await videoObj.path();
  console.log(`Raw video captured at: ${rawVideoPath}`);

  // Merge raw video with master narration audio and render final MP4
  console.log('\n🎞️ Encoding final presentation video to H.264/AAC with ffmpeg...');
  const ffmpegCmd = `ffmpeg -y -i "${rawVideoPath}" -i "${MASTER_AUDIO_PATH}" -filter_complex "[0:v]drawtext=text='DEMO MODE — ZERO API UNITS CONSUMED | SIMULATED COSMETIC ASSESSMENT':x=(w-text_w)/2:y=18:fontcolor=white@0.9:fontsize=22:box=1:boxcolor=black@0.65:boxborderw=8[v]" -map "[v]" -map 1:a -c:v libx264 -pix_fmt yuv420p -profile:v high -preset fast -crf 22 -c:a aac -b:a 192k -shortest "${OUTPUT_VIDEO}"`;

  execSync(ffmpegCmd);
  console.log(`\n🎉 MASTER DEMO VIDEO ENCODED SUCCESSFULLY!`);
  console.log(`Target: ${OUTPUT_VIDEO}`);
}

recordDemo().catch((err) => {
  console.error('Recording error:', err);
  process.exit(1);
});
