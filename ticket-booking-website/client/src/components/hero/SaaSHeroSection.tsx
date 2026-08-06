import React, { useState, useEffect } from "react";
import { Plane, X } from "lucide-react";
import { BookingWidget } from "@/components/booking-widget/bookingwidget";

interface SaaSHeroSectionProps {
  onOpenAuth?: (mode: "signin" | "signup") => void;
}

export function SaaSHeroSection({ onOpenAuth }: SaaSHeroSectionProps) {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);

  // Close popup modal on Escape key press & prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsWidgetVisible(false);
      }
    };

    if (isWidgetVisible) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWidgetVisible]);

  const handleRegisterClick = () => {
    if (onOpenAuth) {
      onOpenAuth("signup");
    } else {
      setIsWidgetVisible(true);
    }
  };

  return (
    <div
      className="relative w-full pt-10 pb-20 sm:pb-24 overflow-hidden flex flex-col items-center select-none"
      style={{ background: "linear-gradient(135deg, #EEF4FF 0%, #E8F0FE 40%, #EDF2FC 100%)" }}
    >
      {/* Flight Path Background Graphic */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <svg
          className="w-full h-full min-w-[1100px]"
          viewBox="0 0 1200 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Blue pillar vertical gradient */}
            <linearGradient id="pillarBeamGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.15" />
            </linearGradient>

            {/* Drop shadow for 3D diamond bases */}
            <filter id="diamondShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#1E40AF" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Solid blue curve from top-left entering to Pillar 2 */}
          <path
            d="M -40 30 C 20 60, 60 100, 95 168 C 115 200, 140 230, 164 278"
            stroke="#93C5FD"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Dashed blue curve from Pillar 2 through bottom pillars to top-right */}
          <path
            d="M 164 278 Q 240 380, 360 370 Q 400 365, 436 320 Q 470 280, 510 290 T 580 302 T 640 305 T 730 250 T 840 230 T 1260 80"
            stroke="#BFDBFE"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Location Pillar 1 (Far Top Left - on solid path) */}
          <g transform="translate(80, 160)">
            <polygon points="30,20 60,8 30,-8 0,8" fill="white" stroke="#E0E8F5" strokeWidth="1.5" filter="url(#diamondShadow)" />
            <polygon points="30,14 52,4 30,-2 8,4" fill="#EEF4FF" stroke="#D0DCEE" strokeWidth="1" />
            <rect x="24" y="-58" width="12" height="66" rx="6" fill="url(#pillarBeamGrad)" />
          </g>

          {/* Location Pillar 2 (Mid-Left, lower) */}
          <g transform="translate(168, 268)">
            <polygon points="30,20 60,8 30,-8 0,8" fill="white" stroke="#E0E8F5" strokeWidth="1.5" filter="url(#diamondShadow)" />
            <polygon points="30,14 52,4 30,-2 8,4" fill="#EEF4FF" stroke="#D0DCEE" strokeWidth="1" />
            <rect x="24" y="-58" width="12" height="66" rx="6" fill="url(#pillarBeamGrad)" />
          </g>

          {/* Location Pillar 3 (Center Bottom) */}
          <g transform="translate(440, 302)">
            <polygon points="30,20 60,8 30,-8 0,8" fill="white" stroke="#E0E8F5" strokeWidth="1.5" filter="url(#diamondShadow)" />
            <polygon points="30,14 52,4 30,-2 8,4" fill="#EEF4FF" stroke="#D0DCEE" strokeWidth="1" />
            <rect x="24" y="-52" width="12" height="60" rx="6" fill="url(#pillarBeamGrad)" />
          </g>

          {/* Location Pillar 4 (Mid-Right) */}
          <g transform="translate(618, 302)">
            <polygon points="30,20 60,8 30,-8 0,8" fill="white" stroke="#E0E8F5" strokeWidth="1.5" filter="url(#diamondShadow)" />
            <polygon points="30,14 52,4 30,-2 8,4" fill="#EEF4FF" stroke="#D0DCEE" strokeWidth="1" />
            <rect x="24" y="-52" width="12" height="60" rx="6" fill="url(#pillarBeamGrad)" />
          </g>

          {/* Location Pillar 5 (Far Top Right) */}
          <g transform="translate(750, 188)">
            <polygon points="30,20 60,8 30,-8 0,8" fill="white" stroke="#E0E8F5" strokeWidth="1.5" filter="url(#diamondShadow)" />
            <polygon points="30,14 52,4 30,-2 8,4" fill="#EEF4FF" stroke="#D0DCEE" strokeWidth="1" />
            <rect x="24" y="-58" width="12" height="66" rx="6" fill="url(#pillarBeamGrad)" />
          </g>

          {/* Blue Airplane icon on path */}
          <g transform="translate(302, 358) rotate(-20)">
            <path
              d="M22 12C22 12 15 10 12 6C11 4.5 10 1 10 1C9.5 0.5 8.5 0.5 8 1L9 6L3 4.5L1.5 3C1 2.5 0.5 2.5 0 3L1.5 6.5L0 10L2 9.5L4 7.5L9 8.5L8 13.5C8 14 8.5 14.5 9 14.5C9.5 14.5 10 14 10.5 13L13 9.5C16 9.5 22 12 22 12Z"
              fill="#2563EB"
              transform="scale(2)"
            />
          </g>
        </svg>
      </div>

      {/* Main SaaS Hero Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center pt-10 sm:pt-14">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-[3.6rem] font-black text-slate-900 tracking-tight leading-[1.18] mx-auto">
          <span>Book Flights</span>{" "}
          <span className="inline-flex items-center text-blue-600 align-middle">
            <Plane className="w-9 h-9 sm:w-12 sm:h-12 inline mx-1 -rotate-45 fill-blue-600 text-blue-600" />
          </span>{" "}
          <span>Faster with a</span>
          <br />
          <span>Smarter Travel</span>
          <span className="text-blue-600">.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Search, compare, and book flights in real time with a secure, modern SaaS-based booking
          experience designed for speed and simplicity.
        </p>

        {/* Action Buttons – Register (blue) + View Features (outline) */}
        <div className="mt-7 sm:mt-8 flex flex-row items-center justify-center gap-3 flex-wrap">
          <button
            onClick={handleRegisterClick}
            className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base rounded-lg shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer border-none"
          >
            Register
          </button>
          <button
            onClick={() => setIsWidgetVisible(true)}
            className="px-6 py-3 bg-white/80 hover:bg-white text-slate-700 font-semibold text-sm sm:text-base rounded-lg border border-slate-200/80 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          >
            View Features
          </button>
        </div>
      </div>

      {/* Popup Modal Overlay for Flight Search Widget */}
      {isWidgetVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          {/* Backdrop click listener */}
          <div
            className="absolute inset-0"
            onClick={() => setIsWidgetVisible(false)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Plane className="w-5 h-5 -rotate-45" />
                </div>
                <span>Flight Search & Ticket Booking</span>
              </div>
              <button
                onClick={() => setIsWidgetVisible(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer border-none"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content Area */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-70px)]">
              <BookingWidget />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
