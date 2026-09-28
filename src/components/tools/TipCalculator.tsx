import React, { useState } from 'react';
import {
  Receipt,
  Users,
  Percent,
  Check,
  Copy,
  ChevronDown,
  Info,
  DollarSign,
  Share2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { US_STATES } from '../../data/usStatesData';
import { AdSlot } from '../ads/AdSlot';

export const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>('84.50');
  const [selectedStateCode, setSelectedStateCode] = useState<string>('CA');
  const [useCustomTax, setUseCustomTax] = useState<boolean>(false);
  const [customTaxRate, setCustomTaxRate] = useState<string>('8.25');
  const [tipPercentage, setTipPercentage] = useState<number>(20);
  const [customTip, setCustomTip] = useState<string>('');
  const [tipBasis, setTipBasis] = useState<'pre-tax' | 'post-tax'>('pre-tax');
  const [splitCount, setSplitCount] = useState<number>(3);
  const [roundOption, setRoundOption] = useState<'none' | 'round-person-dollar' | 'round-tip-dollar'>('none');
  const [copied, setCopied] = useState<boolean>(false);

  const currentState = US_STATES.find((s) => s.code === selectedStateCode) || US_STATES[4];
  const effectiveTaxRate = useCustomTax
    ? parseFloat(customTaxRate) || 0
    : currentState.salesTax;

  const rawBill = parseFloat(billAmount) || 0;
  const taxAmount = rawBill * (effectiveTaxRate / 100);

  const activeTipPercent = customTip !== '' ? parseFloat(customTip) || 0 : tipPercentage;
  const tipBaseAmount = tipBasis === 'pre-tax' ? rawBill : rawBill + taxAmount;
  let tipTotal = tipBaseAmount * (activeTipPercent / 100);

  if (roundOption === 'round-tip-dollar') {
    tipTotal = Math.ceil(tipTotal);
  }

  let grandTotal = rawBill + taxAmount + tipTotal;

  const validSplit = Math.max(1, splitCount);
  let perPersonTotal = grandTotal / validSplit;
  let perPersonTip = tipTotal / validSplit;

  if (roundOption === 'round-person-dollar') {
    const roundedPersonTotal = Math.ceil(perPersonTotal);
    grandTotal = roundedPersonTotal * validSplit;
    perPersonTotal = roundedPersonTotal;
    tipTotal = grandTotal - (rawBill + taxAmount);
    perPersonTip = tipTotal / validSplit;
  }

  const handleCopyBreakdown = () => {
    const text = `🧾 Dinner Split (${validSplit} people):
• Subtotal: $${rawBill.toFixed(2)}
• Tax (${effectiveTaxRate.toFixed(2)}%): $${taxAmount.toFixed(2)}
• Tip (${activeTipPercent}%): $${tipTotal.toFixed(2)}
• Total Check: $${grandTotal.toFixed(2)}
👉 Each person sends: $${perPersonTotal.toFixed(2)}
(Calculated with quicklifetools.com)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickPresets = [
    { label: '$24 Lunch', val: '24.00' },
    { label: '$65 Dinner', val: '65.00' },
    { label: '$110 Brunch', val: '110.00' },
    { label: '$185 Group Night', val: '185.00' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-3">
          <Receipt className="w-3.5 h-3.5 text-emerald-500" />
          <span>Real-World Dining Math</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Restaurant Tip & Split Bill Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          No awkward math when the check arrives. Calculates state sales tax, gives pre-tax tipping etiquette, and formats a clean text you can paste into group chats or Venmo requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          {/* Bill Subtotal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Bill Subtotal (Before Tax)
              </label>
              <div className="flex items-center gap-1">
                {quickPresets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setBillAmount(p.val)}
                    className="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-lg">
                $
              </div>
              <input
                type="number"
                min="0"
                step="0.01"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xl font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          {/* US State Sales Tax Selection */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                State Sales Tax
              </span>
              <button
                onClick={() => setUseCustomTax(!useCustomTax)}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                {useCustomTax ? 'Use State Rate' : 'Custom Local %'}
              </button>
            </div>

            {!useCustomTax ? (
              <div className="relative">
                <select
                  value={selectedStateCode}
                  onChange={(e) => setSelectedStateCode(e.target.value)}
                  className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 pr-8 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  {US_STATES.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name} ({s.salesTax.toFixed(2)}%{s.salesTax === 0 ? ' - No Tax' : ''})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-2.5 pointer-events-none text-slate-400" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={customTaxRate}
                  onChange={(e) => setCustomTaxRate(e.target.value)}
                  placeholder="8.25"
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white font-mono"
                />
                <span className="text-xs font-bold text-slate-500">%</span>
              </div>
            )}
            <p className="text-[11px] text-slate-400">
              Tax amount: <strong className="text-slate-700 dark:text-slate-300 font-mono">${taxAmount.toFixed(2)}</strong> ({effectiveTaxRate.toFixed(2)}%).
            </p>
          </div>

          {/* Tip Percentage Buttons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Tip Percentage
              </label>
              {/* Pre-tax vs Post-tax toggle */}
              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-slate-400">Calculate on:</span>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md">
                  <button
                    onClick={() => setTipBasis('pre-tax')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tipBasis === 'pre-tax'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Pre-Tax (Etiquette)
                  </button>
                  <button
                    onClick={() => setTipBasis('post-tax')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tipBasis === 'post-tax'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Post-Tax
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-2">
              {[15, 18, 20, 22, 25].map((pct) => (
                <button
                  key={pct}
                  onClick={() => {
                    setTipPercentage(pct);
                    setCustomTip('');
                  }}
                  className={`py-2 rounded-xl font-bold text-sm transition-all ${
                    customTip === '' && tipPercentage === pct
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>

            {/* Custom Tip Input */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Or custom tip:</span>
              <div className="relative w-24">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  placeholder="e.g. 17"
                  className="w-full px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white font-mono"
                />
                <span className="absolute right-2 top-1 text-xs font-bold text-slate-400">%</span>
              </div>
            </div>
          </div>

          {/* Number of People to Split */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Split Check
              </label>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {validSplit} {validSplit === 1 ? 'person (Solo)' : 'people'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-base text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                disabled={splitCount <= 1}
              >
                -
              </button>
              <input
                type="range"
                min="1"
                max="20"
                value={splitCount}
                onChange={(e) => setSplitCount(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <button
                onClick={() => setSplitCount(splitCount + 1)}
                className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-base text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Rounding Options */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Round Up for Cash / Venmo
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setRoundOption('none')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                  roundOption === 'none'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Exact Cents
              </button>
              <button
                onClick={() => setRoundOption('round-tip-dollar')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                  roundOption === 'round-tip-dollar'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Round Tip $
              </button>
              <button
                onClick={() => setRoundOption('round-person-dollar')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                  roundOption === 'round-person-dollar'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Round / Person $
              </button>
            </div>
          </div>
        </div>

        {/* Right Summary / Receipt Column */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="border-b border-white/10 pb-4 mb-4">
              <span className="text-[11px] uppercase font-bold tracking-widest text-slate-400">
                {validSplit > 1 ? `Each Person Sends (${validSplit} Ways)` : 'Total Due'}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-extrabold font-mono tracking-tight text-white">
                  ${perPersonTotal.toFixed(2)}
                </span>
              </div>
              {validSplit > 1 && (
                <div className="text-xs text-slate-300 mt-1">
                  includes ${perPersonTip.toFixed(2)} tip per person
                </div>
              )}
            </div>

            {/* Breakdown table */}
            <div className="space-y-2 text-xs text-slate-300 border-b border-white/10 pb-4 mb-4 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal:</span>
                <span className="font-semibold text-white">${rawBill.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Sales Tax ({effectiveTaxRate.toFixed(2)}%):
                </span>
                <span className="font-semibold text-white">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Tip ({activeTipPercent}% {tipBasis === 'pre-tax' ? 'pre-tax' : 'post-tax'}):
                </span>
                <span className="font-semibold text-emerald-400">+${tipTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/10 text-sm font-bold text-white">
                <span>Total Bill:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={handleCopyBreakdown}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-all active:scale-98"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4 text-white" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Group Text / Venmo Split'}</span>
            </button>
          </div>

          {/* Quick Etiquette Reality */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs text-xs space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              <span>US Tipping Guidelines</span>
            </h4>
            <div className="space-y-1 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                • <strong>18% – 20%:</strong> Normal US standard for sit-down table service.
              </p>
              <p>
                • <strong>Always inspect the receipt:</strong> Many restaurants automatically add 18% or 20% "auto-gratuity" for parties of 5 or 6+. Look before double-tipping.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* IN-TOOL CONTENT AD SLOT */}
      <AdSlot slot="in-tool-content" />
    </div>
  );
};
