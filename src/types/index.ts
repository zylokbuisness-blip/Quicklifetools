export type NavRoute =
  | 'home'
  | 'sleep-cycle'
  | 'tip-calculator'
  | 'salary-estimator'
  | 'rent-affordability'
  | 'student-loan'
  | 'subscription'
  | 'timezone'
  | 'freelance'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'about'
  | 'contact';

export type ToolType =
  | 'sleep'
  | 'tip'
  | 'salary'
  | 'rent'
  | 'student-loan'
  | 'subscription'
  | 'timezone'
  | 'freelance';

export interface StateTaxInfo {
  code: string;
  name: string;
  salesTax: number; // default state base rate in %
  avgIncomeTax: number; // estimated effective state income tax rate in %
  notes?: string;
}

export interface SleepResult {
  cycles: number;
  timeString: string;
  totalMinutes: number;
  hoursFormatted: string;
  quality: 'Optimal (Full Rest)' | 'Recommended' | 'Manageable' | 'Short' | 'Power Nap';
  qualityColor: string;
  description: string;
  isRecommended?: boolean;
}

export interface SalaryBreakdown {
  grossAnnual: number;
  grossMonthly: number;
  grossSemiMonthly: number;
  grossBiWeekly: number;
  grossWeekly: number;
  grossDaily: number;
  grossHourly: number;
  federalTaxAnnual: number;
  ficaAnnual: number;
  stateTaxAnnual: number;
  retirementAnnual: number;
  totalDeductionsAnnual: number;
  netAnnual: number;
  netMonthly: number;
  netBiWeekly: number;
  netWeekly: number;
  netDaily: number;
  netHourly: number;
  effectiveTaxRate: number;
}
