import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Exact 10 sweeping stream curves matching the reference composition with navbar headroom
const CURVE_PATHS = [
  // Curve 0 (Topmost wide arch over 30-Min Jam down to Weekly deliverables)
  'M 0 380 C 100 240, 210 230, 390 240 C 600 250, 820 400, 1040 490 C 1160 490, 1280 400, 1440 400',
  // Curve 1
  'M 0 410 C 110 310, 220 300, 400 315 C 610 330, 830 430, 1040 490 C 1160 490, 1280 425, 1440 425',
  // Curve 2
  'M 0 440 C 120 370, 230 360, 410 380 C 620 400, 840 455, 1040 490 C 1160 490, 1280 450, 1440 450',
  // Curve 3 (Passes through Sprint Plan at ~495, 415)
  'M 0 470 C 130 420, 270 415, 495 415 C 680 415, 850 475, 1040 490 C 1160 490, 1280 475, 1440 475',
  // Curve 4
  'M 0 500 C 140 470, 290 465, 530 465 C 710 465, 870 485, 1040 490 C 1160 490, 1280 500, 1440 500',
  // Curve 5
  'M 0 530 C 150 520, 300 520, 560 520 C 740 520, 880 500, 1040 490 C 1160 490, 1280 525, 1440 525',
  // Curve 6
  'M 0 565 C 140 580, 280 585, 520 585 C 720 585, 890 515, 1040 490 C 1160 490, 1280 550, 1440 550',
  // Curve 7
  'M 0 605 C 130 645, 270 655, 470 660 C 690 665, 900 530, 1040 490 C 1160 490, 1280 575, 1440 575',
  // Curve 8 (Sweeps under Weekly Execution at ~410, 715)
  'M 0 650 C 120 710, 250 725, 410 730 C 660 735, 900 550, 1040 490 C 1160 490, 1280 600, 1440 600',
  // Curve 9 (Bottommost deep sweeping underbelly under Weekly Execution)
  'M 0 700 C 120 780, 240 805, 400 810 C 640 810, 890 575, 1040 490 C 1160 490, 1280 625, 1440 625',
]

