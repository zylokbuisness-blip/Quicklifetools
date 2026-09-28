import React from 'react';
import { ShieldCheck, Lock, EyeOff, Cookie, Scale, HelpCircle } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Compliance Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Effective Date: January 1, 2026 • Last Updated: September 2026 • Compliant with CCPA & GDPR
        </p>
      </div>

      {/* Main Content */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-6">
        {/* Core Highlight: 100% Client Side Non-Retention */}
        <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 not-prose flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
              100% Client-Side Data Non-Retention Guarantee
            </h3>
            <p className="text-xs text-emerald-800/90 dark:text-emerald-300/90 mt-1 leading-relaxed">
              QuickLifeTools is architected from the ground up as a private client-side utility suite. All numbers you input—including your salary, hourly wage, restaurant bills, rent numbers, debts, and sleep hours—are processed purely inside your local web browser's memory using JavaScript. We <strong>do not</strong> transmit, collect, log, sell, or store your private calculation data on any backend servers or databases.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>1. Introduction</span>
          </h2>
          <p>
            At QuickLifeTools (accessible from quicklifetools.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by QuickLifeTools and how we use it, specifically tailored to United States privacy laws and international data protection standards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>2. California Consumer Privacy Act (CCPA / CPRA) Compliance</span>
          </h2>
          <p>
            Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have specific rights regarding their personal information:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Right to Know:</strong> You may request the categories and specific pieces of personal data a business has collected about you.</li>
            <li><strong>Right to Delete:</strong> You have the right to request deletion of any personal data collected.</li>
            <li><strong>Right to Opt-Out of the Sale or Sharing of Personal Data:</strong> We do not sell user personal data. Any advertising identifiers used by third-party advertising partners can be opted out through browser controls or our privacy links.</li>
            <li><strong>Right to Non-Discrimination:</strong> You will never be denied services or charged different rates for exercising your privacy rights.</li>
          </ul>
        </section>

        <section className="space-y-3" id="ad-disclosure">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3. Google AdSense & Third-Party Advertising Vendors</span>
          </h2>
          <p>
            Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to quicklifetools.com and other sites on the internet.
          </p>
          <div className="p-4 bg-slate-100 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
            <p>
              • Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
            </p>
            <p>
              • Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
            </p>
            <p>
              • Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold underline"
              >
                Google Ads Settings
              </a>
              . Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold underline"
              >
                www.aboutads.info
              </a>
              .
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4. Cookies and Web Beacons</span>
          </h2>
          <p>
            Like any modern website, QuickLifeTools uses "cookies" solely to store information such as visitor preferences (e.g., your selected light or dark mode theme). These cookies are used to optimize user experience by customizing our web page content based on visitors' browser type and device preferences.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>5. General Data Protection Regulation (GDPR) Rights</span>
          </h2>
          <p>
            For visitors accessing our tools from the European Economic Area (EEA) or the United Kingdom, you are entitled to the full suite of GDPR protections, including the right of access, rectification, erasure, restriction of processing, data portability, and objection. Because QuickLifeTools does not mandate user accounts, usernames, passwords, or emails to run our utility calculators, we retain zero identifiable user profile records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>6. Children's Online Privacy Protection Act (COPPA)</span>
          </h2>
          <p>
            QuickLifeTools does not knowingly collect any Personal Identifiable Information from children under the age of 13. If a parent or guardian believes that our website has inadvertently recorded personal information, please contact us immediately and we will promptly remove such records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>7. Contact Information</span>
          </h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our compliance team via email at{' '}
            <strong className="text-blue-600 dark:text-blue-400">privacy@quicklifetools.com</strong> or through our{' '}
            <button
              onClick={() => {
                window.location.hash = 'contact';
              }}
              className="text-blue-600 dark:text-blue-400 underline font-semibold"
            >
              Contact Us page
            </button>
            .
          </p>
        </section>
      </div>
    </div>
  );
};
