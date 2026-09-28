import { NavRoute } from './types';

export interface RouteMeta {
  path: string;
  title: string;
  desc: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const routeConfig: Record<NavRoute, RouteMeta> = {
  home: {
    path: '/',
    title: 'QuickLifeTools – Free US Daily Utility Calculators & Estimators',
    desc: 'Instant, private client-side calculators for Americans: Sleep Cycle, Restaurant Tip & Bill Split, Hourly to Yearly Salary, and Rent Affordability.',
    changefreq: 'daily',
    priority: 1.0,
  },
  'sleep-cycle': {
    path: '/sleep-cycle',
    title: 'US Sleep Cycle Calculator – 90-Minute REM Cycle Alarm Planner',
    desc: 'Calculate optimal wake-up times and bedtimes based on 90-minute sleep cycles. Avoid morning grogginess and wake up energized.',
    changefreq: 'weekly',
    priority: 0.9,
  },
  'tip-calculator': {
    path: '/tip-calculator',
    title: 'US Restaurant Tip & Split Bill Calculator – 50 States Sales Tax',
    desc: 'Calculate dining tips, split group checks with 50-state sales tax rates, and copy clean Venmo breakdown messages in seconds.',
    changefreq: 'weekly',
    priority: 0.9,
  },
  'salary-estimator': {
    path: '/salary-estimator',
    title: 'US Hourly to Yearly Salary Estimator – Take-Home Pay Breakdown',
    desc: 'Convert hourly wages to annual pay. Estimate net take-home pay after Federal income taxes, FICA, and state taxes.',
    changefreq: 'weekly',
    priority: 0.9,
  },
  'rent-affordability': {
    path: '/rent-affordability',
    title: 'US Rent Affordability Calculator – 30% HUD & NYC 40x Rule',
    desc: 'Find out how much rent you can afford based on the US HUD 30% rule, NYC 40x landlord requirement, and monthly debt.',
    changefreq: 'weekly',
    priority: 0.9,
  },
  'student-loan': {
    path: '/student-loan',
    title: 'US Student Loan Payoff Calculator – Extra Payments & Savings',
    desc: 'Calculate standard vs accelerated student loan payoff, interest saved with extra monthly payments, and debt freedom dates.',
    changefreq: 'weekly',
    priority: 0.9,
  },
  'subscription': {
    path: '/subscription',
    title: 'US Subscription & Recurring Expense Auditor – Hidden Annual Costs',
    desc: 'Audit recurring streaming, fitness, and app subscriptions. See annualized totals and calculate required hours of work.',
    changefreq: 'weekly',
    priority: 0.9,
  },
  'timezone': {
    path: '/timezone',
    title: 'US Multi-Timezone Meeting Planner – Eastern, Central, Mountain, Pacific',
    desc: 'Coordinate meetings across all US time zones with interactive 24-hour slider, Golden Overlap business hours, and 1-tap invite copying.',
    changefreq: 'weekly',
    priority: 0.9,
  },
  'freelance': {
    path: '/freelance',
    title: 'US Freelance 1099 Tax & Hourly Rate Estimator – 15.3% SE Tax',
    desc: 'Estimate 15.3% self-employment tax, federal/state obligations, quarterly 1040-ES payments, and target 1099 billing rates.',
    changefreq: 'weekly',
    priority: 0.9,
  },
  'privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy – QuickLifeTools (CCPA & GDPR Compliant)',
    desc: 'Read our Privacy Policy, data non-retention guarantee, Google AdSense third-party cookie disclosures, and CCPA consumer rights.',
    changefreq: 'monthly',
    priority: 0.5,
  },
  'terms-of-service': {
    path: '/terms-of-service',
    title: 'Terms of Service & Disclaimer – QuickLifeTools',
    desc: 'Terms of Service, estimation disclaimers, limitation of liability, and usage terms for QuickLifeTools calculators.',
    changefreq: 'monthly',
    priority: 0.5,
  },
  about: {
    path: '/about',
    title: 'About Us – QuickLifeTools Mission & Story',
    desc: 'Learn about QuickLifeTools: 100% free, private, client-side everyday utilities engineered for US students and remote workers.',
    changefreq: 'monthly',
    priority: 0.6,
  },
  contact: {
    path: '/contact',
    title: 'Contact Us – QuickLifeTools Support & Feedback',
    desc: 'Get in touch with the QuickLifeTools team for support, feature suggestions, or feedback. We respond within 24–48 hours.',
    changefreq: 'monthly',
    priority: 0.6,
  },
};
