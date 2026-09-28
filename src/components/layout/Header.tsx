import React, { useState, useRef, useEffect } from 'react';
import { NavRoute } from '../../types';
import { Logo } from '../Logo';
import {
  Moon,
  Sun,
  Menu,
  X,
  BedDouble,
  Receipt,
  Briefcase,
  Home,
  ShieldCheck,
  FileText,
  Info,
  Mail,
  GraduationCap,
  CreditCard,
  Globe2,
  Calculator,
  ChevronDown,
} from 'lucide-react';

interface HeaderProps {
  currentRoute: NavRoute;
  onRouteChange: (route: NavRoute) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onRouteChange,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreToolsOpen, setMoreToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const coreTools = [
    {
      id: 'sleep-cycle' as NavRoute,
      label: 'Sleep Cycle',
      shortLabel: 'Sleep',
      icon: BedDouble,
      tag: '90m Cycles',
    },
    {
      id: 'tip-calculator' as NavRoute,
      label: 'Tip & Bill Split',
      shortLabel: 'Tip Split',
      icon: Receipt,
      tag: '50 States Tax',
    },
    {
      id: 'salary-estimator' as NavRoute,
      label: 'Salary Estimator',
      shortLabel: 'Salary',
      icon: Briefcase,
      tag: 'Take-Home Pay',
    },
    {
      id: 'rent-affordability' as NavRoute,
      label: 'Rent Affordability',
      shortLabel: 'Rent',
      icon: Home,
      tag: '30% Rule',
    },
  ];

  const moreTools = [
    {
      id: 'student-loan' as NavRoute,
      label: 'Student Loan Payoff',
      shortLabel: 'Loans',
      icon: GraduationCap,
      tag: 'Extra Pay',
      desc: 'Interest savings & payoff dates',
    },
    {
      id: 'subscription' as NavRoute,
      label: 'Subscription Auditor',
      shortLabel: 'Subs',
      icon: CreditCard,
      tag: 'Vampire Spend',
      desc: 'Annualized cost & work hours',
    },
    {
      id: 'timezone' as NavRoute,
      label: 'US Timezone Planner',
      shortLabel: 'Timezones',
      icon: Globe2,
      tag: 'ET • CT • MT • PT',
      desc: 'Coast-to-coast meeting sync',
    },
    {
      id: 'freelance' as NavRoute,
      label: 'Freelance 1099 Tax',
      shortLabel: '1099 Tax',
      icon: Calculator,
      tag: '15.3% SE Tax',
      desc: 'Quarterly taxes & target rates',
    },
  ];

  const isMoreToolActive = moreTools.some((t) => t.id === currentRoute);

  const handleNav = (route: NavRoute) => {
    onRouteChange(route);
    setMobileMenuOpen(false);
    setMoreToolsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center text-left group focus:outline-hidden"
              aria-label="QuickLifeTools Home"
            >
              <Logo size="md" />
            </button>
          </div>

          {/* Desktop Nav - 4 Core Tools + More Tools Dropdown */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {coreTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = currentRoute === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleNav(tool.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tool.label}</span>
                </button>
              );
            })}

            {/* More Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreToolsOpen(!moreToolsOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isMoreToolActive
                    ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>More Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreToolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreToolsOpen && (
                <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 py-1">
                    Student & Remote Tools
                  </div>
                  {moreTools.map((tool) => {
                    const Icon = tool.icon;
                    const isActive = currentRoute === tool.id;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleNav(tool.id)}
                        className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mt-0.5 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                        <div>
                          <div className="text-xs font-bold leading-tight">{tool.label}</div>
                          <div className={`text-[10px] mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                            {tool.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right actions: Theme toggle + Info dropdown + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Quick links desktop */}
            <div className="hidden lg:flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mr-2 border-r border-slate-200 dark:border-slate-800 pr-3">
              <button
                onClick={() => handleNav('about')}
                className={`hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 rounded transition-colors ${
                  currentRoute === 'about' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNav('contact')}
                className={`hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 rounded transition-colors ${
                  currentRoute === 'contact' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
                }`}
              >
                Contact
              </button>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors focus:outline-hidden"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-200" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2">
            Everyday Calculators
          </div>
          <div className="space-y-1">
            {coreTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = currentRoute === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleNav(tool.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tool.label}</span>
                  </div>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                      isActive
                        ? 'bg-blue-700 text-blue-100'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {tool.tag}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 mt-4 px-2">
            Student & Remote Tools
          </div>
          <div className="space-y-1">
            {moreTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = currentRoute === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleNav(tool.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tool.label}</span>
                  </div>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                      isActive
                        ? 'bg-blue-700 text-blue-100'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {tool.tag}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 my-4 pt-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2">
              Legal & Information
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <button
                onClick={() => handleNav('about')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
              >
                <Info className="w-4 h-4 text-blue-500" />
                <span>About Us</span>
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
              >
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>Contact</span>
              </button>
              <button
                onClick={() => handleNav('privacy-policy')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
              >
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                <span>Privacy</span>
              </button>
              <button
                onClick={() => handleNav('terms-of-service')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
              >
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Terms</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

