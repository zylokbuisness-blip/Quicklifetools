import React from 'react';

interface AdSlotProps {
  slot: 'top-leaderboard' | 'in-tool-content' | 'bottom-banner';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slot, className = '' }) => {
  if (slot === 'top-leaderboard') {
    return (
      <aside
        aria-label="Advertisement"
        className={`w-full max-w-5xl mx-auto px-4 my-3 print:hidden ${className}`}
      >
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-widest uppercase text-slate-400 dark:text-slate-500 font-medium mb-1">
            Advertisement
          </span>
          <div className="w-full min-h-[90px] max-h-[100px] bg-slate-100/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-lg flex items-center justify-center text-center overflow-hidden relative">
            {/* <!-- Google AdSense Code Here --> */}
            {/* Leaderboard: 728x90 desktop / 320x50 mobile */}
            <div className="text-[11px] text-slate-400 dark:text-slate-600 font-mono tracking-tight">
              728×90 Leaderboard Ad Space
            </div>
          </div>
        </div>
      </aside>
    );
  }

  if (slot === 'in-tool-content') {
    return (
      <aside
        aria-label="Advertisement"
        className={`w-full my-6 print:hidden ${className}`}
      >
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-widest uppercase text-slate-400 dark:text-slate-500 font-medium mb-1">
            Advertisement
          </span>
          <div className="w-full max-w-[336px] min-h-[250px] bg-slate-100/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">
            {/* <!-- Google AdSense Code Here --> */}
            {/* Responsive Rectangle: 300x250 / 336x280 */}
            <div className="text-[11px] text-slate-400 dark:text-slate-600 font-mono">
              300×250 / 336×280 In-Content Ad
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // bottom-banner
  return (
    <aside
      aria-label="Advertisement"
      className={`w-full max-w-5xl mx-auto px-4 my-6 print:hidden ${className}`}
    >
      <div className="flex flex-col items-center">
        <span className="text-[10px] tracking-widest uppercase text-slate-400 dark:text-slate-500 font-medium mb-1">
          Advertisement
        </span>
        <div className="w-full min-h-[90px] bg-slate-100/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-lg flex items-center justify-center text-center overflow-hidden relative">
          {/* <!-- Google AdSense Code Here --> */}
          {/* Bottom Banner: 728x90 / 970x90 */}
          <div className="text-[11px] text-slate-400 dark:text-slate-600 font-mono tracking-tight">
            728×90 / 970×90 Banner Ad Space
          </div>
        </div>
      </div>
    </aside>
  );
};
