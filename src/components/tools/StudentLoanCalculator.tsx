import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  DollarSign,
  TrendingDown,
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
  Clock,
  PiggyBank,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { AdSlot } from '../ads/AdSlot';

export const StudentLoanCalculator: React.FC = () => {
  // Inputs
  const [loanBalance, setLoanBalance] = useState<number>(37000); // US average graduate debt
  const [interestRate, setInterestRate] = useState<number>(6.5); // % annual interest
  const [loanTermYears, setLoanTermYears] = useState<number>(10); // standard federal 10-year term
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(100);

  // Quick Balance presets
  const balancePresets = [
    { label: '$15,000', value: 15000, desc: 'Associate / Community' },
    { label: '$37,000', value: 37000, desc: 'US Undergrad Avg' },
    { label: '$65,000', value: 65000, desc: 'Master\'s Degree' },
    { label: '$120,000', value: 120000, desc: 'Law / Medical' },
  ];

  // Quick Interest Rate presets based on current US Federal rates
  const interestPresets = [
    { label: '5.50%', value: 5.5, desc: 'Federal Direct Undergrad' },
    { label: '7.05%', value: 7.05, desc: 'Federal Direct Grad' },
    { label: '8.05%', value: 8.05, desc: 'Direct PLUS Loans' },
    { label: '9.25%', value: 9.25, desc: 'Average Private Loan' },
  ];

  // Calculations
  const results = useMemo(() => {
    const P = Math.max(0, loanBalance);
    const annualRate = Math.max(0, interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = Math.max(1, loanTermYears * 12);

    if (P === 0) {
      return {
        standardMonthly: 0,
        totalStandardInterest: 0,
        totalStandardCost: 0,
        acceleratedMonthly: 0,
        acceleratedMonths: 0,
        totalAcceleratedInterest: 0,
        totalAcceleratedCost: 0,
        interestSaved: 0,
        monthsSaved: 0,
        yearsSaved: 0,
        standardPayoffDate: new Date(),
        acceleratedPayoffDate: new Date(),
      };
    }

    // Standard monthly payment: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let standardMonthly = 0;
    if (monthlyRate === 0) {
      standardMonthly = P / totalMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      standardMonthly = (P * monthlyRate * factor) / (factor - 1);
    }

    const totalStandardCost = standardMonthly * totalMonths;
    const totalStandardInterest = Math.max(0, totalStandardCost - P);

    // Accelerated Payoff Simulation (Month by Month)
    const extra = Math.max(0, extraMonthlyPayment);
    const acceleratedMonthly = standardMonthly + extra;

    let balance = P;
    let accMonths = 0;
    let totalAccInterest = 0;
    const maxMonthsSafety = 1200; // 100 years max loop guard

    while (balance > 0.01 && accMonths < maxMonthsSafety) {
      accMonths++;
      const interestForMonth = balance * monthlyRate;
      totalAccInterest += interestForMonth;

      let payment = acceleratedMonthly;
      if (balance + interestForMonth < payment) {
        payment = balance + interestForMonth;
        balance = 0;
      } else {
        const principalPaid = payment - interestForMonth;
        balance -= principalPaid;
      }
    }

    const totalAcceleratedCost = P + totalAccInterest;
    const interestSaved = Math.max(0, totalStandardInterest - totalAccInterest);
    const monthsSaved = Math.max(0, totalMonths - accMonths);
    const yearsSaved = Number((monthsSaved / 12).toFixed(1));

    // Payoff dates
    const now = new Date();
    const standardPayoffDate = new Date(now.getFullYear(), now.getMonth() + totalMonths, 1);
    const acceleratedPayoffDate = new Date(now.getFullYear(), now.getMonth() + accMonths, 1);

    return {
      standardMonthly,
      totalStandardInterest,
      totalStandardCost,
      acceleratedMonthly: extra > 0 ? acceleratedMonthly : standardMonthly,
      acceleratedMonths: accMonths,
      totalAcceleratedInterest: extra > 0 ? totalAccInterest : totalStandardInterest,
      totalAcceleratedCost: extra > 0 ? totalAcceleratedCost : totalStandardCost,
      interestSaved: extra > 0 ? interestSaved : 0,
      monthsSaved: extra > 0 ? monthsSaved : 0,
      yearsSaved: extra > 0 ? yearsSaved : 0,
      standardPayoffDate,
      acceleratedPayoffDate: extra > 0 ? acceleratedPayoffDate : standardPayoffDate,
    };
  }, [loanBalance, interestRate, loanTermYears, extraMonthlyPayment]);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatCurr = (n: number) => {
    return '$' + Math.round(n).toLocaleString('en-US');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>US Federal & Private Student Debt</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          US Student Loan Payoff Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
          See your standard monthly payment, estimate total interest, and test how an extra $50 or $100/mo slashes years off your debt freedom date.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Calculator Inputs */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Loan Details
            </h2>
            <button
              onClick={() => {
                setLoanBalance(37000);
                setInterestRate(6.5);
                setLoanTermYears(10);
                setExtraMonthlyPayment(100);
              }}
              className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Loan Balance Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Total Loan Balance
              </label>
              <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                {formatCurr(loanBalance)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">
                $
              </span>
              <input
                type="number"
                min="0"
                max="500000"
                step="500"
                value={loanBalance || ''}
                onChange={(e) => setLoanBalance(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
            {/* Balance quick tags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-2">
              {balancePresets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setLoanBalance(p.value)}
                  className={`px-2 py-1 text-xs rounded-lg border text-left transition-all ${
                    loanBalance === p.value
                      ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  <div className="font-semibold">{p.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Annual Interest Rate (APR)
              </label>
              <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                {interestRate}%
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="25"
                step="0.05"
                value={interestRate || ''}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                className="w-full pr-8 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 font-bold">
                %
              </span>
            </div>
            {/* Interest presets */}
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {interestPresets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setInterestRate(p.value)}
                  className={`px-2.5 py-1 text-xs rounded-lg border text-left transition-all ${
                    interestRate === p.value
                      ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  <span className="font-semibold">{p.label}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Repayment Term */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Repayment Term
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((years) => (
                <button
                  key={years}
                  onClick={() => setLoanTermYears(years)}
                  className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl border transition-all ${
                    loanTermYears === years
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                  }`}
                >
                  {years} Years
                  {years === 10 && <span className="block text-[10px] font-normal opacity-80">Standard</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Monthly Payment Slider */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                <PiggyBank className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Extra Monthly Payment
              </span>
              <span className="text-sm font-mono font-black text-emerald-600 dark:text-emerald-400">
                +{formatCurr(extraMonthlyPayment)}/mo
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="25"
              value={extraMonthlyPayment}
              onChange={(e) => setExtraMonthlyPayment(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              <span>$0 (Standard)</span>
              <span>+$250</span>
              <span>+$500</span>
              <span>+$1,000</span>
            </div>
            <div className="flex gap-2 mt-3">
              {[0, 50, 100, 200, 300].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setExtraMonthlyPayment(amt)}
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-all ${
                    extraMonthlyPayment === amt
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                  }`}
                >
                  {amt === 0 ? 'None' : `+$${amt}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Output & Insights */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Result Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Repayment Comparison
            </h3>

            {/* Monthly Payment Hero */}
            <div className="grid grid-cols-2 gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                  Standard Payment
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white">
                  {formatCurr(results.standardMonthly)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                  per month for {loanTermYears} yrs
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block flex items-center gap-1">
                  Accelerated Plan
                  {extraMonthlyPayment > 0 && <Sparkles className="w-3 h-3 text-emerald-500" />}
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                  {formatCurr(results.acceleratedMonthly)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                  per month total
                </span>
              </div>
            </div>

            {/* Savings Callout if Extra Payment is Active */}
            {extraMonthlyPayment > 0 ? (
              <div className="my-5 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>The Power of Extra Payments</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center sm:text-left">
                  <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                      Total Interest Saved
                    </span>
                    <span className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                      {formatCurr(results.interestSaved)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                      Time Shaved Off
                    </span>
                    <span className="text-xl font-mono font-black text-blue-600 dark:text-blue-400">
                      {results.yearsSaved} Years
                    </span>
                  </div>
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-300/90 mt-2.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    You will be completely debt-free by <strong>{formatDate(results.acceleratedPayoffDate)}</strong> instead of {formatDate(results.standardPayoffDate)}!
                  </span>
                </div>
              </div>
            ) : (
              <div className="my-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  Tip: Adding just <strong>$50 to $100/mo</strong> extra towards principal can save thousands in interest and eliminate years of payments.
                </span>
              </div>
            )}

            {/* Financial Totals Breakdown */}
            <div className="space-y-3 pt-2 text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Starting Loan Principal:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                  {formatCurr(loanBalance)}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Standard Total Interest:</span>
                <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">
                  {formatCurr(results.totalStandardInterest)}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">
                  {extraMonthlyPayment > 0 ? 'Accelerated Total Interest:' : 'Total Lifetime Cost:'}
                </span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                  {formatCurr(results.totalAcceleratedCost)}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-600 dark:text-slate-400">Debt-Free Payoff Date:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {formatDate(results.acceleratedPayoffDate)}
                </span>
              </div>
            </div>

            {/* IN-TOOL AD SLOT */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <AdSlot slot="in-tool-content" />
            </div>
          </div>

          {/* Real US Student Debt Tips */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-500" />
              US Student Loan Repayment Knowledge
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>IRS Tax Deduction:</strong> You can deduct up to <strong>$2,500/year</strong> of student loan interest paid on your federal tax return (Form 1040, Schedule 1), even if you take the standard deduction.
              </p>
              <p>
                <strong>Autopay 0.25% Discount:</strong> Most federal loan servicers (Nelnet, MOHELA, Aidvantage) give a 0.25% interest rate discount just for setting up recurring ACH autopay.
              </p>
              <p>
                <strong>Target Principal:</strong> When paying extra, ensure your loan servicer applies the extra funds to <em>principal</em> rather than advancing your next due date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
