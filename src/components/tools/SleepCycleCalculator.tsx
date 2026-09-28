import React, { useState, useEffect } from 'react';
import {
  BedDouble,
  Moon,
  Sun,
  Clock,
  Zap,
  Check,
  Copy,
  Info,
  ChevronDown,
  Sparkles,
  Coffee,
  Flame,
  Volume2,
} from 'lucide-react';
import { SleepResult } from '../../types';
import { AdSlot } from '../ads/AdSlot';

export const SleepCycleCalculator: React.FC = () => {
  const [mode, setMode] = useState<'wake_at' | 'sleep_at' | 'sleep_now'>('sleep_now');
  const [selectedHour, setSelectedHour] = useState('07');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('AM');
  const [latencyMinutes, setLatencyMinutes] = useState(15);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date): string => {
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  const calculateResults = (): { results: SleepResult[]; headline: string; note: string } => {
    const CYCLE_MINUTES = 90;

    if (mode === 'sleep_now') {
      const now = new Date();
      const results: SleepResult[] = [];

      const cycleConfigs: Array<{
        cycles: number;
        quality: SleepResult['quality'];
        color: string;
        desc: string;
        recommended?: boolean;
      }> = [
        {
          cycles: 6,
          quality: 'Optimal (Full Rest)',
          color: 'emerald',
          desc: '9.0 hours. Ideal for full muscle recovery, mental clarity, and catching up on sleep debt.',
        },
        {
          cycles: 5,
          quality: 'Recommended',
          color: 'blue',
          desc: '7.5 hours. The sweet spot for most adults. Wakes you up feeling crisp and naturally alert.',
          recommended: true,
        },
        {
          cycles: 4,
          quality: 'Manageable',
          color: 'amber',
          desc: '6.0 hours. Solid for busy weekdays. You will wake up at the tail end of a cycle without grogginess.',
        },
        {
          cycles: 3,
          quality: 'Short',
          color: 'orange',
          desc: '4.5 hours. Crunch night. You might feel a mid-afternoon dip, but no heavy sleep inertia.',
        },
        {
          cycles: 2,
          quality: 'Short',
          color: 'rose',
          desc: '3.0 hours. Emergency sleep only. Plan for an early night tomorrow.',
        },
        {
          cycles: 1,
          quality: 'Power Nap',
          color: 'purple',
          desc: '90 min full cycle nap. Great afternoon recharge without the sluggish nap hangover.',
        },
      ];

      cycleConfigs.forEach((cfg) => {
        const targetDate = new Date(now.getTime() + (latencyMinutes + cfg.cycles * CYCLE_MINUTES) * 60000);
        const totalMinutes = cfg.cycles * CYCLE_MINUTES;
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        const hoursFormatted = mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;

        results.push({
          cycles: cfg.cycles,
          timeString: formatTime(targetDate),
          totalMinutes,
          hoursFormatted,
          quality: cfg.quality,
          qualityColor: cfg.color,
          description: cfg.desc,
          isRecommended: cfg.recommended,
        });
      });

      return {
        results,
        headline: 'If you close your eyes now, set your alarm for:',
        note: `Includes ${latencyMinutes} minutes for you to actually fall asleep. Waking between 90-min cycles avoids morning brain fog.`,
      };
    }

    if (mode === 'wake_at') {
      let targetHour = parseInt(selectedHour, 10);
      if (selectedPeriod === 'PM' && targetHour < 12) targetHour += 12;
      if (selectedPeriod === 'AM' && targetHour === 12) targetHour = 0;

      const targetWake = new Date();
      targetWake.setHours(targetHour, parseInt(selectedMinute, 10), 0, 0);

      const results: SleepResult[] = [];
      const cycleConfigs = [
        {
          cycles: 6,
          quality: 'Optimal (Full Rest)' as const,
          color: 'emerald',
          desc: '9.0 hrs sleep. Get in bed 9 hours and 15 mins before your wake time.',
        },
        {
          cycles: 5,
          quality: 'Recommended' as const,
          color: 'blue',
          desc: '7.5 hrs sleep. The standard recommended target for adults.',
          recommended: true,
        },
        {
          cycles: 4,
          quality: 'Manageable' as const,
          color: 'amber',
          desc: '6.0 hrs sleep. Manageable baseline for busy work weeks.',
        },
        {
          cycles: 3,
          quality: 'Short' as const,
          color: 'orange',
          desc: '4.5 hrs sleep. For emergency late nights or early flights.',
        },
      ];

      cycleConfigs.forEach((cfg) => {
        const bedTime = new Date(
          targetWake.getTime() - (latencyMinutes + cfg.cycles * CYCLE_MINUTES) * 60000
        );
        const totalMinutes = cfg.cycles * CYCLE_MINUTES;
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        const hoursFormatted = mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;

        results.push({
          cycles: cfg.cycles,
          timeString: formatTime(bedTime),
          totalMinutes,
          hoursFormatted,
          quality: cfg.quality,
          qualityColor: cfg.color,
          description: cfg.desc,
          isRecommended: cfg.recommended,
        });
      });

      return {
        results,
        headline: `To wake up refreshed at ${selectedHour}:${selectedMinute} ${selectedPeriod}, head to bed at:`,
        note: `Times give you ${latencyMinutes} minutes in bed to wind down before sleep onset.`,
      };
    }

    // mode === 'sleep_at'
    let bedHour = parseInt(selectedHour, 10);
    if (selectedPeriod === 'PM' && bedHour < 12) bedHour += 12;
    if (selectedPeriod === 'AM' && bedHour === 12) bedHour = 0;

    const targetBed = new Date();
    targetBed.setHours(bedHour, parseInt(selectedMinute, 10), 0, 0);

    const results: SleepResult[] = [];
    const cycleConfigs = [
      {
        cycles: 6,
        quality: 'Optimal (Full Rest)' as const,
        color: 'emerald',
        desc: '6 full cycles (9h). Deepest physical recharge.',
      },
      {
        cycles: 5,
        quality: 'Recommended' as const,
        color: 'blue',
        desc: '5 full cycles (7.5h). Recommended standard.',
        recommended: true,
      },
      {
        cycles: 4,
        quality: 'Manageable' as const,
        color: 'amber',
        desc: '4 full cycles (6.0h). Adequate weekday baseline.',
      },
      {
        cycles: 3,
        quality: 'Short' as const,
        color: 'orange',
        desc: '3 full cycles (4.5h). Minimum to prevent mid-cycle disruption.',
      },
    ];

    cycleConfigs.forEach((cfg) => {
      const wakeTime = new Date(
        targetBed.getTime() + (latencyMinutes + cfg.cycles * CYCLE_MINUTES) * 60000
      );
      const totalMinutes = cfg.cycles * CYCLE_MINUTES;
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      const hoursFormatted = mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;

      results.push({
        cycles: cfg.cycles,
        timeString: formatTime(wakeTime),
        totalMinutes,
        hoursFormatted,
        quality: cfg.quality,
        qualityColor: cfg.color,
        description: cfg.desc,
        isRecommended: cfg.recommended,
      });
    });

    return {
      results,
      headline: `If you go to bed at ${selectedHour}:${selectedMinute} ${selectedPeriod}, set your alarm for:`,
      note: `Waking up at the end of a cycle aligns with light sleep stages, ensuring you feel refreshed.`,
    };
  };

  const { results, headline, note } = calculateResults();

  const handleCopy = () => {
    const text = results
      .map((r) => `• ${r.timeString} (${r.cycles} cycles, ${r.hoursFormatted}) - ${r.quality}`)
      .join('\n');
    const fullText = `QuickLifeTools Sleep Times:\n${headline}\n${text}\nCalculated at quicklifetools.com`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickPresets = [
    { label: '6:30 AM (Early workout)', h: '06', m: '30', p: 'AM' as const },
    { label: '7:15 AM (Morning commute)', h: '07', m: '15', p: 'AM' as const },
    { label: '8:00 AM (Remote standup)', h: '08', m: '00', p: 'AM' as const },
    { label: '9:00 AM (Weekend sleep-in)', h: '09', m: '00', p: 'AM' as const },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-3">
          <Moon className="w-3.5 h-3.5 text-blue-500" />
          <span>Natural 90-Minute Sleep Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sleep Cycle Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Waking up in the middle of deep sleep makes you feel like a zombie. Time your alarm to the end of a 90-minute sleep cycle so you wake up naturally alert.
        </p>
      </div>

      {/* Main Interactive Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs mb-8">
        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
          <button
            onClick={() => setMode('sleep_now')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              mode === 'sleep_now'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Going to Sleep Now</span>
          </button>

          <button
            onClick={() => setMode('wake_at')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              mode === 'wake_at'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>I Need to Wake Up At...</span>
          </button>

          <button
            onClick={() => setMode('sleep_at')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              mode === 'sleep_at'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span>I Am Heading to Bed At...</span>
          </button>
        </div>

        {/* Time Inputs */}
        {mode !== 'sleep_now' ? (
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                {mode === 'wake_at' ? 'Target wake-up time:' : 'Planned bedtime:'}
              </span>

              <div className="flex items-center gap-2">
                {/* Hour */}
                <div className="relative">
                  <select
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(e.target.value)}
                    className="appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 pr-7 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const val = (i + 1).toString().padStart(2, '0');
                      return (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-3 pointer-events-none text-slate-400" />
                </div>

                <span className="font-bold text-slate-400">:</span>

                {/* Minute */}
                <div className="relative">
                  <select
                    value={selectedMinute}
                    onChange={(e) => setSelectedMinute(e.target.value)}
                    className="appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 pr-7 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                  >
                    {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map(
                      (m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      )
                    )}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-3 pointer-events-none text-slate-400" />
                </div>

                {/* AM/PM toggle */}
                <div className="flex bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg">
                  <button
                    onClick={() => setSelectedPeriod('AM')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                      selectedPeriod === 'AM'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('PM')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                      selectedPeriod === 'PM'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Presets (when wake_at) */}
            {mode === 'wake_at' && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[11px] text-slate-400 mr-1">Quick alarms:</span>
                {quickPresets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setSelectedHour(p.h);
                      setSelectedMinute(p.m);
                      setSelectedPeriod(p.p);
                    }}
                    className="px-2.5 py-1 rounded-md text-[11px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-600 dark:text-slate-300 font-medium transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 mb-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>
              Current Local Clock: <strong className="text-slate-700 dark:text-slate-200">{formatTime(currentTime)}</strong>
            </span>
          </div>
        )}

        {/* Fall Asleep Latency Setting */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl mb-6 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <span>Time you usually take to drift off:</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[10, 15, 20, 30].map((mins) => (
              <button
                key={mins}
                onClick={() => setLatencyMinutes(mins)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  latencyMinutes === mins
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {mins} min{mins === 15 ? ' (Average)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {headline}
            </h3>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Schedule'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {results.map((r) => {
              const isRecommended = r.isRecommended;

              return (
                <div
                  key={r.cycles}
                  className={`p-4 rounded-xl border transition-all relative ${
                    isRecommended
                      ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-400 dark:border-blue-700 ring-1 ring-blue-500/20 shadow-xs'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute -top-2 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.2 rounded-full tracking-wide">
                      Recommended
                    </span>
                  )}

                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                      {r.timeString}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {r.cycles} cycles ({r.hoursFormatted})
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {r.description}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3.5 text-center">
            {note}
          </p>
        </div>

        {/* IN-TOOL CONTENT AD SLOT */}
        <AdSlot slot="in-tool-content" />

        {/* Realistic Nap Guidelines */}
        <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <Coffee className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Afternoon Power Nap Guidelines
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
              <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                20-Minute Power Nap
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Keeps you in light Stage 1 and Stage 2 sleep. Sharpens alertness and reaction speed without letting your body slip into slow-wave deep sleep (no nap hangover).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40">
              <span className="font-bold text-purple-800 dark:text-purple-300 block mb-1">
                90-Minute Full Cycle Reset
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Completes a whole loop through deep sleep and REM dream sleep. Ideal if you were up late studying or working and need cognitive consolidation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Practical Tips */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 text-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Practical Tips to Actually Fall Asleep on Time
        </h3>
        <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
          <li>
            • <strong className="text-slate-700 dark:text-slate-300">Cool bedroom temperature:</strong> Keep the room between 65°F and 68°F. Your body temperature naturally drops to initiate sleep.
          </li>
          <li>
            • <strong className="text-slate-700 dark:text-slate-300">Cut caffeine 8 hours before bed:</strong> The half-life of caffeine is roughly 5 to 7 hours. A 3:00 PM latte is still in your bloodstream at 10:00 PM.
          </li>
          <li>
            • <strong className="text-slate-700 dark:text-slate-300">Don't check the clock if you wake up:</strong> Checking the time causes sub-conscious mental math ("I only have 3 hours left!"), triggering cortisol and keeping you awake.
          </li>
        </ul>
      </div>
    </div>
  );
};
