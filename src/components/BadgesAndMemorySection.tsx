import React, { useState } from 'react';
import {
  ShieldCheck,
  SearchCheck,
  Lock,
  Video,
  QrCode,
  Smartphone,
  Heart,
  Image,
  Award,
  MessageSquare,
  Sparkles,
  BookOpen,
  Palette,
  Wand2,
  Film,
  CheckCircle2,
  Printer,
} from 'lucide-react';
import { BADGES, MEMORY_CARDS, SKILL_LEVEL_META, TRACK_META } from '../data/curriculum';
import { TrackId } from '../types/game';
import { soundFX } from '../utils/sound';

interface BadgesAndMemorySectionProps {
  unlockedBadgeIds: string[];
  onSelectTrackToPlay: (trackId: TrackId) => void;
}

export const BadgesAndMemorySection: React.FC<BadgesAndMemorySectionProps> = ({
  unlockedBadgeIds,
  onSelectTrackToPlay,
}) => {
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<TrackId | 'all'>('all');

  const renderBadgeSymbol = (symbol: string) => {
    switch (symbol) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'SearchCheck':
        return <SearchCheck className="w-6 h-6" />;
      case 'Lock':
        return <Lock className="w-6 h-6" />;
      case 'Video':
        return <Video className="w-6 h-6" />;
      case 'QrCode':
        return <QrCode className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'Heart':
        return <Heart className="w-6 h-6" />;
      case 'Image':
        return <Image className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'Palette':
        return <Palette className="w-6 h-6" />;
      case 'Wand2':
        return <Wand2 className="w-6 h-6" />;
      default:
        return <Film className="w-6 h-6" />;
    }
  };

  const filteredBadges =
    selectedTrackFilter === 'all'
      ? BADGES
      : BADGES.filter((b) => b.trackId === selectedTrackFilter);

  const filteredMemoryCards =
    selectedTrackFilter === 'all'
      ? MEMORY_CARDS
      : MEMORY_CARDS.filter((m) => m.trackId === selectedTrackFilter);

  return (
    <div className="space-y-16">
      {/* SECTION 1: VISUAL MEMORY CARDS (CHEAT SHEETS FOR ALL TOPICS) */}
      <section id="memory-cards" className="scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-sm font-semibold text-[#0284C7] mb-1">
              Visual Reference Keepers
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Quick Memory Cards &amp; Golden Rules
            </h2>
            <p className="text-slate-600 text-base mt-1">
              Visual reminders covering Browsers, ChatGPT, MS Copilot, Google Workspace, Apple iOS, Adobe Firefly, Deepfakes, Smart Home, and Vibe Coding.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Functional Filter Control Bar */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  soundFX.playTap();
                  setSelectedTrackFilter('all');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedTrackFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Topics
              </button>
              {(Object.keys(TRACK_META) as TrackId[]).map((tId) => (
                <button
                  key={tId}
                  type="button"
                  onClick={() => {
                    soundFX.playTap();
                    setSelectedTrackFilter(tId);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedTrackFilter === tId
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {TRACK_META[tId].title.split(',')[0].trim()}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="w-4 h-4" />
              Print Study Sheet
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemoryCards.map((card, index) => (
            <div
              key={card.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Unboxed quiet metadata */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-2">
                  <span className="font-bold text-[#0284C7]">
                    0{index + 1}. {card.topicTag}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{SKILL_LEVEL_META[card.skillLevel].shortTitle}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 mb-4">
                  {card.goldenRule}
                </p>

                <div className="text-xs font-semibold text-slate-500 mb-2">
                  Visual Cue: <span className="text-slate-800">{card.visualCue}</span>
                </div>

                <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside mb-6">
                  {card.stepByStep.map((step, sIdx) => (
                    <li key={sIdx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundFX.playTap();
                  onSelectTrackToPlay(card.trackId);
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-[#0284C7] hover:text-[#0284C7] text-sm font-semibold text-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Practice {card.topicTag} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: PROGRESS BADGES SHOWCASE */}
      <section id="badges" className="scroll-mt-20 pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-sm font-semibold text-[#059669] mb-1">
              Your Learning Milestones
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Earned Progress Badges ({unlockedBadgeIds.length} of {BADGES.length})
            </h2>
            <p className="text-slate-600 text-base mt-1">
              Complete interactive games across all 3 skill levels to collect all 18 badges.
            </p>
          </div>
          <div className="font-mono-num text-sm font-semibold text-slate-700">
            Badge Progress: {Math.round((unlockedBadgeIds.length / BADGES.length) * 100)}%
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBadges.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`rounded-2xl p-5 border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-white border-emerald-300 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 opacity-80'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-[#059669] text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {renderBadgeSymbol(badge.visualSymbol)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-0.5">
                    <span className="font-semibold text-[#0284C7]">{badge.topicTag}</span>
                    <span aria-hidden="true">·</span>
                    <span>{SKILL_LEVEL_META[badge.skillLevel].shortTitle}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-snug mb-2">
                    {badge.description}
                  </p>
                  <div className="text-xs font-semibold">
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[#059669]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Earned &amp; Unlocked
                      </span>
                    ) : (
                      <span className="text-slate-500">
                        {badge.unlockRequirementText}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
