import React from 'react';
import { NavRoute } from '../../types';
import { Logo } from '../Logo';
import {
  BedDouble,
  Receipt,
  Briefcase,
  Home,
  ShieldCheck,
  FileText,
  Info,
  Mail,
  Lock,
  GraduationCap,
  CreditCard,
  Globe2,
  Calculator,
} from 'lucide-react';

interface FooterProps {
  onRouteChange: (route: NavRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onRouteChange }) => {
  const handleNav = (route: NavRoute) => {
    onRouteChange(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors mt-auto text-slate-600 dark:text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="text-left focus:outline-hidden group"
              aria-label="QuickLifeTools Home"
            >
              <Logo size="sm" showTag={true} />
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Fast, privacy-first, and 100% free daily utility calculators engineered for US students, remote workers, and young adults making everyday decisions.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-md border border-emerald-200 dark:border-emerald-800 w-fit">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero server logging • 100% Client-Side</span>
            </div>
          </div>

          {/* Tools Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              All 8 Calculators
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleNav('sleep-cycle')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <BedDouble className="w-3.5 h-3.5 text-blue-500" />
                  <span>Sleep Cycle Planner</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tip-calculator')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <Receipt className="w-3.5 h-3.5 text-blue-500" />
                  <span>Tip & Bill Splitter</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('salary-estimator')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                  <span>Hourly to Yearly Salary</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('rent-affordability')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <Home className="w-3.5 h-3.5 text-blue-500" />
                  <span>Rent Affordability (30%)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('student-loan')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Student Loan Payoff</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('subscription')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <CreditCard className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Subscription Auditor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('timezone')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <Globe2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span>US Timezone Planner</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('freelance')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Freelance 1099 Tax</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('privacy-policy')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                  <span>Privacy Policy (CCPA / GDPR)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms-of-service')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>Terms of Service & Disclaimer</span>
                </button>
              </li>
              <li>
                <a
                  href="#ad-disclosure"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('privacy-policy');
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <span>Google AdSense & Cookie Notice</span>
                </a>
              </li>
              <li>
                <span className="text-xs text-slate-400 dark:text-slate-500 block pt-1">
                  California Consumer Privacy Act (CCPA) compliant
                </span>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Company & Help
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <Info className="w-3.5 h-3.5 text-blue-500" />
                  <span>About QuickLifeTools</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors text-left"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Contact & Feedback</span>
                </button>
              </li>
              <li className="pt-2">
                <span className="text-xs text-slate-400 dark:text-slate-500 block">
                  Support Email:
                </span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  support@quicklifetools.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 pb-2 text-xs text-slate-400 dark:text-slate-500 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-600 dark:text-slate-400">Financial & Health Disclaimer:</strong> All tools, estimates, tax estimates, sleep times, and rent calculations provided on QuickLifeTools are generated for educational and informational purposes only. Results do not constitute certified financial, tax, legal, or medical advice. Actual paycheck withholdings vary based on specific IRS W-4 allowances, state exemptions, local city taxes, and healthcare benefit elections.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4">
            <p>
              © {new Date().getFullYear()} QuickLifeTools. Hand-crafted in the USA. All calculations run locally in your browser.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <button onClick={() => handleNav('privacy-policy')} className="hover:underline">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => handleNav('terms-of-service')} className="hover:underline">
                Terms of Service
              </button>
              <span>•</span>
              <button onClick={() => handleNav('about')} className="hover:underline">
                About
              </button>
              <span>•</span>
              <button onClick={() => handleNav('contact')} className="hover:underline">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
