import React from "react";
import { Navbar } from "@/components/navbar";
import { BookingWidget } from "./components/booking-widget/bookingwidget";
import { useGetSessionQuery } from "./store/services/authApi";

// SVG Cloud Component for natural layered background
const VectorCloud = ({
  className,
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) => (
  <svg
    viewBox="0 0 100 40"
    className={className}
    fill="currentColor"
    style={{ opacity }}
  >
    <path d="M10 30 c -2-10 10-15 15-8 5-10 20-10 25 0 8-12 30-8 30 8 5 0 10 5 10 10 0 10-90 10-90 0 z" />
  </svg>
);

// SVG Hot Air Balloon Component (matches the red/white stripes in the screenshot)
const HotAirBalloon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 130"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Balloon Base Shading */}
    <ellipse cx="50" cy="50" rx="35" ry="38" fill="url(#balloonGrad)" />

    {/* Red/White Stripes (Clipping Path) */}
    <g clipPath="url(#balloonClip)">
      <path
        d="M50 12C35 12 15 35 15 50C15 65 35 88 50 88C65 88 85 65 85 50C85 35 65 12 50 12Z"
        fill="#E11D48"
      />
      {/* Stripe 1 (White) */}
      <path
        d="M50 12C41.5 12 28.5 35 28.5 50C28.5 65 41.5 88 50 88"
        stroke="white"
        strokeWidth="12"
        fill="none"
      />
      {/* Center Stripe (White) */}
      <path
        d="M50 12C50 12 50 35 50 50C50 65 50 88 50 88"
        stroke="white"
        strokeWidth="10"
        fill="none"
      />
      {/* Stripe 2 (White) */}
      <path
        d="M50 12C58.5 12 71.5 35 71.5 50C71.5 65 58.5 88 50 88"
        stroke="white"
        strokeWidth="12"
        fill="none"
      />
    </g>

    {/* Balloon Outline and Details */}
    <path
      d="M50 12C35 12 15 35 15 50C15 65 35 88 50 88C65 88 85 65 85 50C85 35 65 12 50 12Z"
      stroke="#9F1239"
      strokeWidth="2.5"
    />

    {/* Ropes */}
    <line x1="38" y1="87" x2="43" y2="105" stroke="#78350F" strokeWidth="1.5" />
    <line x1="62" y1="87" x2="57" y2="105" stroke="#78350F" strokeWidth="1.5" />
    <line x1="50" y1="88" x2="50" y2="105" stroke="#78350F" strokeWidth="1.5" />

    {/* Basket */}
    <rect
      x="42"
      y="105"
      width="16"
      height="12"
      rx="3"
      fill="#D97706"
      stroke="#92400E"
      strokeWidth="1.5"
    />
    <rect x="42" y="108" width="16" height="2" fill="#B45309" />

    {/* Gradients and Clips definitions */}
    <defs>
      <radialGradient id="balloonGrad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FFF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.2" />
      </radialGradient>
      <clipPath id="balloonClip">
        <path d="M50 12C35 12 15 35 15 50C15 65 35 88 50 88C65 88 85 65 85 50C85 35 65 12 50 12Z" />
      </clipPath>
    </defs>
  </svg>
);

