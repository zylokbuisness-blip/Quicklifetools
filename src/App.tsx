import React, { useState, useEffect } from 'react';
import { NavRoute } from './types';
import { routeConfig } from './routes';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdSlot } from './components/ads/AdSlot';

// Page components
import { Home } from './components/pages/Home';
import { SleepCycleCalculator } from './components/tools/SleepCycleCalculator';
import { TipCalculator } from './components/tools/TipCalculator';
import { SalaryEstimator } from './components/tools/SalaryEstimator';
import { RentAffordabilityCalculator } from './components/tools/RentAffordabilityCalculator';
import { StudentLoanCalculator } from './components/tools/StudentLoanCalculator';
import { SubscriptionAuditor } from './components/tools/SubscriptionAuditor';
import { TimezonePlanner } from './components/tools/TimezonePlanner';
import { FreelanceTaxEstimator } from './components/tools/FreelanceTaxEstimator';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsOfService } from './components/pages/TermsOfService';
import { AboutUs } from './components/pages/AboutUs';
import { ContactUs } from './components/pages/ContactUs';

export default function App() {
  // Determine initial route from URL pathname or hash
  const getInitialRoute = (): NavRoute => {
    const path = window.location.pathname.replace(/^\//, '');
    const hash = window.location.hash.replace(/^#\/?/, '');

    const candidate = hash || path;
    if (candidate in routeConfig) {
      return candidate as NavRoute;
    }
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<NavRoute>(getInitialRoute);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('qlt_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('qlt_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('qlt_theme', 'light');
    }
  }, [isDarkMode]);

  // Handle URL history popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title, meta description, and URL on route change
  useEffect(() => {
    const info = routeConfig[currentRoute] || routeConfig.home;
    document.title = info.title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', info.desc);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', info.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', info.desc);
    }
  }, [currentRoute]);

  const handleRouteChange = (route: NavRoute) => {
    setCurrentRoute(route);
    const targetPath = routeConfig[route]?.path || '/';
    // Update browser URL smoothly without reloading
    window.history.pushState({}, '', targetPath);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navbar */}
      <Header
        currentRoute={currentRoute}
        onRouteChange={handleRouteChange}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* TOP LEADERBOARD AD SLOT (Below Header) */}
      <AdSlot slot="top-leaderboard" />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentRoute === 'home' && <Home onRouteChange={handleRouteChange} />}
        {currentRoute === 'sleep-cycle' && <SleepCycleCalculator />}
        {currentRoute === 'tip-calculator' && <TipCalculator />}
        {currentRoute === 'salary-estimator' && <SalaryEstimator />}
        {currentRoute === 'rent-affordability' && <RentAffordabilityCalculator />}
        {currentRoute === 'student-loan' && <StudentLoanCalculator />}
        {currentRoute === 'subscription' && <SubscriptionAuditor />}
        {currentRoute === 'timezone' && <TimezonePlanner />}
        {currentRoute === 'freelance' && <FreelanceTaxEstimator />}
        {currentRoute === 'privacy-policy' && <PrivacyPolicy />}
        {currentRoute === 'terms-of-service' && <TermsOfService />}
        {currentRoute === 'about' && <AboutUs onRouteChange={handleRouteChange} />}
        {currentRoute === 'contact' && <ContactUs />}
      </main>

      {/* BOTTOM BANNER AD SLOT (Above Footer) */}
      <AdSlot slot="bottom-banner" />

      {/* Footer */}
      <Footer onRouteChange={handleRouteChange} />
    </div>
  );
}
