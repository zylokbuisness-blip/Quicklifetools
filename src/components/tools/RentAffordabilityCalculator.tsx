import React, { useState } from 'react';
import {
  Home,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check,
  Building,
  Info,
  ChevronDown,
  PieChart,
  ShieldAlert,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { CITY_RENT_BENCHMARKS } from '../../data/usStatesData';
import { AdSlot } from '../ads/AdSlot';

export const RentAffordabilityCalculator: React.FC = () => {
  const [incomeType, setIncomeType] = useState<'annual' | 'monthly'>('annual');
  const [annualIncome, setAnnualIncome] = useState<string>('72000');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('6000');
  const [monthlyDebt, setMonthlyDebt] = useState<string>('350');
  const [estimatedUtilities, setEstimatedUtilities] = useState<string>('150');
  const [roommates, setRoommates] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const rawGrossMonthly =
    incomeType === 'annual'
      ? (parseFloat(annualIncome) || 0) / 12
      : parseFloat(monthlyIncome) || 0;

  // If sharing with roommates, each person's income or total combined household
  const grossMonthly = rawGrossMonthly;
  const grossAnnual = grossMonthly * 12;

  const debt = parseFloat(monthlyDebt) || 0;
  const utilities = parseFloat(estimatedUtilities) || 0;

  // 1. Standard US 30% HUD Rule
  const maxRent30Percent = grossMonthly * 0.30;
  const conservativeRent25Percent = grossMonthly * 0.25;
  const frugalRent20Percent = grossMonthly * 0.20;
  const stretchedRent35Percent = grossMonthly * 0.35;

  // 2. NYC / SF 40x Rule (Annual income >= 40 * monthly rent => Max Rent = Annual Income / 40)
  const maxRent40xRule = grossAnnual / 40;

  // 3. Debt-to-Income (DTI) 28/36 Rule Analysis
  const maxHousingFrontEnd28 = grossMonthly * 0.28 - utilities;
  const maxHousingBackEnd36 = grossMonthly * 0.36 - debt - utilities;
  const strictDTIRentLimit = Math.max(0, Math.min(maxHousingFrontEnd28, maxHousingBackEnd36));

  // Upfront move-in cash estimate (First month + Security deposit + Application fees)
  const upfrontMoveInCash = maxRent30Percent * 2 + 100;

  const handleCopySummary = () => {
    const text = `🏠 Rent Affordability Summary:
• Gross Income: $${grossMonthly.toFixed(0)}/mo ($${grossAnnual.toFixed(0)}/yr)
• Recommended Max Rent (30% Rule): $${maxRent30Percent.toFixed(0)}/mo
• Frugal / Safe Rent (20-25%): $${frugalRent20Percent.toFixed(0)} - $${conservativeRent25Percent.toFixed(0)}/mo
• Landlord 40x Rule Limit: $${maxRent40xRule.toFixed(0)}/mo
• Debt-Adjusted Cap: $${strictDTIRentLimit.toFixed(0)}/mo (with $${debt}/mo debt)
(Calculated with quicklifetools.com)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const incomePresets = [
    { label: '$45k Entry Level', val: '45000' },
    { label: '$65k Mid-Career', val: '65000' },
    { label: '$95k Professional', val: '95000' },
    { label: '$140k Dual Income', val: '140000' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-3">
          <Home className="w-3.5 h-3.5 text-amber-500" />
          <span>HUD 30% Guideline & NYC 40x Rule</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Rent Affordability Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Know your numbers before you tour apartments. Uses official HUD housing guidelines and big-city landlord approval rules so you don't waste application fees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          {/* Income Type Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setIncomeType('annual')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                incomeType === 'annual'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Annual Gross Income
            </button>
            <button
              onClick={() => setIncomeType('monthly')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                incomeType === 'monthly'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Monthly Gross Pay
            </button>
          </div>

          {/* Income Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {incomeType === 'annual' ? 'Total Annual Income' : 'Monthly Gross Income'}
              </label>
            </div>
            <div className="relative rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-lg">
                $
              </div>
              <input
                type="number"
                min="0"
                step="500"
                value={incomeType === 'annual' ? annualIncome : monthlyIncome}
                onChange={(e) => {
                  if (incomeType === 'annual') {
                    setAnnualIncome(e.target.value);
                  } else {
                    setMonthlyIncome(e.target.value);
                  }
                }}
                className="w-full pl-8 pr-16 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xl font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                {incomeType === 'annual' ? '/ yr' : '/ mo'}
              </div>
            </div>

            {/* Quick Income Presets */}
            {incomeType === 'annual' && (
              <div className="flex flex-wrap gap-1 mt-2">
                {incomePresets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setAnnualIncome(p.val)}
                    className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Monthly Debt Obligations */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Monthly Debt Payments
              </label>
              <span className="text-[11px] text-slate-400">Student loans, car, cards</span>
            </div>
            <div className="relative rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                $
              </div>
              <input
                type="number"
                min="0"
                step="50"
                value={monthlyDebt}
                onChange={(e) => setMonthlyDebt(e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-14 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                / mo
              </div>
            </div>
          </div>

          {/* Estimated Utilities */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Estimated Monthly Utilities
              </label>
              <span className="text-[11px] text-slate-400">Electric, gas, WiFi</span>
            </div>
            <div className="relative rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                $
              </div>
              <input
                type="number"
                min="0"
                step="25"
                value={estimatedUtilities}
                onChange={(e) => setEstimatedUtilities(e.target.value)}
                placeholder="150"
                className="w-full pl-8 pr-14 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                / mo
              </div>
            </div>
          </div>

          {/* Renter's Reality Callout: Upfront Cash */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-xs space-y-1">
            <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-amber-600" />
              <span>Upfront Move-In Cash Needed: ~${upfrontMoveInCash.toFixed(0)}</span>
            </span>
            <p className="text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
              Don't forget: US landlords almost always require First Month + Security Deposit (equivalent to 1 month's rent) plus application fees before handing over the keys.
            </p>
          </div>
        </div>

        {/* Right Output Column: Rent Tiers */}
        <div className="lg:col-span-6 space-y-5">
          {/* Main Recommended Rent Hero Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold tracking-widest text-slate-400">
                Recommended Rent (30% Rule)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 uppercase">
                HUD Standard
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-black font-mono tracking-tight text-white">
                ${maxRent30Percent.toFixed(0)}
              </span>
              <span className="text-slate-300 text-sm font-medium">/ month</span>
            </div>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Spending under 30% of your gross income keeps you financially safe and leaves room for savings, groceries, and travel.
            </p>

            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">NYC / SF Landlord 40x Rule:</span>
                <span className="font-bold font-mono text-base text-white">
                  ${maxRent40xRule.toFixed(0)}/mo
                </span>
              </div>
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all text-xs shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Rent Affordability Tiers */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Budget Comfort Tiers
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Conservative / Frugal (20 - 25%)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Plenty of breathing room for travel and 401(k) savings.
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    ${frugalRent20Percent.toFixed(0)} - ${conservativeRent25Percent.toFixed(0)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">/ mo</span>
                </div>
              </div>

              {debt > 0 && (
                <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-amber-900 dark:text-amber-200 block">
                      Debt-Adjusted Cap (28/36 DTI)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Takes into account your ${debt}/mo debt payments.
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-amber-900 dark:text-amber-200 font-mono">
                      ${strictDTIRentLimit.toFixed(0)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">/ mo</span>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Stretched / High Cost City (35%)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Common in high-rent metros, but leaves little buffer for emergencies.
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    ${stretchedRent35Percent.toFixed(0)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">/ mo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benchmark comparison */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-2 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-500" />
              <span>US Major City 1-Bed Median Rent Checks</span>
            </span>
            <div className="space-y-1">
              {CITY_RENT_BENCHMARKS.slice(0, 4).map((c) => {
                const canAfford = maxRent30Percent >= c.avgRent1Bed;
                return (
                  <div key={c.city} className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 last:border-none">
                    <span className="text-slate-600 dark:text-slate-300">{c.city}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500">${c.avgRent1Bed}/mo</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${canAfford ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700' : 'bg-rose-100 dark:bg-rose-950 text-rose-700'}`}>
                        {canAfford ? 'Affordable' : 'Stretched'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* IN-TOOL CONTENT AD SLOT */}
      <AdSlot slot="in-tool-content" />
    </div>
  );
};
