/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types/skincare';

export interface Translations {
  common: {
    appName: string;
    tagline: string;
    demoBadge: string;
    demoSafeNotice: string;
    unitsProtectedNotice: string;
    unitsZeroConsumed: string;
    simulatedResult: string;
    save: string;
    cancel: string;
    delete: string;
    clear: string;
    confirm: string;
    back: string;
    done: string;
    learnMore: string;
    close: string;
    optimal: string;
    moderate: string;
    needsCare: string;
    date: string;
    loading: string;
    privacyNotice: string;
    medicalDisclaimer: string;
  };
  nav: {
    home: string;
    dashboard: string;
    analyze: string;
    journey: string;
    routine: string;
    settings: string;
    startScan: string;
    exploreDemo: string;
  };
  landing: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    guaranteeText: string;
    featuresTitle: string;
    featuresSubtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    zeroCostTitle: string;
    zeroCostDesc: string;
    privacyBannerTitle: string;
    privacyBannerDesc: string;
  };
  dashboard: {
    welcome: string;
    welcomeSubtitle: string;
    quickScanCta: string;
    latestScanTitle: string;
    noScansTitle: string;
    noScansDesc: string;
    loadStarterData: string;
    routineTitle: string;
    routineCompleted: string;
    routineGoTo: string;
    viewFullAnalysis: string;
    overallSkinIndex: string;
    radianceLevel: string;
    hydrationLevel: string;
    journeyTrend: string;
    trendSubtitle: string;
  };
  analyze: {
    title: string;
    subtitle: string;
    tabUpload: string;
    tabCamera: string;
    dropPrompt: string;
    dropSubtext: string;
    chooseFile: string;
    orUseSample: string;
    cameraPrompt: string;
    startCamera: string;
    capturePhoto: string;
    retake: string;
    removeImage: string;
    cameraError: string;
    guidelinesTitle: string;
    g1: string;
    g2: string;
    g3: string;
    privacyCheck: string;
    privacyDetails: string;
    runScanBtn: string;
    scanningTitle: string;
    stage1: string;
    stage2: string;
    stage3: string;
    stage4: string;
  };
  results: {
    title: string;
    subtitle: string;
    simulatedAlert: string;
    overallScore: string;
    skinType: string;
    radiance: string;
    hydration: string;
    interactiveMapTitle: string;
    interactiveMapDesc: string;
    hideOverlays: string;
    showOverlays: string;
    metricsTitle: string;
    textureName: string;
    poresName: string;
    rednessName: string;
    toneName: string;
    spotsName: string;
    routineRecommendations: string;
    addStepToRoutine: string;
    stepAdded: string;
    saveToJourney: string;
    savedSuccess: string;
    backToDashboard: string;
  };
  journey: {
    title: string;
    subtitle: string;
    chartTitle: string;
    chartMetricLabel: string;
    allMetrics: string;
    historyTimeline: string;
    emptyJourneyTitle: string;
    emptyJourneyDesc: string;
    startFirstScan: string;
    loadDemoHistory: string;
    deleteEntry: string;
    deleteConfirm: string;
    clearAll: string;
    clearAllConfirm: string;
    clearAllWarning: string;
    entryDate: string;
  };
  routine: {
    title: string;
    subtitle: string;
    morningTab: string;
    eveningTab: string;
    todayProgress: string;
    allDonePraise: string;
    addStepBtn: string;
    addStepTitle: string;
    stepTitleLabel: string;
    stepProductLabel: string;
    stepCategoryLabel: string;
    stepTimeLabel: string;
    cleanseCat: string;
    hydrateCat: string;
    treatCat: string;
    moisturizeCat: string;
    protectCat: string;
    bothTimes: string;
    resetNote: string;
    emptyRoutine: string;
  };
  settings: {
    title: string;
    subtitle: string;
    demoSectionTitle: string;
    demoSectionDesc: string;
    unitGuardTitle: string;
    unitGuardDesc: string;
    youcamArchTitle: string;
    youcamArchDesc: string;
    endpointLabel: string;
    securityNote: string;
    languageSectionTitle: string;
    storageSectionTitle: string;
    storageDesc: string;
    exportData: string;
    resetDemoData: string;
    disclaimerSectionTitle: string;
    disclaimerFull: string;
    privacyFull: string;
    versionInfo: string;
  };
  about: {
    title: string;
    hackathonTitle: string;
    hackathonDesc: string;
    zeroCostPolicyTitle: string;
    zeroCostPolicyDesc: string;
    architectureOverview: string;
    vtoSynergyTitle: string;
    vtoSynergyDesc: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      appName: "SKINTRACE AI",
      tagline: "Understand Your Skin. Track Your Progress.",
      demoBadge: "DEMO MODE — 0 API Units Consumed",
      demoSafeNotice: "Operating safely in local Demo Mode. 40 YouCam API bonus credits remain 100% untouched.",
      unitsProtectedNotice: "40 Bonus Units Intact",
      unitsZeroConsumed: "0 Units Used",
      simulatedResult: "SIMULATED DEMO RESULT",
      save: "Save Entry",
      cancel: "Cancel",
      delete: "Delete",
      clear: "Clear All",
      confirm: "Confirm",
      back: "Back",
      done: "Done",
      learnMore: "Learn More",
      close: "Close",
      optimal: "Balanced",
      moderate: "Moderate",
      needsCare: "Needs Attention",
      date: "Date",
      loading: "Processing skin scan...",
      privacyNotice: "Privacy Notice: In Demo Mode, your photo is processed strictly inside your browser memory. No images or biometric data are transmitted to any external server.",
      medicalDisclaimer: "Non-Medical Disclaimer: SKINTRACE AI provides cosmetic and educational insights for daily skincare wellness. It does not provide medical diagnosis, pathology detection, or prescription advice."
    },
    nav: {
      home: "Overview",
      dashboard: "Dashboard",
      analyze: "Skin Analysis",
      journey: "Skin Journey",
      routine: "Daily Routine",
      settings: "Settings & Safety",
      startScan: "Start Analysis",
      exploreDemo: "Explore Demo"
    },
    landing: {
      heroKicker: "Cosmetic Intelligence & Habit Tracking",
      heroTitle: "Your Skin Journey, Made Visible.",
      heroSubtitle: "Track skin clarity, visible texture, and barrier consistency over time with precision AI insights. Built for conscious skincare lovers.",
      ctaPrimary: "Start Skin Analysis",
      ctaSecondary: "Explore Interactive Demo",
      guaranteeText: "100% local processing in Demo Mode · Zero API credits billed · Privacy first",
      featuresTitle: "Precision Skincare, Grounded in Consistency",
      featuresSubtitle: "Understand your skin's visual evolution through longitudinal tracking, barrier education, and balanced daily rituals.",
      f1Title: "Visual Skin Analysis",
      f1Desc: "Map visible texture, surface hydration, redness balance, and pore appearance without confusing dermatological jargon.",
      f2Title: "Longitudinal Progress",
      f2Desc: "Track subtle improvements week over week with comparative visual histories and multi-metric trend charts.",
      f3Title: "Harmonized Routine",
      f3Desc: "Pair evidence-based skincare rituals (cleanser, barrier serum, SPF) with an intuitive morning and evening tracker.",
      zeroCostTitle: "Zero API Consumption Safeguard",
      zeroCostDesc: "Built specifically for the YouCam API Hackathon with deterministic local evaluation, protecting your account units while demonstrating a production-grade UI architecture.",
      privacyBannerTitle: "Your Face Never Leaves Your Device",
      privacyBannerDesc: "All image analysis in Demo Mode happens exclusively in your browser's local sandbox memory. No third-party uploads, no cookies, no tracking."
    },
    dashboard: {
      welcome: "Welcome to Your Skin Space",
      welcomeSubtitle: "Here is your latest skincare synthesis, routine adherence, and visual progress.",
      quickScanCta: "New Analysis",
      latestScanTitle: "Latest Skin Assessment",
      noScansTitle: "No Scan History Recorded Yet",
      noScansDesc: "Complete your first skin scan or load curated demo records to explore the visual comparison engine.",
      loadStarterData: "Load Curated Demo Data",
      routineTitle: "Today's Skincare Ritual",
      routineCompleted: "completed today",
      routineGoTo: "Manage Routine",
      viewFullAnalysis: "Review Full Insights",
      overallSkinIndex: "Skin Vitality Index",
      radianceLevel: "Radiance Balance",
      hydrationLevel: "Surface Hydration",
      journeyTrend: "Journey Progression",
      trendSubtitle: "Metric trajectory across saved assessments"
    },
    analyze: {
      title: "Skin Analysis",
      subtitle: "Capture or upload a clear, makeup-free selfie in soft, natural daylight for the most reliable visual reading.",
      tabUpload: "Upload Photo",
      tabCamera: "Live Camera",
      dropPrompt: "Drop your portrait here or browse files",
      dropSubtext: "Supports JPEG, PNG, and WebP (up to 10MB)",
      chooseFile: "Choose Image",
      orUseSample: "Or try our studio sample portrait",
      cameraPrompt: "Center your face inside the oval frame with even front lighting",
      startCamera: "Activate Camera",
      capturePhoto: "Capture Photo",
      retake: "Retake Photo",
      removeImage: "Remove Image",
      cameraError: "Unable to access camera. Please verify camera permissions or upload a file instead.",
      guidelinesTitle: "For Best Assessment Accuracy",
      g1: "Remove heavy makeup, tinted SPF, and glasses",
      g2: "Face natural window light, avoiding harsh shadows",
      g3: "Keep a relaxed, neutral facial expression",
      privacyCheck: "I understand that my image remains local on this device and will not be transmitted externally in Demo Mode.",
      privacyDetails: "Zero API credits are consumed. You can delete or clear your image at any time.",
      runScanBtn: "Analyze Skin (Simulated Demo)",
      scanningTitle: "Evaluating Visible Cosmetic Features (Simulated)...",
      stage1: "Aligning facial framing and cosmetic zones...",
      stage2: "Scanning visible surface texture and light dispersion...",
      stage3: "Assessing visual redness and surface tone harmony...",
      stage4: "Synthesizing non-medical cosmetic suggestions..."
    },
    results: {
      title: "Skin Insights Overview",
      subtitle: "Deterministic breakdown of key cosmetic metrics, surface characteristics, and ritual recommendations.",
      simulatedAlert: "DEMO MODE NOTICE: These are illustrative simulated metrics designed for hackathon demonstration. They were not derived from analyzing your uploaded photo and do not represent a biological assessment. No external YouCam API units were billed.",
      overallScore: "Vitality Index",
      skinType: "Observed Type",
      radiance: "Radiance",
      hydration: "Hydration",
      interactiveMapTitle: "Interactive Skin Concern Map",
      interactiveMapDesc: "Select an observation point on the preview to inspect target zones and localized cosmetic suggestions.",
      hideOverlays: "Hide Markers",
      showOverlays: "Show Markers",
      metricsTitle: "Detailed Metric Breakdown",
      textureName: "Skin Texture",
      poresName: "Pore Visibility",
      rednessName: "Redness Balance",
      toneName: "Even Skin Tone",
      spotsName: "Clarity & Spots",
      routineRecommendations: "Complementary Skincare Focus",
      addStepToRoutine: "Add to Daily Routine",
      stepAdded: "Added to Routine!",
      saveToJourney: "Save to Skin Journey",
      savedSuccess: "Saved to Your History!",
      backToDashboard: "Return to Dashboard"
    },
    journey: {
      title: "Skin Journey & Progress",
      subtitle: "Observe longitudinal changes, compare saved milestones, and track how consistent daily care supports skin balance.",
      chartTitle: "Comparative Metric Trajectory",
      chartMetricLabel: "Focus Metric",
      allMetrics: "Overall Vitality",
      historyTimeline: "Saved Assessment Milestones",
      emptyJourneyTitle: "Your Timeline is Fresh",
      emptyJourneyDesc: "Save your first skin analysis to start building a visual evolution record.",
      startFirstScan: "Analyze Skin Now",
      loadDemoHistory: "Load Demo Timeline",
      deleteEntry: "Remove",
      deleteConfirm: "Are you sure you want to remove this milestone?",
      clearAll: "Clear Entire Journey",
      clearAllConfirm: "Delete all saved journey milestones?",
      clearAllWarning: "This action deletes all locally stored skin assessments from your browser cache. This cannot be undone.",
      entryDate: "Recorded on"
    },
    routine: {
      title: "Daily Skincare Ritual",
      subtitle: "Consistency is the foundation of skin barrier health. Track your morning defense and evening restoration rituals.",
      morningTab: "Morning Ritual (AM)",
      eveningTab: "Evening Ritual (PM)",
      todayProgress: "Today's Ritual Completion",
      allDonePraise: "All steps finished for today! Your barrier thanks you.",
      addStepBtn: "Add Step",
      addStepTitle: "Add Routine Step",
      stepTitleLabel: "Step Name",
      stepProductLabel: "Product Name (Optional)",
      stepCategoryLabel: "Category",
      stepTimeLabel: "Schedule",
      cleanseCat: "Cleanse",
      hydrateCat: "Hydrate",
      treatCat: "Treat / Active",
      moisturizeCat: "Moisturize",
      protectCat: "Protect (SPF)",
      bothTimes: "Morning & Evening",
      resetNote: "Checkmarks automatically reset each calendar day at midnight.",
      emptyRoutine: "No ritual steps configured yet. Add your cleanser, moisturizer, or SPF to get started."
    },
    settings: {
      title: "Settings & System Safeguards",
      subtitle: "Inspect zero-consumption API safeguards, manage local privacy data, and configure language preferences.",
      demoSectionTitle: "YouCam API Zero-Consumption Architecture",
      demoSectionDesc: "To protect your 40 bonus account units during testing and presentation, SKINTRACE AI strictly isolates all skin analysis to local browser execution.",
      unitGuardTitle: "Credit Guard Status",
      unitGuardDesc: "DEMO_MODE=true is permanently hard-coded as the default environment barrier. Live API calls to YouCam Skin AI are blocked at the server and client levels.",
      youcamArchTitle: "YouCam Official API Scaffold",
      youcamArchDesc: "A complete, typed server integration layer has been scaffolded targeting the documented Perfect Corp AI Skin Analysis endpoint (/s2s/v2.0/task/skin-analysis). Live invocation requires server DEMO_MODE=false, explicit user unit confirmation, and validated API credentials.",
      endpointLabel: "Target Endpoint",
      securityNote: "Secrets Security: YOUCAM_API_KEY is restricted to server-side memory only and is never bundled in frontend JavaScript.",
      languageSectionTitle: "Language & Display",
      storageSectionTitle: "Local Device Storage",
      storageDesc: "All skin assessments, routine histories, and preferences are stored exclusively in your browser's localStorage. Nothing is sent to cloud storage.",
      exportData: "Export Data (JSON)",
      resetDemoData: "Reset All Local Data",
      disclaimerSectionTitle: "Legal & Cosmetic Disclaimers",
      disclaimerFull: "SKINTRACE AI is an informational and cosmetic tracking platform intended for wellness and general skincare awareness. It is not an FDA-cleared or CE-marked medical device. It does not diagnose, treat, cure, or prevent any dermatological condition, melanoma, infection, or disease. Consult a board-certified dermatologist for medical concerns.",
      privacyFull: "Privacy Commitment: We do not collect biometric facial embeddings, sell consumer data, or use user-uploaded photos for AI training. When operating in Demo Mode, image blobs remain in local device memory and can be cleared at any time.",
      versionInfo: "SKINTRACE AI v1.0.0-hackathon (Zero-Consumption Demo Build)"
    },
    about: {
      title: "About SKINTRACE AI",
      hackathonTitle: "YouCam API Skin AI & eCommerce VTO Hackathon",
      hackathonDesc: "Built to demonstrate how advanced skin diagnostic AI seamlessly bridges the gap between diagnostic clarity, longitudinal habit adherence, and intelligent virtual try-on commerce.",
      zeroCostPolicyTitle: "Zero API Consumption Compliance",
      zeroCostPolicyDesc: "Designed with an ironclad zero-cost safeguard to ensure zero bonus units are consumed during judging and iterative development. All analysis screens showcase authentic visual states, responsive metrics, and realistic skincare workflows using deterministic simulation.",
      architectureOverview: "Architecture & Tech Stack",
      vtoSynergyTitle: "Future eCommerce VTO Integration",
      vtoSynergyDesc: "The future production version connects YouCam Skin Analysis results directly with Perfect Corp's Virtual Try-On (VTO) and product recommendation APIs, enabling users to test tinted SPF, foundations, and targeted serums calibrated to their exact skin undertone."
    }
  },
  ar: {
    common: {
      appName: "سكين تريس ذكاء اصطناعي",
      tagline: "افهمي بشرتك. تابعي تقدمك بثقة.",
      demoBadge: "الوضع التجريبي — 0 وحدات مستهلكة",
      demoSafeNotice: "يعمل التطبيق بأمان في الوضع التجريبي المحلي. رصيد الـ 40 وحدة من يو كام محفوظ بنسبة 100%.",
      unitsProtectedNotice: "40 وحدة مكافأة محفوظة",
      unitsZeroConsumed: "0 وحدات مستخدمة",
      simulatedResult: "نتيجة تجريبية محاكاة",
      save: "حفظ النتيجة",
      cancel: "إلغاء",
      delete: "حذف",
      clear: "مسح الكل",
      confirm: "تأكيد",
      back: "رجوع",
      done: "تم",
      learnMore: "معرفة المزيد",
      close: "إغلاق",
      optimal: "متوازن",
      moderate: "متوسط",
      needsCare: "يحتاج عناية",
      date: "التاريخ",
      loading: "جاري تحليل البشرة...",
      privacyNotice: "إشعار الخصوصية: في الوضع التجريبي، تُعالج صورتك محلياً داخل متصفحك فقط دون إرسال أي صورة إلى خوادم خارجية.",
      medicalDisclaimer: "إخلاء مسؤولية غير طبي: يقدم هذا التطبيق تحليلات تجميلية وإرشادية للروتين اليومي، ولا يقدم أي تشخيص أو علاج طبي."
    },
    nav: {
      home: "الرئيسية",
      dashboard: "لوحة المتابعة",
      analyze: "تحليل البشرة",
      journey: "رحلة البشرة",
      routine: "الروتين اليومي",
      settings: "الإعدادات والأمان",
      startScan: "بدء الفحص",
      exploreDemo: "استكشاف التجربة"
    },
    landing: {
      heroKicker: "ذكاء العناية بالبشرة ومتابعة النتائج",
      heroTitle: "رحلة بشرتك، واضحة وملموسة.",
      heroSubtitle: "تابعي نقاء البشرة، وتجانس الملمس، وقوة الحاجز الجلدي بمرور الوقت مع تحليلات دقيقة مدعومة بالذكاء الاصطناعي.",
      ctaPrimary: "ابدئي تحليل البشرة",
      ctaSecondary: "استكشاف العرض التوضيحي",
      guaranteeText: "معالجة محلية 100% في الوضع التجريبي · صفر استهلاك لرصيد الواجهة البرمجية · الخصوصية أولاً",
      featuresTitle: "عناية دقيقة مبنية على الاستمرارية",
      featuresSubtitle: "افهمي التطور المرئي لبشرتك من خلال التتبع المستمر، والتوعية بصحة الحاجز الواقي، وعادات العناية اليومية.",
      f1Title: "تحليل بصري للبشرة",
      f1Desc: "فحص ملمس البشرة، ومستوى الترطيب السطحي، وتوازن الاحمرار، ووضوح المسام بلغة واضحة وبسيطة.",
      f2Title: "متابعة التقدم الزمني",
      f2Desc: "راقبي التحسن الأسبوعي خطوة بخطوة عبر سجل تاريخي مرئي ورسوم بيانية توضح مسار كل مؤشر.",
      f3Title: "روتين متناغم ومتوازن",
      f3Desc: "اربطي خطوات العناية المثبتة (تنظيف، سيروم حاجز البشرة، واقي شمس) مع متتبع يومي صباحي ومسائي.",
      zeroCostTitle: "حماية تامة من استهلاك الرصيد",
      zeroCostDesc: "تم بناء التطبيق خصيصاً لمسابقة YouCam API مع نظام محاكاة محلي يحمي وحدات حسابك البالغة 40 وحدة من أي استهلاك غير مقصود.",
      privacyBannerTitle: "صورتك لا تغادر جهازك أبداً",
      privacyBannerDesc: "تتم جميع عمليات فحص الصور في الوضع التجريبي داخل ذاكرة جهازك الخاصة دون أي خوادم خارجية أو ملفات تتبع."
    },
    dashboard: {
      welcome: "مرحباً بك في مساحتك الخاصة بالبشرة",
      welcomeSubtitle: "إليكِ أحدث قراءات بشرتك، ومعدل إنجاز الروتين، ومسار التقدم.",
      quickScanCta: "فحص جديد",
      latestScanTitle: "أحدث قراءة للبشرة",
      noScansTitle: "لا توجد قراءات مسجلة بعد",
      noScansDesc: "ابدئي فحصك الأول للبشرة أو قومي بتحميل بيانات العرض التوضيحي لتجربة محرك المقارنة المرئية.",
      loadStarterData: "تحميل بيانات تجريبية جاهزة",
      routineTitle: "روتين العناية لليوم",
      routineCompleted: "مكتمل اليوم",
      routineGoTo: "إدارة الروتين",
      viewFullAnalysis: "عرض التقرير الكامل",
      overallSkinIndex: "مؤشر حيوية البشرة",
      radianceLevel: "توازن النضارة",
      hydrationLevel: "الترطيب السطحي",
      journeyTrend: "مسار التطور",
      trendSubtitle: "تغير المؤشرات عبر الفحوصات المحفوظة"
    },
    analyze: {
      title: "تحليل البشرة",
      subtitle: "التقطي صورة واضحة بدون مكياج في ضوء طبيعي هادئ للحصول على أدق قراءة تجميلية.",
      tabUpload: "رفع صورة",
      tabCamera: "الكاميرا المباشرة",
      dropPrompt: "اسحبي صورتك إلى هنا أو اختاري ملفاً",
      dropSubtext: "يدعم JPEG و PNG و WebP (حتى 10 ميجابايت)",
      chooseFile: "اختيار صورة",
      orUseSample: "أو جربي صورة الاستوديو التوضيحية",
      cameraPrompt: "ضعي وجهك في منتصف الإطار البيضاوي مع إضاءة أمامية متساوية",
      startCamera: "تفعيل الكاميرا",
      capturePhoto: "التقاط الصورة",
      retake: "إعادة الالتقاط",
      removeImage: "إزالة الصورة",
      cameraError: "تعذر فتح الكاميرا. يرجى التأكد من منح الأذونات في المتصفح أو رفع صورة بدلاً من ذلك.",
      guidelinesTitle: "لأفضل نتيجة فحص",
      g1: "إزالة المكياج وواقي الشمس الملون والنظارات",
      g2: "الوقوف في مواجهة ضوء النهار وتجنب الظلال الحادة",
      g3: "الحفاظ على تعبير وجه هادئ وطبيعي",
      privacyCheck: "أوافق وأعلم أن صورتي ستظل محفوظة محلياً في جهازي ولن يتم إرسالها إلى خوادم خارجية في الوضع التجريبي.",
      privacyDetails: "لن يتم استهلاك أي رصيد من يو كام. يمكنك مسح صورتك في أي وقت.",
      runScanBtn: "تحليل البشرة (محاكاة تجريبية)",
      scanningTitle: "تقييم الخصائص التجميلية الظاهرة (محاكاة)...",
      stage1: "مطابقة إطار الوجه والمناطق الجمالية...",
      stage2: "فحص ملمس البشرة الظاهر وتوزيع الضوء...",
      stage3: "تقييم الاحمرار الظاهر وتناسق اللون السطحي...",
      stage4: "إعداد تقرير العناية التجميلية الإرشادي..."
    },
    results: {
      title: "تقرير البشرة التجميلي",
      subtitle: "تفصيل مؤشرات نضارة البشرة وخصائص الملمس وتوصيات الروتين المقترحة.",
      simulatedAlert: "تنبيه الوضع التجريبي: هذه نتائج محاكاة توضيحية تم إعدادها لأغراض تقييم الهاكاثون ولم تُشتق من فحص الصورة المرفوعة، ولا تمثل تشخيصاً طبياً أو بيولوجياً. صفر استهلاك لرصيد يو كام.",
      overallScore: "مؤشر الحيوية",
      skinType: "نوع البشرة الملاحظ",
      radiance: "النضارة",
      hydration: "الترطيب",
      interactiveMapTitle: "خريطة تفاعلية لملاحظات البشرة",
      interactiveMapDesc: "انقري على أي نقطة في المعاينة لمعاينة المنطقة المقابلة والاقتراحات التجميلية المناسبة.",
      hideOverlays: "إخفاء العلامات",
      showOverlays: "إظهار العلامات",
      metricsTitle: "تفاصيل المؤشرات الفردية",
      textureName: "ملمس البشرة",
      poresName: "وضوح المسام",
      rednessName: "توازن الاحمرار",
      toneName: "توحيد لون البشرة",
      spotsName: "الصفاء والبقع",
      routineRecommendations: "تركيز الروتين المقترح",
      addStepToRoutine: "إضافة للروتين اليومي",
      stepAdded: "تمت الإضافة للروتين!",
      saveToJourney: "حفظ في رحلة البشرة",
      savedSuccess: "تم الحفظ في السجل!",
      backToDashboard: "العودة للوحة المتابعة"
    },
    journey: {
      title: "رحلة البشرة والتقدم",
      subtitle: "راقبي التغيرات الزمنية وقارني القراءات المحفوظة لتكتشفي أثر الالتزام بروتينك اليومي.",
      chartTitle: "مقارنة مسار المؤشرات عبر الزمن",
      chartMetricLabel: "المؤشر المعروض",
      allMetrics: "الحيوية الإجمالية",
      historyTimeline: "محطات الفحص المحفوظة",
      emptyJourneyTitle: "سجل الرحلة فارغ حالياً",
      emptyJourneyDesc: "احفظي فحصك الأول لتبدئي في بناء سجلك المرئي للتقدم.",
      startFirstScan: "فحص البشرة الآن",
      loadDemoHistory: "تحميل سجل تجريبي",
      deleteEntry: "حذف",
      deleteConfirm: "هل أنتِ متأكدة من حذف هذا الفحص من السجل؟",
      clearAll: "مسح السجل بالكامل",
      clearAllConfirm: "مسح جميع محطات رحلة البشرة؟",
      clearAllWarning: "سيؤدي هذا إلى مسح كافة القراءات المحفوظة محلياً في متصفحك بشكل دائم.",
      entryDate: "سُجلت في"
    },
    routine: {
      title: "روتين العناية اليومي",
      subtitle: "الاستمرارية هي سر صحة حاجز البشرة. تابعي طقوس الحماية الصباحية والترميم المسائي.",
      morningTab: "الروتين الصباحي (AM)",
      eveningTab: "الروتين المسائي (PM)",
      todayProgress: "إنجاز روتين اليوم",
      allDonePraise: "أحسنتِ! تم إنجاز جميع الخطوات لليوم بنجاح.",
      addStepBtn: "إضافة خطوة",
      addStepTitle: "إضافة خطوة جديدة للروتين",
      stepTitleLabel: "اسم الخطوة",
      stepProductLabel: "اسم المنتج (اختياري)",
      stepCategoryLabel: "التصنيف",
      stepTimeLabel: "الوقت",
      cleanseCat: "تنظيف",
      hydrateCat: "ترطيب مائي",
      treatCat: "علاج / مادة فعالة",
      moisturizeCat: "ترطيب كريمي",
      protectCat: "حماية (واقي شمس)",
      bothTimes: "صباحاً ومساءً",
      resetNote: "تتم إعادة تعيين علامات الإنجاز تلقائياً عند منتصف ليل كل يوم جديد.",
      emptyRoutine: "لا توجد خطوات مضافة بعد. أضيفي منظفك أو المرطب أو واقي الشمس للبدء."
    },
    settings: {
      title: "الإعدادات وحماية النظام",
      subtitle: "استعراض حواجز الأمان لعدم استهلاك رصيد يو كام، وإدارة البيانات المحلية، وخيارات اللغة.",
      demoSectionTitle: "معمارية حماية رصيد YouCam API (صفر استهلاك)",
      demoSectionDesc: "لحماية رصيد حسابكم البالغ 40 وحدة أثناء التحكيم والاختبار، يعتمد التطبيق عزلاً تاماً لجميع عمليات الفحص داخل المتصفح المحلي.",
      unitGuardTitle: "حالة حارس الرصيد",
      unitGuardDesc: "تم تفعيل DEMO_MODE=true بشكل افتراضي ثابت لمنع أي استدعاء خارجي للواجهة البرمجية على مستوى الخادم والمتصفح.",
      youcamArchTitle: "طبقة التكامل الرسمية مع YouCam",
      youcamArchDesc: "تم بناء هيكل التكامل البرمجي استناداً للتوثيق الرسمي لمنصة Perfect Corp لمسار (/s2s/v2.0/task/skin-analysis). ويتطلب التفعيل الحقيقي موافقة صريحة ومفتاح API صالح وإيقاف الوضع التجريبي.",
      endpointLabel: "المسار المستهدف",
      securityNote: "حماية المفاتيح: يتم الاحتفاظ بمفتاح YOUCAM_API_KEY على جانب الخادم فقط ولا يتم إرساله للواجهة الأمامية أبداً.",
      languageSectionTitle: "اللغة والاتجاه",
      storageSectionTitle: "التخزين المحلي على الجهاز",
      storageDesc: "تُحفظ جميع الفحوصات والروتين في التخزين المحلي (localStorage) لمتصفحك فقط ولا ترسل إلى أي تخزين سحابي.",
      exportData: "تصدير البيانات (JSON)",
      resetDemoData: "إعادة ضبط البيانات المحلية",
      disclaimerSectionTitle: "إخلاء المسؤولية القانوني والتجميلي",
      disclaimerFull: "تطبيق سكين تريس ذكاء اصطناعي هو أداة رقمية لأغراض تجميلية وتوعوية عامة، وليس جهازاً طبياً معتمداً. لا يهدف إلى تشخيص أو علاج أو الوقاية من أي مرض جلدي. يُرجى مراجعة طبيب جلدية مختص لأي استفسارات صحية.",
      privacyFull: "التزام الخصوصية: نحن لا نجمع البصمات الحيوية ولا نبيع بيانات المستخدمين ولا نستخدم الصور لتدريب النماذج. في الوضع التجريبي، تبقى الصور في جهازك ويمكنك حذفها بضغطة زر.",
      versionInfo: "إصدار سكين تريس ذكاء اصطناعي v1.0.0-hackathon (النسخة التجريبية الآمنة)"
    },
    about: {
      title: "عن سكين تريس ذكاء اصطناعي",
      hackathonTitle: "هاكاثون YouCam API Skin AI & eCommerce VTO",
      hackathonDesc: "صُمم لإبراز كيف يربط الذكاء الاصطناعي للبشرة بين دقة التشخيص التجميلي، والالتزام بالعادات اليومية، والتجربة الافتراضية الذكية للمنتجات.",
      zeroCostPolicyTitle: "سياسة حماية رصيد الهاكاثون",
      zeroCostPolicyDesc: "تم تضمين نظام حماية برمجي صارم يضمن عدم خصم أي وحدة من الـ 40 وحدة المتاحة، مع توفير تجربة مستخدم كاملة وواقعية للتحكيم.",
      architectureOverview: "المعمارية والتقنيات المستخدمة",
      vtoSynergyTitle: "التكامل المستقبلي مع التجربة الافتراضية (VTO)",
      vtoSynergyDesc: "تتكامل النسخة الإنتاجية المستقبلية مع واجهات التجربة الافتراضية لمنتجات التجميل لتمكين المستخدمين من تجربة واقي الشمس وكريمات الأساس المتوافقة تماماً مع لون بشرتهم ونوعها."
    }
  }
};
