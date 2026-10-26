/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { runSimulatedSkinAnalysis } from '../services/analysisEngine';
import { SAMPLE_DEMO_SCANS } from '../services/storageService';
import { YouCamService } from '../server/youcamService';

/**
 * Basic Safety & Integrity Test Suite
 * Verifies zero-consumption guarantees, demo guards, routine state separation, and cautious wording.
 */
export async function runSafetyTests() {
  const results = {
    passed: 0,
    failed: 0,
    tests: [] as string[]
  };

  // Test 1: Verify YouCamService reports demoMode = true by default
  try {
    const status = YouCamService.getSystemStatus();
    if (status.demoMode === true && status.bonusUnitsProtected === 40 && status.unitsConsumed === 0) {
      results.passed++;
      results.tests.push('PASS: YouCamService defaults to DEMO_MODE=true with 40 units protected');
    } else {
      throw new Error(`Expected demoMode=true with 40 units protected, got: ${JSON.stringify(status)}`);
    }
  } catch (err: any) {
    results.failed++;
    results.tests.push(`FAIL Test 1: ${err.message}`);
  }

  // Test 2: Verify Simulated Analysis produces all 5 required skin metrics and contains DEMO DATA tag
  try {
    const analysis = await runSimulatedSkinAnalysis('test_image_seed');
    const metricIds = analysis.metrics.map(m => m.id);
    const required = ['texture', 'pores', 'redness', 'unevenTone', 'spots'];
    const hasAll = required.every(id => metricIds.includes(id as any));

    if (
      hasAll &&
      analysis.isDemo === true &&
      analysis.summary.includes('DEMO DATA') &&
      analysis.overallScore >= 50 &&
      analysis.overallScore <= 100
    ) {
      results.passed++;
      results.tests.push('PASS: Simulated analysis yields all 5 required categories with valid scores and DEMO DATA disclosure');
    } else {
      throw new Error(`Analysis missing metrics, DEMO tag, or invalid score`);
    }
  } catch (err: any) {
    results.failed++;
    results.tests.push(`FAIL Test 2: ${err.message}`);
  }

  // Test 3: Sample data validation (order & cautious cosmetic language)
  try {
    if (SAMPLE_DEMO_SCANS.length >= 3 && SAMPLE_DEMO_SCANS[0].metrics.length === 5) {
      // Check latest first ordering
      const isLatestFirst = SAMPLE_DEMO_SCANS[0].dateFormatted === 'Yesterday';
      const allHaveDemoTag = SAMPLE_DEMO_SCANS.every(s => s.summary.includes('DEMO DATA'));
      
      // Check no unsupported medical claims
      const bannedWords = ['collagen', 'erythema', 'cellular renewal', 'papules', 'comedones'];
      const rawText = JSON.stringify(SAMPLE_DEMO_SCANS).toLowerCase();
      const hasBannedWord = bannedWords.some(w => rawText.includes(w));

      if (isLatestFirst && allHaveDemoTag && !hasBannedWord) {
        results.passed++;
        results.tests.push('PASS: Pre-curated demo scans are ordered latest-first, labeled DEMO DATA, and free of unsupported clinical claims');
      } else {
        throw new Error(`SAMPLE_DEMO_SCANS consistency check failed (latestFirst=${isLatestFirst}, demoTag=${allHaveDemoTag}, banned=${hasBannedWord})`);
      }
    } else {
      throw new Error('SAMPLE_DEMO_SCANS incomplete');
    }
  } catch (err: any) {
    results.failed++;
    results.tests.push(`FAIL Test 3: ${err.message}`);
  }

  console.log(`[SAFETY TEST SUITE] Passed: ${results.passed}, Failed: ${results.failed}`);
  return results;
}
