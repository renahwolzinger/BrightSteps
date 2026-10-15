import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, RotateCcw } from 'lucide-react';
import { SkillLevel } from '../types/game';
import { soundFX } from '../utils/sound';

interface LiveAiSandboxProps {
  skillLevel: SkillLevel;
  onEarnBonusPoints: (pts: number) => void;
}

const STARTER_PROMPTS = [
  {
    category: 'ChatGPT, MS Copilot & Gemini',
    prompt:
      'Explain the difference between ChatGPT, Microsoft Copilot, and Google Gemini in 3 friendly bullet points for a senior learner.',
  },
  {
    category: 'Adobe Firefly & AI Art Prompt',
    prompt:
      'Help me write a vivid Adobe Firefly image prompt for a sunny watercolor illustration of a tabby cat sleeping in a greenhouse.',
  },
  {
    category: 'AI for Travel & Navigation',
    prompt:
      'Plan a relaxed, step-free 2-day trip to Boston with only 1 morning and 1 afternoon stop per day, including cozy lunch spots.',
  },
  {
    category: 'Vibe Coding & App Idea',
    prompt:
      'I want to Vibe Code a simple "Book Club & Tea Tracker" web app for my friends. Suggest 3 easy buttons and features it should have.',
  },
];

export const LiveAiSandbox: React.FC<LiveAiSandboxProps> = ({
  skillLevel,
  onEarnBonusPoints,
}) => {
  const [promptInput, setPromptInput] = useState<string>(STARTER_PROMPTS[0].prompt);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    aiReply: string;
    coachTip: string;
    clarityScore: number;
    suggestedFollowUp: string;
  } | null>(null);

  const handleSendPrompt = async (customText?: string) => {
    const textToSend = (customText ?? promptInput).trim();
    if (!textToSend) return;

    soundFX.playTap();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          skillLevel,
          topic: 'Senior Technology & AI Learning Adventure',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Could not reach the AI helper.');
      }

      setResult(data);
      soundFX.playSuccess();
      onEarnBonusPoints(25);
    } catch (err: any) {
      setError(
        err?.message ||
          'We could not reach the live AI helper right now. Try clicking again in a moment!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
      <div className="max-w-3xl mb-6">
        <div className="flex items-center gap-2 text-sm text-[#0284C7] font-semibold mb-1">
          <span>Live AI Practice Studio</span>
          <span aria-hidden="true">·</span>
          <span>Powered by Gemini</span>
          <span aria-hidden="true">·</span>
          <span>+25 Bonus Points per Prompt</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Practice ChatGPT, Copilot, Firefly &amp; Vibe Coding Prompts Live
        </h2>
        <p className="text-slate-700 text-base">
          Tap a starter idea below—or type any question of your own—to see a live AI response along with a friendly Coach’s Tip.
        </p>
      </div>

      {/* Starter Prompt Buttons */}
      <div className="mb-6">
        <div className="text-sm font-bold text-slate-800 mb-2.5">
          Tap a Starter Idea to Fill the Box:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {STARTER_PROMPTS.map((item) => (
            <button
              key={item.category}
              type="button"
              onClick={() => {
                soundFX.playTap();
                setPromptInput(item.prompt);
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                promptInput === item.prompt
                  ? 'bg-sky-50/80 border-[#0284C7] text-slate-900'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
              }`}
            >
              <div className="text-xs font-semibold text-[#0284C7] mb-1">
                {item.category}
              </div>
              <div className="text-sm font-medium leading-snug">{item.prompt}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <label htmlFor="ai-sandbox-input" className="block text-sm font-bold text-slate-900">
          Your Question or Prompt for AI:
        </label>
        <textarea
          id="ai-sandbox-input"
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Type a question in plain everyday English..."
          className="w-full rounded-xl border border-slate-300 bg-white p-4 text-base text-slate-900 focus:border-[#0284C7] focus:outline-none"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-600">
            Safety Rule: Never enter passwords, Social Security numbers, or bank account numbers.
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                setPromptInput('');
                setResult(null);
                setError(null);
              }}
              className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
            <button
              type="button"
              disabled={loading || !promptInput.trim()}
              onClick={() => handleSendPrompt()}
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] disabled:bg-slate-300 text-white font-semibold text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Thinking...' : 'Ask AI Coach'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 rounded-xl border bg-amber-50 border-amber-300 text-slate-900 text-sm font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-slate-200">
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-bold text-slate-900 text-base">
                <MessageSquare className="w-5 h-5 text-[#0284C7]" />
                AI Helper’s Answer
              </span>
              <span className="font-mono-num text-xs font-semibold text-[#059669]">
                Clarity Score: {result.clarityScore}/100
              </span>
            </div>
            <p className="text-slate-800 text-base leading-relaxed whitespace-pre-line">
              {result.aiReply}
            </p>
          </div>

          <div className="lg:col-span-5 bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] mb-1">
                <CheckCircle2 className="w-4 h-4" />
                COACH’S PROMPT FEEDBACK
              </div>
              <p className="text-slate-800 text-sm leading-relaxed">
                {result.coachTip}
              </p>
            </div>

            {result.suggestedFollowUp && (
              <div className="pt-3 border-t border-emerald-200/80">
                <div className="text-xs font-semibold text-slate-600 mb-2">
                  Try Asking This Follow-Up Question Next:
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPromptInput(result.suggestedFollowUp);
                    handleSendPrompt(result.suggestedFollowUp);
                  }}
                  className="w-full text-left p-3 rounded-lg bg-white border border-emerald-300 hover:border-[#059669] text-sm font-semibold text-slate-900 transition-colors cursor-pointer"
                >
                  “{result.suggestedFollowUp}” →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
