import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Stream curves geometry for desktop 1440x820 coordinate space
const CURVES = [
  'M 0 120 C 120 70, 220 50, 310 130 C 400 200, 470 280, 530 335 C 650 430, 800 410, 940 405 C 1080 400, 1260 430, 1440 470',
  'M 0 155 C 130 90, 230 75, 310 130 C 410 205, 480 290, 550 345 C 670 435, 810 412, 940 409 C 1080 406, 1260 440, 1440 485',
  'M 0 200 C 140 130, 230 115, 330 145 C 420 220, 485 305, 540 340 C 680 438, 815 415, 940 413 C 1080 411, 1260 450, 1440 500',
  'M 0 260 C 150 190, 240 180, 350 200 C 430 240, 490 315, 545 348 C 690 440, 820 418, 940 417 C 1080 416, 1260 460, 1440 515',
  'M 0 330 C 160 260, 250 250, 380 270 C 450 310, 510 360, 560 365 C 700 442, 825 420, 940 421 C 1080 422, 1260 470, 1440 530',
  'M 0 410 C 160 350, 260 340, 390 350 C 520 370, 710 443, 940 425 C 1080 427, 1260 480, 1440 545',
  'M 0 500 C 170 450, 270 440, 400 440 C 550 440, 730 445, 940 429 C 1080 432, 1260 490, 1440 560',
  'M 0 590 C 170 560, 270 560, 420 575 C 580 600, 750 460, 940 433 C 1080 437, 1260 500, 1440 575',
  'M 0 670 C 180 660, 280 675, 450 680 C 600 690, 770 480, 940 437 C 1080 442, 1260 510, 1440 590',
  'M 0 740 C 180 735, 290 730, 460 720 C 620 710, 790 500, 940 441 C 1080 447, 1260 520, 1440 605',
  'M 0 800 C 180 800, 300 780, 470 760 C 640 730, 810 520, 940 445 C 1080 452, 1260 530, 1440 620',
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
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  // Activation thresholds
  const headingActive = scrollProgress >= 0.04
  const node1Active = scrollProgress >= 0.16
  const node2Active = scrollProgress >= 0.36
  const node4Active = scrollProgress >= 0.56
  const node3Active = scrollProgress >= 0.74

  return (
    <section
      ref={containerRef}
      id="momentum-section"
      className="relative bg-black text-white selection:bg-brand-green selection:text-black overflow-hidden"
    >
      {/* Sticky Pinned Container */}
      <div
        ref={stickyRef}
        className="w-full h-screen relative flex flex-col justify-between overflow-hidden bg-black select-none"
      >
        {/* ============================================================
            DESKTOP VIEW (Exact 1-to-1 match with Reference Screenshot)
            ============================================================ */}
        <div className="hidden lg:block absolute inset-0 w-full h-full">
          
          {/* Top-Right Header Area: [ 01001 ] Build momentum in days not weeks */}
          <div
            className="absolute top-10 xl:top-14 right-10 xl:right-20 z-20 flex items-start gap-4 xl:gap-6 transition-all duration-700 ease-out"
            style={{
              opacity: headingActive ? 1 : 0,
              transform: headingActive ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            {/* Monospace Section Number */}
            <span className="font-mono text-xs md:text-sm text-white/50 tracking-[0.25em] pt-2 xl:pt-3">
              [ 01001 ]
            </span>

            {/* Editorial Heading */}
            <h2 className="font-reckless text-4xl sm:text-5xl lg:text-[56px] xl:text-[68px] 2xl:text-[76px] font-normal text-white leading-[1.08] tracking-tight">
              Build momentum
              <br />
              in days not weeks
            </h2>
          </div>

          {/* ============================================================
              SVG FLOWING CURVES SYSTEM
              ============================================================ */}
          <svg
            viewBox="0 0 1440 820"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Subtle linear gradient along the flowing curves */}
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0.16" />
                <stop offset="65%" stopColor="#ffffff" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
              </linearGradient>

              {/* Shimmer pulse gradient for live momentum motion */}
              <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Static Subtle Flow Curves */}
            {CURVES.map((d, idx) => (
              <path
                key={`base-curve-${idx}`}
                d={d}
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="1.15"
                strokeLinecap="round"
                className="transition-opacity duration-1000"
                style={{
                  opacity: 0.15 + (idx % 4) * 0.05,
                }}
              />
            ))}

            {/* Scroll-Revealed & Flowing Accent Paths */}
            {CURVES.map((d, idx) => {
              const pathProg = Math.max(0, Math.min(1, (scrollProgress - 0.05) / 0.85))
              return (
                <path
                  key={`anim-curve-${idx}`}
                  d={d}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="2200"
                  strokeDashoffset={2200 * (1 - pathProg)}
                  opacity={0.35 + (idx % 3) * 0.1}
                  className="transition-all duration-300 ease-out"
                />
              )
            })}

            {/* Subtle Ambient Pulse Paths */}
            {CURVES.filter((_, i) => i % 3 === 0).map((d, idx) => (
              <path
                key={`ambient-curve-${idx}`}
                d={d}
                fill="none"
                stroke="url(#shimmerGradient)"
                strokeWidth="1.6"
                strokeDasharray="160 800"
                className="animate-momentum-flow"
                style={{
                  animationDuration: `${12 + idx * 4}s`,
                  animationDelay: `${idx * 2.5}s`,
                }}
              />
            ))}
          </svg>

          {/* ============================================================
              POINT 01: The 30-Min Jam (Upper-Left Area)
              ============================================================ */}
          <div
            className="absolute z-20 flex items-start gap-4 transition-all duration-700 ease-out"
            style={{
              left: '21.5%',
              top: '14.5%',
              opacity: node1Active ? 1 : 0,
              transform: node1Active ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.92)',
            }}
          >
            {/* White Circular Icon */}
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2.5 2.5" />
                <path d="M5 3L2 6" />
                <path d="M22 6l-3-3" />
                <path d="M10 2h4" />
              </svg>
            </div>

            {/* Content */}
            <div className="max-w-[290px] xl:max-w-[320px]">
              <h3 className="font-sans text-base xl:text-lg font-medium text-white tracking-tight mb-1.5">
                The 30-Min Jam
              </h3>
              <p className="font-sans text-xs xl:text-[13px] text-white/60 font-light leading-relaxed">
                We ask the hard questions — context, constraints, and "what is actually at stake?" No pitch, just clarity to see if we can move the needle for you.
              </p>
            </div>
          </div>

          {/* ============================================================
              POINT 02: The Sprint Plan (Upper-Middle Area)
              ============================================================ */}
          <div
            className="absolute z-20 flex items-start gap-4 transition-all duration-700 ease-out"
            style={{
              left: '36.8%',
              top: '39%',
              opacity: node2Active ? 1 : 0,
              transform: node2Active ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.92)',
            }}
          >
            {/* White Circular Icon */}
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5" />
                <path d="M4 20L21 3" />
                <path d="M21 16v5h-5" />
                <path d="M15 15l6 6" />
                <path d="M4 4l5 5" />
              </svg>
            </div>

            {/* Content */}
            <div className="max-w-[290px] xl:max-w-[320px]">
              <h3 className="font-sans text-base xl:text-lg font-medium text-white tracking-tight mb-1.5">
                The Sprint Plan
              </h3>
              <p className="font-sans text-xs xl:text-[13px] text-white/60 font-light leading-relaxed">
                Within 48 hours, you receive a clear plan detailing outcomes, timeline, and investment. We define exactly what the first two weeks of execution will ship.
              </p>
            </div>
          </div>

          {/* ============================================================
              POINT 04: Weekly Execution (Lower-Left / Middle Area)
              ============================================================ */}
          <div
            className="absolute z-20 flex items-start gap-4 transition-all duration-700 ease-out"
            style={{
              left: '31.2%',
              top: '80%',
              opacity: node4Active ? 1 : 0,
              transform: node4Active ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.92)',
            }}
          >
            {/* White Circular Icon */}
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M9 16l2 2 4-4" />
              </svg>
            </div>

            {/* Content */}
            <div className="max-w-[290px] xl:max-w-[340px]">
              <h3 className="font-sans text-base xl:text-lg font-medium text-white tracking-tight mb-1.5">
                Weekly Execution
              </h3>
              <p className="font-sans text-xs xl:text-[13px] text-white/60 font-light leading-relaxed">
                We run on a relentless cadence. Every week, you receive a prioritized sprint plan, shipped artifacts (code, design, or GTM assets), and a decision log documenting the "why" behind every move.
              </p>
            </div>
          </div>

          {/* ============================================================
              POINT 03: Weekly deliverables (Right-Middle Convergence Area)
              ============================================================ */}
          <div
            className="absolute z-20 flex items-start gap-4 transition-all duration-700 ease-out"
            style={{
              left: '65.3%',
              top: '49%',
              opacity: node3Active ? 1 : 0,
              transform: node3Active ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.92)',
            }}
          >
            {/* White Circular Icon */}
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            {/* Content & Bullet List */}
            <div className="max-w-[280px]">
              <h3 className="font-sans text-base xl:text-lg font-medium text-white tracking-tight mb-2">
                Weekly deliverables
              </h3>
              <ul className="font-sans text-xs xl:text-[13px] text-white/70 font-light space-y-1">
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
            Clean, Connected Vertical Flow Adaptive Experience
            ============================================================ */}
        <div className="lg:hidden w-full h-full overflow-y-auto px-6 py-12 flex flex-col justify-between">
          
          {/* Header */}
          <div className="mb-10">
            <span className="font-mono text-xs text-white/50 tracking-[0.25em] block mb-3">
              [ 01001 ]
            </span>
            <h2 className="font-reckless text-3xl sm:text-4xl font-normal text-white leading-tight">
              Build momentum
              <br />
              in days not weeks
            </h2>
          </div>

          {/* Sequential Flow List */}
          <div className="relative space-y-8 pl-8 my-auto border-l border-white/15 ml-3">
            
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="13" r="8" />
                  <path d="M12 9v4l2.5 2.5" />
                </svg>
              </div>
              <h3 className="font-sans text-base font-medium text-white mb-1">
                The 30-Min Jam
              </h3>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                We ask the hard questions — context, constraints, and "what is actually at stake?" No pitch, just clarity to see if we can move the needle for you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M16 3h5v5" />
                  <path d="M4 20L21 3" />
                  <path d="M21 16v5h-5" />
                </svg>
              </div>
              <h3 className="font-sans text-base font-medium text-white mb-1">
                The Sprint Plan
              </h3>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                Within 48 hours, you receive a clear plan detailing outcomes, timeline, and investment. We define exactly what the first two weeks of execution will ship.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="font-sans text-base font-medium text-white mb-1">
                Weekly deliverables
              </h3>
              <ul className="font-sans text-xs text-white/70 space-y-1">
                <li>• Sprint priorities</li>
                <li>• Shipped work</li>
                <li>• Decisions logged</li>
                <li>• Next sprint plan</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M9 16l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-sans text-base font-medium text-white mb-1">
                Weekly Execution
              </h3>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                We run on a relentless cadence. Every week, you receive a prioritized sprint plan, shipped artifacts, and a decision log documenting the "why" behind every move.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
