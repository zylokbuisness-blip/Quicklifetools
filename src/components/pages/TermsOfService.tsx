import React from 'react';
import { FileText, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>User Agreement & Terms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Effective Date: January 1, 2026 • Last Updated: September 2026
        </p>
      </div>

      {/* Main Content */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-6">
        {/* Important Disclaimer Notice */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 not-prose flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-amber-900 dark:text-amber-200">
              Informational & Educational Estimates Only
            </h3>
            <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-1 leading-relaxed">
              All tools, salary estimates, tax brackets, restaurant tip splits, and rent affordability outputs provided on QuickLifeTools are approximations intended solely for personal planning and general educational purposes. <strong>QuickLifeTools does not provide certified financial, tax, legal, architectural, or medical advice.</strong>
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using QuickLifeTools ("the Service"), you agree to be bound by these Terms of Service and all applicable federal, state, and local laws and regulations of the United States. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            2. Nature of Calculators and Accuracy of Data
          </h2>
          <p>
            While QuickLifeTools strives to maintain up-to-date sales tax rates, federal IRS income tax brackets, FICA payroll rates, and standard housing metrics, tax laws and local municipal rates fluctuate frequently. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the calculations provided.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Salary Calculations:</strong> Actual paycheck withholdings will vary based on your W-4 employer allowances, specific pre-tax deductions (HSA, FSA, transit), health insurance premiums, and local city wage taxes (e.g., NYC, Philadelphia, Detroit).</li>
            <li><strong>Rent Affordability:</strong> The 30% rule and 40x rule are general underwriting benchmarks; individual landlords and property managers exercise independent approval criteria and credit score requirements.</li>
            <li><strong>Sleep Cycles:</strong> Sleep architecture recommendations are based on statistical 90-minute circadian cycle research and do not substitute for clinical sleep therapy or consultation with a certified sleep physician.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            3. Intellectual Property Rights
          </h2>
          <p>
            The software, interactive UI algorithms, styling, logos, graphics, and written guides on QuickLifeTools are protected by United States and international copyright, trademark, and other intellectual property laws. You may freely use the tools for personal, non-commercial use. Automated scraping, reverse engineering, or unauthorized framing without prior written consent is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall QuickLifeTools, its creators, operators, or affiliates be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of your use or inability to use the tools, including but not limited to financial losses, tax penalties, lease rejections, or sleep disturbances.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            5. Governing Law and Jurisdiction
          </h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States of America, without regard to its conflict of law provisions. Any legal disputes arising under these Terms shall be subject to the exclusive jurisdiction of the competent federal or state courts situated in the United States.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Changes become effective immediately upon posting to this page. Your continued use of the website following the posting of any changes constitutes acceptance of those changes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            7. Contact Information
          </h2>
          <p>
            If you have questions regarding our Terms of Service, please reach out via email at{' '}
            <strong className="text-blue-600 dark:text-blue-400">legal@quicklifetools.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
