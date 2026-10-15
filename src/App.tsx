import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Smartphone,
  Image as ImageIcon,
  MessageSquare,
  Film,
  Volume2,
  VolumeX,
  Type,
  Award,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Globe,
  LayoutGrid,
  Layers,
  Plus,
  X,
} from 'lucide-react';
import {
  BADGES,
  CHALLENGES,
  HERO_IMAGE_PATH,
  SKILL_LEVEL_META,
  TRACK_META,
} from './data/curriculum';
import { Challenge, SkillLevel, TrackId } from './types/game';
import { InteractiveStage } from './components/InteractiveStage';
import { LiveAiSandbox } from './components/LiveAiSandbox';
import { BadgesAndMemorySection } from './components/BadgesAndMemorySection';
import { soundFX } from './utils/sound';

const STORAGE_KEY = 'brightsteps_senior_progress_v3';
const CUSTOM_CHALLENGES_KEY = 'brightsteps_custom_topic_challenges_v1';

// Complete Topic Catalog for anyone to browse & play directly (no week numbers)
const ALL_TOPIC_MODULES = [
  {
    id: 'mod-browsers',
    category: 'Web & Browsers',
    label: 'Internet Browsers, Tabs, Bookmarks & Searching the Web',
    challengeId: 'topic-browsers-search',
  },
  {
    id: 'mod-chatgpt',
    category: 'Everyday AI',
    label: 'AI Basics: ChatGPT & AI for Entertainment',
    challengeId: 'topic-chatgpt-basics',
  },
  {
    id: 'mod-copilot',
    category: 'Microsoft AI',
    label: 'Microsoft Copilot: Interface, Apps & Lifelong Learning',
    challengeId: 'topic-copilot-learning',
  },
  {
    id: 'mod-workspace',
    category: 'Google & Productivity',
    label: 'Google Workspace, Drive, Gemini & Digital Organization',
    challengeId: 'topic-google-workspace',
  },
  {
    id: 'mod-apple-ios',
    category: 'iPhone & Apple',
    label: 'Apple iOS, Apple Intelligence & Mobile Apps',
    challengeId: 'topic-apple-ios-intel',
  },
  {
    id: 'mod-voice',
    category: 'Voice & Connection',
    label: 'Smart Voice Assistants, Dictation & Social Connectivity',
    challengeId: 'topic-voice-assistants',
  },
  {
    id: 'mod-photos',
    category: 'Photos & Memories',
    label: 'Managing Photos, Favorites (♥) & Device Storage',
    challengeId: 'topic-photos-storage',
  },
  {
    id: 'mod-security',
    category: 'Online Safety',
    label: 'Staying Safe Online & Spotting Phishing Scams',
    challengeId: 'topic-staying-safe-online',
  },
  {
    id: 'mod-firefly',
    category: 'AI Art & Images',
    label: 'Adobe Firefly & Creating Custom AI Images',
    challengeId: 'topic-firefly-cottage',
  },
  {
    id: 'mod-creative-proj',
    category: 'Creative Projects',
    label: 'Planning a Creative Digital Project & Storybook',
    challengeId: 'topic-creative-project',
  },
  {
    id: 'mod-cloud',
    category: 'Cloud & Portfolios',
    label: 'Cloud Storage (iCloud, Drive, OneDrive) & Digital Portfolios',
    challengeId: 'topic-cloud-portfolio',
  },
  {
    id: 'mod-health-ai',
    category: 'Health & Wellness',
    label: 'AI for Health, Wellness & Doctor Visit Prep',
    challengeId: 'topic-ai-health-wellness',
    secondaryChallengeId: 'topic-health-apps-id',
  },
  {
    id: 'mod-deepfakes',
    category: 'Cybersecurity',
    label: 'Privacy, Deepfakes, Voice Clones & Misinformation',
    challengeId: 'topic-deepfakes-misinfo',
  },
  {
    id: 'mod-ethics',
    category: 'Responsible AI',
    label: 'Navigating AI Responsibly & Spotting AI Hallucinations',
    challengeId: 'topic-ai-responsibly-ethics',
  },
  {
    id: 'mod-smarthome',
    category: 'Smart Home & TV',
    label: 'Smart Home Essentials, Streaming Services & TV Casting',
    challengeId: 'topic-smarthome-casting',
  },
  {
    id: 'mod-vr-travel',
    category: '3D Worlds & Travel',
    label: '3D Virtual Reality Worlds & AI for Travel and Navigation',
    challengeId: 'topic-vr-travel',
  },
  {
    id: 'mod-vibe-coding',
    category: 'Future of AI',
    label: 'Vibe Coding (Building Apps in Plain English) & Future of AI',
    challengeId: 'topic-vibe-coding-future',
  },
];

