import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InteractiveLazyWordmark from '../components/InteractiveLazyWordmark.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  // Entrance animation + scroll-linked fade
  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) return

    const ctx = gsap.context(() => {
      // Entrance: staggered reveal of hero elements
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.fromTo('.hero-section-num', 
        { opacity: 0, y: 10 }, 
        { opacity: 0.3, y: 0, duration: 0.6, delay: 0.3 }
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )
      .fromTo('.hero-heading-line',
        { opacity: 0, y: 40, rotateX: -15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.12 },
        '-=0.6'
      )
      .fromTo('.hero-description',
        { opacity: 0, y: 20 },
        { opacity: 0.7, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo('.hero-wordmark-wrap',
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo('.hero-cta-row',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )

      // Scroll-linked fade: content fades and translates up as user scrolls down
      gsap.to('.hero-content-inner', {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: '40% top',
          scrub: 1,
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={heroRef}
      id="top"
      className="section_hero relative min-h-screen bg-[#edeef2] overflow-hidden flex flex-col justify-between"
    >
      {/* Section Number */}
      <span className="hero-section-num section-number text-black/30">00000</span>

      {/* Background Architectural Grid Lines (6 columns) */}
      <div className="grid-lines light">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      {/* Horizontal divider lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/10 max-w-[1440px] mx-auto" />

      {/* Main Content Container */}
      <div ref={contentRef} className="hero-content-inner relative z-10 w-full max-w-[1440px] mx-auto flex-1 flex flex-col justify-end pb-8 sm:pb-12 md:pb-20 pt-24">
        
        {/* Top: Subtitle Tag */}
        <div className="px-6 md:px-12 mb-auto pt-8 md:pt-16">
          <div className="hero-subtitle inline-flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F5E]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/50 font-bold">
              Software Product Studio
            </span>
          </div>
        </div>

        {/* Large Editorial Heading */}
        <div className="grid grid-cols-6 px-6 md:px-12 mb-6 md:mb-12">
          <div className="col-span-6 md:col-span-5 lg:col-span-4">
            <h1 className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-reckless font-normal text-black leading-[1.02] tracking-tight">
              <span className="hero-heading-line block">We Build Software</span>
              <span className="hero-heading-line block">That <span className="italic text-[#2F6F5E]">Moves Businesses</span></span>
              <span className="hero-heading-line block">Forward.</span>
            </h1>
            <p className="hero-description mt-6 text-base sm:text-lg text-gray-600 font-sans font-light leading-relaxed max-w-md">
              A product engineering studio focused on delivering scalable digital products, business systems, and AI automation.
            </p>
          </div>
        </div>

        {/* Oversized Interactive Visual — "lazy" wordmark */}
        <div className="hero-wordmark-wrap grid grid-cols-6 border-y border-black/10 relative overflow-hidden">
          <div className="col-span-6 flex items-center justify-center py-3 md:py-6">
            <InteractiveLazyWordmark heroRef={heroRef} />
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="hero-cta-row grid grid-cols-6 px-6 md:px-12 mt-6 md:mt-10">
          <div className="col-span-6 md:col-span-3 flex items-center gap-6">
            <a
              href="https://calendar.app.google/mCygswQWvcXfkyLk9"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center space-x-2 px-6 py-3.5 bg-black text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-black overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Start Your Project</span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">→</span>
              <div className="absolute inset-0 bg-[#2F6F5E] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </a>
            <span className="font-mono text-[10px] text-black/30 uppercase tracking-wider hidden sm:block">
              Scroll to explore ↓
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
