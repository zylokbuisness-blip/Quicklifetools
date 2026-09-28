import React from 'react';
import {
  BedDouble,
  Receipt,
  Briefcase,
  Home as HomeIcon,
  Zap,
  Lock,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  HeartHandshake,
  GraduationCap,
  CreditCard,
  Globe2,
  Calculator,
} from 'lucide-react';
import { NavRoute } from '../../types';

interface HomeProps {
  onRouteChange: (route: NavRoute) => void;
}

export const Home: React.FC<HomeProps> = ({ onRouteChange }) => {
  const tools = [
    {
      id: 'sleep-cycle' as NavRoute,
      title: 'Sleep Cycle Calculator',
      badge: '90-Min REM Cycles',
      badgeColor: 'blue',
      icon: BedDouble,
      tagline: 'Never wake up in the middle of deep sleep again',
      description:
        'Wake up feeling refreshed by timing your alarm to the end of a natural 90-minute sleep cycle. Includes 15-minute fall asleep buffer and quick power-nap benchmarks.',
      example: 'Example: "I need to wake up at 7:15 AM tomorrow"',
      action: 'Find Bedtime',
    },
    {
      id: 'tip-calculator' as NavRoute,
      title: 'Restaurant Tip & Bill Splitter',
      badge: '50-State Sales Tax',
      badgeColor: 'emerald',
      icon: Receipt,
      tagline: 'Split checks with tax & copy Venmo text in one tap',
      description:
        'Calculate dining tips, pre-tax vs post-tax etiquette, apply state sales tax, split among up to 20 people, and copy a neat breakdown message for group chats.',
      example: 'Example: "$84.50 dinner tab split 3 ways in California"',
      action: 'Split Check',
    },
    {
      id: 'salary-estimator' as NavRoute,
      title: 'Hourly to Yearly Salary & Paycheck',
      badge: 'FICA & Take-Home Pay',
      badgeColor: 'indigo',
      icon: Briefcase,
      tagline: 'See what your actual paycheck looks like after taxes',
      description:
        'Convert hourly wages to annual pay (or vice versa). Get realistic take-home estimates after IRS federal brackets, mandatory FICA payroll taxes, and your state income tax.',
      example: 'Example: "$28.50/hr full-time job in Texas or New York"',
      action: 'Calculate Paycheck',
    },
    {
      id: 'rent-affordability' as NavRoute,
      title: 'Rent Affordability Calculator',
      badge: 'HUD 30% & NYC 40x Rule',
      badgeColor: 'amber',
      icon: HomeIcon,
      tagline: 'Know your real budget before applying for apartments',
      description:
        'Determine your maximum recommended rent using federal 30% guidelines, big-city 40x landlord approval formulas, and your existing student or car loan debts.',
      example: 'Example: "Earning $65,000/yr with $350 monthly student loans"',
      action: 'Check Rent Budget',
    },
    {
      id: 'student-loan' as NavRoute,
      title: 'US Student Loan Payoff Calculator',
      badge: 'Extra Payments & Savings',
      badgeColor: 'blue',
      icon: GraduationCap,
      tagline: 'See how an extra $50/mo eliminates years of debt',
      description:
        'Compare standard 10-year federal repayment plans against extra principal payments. Accurately calculate total lifetime interest saved and your accelerated debt freedom date.',
      example: 'Example: "$37,000 balance at 6.5% interest + $100/mo extra"',
      action: 'Plan Payoff',
    },
    {
      id: 'subscription' as NavRoute,
      title: 'Subscription & Recurring Cost Auditor',
      badge: 'Hidden Annual Costs',
      badgeColor: 'indigo',
      icon: CreditCard,
      tagline: 'Calculate how many hours of work fund your subscriptions',
      description:
        'Expose lifestyle creep from streaming, gym memberships, and SaaS apps. Calculate annualized drain and see what your recurring costs would grow to if invested in the S&P 500.',
      example: 'Example: "7 active subscriptions totaling $117/month"',
      action: 'Audit Subscriptions',
    },
    {
      id: 'timezone' as NavRoute,
      title: 'US Multi-Timezone Meeting Planner',
      badge: 'ET • CT • MT • PT',
      badgeColor: 'cyan',
      icon: Globe2,
      tagline: 'Align distributed US teams across 4 major time zones',
      description:
        'Interactive 24-hour slider showing real-time conversions across Eastern, Central, Mountain, and Pacific. Automatically highlights the Golden 9am-5pm Overlap window.',
      example: 'Example: "Schedule 2:00 PM ET meeting without early West Coast alarms"',
      action: 'Plan Meeting',
    },
    {
      id: 'freelance' as NavRoute,
      title: 'Freelance 1099 Tax & Billing Rate',
      badge: '15.3% SE Tax & 1040-ES',
      badgeColor: 'emerald',
      icon: Calculator,
      tagline: 'Avoid tax season surprise & calculate your target rate',
      description:
        'Calculate mandatory 15.3% self-employment tax, federal and state tax reserves, IRS quarterly deadlines, and the hourly billing rate required to net your target take-home salary.',
      example: 'Example: "$85,000 gross 1099 revenue with $12,000 write-offs"',
      action: 'Estimate 1099 Tax',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>Fast, private client-side calculators for the US</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-tight">
          The clean, no-nonsense daily calculator suite for real life.
        </h1>

        <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Built for US students, remote workers, and young adults making everyday decisions.
          No sign-ups, no spam, and calculations happen in milliseconds in your browser.
        </p>

        {/* Quick Nav Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
          <button
            onClick={() => onRouteChange('sleep-cycle')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            <BedDouble className="w-4 h-4" />
            <span>Sleep Cycle</span>
          </button>

          <button
            onClick={() => onRouteChange('tip-calculator')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            <Receipt className="w-4 h-4" />
            <span>Tip & Bill Split</span>
          </button>

          <button
            onClick={() => onRouteChange('salary-estimator')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            <Briefcase className="w-4 h-4" />
            <span>Salary & Paycheck</span>
          </button>

          <button
            onClick={() => onRouteChange('rent-affordability')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Rent Budget</span>
          </button>

          <button
            onClick={() => onRouteChange('student-loan')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Loans</span>
          </button>

          <button
            onClick={() => onRouteChange('subscription')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            <CreditCard className="w-4 h-4" />
            <span>Subscriptions</span>
          </button>

          <button
            onClick={() => onRouteChange('timezone')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            <Globe2 className="w-4 h-4" />
            <span>US Timezones</span>
          </button>

          <button
            onClick={() => onRouteChange('freelance')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            <Calculator className="w-4 h-4" />
            <span>1099 Freelance Tax</span>
          </button>
        </div>
      </section>

      {/* All Tools Grid */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              All 8 Instant Calculators
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Zero login required • Calculations run locally in your browser
            </p>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">Click any card to launch</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => {
                  onRouteChange(tool.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    {tool.tagline}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono italic">
                    {tool.example}
                  </span>
                  <div className="flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
                    <span>{tool.action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Honest Principles / Human Touch */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 mb-14">
        <div className="max-w-2xl mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Why people bookmark QuickLifeTools
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Most online utility sites have become unbearable bloated lead-gen funnels. We built this with four simple promises:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>Zero Tracking & Logging</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              We never save your salary, your rent, or your sleep hours to any server. Your inputs disappear the moment you close the tab.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Instant Client Math</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              All formulas run locally in your browser with zero latency. Adjust an input slider and see the result in the exact same frame.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <HeartHandshake className="w-4 h-4 text-purple-500" />
              <span>100% Free Forever</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              No subscription tiers, no "enter your email to see your result" dark patterns. Just honest utility.
            </p>
          </div>
        </div>
      </section>

      {/* Helpful FAQ */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          Frequently Asked Questions
        </h3>

        <div className="space-y-2.5 text-sm">
          <details className="group border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 open:bg-slate-50 dark:open:bg-slate-800/40">
            <summary className="font-semibold cursor-pointer list-none flex items-center justify-between text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
              <span>How accurate is the Hourly to Yearly Salary estimator?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
            </summary>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              It models official IRS standard deductions and federal income tax brackets, mandatory FICA payroll withholdings (6.2% Social Security + 1.45% Medicare), and estimated state income taxes across all 50 states. Note that city-specific municipal taxes (like NYC or Philadelphia wage taxes) and your personal health insurance or 401(k) election will cause minor variations.
            </p>
          </details>

          <details className="group border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 open:bg-slate-50 dark:open:bg-slate-800/40">
            <summary className="font-semibold cursor-pointer list-none flex items-center justify-between text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
              <span>Why should I calculate tips before sales tax?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
            </summary>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Traditional American etiquette guidelines (such as the Emily Post Institute) recommend tipping on the pre-tax food and beverage subtotal. Sales tax is a state and local government charge, not part of the service provided by the waitstaff. However, our calculator offers a one-tap toggle for post-tax tipping if your group prefers.
            </p>
          </details>

          <details className="group border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 open:bg-slate-50 dark:open:bg-slate-800/40">
            <summary className="font-semibold cursor-pointer list-none flex items-center justify-between text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
              <span>Can I save QuickLifeTools as an app on my phone?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
            </summary>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Yes! In Safari on iPhone, tap the Share icon and choose "Add to Home Screen". In Chrome on Android, tap the three dots and select "Add to Home screen". It will look and launch just like a native app.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
};
