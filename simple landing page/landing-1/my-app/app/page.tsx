"use client";

import React, { useState } from "react";
import Image from "next/image";

// SVG Hexagonal Nav Indicator per DESIGN.md:
// "Small hexagonal outline shapes (~12px), stroke #000000 on light sections or #ffffff on dark sections, fill transparent. Used in groups of 3 below circular features. The hexagon is a secondary brand shape — distinct from the pill button and circular image crops."
function Hexagon({ color = "#ffffff" }: { color?: string }) {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block transition-transform hover:scale-125 duration-150"
      aria-hidden="true"
    >
      <polygon
        points="6,1 11,3.8 11,10.2 6,13 1,10.2 1,3.8"
        stroke={color}
        strokeWidth="1.2"
        fill="transparent"
      />
    </svg>
  );
}

// Circled 'S' Monogram per DESIGN.md:
// "A circled 'S' monogram, ~32px diameter, thin black stroke on transparent or light fill. Minimal, monoline, no decoration. The only graphic mark on the page."
function Monogram({ strokeDark = true }: { strokeDark?: boolean }) {
  return (
    <div
      className={`w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center font-davinci text-[19px] leading-none select-none font-medium transition-transform hover:scale-105 ${
        strokeDark
          ? "border-[#000000] text-[#000000]"
          : "border-[#ffffff] text-[#ffffff]"
      }`}
      style={{ letterSpacing: "-0.5px" }}
      aria-label="Structured Monogram"
    >
      S
    </div>
  );
}

