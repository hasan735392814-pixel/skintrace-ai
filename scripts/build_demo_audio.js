import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const SCRIPT_DIR = path.resolve('presentation/scripts');
const AUDIO_TMP = path.resolve('temp_audio');

if (!fs.existsSync(SCRIPT_DIR)) fs.mkdirSync(SCRIPT_DIR, { recursive: true });
if (!fs.existsSync(AUDIO_TMP)) fs.mkdirSync(AUDIO_TMP, { recursive: true });

const scenes = [
  {
    id: 1,
    title: 'Introduction & Hackathon Mission',
    text: 'Welcome to SkinTrace AI, built for the YouCam API Skin AI and eCommerce Virtual Try-On Hackathon. SkinTrace AI empowers users to understand visible skin characteristics, track progress over time, and build consistent daily skincare habits. The platform operates in zero API consumption demo mode, protecting all forty YouCam bonus credits.'
  },
  {
    id: 2,
    title: 'Landing Page & Architectural Pillars',
    text: 'Our luxury landing experience highlights our core architectural pillars: in-browser local analysis, longitudinal progress tracking, daily routine compliance, and seamless eCommerce readiness, adhering to high-end cosmetic design standards.'
  },
  {
    id: 3,
    title: 'Personalized Skincare Dashboard',
    text: 'The dashboard gives users an immediate snapshot of their barrier health. Cards display overall cosmetic health, routine adherence streaks, and upcoming rituals. The top security banner confirms zero API units consumed.'
  },
  {
    id: 4,
    title: 'Local Skin Analysis & Safe Simulation',
    text: 'In the analysis studio, users can upload photos or use live camera capture with alignment guides. Here, we load our standardized studio portrait. When analyzed, our simulated engine processes visible texture, pore visibility, and redness harmony entirely in local browser memory.'
  },
  {
    id: 5,
    title: 'Cosmetic Results & Interactive Face Map',
    text: 'The results view displays an overall score of eighty-four out of one hundred, with balanced hydration and radiance. The interactive face map lets users click targeted observation markers. Individual cosmetic metrics offer gentle care guidance, which can be added directly to the daily routine.'
  },
  {
    id: 6,
    title: 'Longitudinal Skin Journey & Analytics',
    text: 'The Skin Journey section provides multi-week progress tracking. An interactive trajectory chart visualizes overall dermal vitality alongside dedicated filters for texture and redness, complemented by chronological milestone cards.'
  },
  {
    id: 7,
    title: 'Morning & Evening Routine Tracker',
    text: 'Consistency drives results. SkinTrace AI features separate morning and evening routines with independent completion states. Users can check off steps in real time, monitor completion progress, or add custom skincare steps.'
  },
  {
    id: 8,
    title: 'Arabic RTL & Global Inclusivity',
    text: 'Engineered for global reach, SkinTrace AI offers full bidirectional internationalization. With one click, the platform switches to a native Arabic right-to-left layout with Cairo typography, translated metrics, and mirrored navigation.'
  },
  {
    id: 9,
    title: 'Settings, Security Safeguards & Official YouCam Architecture',
    text: 'Finally, Settings showcases our strict zero-consumption guard. We have documented the official Perfect Corp asynchronous task and file upload pipeline, ensuring SkinTrace AI is fully prepared for live deployment.'
  }
];

async function buildAudio() {
  console.log('🎙️ Synthesizing concise narration audio segments with espeak-ng...');
  let fullNarrationText = '';
  let timestampsText = 'SKINTRACE AI — OFFICIAL HACKATHON DEMO VIDEO TIMESTAMPS\n';
  timestampsText += '===========================================================\n';
  timestampsText += 'Track: YouCam API Skin AI & eCommerce VTO Hackathon\n';
  timestampsText += 'Duration: ~2 Minutes (Within 1-3 Minute Hackathon Guidelines)\n';
  timestampsText += 'Safety: Zero API Consumption Mode Enforced (40/40 Units Safe)\n\n';

  let currentTotalSeconds = 0;
  const timingData = [];

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const wavPath = path.join(AUDIO_TMP, `scene_${scene.id}.wav`);
    
    // Generate spoken audio with natural cadence
    execSync(`espeak-ng -v en-us -s 156 -p 48 "${scene.text.replace(/"/g, '\\"')}" -w "${wavPath}"`);
    
    // Get audio duration
    const durStr = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${wavPath}"`).toString().trim();
    const duration = parseFloat(durStr);
    
    // Small inter-scene pause (0.5s)
    const paddedDuration = Math.round((duration + 0.5) * 10) / 10;

    const startMin = Math.floor(currentTotalSeconds / 60);
    const startSec = Math.floor(currentTotalSeconds % 60).toString().padStart(2, '0');
    const endTotal = currentTotalSeconds + paddedDuration;
    const endMin = Math.floor(endTotal / 60);
    const endSec = Math.floor(endTotal % 60).toString().padStart(2, '0');

    timestampsText += `[${startMin}:${startSec} - ${endMin}:${endSec}] Scene ${scene.id}: ${scene.title}\n`;
    fullNarrationText += `--- Scene ${scene.id}: ${scene.title} [${startMin}:${startSec} - ${endMin}:${endSec}] ---\n${scene.text}\n\n`;

    timingData.push({
      id: scene.id,
      title: scene.title,
      text: scene.text,
      wavPath,
      rawDuration: duration,
      duration: paddedDuration,
      startTime: currentTotalSeconds,
      endTime: endTotal
    });

    currentTotalSeconds = endTotal;
    console.log(`  ✓ Scene ${scene.id} synthesized: ${duration.toFixed(1)}s (Padded: ${paddedDuration}s) -> ${scene.title}`);
  }

  // Concatenate all scene audios into master narration
  const concatListPath = path.join(AUDIO_TMP, 'concat_list.txt');
  const concatContent = timingData.map(t => `file '${t.wavPath}'`).join('\n');
  fs.writeFileSync(concatListPath, concatContent);

  const masterAudioPath = path.join(AUDIO_TMP, 'master_narration.wav');
  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c copy "${masterAudioPath}"`);

  const totalMin = Math.floor(currentTotalSeconds / 60);
  const totalSec = Math.floor(currentTotalSeconds % 60).toString().padStart(2, '0');
  timestampsText += `\nTotal Video Duration: ${totalMin}:${totalSec} (~${Math.round(currentTotalSeconds)} seconds)\n`;

  // Write narration script and timestamps
  fs.writeFileSync(path.join(SCRIPT_DIR, 'demo-narration-en.txt'), fullNarrationText);
  fs.writeFileSync(path.join(SCRIPT_DIR, 'demo-timestamps.txt'), timestampsText);
  fs.writeFileSync(path.join(AUDIO_TMP, 'timing_data.json'), JSON.stringify(timingData, null, 2));

  console.log(`\n🎉 Narration audio complete! Total Duration: ${totalMin}:${totalSec} (${currentTotalSeconds.toFixed(1)}s)`);
}

buildAudio().catch(console.error);
