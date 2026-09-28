import React from 'react';
import {
  Zap,
  ShieldCheck,
  Cpu,
  Heart,
  Users,
  BedDouble,
  Receipt,
  Briefcase,
  Home,
  CheckCircle,
  Coffee,
  Code2,
  Terminal,
} from 'lucide-react';
import { NavRoute } from '../../types';

interface AboutUsProps {
  onRouteChange: (route: NavRoute) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onRouteChange }) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      {/* Human Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-4">
          <Terminal className="w-3.5 h-3.5 text-blue-500" />
          <span>Indie Web Project • Built with Care</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Hi, we built QuickLifeTools because modern web tools got ridiculously annoying.
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-base leading-relaxed">
          No mandatory sign-ups. No popups asking for your mother's maiden name. Just clean, instant answers to the math Americans run into every single week.
        </p>
      </div>

      {/* Founder / Creator Note */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs mb-8 space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
            DM
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Dan Miller & Contributors
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Software Engineer & Creator • Chicago, IL
            </span>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          <p>
            A couple of years ago, I was sitting at a crowded diner in Wicker Park on a Sunday morning with four friends. The check arrived. I pulled up my phone to calculate the tip and split the bill fairly.
          </p>
          <p>
            The first result on Google hit me with a full-screen cookie consent banner, two auto-playing video popups, a prompt asking me to download an iOS app, and then forced me to click "Next Step" four times. <strong>For a $68 bill.</strong>
          </p>
          <p>
            The next week, I was looking at new apartments and trying to double-check my paycheck numbers after moving states. Same story: paywalled calculator sites, spammy mortgage lead-generation forms, and pages asking for my email before revealing what my take-home pay would be.
          </p>
          <p className="font-medium text-slate-900 dark:text-slate-100">
            I built QuickLifeTools as an antidote to that junk.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-4 mb-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Our Three Ground Rules
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Your data stays in your browser. Period.
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                When you type in your hourly wage, your rent budget, or your dinner bill, that math runs directly on your device via JavaScript. Nothing gets posted to a database, tracked in a user profile, or sold to a credit card broker.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Instant calculations with zero spinners.
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                No loading states, no artificial delays. You tweak a number or slide an input, and the calculation updates in the exact same millisecond. That's the way web software used to be built, and it's how we build it here.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Grounded in American financial reality.
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                We account for 50-state sales tax nuances, standard FICA payroll deductions, bi-weekly pay cycles (26 paychecks/yr), pre-tax tipping rules, and strict metropolitan rent thresholds like NYC's 40x rule.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Callout */}
      <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 mb-10 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <Code2 className="w-4 h-4 text-blue-500" />
          <span>How this site is maintained</span>
        </div>
        <p className="leading-relaxed">
          QuickLifeTools is crafted with TypeScript, React, and Tailwind CSS. The site is hosted on ultra-low-latency edge infrastructure. We don't have venture capital, and we don't have a sales team. We support hosting costs through standard, non-intrusive Google AdSense advertising.
        </p>
      </div>

      {/* Jump back into the tools */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
          Jump straight into a calculator:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold">
          <button
            onClick={() => onRouteChange('sleep-cycle')}
            className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors"
          >
            <BedDouble className="w-4 h-4 text-blue-500 mb-1.5" />
            <span>Sleep Cycle</span>
          </button>
          <button
            onClick={() => onRouteChange('tip-calculator')}
            className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors"
          >
            <Receipt className="w-4 h-4 text-emerald-500 mb-1.5" />
            <span>Tip & Bill Split</span>
          </button>
          <button
            onClick={() => onRouteChange('salary-estimator')}
            className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors"
          >
            <Briefcase className="w-4 h-4 text-indigo-500 mb-1.5" />
            <span>Salary Paycheck</span>
          </button>
          <button
            onClick={() => onRouteChange('rent-affordability')}
            className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-colors"
          >
            <Home className="w-4 h-4 text-amber-500 mb-1.5" />
            <span>Rent 30% Rule</span>
          </button>
        </div>
      </div>
    </div>
  );
};