export default function Home() {
  const [mintOpen, setMintOpen] = useState(false);
  const [pointsOpen, setPointsOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>("1.0");
  const [mintSuccess, setMintSuccess] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const parsedAmount = parseFloat(depositAmount) || 0;
  const expectedYield = (parsedAmount * 0.06).toFixed(3);
  const mxBtcReceived = (parsedAmount * 0.9397).toFixed(4);

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setMintSuccess(true);
      setTimeout(() => {
        setMintSuccess(false);
        setMintOpen(false);
      }, 2500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#c4c3b6] text-[#000000] font-helvetica selection:bg-[#000000] selection:text-[#ffffff] overflow-x-hidden">
      {/* =========================================================================
          SECTION 1: HERO WORDMARK SECTION
          DESIGN.md:
          "Full-bleed #c4c3b6 background.
          Top-left: circled 'S' monogram in #000000 stroke.
          Top-right: 'Structured Points' in Helvetica Now 12px weight 400, #000000.
          Center cluster: 'REAL YIELD on BITCOIN' in Davinci 52px weight 500, #000000,
          letter-spacing -0.47px ('on' in italic).
          Below: 'TVL: 85 BTC    APY: 6%' in Helvetica Now 16px weight 500.
          Below: filled black pill button, 9px 17px padding, 28.8px radius, 'mint mxBTC'
          in Helvetica Now 12px weight 400, #ffffff.
          Then a 374px Davinci weight 500 #000000 wordmark 'Structured' at letter-spacing -3.37px,
          cropped at viewport edges."
          ========================================================================= */}
      <section className="relative w-full min-h-screen bg-[#c4c3b6] flex flex-col justify-between pt-6 pb-0 px-6 sm:px-10 md:px-14 overflow-hidden border-b border-[#000000]">
        {/* Minimal Header (~40px row, Left: 32px circled S, Right: Structured Points text link) */}
        <header className="w-full h-10 flex items-center justify-between z-20">
          <a
            href="#"
            className="flex items-center gap-2"
            aria-label="Structured Home"
          >
            <Monogram strokeDark={true} />
          </a>
          <button
            onClick={() => setPointsOpen(true)}
            className="ghost-link text-[12px] font-normal text-[#000000] cursor-pointer"
          >
            Structured Points
          </button>
        </header>

        {/* Center Cluster */}
        <div className="my-auto py-12 md:py-16 flex flex-col items-center justify-center text-center z-10">
          {/* Sub-headline: Davinci 52px weight 500, #000000, letter-spacing -0.47px ('on' in italic) */}
          <h1 className="font-davinci text-[#000000] font-medium text-[34px] sm:text-[44px] md:text-[52px] leading-[1.0] tracking-[-0.47px] max-w-4xl">
            REAL YIELD <span className="italic font-normal">on</span> BITCOIN
          </h1>

          {/* Stats: 'TVL: 85 BTC    APY: 6%' in Helvetica Now 16px weight 500, separated by 28px gap */}
          <div className="mt-7 flex items-center justify-center gap-[28px] text-[#000000] font-medium text-[16px] tracking-[-0.01em]">
            <span>TVL: 85 BTC</span>
            <span>APY: 6%</span>
          </div>

          {/* Primary CTA: Single filled black pill button, 9px 17px padding, 28.8px radius */}
          <div className="mt-7">
            <button onClick={() => setMintOpen(true)} className="pill-button">
              mint mxBTC
            </button>
          </div>
        </div>

        {/* Hero Wordmark:
            Davinci serif at 374px weight 500, color #000000, letter-spacing -3.37px, line-height 0.84.
            Extends beyond visible viewport width — intentionally cropped at the edges. */}
        <div className="w-full flex justify-center items-end select-none pointer-events-none -mb-3 sm:-mb-6 md:-mb-10 overflow-hidden">
          <span
            className="font-davinci font-medium text-[#000000] tracking-[-3.37px] leading-[0.84] text-[150px] sm:text-[230px] md:text-[300px] lg:text-[374px] whitespace-nowrap text-center block transform translate-y-[6%]"
            style={{
              fontFeatureSettings: '"liga" 1, "dlig" 1',
            }}
          >
            Structured
          </span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FLOATING PRODUCT CARD OVER CLASSICAL PAINTING (MIDDLE SECTION)
          DESIGN.md:
          "Middle section: full-bleed classical painting with a single dark product card
          floating dead-center.
          Classical Painting Panel: Renaissance/Baroque oil painting reproduction,
          edge-to-edge with no border or rounded corners, no overlay. The image fills
          the entire section viewport. Functions as background atmosphere.
          Centered dark product card, ~400px square, #000000 background with notched/hexagonal
          corner cuts, 9px primary edge radius.
          Lower-left corner: 'SCROLL' in Helvetica Now 9px weight 400, #ffffff."
          ========================================================================= */}
      <section className="relative w-full min-h-[90vh] md:min-h-screen bg-[#000000] flex items-center justify-center p-6 md:p-12 overflow-hidden border-b border-[#000000]">
        {/* Full-bleed Renaissance oil painting reproduction edge-to-edge without border or overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
          <Image
            src="/images/landscape_clean.jpg"
            alt="Renaissance classical landscape reproduction with Roman ruins and river"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Centered Dark Product Card (~400px square, #000000 background, notched geometric corners) */}
        <div className="relative z-10 w-full max-w-[400px] h-[400px] bg-[#000000] text-[#ffffff] notched-card p-8 flex flex-col justify-between border border-[#595855]">
          {/* Card Top: Monogram + Micro-Label */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Monogram strokeDark={false} />
              <div>
                <span className="block font-davinci text-[18px] text-[#ffffff] leading-none">
                  mxBTC Vault
                </span>
                <span className="block font-helvetica text-[11px] text-[#808080] tracking-wider mt-1 uppercase">
                  Class A • Non-Custodial
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff] animate-ping opacity-75" />
              <span className="font-helvetica text-[10px] text-[#808080] uppercase tracking-widest">
                Active
              </span>
            </div>
          </div>

          {/* Card Middle: Vault Data & Yield Display */}
          <div className="space-y-4 my-auto py-2">
            <div className="border-b border-[#595855] pb-3">
              <div className="text-[12px] text-[#808080] uppercase tracking-wide">
                Net Asset Value
              </div>
              <div className="font-davinci text-[34px] font-normal text-[#ffffff] tracking-tight mt-0.5 leading-none">
                1.0642{" "}
                <span className="text-[18px] text-[#808080] font-helvetica">
                  BTC
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[12px]">
              <div>
                <span className="block text-[#808080] uppercase tracking-wider text-[10px]">
                  Annual Rate
                </span>
                <span className="font-medium text-[#ffffff] text-[15px]">
                  6.00% APY
                </span>
              </div>
              <div>
                <span className="block text-[#808080] uppercase tracking-wider text-[10px]">
                  Total Assets
                </span>
                <span className="font-medium text-[#ffffff] text-[15px]">
                  85.42 BTC
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={() => setMintOpen(true)}
                className="w-full pill-button-inverted py-2 text-[12px] font-normal cursor-pointer"
              >
                Deposit &amp; Mint mxBTC
              </button>
            </div>
          </div>

          {/* Card Bottom: 'SCROLL' in Helvetica Now 9px weight 400, #ffffff in lower-left */}
          <div className="flex items-end justify-between pt-2">
            <div className="font-helvetica text-[9px] font-normal tracking-[0.25em] text-[#ffffff] uppercase select-none">
              SCROLL
            </div>
            <div className="flex items-center gap-1.5">
              <Hexagon color="#595855" />
              <Hexagon color="#808080" />
              <Hexagon color="#ffffff" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: DARK FEATURE SECTION ("MAX BTC EXPLAINED")
          DESIGN.md:
          "Full-width #000000 background.
          Centered heading 'MAX BTC EXPLAINED' in Davinci 94px weight 500, #ffffff,
          letter-spacing -0.85px.
          3-column grid below: each column has a Davinci 22px weight 400 caption in #ffffff,
          a ~200px circular image crop, and a 12px hexagonal outline indicator in #ffffff stroke.
          Column gap 28px."
          Classical oil paintings: rabbit, amphora, butterfly.
          ========================================================================= */}
      <section className="relative w-full bg-[#000000] text-[#ffffff] py-24 md:py-36 px-6 md:px-16 border-b border-[#595855]">
        {/* Exhibition corner labels at 12px uppercase in opposite corners */}
        <div className="max-w-6xl mx-auto flex items-center justify-between text-[12px] text-[#808080] uppercase tracking-[0.18em] mb-12 select-none">
          <span>[ EXHIBITION 01 ]</span>
          <span>[ HIGH ART ON BITCOIN ]</span>
        </div>

        {/* Centered Heading: Davinci 94px weight 500, #ffffff, letter-spacing -0.85px, line-height 0.84 */}
        <div className="max-w-5xl mx-auto text-center mb-20 md:mb-28">
          <h2 className="font-davinci font-medium text-[#ffffff] text-[44px] sm:text-[68px] md:text-[94px] leading-[0.84] tracking-[-0.85px] uppercase">
            MAX BTC EXPLAINED
          </h2>
          <p className="mt-6 font-helvetica text-[15px] leading-[1.5] text-[#808080] max-w-xl mx-auto">
            A tripartite architecture reconciling mathematical provenance with
            perpetual Bitcoin yield generation.
          </p>
        </div>

        {/* 3-Column Grid: Column gap 28px */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-[28px] items-start text-center">
          {/* Column 1: Rabbit Study */}
          <div className="flex flex-col items-center">
            {/* Caption in Davinci 22px weight 400 in #ffffff above */}
            <h3 className="font-davinci text-[22px] md:text-[24px] font-normal text-[#ffffff] tracking-[-0.11px] mb-6 min-h-[30px] flex items-center justify-center">
              01 / Sovereign Custody
            </h3>

            {/* Circular image crop: ~200px diameter, no border, no shadow */}
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden relative mb-6 select-none bg-[#000000]">
              <Image
                src="/images/rabbit.jpg"
                alt="Classical hare wildlife study"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Hexagonal outline indicators below (in group of 3) */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <Hexagon color="#ffffff" />
              <Hexagon color="#595855" />
              <Hexagon color="#595855" />
            </div>

            {/* Descriptive Body Text: Helvetica Now 15px, line-height 1.5 */}
            <p className="font-helvetica text-[15px] leading-[1.5] text-[#808080] max-w-xs">
              Bitcoin pledged into non-custodial cryptographic vaults.
              Unencumbered reserves, audited on-chain at every epoch.
            </p>
          </div>

          {/* Column 2: Amphora Study */}
          <div className="flex flex-col items-center">
            {/* Caption in Davinci 22px weight 400 in #ffffff above */}
            <h3 className="font-davinci text-[22px] md:text-[24px] font-normal text-[#ffffff] tracking-[-0.11px] mb-6 min-h-[30px] flex items-center justify-center">
              02 / Institutional Yield
            </h3>

            {/* Circular image crop: ~200px diameter, no border, no shadow */}
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden relative mb-6 select-none bg-[#000000]">
              <Image
                src="/images/amphora.jpg"
                alt="Classical Baroque amphora terracotta study"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Hexagonal outline indicators below (group of 3) */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <Hexagon color="#595855" />
              <Hexagon color="#ffffff" />
              <Hexagon color="#595855" />
            </div>

            {/* Descriptive Body Text */}
            <p className="font-helvetica text-[15px] leading-[1.5] text-[#808080] max-w-xs">
              Time-tested storage and structured basis accrual. Yield derived
              solely from proof-of-work security economics.
            </p>
          </div>

          {/* Column 3: Butterfly Study */}
          <div className="flex flex-col items-center">
            {/* Caption in Davinci 22px weight 400 in #ffffff above */}
            <h3 className="font-davinci text-[22px] md:text-[24px] font-normal text-[#ffffff] tracking-[-0.11px] mb-6 min-h-[30px] flex items-center justify-center">
              03 / Auto-Compounding
            </h3>

            {/* Circular image crop: ~200px diameter, no border, no shadow */}
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden relative mb-6 select-none bg-[#000000]">
              <Image
                src="/images/butterfly_study.jpg"
                alt="Classical Dutch still life swallowtail butterfly study"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Hexagonal outline indicators below (group of 3) */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <Hexagon color="#595855" />
              <Hexagon color="#595855" />
              <Hexagon color="#ffffff" />
            </div>

            {/* Descriptive Body Text */}
            <p className="font-helvetica text-[15px] leading-[1.5] text-[#808080] max-w-xs">
              Harvested yields automatically fold into the net asset value of
              mxBTC. Zero manual claims, zero compounding friction.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LIGHT EDITORIAL SPREAD (BONE CARD SURFACES ON PUTTY CANVAS)
          DESIGN.md:
          "Sections alternate between light editorial spreads and pitch-black rooms,
          with no gradients, no shadows, and almost no color.
          Elevated card surfaces (#e7e5e4 Bone) and secondary canvas in light sections.
          Sits one step above Putty for subtle layering without breaking the monochrome warmth.
          Card radius 9px, card padding 24px, hairline borders."
          ========================================================================= */}
      <section className="relative w-full bg-[#c4c3b6] py-24 md:py-32 px-6 md:px-16 border-b border-[#000000]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="block text-[12px] font-normal text-[#595855] uppercase tracking-[0.18em] mb-3">
                [ CATALOGUE FOLIO — NO. 02 ]
              </span>
              <h2 className="font-davinci text-[36px] sm:text-[44px] md:text-[52px] font-medium text-[#000000] tracking-[-0.47px] leading-[1.0]">
                Curated Vault Specifications
              </h2>
            </div>
            {/* Stat pair on #c4c3b6 background per DESIGN.md:
                Two values side by side, Helvetica Now 16px weight 500, separated by 28px gap */}
            <div className="flex items-center gap-[28px] text-[16px] font-medium text-[#000000]">
              <span>TVL: 85 BTC</span>
              <span>APY: 6%</span>
            </div>
          </div>

          {/* 3 Bone Cards:
              Surface: #e7e5e4 (Bone), Radius: 9px, Padding: 24px, Border: 1px hairline #dfdcd5 (Vellum) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#e7e5e4] p-[24px] rounded-[9px] border border-[#dfdcd5] flex flex-col justify-between min-h-[260px]">
              <div>
                <span className="text-[12px] font-medium text-[#595855] uppercase tracking-wider block mb-2">
                  01 / Backing Ratio
                </span>
                <h4 className="font-davinci text-[26px] font-normal text-[#000000] tracking-[-0.13px] mb-3">
                  100% Native Bitcoin
                </h4>
                <p className="text-[15px] leading-[1.5] text-[#595855]">
                  Every mxBTC token is backed 1:1 by provable satoshis
                  segregated in institutional multi-signature vaults.
                </p>
              </div>
              <div className="pt-6 border-t border-[#dfdcd5] flex items-center justify-between text-[12px] text-[#000000] font-medium">
                <span>Proof of Reserve</span>
                <span className="font-normal text-[#595855]">
                  Verified Every Block
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#e7e5e4] p-[24px] rounded-[9px] border border-[#dfdcd5] flex flex-col justify-between min-h-[260px]">
              <div>
                <span className="text-[12px] font-medium text-[#595855] uppercase tracking-wider block mb-2">
                  02 / Smart Contracts
                </span>
                <h4 className="font-davinci text-[26px] font-normal text-[#000000] tracking-[-0.13px] mb-3">
                  Formal Verification
                </h4>
                <p className="text-[15px] leading-[1.5] text-[#595855]">
                  Audited by leading cryptographic security firms. Invariant
                  checks mathematically prevent re-entrancy and state exploits.
                </p>
              </div>
              <div className="pt-6 border-t border-[#dfdcd5] flex items-center justify-between text-[12px] text-[#000000] font-medium">
                <span>Security Audit</span>
                <span className="font-normal text-[#595855]">
                  Trail of Bits &bull; Pass
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#e7e5e4] p-[24px] rounded-[9px] border border-[#dfdcd5] flex flex-col justify-between min-h-[260px]">
              <div>
                <span className="text-[12px] font-medium text-[#595855] uppercase tracking-wider block mb-2">
                  03 / Liquidity
                </span>
                <h4 className="font-davinci text-[26px] font-normal text-[#000000] tracking-[-0.13px] mb-3">
                  Instant Redemption
                </h4>
                <p className="text-[15px] leading-[1.5] text-[#595855]">
                  Exit back to native BTC at any moment with zero exit fee
                  penalty or synthetic slippage.
                </p>
              </div>
              <div className="pt-6 border-t border-[#dfdcd5] flex items-center justify-between text-[12px] text-[#000000] font-medium">
                <span>Settlement Speed</span>
                <span className="font-normal text-[#595855]">
                  T+0 Settlement
                </span>
              </div>
            </div>
          </div>

          {/* Exhibition Wall Label Text Callout */}
          <div className="mt-14 pt-10 border-t border-[#000000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-davinci text-[22px] italic text-[#000000] block mb-1">
                &ldquo;Finance as an exhibition of classical order and
                restraint.&rdquo;
              </span>
              <p className="text-[15px] text-[#595855]">
                Curated by Structured Treasury. Vault architecture documented
                under Exhibition Folio 2026.
              </p>
            </div>
            <div>
              <button onClick={() => setMintOpen(true)} className="pill-button">
                mint mxBTC
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CHALK FOOTER
          DESIGN.md:
          "Footers and lightest surface tier (#ebebeb Chalk). Sits at section bases to
          signal a different page zone.
          Museum wall label style typography: Restrained, authoritative."
          ========================================================================= */}
      <footer className="w-full bg-[#ebebeb] text-[#000000] py-16 px-6 md:px-16 border-t border-[#dfdcd5]">
        <div className="max-w-6xl mx-auto flex flex-col justify-between gap-12">
          {/* Top Row: Monogram + Navigation Ghost Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pb-10 border-b border-[#dfdcd5]">
            <div className="flex items-center gap-3">
              <Monogram strokeDark={true} />
              <span className="font-davinci text-[20px] font-medium tracking-tight">
                Structured
              </span>
            </div>

            <nav className="flex flex-wrap items-center gap-6 sm:gap-10">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="ghost-link text-[12px] cursor-pointer"
              >
                Hero
              </button>
              <button
                onClick={() => setMintOpen(true)}
                className="ghost-link text-[12px] cursor-pointer"
              >
                mxBTC Vault
              </button>
              <button
                onClick={() => setPointsOpen(true)}
                className="ghost-link text-[12px] cursor-pointer"
              >
                Structured Points
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="ghost-link text-[12px]"
              >
                Audits
              </a>
            </nav>
          </div>

          {/* Bottom Row: Museum Attribution + Technical Network Telemetry */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[12px] text-[#595855]">
            <div className="font-helvetica">
              <span>Structured Finance &copy; 2026.</span>{" "}
              <span className="opacity-80">
                Renaissance gallery on putty paper.
              </span>
            </div>

            <div className="flex items-center gap-3 text-[12px] text-[#595855] flex-wrap">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#000000]" />
                Bitcoin Block #892,104
              </span>
              <span>&bull;</span>
              <span>APY 6.00%</span>
              <span>&bull;</span>
              <span>Vault Invariants Verified</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          STRUCTURED POINTS FOLIO MODAL (GALLERY ATTRIBUTION LEDGER)
          ========================================================================= */}
      {pointsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/70"
          onClick={() => setPointsOpen(false)}
        >
          <div
            className="w-full max-w-[460px] bg-[#000000] text-[#ffffff] notched-card p-8 border border-[#595855] relative select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Monogram strokeDark={false} />
                <div>
                  <h3 className="font-davinci text-[24px] text-[#ffffff] leading-none">
                    Structured Points
                  </h3>
                  <span className="text-[11px] text-[#808080] tracking-wider uppercase mt-1 block">
                    Gallery Patron Ledger • Folio #04
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPointsOpen(false)}
                className="text-[#808080] hover:text-[#ffffff] text-[20px] font-light leading-none p-1 cursor-pointer"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* Points Summary */}
            <div className="border border-[#595855] p-5 mb-5 bg-[#000000]">
              <div className="text-[11px] text-[#808080] uppercase tracking-wider mb-1">
                Accrued Gallery Honorarium
              </div>
              <div className="font-davinci text-[38px] text-[#ffffff] leading-none">
                142,850{" "}
                <span className="font-helvetica text-[14px] text-[#808080]">
                  PTS
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-[#808080] pt-3 border-t border-[#595855]/60">
                <span>Multiplier: 1.50x</span>
                <span>Tier: Medici Patron</span>
              </div>
            </div>

            {/* Points Distribution Details */}
            <div className="space-y-3 text-[12px] mb-6">
              <div className="flex justify-between py-2 border-b border-[#595855]/40 text-[#808080]">
                <span>Vault Depositor Boost</span>
                <span className="text-[#ffffff] font-medium">
                  +100 PTS / BTC / Day
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#595855]/40 text-[#808080]">
                <span>Early Exhibition Attendance</span>
                <span className="text-[#ffffff] font-medium">
                  Epoch 01 Verified
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#595855]/40 text-[#808080]">
                <span>Merkle Tree Settlement</span>
                <span className="text-[#ffffff] font-medium">
                  Block #892,104
                </span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => {
                setPointsOpen(false);
                setMintOpen(true);
              }}
              className="w-full pill-button-inverted py-3 text-[12px] font-normal cursor-pointer"
            >
              Deposit BTC to Increase Multiplier
            </button>

            {/* Micro Indicator */}
            <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#595855]/40 text-[9px] text-[#808080] uppercase tracking-widest">
              <span>Cryptographically Signed</span>
              <div className="flex items-center gap-1.5">
                <Hexagon color="#808080" />
                <Hexagon color="#ffffff" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MINT MODAL (MUSEUM DIALOGUE OVERLAY)
          ========================================================================= */}
      {mintOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/70"
          onClick={() => setMintOpen(false)}
        >
          <div
            className="w-full max-w-[460px] bg-[#000000] text-[#ffffff] notched-card p-8 border border-[#595855] relative select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Monogram strokeDark={false} />
                <div>
                  <h3 className="font-davinci text-[24px] text-[#ffffff] leading-none">
                    Mint mxBTC
                  </h3>
                  <span className="text-[11px] text-[#808080] tracking-wider uppercase mt-1 block">
                    Institutional Vault I • Non-Custodial
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMintOpen(false)}
                className="text-[#808080] hover:text-[#ffffff] text-[20px] font-light leading-none p-1 cursor-pointer"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {mintSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-[#ffffff] flex items-center justify-center mx-auto text-[20px] font-davinci">
                  ✓
                </div>
                <h4 className="font-davinci text-[24px] text-[#ffffff]">
                  Mint Order Confirmed
                </h4>
                <p className="text-[14px] text-[#808080]">
                  Allocated {mxBtcReceived} mxBTC to your cryptographic
                  portfolio. Yield compounding begins next block.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMint} className="space-y-6">
                <div>
                  <div className="flex justify-between text-[12px] text-[#808080] mb-2 uppercase">
                    <span>Deposit Amount</span>
                    <span>Balance: 4.82 BTC</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full bg-[#000000] border border-[#595855] text-[#ffffff] text-[22px] px-4 py-3 rounded-none focus:outline-none focus:border-[#ffffff] font-helvetica"
                      placeholder="0.00"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[#808080]">
                      BTC
                    </div>
                  </div>
                </div>

                <div className="bg-[#000000] p-4 rounded-[9px] border border-[#595855] space-y-2 text-[12px]">
                  <div className="flex justify-between text-[#808080]">
                    <span>Expected mxBTC:</span>
                    <span className="text-[#ffffff] font-medium">
                      {mxBtcReceived} mxBTC
                    </span>
                  </div>
                  <div className="flex justify-between text-[#808080]">
                    <span>Estimated 1-Yr Yield:</span>
                    <span className="text-[#ffffff] font-medium">
                      +{expectedYield} BTC (6.0%)
                    </span>
                  </div>
                  <div className="flex justify-between text-[#808080]">
                    <span>Custody Architecture:</span>
                    <span className="text-[#ffffff]">Multi-Sig Segregated</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isMinting || parsedAmount <= 0}
                  className="w-full pill-button-inverted py-3 text-[13px] font-medium disabled:opacity-50 cursor-pointer"
                >
                  {isMinting
                    ? "Broadcasting to Mempool..."
                    : "Authorize Deposit & Mint"}
                </button>

                <div className="flex items-center justify-between text-[10px] text-[#808080] uppercase tracking-wider">
                  <span>Non-Custodial</span>
                  <div className="flex items-center gap-1.5">
                    <Hexagon color="#808080" />
                    <Hexagon color="#ffffff" />
                  </div>
                  <span>Instant Exit</span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
