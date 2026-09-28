import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  PiggyBank,
  Check,
  Copy,
  Info,
  ChevronDown,
  ArrowRightLeft,
  Percent,
  Sparkles,
} from 'lucide-react';
import { US_STATES } from '../../data/usStatesData';
import { AdSlot } from '../ads/AdSlot';

export const SalaryEstimator: React.FC = () => {
  const [calcMode, setCalcMode] = useState<'hourly' | 'salary'>('hourly');
  const [hourlyRate, setHourlyRate] = useState<string>('28.50');
  const [annualSalary, setAnnualSalary] = useState<string>('65000');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [selectedStateCode, setSelectedStateCode] = useState<string>('TX');
  const [retirementPercent, setRetirementPercent] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);

  let grossAnnual = 0;
  if (calcMode === 'hourly') {
    const baseRate = parseFloat(hourlyRate) || 0;
    const baseWeekly = baseRate * hoursPerWeek;
    const overtimeWeekly = baseRate * 1.5 * overtimeHours;
    grossAnnual = (baseWeekly + overtimeWeekly) * weeksPerYear;
  } else {
    grossAnnual = parseFloat(annualSalary) || 0;
  }

  const totalAnnualHours = (hoursPerWeek + overtimeHours) * weeksPerYear || 2080;
  const grossHourly = totalAnnualHours > 0 ? grossAnnual / totalAnnualHours : 0;
  const grossDaily = grossHourly * 8;
  const grossWeekly = grossAnnual / 52;
  const grossBiWeekly = grossAnnual / 26;
  const grossSemiMonthly = grossAnnual / 24;
  const grossMonthly = grossAnnual / 12;

  const retirementAnnual = grossAnnual * (retirementPercent / 100);
  const taxableFederalWage = Math.max(0, grossAnnual - retirementAnnual);

  const standardDeduction = filingStatus === 'married' ? 30000 : 15000;
  const taxableFederalIncome = Math.max(0, taxableFederalWage - standardDeduction);

  let federalTaxAnnual = 0;
  if (taxableFederalIncome > 0) {
    if (filingStatus === 'single') {
      if (taxableFederalIncome <= 11925) {
        federalTaxAnnual = taxableFederalIncome * 0.10;
      } else if (taxableFederalIncome <= 48475) {
        federalTaxAnnual = 1192.50 + (taxableFederalIncome - 11925) * 0.12;
      } else if (taxableFederalIncome <= 103350) {
        federalTaxAnnual = 5578.50 + (taxableFederalIncome - 48475) * 0.22;
      } else if (taxableFederalIncome <= 197300) {
        federalTaxAnnual = 17651 + (taxableFederalIncome - 103350) * 0.24;
      } else {
        federalTaxAnnual = 40199 + (taxableFederalIncome - 197300) * 0.32;
      }
    } else {
      if (taxableFederalIncome <= 23850) {
        federalTaxAnnual = taxableFederalIncome * 0.10;
      } else if (taxableFederalIncome <= 96950) {
        federalTaxAnnual = 2385 + (taxableFederalIncome - 23850) * 0.12;
      } else if (taxableFederalIncome <= 206700) {
        federalTaxAnnual = 11157 + (taxableFederalIncome - 96950) * 0.22;
      } else {
        federalTaxAnnual = 35302 + (taxableFederalIncome - 206700) * 0.24;
      }
    }
  }

  const socialSecurityTaxable = Math.min(grossAnnual, 176100);
  const socialSecurityAnnual = socialSecurityTaxable * 0.062;
  const medicareAnnual = grossAnnual * 0.0145;
  const ficaAnnual = socialSecurityAnnual + medicareAnnual;

  const stateInfo = US_STATES.find((s) => s.code === selectedStateCode) || US_STATES[43];
  const stateTaxAnnual = grossAnnual * (stateInfo.avgIncomeTax / 100);

  const totalDeductions = federalTaxAnnual + ficaAnnual + stateTaxAnnual + retirementAnnual;
  const netAnnual = Math.max(0, grossAnnual - totalDeductions);
  const netMonthly = netAnnual / 12;
  const netBiWeekly = netAnnual / 26;
  const netWeekly = netAnnual / 52;
  const netHourly = totalAnnualHours > 0 ? netAnnual / totalAnnualHours : 0;

  const takeHomePercent = grossAnnual > 0 ? ((netAnnual / grossAnnual) * 100).toFixed(1) : '0';

  const handleCopyBreakdown = () => {
    const text = `💼 Salary & Paycheck Breakdown:
• Gross Annual Salary: $${grossAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
• Hourly Rate: $${grossHourly.toFixed(2)}/hr (${hoursPerWeek} hrs/wk)
--- ESTIMATED DEDUCTIONS ---
• Federal Income Tax: -$${federalTaxAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
• FICA (Social Security & Medicare): -$${ficaAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
• State Income Tax (${stateInfo.name}): -$${stateTaxAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
• 401(k) Retirement (${retirementPercent}%): -$${retirementAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
--- ESTIMATED TAKE-HOME PAY ---
• Net Monthly: $${netMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
• Net Bi-Weekly (Every 2 wks): $${netBiWeekly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
• Net Annual: $${netAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
(Calculated via quicklifetools.com)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wagePresets = [
    { label: '$17/hr (Retail/Entry)', hr: '17.00', yr: '35360' },
    { label: '$25/hr (Admin/Junior)', hr: '25.00', yr: '52000' },
    { label: '$38/hr (Mid-level)', hr: '38.00', yr: '79040' },
    { label: '$60/hr (Senior/Tech)', hr: '60.00', yr: '124800' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-3">
          <Briefcase className="w-3.5 h-3.5 text-blue-500" />
          <span>Real Paycheck Breakdown</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Hourly to Yearly Salary Estimator
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          See what an hourly wage or annual salary actually looks like in your bank account after Federal taxes, FICA (Social Security & Medicare), and your state's tax rate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          {/* Mode Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setCalcMode('hourly')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                calcMode === 'hourly'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Hourly Rate ($/hr)
            </button>
            <button
              onClick={() => setCalcMode('salary')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                calcMode === 'salary'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Annual Salary ($/yr)
            </button>
          </div>

          {/* Wage / Salary Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {calcMode === 'hourly' ? 'Hourly Wage' : 'Annual Gross Salary'}
              </label>
            </div>
            <div className="relative rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-lg">
                $
              </div>
              <input
                type="number"
                min="0"
                step={calcMode === 'hourly' ? '0.25' : '1000'}
                value={calcMode === 'hourly' ? hourlyRate : annualSalary}
                onChange={(e) => {
                  if (calcMode === 'hourly') {
                    setHourlyRate(e.target.value);
                  } else {
                    setAnnualSalary(e.target.value);
                  }
                }}
                className="w-full pl-8 pr-16 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xl font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs font-medium">
                {calcMode === 'hourly' ? '/ hr' : '/ yr'}
              </div>
            </div>

            {/* Quick Benchmark presets */}
            <div className="flex flex-wrap gap-1 mt-2">
              {wagePresets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    if (calcMode === 'hourly') {
                      setHourlyRate(p.hr);
                    } else {
                      setAnnualSalary(p.yr);
                    }
                  }}
                  className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hours per week & Weeks per year */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Hours / Week
              </label>
              <input
                type="number"
                min="1"
                max="80"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value, 10) || 40)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white font-mono"
              />
              <span className="text-[10px] text-slate-400">Standard: 40 hrs</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Weeks / Year
              </label>
              <input
                type="number"
                min="1"
                max="52"
                value={weeksPerYear}
                onChange={(e) => setWeeksPerYear(parseInt(e.target.value, 10) || 52)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white font-mono"
              />
              <span className="text-[10px] text-slate-400">52 wks (with paid PTO)</span>
            </div>
          </div>

          {/* Overtime (only if hourly) */}
          {calcMode === 'hourly' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Overtime Hours / Week (1.5x Pay)
                </label>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                  {overtimeHours} hrs
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          )}

          {/* Tax Parameters: State & Filing Status */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
              Taxes & Withholdings
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  US State (Income Tax)
                </label>
                <div className="relative">
                  <select
                    value={selectedStateCode}
                    onChange={(e) => setSelectedStateCode(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 pr-7 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    {US_STATES.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name} {s.avgIncomeTax === 0 ? '(0% Tax)' : `(~${s.avgIncomeTax}%)`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2 pointer-events-none text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  IRS Filing Status
                </label>
                <select
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="single">Single Filer</option>
                  <option value="married">Married (Joint)</option>
                </select>
              </div>
            </div>

            {/* 401(k) Retirement */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                  <PiggyBank className="w-3.5 h-3.5 text-blue-500" />
                  Pre-Tax 401(k):
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{retirementPercent}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[0, 3, 5, 8, 10].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setRetirementPercent(pct)}
                    className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                      retirementPercent === pct
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Column: Paycheck Breakdown */}
        <div className="lg:col-span-6 space-y-5">
          {/* Main Net Pay Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <span className="text-[11px] uppercase font-bold tracking-widest text-slate-400 block">
              Estimated Net Take-Home
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-black font-mono tracking-tight text-white">
                ${netMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </span>
              <span className="text-slate-300 text-sm font-medium">/ month</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block">Bi-Weekly Paycheck:</span>
                <span className="font-bold font-mono text-base text-white">
                  ${netBiWeekly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[10px] text-slate-400 block">Every 2 weeks</span>
              </div>
              <div>
                <span className="text-slate-400 block">Net Annual Total:</span>
                <span className="font-bold font-mono text-base text-white">
                  ${netAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[10px] text-slate-400 block">After all taxes</span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="mt-4 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="text-emerald-400">Keep: {takeHomePercent}%</span>
                <span className="text-amber-400">Taxes & 401k: {(100 - parseFloat(takeHomePercent)).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${takeHomePercent}%` }}
                  className="bg-emerald-400 h-full"
                ></div>
                <div
                  style={{ width: `${100 - parseFloat(takeHomePercent)}%` }}
                  className="bg-amber-400 h-full"
                ></div>
              </div>
            </div>
          </div>

          {/* Detailed Pay Frequency Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Gross vs Net Pay Summary
              </h4>
              <button
                onClick={handleCopyBreakdown}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Breakdown'}</span>
              </button>
            </div>

            <div className="overflow-x-auto text-xs font-mono">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                    <th className="pb-1.5 font-medium">Frequency</th>
                    <th className="pb-1.5 font-medium text-right">Gross</th>
                    <th className="pb-1.5 font-medium text-right">Deductions</th>
                    <th className="pb-1.5 font-medium text-right text-emerald-600 dark:text-emerald-400">
                      Net Take-Home
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-1.5 font-sans font-medium">Hourly</td>
                    <td className="py-1.5 text-right">${grossHourly.toFixed(2)}</td>
                    <td className="py-1.5 text-right text-rose-500">
                      -${(totalDeductions / totalAnnualHours).toFixed(2)}
                    </td>
                    <td className="py-1.5 text-right font-bold text-slate-900 dark:text-white">
                      ${netHourly.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-sans font-medium">Weekly (52x)</td>
                    <td className="py-1.5 text-right">${grossWeekly.toFixed(0)}</td>
                    <td className="py-1.5 text-right text-rose-500">
                      -${(totalDeductions / 52).toFixed(0)}
                    </td>
                    <td className="py-1.5 text-right font-bold text-slate-900 dark:text-white">
                      ${netWeekly.toFixed(0)}
                    </td>
                  </tr>
                  <tr className="bg-blue-50/40 dark:bg-blue-950/20">
                    <td className="py-1.5 font-sans font-bold text-blue-700 dark:text-blue-300">
                      Bi-Weekly (26x)
                    </td>
                    <td className="py-1.5 text-right">${grossBiWeekly.toFixed(0)}</td>
                    <td className="py-1.5 text-right text-rose-500">
                      -${(totalDeductions / 26).toFixed(0)}
                    </td>
                    <td className="py-1.5 text-right font-bold text-blue-700 dark:text-blue-300">
                      ${netBiWeekly.toFixed(0)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-sans font-medium">Monthly (12x)</td>
                    <td className="py-1.5 text-right">${grossMonthly.toFixed(0)}</td>
                    <td className="py-1.5 text-right text-rose-500">
                      -${(totalDeductions / 12).toFixed(0)}
                    </td>
                    <td className="py-1.5 text-right font-bold text-slate-900 dark:text-white">
                      ${netMonthly.toFixed(0)}
                    </td>
                  </tr>
                  <tr className="font-bold border-t border-slate-200 dark:border-slate-800">
                    <td className="py-1.5 font-sans">Annual</td>
                    <td className="py-1.5 text-right">${grossAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    <td className="py-1.5 text-right text-rose-500">
                      -${totalDeductions.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-1.5 text-right text-emerald-600 dark:text-emerald-400">
                      ${netAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note on Bi-weekly 3rd paycheck */}
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              💡 <strong>Bi-weekly tip:</strong> Since there are 52 weeks in a calendar year, bi-weekly schedules pay 26 times. In two months of every year, you'll receive 3 paychecks instead of 2.
            </div>
          </div>
        </div>
      </div>

      {/* IN-TOOL CONTENT AD SLOT */}
      <AdSlot slot="in-tool-content" />
    </div>
  );
};
