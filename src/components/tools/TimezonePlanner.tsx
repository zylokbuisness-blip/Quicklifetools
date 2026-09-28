import React, { useState } from 'react';
import {
  Clock,
  Globe2,
  Copy,
  Check,
  Sun,
  Moon,
  Sparkles,
  Info,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { AdSlot } from '../ads/AdSlot';

interface USZone {
  code: string;
  name: string;
  offsetHoursFromET: number; // ET is base 0
  cities: string;
  utcOffset: string;
}

const US_ZONES: USZone[] = [
  { code: 'ET', name: 'Eastern Time', offsetHoursFromET: 0, cities: 'New York, Atlanta, Miami, Boston', utcOffset: 'UTC-5 / -4' },
  { code: 'CT', name: 'Central Time', offsetHoursFromET: -1, cities: 'Chicago, Dallas, Houston, Minneapolis', utcOffset: 'UTC-6 / -5' },
  { code: 'MT', name: 'Mountain Time', offsetHoursFromET: -2, cities: 'Denver, Salt Lake City, Boise', utcOffset: 'UTC-7 / -6' },
  { code: 'PT', name: 'Pacific Time', offsetHoursFromET: -3, cities: 'Los Angeles, San Francisco, Seattle', utcOffset: 'UTC-8 / -7' },
  { code: 'AKT', name: 'Alaska Time', offsetHoursFromET: -4, cities: 'Anchorage, Fairbanks, Juneau', utcOffset: 'UTC-9 / -8' },
  { code: 'HST', name: 'Hawaii-Aleutian', offsetHoursFromET: -5, cities: 'Honolulu, Maui (No DST)', utcOffset: 'UTC-10' },
];

export const TimezonePlanner: React.FC = () => {
  // Base time represented in Eastern Time (0 to 23.5 in 30-min steps)
  const [baseETMinutes, setBaseETMinutes] = useState<number>(14 * 60); // 2:00 PM ET default
  const [copied, setCopied] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('Sync & Planning');

  const formatTimeFromMinutes = (totalMins: number) => {
    let norm = (totalMins % 1440 + 1440) % 1440;
    const hours24 = Math.floor(norm / 60);
    const mins = norm % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const minsStr = mins < 10 ? `0${mins}` : mins;
    return `${hours12}:${minsStr} ${period}`;
  };

  const getDayShiftNote = (totalMins: number) => {
    if (totalMins < 0) return 'Previous Day';
    if (totalMins >= 1440) return 'Next Day';
    return 'Same Day';
  };

  const getTimeStatus = (totalMins: number) => {
    let norm = (totalMins % 1440 + 1440) % 1440;
    const hours = norm / 60;

    if (hours >= 9 && hours <= 17) {
      return {
        label: 'Prime Work Hours',
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
        icon: Sun,
        isGood: true,
      };
    }
    if (hours >= 8 && hours < 9) {
      return {
        label: 'Early Morning',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
        icon: Clock,
        isGood: false,
      };
    }
    if (hours > 17 && hours <= 19) {
      return {
        label: 'Evening / After-Hours',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
        icon: Moon,
        isGood: false,
      };
    }
    return {
      label: 'Off-Hours / Sleep',
      badgeClass: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-300 dark:border-slate-700',
      icon: Moon,
      isGood: false,
    };
  };

  // Check if all 4 contiguous US zones (ET, CT, MT, PT) are within 9am-5pm
  const isAllUSContiguousWorkHours = () => {
    const etH = baseETMinutes / 60;
    const ptH = (baseETMinutes - 180) / 60;
    // For PT to be >= 9 and ET <= 17
    // PT 9am = ET 12pm. ET 5pm = PT 2pm.
    // So golden window is ET 12:00 PM to 5:00 PM!
    return etH >= 12 && etH <= 17;
  };

  const copyMeetingInvite = () => {
    const times = US_ZONES.slice(0, 4)
      .map((z) => `${formatTimeFromMinutes(baseETMinutes + z.offsetHoursFromET * 60)} ${z.code}`)
      .join(' | ');

    const text = `📅 ${meetingTitle}\n⏰ ${times}\n🌎 Scheduled via QuickLifeTools Timezone Planner`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-3">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Coast-to-Coast Remote Work & Meeting Sync</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          US Multi-Timezone Meeting Planner
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
          Quickly align teams across Eastern, Central, Mountain, and Pacific time without accidental 6:00 AM wake-up calls. Copy clean invites in one tap.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Time Scroller & Presets */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Base Time Adjustment (Eastern ET)
            </h2>
            <span className="text-sm font-mono font-black text-cyan-600 dark:text-cyan-400">
              {formatTimeFromMinutes(baseETMinutes)} ET
            </span>
          </div>

          {/* Time Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Slide to Adjust Meeting Time:
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                15-min increments
              </span>
            </div>
            <input
              type="range"
              min="360" // 6:00 AM
              max="1320" // 10:00 PM
              step="15"
              value={baseETMinutes}
              onChange={(e) => setBaseETMinutes(Number(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
              <span>6:00 AM</span>
              <span>12:00 PM</span>
              <span>5:00 PM</span>
              <span>10:00 PM</span>
            </div>
          </div>

          {/* Quick Time Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Popular US Meeting Slots:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: '11:00 AM ET', mins: 11 * 60, desc: '8a PT / 10a CT' },
                { label: '1:00 PM ET', mins: 13 * 60, desc: '10a PT / 12p CT' },
                { label: '2:00 PM ET', mins: 14 * 60, desc: '11a PT / 1p CT' },
                { label: '4:00 PM ET', mins: 16 * 60, desc: '1p PT / 3p CT' },
              ].map((slot) => (
                <button
                  key={slot.label}
                  onClick={() => setBaseETMinutes(slot.mins)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    baseETMinutes === slot.mins
                      ? 'bg-cyan-50 dark:bg-cyan-950/80 border-cyan-500 text-cyan-800 dark:text-cyan-200 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                  }`}
                >
                  <div className="text-xs font-semibold">{slot.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{slot.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Contiguous Overlap Golden Window Badge */}
          {isAllUSContiguousWorkHours() ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className="block font-bold mb-0.5">Golden US Overlap Window Active!</strong>
                This selected time falls strictly between <strong>9:00 AM and 5:00 PM</strong> for ALL four major US time zones (Pacific, Mountain, Central, and Eastern). No attendee will be in early morning or after-hours.
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 flex items-start gap-2 text-xs">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                Note: West Coast (PT) is either before 9:00 AM or East Coast (ET) is after 5:00 PM. The universal sweet spot is <strong>12:00 PM to 5:00 PM ET</strong> (9:00 AM to 2:00 PM PT).
              </div>
            </div>
          )}

          {/* Meeting Title Input & Copy */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Meeting Label / Agenda:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="Meeting name..."
                className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={copyMeetingInvite}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Invite'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Timezones Live Matrix */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              All US Time Zones Matrix
            </h3>

            <div className="space-y-3">
              {US_ZONES.map((zone) => {
                const zoneMins = baseETMinutes + zone.offsetHoursFromET * 60;
                const timeStr = formatTimeFromMinutes(zoneMins);
                const status = getTimeStatus(zoneMins);
                const dayShift = getDayShiftNote(zoneMins);

                return (
                  <div
                    key={zone.code}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                          {zone.code}
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {zone.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {zone.cities}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-lg sm:text-xl font-mono font-black text-slate-900 dark:text-white">
                        {timeStr}
                      </div>
                      <div className="flex items-center justify-end gap-1.5 mt-0.5">
                        {dayShift !== 'Same Day' && (
                          <span className="text-[10px] text-rose-500 font-bold">
                            {dayShift}
                          </span>
                        )}
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.badgeClass}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* IN-TOOL AD SLOT */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <AdSlot slot="in-tool-content" />
            </div>
          </div>

          {/* Daylight Saving Time Notice */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-500" />
              US Daylight Saving Time (DST) Exceptions
            </h4>
            <p>
              Most of the United States observes Daylight Saving Time (Second Sunday in March to First Sunday in November). However, <strong>Arizona</strong> (except the Navajo Nation) and <strong>Hawaii</strong> do not observe DST and remain on standard time year-round.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
