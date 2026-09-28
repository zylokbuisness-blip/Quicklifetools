import React from 'react';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTag?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  showTag = true,
  className = '',
}) => {
  // Dimensions based on size prop
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const svgSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    xl: 'w-3 h-3',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Dynamic Geometric Badge with Lightning Spark & Glow */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Subtle Ambient Glowing Aura */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-xl blur-xs opacity-60 group-hover:opacity-100 transition duration-300"></div>

        {/* Outer Icon Badge */}
        <div
          className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-900 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center border border-white/20 dark:border-blue-400/20 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* High-Precision Vector SVG: Dynamic Lightning Spark + Utility Hex Structure */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${svgSizes[size]} drop-shadow-sm`}
          >
            <defs>
              <linearGradient id="qltBoltGrad" x1="8" y1="4" x2="24" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="45%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
              <linearGradient id="qltGlowGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Geometric Angled Shield / Microchip Pattern */}
            <path
              d="M16 2.5L27 7.5V17C27 23.2 22.3 28.5 16 29.8C9.7 28.5 5 23.2 5 17V7.5L16 2.5Z"
              fill="url(#qltGlowGrad)"
              stroke="#60A5FA"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40"
            />

            {/* Stylized Speed Lightning Bolt */}
            <path
              d="M18.5 5.5L10 16.5H16.5L13.5 26.5L22 15.5H15.5L18.5 5.5Z"
              fill="url(#qltBoltGrad)"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* Precision Micro-Tick Accents */}
            <circle cx="16" cy="3" r="1" fill="#38BDF8" />
            <circle cx="27" cy="17" r="1" fill="#818CF8" />
            <circle cx="5" cy="17" r="1" fill="#38BDF8" />
          </svg>

          {/* Pulsing Status Dot (High-Tech Live Utility Feel) */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className={`relative inline-flex rounded-full ${dotSizes[size]} bg-emerald-500 border border-white dark:border-slate-900`}></span>
          </span>
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight ${textSizes[size]} text-slate-900 dark:text-white transition-colors`}
            >
              QuickLife
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent ml-0.5">
                Tools
              </span>
            </span>

            {/* USA Badge */}
            {showTag && (
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/90 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 tracking-wider uppercase">
                USA
              </span>
            )}
          </div>

          {size !== 'sm' && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-normal mt-0.5 hidden sm:inline">
              Client-side utility calculators
            </span>
          )}
        </div>
      )}
    </div>
  );
};
