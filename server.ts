/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { YouCamService } from './src/server/youcamService.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function startServer() {
  const app = express();

  // Parse JSON payloads up to 12MB for base64 test images
  app.use(express.json({ limit: '12mb' }));

  // Security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    next();
  });

  // System Status & Guard Verification Endpoint
  app.get('/api/status', (req, res) => {
    try {
      const status = YouCamService.getSystemStatus();
      res.json(status);
    } catch (e: any) {
      res.status(500).json({ error: 'Failed to query system status' });
    }
  });

  // Guarded Skin Analysis Endpoint
  app.post('/api/analyze', async (req, res) => {
    try {
      const response = await YouCamService.analyzeSkin(req.body || {});
      res.json(response);
    } catch (err: any) {
      res.status(403).json({
        error: err.message || 'Analysis request rejected by safety gate',
        safetyBlocked: true,
        unitsConsumed: 0
      });
    }
  });

  if (!isProduction) {
    // Development mode: attach Vite dev server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve built assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SKINTRACE AI] Server running on http://0.0.0.0:${PORT} (DEMO_MODE=true guard active)`);
  });
}

startServer().catch((err) => {
  console.error('[SKINTRACE AI] Server failed to start:', err);
  process.exit(1);
});
