import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    num: '01',
    title: 'Diagnose',
    desc: 'We align on the goal, constraints, risks, and what “success” means.',
  },
  {
    num: '02',
    title: 'De-risk',
    desc: 'We validate assumptions early - customers, pricing, feasibility, distribution.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Weekly cadence. Clear owners. High craft. No chaos.',
  },
  {
    num: '04',
    title: 'Launch + Grow',
    desc: 'We ship, measure, learn, and iterate until it sticks.',
  },
]

export default function Founders() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const pathRef = useRef(null)
  const activePathRef = useRef(null)
  const mobileActivePathRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [trackerPos, setTrackerPos] = useState({ x: 0, y: 200 })
  const [mobileTrackerPos, setMobileTrackerPos] = useState({ x: 32, y: 60 })

  const pathDefinition =
    'M 0 200 C 45 200, 75 40, 150 40 C 225 40, 255 200, 300 200 C 345 200, 375 40, 450 40 C 525 40, 555 200, 600 200 C 645 200, 675 40, 750 40 C 825 40, 855 200, 900 200 C 945 200, 975 40, 1050 40 C 1125 40, 1155 200, 1200 200'

  const mobilePathDefinition =
    'M 32 15 C 32 35, 32 45, 32 60 C 32 105, 140 100, 140 125 C 140 150, 32 145, 32 190 C 32 235, 140 230, 140 255 C 140 280, 32 275, 32 320 C 32 365, 140 360, 140 385 C 140 410, 32 405, 32 450 C 32 480, 32 505, 32 530'

  useEffect(() => {
    const section = sectionRef.current
    const activePath = activePathRef.current
    const mobileActivePath = mobileActivePathRef.current
    if (!section) return

    let totalLength = 0
    if (activePath) {
      totalLength = activePath.getTotalLength()
      activePath.style.strokeDasharray = `${totalLength}`
      activePath.style.strokeDashoffset = `${totalLength}`
    }

    let mobileTotalLength = 0
    if (mobileActivePath) {
      mobileTotalLength = mobileActivePath.getTotalLength()
      mobileActivePath.style.strokeDasharray = `${mobileTotalLength}`
      mobileActivePath.style.strokeDashoffset = `${mobileTotalLength}`
    }

    const ctx = gsap.context(() => {
      // Pinned scroll-trigger for smooth interactive progression
      ScrollTrigger.create({
        trigger: section,
        pin: stickyRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = Math.max(0, Math.min(1, self.progress))
          setScrollProgress(prog)

          // Update SVG desktop active path drawing
          if (activePath && totalLength > 0) {
            const offset = totalLength * (1 - prog)
            activePath.style.strokeDashoffset = `${offset}`
            const pt = activePath.getPointAtLength(prog * totalLength)
            setTrackerPos({ x: pt.x, y: pt.y })
          }

          // Update SVG mobile active path drawing
          if (mobileActivePath && mobileTotalLength > 0) {
            const mOffset = mobileTotalLength * (1 - prog)
            mobileActivePath.style.strokeDashoffset = `${mOffset}`
            const mPt = mobileActivePath.getPointAtLength(prog * mobileTotalLength)
            setMobileTrackerPos({ x: mPt.x, y: mPt.y })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Node active thresholds (peaks are at prog = 0.125, 0.375, 0.625, 0.875)
  const isNode1Active = scrollProgress >= 0.12
  const isNode2Active = scrollProgress >= 0.37
  const isNode3Active = scrollProgress >= 0.62
  const isNode4Active = scrollProgress >= 0.87

  const nodeStates = [isNode1Active, isNode2Active, isNode3Active, isNode4Active]

  return (
    <section
      ref={sectionRef}
      id="founders-loop-section"
      className="relative bg-[#F5F3EE] text-black overflow-hidden"
    >
      {/* Sticky Pinned Container */}
      <div
        ref={stickyRef}
        className="w-full min-h-screen flex flex-col justify-between py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-14 lg:px-20 max-w-[1440px] mx-auto select-none"
      >
        {/* ============================================================
            TOP HEADER AREA
            Left: Intro paragraph
            Right: [ APPROACH ] Our Approach
            ============================================================ */}
        <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-6 md:gap-12 mb-8 sm:mb-12 md:mb-16">
          {/* Left: Intro statement */}
          <div className="max-w-md">
            <p className="font-sans text-xs sm:text-sm md:text-[15px] text-black/75 font-light leading-relaxed">
              We use a simple loop to turn chaos into consistent weekly progress, creating
              the momentum needed to achieve better outcomes.
            </p>
          </div>

          {/* Right: Section marker and Heading */}
          <div className="flex items-baseline gap-3 sm:gap-4 md:gap-6 shrink-0">
            <span className="font-mono text-[11px] sm:text-xs md:text-sm text-[#1B3D33] font-medium tracking-[0.2em] uppercase">
              [ APPROACH ]
            </span>
            <h2 className="font-reckless text-3xl sm:text-4xl md:text-5xl lg:text-[68px] font-normal text-black tracking-tight leading-none">
              Our Approach
            </h2>
          </div>
        </div>

        {/* ============================================================
            DESKTOP & TABLET: FOUR PROCESS STAGES & CONNECTED CURVED PATH (>= 768px)
            ============================================================ */}
        <div className="hidden md:block relative w-full my-auto pt-4 sm:pt-6 pb-8 sm:pb-12">
          
          {/* Stage Titles Row */}
          <div className="grid grid-cols-4 w-full mb-6 sm:mb-8 md:mb-12">
            {STAGES.map((stage, idx) => (
              <div key={stage.num} className="px-1.5 sm:px-3 md:px-6">
                <h3
                  className={`font-sans text-xs sm:text-base md:text-xl lg:text-2xl font-normal tracking-tight transition-colors duration-300 ${
                    nodeStates[idx] ? 'text-black font-medium' : 'text-black/80'
                  }`}
                >
                  {stage.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Vertical Divider Lines */}
          <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none grid grid-cols-4">
            <div className="border-l border-black/10 h-full" />
            <div className="border-l border-black/10 h-full" />
            <div className="border-l border-black/10 h-full" />
            <div className="border-l border-r border-black/10 h-full" />
          </div>

          {/* ============================================================
              SVG CONTINUOUS REPEATING CURVED PATH
              ============================================================ */}
          <div className="relative w-full h-[140px] sm:h-[180px] md:h-[240px] my-2">
            <svg
              viewBox="0 0 1200 240"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              {/* Subtle background dotted path */}
              <path
                ref={pathRef}
                d={pathDefinition}
                fill="none"
                stroke="#9ca3af"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Progressive animated active path */}
              <path
                ref={activePathRef}
                d={pathDefinition}
                fill="none"
                stroke="#1B3D33"
                strokeWidth="1.75"
                strokeLinecap="round"
              />

              {/* Bottom Connection Dots (at dividers x = 300, 600, 900) */}
              <circle cx="0" cy="200" r="2.5" fill="#111111" />
              <circle cx="300" cy="200" r="2.5" fill="#111111" />
              <circle cx="600" cy="200" r="2.5" fill="#111111" />
              <circle cx="900" cy="200" r="2.5" fill="#111111" />
              <circle cx="1200" cy="200" r="2.5" fill="#111111" />

              {/* Moving Progress Tracker Point */}
              {scrollProgress > 0.01 && (
                <circle
                  cx={trackerPos.x}
                  cy={trackerPos.y}
                  r="4"
                  fill="#1B3D33"
                  className="transition-all duration-75"
                />
              )}
            </svg>

            {/* Circular Numbered Nodes positioned exactly over the 4 arc peaks */}
            <div className="absolute inset-0 pointer-events-none">
              {STAGES.map((stage, idx) => {
                const leftPercent = 12.5 + idx * 25
                const isActive = nodeStates[idx]
                return (
                  <div
                    key={stage.num}
                    style={{ left: `${leftPercent}%` }}
                    className="absolute top-[16.6%] -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isActive
                          ? 'border-[1.5px] border-[#1B3D33] text-[#1B3D33] scale-110'
                          : 'border border-black/20 text-black/90'
                      }`}
                    >
                      <span className="font-mono text-[10px] sm:text-xs font-bold">
                        {stage.num}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stage Descriptions Row (Below curves) */}
          <div className="grid grid-cols-4 w-full mt-6 sm:mt-8 md:mt-12">
            {STAGES.map((stage, idx) => (
              <div key={stage.num} className="px-1.5 sm:px-3 md:px-6">
                <p
                  className={`font-sans text-[10px] sm:text-xs md:text-sm font-light leading-relaxed transition-colors duration-300 ${
                    nodeStates[idx] ? 'text-black/85' : 'text-black/60'
                  }`}
                >
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ============================================================
            MOBILE: RESPONSIVE PROCESS STAGES WITH FLOWING CURVED PATH (< 768px)
            ============================================================ */}
        <div className="block md:hidden relative w-full my-4 sm:my-6 py-2">
          
          {/* Vertical Flowing SVG Curve System */}
          <div className="relative w-full h-[540px]">
            
            {/* Background & Animated Active SVG Curves */}
            <svg
              viewBox="0 0 320 540"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
            >
              {/* Subtle background dotted curved path */}
              <path
                d={mobilePathDefinition}
                fill="none"
                stroke="#9ca3af"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Progressive animated active path */}
              <path
                ref={mobileActivePathRef}
                d={mobilePathDefinition}
                fill="none"
                stroke="#1B3D33"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Loop connection dots along the spine */}
              <circle cx="32" cy="15" r="2.5" fill="#111111" />
              <circle cx="32" cy="60" r="2.5" fill="#111111" />
              <circle cx="32" cy="190" r="2.5" fill="#111111" />
              <circle cx="32" cy="320" r="2.5" fill="#111111" />
              <circle cx="32" cy="450" r="2.5" fill="#111111" />
              <circle cx="32" cy="530" r="2.5" fill="#111111" />

              {/* Moving Progress Tracker Point */}
              {scrollProgress > 0.01 && (
                <circle
                  cx={mobileTrackerPos.x}
                  cy={mobileTrackerPos.y}
                  r="4"
                  fill="#1B3D33"
                  className="transition-all duration-75"
                />
              )}
            </svg>

            {/* 4 Process Nodes + Connected Content positioned vertically along the path */}
            <div className="absolute inset-0 flex flex-col justify-between py-3 pointer-events-auto">
              {STAGES.map((stage, idx) => {
                const isActive = nodeStates[idx]
                return (
                  <div
                    key={stage.num}
                    className="relative flex items-start gap-4 pl-2 pr-2 transition-all duration-300"
                  >
                    {/* Numbered Node sitting directly on the curve (x = 32px line) */}
                    <div
                      className={`w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center transition-all duration-300 shadow-sm relative z-10 -ml-1 mt-0.5 ${
                        isActive
                          ? 'border-[1.5px] border-[#1B3D33] text-[#1B3D33] scale-110'
                          : 'border border-black/20 text-black/90'
                      }`}
                    >
                      <span className="font-mono text-xs font-bold">{stage.num}</span>
                    </div>

                    {/* Stage Title and Description */}
                    <div
                      className={`flex-1 p-3 rounded-[2px] transition-all duration-300 ${
                        isActive
                          ? 'bg-white shadow-sm border border-[#1B3D33]/40'
                          : 'bg-white/60 border border-black/5'
                      }`}
                    >
                      <h3
                        className={`font-sans text-sm sm:text-base tracking-tight transition-colors duration-200 ${
                          isActive ? 'text-black font-semibold' : 'text-black/85 font-medium'
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <p
                        className={`font-sans text-xs sm:text-[13px] font-light leading-relaxed mt-1 transition-colors duration-200 ${
                          isActive ? 'text-black/85' : 'text-black/60'
                        }`}
                      >
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

        </div>

        {/* Bottom subtle indicator */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-mono text-black/30 pt-4 border-t border-black/[0.06]">
          <span>PHASE 01 — 04</span>
          <span>SCROLL TO ADVANCE PROGRESS</span>
        </div>

      </div>
    </section>
  )
}
