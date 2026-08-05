import React from "react";
import { Plane } from "lucide-react";
import { BookingWidget } from "@/components/booking-widget/bookingwidget";

interface SaaSHeroSectionProps {
  onOpenAuth?: (mode: "signin" | "signup") => void;
}

export function SaaSHeroSection({ onOpenAuth }: SaaSHeroSectionProps) {
  return (
    <div className="relative w-full bg-slate-50/30 pt-12 pb-20 overflow-hidden flex flex-col items-center">
      {/* Flight Path Background Graphic matching exact screenshot */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg
          className="w-full h-full min-w-[1200px]"
          viewBox="0 0 1200 550"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curved solid line from top left to pillar 2 */}
          <path
            d="M 0 280 L 140 370 Q 340 500 330 360"
            stroke="#93C5FD"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Dashed flight path curve continuing across pillars */}
          <path
            d="M 330 360 Q 420 490 550 360 T 850 390 T 1200 120"
            stroke="#BFDBFE"
            strokeWidth="3"
            strokeDasharray="7 7"
            className="animate-pulse"
          />

          {/* Location Pillar 1 (Top Left) */}
          <g transform="translate(130, 210)">
            <polygon points="20,26 42,14 20,2 0,14" fill="white" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="17" y="-25" width="6" height="34" rx="3" fill="url(#bluePillarGrad)" />
            <circle cx="20" cy="-25" r="5" fill="#60A5FA" />
          </g>

          {/* Location Pillar 2 (Mid-Left curve) */}
          <g transform="translate(280, 310)">
            <polygon points="20,26 42,14 20,2 0,14" fill="white" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="17" y="-25" width="6" height="34" rx="3" fill="url(#bluePillarGrad)" />
            <circle cx="20" cy="-25" r="5" fill="#60A5FA" />
          </g>

          {/* Location Pillar 3 (Center below buttons) */}
          <g transform="translate(530, 310)">
            <polygon points="20,26 42,14 20,2 0,14" fill="white" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="17" y="-28" width="6" height="37" rx="3" fill="url(#bluePillarGrad)" />
            <circle cx="20" cy="-28" r="5" fill="#60A5FA" />
          </g>

          {/* Location Pillar 4 (Mid-Right) */}
          <g transform="translate(820, 340)">
            <polygon points="20,26 42,14 20,2 0,14" fill="white" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="17" y="-25" width="6" height="34" rx="3" fill="url(#bluePillarGrad)" />
            <circle cx="20" cy="-25" r="5" fill="#60A5FA" />
          </g>

          {/* Location Pillar 5 (Top Right) */}
          <g transform="translate(1010, 200)">
            <polygon points="20,26 42,14 20,2 0,14" fill="white" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="17" y="-25" width="6" height="34" rx="3" fill="url(#bluePillarGrad)" />
            <circle cx="20" cy="-25" r="5" fill="#60A5FA" />
          </g>

          {/* Blue Airplane icon on path */}
          <g transform="translate(435, 420) rotate(-22)">
            <path
              d="M22 12C22 12 15 10 12 6C11 4.5 10 1 10 1C9.5 0.5 8.5 0.5 8 1L9 6L3 4.5L1.5 3C1 2.5 0.5 2.5 0 3L1.5 6.5L0 10L2 9.5L4 7.5L9 8.5L8 13.5C8 14 8.5 14.5 9 14.5C9.5 14.5 10 14 10.5 13L13 9.5C16 9.5 22 12 22 12Z"
              fill="#2563EB"
              transform="scale(1.7)"
            />
          </g>

          <defs>
            <linearGradient id="bluePillarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main SaaS Hero Content Area matching exact screenshot */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-2">
        
        {/* Main Headline matching exact screenshot layout and line breaks */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          <span>Book Flights</span>{" "}
          <span className="inline-flex items-center text-blue-600 align-baseline">
            <Plane className="w-8 h-8 sm:w-11 sm:h-11 inline mx-1 -rotate-45 stroke-[2.5]" />
          </span>{" "}
          <span>Faster with a</span>
          <br />
          <span>Smarter Travel</span>
          <span className="text-blue-600">.</span>
        </h1>

        {/* Subtitle matching exact screenshot text */}
        <p className="mt-5 text-slate-600 font-medium text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Search, compare, and book flights in real time with a secure, modern SaaS-based booking experience designed for speed and simplicity.
        </p>

        {/* Buttons matching exact screenshot styling */}
        <div className="mt-7 flex flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenAuth?.("signup")}
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer border-none"
          >
            Register
          </button>

          <a
            href="#features"
            className="px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm sm:text-base rounded-2xl shadow-sm hover:shadow transition-all text-center"
          >
            View Features
          </a>
        </div>

        {/* Booking Search Widget Container */}
        <div className="mt-12 w-full max-w-6xl mx-auto text-left">
          <BookingWidget />
        </div>
      </div>
    </div>
  );
}
