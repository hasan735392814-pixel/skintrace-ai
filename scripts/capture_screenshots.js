import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.resolve('presentation/screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function captureAll() {
  console.log('🚀 Starting complete real application screenshot capture...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
  });

  // 1. Desktop Browser Context (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2 // High-DPI crisp retina output
  });

  const page = await desktopContext.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Helper screenshot saver
  const save = async (filename, fullPage = false) => {
    const dest = path.join(SCREENSHOT_DIR, filename);
    await page.screenshot({ path: dest, fullPage });
    console.log(`  ✓ Saved [Desktop]: ${filename}`);
  };

  // Helper wait
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // --- 01 & 02: Landing Page ---
  console.log('\n--- Capturing Landing Page ---');
  await page.click('button:has-text("SKINTRACE AI")');
  await wait(600);
  await save('01-landing-hero.png');

  // Scroll down to features & architecture pillars
  await page.evaluate(() => window.scrollBy({ top: 750, behavior: 'instant' }));
  await wait(500);
  await save('02-landing-features.png');

  // --- 03 & 04: Dashboard ---
  console.log('\n--- Capturing Dashboard ---');
  await page.click('header nav button:has-text("Dashboard")');
  await wait(600);
  await save('03-dashboard.png');

  await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'instant' }));
  await wait(500);
  await save('04-dashboard-recent.png');
  await page.evaluate(() => window.scrollTo(0, 0));

  // --- 05: Safety Audit Modal ---
  console.log('\n--- Capturing Safety Audit Modal ---');
  const learnMoreBtn = await page.$('aside button:has-text("Learn More")');
  if (learnMoreBtn) {
    await learnMoreBtn.click();
    await wait(500);
    await save('05-safety-audit-modal.png');
    // Close modal
    await page.click('button[aria-label="Close"]');
    await wait(400);
  }

  // --- 06, 07, 08, 09: Analysis Page & Simulation ---
  console.log('\n--- Capturing Analysis Flow ---');
  await page.click('header nav button:has-text("Skin Analysis")');
  await wait(600);
  await save('06-analysis-upload.png');

  // Switch to Camera Tab
  await page.click('button:has-text("Live Camera")');
  await wait(600);
  await save('07-analysis-camera.png');

  // Switch back to Upload Tab
  await page.click('button:has-text("Upload Photo")');
  await wait(400);

  // Click "Or try our studio sample portrait"
  await page.click('button:has-text("Or try our studio sample portrait")');
  await wait(600);
  await save('08-analysis-preview.png');

  // Trigger analysis and capture progress modal
  console.log('Triggering simulated scan...');
  const analyzeBtn = await page.$('button:has-text("Analyze Skin (Simulated Demo)")');
  if (analyzeBtn) {
    await analyzeBtn.click();
    // Wait for the modal animation
    await wait(600);
    await save('09-analysis-progress.png');
    // Wait for simulation to finish (takes ~2.6s) and navigate to results
    await wait(3000);
  }

  // --- 10, 11, 12, 13: Results Page ---
  console.log('\n--- Capturing Results Page ---');
  await wait(800);
  await save('10-results-overview.png');

  // Click on marker 1 on the interactive face map
  const markers = await page.$$('div.relative.aspect-square button');
  if (markers.length > 0) {
    await markers[0].click();
    await wait(500);
  }
  await save('11-results-interactive-map.png');

  // Scroll to 5 metric breakdown cards
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'instant' }));
  await wait(500);
  await save('12-results-metric-cards.png');

  // Add a recommended step to routine
  const addRecBtn = await page.$('button:has-text("Add to Daily Routine")');
  if (addRecBtn) {
    await addRecBtn.click();
    await wait(500);
  }
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: 'instant' }));
  await wait(500);
  await save('13-results-recommendations.png');

  // --- 14, 15, 16, 17: Skin Journey View ---
  console.log('\n--- Capturing Journey View ---');
  await page.click('header nav button:has-text("Skin Journey")');
  await wait(800);
  await save('14-journey-chart-overall.png');

  // Filter by Texture
  await page.click('button:has-text("Skin Texture")');
  await wait(500);
  await save('15-journey-chart-texture.png');

  // Filter by Redness
  await page.click('button:has-text("Redness Balance")');
  await wait(500);
  await save('16-journey-chart-redness.png');

  // Scroll down to historical milestones
  await page.evaluate(() => window.scrollBy({ top: 650, behavior: 'instant' }));
  await wait(500);
  await save('17-journey-milestones.png');
  await page.evaluate(() => window.scrollTo(0, 0));

  // --- 18, 19, 20, 21: Routine View ---
  console.log('\n--- Capturing Skincare Routine View ---');
  await page.click('header nav button:has-text("Daily Routine")');
  await wait(600);
  await save('18-routine-morning.png');

  // Switch to Evening Routine
  await page.click('button:has-text("Evening Ritual (PM)")');
  await wait(500);
  await save('19-routine-evening.png');

  // Switch back to Morning and toggle a step
  await page.click('button:has-text("Morning Ritual (AM)")');
  await wait(400);

  // Toggle the first routine item checkbox
  const checkBtn = await page.$('div.p-5 button:has(svg)');
  if (checkBtn) {
    await checkBtn.click();
    await wait(400);
  }
  await save('20-routine-step-toggled.png');

  // Open "Add Step" modal
  const addStepBtn = await page.$('button:has-text("Add Step")');
  if (addStepBtn) {
    await addStepBtn.click();
    await wait(500);
    await save('21-routine-add-modal.png');
    // Close modal
    const closeBtn = await page.$('div.fixed button:has-text("Cancel"), button[aria-label="Close"]');
    if (closeBtn) await closeBtn.click();
    await wait(400);
  }

  // --- 22 & 23: Settings View ---
  console.log('\n--- Capturing Settings View ---');
  await page.click('header nav button:has-text("Settings & Safety")');
  await wait(600);
  await save('22-settings-safeguards.png');

  await page.evaluate(() => window.scrollBy({ top: 650, behavior: 'instant' }));
  await wait(500);
  await save('23-settings-privacy-disclaimer.png');
  await page.evaluate(() => window.scrollTo(0, 0));

  // --- 24: About Hackathon Modal ---
  console.log('\n--- Capturing About Hackathon Modal ---');
  const aboutBtn = await page.$('header button:has-text("About")');
  if (aboutBtn) {
    await aboutBtn.click();
    await wait(600);
    await save('24-about-modal.png');
    // Close about modal
    const closeAbout = await page.$('button[aria-label="Close dialog"], button[aria-label="Close"]');
    if (closeAbout) await closeAbout.click();
    await wait(400);
  }

  // --- 25, 26, 27: Arabic RTL Layout ---
  console.log('\n--- Capturing Arabic RTL Layout ---');
  // Toggle language to Arabic
  const langBtn = await page.$('header button:has-text("العربية")');
  if (langBtn) {
    await langBtn.click();
    await wait(600);
  }

  // 25. Arabic Dashboard
  await page.click('header nav button:has-text("لوحة المتابعة")');
  await wait(600);
  await save('25-arabic-rtl-dashboard.png');

  // 26. Arabic Results View
  await page.evaluate(() => window.scrollTo(0, 0));
  const viewScanLink = await page.$('button:has-text("عرض التقرير الكامل")');
  if (viewScanLink) {
    await viewScanLink.click();
    await wait(600);
    await save('26-arabic-rtl-results.png');
  } else {
    await page.click('header nav button:has-text("رحلة البشرة")');
    await wait(500);
    const firstScan = await page.$('div[role="button"], button:has-text("عرض")');
    if (firstScan) await firstScan.click();
    await wait(600);
    await save('26-arabic-rtl-results.png');
  }

  // 27. Arabic Routine View
  await page.click('header nav button:has-text("الروتين اليومي")');
  await wait(600);
  await save('27-arabic-rtl-routine.png');

  // Switch back to English
  const enBtn = await page.$('header button:has-text("English")');
  if (enBtn) {
    await enBtn.click();
    await wait(500);
  }

  await desktopContext.close();

  // --- Mobile Views (390x844 iPhone 14 style) ---
  console.log('\n--- Capturing Mobile Responsive Views (390x844) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  const mPage = await mobileContext.newPage();
  await mPage.goto(BASE_URL, { waitUntil: 'networkidle' });

  const mSave = async (filename) => {
    const dest = path.join(SCREENSHOT_DIR, filename);
    await mPage.screenshot({ path: dest });
    console.log(`  ✓ Saved [Mobile]: ${filename}`);
  };

  // 28. Mobile Landing
  await mPage.click('button:has-text("SKINTRACE AI")');
  await wait(600);
  await mSave('28-mobile-landing.png');

  // 29. Mobile Dashboard
  await mPage.click('button[aria-label="Toggle navigation menu"]', { force: true });
  await wait(400);
  await mPage.click('div.lg\\:hidden button:has-text("Dashboard")', { force: true });
  await wait(600);
  await mSave('29-mobile-dashboard.png');

  // 30. Mobile Results
  const mScanBtn = await mPage.$('button:has-text("Review Full Insights"), button:has-text("View Full Assessment")');
  if (mScanBtn) {
    await mScanBtn.click({ force: true });
    await wait(800);
  }
  await mSave('30-mobile-results.png');

  // 31. Mobile Routine
  await mPage.click('button[aria-label="Toggle navigation menu"]', { force: true });
  await wait(400);
  await mPage.click('div.lg\\:hidden button:has-text("Daily Routine")', { force: true });
  await wait(600);
  await mSave('31-mobile-routine.png');

  await mobileContext.close();
  await browser.close();

  console.log('\n🎉 ALL 31 SCREENSHOTS SUCCESSFULLY CAPTURED FROM REAL APPLICATION!');
}

captureAll().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
