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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [trackerPos, setTrackerPos] = useState({ x: 0, y: 200 })

  const pathDefinition =
    'M 0 200 C 45 200, 75 40, 150 40 C 225 40, 255 200, 300 200 C 345 200, 375 40, 450 40 C 525 40, 555 200, 600 200 C 645 200, 675 40, 750 40 C 825 40, 855 200, 900 200 C 945 200, 975 40, 1050 40 C 1125 40, 1155 200, 1200 200'

  useEffect(() => {
    const section = sectionRef.current
    const activePath = activePathRef.current
    if (!section || !activePath) return

    const totalLength = activePath.getTotalLength()
    activePath.style.strokeDasharray = `${totalLength}`
    activePath.style.strokeDashoffset = `${totalLength}`

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

          // Update SVG active path drawing
          const offset = totalLength * (1 - prog)
          activePath.style.strokeDashoffset = `${offset}`

          // Calculate moving progress point coordinates
          if (activePath) {
            const pt = activePath.getPointAtLength(prog * totalLength)
            setTrackerPos({ x: pt.x, y: pt.y })
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
      id="our-approach-section"
      className="relative bg-[#F2F1ED] text-black overflow-hidden"
    >
      {/* Sticky Pinned Container */}
      <div
        ref={stickyRef}
        className="w-full min-h-screen flex flex-col justify-between py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-14 lg:px-20 max-w-[1440px] mx-auto select-none"
      >
        {/* ============================================================
            TOP HEADER AREA
            Left: Intro paragraph
            Right: [ 01000 ] Our Approach
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
            <span className="font-mono text-[11px] sm:text-xs md:text-sm text-[#2F6F5E] font-medium tracking-[0.2em] uppercase">
              [ 01000 ]
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
                stroke="#c8c6bf"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Progressive animated active path */}
              <path
                ref={activePathRef}
                d={pathDefinition}
                fill="none"
                stroke="#2F6F5E"
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
                  fill="#2F6F5E"
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
                          ? 'border-[1.5px] border-[#2F6F5E] text-[#2F6F5E] scale-110'
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
            MOBILE: RESPONSIVE PROCESS STAGES (< 768px)
            ============================================================ */}
        <div className="block md:hidden w-full my-4 sm:my-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.num}
                className={`p-4 sm:p-5 rounded-[2px] border transition-all duration-300 ${
                  nodeStates[idx]
                    ? 'border-[#2F6F5E] bg-white shadow-sm'
                    : 'border-black/10 bg-white/70'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#2F6F5E] text-white flex items-center justify-center font-mono text-[11px] font-bold">
                    {stage.num}
                  </span>
                  <h3 className="font-sans text-base font-bold text-black tracking-tight">
                    {stage.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-black/75 font-light leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
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
