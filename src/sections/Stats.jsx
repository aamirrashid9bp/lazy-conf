import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const stat1Ref = useRef(null)
  const stat2Ref = useRef(null)
  const stat3Ref = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // 1. Heading reveal animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // 2. Staggered Stat Items reveal
      const statItems = [stat1Ref.current, stat2Ref.current, stat3Ref.current]
      gsap.fromTo(
        statItems,
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      // 3. Counter Animation for Numbers
      const counters = section.querySelectorAll('[data-counter]')
      counters.forEach((el) => {
        const rawTarget = el.getAttribute('data-counter') || ''
        const targetNum = parseInt(rawTarget.replace(/[^0-9]/g, ''), 10)
        const suffix = rawTarget.replace(/[0-9]/g, '')

        if (isNaN(targetNum)) return

        const counterObj = { val: 0 }
        ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(counterObj, {
              val: targetNum,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = `${Math.floor(counterObj.val)}${suffix}`
              },
            })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="stats-section"
      className="section_home_stats relative bg-[#F5F3EE] text-black pt-28 pb-28 sm:pt-36 sm:pb-36 md:pt-40 md:pb-40 lg:pt-44 lg:pb-44 overflow-hidden border-b border-black/[0.08] select-none"
    >
      {/* Editorial Architectural Background Grid Lines matching Home section */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Full-width Vertical Column Guidelines */}
        <div className="w-full h-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          <div className="border-r border-black/[0.06] h-full" />
          <div className="border-r border-black/[0.06] h-full" />
          <div className="border-r border-black/[0.06] h-full" />
          <div className="hidden sm:block border-r border-black/[0.06] h-full" />
          <div className="hidden md:block border-r border-black/[0.06] h-full" />
          <div className="hidden lg:block border-r border-black/[0.06] h-full" />
          <div className="hidden xl:block border-r border-black/[0.06] h-full" />
        </div>

        {/* Full-width Horizontal Editorial Guidelines */}
        <div className="absolute inset-0 flex flex-col justify-evenly pointer-events-none">
          <div className="w-full h-px bg-black/[0.06]" />
          <div className="w-full h-px bg-black/[0.06]" />
          <div className="w-full h-px bg-black/[0.06]" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* Main Canvas with Asymmetric Editorial Layout */}
        <div className="relative min-h-0 lg:min-h-[660px] xl:min-h-[720px] flex flex-col lg:block">
          
          {/* TOP LEFT: Technical Section Label & Editorial Serif Title */}
          <div
            ref={headingRef}
            className="lg:absolute lg:top-0 lg:left-0 max-w-xl mb-12 sm:mb-16 lg:mb-0"
          >
            <div className="mb-4 sm:mb-6">
              <span className="font-mono text-xs sm:text-[13px] text-black/80 font-medium tracking-[0.2em] uppercase inline-block">
                [ <span data-scramble="">00101</span> ]
              </span>
            </div>
            <h2 className="font-reckless text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-normal leading-[1.06] tracking-tight text-black">
              Execution By
              <br />
              Numbers
            </h2>
          </div>

          {/* STAT 1 (Upper Right): 12+ Years of experience */}
          <div
            ref={stat1Ref}
            className="lg:absolute lg:top-0 lg:left-[55%] xl:left-[58%] flex items-center gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-0 group"
          >
            {/* Square Image Container */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 aspect-square shrink-0 rounded-[2px] overflow-hidden bg-[#241f3d]/10 shadow-sm border border-black/5">
              <img
                src="/stats_newtons_cradle.jpg"
                alt="Newton's cradle showing momentum transfer"
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle Indigo/Purple Tint Overlay */}
              <div className="absolute inset-0 bg-[#342e56]/30 mix-blend-multiply pointer-events-none" />
              {/* Subtle Green "+" Accent (Bottom Right) */}
              <span className="absolute bottom-2.5 right-2.5 font-mono text-xs sm:text-sm text-[#4ade80] font-bold select-none leading-none drop-shadow-sm">
                +
              </span>
            </div>

            {/* Statistic Number and Label */}
            <div className="flex flex-col justify-center">
              <div
                data-counter="12+"
                className="font-reckless text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-normal text-black leading-none tracking-tight mb-1 sm:mb-2"
              >
                12+
              </div>
              <p className="font-sans text-xs sm:text-sm md:text-[15px] text-black/75 font-light tracking-normal leading-snug">
                Years of experience
              </p>
            </div>
          </div>

          {/* STAT 2 (Center / Middle): 23+ Startups supported */}
          <div
            ref={stat2Ref}
            className="lg:absolute lg:top-[38%] xl:top-[40%] lg:left-[35%] xl:left-[37%] flex items-center gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-0 group"
          >
            {/* Square Image Container */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 aspect-square shrink-0 rounded-[2px] overflow-hidden bg-[#241f3d]/10 shadow-sm border border-black/5">
              <img
                src="/stats_puzzle.jpg"
                alt="Puzzle pieces fitting into place"
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle Indigo/Purple Tint Overlay */}
              <div className="absolute inset-0 bg-[#342e56]/30 mix-blend-multiply pointer-events-none" />
            </div>

            {/* Statistic Number and Label */}
            <div className="flex flex-col justify-center">
              <div
                data-counter="23+"
                className="font-reckless text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-normal text-black leading-none tracking-tight mb-1 sm:mb-2"
              >
                23+
              </div>
              <p className="font-sans text-xs sm:text-sm md:text-[15px] text-black/75 font-light tracking-normal leading-snug">
                Startups supported
              </p>
            </div>
          </div>

          {/* STAT 3 (Lower Right): 51+ Weeks of shipping */}
          <div
            ref={stat3Ref}
            className="lg:absolute lg:top-[68%] xl:top-[70%] lg:left-[67%] xl:left-[69%] flex items-center gap-4 sm:gap-6 group"
          >
            {/* Square Image Container */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 aspect-square shrink-0 rounded-[2px] overflow-hidden bg-[#241f3d]/10 shadow-sm border border-black/5">
              <img
                src="/stats_dominoes.jpg"
                alt="Dominoes falling in rhythm"
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle Indigo/Purple Tint Overlay */}
              <div className="absolute inset-0 bg-[#342e56]/30 mix-blend-multiply pointer-events-none" />
              {/* Subtle Green "+" Accent (Bottom Left) */}
              <span className="absolute bottom-2.5 left-2.5 font-mono text-xs sm:text-sm text-[#4ade80] font-bold select-none leading-none drop-shadow-sm">
                +
              </span>
            </div>

            {/* Statistic Number and Label */}
            <div className="flex flex-col justify-center">
              <div
                data-counter="51+"
                className="font-reckless text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-normal text-black leading-none tracking-tight mb-1 sm:mb-2"
              >
                51+
              </div>
              <p className="font-sans text-xs sm:text-sm md:text-[15px] text-black/75 font-light tracking-normal leading-snug">
                Weeks of shipping
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