export default function App() {
  // Navigation Mode: 'tracks' (6 Topic Tracks + Skill Level) or 'all_topics' (All 17 Topic Modules)
  const [browseMode, setBrowseMode] = useState<'tracks' | 'all_topics'>('tracks');

  // Skill Level & Track selection
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('beginner');
  const [activeTrack, setActiveTrack] = useState<TrackId>('browsers_cloud');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(CHALLENGES[0].id);

  // Custom Added Challenges
  const [customChallenges, setCustomChallenges] = useState<Challenge[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTopicCategory, setNewTopicCategory] = useState<string>(
    'Apple iOS, Apple Intelligence & Mobile Apps'
  );
  const [newTitle, setNewTitle] = useState<string>('');
  const [newScenario, setNewScenario] = useState<string>('');
  const [newCorrectButton, setNewCorrectButton] = useState<string>('');
  const [newDistractor1, setNewDistractor1] = useState<string>('');
  const [newDistractor2, setNewDistractor2] = useState<string>('');
  const [newMemoryRule, setNewMemoryRule] = useState<string>('');

  // Persisted Gamification State
  const [score, setScore] = useState<number>(0);
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>([]);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>([]);

  // Senior Accessibility Comfort Controls
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [heroImgFailed, setHeroImgFailed] = useState<boolean>(false);

  const allChallenges = [...CHALLENGES, ...customChallenges];

  // Load saved progress and custom challenges from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.score === 'number') setScore(parsed.score);
        if (Array.isArray(parsed.completedChallengeIds)) {
          setCompletedChallengeIds(parsed.completedChallengeIds);
        }
        if (Array.isArray(parsed.unlockedBadgeIds)) {
          setUnlockedBadgeIds(parsed.unlockedBadgeIds);
        }
      }
      const savedCustom = localStorage.getItem(CUSTOM_CHALLENGES_KEY);
      if (savedCustom) {
        const parsedCustom = JSON.parse(savedCustom);
        if (Array.isArray(parsedCustom)) {
          setCustomChallenges(parsedCustom);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveProgress = (
    nextScore: number,
    nextCompleted: string[],
    nextBadges: string[]
  ) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          score: nextScore,
          completedChallengeIds: nextCompleted,
          unlockedBadgeIds: nextBadges,
        })
      );
    } catch {
      // Ignore storage errors
    }
  };

  // Current active challenge
  const currentChallenge =
    allChallenges.find((c) => c.id === selectedChallengeId) ||
    allChallenges.find(
      (c) => c.trackId === activeTrack && c.skillLevel === skillLevel
    ) ||
    allChallenges[0];

  const handleSelectTrackAndLevel = (track: TrackId, level: SkillLevel) => {
    setActiveTrack(track);
    setSkillLevel(level);
    const match = allChallenges.find(
      (c) => c.trackId === track && c.skillLevel === level
    );
    if (match) {
      setSelectedChallengeId(match.id);
    }
  };

  const handleSelectSpecificChallenge = (cId: string) => {
    soundFX.playTap();
    const target = allChallenges.find((c) => c.id === cId);
    if (target) {
      setSelectedChallengeId(target.id);
      setActiveTrack(target.trackId);
      setSkillLevel(target.skillLevel);
      const el = document.getElementById('practice-stage');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCompleteChallenge = (
    challengeId: string,
    points: number,
    badgeId: string
  ) => {
    const alreadyDone = completedChallengeIds.includes(challengeId);
    const nextCompleted = alreadyDone
      ? completedChallengeIds
      : [...completedChallengeIds, challengeId];
    const nextScore = alreadyDone ? score : score + points;
    const nextBadges = unlockedBadgeIds.includes(badgeId)
      ? unlockedBadgeIds
      : [...unlockedBadgeIds, badgeId];

    setCompletedChallengeIds(nextCompleted);
    setScore(nextScore);
    setUnlockedBadgeIds(nextBadges);
    saveProgress(nextScore, nextCompleted, nextBadges);
  };

  const handleEarnBonusPoints = (bonus: number) => {
    const nextScore = score + bonus;
    setScore(nextScore);
    saveProgress(nextScore, completedChallengeIds, unlockedBadgeIds);
  };

  const handleNextChallenge = () => {
    soundFX.playTap();
    const currentIndex = allChallenges.findIndex((c) => c.id === currentChallenge.id);
    const nextChallenge = allChallenges[(currentIndex + 1) % allChallenges.length];
    setSelectedChallengeId(nextChallenge.id);
    setActiveTrack(nextChallenge.trackId);
    setSkillLevel(nextChallenge.skillLevel);
    const el = document.getElementById('practice-stage');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCreateCustomChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newScenario.trim() || !newCorrectButton.trim()) return;

    const created: Challenge = {
      id: `custom-${Date.now()}`,
      topicTag: 'Custom Activity',
      courseTopic: newTopicCategory,
      trackId: activeTrack,
      skillLevel,
      title: newTitle.trim(),
      subtitle: 'Custom Interactive Practice Activity',
      scenarioStory: newScenario.trim(),
      mode: 'iphone_simulator',
      points: 100,
      badgeId: 'badge-chatgpt-starter',
      memoryRuleTitle: newMemoryRule.trim() || 'Key Takeaway to Remember',
      memoryRuleSummary:
        newMemoryRule.trim() ||
        'Practice makes permanent! Review this step whenever using your device at home.',
      hints: [
        'Read the scenario carefully and think about the safest, easiest action.',
        'Eliminate the options that close the app or delete your work.',
        `Look for the button labeled "${newCorrectButton.trim()}".`,
        `Tap "${newCorrectButton.trim()}" to complete this activity!`,
      ],
      iphoneScenario: {
        appScreenTitle: newTopicCategory,
        screenContext: 'Interactive Practice Screen',
        callerOrContact: newTitle.trim(),
        goalInstruction: 'Tap the correct option below:',
        options: [
          {
            id: 'cust-1',
            buttonLabel: newCorrectButton.trim(),
            iconName: 'Sparkles',
            locationHint: 'Recommended Action',
            isCorrect: true,
            feedback: `Spot on! ${newMemoryRule.trim() || 'You chose the right step!'}`,
          },
          {
            id: 'cust-2',
            buttonLabel: newDistractor1.trim() || 'Click Unverified Pop-Up Ad',
            iconName: 'ExternalLink',
            locationHint: 'Alternative Option A',
            isCorrect: false,
            feedback: 'Not quite—try the recommended action instead!',
          },
          {
            id: 'cust-3',
            buttonLabel: newDistractor2.trim() || 'Close Window Without Saving',
            iconName: 'PhoneOff',
            locationHint: 'Alternative Option B',
            isCorrect: false,
            feedback: 'That would close your work without completing the task.',
          },
        ],
      },
    };

    const updated = [...customChallenges, created];
    setCustomChallenges(updated);
    try {
      localStorage.setItem(CUSTOM_CHALLENGES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
    soundFX.playSuccess();
    setShowAddModal(false);
    setNewTitle('');
    setNewScenario('');
    setNewCorrectButton('');
    setNewDistractor1('');
    setNewDistractor2('');
    setNewMemoryRule('');
    setSelectedChallengeId(created.id);
  };

  const handleResetAllProgress = () => {
    soundFX.playTap();
    setScore(0);
    setCompletedChallengeIds([]);
    setUnlockedBadgeIds([]);
    saveProgress(0, [], []);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
    if (next) soundFX.playTap();
  };

  const renderTrackIcon = (trackId: TrackId) => {
    switch (trackId) {
      case 'browsers_cloud':
        return <Globe className="w-5 h-5" />;
      case 'ai_assistants':
        return <MessageSquare className="w-5 h-5" />;
      case 'apple_mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'photos_creative':
        return <ImageIcon className="w-5 h-5" />;
      case 'security_ethics':
        return <ShieldCheck className="w-5 h-5" />;
      case 'smart_living_future':
        return <Film className="w-5 h-5" />;
    }
  };

  const textScaleClass =
    fontScale === 'xlarge'
      ? 'text-[112%]'
      : fontScale === 'large'
      ? 'text-[106%]'
      : 'text-[100%]';

  return (
    <div className={`min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] ${textScaleClass}`}>
      {/* =================================================================
          TOP BAR CONTRACT: Strictly 3 zones separated by gap-8
         ================================================================= */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            BrightSteps
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <a
              href="#skill-tracks"
              className="hover:text-[#0284C7] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Skill Topics
            </a>
            <a
              href="#practice-stage"
              className="hover:text-[#0284C7] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Practice Game
            </a>
            <a
              href="#ai-sandbox"
              className="hover:text-[#0284C7] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Live AI Coach
            </a>
            <a
              href="#memory-cards"
              className="hover:text-[#0284C7] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Memory Cards
            </a>
            <a
              href="#badges"
              className="hover:text-[#0284C7] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              My Badges
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleNextChallenge}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#0284C7] rounded-xl hover:bg-[#0369A1] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Next Activity
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 md:py-12 space-y-14">
        {/* =================================================================
            HERO SECTION: 2-Column Split + Full-Width KPI Strip Below
           ================================================================= */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Mission, Skill Level Switcher & Reading Comfort Toolbar */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#0284C7] mb-3">
                  <span>Visual Tech &amp; AI Game</span>
                  <span aria-hidden="true">·</span>
                  <span>Learn by Doing</span>
                  <span aria-hidden="true">·</span>
                  <span>3 Skill Levels</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-slate-900 leading-tight mb-4">
                  Master Browsers, ChatGPT, Copilot, Apple iOS, Firefly &amp; Vibe Coding.
                </h1>

                <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6">
                  Play visual games that make technology stick—from Internet Browsers, Google Drive, and Managing Photos to Deepfake Defense, 3D Virtual Reality, Smart Home Casting, and Vibe Coding.
                </p>

                {/* Skill Level Segmented Selector (Beginner / Intermediate / Advanced) */}
                <div className="mb-6">
                  <div className="text-xs font-bold text-slate-600 mb-2">
                    Choose Your Comfort &amp; Skill Level:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
                    {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map(
                      (lvl, idx) => {
                        const isSelected = skillLevel === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => {
                              soundFX.playTap();
                              handleSelectTrackAndLevel(activeTrack, lvl);
                            }}
                            className={`py-2.5 px-3 rounded-lg text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <div className="text-xs font-bold text-[#0284C7] whitespace-nowrap">
                              Level {idx + 1}
                            </div>
                            <div className="text-sm font-bold truncate">
                              {SKILL_LEVEL_META[lvl].shortTitle}
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>

              {/* Reading Comfort & Audio Toolbar */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-700 mr-1">
                    Text Size:
                  </span>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                    {(['normal', 'large', 'xlarge'] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          soundFX.playTap();
                          setFontScale(sz);
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                          fontScale === sz
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {sz === 'normal'
                          ? 'Standard'
                          : sz === 'large'
                          ? 'Large'
                          : 'Extra Large'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleSound}
                  className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 cursor-pointer whitespace-nowrap shrink-0"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-4 h-4 text-[#059669]" />
                      Sound Chimes: On
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4 text-slate-500" />
                      Sound Chimes: Muted
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Cute Owl Hero Illustration with Measured Scrim & Zero-Broken-Image Fallback */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 min-h-[280px]">
              {!heroImgFailed ? (
                <img
                  src={HERO_IMAGE_PATH}
                  alt="Cute cheerful little owl wearing reading glasses beside a tablet with star badges and a warm cup of tea"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="w-full h-full lg:h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-800 text-white">
                  <Smartphone className="w-12 h-12 text-sky-400 mb-3" />
                  <div className="text-xl font-bold mb-1">
                    Stay Connected with Confidence
                  </div>
                  <p className="text-sm text-slate-300">
                    Interactive visual games for everyday technology &amp; AI.
                  </p>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 text-white">
                <div className="text-xs font-semibold text-sky-300 mb-1">
                  {SKILL_LEVEL_META[skillLevel].label}
                </div>
                <p className="text-base font-medium leading-snug">
                  “{SKILL_LEVEL_META[skillLevel].description}”
                </p>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Progress & Gamification Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-medium text-slate-500 mb-1">
                Total Learning Points
              </div>
              <div className="font-mono-num text-2xl font-bold text-slate-900">
                {score} pts
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-medium text-slate-500 mb-1">
                Interactive Games Completed
              </div>
              <div className="font-mono-num text-2xl font-bold text-[#059669]">
                {completedChallengeIds.length} / {allChallenges.length}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-medium text-slate-500 mb-1">
                Progress Badges Earned
              </div>
              <div className="font-mono-num text-2xl font-bold text-[#0284C7]">
                {unlockedBadgeIds.length} / {BADGES.length}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1">
                  Now Playing
                </div>
                <div className="text-base font-bold text-slate-900 truncate">
                  {currentChallenge.topicTag}
                </div>
              </div>
              <Award className="w-7 h-7 text-amber-500 shrink-0" />
            </div>
          </div>
        </section>

        {/* =================================================================
            TOPIC TRACKS & ALL TOPICS DIRECTORY + GAME STAGE
           ================================================================= */}
        <section id="skill-tracks" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-[#0284C7] mb-1">
                Interactive Learning Adventure
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Choose a Skill Track or Specific Topic
              </h2>
            </div>

            {/* Mode Switcher: 6 Topic Tracks vs All 17 Topics Grid + Add Custom Activity */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playTap();
                    setBrowseMode('tracks');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    browseMode === 'tracks'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  6 Skill Tracks
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playTap();
                    setBrowseMode('all_topics');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    browseMode === 'all_topics'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  All 17 Topics A–Z
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundFX.playTap();
                  setShowAddModal(true);
                }}
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl border border-[#0284C7] text-[#0284C7] hover:bg-sky-50 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Custom Activity
              </button>
            </div>
          </div>

          {/* VIEW A: 6 TOPIC TRACK CARDS + 3 SKILL LEVELS */}
          {browseMode === 'tracks' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(Object.keys(TRACK_META) as TrackId[]).map((tId) => {
                  const track = TRACK_META[tId];
                  const isSelected = activeTrack === tId;
                  const trackChallenges = allChallenges.filter((c) => c.trackId === tId);
                  const doneInTrack = trackChallenges.filter((c) =>
                    completedChallengeIds.includes(c.id)
                  ).length;

                  return (
                    <button
                      key={tId}
                      type="button"
                      onClick={() => {
                        soundFX.playTap();
                        handleSelectTrackAndLevel(tId, skillLevel);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              isSelected
                                ? 'bg-sky-500/20 text-sky-300'
                                : 'bg-slate-100 text-[#0284C7]'
                            }`}
                          >
                            {renderTrackIcon(tId)}
                          </div>
                          <span
                            className={`font-mono-num text-xs font-semibold ${
                              isSelected ? 'text-emerald-300' : 'text-slate-500'
                            }`}
                          >
                            {track.subtitleTag} · {doneInTrack}/{trackChallenges.length} Done
                          </span>
                        </div>
                        <div className="font-bold text-lg leading-snug mb-1">
                          {track.title}
                        </div>
                        <p
                          className={`text-sm leading-relaxed ${
                            isSelected ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {track.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-slate-200/20 flex items-center justify-between text-xs font-semibold">
                        <span>
                          {isSelected ? 'Currently Playing' : 'Select Track'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW B: ALL 17 TOPICS DIRECTORY GRID (NO WEEK NUMBERS) */}
          {browseMode === 'all_topics' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <span>
                  Click any topic card below to jump straight to its visual game:
                </span>
                <span className="font-mono-num font-semibold text-slate-800">
                  {allChallenges.length} Interactive Activities Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ALL_TOPIC_MODULES.map((mod) => {
                  const isPrimaryActive = currentChallenge.id === mod.challengeId;
                  const isSecondaryActive =
                    mod.secondaryChallengeId &&
                    currentChallenge.id === mod.secondaryChallengeId;
                  const isActive = isPrimaryActive || isSecondaryActive;
                  const isDone = completedChallengeIds.includes(mod.challengeId);

                  return (
                    <div
                      key={mod.id}
                      className={`rounded-xl border p-3.5 flex flex-col justify-between transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50/80 hover:bg-white text-slate-900 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span
                            className={`text-xs font-bold ${
                              isActive ? 'text-sky-300' : 'text-[#0284C7]'
                            }`}
                          >
                            {mod.category}
                          </span>
                          {isDone && (
                            <CheckCircle2
                              className={`w-4 h-4 ${
                                isActive ? 'text-emerald-300' : 'text-[#059669]'
                              }`}
                            />
                          )}
                        </div>
                        <div className="font-bold text-sm leading-snug mb-3">
                          {mod.label}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/30">
                        <button
                          type="button"
                          onClick={() => handleSelectSpecificChallenge(mod.challengeId)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                            isPrimaryActive
                              ? 'bg-[#0284C7] text-white'
                              : isActive
                              ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                              : 'bg-white border border-slate-300 text-slate-800 hover:border-[#0284C7]'
                          }`}
                        >
                          Play Game →
                        </button>
                        {mod.secondaryChallengeId && (
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectSpecificChallenge(mod.secondaryChallengeId!)
                            }
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                              isSecondaryActive
                                ? 'bg-[#059669] text-white'
                                : isActive
                                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                                : 'bg-white border border-slate-300 text-slate-800 hover:border-[#059669]'
                            }`}
                          >
                            Bonus Lab →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {customChallenges.map((cust) => {
                  const isActive = currentChallenge.id === cust.id;
                  return (
                    <div
                      key={cust.id}
                      className={`rounded-xl border p-3.5 flex flex-col justify-between transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-sky-50/70 text-slate-900 border-sky-200'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#0284C7] mb-1">
                          {cust.topicTag}
                        </div>
                        <div className="font-bold text-sm leading-snug mb-2">
                          {cust.title}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectSpecificChallenge(cust.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0284C7] text-white cursor-pointer self-start whitespace-nowrap shrink-0"
                      >
                        Play Game →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACTIVE INTERACTIVE GAME STAGE */}
          <div id="practice-stage" className="scroll-mt-20 pt-2">
            <InteractiveStage
              challenge={currentChallenge}
              isCompleted={completedChallengeIds.includes(currentChallenge.id)}
              onCompleteChallenge={handleCompleteChallenge}
              onNextChallenge={handleNextChallenge}
            />
          </div>
        </section>

        {/* =================================================================
            LIVE AI PRACTICE SANDBOX (SERVER-SIDE GEMINI 3.8 FLASH)
           ================================================================= */}
        <section id="ai-sandbox" className="scroll-mt-20">
          <LiveAiSandbox
            skillLevel={skillLevel}
            onEarnBonusPoints={handleEarnBonusPoints}
          />
        </section>

        {/* =================================================================
            MEMORY CARDS & EARNED PROGRESS BADGES
           ================================================================= */}
        <BadgesAndMemorySection
          unlockedBadgeIds={unlockedBadgeIds}
          onSelectTrackToPlay={(trackId) => {
            handleSelectTrackAndLevel(trackId, skillLevel);
            const el = document.getElementById('practice-stage');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* =================================================================
          MODAL: "+ ADD CUSTOM ACTIVITY"
         ================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-200">
              <div>
                <div className="text-xs font-bold text-[#0284C7]">
                  Custom Activity Builder
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Add a New Practice Question
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomChallenge} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Topic Category:
                </label>
                <select
                  value={newTopicCategory}
                  onChange={(e) => setNewTopicCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-medium text-slate-900"
                >
                  {ALL_TOPIC_MODULES.map((m) => (
                    <option key={m.id} value={m.label}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Activity Title:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Opening a New Tab in Safari Without Losing Your Page"
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Real-Life Scenario Question:
                </label>
                <textarea
                  rows={2}
                  required
                  value={newScenario}
                  onChange={(e) => setNewScenario(e.target.value)}
                  placeholder="Describe the situation..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#059669] mb-1">
                  Correct Button / Action to Tap:
                </label>
                <input
                  type="text"
                  required
                  value={newCorrectButton}
                  onChange={(e) => setNewCorrectButton(e.target.value)}
                  placeholder="e.g., Tap the Plus (+) Button in the Top Right Corner"
                  className="w-full rounded-xl border border-emerald-300 p-3 text-sm text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Incorrect Choice 1 (Optional):
                  </label>
                  <input
                    type="text"
                    value={newDistractor1}
                    onChange={(e) => setNewDistractor1(e.target.value)}
                    placeholder="e.g., Turn Off Wi-Fi"
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Incorrect Choice 2 (Optional):
                  </label>
                  <input
                    type="text"
                    value={newDistractor2}
                    onChange={(e) => setNewDistractor2(e.target.value)}
                    placeholder="e.g., Delete the Browser App"
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Golden Rule / Memory Takeaway:
                </label>
                <input
                  type="text"
                  value={newMemoryRule}
                  onChange={(e) => setNewMemoryRule(e.target.value)}
                  placeholder="e.g., The Plus (+) icon opens a fresh tab while keeping your first page open!"
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-semibold cursor-pointer whitespace-nowrap shrink-0"
                >
                  Save &amp; Launch Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================
          QUIET FOOTER WITH REAL USER ACTIONS
         ================================================================= */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div>
            <span className="font-bold text-slate-900">BrightSteps Academy</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>Visual Technology &amp; AI Learning Game</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleResetAllProgress}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Game Progress
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
