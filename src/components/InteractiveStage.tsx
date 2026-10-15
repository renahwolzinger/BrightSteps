import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Volume2,
  RefreshCw,
  MicOff,
  PhoneOff,
  ExternalLink,
  Download,
  Camera,
  Zap,
  PlusCircle,
  Mic,
  Users,
  ArrowUpCircle,
  Heart,
  Share2,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Award,
  ArrowRight,
  ShieldAlert,
  Lightbulb,
  Image as ImageIcon,
} from 'lucide-react';
import { Challenge } from '../types/game';
import { TRACK_META, SKILL_LEVEL_META } from '../data/curriculum';
import { soundFX } from '../utils/sound';

interface InteractiveStageProps {
  challenge: Challenge;
  isCompleted: boolean;
  onCompleteChallenge: (challengeId: string, points: number, badgeId: string) => void;
  onNextChallenge: () => void;
}

export const InteractiveStage: React.FC<InteractiveStageProps> = ({
  challenge,
  isCompleted,
  onCompleteChallenge,
  onNextChallenge,
}) => {
  // 4-Tier Hint State (0 = no hint open, 1..4 = tier revealed)
  const [hintTier, setHintTier] = useState<number>(0);

  // Mode 1: Scam Inspector state
  const [tappedHotspots, setTappedHotspots] = useState<string[]>([]);
  const [lastHotspotFeedback, setLastHotspotFeedback] = useState<{
    text: string;
    isRedFlag: boolean;
  } | null>(null);

  // Mode 2: iPhone Simulator state
  const [selectedIphoneOpt, setSelectedIphoneOpt] = useState<string | null>(null);

  // Mode 3: Photo Studio state
  const [brightness, setBrightness] = useState<number>(100);
  const [warmth, setWarmth] = useState<number>(100);
  const [zoom, setZoom] = useState<number>(100);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isSharedAlbum, setIsSharedAlbum] = useState<boolean>(false);
  const [photoFeedback, setPhotoFeedback] = useState<string | null>(null);
  const [imgError, setImgError] = useState<boolean>(false);

  // Mode 4: AI Prompt Builder state
  const [selectedRoleBlock, setSelectedRoleBlock] = useState<string | null>(null);
  const [selectedTaskBlock, setSelectedTaskBlock] = useState<string | null>(null);
  const [selectedDetailBlock, setSelectedDetailBlock] = useState<string | null>(null);
  const [promptTested, setPromptTested] = useState<boolean>(false);
  const [promptErrorMsg, setPromptErrorMsg] = useState<string | null>(null);

  // Mode 5: AI Media Director state
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedLighting, setSelectedLighting] = useState<string>('');
  const [activeMotion, setActiveMotion] = useState<'still' | 'pan' | 'zoom'>('pan');
  const [mediaFeedback, setMediaFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  // Celebration banner state
  const [justSolved, setJustSolved] = useState<boolean>(false);

  // Reset local interactive states whenever challenge changes
  useEffect(() => {
    setHintTier(0);
    setTappedHotspots([]);
    setLastHotspotFeedback(null);
    setSelectedIphoneOpt(null);
    setPhotoFeedback(null);
    setImgError(false);
    setSelectedRoleBlock(null);
    setSelectedTaskBlock(null);
    setSelectedDetailBlock(null);
    setPromptTested(false);
    setPromptErrorMsg(null);
    setSelectedSubject('');
    setSelectedStyle('');
    setSelectedLighting('');
    setMediaFeedback(null);
    setJustSolved(false);

    if (challenge.photoScenario) {
      setBrightness(challenge.photoScenario.initialBrightness);
      setWarmth(challenge.photoScenario.initialWarmth);
      setZoom(challenge.photoScenario.initialZoom);
      setIsFavorite(false);
      setIsSharedAlbum(false);
    }
    if (challenge.mediaScenario) {
      const targetScene = challenge.mediaScenario.scenes.find(
        (s) => s.id === challenge.mediaScenario?.targetImageId
      );
      setActiveMotion(targetScene?.motionEffect || 'pan');
    }
  }, [challenge]);

  const handleRevealNextHint = () => {
    soundFX.playHint();
    setHintTier((prev) => Math.min(prev + 1, 4));
  };

  const triggerVictory = () => {
    if (!justSolved) {
      soundFX.playSuccess();
      setJustSolved(true);
      onCompleteChallenge(challenge.id, challenge.points, challenge.badgeId);
    }
  };

  // --- Mode 1 Handler: Scam Inspector ---
  const handleHotspotTap = (hotspotId: string) => {
    if (!challenge.scamScenario) return;
    const item = challenge.scamScenario.hotspots.find((h) => h.id === hotspotId);
    if (!item) return;

    if (!tappedHotspots.includes(hotspotId)) {
      const nextTapped = [...tappedHotspots, hotspotId];
      setTappedHotspots(nextTapped);

      if (item.isRedFlag) {
        soundFX.playTap();
      } else {
        soundFX.playGentleNudge();
      }
      setLastHotspotFeedback({
        text: item.explanation,
        isRedFlag: item.isRedFlag,
      });

      const foundRedFlags = challenge.scamScenario.hotspots.filter(
        (h) => h.isRedFlag && nextTapped.includes(h.id)
      ).length;

      if (foundRedFlags >= challenge.scamScenario.requiredRedFlagsCount) {
        triggerVictory();
      }
    } else {
      setLastHotspotFeedback({
        text: item.explanation,
        isRedFlag: item.isRedFlag,
      });
    }
  };

  // --- Mode 2 Handler: iPhone Simulator ---
  const handleIphoneTap = (optionId: string) => {
    if (!challenge.iphoneScenario) return;
    setSelectedIphoneOpt(optionId);
    const opt = challenge.iphoneScenario.options.find((o) => o.id === optionId);
    if (!opt) return;

    if (opt.isCorrect) {
      triggerVictory();
    } else {
      soundFX.playGentleNudge();
    }
  };

  // --- Mode 3 Handler: Photo Studio Check ---
  const handleCheckPhotoEdits = () => {
    if (!challenge.photoScenario) return;
    const { targets } = challenge.photoScenario;
    const brightOk =
      brightness >= targets.targetBrightness[0] && brightness <= targets.targetBrightness[1];
    const warmOk = warmth >= targets.targetWarmth[0] && warmth <= targets.targetWarmth[1];
    const zoomOk = zoom >= targets.targetZoom[0] && zoom <= targets.targetZoom[1];
    const favOk = !targets.requireFavorite || isFavorite;
    const shareOk = !targets.requireSharedFamily || isSharedAlbum;

    if (brightOk && warmOk && zoomOk && favOk && shareOk) {
      setPhotoFeedback(
        'Wonderful job! The puppies and flowers are bright and clear, and your memory is safely organized!'
      );
      triggerVictory();
    } else {
      soundFX.playGentleNudge();
      const missing: string[] = [];
      if (!brightOk)
        missing.push(
          `slide Brightness into ${targets.targetBrightness[0]}%–${targets.targetBrightness[1]}%`
        );
      if (!warmOk)
        missing.push(
          `adjust Golden Warmth into ${targets.targetWarmth[0]}%–${targets.targetWarmth[1]}%`
        );
      if (!zoomOk)
        missing.push(`slide Crop/Zoom into ${targets.targetZoom[0]}%–${targets.targetZoom[1]}%`);
      if (!favOk) missing.push('tap the "Mark as Favorite ♥" button');
      if (!shareOk) missing.push('turn ON the "Shared Family Album" button');

      setPhotoFeedback(`Almost there! Please ${missing.join(' and ')}.`);
    }
  };

  // --- Mode 4 Handler: AI Prompt Builder ---
  const handleTestPrompt = () => {
    if (!challenge.promptScenario) return;
    const roleObj = challenge.promptScenario.blocks.find((b) => b.id === selectedRoleBlock);
    const taskObj = challenge.promptScenario.blocks.find((b) => b.id === selectedTaskBlock);
    const detailObj = challenge.promptScenario.blocks.find((b) => b.id === selectedDetailBlock);

    if (!roleObj || !taskObj || !detailObj) {
      soundFX.playGentleNudge();
      setPromptErrorMsg('Please pick one building block from each of the 3 steps above.');
      return;
    }

    if (roleObj.isRecommended && taskObj.isRecommended && detailObj.isRecommended) {
      setPromptErrorMsg(null);
      setPromptTested(true);
      triggerVictory();
    } else {
      soundFX.playGentleNudge();
      const firstIssue = [roleObj, taskObj, detailObj].find((b) => !b.isRecommended);
      setPromptErrorMsg(
        firstIssue
          ? `Let’s refine that block: ${firstIssue.whyText}`
          : 'Try choosing the blocks that give specific, safe details.'
      );
    }
  };

  // --- Mode 5 Handler: AI Media Director ---
  const handleCheckMediaRecipe = () => {
    if (!challenge.mediaScenario) return;
    const { correctSubject, correctStyle, correctLighting } = challenge.mediaScenario;

    if (!selectedSubject || !selectedStyle || !selectedLighting) {
      soundFX.playGentleNudge();
      setMediaFeedback({
        ok: false,
        message: 'Please select a Subject, an Artistic Style, and a Lighting option first.',
      });
      return;
    }

    if (
      selectedSubject === correctSubject &&
      selectedStyle === correctStyle &&
      selectedLighting === correctLighting
    ) {
      setMediaFeedback({
        ok: true,
        message:
          'Masterpiece matched! You combined Subject + Style + Lighting just like a visual AI director.',
      });
      triggerVictory();
    } else {
      soundFX.playGentleNudge();
      const mismatches: string[] = [];
      if (selectedSubject !== correctSubject) mismatches.push('Subject (What is in the picture)');
      if (selectedStyle !== correctStyle) mismatches.push('Artistic Style (How it is painted/filmed)');
      if (selectedLighting !== correctLighting) mismatches.push('Lighting & Mood');
      setMediaFeedback({
        ok: false,
        message: `Take another look at the picture’s ${mismatches.join(' and ')}! Use a Hint on the right if you’d like a clue.`,
      });
    }
  };

  const renderIconByName = (name: string) => {
    switch (name) {
      case 'Volume2':
        return <Volume2 className="w-6 h-6" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6" />;
      case 'MicOff':
        return <MicOff className="w-6 h-6" />;
      case 'PhoneOff':
        return <PhoneOff className="w-6 h-6" />;
      case 'ExternalLink':
        return <ExternalLink className="w-6 h-6" />;
      case 'Download':
        return <Download className="w-6 h-6" />;
      case 'Camera':
        return <Camera className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'PlusCircle':
        return <PlusCircle className="w-6 h-6" />;
      case 'Mic':
        return <Mic className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      default:
        return <ArrowUpCircle className="w-6 h-6" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT ZONE: Interactive Visual Stage (7 columns on desktop ~60-65% width) */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
        {/* Quiet Unboxed Kicker Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[#0284C7]">
              {challenge.topicTag}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-slate-700">
              {challenge.courseTopic}
            </span>
            <span aria-hidden="true">·</span>
            <span>{SKILL_LEVEL_META[challenge.skillLevel].shortTitle}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-num font-semibold text-slate-800">
              {challenge.points} pts
            </span>
          </div>
          {(isCompleted || justSolved) && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#059669]">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </span>
          )}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          {challenge.title}
        </h2>
        <p className="text-slate-700 text-base md:text-lg mb-6">
          {challenge.scenarioStory}
        </p>

        {/* ============================================================
            MODE 1: SCAM INSPECTOR (VISUAL PHONE / EMAIL SCREEN)
           ============================================================ */}
        {challenge.mode === 'scam_inspector' && challenge.scamScenario && (
          <div className="space-y-5">
            <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-700 text-sm">
                <div>
                  <span className="font-semibold text-sky-300">
                    {challenge.scamScenario.deviceType === 'sms'
                      ? 'iPhone Text Message'
                      : challenge.scamScenario.deviceType === 'email'
                      ? 'Incoming Email Inbox'
                      : 'Incoming Phone Call Screen'}
                  </span>
                  <span className="mx-2 text-slate-500">·</span>
                  <span className="text-slate-300">{challenge.scamScenario.timestamp}</span>
                </div>
                <div className="font-mono-num text-amber-300 font-medium">
                  Red Flags Spotted:{' '}
                  {
                    challenge.scamScenario.hotspots.filter(
                      (h) => h.isRedFlag && tappedHotspots.includes(h.id)
                    ).length
                  }{' '}
                  / {challenge.scamScenario.requiredRedFlagsCount}
                </div>
              </div>

              {challenge.scamScenario.subjectLine && (
                <div className="mb-4 text-base font-semibold text-white">
                  Subject: {challenge.scamScenario.subjectLine}
                </div>
              )}

              <p className="text-sm text-slate-300 mb-3">
                Tap directly on any box below that looks suspicious or unsafe:
              </p>

              <div className="space-y-3">
                {challenge.scamScenario.hotspots.map((hotspot, idx) => {
                  const isTapped = tappedHotspots.includes(hotspot.id);
                  const showHintHighlight = hintTier >= 2 && hotspot.isRedFlag && !isTapped;

                  return (
                    <button
                      key={hotspot.id}
                      type="button"
                      onClick={() => handleHotspotTap(hotspot.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isTapped && hotspot.isRedFlag
                          ? 'bg-red-950/90 border-red-400 text-white'
                          : isTapped && !hotspot.isRedFlag
                          ? 'bg-slate-800 border-slate-500 text-slate-200'
                          : showHintHighlight
                          ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/50 text-white'
                          : 'bg-slate-800/90 border-slate-700 hover:border-sky-400 text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="text-xs font-medium text-slate-300">
                          0{idx + 1}. {hotspot.label}
                        </span>
                        {isTapped && hotspot.isRedFlag && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-red-300 whitespace-nowrap shrink-0">
                            <AlertTriangle className="w-4 h-4" />▲ RED FLAG SPOTTED
                          </span>
                        )}
                        {isTapped && !hotspot.isRedFlag && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 whitespace-nowrap shrink-0">
                            ● NORMAL DETAIL
                          </span>
                        )}
                        {!isTapped && (
                          <span className="text-xs text-sky-300 font-medium whitespace-nowrap shrink-0">
                            Tap to Inspect →
                          </span>
                        )}
                      </div>
                      <div className="text-base md:text-lg font-medium leading-snug">
                        {hotspot.regionText}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {lastHotspotFeedback && (
              <div
                className={`p-4 rounded-xl border ${
                  lastHotspotFeedback.isRedFlag
                    ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                    : 'bg-amber-50 border-amber-300 text-slate-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  {lastHotspotFeedback.isRedFlag ? (
                    <CheckCircle2 className="w-6 h-6 text-[#059669] shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold text-base mb-0.5">
                      {lastHotspotFeedback.isRedFlag
                        ? 'Great Eye! You Spotted a Scam Clue'
                        : 'Let’s Keep Looking'}
                    </div>
                    <p className="text-slate-700 text-base">{lastHotspotFeedback.text}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================
            MODE 2: IPHONE SIMULATOR
           ============================================================ */}
        {challenge.mode === 'iphone_simulator' && challenge.iphoneScenario && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800">
              {/* Simulated iPhone Top Speaker & Context */}
              <div className="flex items-center justify-between text-xs text-slate-300 pb-4 mb-4 border-b border-slate-800">
                <span className="font-semibold text-emerald-400">
                  {challenge.iphoneScenario.appScreenTitle}
                </span>
                <span>{challenge.iphoneScenario.screenContext}</span>
              </div>

              <div className="bg-slate-800/90 rounded-xl p-5 mb-6 text-center">
                <div className="text-xs text-slate-300 mb-1">Active Screen</div>
                <div className="text-xl font-bold text-white mb-2">
                  {challenge.iphoneScenario.callerOrContact}
                </div>
                <p className="text-slate-200 text-base max-w-xl mx-auto">
                  {challenge.iphoneScenario.goalInstruction}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {challenge.iphoneScenario.options.map((opt) => {
                  const isSelected = selectedIphoneOpt === opt.id;
                  const hintGlow = hintTier >= 2 && opt.isCorrect && !isSelected;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleIphoneTap(opt.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer min-h-[64px] ${
                        isSelected && opt.isCorrect
                          ? 'bg-emerald-900/90 border-emerald-400 text-white'
                          : isSelected && !opt.isCorrect
                          ? 'bg-rose-950/80 border-rose-400 text-white'
                          : hintGlow
                          ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/50 text-white'
                          : 'bg-slate-800 border-slate-700 hover:border-sky-400 text-white'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected && opt.isCorrect
                            ? 'bg-emerald-500 text-slate-950'
                            : isSelected && !opt.isCorrect
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-700 text-sky-300'
                        }`}
                      >
                        {renderIconByName(opt.iconName)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-base text-white truncate">
                          {opt.buttonLabel}
                        </div>
                        <div className="text-xs text-slate-300">{opt.locationHint}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedIphoneOpt && (
              <div
                className={`p-4 rounded-xl border ${
                  challenge.iphoneScenario.options.find((o) => o.id === selectedIphoneOpt)
                    ?.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                    : 'bg-amber-50 border-amber-300 text-slate-900'
                }`}
              >
                <p className="text-base font-medium">
                  {
                    challenge.iphoneScenario.options.find((o) => o.id === selectedIphoneOpt)
                      ?.feedback
                  }
                </p>
              </div>
            )}
          </div>
        )}

        {/* ============================================================
            MODE 3: PHOTO STUDIO & MEMORY KEEPER
           ============================================================ */}
        {challenge.mode === 'photo_studio' && challenge.photoScenario && (
          <div className="space-y-6">
            {/* Live Photo Preview Canvas */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-4/3">
              {!imgError ? (
                <img
                  src={challenge.photoScenario.imageUrl}
                  alt={challenge.photoScenario.photoTitle}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  style={{
                    filter: `brightness(${brightness}%) sepia(${Math.max(
                      0,
                      warmth - 100
                    )}%) saturate(${warmth}%)`,
                    transform: `scale(${zoom / 100})`,
                  }}
                  className="w-full h-full object-cover transition-transform duration-150"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-white p-6 text-center">
                  <ImageIcon className="w-12 h-12 text-amber-400 mb-2" />
                  <span className="font-bold text-lg">{challenge.photoScenario.photoTitle}</span>
                  <span className="text-sm text-slate-300">
                    Brightness: {brightness}% · Warmth: {warmth}% · Zoom: {zoom}%
                  </span>
                </div>
              )}

              {/* Measured Scrim Overlay at bottom for Photo Info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 flex flex-wrap items-center justify-between gap-2 text-white">
                <div>
                  <div className="font-bold text-base">
                    {challenge.photoScenario.photoTitle}
                  </div>
                  <div className="text-xs text-slate-200">
                    {challenge.photoScenario.photoDateLocation}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono-num">
                  {isFavorite && (
                    <span className="inline-flex items-center gap-1 text-rose-300 font-semibold">
                      ♥ In Favorites
                    </span>
                  )}
                  {isSharedAlbum && (
                    <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold">
                      ● Shared Family Album
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sliders & Album Controls */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                {challenge.photoScenario.goalDescription}
              </div>

              {/* Brightness Slider */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <label htmlFor="slider-brightness" className="font-semibold text-slate-800">
                    Brightness Level
                  </label>
                  <span className="font-mono-num font-semibold text-slate-900">
                    {brightness}%{' '}
                    <span className="text-xs font-normal text-slate-600">
                      (Goal: {challenge.photoScenario.targets.targetBrightness[0]}%–
                      {challenge.photoScenario.targets.targetBrightness[1]}%)
                    </span>
                  </span>
                </div>
                <input
                  id="slider-brightness"
                  type="range"
                  min={50}
                  max={150}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg accent-[#0284C7] cursor-pointer"
                />
              </div>

              {/* Golden Warmth Slider */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <label htmlFor="slider-warmth" className="font-semibold text-slate-800">
                    Golden Sunlight Warmth
                  </label>
                  <span className="font-mono-num font-semibold text-slate-900">
                    {warmth}%{' '}
                    <span className="text-xs font-normal text-slate-600">
                      (Goal: {challenge.photoScenario.targets.targetWarmth[0]}%–
                      {challenge.photoScenario.targets.targetWarmth[1]}%)
                    </span>
                  </span>
                </div>
                <input
                  id="slider-warmth"
                  type="range"
                  min={80}
                  max={140}
                  value={warmth}
                  onChange={(e) => setWarmth(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg accent-[#D97706] cursor-pointer"
                />
              </div>

              {/* Zoom / Crop Closer Slider */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <label htmlFor="slider-zoom" className="font-semibold text-slate-800">
                    Crop / Frame Closer
                  </label>
                  <span className="font-mono-num font-semibold text-slate-900">
                    {zoom}%{' '}
                    <span className="text-xs font-normal text-slate-600">
                      (Goal: {challenge.photoScenario.targets.targetZoom[0]}%–
                      {challenge.photoScenario.targets.targetZoom[1]}%)
                    </span>
                  </span>
                </div>
                <input
                  id="slider-zoom"
                  type="range"
                  min={100}
                  max={145}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg accent-[#059669] cursor-pointer"
                />
              </div>

              {/* Action Toggles: Favorite & Shared Family Album */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playTap();
                    setIsFavorite((prev) => !prev);
                  }}
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isFavorite
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
                  {isFavorite ? 'Saved to Favorites ♥' : 'Mark as Favorite ♥'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFX.playTap();
                    setIsSharedAlbum((prev) => !prev);
                  }}
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSharedAlbum
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Share2 className="w-5 h-5" />
                  {isSharedAlbum ? 'In Shared Family Album ✓' : 'Shared Family Album'}
                </button>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playTap();
                    setBrightness(challenge.photoScenario!.initialBrightness);
                    setWarmth(challenge.photoScenario!.initialWarmth);
                    setZoom(challenge.photoScenario!.initialZoom);
                    setIsFavorite(false);
                    setIsSharedAlbum(false);
                    setPhotoFeedback(null);
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Sliders
                </button>

                <button
                  type="button"
                  onClick={handleCheckPhotoEdits}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Sliders className="w-5 h-5" />
                  Save & Check Photo
                </button>
              </div>
            </div>

            {photoFeedback && (
              <div
                className={`p-4 rounded-xl border ${
                  justSolved || isCompleted
                    ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                    : 'bg-amber-50 border-amber-300 text-slate-900'
                }`}
              >
                <p className="text-base font-medium">{photoFeedback}</p>
              </div>
            )}
          </div>
        )}

        {/* ============================================================
            MODE 4: AI PROMPT BUILDER (3-PART RECIPE)
           ============================================================ */}
        {challenge.mode === 'ai_prompt_builder' && challenge.promptScenario && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
              <div>
                <div className="text-xs font-semibold text-[#0284C7] mb-1">
                  Goal: {challenge.promptScenario.goalTitle}
                </div>
                <p className="text-sm text-slate-700">
                  {challenge.promptScenario.familyContext}
                </p>
              </div>

              {/* Step 1: Role / Situation */}
              <div>
                <div className="text-sm font-bold text-slate-900 mb-2">
                  Step 1. Tell AI the Situation (Pick 1):
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {challenge.promptScenario.blocks
                    .filter((b) => b.category === 'role')
                    .map((block) => {
                      const active = selectedRoleBlock === block.id;
                      return (
                        <button
                          key={block.id}
                          type="button"
                          onClick={() => {
                            soundFX.playTap();
                            setSelectedRoleBlock(block.id);
                          }}
                          className={`p-3.5 rounded-xl border text-left text-base font-medium transition-all cursor-pointer ${
                            active
                              ? 'bg-[#0284C7] text-white border-[#0284C7]'
                              : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          {block.text}
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Step 2: Task */}
              <div>
                <div className="text-sm font-bold text-slate-900 mb-2">
                  Step 2. Tell AI What to Create (Pick 1):
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {challenge.promptScenario.blocks
                    .filter((b) => b.category === 'task')
                    .map((block) => {
                      const active = selectedTaskBlock === block.id;
                      return (
                        <button
                          key={block.id}
                          type="button"
                          onClick={() => {
                            soundFX.playTap();
                            setSelectedTaskBlock(block.id);
                          }}
                          className={`p-3.5 rounded-xl border text-left text-base font-medium transition-all cursor-pointer ${
                            active
                              ? 'bg-[#0284C7] text-white border-[#0284C7]'
                              : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          {block.text}
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Step 3: Details & Safety */}
              <div>
                <div className="text-sm font-bold text-slate-900 mb-2">
                  Step 3. Add Helpful Details Safely (Pick 1):
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {challenge.promptScenario.blocks
                    .filter((b) => b.category === 'detail')
                    .map((block) => {
                      const active = selectedDetailBlock === block.id;
                      return (
                        <button
                          key={block.id}
                          type="button"
                          onClick={() => {
                            soundFX.playTap();
                            setSelectedDetailBlock(block.id);
                          }}
                          className={`p-3.5 rounded-xl border text-left text-base font-medium transition-all cursor-pointer ${
                            active
                              ? 'bg-[#0284C7] text-white border-[#0284C7]'
                              : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          {block.text}
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Assembled Prompt Preview */}
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="text-xs font-semibold text-slate-500 mb-1">
                  Your Assembled AI Message:
                </div>
                <p className="text-base text-slate-900 font-medium">
                  {[
                    challenge.promptScenario.blocks.find((b) => b.id === selectedRoleBlock)?.text,
                    challenge.promptScenario.blocks.find((b) => b.id === selectedTaskBlock)?.text,
                    challenge.promptScenario.blocks.find((b) => b.id === selectedDetailBlock)?.text,
                  ]
                    .filter(Boolean)
                    .join(' ') || 'Tap one block from Step 1, Step 2, and Step 3 above...'}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleTestPrompt}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-5 h-5" />
                  Test My Prompt
                </button>
              </div>
            </div>

            {promptErrorMsg && (
              <div className="p-4 rounded-xl border bg-amber-50 border-amber-300 text-slate-900">
                <p className="text-base font-medium">{promptErrorMsg}</p>
              </div>
            )}

            {promptTested && (
              <div className="p-5 rounded-xl border bg-emerald-50 border-emerald-300 text-slate-900 space-y-3">
                <div className="font-bold text-base text-[#059669] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  AI Assistant Response to Your Prompt:
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-200 text-base text-slate-800 whitespace-pre-line">
                  {challenge.promptScenario.sampleAiOutput}
                </div>
                <p className="text-sm text-slate-700 font-medium">
                  {challenge.promptScenario.safetyReminder}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ============================================================
            MODE 5: AI MEDIA DIRECTOR (IMAGES & VIDEOS)
           ============================================================ */}
        {challenge.mode === 'ai_media_director' && challenge.mediaScenario && (
          <div className="space-y-6">
            {(() => {
              const targetScene =
                challenge.mediaScenario.scenes.find(
                  (s) => s.id === challenge.mediaScenario?.targetImageId
                ) || challenge.mediaScenario.scenes[0];

              return (
                <>
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-4/3">
                    <img
                      src={targetScene.imageUrl}
                      alt={targetScene.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${
                        activeMotion === 'pan'
                          ? 'animate-cinema-pan'
                          : activeMotion === 'zoom'
                          ? 'animate-cinema-zoom'
                          : ''
                      }`}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 flex flex-wrap items-center justify-between gap-3 text-white">
                      <div>
                        <div className="font-bold text-lg">{targetScene.title}</div>
                        <div className="text-xs text-slate-200">{targetScene.caption}</div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-700">
                        <button
                          type="button"
                          onClick={() => {
                            soundFX.playTap();
                            setActiveMotion('still');
                          }}
                          className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 ${
                            activeMotion === 'still'
                              ? 'bg-white text-slate-900'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          <Pause className="w-3.5 h-3.5 inline mr-1" />
                          Still Image
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundFX.playTap();
                            setActiveMotion('pan');
                          }}
                          className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 ${
                            activeMotion === 'pan'
                              ? 'bg-white text-slate-900'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 inline mr-1" />
                          Video Pan
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundFX.playTap();
                            setActiveMotion('zoom');
                          }}
                          className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 ${
                            activeMotion === 'zoom'
                              ? 'bg-white text-slate-900'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 inline mr-1" />
                          Video Zoom
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
                    <p className="text-sm font-semibold text-slate-800">
                      {challenge.mediaScenario.goalInstruction}
                    </p>

                    {/* 1. Subject Selector */}
                    <div>
                      <div className="text-sm font-bold text-slate-900 mb-2">
                        1. Pick the Subject (What is in the scene?):
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {challenge.mediaScenario.selectableSubjects.map((subj) => (
                          <button
                            key={subj}
                            type="button"
                            onClick={() => {
                              soundFX.playTap();
                              setSelectedSubject(subj);
                            }}
                            className={`p-3 rounded-xl border text-left text-base font-medium transition-all cursor-pointer ${
                              selectedSubject === subj
                                ? 'bg-[#059669] text-white border-[#059669]'
                                : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            {subj}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Style Selector */}
                    <div>
                      <div className="text-sm font-bold text-slate-900 mb-2">
                        2. Pick the Artistic Style (How does it look?):
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {challenge.mediaScenario.selectableStyles.map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              soundFX.playTap();
                              setSelectedStyle(st);
                            }}
                            className={`p-3 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${
                              selectedStyle === st
                                ? 'bg-[#059669] text-white border-[#059669]'
                                : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Lighting Selector */}
                    <div>
                      <div className="text-sm font-bold text-slate-900 mb-2">
                        3. Pick the Lighting & Atmosphere:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {challenge.mediaScenario.selectableLightings.map((lt) => (
                          <button
                            key={lt}
                            type="button"
                            onClick={() => {
                              soundFX.playTap();
                              setSelectedLighting(lt);
                            }}
                            className={`p-3 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${
                              selectedLighting === lt
                                ? 'bg-[#059669] text-white border-[#059669]'
                                : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            {lt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleCheckMediaRecipe}
                        className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Sparkles className="w-5 h-5" />
                        Create &amp; Match Visual
                      </button>
                    </div>
                  </div>

                  {mediaFeedback && (
                    <div
                      className={`p-4 rounded-xl border ${
                        mediaFeedback.ok
                          ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                          : 'bg-amber-50 border-amber-300 text-slate-900'
                      }`}
                    >
                      <p className="text-base font-medium">{mediaFeedback.message}</p>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* Victory / Next Lesson Banner inside Stage */}
        {(justSolved || isCompleted) && (
          <div className="mt-6 p-5 rounded-2xl bg-emerald-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-emerald-300" />
              </div>
              <div>
                <div className="font-bold text-lg">
                  Badge Unlocked &amp; +{challenge.points} Points Earned!
                </div>
                <p className="text-sm text-emerald-100">
                  You mastered: {challenge.memoryRuleTitle}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onNextChallenge}
              className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Next Activity
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* RIGHT ZONE: Guided Control, 4-Tier Visual Hints & Memory Rule Deck (5 columns on desktop) */}
      <div className="lg:col-span-5 space-y-6">
        {/* Visual Memory Rule Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0284C7] mb-2">
            <Lightbulb className="w-4 h-4" />
            <span>KEY MEMORY TAKEAWAY</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {challenge.memoryRuleTitle}
          </h3>
          <p className="text-slate-700 text-base leading-relaxed">
            {challenge.memoryRuleSummary}
          </p>
        </div>

        {/* 4-Tier Stress-Free Hint System */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                4-Step Gentle Hint Helper
              </h3>
              <p className="text-sm text-slate-600">
                Never feel stuck—reveal a clue one step at a time.
              </p>
            </div>
            <span className="font-mono-num text-xs font-semibold text-slate-600">
              {hintTier} / 4 Clues
            </span>
          </div>

          <button
            type="button"
            onClick={handleRevealNextHint}
            disabled={hintTier >= 4}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 mb-4 ${
              hintTier >= 4
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-amber-500/15 text-amber-900 border border-amber-400 hover:bg-amber-500/25'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            {hintTier === 0
              ? 'Show Clue 1 (Gentle Nudge)'
              : hintTier === 1
              ? 'Show Clue 2 (Where to Look)'
              : hintTier === 2
              ? 'Show Clue 3 (Why It Works)'
              : hintTier === 3
              ? 'Show Clue 4 (Exact Answer)'
              : 'All 4 Clues Revealed'}
          </button>

          {hintTier > 0 ? (
            <div className="space-y-2.5">
              {challenge.hints.slice(0, hintTier).map((hintText, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800"
                >
                  <span className="font-bold text-slate-900 mr-1.5">
                    Clue {idx + 1}:
                  </span>
                  {hintText}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-600 flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0" />
              <span>
                No timers and no penalties! Take your time exploring the screen on the left.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
