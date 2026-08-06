'use client';

import dynamic from 'next/dynamic';

const ShaderBackground = dynamic(() => import('./components/ShaderBackground'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#080808]" aria-hidden="true" />,
});

export default function Home() {
  return (
    <main className="relative isolate flex flex-col min-h-[100dvh] overflow-hidden bg-[#080808] text-white font-geist antialiased">
      {/* Background Shader Canvas */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <ShaderBackground />
      </div>

      {/* Top Header Navigation */}
      <header
        className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10 animate-reveal"
        style={{ animationDelay: '0s' }}
      >
        <div className="flex items-center gap-10">
          <a href="#" className="flex items-center gap-[10px] group">
            <span
              className="w-[10px] h-[10px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              aria-hidden="true"
            />
            <span className="text-[15px] font-semibold tracking-tight">
              Waveform
              <span className="ml-[6px] font-geist-mono text-[12px] font-normal text-[#737373]">
                ’26
              </span>
            </span>
          </a>
          <nav aria-label="Primary" className="hidden md:flex gap-[28px] text-[14px] text-[#a3a3a3]">
            <a href="#speakers" className="transition-colors duration-150 hover:text-white">
              Speakers
            </a>
            <a href="#schedule" className="transition-colors duration-150 hover:text-white">
              Schedule
            </a>
            <a href="#venue" className="transition-colors duration-150 hover:text-white">
              Venue
            </a>
            <a href="#sponsors" className="transition-colors duration-150 hover:text-white">
              Sponsors
            </a>
          </nav>
        </div>
        <a
          href="#tickets"
          className="rounded-full bg-white text-black px-4 py-2 text-[14px] font-medium transition-colors duration-150 hover:bg-[#e5e5e5]"
        >
          Get tickets
        </a>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-24 pt-0 text-center">
        {/* Badge */}
        <p className="animate-reveal" style={{ animationDelay: '0.1s' }}>
          <span className="inline-flex items-center gap-[10px] rounded-full border border-white/10 bg-white/[0.03] px-4 py-[6px] font-geist-mono text-[12px] text-[#d4d4d4] backdrop-blur-[4px]">
            <span className="relative w-[6px] h-[6px]">
              <span className="absolute inset-0 rounded-full bg-[#34d399] opacity-60 animate-ping" />
              <span className="relative block w-[6px] h-[6px] rounded-full bg-[#34d399]" />
            </span>
            November 12–13, 2026 · Fort Mason, San Francisco
          </span>
        </p>

        {/* Main Headline */}
        <h1
          className="animate-reveal mt-12 max-w-[56rem] text-[48px] sm:text-[72px] leading-[1.05] font-semibold tracking-[-0.05em] [text-wrap:balance]"
          style={{ animationDelay: '0.2s' }}
        >
          The conference for
          <br className="hidden sm:inline" /> creative engineers.
        </h1>

        {/* Subtitle / Paragraph */}
        <p
          className="animate-reveal mt-8 max-w-[36rem] text-[14px] sm:text-[16px] leading-[1.625] text-[#a3a3a3] [text-wrap:balance]"
          style={{ animationDelay: '0.3s' }}
        >
          Two days on the waterfront with the people building the most interesting things on the web — graphics, interfaces, and everything in between.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-reveal mt-10 flex flex-col sm:flex-row items-center gap-[12px]"
          style={{ animationDelay: '0.4s' }}
        >
          <a
            href="#tickets"
            className="rounded-full bg-white text-black px-[28px] py-3 text-[14px] font-medium transition-colors duration-150 hover:bg-[#e5e5e5]"
          >
            Get tickets
          </a>
          <a
            href="#schedule"
            className="rounded-full border border-white/15 text-white px-[28px] py-3 text-[14px] font-medium transition-colors duration-150 hover:border-white/35 hover:bg-white/[0.05]"
          >
            View the schedule
          </a>
        </div>
      </section>
    </main>
  );
}
