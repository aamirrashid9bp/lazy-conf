import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Geometric 8-point constellation star icon shown in the reference screenshot
function ConstellationIcon({ className = 'w-9 h-9' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} text-white/80 transition-transform duration-700 group-hover:rotate-90`}
    >
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
      <line x1="20" y1="20" x2="20" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="20" y1="20" x2="20" y2="34" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="20" y1="20" x2="6" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="20" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="20" y1="20" x2="10" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="20" y1="20" x2="30" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="20" y1="20" x2="30" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="20" y1="20" x2="10" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="20" cy="6" r="1.5" fill="currentColor" />
      <circle cx="20" cy="34" r="1.5" fill="currentColor" />
      <circle cx="6" cy="20" r="1.5" fill="currentColor" />
      <circle cx="34" cy="20" r="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="30" cy="30" r="1.5" fill="currentColor" />
      <circle cx="30" cy="10" r="2" fill="#1B3D33" />
      <circle cx="10" cy="30" r="1.5" fill="currentColor" />
    </svg>
  )
}

function FoundersCollage() {
  return (
    <div className="relative w-full h-[240px] sm:h-[290px] md:h-[340px] bg-[#0c0e0d] overflow-hidden rounded-[1px]">
      <div className="grid grid-cols-7 h-full w-full gap-[3px] p-2">
        <div className="h-[75%] self-end bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
            alt="Founder profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[90%] self-center bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
            alt="Founder profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[100%] self-start bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
            alt="Founder profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[85%] self-center bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
            alt="Founder profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[95%] self-end bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80"
            alt="Founder profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[80%] self-start bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80"
            alt="Founder profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[70%] self-center bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80"
            alt="Founder profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[#1B3D33] text-4xl sm:text-5xl font-extralight select-none transition-transform duration-500 group-hover:scale-110">
          +
        </span>
      </div>
    </div>
  )
}

function CXOsCollage() {
  return (
    <div className="relative w-full h-[240px] sm:h-[290px] md:h-[340px] bg-[#0c0e0d] overflow-hidden rounded-[1px]">
      <div className="grid grid-cols-6 h-full w-full gap-[3px] p-2">
        <div className="h-[90%] self-center bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80"
            alt="Leader profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[80%] self-start bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80"
            alt="Leader profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[100%] self-end bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
            alt="Leader profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[85%] self-center bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80"
            alt="Leader profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[95%] self-start bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80"
            alt="Leader profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="h-[75%] self-end bg-[#181a19] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80"
            alt="Leader profile"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[#1B3D33] text-4xl sm:text-5xl font-extralight select-none transition-transform duration-500 group-hover:scale-110">
          +
        </span>
      </div>
    </div>
  )
}

export default function TwoBuilders() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        '.tb-marker',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
      tl.fromTo(
        '.tb-title',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      tl.fromTo(
        '.tb-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
      tl.fromTo(
        '.tb-card',
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about-us-section"
      className="relative bg-black text-white py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* Background Architectural Gridlines */}
      <div className="grid-lines dark opacity-30 pointer-events-none">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* TOP HEADER ROW */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-16 mb-16 sm:mb-20 md:mb-24">
          
          {/* Left: Main Editorial Headline */}
          <div className="tb-title max-w-2xl">
            <h2 fd-scroll-heading="" className="font-reckless text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-normal leading-[1.05] tracking-tight text-white">
              Two Builders. <br />
              One Momentum<span className="text-[#1B3D33]">.</span>
            </h2>
          </div>

          {/* Right: Section Marker & Paragraph */}
          <div className="tb-desc max-w-lg lg:pb-2">
            <div className="flex items-start gap-4">
              <span className="tb-marker font-mono text-xs sm:text-[13px] text-[#1B3D33] font-medium tracking-[0.2em] uppercase shrink-0 pt-0.5">
                [ <span data-scramble="">ABOUT</span> ]
              </span>
              <p split-para="" className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed">
                We work best with founders, leaders, and CXOs who care about ownership,
                move with speed, value craft, and expect steady weekly progress.
              </p>
            </div>
          </div>

        </div>

        {/* TWO LARGE SIDE-BY-SIDE EDITORIAL CARDS WITH ROTATING GRADIENT BORDERS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* CARD 1: FOUNDERS */}
          <div className="tb-card founders-card-border p-[1px] rounded-[2px] shadow-2xl">
            <div className="group relative bg-[#090b0a] p-6 sm:p-8 md:p-10 rounded-[2px] transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between select-none h-full">
              
              <div className="w-full mb-8">
                <FoundersCollage />
              </div>

              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h3 fd-scroll-heading="" className="font-reckless text-4xl sm:text-5xl font-normal text-white mb-5 tracking-tight">
                    Founders
                  </h3>

                  <div className="mb-6">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#1B3D33]/40 text-[#1B3D33] font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-[#1B3D33]/5">
                      EARLY STAGE
                    </span>
                  </div>

                  <p split-para="" className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-md">
                    You’ve got conviction and high standards. You need a senior pod that can move fast, make decisions, and own outcomes — so you’re not spending weeks coordinating people.
                  </p>
                </div>

                <div className="flex items-center justify-end pt-8 mt-4">
                  <ConstellationIcon className="w-8 h-8 md:w-9 md:h-9" />
                </div>
              </div>

            </div>
          </div>

          {/* CARD 2: CXOs & LEADERS */}
          <div className="tb-card founders-card-border p-[1px] rounded-[2px] shadow-2xl">
            <div className="group relative bg-[#090b0a] p-6 sm:p-8 md:p-10 rounded-[2px] transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between select-none h-full">
              
              <div className="w-full mb-8">
                <CXOsCollage />
              </div>

              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h3 fd-scroll-heading="" className="font-reckless text-4xl sm:text-5xl font-normal text-white mb-5 tracking-tight">
                    CXO’s & Leaders
                  </h3>

                  <div className="mb-6">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#1B3D33]/40 text-[#1B3D33] font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-[#1B3D33]/5">
                      1 → 10
                    </span>
                  </div>

                  <p split-para="" className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-md">
                    You want innovation that actually ships and gets adopted — a real product line, not another internal initiative that starts strong and fades out.
                  </p>
                </div>

                <div className="flex items-center justify-end pt-8 mt-4">
                  <ConstellationIcon className="w-8 h-8 md:w-9 md:h-9" />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
