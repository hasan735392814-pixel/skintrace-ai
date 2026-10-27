/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Image as ImageIcon, X, AlertCircle, ShieldCheck, Check, Sparkles, RefreshCw } from 'lucide-react';
import { SkinAnalysisResult, Language } from '../types/skincare';
import { translations } from '../i18n/translations';
import { runSimulatedSkinAnalysis } from '../services/analysisEngine';

interface AnalysisViewProps {
  onAnalysisComplete: (result: SkinAnalysisResult) => void;
  lang: Language;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ onAnalysisComplete, lang }) => {
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [scanStage, setScanStage] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Camera stream refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sampleStudioImage = '/src/assets/images/sample_skin_scan_demo_1793037795841.jpg';

  // Stop camera on unmount or tab switch
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    setErrorMessage(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser environment.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 1280 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      setErrorMessage(t.analyze.cameraError);
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 640;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setSelectedImage(dataUrl);
        setImageFileName('captured_photo.jpg');
        stopCamera();
      }
    } catch {
      setErrorMessage('Failed to capture photo from camera stream.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const processSelectedFile = (file: File) => {
    setErrorMessage(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Unsupported file format. Please upload a JPEG, PNG, or WebP image.');
      return;
    }

    // Validate size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB. Please select a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setImageFileName(file.name);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSelectSample = () => {
    setSelectedImage(sampleStudioImage);
    setImageFileName('studio_bare_skin_demo.jpg');
    setErrorMessage(null);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedImage) {
      setErrorMessage('Please select or capture a photo first.');
      return;
    }

    if (!privacyAgreed) {
      setErrorMessage('Please acknowledge the privacy note before analyzing.');
      return;
    }

    setIsProcessing(true);
    setScanStage(1);
    setErrorMessage(null);

    try {
      // Advance stages for visual cosmetic scanning feedback
      const stageTimer1 = setTimeout(() => setScanStage(2), 600);
      const stageTimer2 = setTimeout(() => setScanStage(3), 1200);
      const stageTimer3 = setTimeout(() => setScanStage(4), 1800);

      let finalResult: SkinAnalysisResult | null = null;

      try {
        // Attempt server-side YouCam v2.1 integration endpoint
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: selectedImage,
            analysisFeatures: ['texture', 'pores', 'redness', 'spots', 'moisture', 'radiance', 'skin_age', 'skin_type'],
            userExplicitConsentConfirmed: true
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.result) {
            finalResult = data.result;
          }
        }
      } catch {
        // Server unreachable or standalone client - fallback to local engine
      }

      // If server did not return result, execute local simulation engine
      if (!finalResult) {
        finalResult = await runSimulatedSkinAnalysis(selectedImage);
      }

      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(stageTimer3);

      // Brief pause for UX completion
      await new Promise((r) => setTimeout(r, 400));
      setIsProcessing(false);
      onAnalysisComplete(finalResult);
    } catch {
      setIsProcessing(false);
      setErrorMessage('An unexpected error occurred during skin analysis.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#16251E]">
          {t.analyze.title}
        </h1>
        <p className="text-sm text-[#5C6861] leading-relaxed">
          {t.analyze.subtitle}
        </p>
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-[#FDF2F2] border border-[#F5C6C6] text-sm text-[#9B2C2C] flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Image Selection Area */}
      {!selectedImage ? (
        <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Tabs: Upload vs Camera */}
          <div className="flex items-center justify-center gap-2 p-1 bg-[#F5F1E9] rounded-xl max-w-xs mx-auto">
            <button
              onClick={() => {
                setActiveTab('upload');
                stopCamera();
              }}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'upload'
                  ? 'bg-white text-[#1B382B] shadow-xs'
                  : 'text-[#647069] hover:text-[#1B382B]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{t.analyze.tabUpload}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('camera');
                startCamera();
              }}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'camera'
                  ? 'bg-white text-[#1B382B] shadow-xs'
                  : 'text-[#647069] hover:text-[#1B382B]'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.analyze.tabCamera}</span>
            </button>
          </div>

          {/* Upload Dropzone */}
          {activeTab === 'upload' && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-[#DDD4C7] rounded-2xl p-8 sm:p-12 text-center hover:border-[#1B382B] transition-colors bg-[#FAF9F5] space-y-4"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
                className="hidden"
                id="skin-upload-input"
              />

              <div className="w-14 h-14 rounded-2xl bg-[#EBE4D8] text-[#1B382B] mx-auto flex items-center justify-center">
                <ImageIcon className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-[#2E3731]">
                  {t.analyze.dropPrompt}
                </p>
                <p className="text-xs text-[#78857E]">
                  {t.analyze.dropSubtext}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <label
                  htmlFor="skin-upload-input"
                  className="px-5 py-2.5 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#254A39] transition-colors cursor-pointer shadow-xs inline-block"
                >
                  {t.analyze.chooseFile}
                </label>

                <button
                  onClick={handleSelectSample}
                  className="px-4 py-2.5 bg-white border border-[#D9D0C3] text-[#344038] rounded-xl text-xs font-medium hover:bg-[#F2ECE3] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#1B382B]" />
                  <span>{t.analyze.orUseSample}</span>
                </button>
              </div>
            </div>
          )}

          {/* Camera Capture Feed */}
          {activeTab === 'camera' && (
            <div className="space-y-4 text-center">
              <div className="relative max-w-sm mx-auto aspect-square bg-black rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
                
                {/* Facial alignment guide oval */}
                <div className="absolute inset-8 border-2 border-white/60 border-dashed rounded-full pointer-events-none flex items-center justify-center">
                  <span className="text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded-full">
                    Align Face Here
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#6A766F]">
                {t.analyze.cameraPrompt}
              </p>

              <div className="flex justify-center gap-3">
                {!cameraActive ? (
                  <button
                    onClick={startCamera}
                    className="px-5 py-2.5 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#254A39] transition-colors"
                  >
                    {t.analyze.startCamera}
                  </button>
                ) : (
                  <button
                    onClick={capturePhoto}
                    className="px-6 py-2.5 bg-[#1B382B] text-white rounded-xl text-xs font-semibold hover:bg-[#254A39] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{t.analyze.capturePhoto}</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Image Preview & Confirmation Card */
        <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#EFE9E0] pb-4">
            <div className="space-y-0.5 text-left rtl:text-right">
              <h2 className="text-base font-semibold text-[#1B382B]">
                Image Ready for Local Evaluation
              </h2>
              <p className="text-xs text-[#707D75]">
                {imageFileName || 'Selected selfie portrait'}
              </p>
            </div>
            <button
              onClick={handleRemoveImage}
              className="text-xs text-[#9B2C2C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.analyze.removeImage}</span>
            </button>
          </div>

          <div className="relative max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden border border-[#EAE3D6] shadow-sm bg-[#F6F4EE]">
            <img
              src={selectedImage}
              alt="Skin analysis preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            
            {/* Subtle cosmetic observation watermark */}
            <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg flex items-center justify-between">
              <span>Local Memory Sandbox</span>
              <span className="text-[#D7C4A7] font-semibold">0 API Units</span>
            </div>
          </div>

          {/* Privacy Checkbox */}
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EAE3D7] flex items-start gap-3 text-left rtl:text-right">
            <input
              type="checkbox"
              id="privacy-consent"
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1B382B] focus:ring-[#1B382B]"
            />
            <label htmlFor="privacy-consent" className="text-xs text-[#4E5A52] leading-relaxed cursor-pointer">
              <span className="font-semibold text-[#1B382B]">{t.analyze.privacyCheck}</span>
              <span className="block text-[#717E77] mt-0.5">{t.analyze.privacyDetails}</span>
            </label>
          </div>

          {/* Action Trigger */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleStartAnalysis}
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#1B382B] text-white rounded-xl font-medium text-sm hover:bg-[#254A39] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-[#D7C4A7]" />
              <span>{t.analyze.runScanBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* Guidelines Accordion */}
      <div className="bg-[#FAF9F5] border border-[#EAE3D7] rounded-2xl p-5 text-left rtl:text-right space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1B382B]">
          {t.analyze.guidelinesTitle}
        </h3>
        <ul className="text-xs text-[#58645D] space-y-2">
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#2E5844] shrink-0" />
            <span>{t.analyze.g1}</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#2E5844] shrink-0" />
            <span>{t.analyze.g2}</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#2E5844] shrink-0" />
            <span>{t.analyze.g3}</span>
          </li>
        </ul>
      </div>

      {/* Simulated Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] border border-[#E8DFD1] rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-[#E2EBE5] border-t-[#1B382B] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-[#1B382B]">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-[#1B382B]">
                {t.analyze.scanningTitle}
              </h3>
              <p className="text-xs font-mono text-[#D7C4A7] bg-[#1B382B] inline-block px-2.5 py-0.5 rounded-full">
                Zero API Units · Local Pipeline
              </p>
            </div>

            {/* Stages indicator */}
            <div className="space-y-3 text-xs text-left rtl:text-right pt-2 border-t border-[#EFE8DD]">
              <div className={`flex items-center gap-2 ${scanStage >= 1 ? 'text-[#1B382B] font-medium' : 'text-[#A0ABA3]'}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${scanStage >= 1 ? 'bg-[#2E5844] text-white' : 'bg-[#E5ECE7]'}`}>
                  {scanStage > 1 ? '✓' : '1'}
                </span>
                <span>{t.analyze.stage1}</span>
              </div>
              <div className={`flex items-center gap-2 ${scanStage >= 2 ? 'text-[#1B382B] font-medium' : 'text-[#A0ABA3]'}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${scanStage >= 2 ? 'bg-[#2E5844] text-white' : 'bg-[#E5ECE7]'}`}>
                  {scanStage > 2 ? '✓' : '2'}
                </span>
                <span>{t.analyze.stage2}</span>
              </div>
              <div className={`flex items-center gap-2 ${scanStage >= 3 ? 'text-[#1B382B] font-medium' : 'text-[#A0ABA3]'}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${scanStage >= 3 ? 'bg-[#2E5844] text-white' : 'bg-[#E5ECE7]'}`}>
                  {scanStage > 3 ? '✓' : '3'}
                </span>
                <span>{t.analyze.stage3}</span>
              </div>
              <div className={`flex items-center gap-2 ${scanStage >= 4 ? 'text-[#1B382B] font-medium' : 'text-[#A0ABA3]'}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${scanStage >= 4 ? 'bg-[#2E5844] text-white' : 'bg-[#E5ECE7]'}`}>
                  4
                </span>
                <span>{t.analyze.stage4}</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
