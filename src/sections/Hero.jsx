import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLeadModal } from '../context/LeadModalContext.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { openLeadModal } = useLeadModal()
  const heroRef = useRef(null)

  // 1. Entrance timeline
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-marker',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
      )
      tl.fromTo(
        '.hero-title',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.3'
      )
      tl.fromTo(
        '.hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      tl.fromTo(
        '.hero-btn-row',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )
      tl.fromTo(
        '.hero-scroll-indicator',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const target = document.getElementById(sectionId)
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { offset: -70, duration: 1.2 })
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 70
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-[92vh] lg:min-h-screen bg-[#F2F1ED] text-black overflow-hidden flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-20"
    >
      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 flex-1 flex flex-col justify-center select-none">
        
        {/* SECTION NUMBER MARKER */}
        <div className="hero-marker mb-6 sm:mb-8">
          <span className="font-mono text-xs sm:text-[13px] md:text-sm text-[#2F6F5E] font-medium tracking-[0.2em] uppercase">
            [ <span data-scramble="">HOME</span> ]
          </span>
        </div>

        {/* MAIN HERO HEADLINE */}
        <div className="hero-title max-w-4xl">
          <h1 className="font-reckless text-4xl sm:text-5xl md:text-7xl lg:text-[84px] xl:text-[96px] font-normal text-black leading-[1.06] tracking-tight">
            Execution shouldn’t <br className="hidden sm:inline" />
            (feel)<span className="text-[#2F6F5E] font-medium">*</span> slow or lonely
          </h1>
        </div>

        {/* HERO DESCRIPTION PARAGRAPH */}
        <div className="hero-desc mt-6 sm:mt-8 max-w-xl">
          <p split-para="" className="font-sans text-sm sm:text-base md:text-[17px] text-black/75 font-light leading-relaxed">
            A product engineering studio focused on building scalable digital products,
            business systems, and AI automation that drive real impact.
          </p>
        </div>

        {/* HERO ACTION BUTTONS */}
        <div className="hero-btn-row flex flex-wrap items-center gap-6 sm:gap-8 mt-8 sm:mt-10">
          <button
            onClick={() => openLeadModal('build-product', { ctaClicked: 'Hero Explore Services / Start Project' })}
            className="bg-[#1B3D33] hover:bg-[#255245] text-white font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-[2px] flex items-center gap-2 transition-all duration-200 shadow-sm cursor-pointer"
          >
            <span>START YOUR PROJECT</span>
            <span className="text-sm font-light">↗</span>
          </button>

          <a
            href="#our-works-section"
            onClick={(e) => scrollToSection(e, 'our-works-section')}
            className="text-black hover:text-[#2F6F5E] font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex items-center gap-2 py-3.5 transition-colors duration-200 cursor-pointer"
          >
            <span>VIEW OUR WORK</span>
            <span className="text-sm font-light">↗</span>
          </a>
        </div>

      </div>

      {/* SCROLL INDICATOR (Bottom-Left) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 mt-12 lg:mt-16">
        <div className="hero-scroll-indicator flex flex-col items-start select-none">
          <div className="w-px h-10 sm:h-12 bg-[#2F6F5E]" />
          <div className="text-[#2F6F5E] -translate-x-[4.5px] -mt-[1px]">
            <svg
              className="w-3 h-3 stroke-current"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6 L6 11 L11 6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] text-[#2F6F5E] font-semibold tracking-widest uppercase leading-tight mt-2.5">
            SCROLL TO <br />
            EXPLORE
          </span>
        </div>
      </div>

    </section>
  )
}
