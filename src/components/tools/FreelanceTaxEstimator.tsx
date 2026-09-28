import React, { useState, useMemo } from 'react';
import {
  Calculator,
  DollarSign,
  Receipt,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  HelpCircle,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { usStatesData } from '../../data/usStatesData';
import { AdSlot } from '../ads/AdSlot';

export const FreelanceTaxEstimator: React.FC = () => {
  // Inputs
  const [grossRevenue, setGrossRevenue] = useState<number>(85000);
  const [businessExpenses, setBusinessExpenses] = useState<number>(12000); // write-offs
  const [selectedStateCode, setSelectedStateCode] = useState<string>('CA');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [desiredAnnualTakeHome, setDesiredAnnualTakeHome] = useState<number>(65000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25); // typical billable hours
  const [weeksWorkedPerYear, setWeeksWorkedPerYear] = useState<number>(48); // accounting for unpaid time off

  // Calculations
  const results = useMemo(() => {
    const revenue = Math.max(0, grossRevenue);
    const expenses = Math.max(0, businessExpenses);
    const netBusinessProfit = Math.max(0, revenue - expenses);

    // 1. Self-Employment Tax (Schedule SE)
    // 92.35% of net business profit is subject to SE tax
    const seTaxableIncome = netBusinessProfit * 0.9235;
    // 15.3% total (12.4% Social Security up to $168,600 cap + 2.9% Medicare)
    const ssCap = 168600;
    const ssTax = Math.min(seTaxableIncome, ssCap) * 0.124;
    const medicareTax = seTaxableIncome * 0.029;
    const totalSETax = ssTax + medicareTax;

    // 2. 50% SE Tax Deduction (Above the line)
    const seDeduction = totalSETax * 0.5;

    // 3. Federal Income Tax
    const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
    // Qualified Business Income (QBI) deduction (up to 20% of net profit minus SE deduction)
    const qbiDeduction = Math.max(0, (netBusinessProfit - seDeduction) * 0.2);

    const federalTaxable = Math.max(0, netBusinessProfit - seDeduction - standardDeduction - qbiDeduction);

    // 2024 progressive brackets estimation (simplified single brackets)
    let federalTax = 0;
    if (federalTaxable > 0) {
      if (federalTaxable <= 11600) {
        federalTax = federalTaxable * 0.10;
      } else if (federalTaxable <= 47150) {
        federalTax = 1160 + (federalTaxable - 11600) * 0.12;
      } else if (federalTaxable <= 100525) {
        federalTax = 5426 + (federalTaxable - 47150) * 0.22;
      } else if (federalTaxable <= 191950) {
        federalTax = 17168.50 + (federalTaxable - 100525) * 0.24;
      } else {
        federalTax = 39110.50 + (federalTaxable - 191950) * 0.32;
      }
    }

    // 4. State Income Tax
    const stateInfo = usStatesData.find((s) => s.code === selectedStateCode);
    const stateRate = (stateInfo?.avgIncomeTax || 0) / 100;
    const stateTax = netBusinessProfit * stateRate;

    // Total Tax Burden
    const totalTaxes = totalSETax + federalTax + stateTax;
    const netAnnualTakeHome = Math.max(0, netBusinessProfit - totalTaxes);
    const effectiveTaxRate = netBusinessProfit > 0 ? (totalTaxes / netBusinessProfit) * 100 : 0;
    const recommendedTaxSavePercentage = Math.ceil(effectiveTaxRate + 3); // 3% safety buffer

    // Quarterly Payment breakdown (Form 1040-ES)
    const quarterlyTaxes = totalTaxes / 4;

    // 5. Target 1099 Bill Rate Calculator
    // To net desiredAnnualTakeHome: target gross profit needed
    // Net = Profit * (1 - taxRate). So Profit = Net / (1 - taxRate) + expenses
    const estimatedEffectiveRateFrac = Math.min(0.40, (effectiveTaxRate || 28) / 100);
    const neededProfit = desiredAnnualTakeHome / (1 - estimatedEffectiveRateFrac);
    const neededGrossRevenue = neededProfit + expenses;
    const totalBillableHours = Math.max(1, billableHoursPerWeek * weeksWorkedPerYear);
    const recommendedHourlyRate = Math.ceil(neededGrossRevenue / totalBillableHours);

    return {
      netBusinessProfit,
      totalSETax,
      federalTax,
      stateTax,
      totalTaxes,
      netAnnualTakeHome,
      effectiveTaxRate,
      recommendedTaxSavePercentage,
      quarterlyTaxes,
      neededGrossRevenue,
      totalBillableHours,
      recommendedHourlyRate,
    };
  }, [grossRevenue, businessExpenses, selectedStateCode, filingStatus, desiredAnnualTakeHome, billableHoursPerWeek, weeksWorkedPerYear]);

  const formatCurr = (n: number) => {
    return '$' + Math.round(n).toLocaleString('en-US');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
          <Receipt className="w-3.5 h-3.5" />
          <span>Form 1040-ES & Schedule SE Estimator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          US Freelance 1099 Tax & Rate Estimator
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
          Avoid tax season shock. Calculate your 15.3% Self-Employment tax, estimated quarterly IRS payments, and the target hourly rate you need to charge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Freelance Business Inputs */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            1099 Income & Deductions
          </h2>

          {/* Gross Revenue */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Annual Gross 1099 Revenue
              </label>
              <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurr(grossRevenue)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={grossRevenue || ''}
                onChange={(e) => setGrossRevenue(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            {/* Quick revenue presets */}
            <div className="flex gap-2 mt-2">
              {[45000, 75000, 100000, 150000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setGrossRevenue(amt)}
                  className={`text-xs px-2 py-1 rounded-lg border transition-all ${
                    grossRevenue === amt
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  ${amt / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Business Expenses / Write-offs */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Annual Business Write-Offs / Expenses
              </label>
              <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                {formatCurr(businessExpenses)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="0"
                step="500"
                value={businessExpenses || ''}
                onChange={(e) => setBusinessExpenses(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-1">
              Software, laptop, phone, home office deduction, travel, gear
            </span>
          </div>

          {/* State Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                US State
              </label>
              <select
                value={selectedStateCode}
                onChange={(e) => setSelectedStateCode(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                {usStatesData.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name} ({s.avgIncomeTax > 0 ? `~${s.avgIncomeTax}% tax` : 'No income tax'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Filing Status
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setFilingStatus('single')}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    filingStatus === 'single'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Single
                </button>
                <button
                  type="button"
                  onClick={() => setFilingStatus('married')}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    filingStatus === 'married'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Married
                </button>
              </div>
            </div>
          </div>

          {/* Rate Calculator Section */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              Target Billing Rate Calculator
            </div>
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                Desired Annual Clean Take-Home:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-bold text-xs">$</span>
                <input
                  type="number"
                  step="5000"
                  value={desiredAnnualTakeHome}
                  onChange={(e) => setDesiredAnnualTakeHome(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-500 dark:text-slate-400 block mb-1">
                  Billable Hrs / Wk: <strong>{billableHoursPerWeek}h</strong>
                </label>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={billableHoursPerWeek}
                  onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-slate-500 dark:text-slate-400 block mb-1">
                  Weeks Worked / Yr: <strong>{weeksWorkedPerYear}w</strong>
                </label>
                <input
                  type="range"
                  min="40"
                  max="52"
                  value={weeksWorkedPerYear}
                  onChange={(e) => setWeeksWorkedPerYear(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tax Breakdown & Rate Recommendation */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Estimated 1099 Tax Obligations
            </h3>

            {/* Total Tax Header */}
            <div className="grid grid-cols-2 gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                  Net Business Profit
                </span>
                <span className="text-2xl font-mono font-black text-slate-900 dark:text-white">
                  {formatCurr(results.netBusinessProfit)}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Gross revenue minus expenses
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-rose-500 block">
                  Total Taxes Due
                </span>
                <span className="text-2xl font-mono font-black text-rose-600 dark:text-rose-400">
                  {formatCurr(results.totalTaxes)}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  ~{results.effectiveTaxRate.toFixed(1)}% effective rate
                </span>
              </div>
            </div>

            {/* Golden Rule Bank Account Buffer */}
            <div className="my-5 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-xs uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>The Freelancer Tax Rule of Thumb</span>
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                Automatically stash{' '}
                <strong className="text-emerald-950 dark:text-emerald-100 font-mono text-sm underline decoration-emerald-500">
                  {results.recommendedTaxSavePercentage}% of every incoming invoice
                </strong>{' '}
                into a separate high-yield business savings account. You will never owe a penalty or be caught short on tax day.
              </p>
            </div>

            {/* Itemized Taxes */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  Self-Employment (FICA) Tax (15.3%):
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurr(results.totalSETax)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  Federal Income Tax (post-QBI):
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurr(results.federalTax)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  {selectedStateCode} State Income Tax:
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurr(results.stateTax)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400 font-semibold">
                  Net Annual Take-Home (In Your Pocket):
                </span>
                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatCurr(results.netAnnualTakeHome)}
                </span>
              </div>
              <div className="flex justify-between py-1 pt-2">
                <span className="text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  Quarterly Payment (Form 1040-ES):
                </span>
                <span className="font-mono font-black text-blue-600 dark:text-blue-400 text-sm">
                  {formatCurr(results.quarterlyTaxes)} / qtr
                </span>
              </div>
            </div>

            {/* Target Hourly Rate Highlight */}
            <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Recommended Minimum 1099 Hourly Rate
              </span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-white">
                ${results.recommendedHourlyRate}
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/hr</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
                Based on {results.totalBillableHours} billable hours/yr to net {formatCurr(desiredAnnualTakeHome)} take-home.
              </span>
            </div>

            {/* IN-TOOL AD SLOT */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <AdSlot slot="in-tool-content" />
            </div>
          </div>

          {/* IRS Deadlines Notice */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-500" />
              IRS Quarterly 1040-ES Estimated Tax Deadlines
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-slate-400 block text-[10px]">Q1</span>
                <strong>April 15</strong>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-slate-400 block text-[10px]">Q2</span>
                <strong>June 15</strong>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-slate-400 block text-[10px]">Q3</span>
                <strong>Sept 15</strong>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-slate-400 block text-[10px]">Q4</span>
                <strong>Jan 15</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