export default function Momentum() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const sticky = stickyRef.current
    if (!container || !sticky) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=160%',
        pin: sticky,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  // Progressive staggered activation thresholds
  const headingActive = scrollProgress >= 0.04
  const node1Active = scrollProgress >= 0.12
  const node2Active = scrollProgress >= 0.30
  const node3Active = scrollProgress >= 0.50
  const node4Active = scrollProgress >= 0.70

  // SVG drawing progress along length
  const pathDrawProg = Math.max(0, Math.min(1, (scrollProgress - 0.04) / 0.88))
  const strokeOffset = 3600 * (1 - pathDrawProg)

  return (
    <section
      ref={containerRef}
      id="our-approach-section"
      className="relative bg-black text-white selection:bg-brand-green selection:text-black overflow-hidden"
    >
      {/* Sticky Pinned Container */}
      <div
        ref={stickyRef}
        className="w-full h-screen relative flex flex-col justify-between overflow-hidden bg-black select-none"
      >
        {/* ============================================================
            DESKTOP VIEW (Exact 1-to-1 Match with Reference Screenshot)
            ============================================================ */}
        <div className="hidden lg:block absolute inset-0 w-full h-full">
          
          {/* ============================================================
              TOP-RIGHT EDITORIAL HEADER
              Small Technical Label + Large Editorial Serif Heading
              ============================================================ */}
          <div
            className="absolute top-14 xl:top-18 right-10 xl:right-24 z-30 flex flex-col items-start transition-all duration-700 ease-out"
            style={{
              opacity: headingActive ? 1 : 0,
              transform: headingActive ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            {/* Small Technical Section Label */}
            <div className="mb-3 xl:mb-4">
              <span className="font-mono text-xs sm:text-[13px] text-white/50 tracking-[0.25em] uppercase">
                [ 01001 ]
              </span>
            </div>

            {/* Large Editorial Serif Heading */}
            <h2 className="font-reckless text-5xl sm:text-6xl lg:text-[68px] xl:text-[76px] 2xl:text-[84px] font-normal text-white leading-[1.06] tracking-tight">
              Build momentum
              <br />
              in days not weeks
            </h2>
          </div>

          {/* ============================================================
              SVG FLOWING CURVES SYSTEM (Behind Nodes: z-10, pointer-events-none)
              ============================================================ */}
          <svg
            viewBox="0 0 1440 900"
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curveGradientStream" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
                <stop offset="25%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
              </linearGradient>

              <linearGradient id="momentumPulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Base subtle guide curves */}
            {CURVE_PATHS.map((d, idx) => (
              <path
                key={`base-${idx}`}
                d={d}
                fill="none"
                stroke="url(#curveGradientStream)"
                strokeWidth="1.15"
                strokeLinecap="round"
                opacity={0.16 + (idx % 3) * 0.05}
              />
            ))}

            {/* Scroll-Driven Progressive Stroke Drawing */}
            {CURVE_PATHS.map((d, idx) => (
              <path
                key={`draw-${idx}`}
                d={d}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeDasharray="3600"
                strokeDashoffset={strokeOffset}
                opacity={0.28 + (idx % 3) * 0.08}
                className="transition-all duration-300 ease-out"
              />
            ))}

            {/* Ambient Flow Shimmer on selected curves */}
            {CURVE_PATHS.filter((_, i) => i === 0 || i === 3 || i === 8).map((d, idx) => (
              <path
                key={`ambient-${idx}`}
                d={d}
                fill="none"
                stroke="url(#momentumPulseGrad)"
                strokeWidth="1.6"
                strokeDasharray="180 900"
                className="animate-momentum-flow"
                style={{
                  animationDuration: `${14 + idx * 4}s`,
                  animationDelay: `${idx * 2}s`,
                }}
              />
            ))}
          </svg>

          {/* ============================================================
              NODE 01: The 30-Min Jam (Upper-Left Area)
              ============================================================ */}
          <div
            className="absolute z-20 flex items-start gap-4 xl:gap-5 transition-all duration-700 ease-out"
            style={{
              left: '14.5%',
              top: '15%',
              opacity: node1Active ? 1 : 0,
              transform: node1Active ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.94)',
            }}
          >
            {/* White Circular Node */}
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(255,255,255,0.18)] mt-0.5 transition-transform duration-300 hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2.5 2.5" />
                <path d="M5 3L2 6" />
                <path d="M22 6l-3-3" />
                <path d="M10 2h4" />
              </svg>
            </div>

            {/* Text Content */}
            <div className="max-w-[280px] xl:max-w-[310px]">
              <h3 className="font-reckless text-xl font-normal text-white tracking-tight mb-2">
                The 30-Min Jam
              </h3>
              <p className="font-sans text-xs xl:text-[13px] text-white/70 font-light leading-relaxed">
                We ask the hard questions - context, constraints, and “what is actually at stake?” No pitch, just clarity to see if we can move the needle for you.
              </p>
            </div>
          </div>

          {/* ============================================================
              NODE 02: The Sprint Plan (Center Area)
              ============================================================ */}
          <div
            className="absolute z-20 flex items-start gap-4 xl:gap-5 transition-all duration-700 ease-out"
            style={{
              left: '32.5%',
              top: '41%',
              opacity: node2Active ? 1 : 0,
              transform: node2Active ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.94)',
            }}
          >
            {/* White Circular Node */}
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(255,255,255,0.18)] mt-0.5 transition-transform duration-300 hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5" />
                <path d="M4 20L21 3" />
                <path d="M21 16v5h-5" />
                <path d="M15 15l6 6" />
                <path d="M4 4l5 5" />
              </svg>
            </div>

            {/* Text Content */}
            <div className="max-w-[280px] xl:max-w-[310px]">
              <h3 className="font-reckless text-xl font-normal text-white tracking-tight mb-2">
                The Sprint Plan
              </h3>
              <p className="font-sans text-xs xl:text-[13px] text-white/70 font-light leading-relaxed">
                Within 48 hours, you receive a clear plan detailing outcomes, timeline, and investment. We define exactly what the first two weeks of execution will ship.
              </p>
            </div>
          </div>

          {/* ============================================================
              NODE 03: Weekly Execution (Lower-Left Area)
              ============================================================ */}
          <div
            className="absolute z-20 flex items-start gap-4 xl:gap-5 transition-all duration-700 ease-out"
            style={{
              left: '26.5%',
              top: '76%',
              opacity: node3Active ? 1 : 0,
              transform: node3Active ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.94)',
            }}
          >
            {/* White Circular Node */}
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(255,255,255,0.18)] mt-0.5 transition-transform duration-300 hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M9 16l2 2 4-4" />
              </svg>
            </div>

            {/* Text Content */}
            <div className="max-w-[290px] xl:max-w-[330px]">
              <h3 className="font-reckless text-xl font-normal text-white tracking-tight mb-2">
                Weekly Execution
              </h3>
              <p className="font-sans text-xs xl:text-[13px] text-white/70 font-light leading-relaxed">
                We run on a relentless cadence. Every week, you receive a prioritized sprint plan, shipped artifacts (code, design, or GTM assets), and a decision log documenting the “why” behind every move.
              </p>
            </div>
          </div>

          {/* ============================================================
              NODE 04: Weekly deliverables (Right Convergence Area)
              ============================================================ */}
          <div
            className="absolute z-20 flex items-start gap-4 xl:gap-5 transition-all duration-700 ease-out"
            style={{
              left: '70.5%',
              top: '51%',
              opacity: node4Active ? 1 : 0,
              transform: node4Active ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.94)',
            }}
          >
            {/* White Circular Node */}
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(255,255,255,0.18)] mt-0.5 transition-transform duration-300 hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="12" x2="13" y2="12" />
              </svg>
            </div>

            {/* Content & Bullet List */}
            <div className="max-w-[280px]">
              <h3 className="font-reckless text-xl font-normal text-white tracking-tight mb-2">
                Weekly deliverables
              </h3>
              <ul className="font-sans text-xs xl:text-[13px] text-white/70 font-light space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/60 inline-block shrink-0" />
                  <span>Sprint priorities</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/60 inline-block shrink-0" />
                  <span>Shipped work</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/60 inline-block shrink-0" />
                  <span>Decisions logged</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/60 inline-block shrink-0" />
                  <span>Next sprint plan</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* ============================================================
            MOBILE & TABLET VIEW (< 1024px)
            Animated Curved Path & Connected Process Experience
            ============================================================ */}
        <div className="lg:hidden w-full h-full overflow-y-auto px-5 sm:px-10 py-10 sm:py-14 flex flex-col justify-between select-none">
          
          {/* Header */}
          <div className="mb-8">
            <span className="font-mono text-xs text-white/50 tracking-[0.25em] block mb-3 uppercase">
              [ 01001 ]
            </span>
            <h2 className="font-reckless text-3xl sm:text-4xl font-normal text-white leading-tight">
              Build momentum
              <br />
              in days not weeks
            </h2>
          </div>

          {/* Connected Flow with Flowing SVG Curves */}
          <div className="relative my-auto py-2">
            
            {/* Mobile Sweeping Curves SVG Background */}
            <svg
              viewBox="0 0 320 500"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            >
              <defs>
                <linearGradient id="mobCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
                  <stop offset="30%" stopColor="#ffffff" stopOpacity="0.25" />
                  <stop offset="70%" stopColor="#ffffff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
                </linearGradient>
              </defs>

              {/* Base guide flowing curved lines */}
              <path
                d="M 18 20 C 18 60, 90 80, 90 120 C 90 160, 18 180, 18 240 C 18 300, 90 320, 90 370 C 90 420, 18 440, 18 490"
                fill="none"
                stroke="url(#mobCurveGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M 18 20 C 18 70, 130 90, 130 135 C 130 180, 18 200, 18 255 C 18 310, 130 330, 130 385 C 130 435, 18 450, 18 490"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeDasharray="1800"
                strokeDashoffset={1800 * (1 - Math.max(0, Math.min(1, scrollProgress)))}
                opacity="0.4"
              />
            </svg>

            {/* Sequential Flow Items */}
            <div className="relative space-y-7 z-10">
              
              {/* Step 1 */}
              <div
                className="flex items-start gap-4 transition-all duration-500"
                style={{
                  opacity: node1Active ? 1 : 0.45,
                  transform: node1Active ? 'translateX(0)' : 'translateX(-8px)',
                }}
              >
                <div className={`w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 ${
                  node1Active ? 'scale-110' : 'scale-95 opacity-70'
                }`}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 9v4l2.5 2.5" />
                    <path d="M5 3L2 6" />
                    <path d="M22 6l-3-3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-reckless text-lg font-normal text-white mb-1">
                    The 30-Min Jam
                  </h3>
                  <p className="font-sans text-xs text-white/70 font-light leading-relaxed">
                    We ask the hard questions - context, constraints, and “what is actually at stake?” No pitch, just clarity to see if we can move the needle for you.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div
                className="flex items-start gap-4 transition-all duration-500"
                style={{
                  opacity: node2Active ? 1 : 0.45,
                  transform: node2Active ? 'translateX(0)' : 'translateX(-8px)',
                }}
              >
                <div className={`w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 ${
                  node2Active ? 'scale-110' : 'scale-95 opacity-70'
                }`}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M16 3h5v5" />
                    <path d="M4 20L21 3" />
                    <path d="M21 16v5h-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-reckless text-lg font-normal text-white mb-1">
                    The Sprint Plan
                  </h3>
                  <p className="font-sans text-xs text-white/70 font-light leading-relaxed">
                    Within 48 hours, you receive a clear plan detailing outcomes, timeline, and investment. We define exactly what the first two weeks of execution will ship.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div
                className="flex items-start gap-4 transition-all duration-500"
                style={{
                  opacity: node3Active ? 1 : 0.45,
                  transform: node3Active ? 'translateX(0)' : 'translateX(-8px)',
                }}
              >
                <div className={`w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 ${
                  node3Active ? 'scale-110' : 'scale-95 opacity-70'
                }`}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <path d="M9 16l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-reckless text-lg font-normal text-white mb-1">
                    Weekly Execution
                  </h3>
                  <p className="font-sans text-xs text-white/70 font-light leading-relaxed">
                    We run on a relentless cadence. Every week, you receive a prioritized sprint plan, shipped artifacts (code, design, or GTM assets), and a decision log documenting the “why” behind every move.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div
                className="flex items-start gap-4 transition-all duration-500"
                style={{
                  opacity: node4Active ? 1 : 0.45,
                  transform: node4Active ? 'translateX(0)' : 'translateX(-8px)',
                }}
              >
                <div className={`w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 ${
                  node4Active ? 'scale-110' : 'scale-95 opacity-70'
                }`}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-reckless text-lg font-normal text-white mb-1">
                    Weekly deliverables
                  </h3>
                  <ul className="font-sans text-xs text-white/70 font-light space-y-1">
                    <li className="flex items-center gap-1.5">• <span>Sprint priorities</span></li>
                    <li className="flex items-center gap-1.5">• <span>Shipped work</span></li>
                    <li className="flex items-center gap-1.5">• <span>Decisions logged</span></li>
                    <li className="flex items-center gap-1.5">• <span>Next sprint plan</span></li>
                  </ul>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
