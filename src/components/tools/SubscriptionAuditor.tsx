import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  Plus,
  Trash2,
  DollarSign,
  Briefcase,
  TrendingUp,
  AlertCircle,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  PieChart,
} from 'lucide-react';
import { AdSlot } from '../ads/AdSlot';

interface SubscriptionItem {
  id: string;
  name: string;
  category: 'Entertainment' | 'Software & Tech' | 'Fitness' | 'Delivery & Food' | 'Utilities';
  monthlyCost: number;
  active: boolean;
  essential: boolean;
}

const DEFAULT_SUBSCRIPTIONS: SubscriptionItem[] = [
  { id: '1', name: 'Netflix Standard (HD)', category: 'Entertainment', monthlyCost: 15.49, active: true, essential: false },
  { id: '2', name: 'Spotify Premium Individual', category: 'Entertainment', monthlyCost: 11.99, active: true, essential: false },
  { id: '3', name: 'Amazon Prime ($139/yr)', category: 'Entertainment', monthlyCost: 11.58, active: true, essential: false },
  { id: '4', name: 'Gym / Fitness Membership', category: 'Fitness', monthlyCost: 45.00, active: true, essential: true },
  { id: '5', name: 'iCloud / Google One Storage', category: 'Software & Tech', monthlyCost: 2.99, active: true, essential: true },
  { id: '6', name: 'ChatGPT Plus / AI Tools', category: 'Software & Tech', monthlyCost: 20.00, active: true, essential: false },
  { id: '7', name: 'DoorDash DashPass', category: 'Delivery & Food', monthlyCost: 9.99, active: true, essential: false },
];

