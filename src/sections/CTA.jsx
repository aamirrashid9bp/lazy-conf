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

  // Mobile single curve refs and dynamic path state
  const mobFlowRef = useRef(null)
  const mobCircle1Ref = useRef(null)
  const mobCircle2Ref = useRef(null)
  const mobCircle3Ref = useRef(null)
  const mobCircle4Ref = useRef(null)
  const mobPathRef = useRef(null)
  const [mobPathD, setMobPathD] = useState(
    'M 18 20 C 32 60, 32 90, 18 130 C 6 170, 6 200, 18 245 C 32 290, 32 330, 18 375'
  )
  const [mobPathLength, setMobPathLength] = useState(600)

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

  // Calculate dynamic pixel-perfect single continuous curve between node centers on mobile
  const updateMobilePath = () => {
    const container = mobFlowRef.current
    const c1 = mobCircle1Ref.current
    const c2 = mobCircle2Ref.current
    const c3 = mobCircle3Ref.current
    const c4 = mobCircle4Ref.current
    if (!container || !c1 || !c2 || !c3 || !c4) return

    const contRect = container.getBoundingClientRect()
    const r1 = c1.getBoundingClientRect()
    const r2 = c2.getBoundingClientRect()
    const r3 = c3.getBoundingClientRect()
    const r4 = c4.getBoundingClientRect()

    const p1 = {
      x: r1.left + r1.width / 2 - contRect.left,
      y: r1.top + r1.height / 2 - contRect.top,
    }
    const p2 = {
      x: r2.left + r2.width / 2 - contRect.left,
      y: r2.top + r2.height / 2 - contRect.top,
    }
    const p3 = {
      x: r3.left + r3.width / 2 - contRect.left,
      y: r3.top + r3.height / 2 - contRect.top,
    }
    const p4 = {
      x: r4.left + r4.width / 2 - contRect.left,
      y: r4.top + r4.height / 2 - contRect.top,
    }

    const dy1 = p2.y - p1.y
    const dy2 = p3.y - p2.y
    const dy3 = p4.y - p3.y

    // Smooth subtle S-curves connecting node centers:
    // Node 1 -> Node 2: bows slightly to the right (within icon width, away from text)
    // Node 2 -> Node 3: bows slightly to the left
    // Node 3 -> Node 4: bows slightly to the right
    const offsetRight = 14
    const offsetLeft = 12

    const d = [
      `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`,
      `C ${(p1.x + offsetRight).toFixed(1)} ${(p1.y + dy1 * 0.35).toFixed(1)}, ${(p2.x + offsetRight).toFixed(1)} ${(p2.y - dy1 * 0.35).toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`,
      `C ${(p2.x - offsetLeft).toFixed(1)} ${(p2.y + dy2 * 0.35).toFixed(1)}, ${(p3.x - offsetLeft).toFixed(1)} ${(p3.y - dy2 * 0.35).toFixed(1)}, ${p3.x.toFixed(1)} ${p3.y.toFixed(1)}`,
      `C ${(p3.x + offsetRight).toFixed(1)} ${(p3.y + dy3 * 0.35).toFixed(1)}, ${(p4.x + offsetRight).toFixed(1)} ${(p4.y - dy3 * 0.35).toFixed(1)}, ${p4.x.toFixed(1)} ${p4.y.toFixed(1)}`,
    ].join(' ')

    setMobPathD(d)
  }

  // Update mobile curve on mount, resize, and layout changes
  useEffect(() => {
    updateMobilePath()

    const container = mobFlowRef.current
    if (!container) return

    let ro = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateMobilePath()
      })
      ro.observe(container)
      if (mobCircle1Ref.current) ro.observe(mobCircle1Ref.current)
      if (mobCircle2Ref.current) ro.observe(mobCircle2Ref.current)
      if (mobCircle3Ref.current) ro.observe(mobCircle3Ref.current)
      if (mobCircle4Ref.current) ro.observe(mobCircle4Ref.current)
    }

    window.addEventListener('resize', updateMobilePath)
    const timer = setTimeout(updateMobilePath, 150)

    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', updateMobilePath)
      clearTimeout(timer)
    }
  }, [])

  // Calculate exact total length for SVG stroke drawing animation
  useEffect(() => {
    if (mobPathRef.current) {
      try {
        const len = mobPathRef.current.getTotalLength()
        if (len > 0) {
          setMobPathLength(len)
        }
      } catch (e) {
        // fallback
      }
    }
  }, [mobPathD])

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

          {/* Connected Flow with Single Continuous Curved Path */}
          <div ref={mobFlowRef} className="relative my-auto py-2">
            
            {/* Mobile Single Continuous Curved Path SVG Background */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            >
              <defs>
                <linearGradient id="mobSingleCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                  <stop offset="25%" stopColor="#ffffff" stopOpacity="0.75" />
                  <stop offset="75%" stopColor="#ffffff" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Exact ONE Single Continuous Smooth SVG Curve */}
              <path
                ref={mobPathRef}
                d={mobPathD}
                fill="none"
                stroke="url(#mobSingleCurveGrad)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={mobPathLength}
                strokeDashoffset={mobPathLength * (1 - pathDrawProg)}
                className="transition-all duration-300 ease-out"
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
                <div
                  ref={mobCircle1Ref}
                  className={`w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 ${
                    node1Active ? 'scale-110' : 'scale-95 opacity-70'
                  }`}
                >
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
                <div
                  ref={mobCircle2Ref}
                  className={`w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 ${
                    node2Active ? 'scale-110' : 'scale-95 opacity-70'
                  }`}
                >
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
                <div
                  ref={mobCircle3Ref}
                  className={`w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 ${
                    node3Active ? 'scale-110' : 'scale-95 opacity-70'
                  }`}
                >
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
                <div
                  ref={mobCircle4Ref}
                  className={`w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(255,255,255,0.2)] mt-0.5 transition-transform duration-300 ${
                    node4Active ? 'scale-110' : 'scale-95 opacity-70'
                  }`}
                >
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