// SVG Cute Mascot Character Component (matches the green fuzzy monster mascot on the right holding a phone)
const GreenMascot = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Furry Body */}
    <circle cx="60" cy="70" r="40" fill="#65A30D" />
    {/* Fluffy tufts of hair (circles around the head) */}
    <circle cx="30" cy="50" r="12" fill="#65A30D" />
    <circle cx="90" cy="50" r="12" fill="#65A30D" />
    <circle cx="60" cy="25" r="15" fill="#65A30D" />
    <circle cx="42" cy="32" r="13" fill="#65A30D" />
    <circle cx="78" cy="32" r="13" fill="#65A30D" />
    {/* Waving Arm (Left) */}
    <path
      d="M25 65C12 58 5 45 8 38C11 31 22 38 30 48"
      fill="#65A30D"
      stroke="#4D7C0F"
      strokeWidth="2.5"
    />
    {/* Arm details (nails) */}
    <circle cx="8" cy="38" r="3" fill="#A3E635" />
    <circle cx="6" cy="43" r="2.5" fill="#A3E635" />
    {/* Big Expressive Eyes */}
    <circle
      cx="48"
      cy="62"
      r="14"
      fill="white"
      stroke="#3F6212"
      strokeWidth="1.5"
    />
    <circle cx="48" cy="62" r="8" fill="#4D7C0F" />
    <circle cx="49" cy="60" r="3" fill="white" /> {/* Reflection */}
    <circle
      cx="72"
      cy="62"
      r="14"
      fill="white"
      stroke="#3F6212"
      strokeWidth="1.5"
    />
    <circle cx="72" cy="62" r="8" fill="#4D7C0F" />
    <circle cx="73" cy="60" r="3" fill="white" /> {/* Reflection */}
    {/* Eyelids / Eyebrows for cute look */}
    <path
      d="M36 52C42 47 54 48 58 53"
      stroke="#3F6212"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M84 52C78 47 66 48 62 53"
      stroke="#3F6212"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Rosy Cheeks */}
    <circle cx="38" cy="74" r="6" fill="#F43F5E" opacity="0.4" />
    <circle cx="82" cy="74" r="6" fill="#F43F5E" opacity="0.4" />
    {/* Smile */}
    <path
      d="M52 76C55 80 65 80 68 76"
      stroke="#3F6212"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Phone holding (Right Arm) */}
    <path
      d="M92 78C98 82 108 85 110 75C112 65 102 68 94 66"
      fill="#65A30D"
      stroke="#4D7C0F"
      strokeWidth="1.5"
    />
    {/* Phone */}
    <rect
      x="98"
      y="52"
      width="16"
      height="28"
      rx="3"
      transform="rotate(15 98 52)"
      fill="#1E293B"
      stroke="#475569"
      strokeWidth="1.5"
    />
    {/* Phone screen glowing green */}
    <rect
      x="100"
      y="55"
      width="12"
      height="22"
      rx="1.5"
      transform="rotate(15 98 52)"
      fill="#BBF7D0"
    />
    {/* Camera notch */}
    <circle cx="106" cy="56" r="1" fill="#1E293B" />
  </svg>
);

function App() {
  // Automatically restore active session from backend on page load / refresh
  useGetSessionQuery();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A84FF] via-[#0BA3FF] to-[#38BDF8] text-slate-800 flex flex-col font-sans antialiased overflow-x-hidden">
      {/* Premium Navbar */}
      <Navbar sticky={true} />

      {/* Main Hero & Search Area */}
      <main className="relative flex-grow flex items-center justify-center pt-10 pb-20 md:pt-8 md:pb-28 overflow-hidden min-h-[calc(100vh-80px)]">
        {/* Dynamic Premium Travel Sky Background */}
        <div className="absolute inset-0 z-0">
          {/* Decorative Clouds & Light Ray overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>

          {/* Cloud Vectors */}
          <VectorCloud
            className="absolute -bottom-8 -left-10 w-96 text-white/40"
            opacity={0.6}
          />
          <VectorCloud
            className="absolute -bottom-16 left-[20%] w-[500px] text-white/50"
            opacity={0.8}
          />
          <VectorCloud
            className="absolute -bottom-6 -right-16 w-96 text-white/30"
            opacity={0.5}
          />
          <VectorCloud
            className="absolute bottom-2 right-[30%] w-[350px] text-white/60"
            opacity={0.7}
          />

          {/* Hot Air Balloon (matches screenshot left) */}
          <HotAirBalloon className="absolute left-[3%] top-[8%] w-32 md:w-44 lg:w-56 drop-shadow-xl animate-pulse duration-5000" />

          {/* Mini background clouds floating */}
          <div className="absolute left-[25%] top-[12%] w-16 h-8 bg-white/20 rounded-full blur-[2px] pointer-events-none"></div>
          <div className="absolute right-[20%] top-[8%] w-24 h-10 bg-white/20 rounded-full blur-[3px] pointer-events-none"></div>

          {/* Green Mascot Character (matches screenshot right) */}
          <GreenMascot className="absolute right-[2%] top-[6%] w-24 md:w-32 lg:w-40 drop-shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer" />
        </div>

        {/* Dynamic Booking Search Widget (Centered) */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Subtle responsive floating titles above widget */}

          <BookingWidget />
        </div>
      </main>
    </div>
  );
}

export default App;