export const SubscriptionAuditor: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(DEFAULT_SUBSCRIPTIONS);
  const [hourlyWage, setHourlyWage] = useState<number>(25); // typical US worker hourly wage

  // New item inputs
  const [newName, setNewName] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newCategory, setNewCategory] = useState<SubscriptionItem['category']>('Entertainment');

  const addSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || isNaN(Number(newCost)) || Number(newCost) <= 0) return;

    const newItem: SubscriptionItem = {
      id: Date.now().toString(),
      name: newName.trim(),
      category: newCategory,
      monthlyCost: parseFloat(Number(newCost).toFixed(2)),
      active: true,
      essential: false,
    };

    setSubscriptions([...subscriptions, newItem]);
    setNewName('');
    setNewCost('');
  };

  const toggleActive = (id: string) => {
    setSubscriptions(
      subscriptions.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const toggleEssential = (id: string) => {
    setSubscriptions(
      subscriptions.map((s) => (s.id === id ? { ...s, essential: !s.essential } : s))
    );
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter((s) => s.id !== id));
  };

  const resetDefaults = () => {
    setSubscriptions(DEFAULT_SUBSCRIPTIONS);
    setHourlyWage(25);
  };

  // Calculations
  const metrics = useMemo(() => {
    const activeSubs = subscriptions.filter((s) => s.active);
    const totalMonthly = activeSubs.reduce((acc, curr) => acc + curr.monthlyCost, 0);
    const totalAnnual = totalMonthly * 12;

    const nonEssentialMonthly = activeSubs
      .filter((s) => !s.essential)
      .reduce((acc, curr) => acc + curr.monthlyCost, 0);
    const nonEssentialAnnual = nonEssentialMonthly * 12;

    // Hours of labor needed (based on wage)
    const safeWage = Math.max(1, hourlyWage);
    const workHoursPerMonth = Number((totalMonthly / safeWage).toFixed(1));
    const workHoursPerYear = Number((totalAnnual / safeWage).toFixed(1));

    // 5-Year & 10-Year S&P 500 compounding (8% avg return)
    // FV of monthly annuity: PMT * [((1 + r/12)^n - 1) / (r/12)]
    const r = 0.08 / 12;
    const n5 = 5 * 12;
    const n10 = 10 * 12;
    const invest5Years = totalMonthly * ((Math.pow(1 + r, n5) - 1) / r);
    const invest10Years = totalMonthly * ((Math.pow(1 + r, n10) - 1) / r);

    return {
      activeCount: activeSubs.length,
      totalMonthly,
      totalAnnual,
      nonEssentialMonthly,
      nonEssentialAnnual,
      workHoursPerMonth,
      workHoursPerYear,
      invest5Years,
      invest10Years,
    };
  }, [subscriptions, hourlyWage]);

  const formatCurr = (n: number) => {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Recurring Expense & Lifestyle Creep Auditor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          US Subscription Auditor
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
          Expose the hidden annual cost of your streaming, apps, and memberships. See exactly how many hours of work it takes to pay for them each month.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Subscriptions List & Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Active Subscriptions ({metrics.activeCount})
            </h2>
            <button
              onClick={resetDefaults}
              className="text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Samples
            </button>
          </div>

          {/* Add New Subscription Form */}
          <form onSubmit={addSubscription} className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Add New Service
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-6">
                <input
                  type="text"
                  placeholder="e.g. Disney+, Apple Music"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="sm:col-span-3">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Cost/mo"
                    value={newCost}
                    onChange={(e) => setNewCost(e.target.value)}
                    className="w-full pl-6 pr-2 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>
            </div>
          </form>

          {/* Subscriptions List */}
          <div className="space-y-2">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  sub.active
                    ? 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-dashed border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={sub.active}
                    onChange={() => toggleActive(sub.id)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                    title="Toggle active status"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${sub.active ? 'text-slate-900 dark:text-white' : 'line-through text-slate-400 dark:text-slate-500'}`}>
                        {sub.name}
                      </span>
                      {sub.essential && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          Need
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block">
                      {sub.category} • ${(sub.monthlyCost * 12).toFixed(2)}/yr
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                      ${sub.monthlyCost.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">/month</span>
                  </div>
                  <button
                    onClick={() => toggleEssential(sub.id)}
                    className={`text-[10px] px-2 py-1 rounded border transition-colors ${
                      sub.essential
                        ? 'border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50'
                        : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600'
                    }`}
                    title="Mark as essential need vs nice-to-have"
                  >
                    {sub.essential ? 'Essential' : 'Discretionary'}
                  </button>
                  <button
                    onClick={() => deleteSubscription(sub.id)}
                    className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Hourly Wage Adjuster */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                Your Hourly Wage (To Calculate Labor Trade-Off)
              </label>
              <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                ${hourlyWage}/hr
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="flex-1 accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs text-slate-500 font-mono w-14 text-right">
                ${hourlyWage}.00
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Totals & Reality Check */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Subscription Cost Summary
            </h3>

            {/* Big Numbers */}
            <div className="space-y-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Monthly Drain
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-indigo-600 dark:text-indigo-400">
                  {formatCurr(metrics.totalMonthly)}
                  <span className="text-xs text-slate-400 font-normal">/mo</span>
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  True Annual Expense
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white">
                  {formatCurr(metrics.totalAnnual)}
                  <span className="text-xs text-slate-400 font-normal">/yr</span>
                </span>
              </div>
            </div>

            {/* Life Energy Trade-Off Callout */}
            <div className="my-5 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Labor Energy Cost
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                At your rate of <strong>${hourlyWage}/hr</strong>, you must work{' '}
                <strong className="text-amber-950 dark:text-amber-100 font-mono text-sm underline decoration-amber-500">
                  {metrics.workHoursPerMonth} hours every month
                </strong>{' '}
                (or <strong>{metrics.workHoursPerYear} hours/year</strong>) solely to fund these recurring subscriptions.
              </p>
            </div>

            {/* Opportunity Cost / Investing Alternative */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                If Invested in S&P 500 (8% Return)
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Value in 5 Years:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurr(metrics.invest5Years)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Value in 10 Years:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurr(metrics.invest10Years)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600 dark:text-slate-400">Non-Essential Spending:</span>
                <span className="font-mono font-semibold text-rose-500">
                  {formatCurr(metrics.nonEssentialAnnual)}/yr
                </span>
              </div>
            </div>

            {/* IN-TOOL AD SLOT */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <AdSlot slot="in-tool-content" />
            </div>
          </div>

          {/* Quick Saving Strategy */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-indigo-500" />
              The "Subscription Rotation" Rule
            </h4>
            <p>
              Instead of paying for Netflix, Max, Hulu, and Disney+ simultaneously ($65+/mo), subscribe to <strong>one streaming service at a time</strong>, binge what you want, cancel, and switch to the next service next month. This saves <strong>$500+ per year</strong> without sacrificing entertainment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
