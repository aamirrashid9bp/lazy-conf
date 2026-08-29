import React, { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    id: 1,
    quote: "LazyDeveloper didn't just build our app, they architected our entire business engine. Their product thinking is what sets them apart from typical agencies.",
    author: 'SARAH CHEN',
    role: 'Founder & CEO, ScaleTech',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    quote: 'We needed a complex enterprise operations system delivered in weeks, not months. The team delivered flawlessly with exceptional code quality and complete transparency.',
    author: 'MARCUS JOHNSON',
    role: 'Operations Director, GlobalLogistics',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    quote: 'Their ability to understand our operational bottlenecks and translate them into automated software solutions saved us hundreds of hours every single month.',
    author: 'ELENA RODRIGUEZ',
    role: 'COO, Nexus Healthcare',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    quote: 'Working with LazyDeveloper felt like having an elite senior engineering team in-house. They challenged our assumptions and built a significantly better product.',
    author: 'DAVID KIM',
    role: 'CTO, FinFlow',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  },
]

const AUTO_INTERVAL = 5500 // 5.5 seconds per slide

export default function Testimonials() {
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)
  const personRef = useRef(null)
  const timerRef = useRef(null)
  const isHoveredRef = useRef(false)
  const isAnimatingRef = useRef(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const total = TESTIMONIALS.length

  // Coordinated slide transition
  const transitionTo = useCallback(
    (newIndex, direction = 1) => {
      if (newIndex === activeIndex || isAnimatingRef.current) return
      isAnimatingRef.current = true

      const quoteEl = quoteRef.current
      const personEl = personRef.current

      // 1. Animate out current content
      const exitTl = gsap.timeline({
        defaults: { ease: 'power2.in', duration: 0.3 },
        onComplete: () => {
          setActiveIndex(newIndex)

          // 2. Animate in new content
          gsap.fromTo(
            quoteEl,
            { opacity: 0, x: direction * 25, y: 5 },
            { opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out' }
          )

          gsap.fromTo(
            personEl,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              delay: 0.08,
              ease: 'power3.out',
              onComplete: () => {
                isAnimatingRef.current = false
              },
            }
          )
        },
      })

      if (quoteEl) exitTl.to(quoteEl, { opacity: 0, x: -direction * 25, y: -5 }, 0)
      if (personEl) exitTl.to(personEl, { opacity: 0, y: -10 }, 0.04)
    },
    [activeIndex]
  )

  const handleNext = useCallback(() => {
    const nextIdx = (activeIndex + 1) % total
    transitionTo(nextIdx, 1)
  }, [activeIndex, total, transitionTo])

  const handlePrev = useCallback(() => {
    const prevIdx = (activeIndex - 1 + total) % total
    transitionTo(prevIdx, -1)
  }, [activeIndex, total, transitionTo])

  // Auto rotation with pause on hover
  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        if (!isHoveredRef.current && !isAnimatingRef.current) {
          handleNext()
        }
      }, AUTO_INTERVAL)
    }

    startTimer()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [handleNext])

  // Scroll reveal animation
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        '.testi-num-tag',
        { opacity: 0, y: -10 },
        { opacity: 0.35, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      tl.fromTo(
        '.testi-head',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      tl.fromTo(
        '.testi-arrows',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.5'
      )
      tl.fromTo(
        '.testi-body-box',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.4'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const current = TESTIMONIALS[activeIndex]

  return (
    <section
      ref={sectionRef}
      id="testimonials-section"
      className="relative bg-[#F5F3EE] text-black py-24 sm:py-28 md:py-36 lg:py-44 overflow-hidden border-b border-black/[0.08] select-none"
      onMouseEnter={() => {
        isHoveredRef.current = true
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false
      }}
    >
      {/* ============================================================
          VERTICAL ARCHITECTURAL GRID LINES
          Subtle 1px gray lines extending through the entire section
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 grid grid-cols-6 h-full">
          <div className="border-r border-black/[0.06] h-full" />
          <div className="border-r border-black/[0.06] h-full" />
          <div className="border-r border-black/[0.06] h-full" />
          <div className="border-r border-black/[0.06] h-full" />
          <div className="border-r border-black/[0.06] h-full" />
          <div className="h-full" />
        </div>
      </div>

      {/* TOP-RIGHT SECTION NUMBER */}
      <div className="testi-num-tag absolute top-8 sm:top-10 md:top-12 right-6 sm:right-10 md:right-14 lg:right-20 z-20 pointer-events-none">
        <span className="font-mono text-xs sm:text-[13px] text-black/35 tracking-[0.2em] font-medium uppercase">
          [ PARTNERS ]
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* ============================================================
            HEADING AREA & HORIZONTAL CIRCULAR NAVIGATION ARROWS
            Left: Words from [italic green Partners.]
            Right: Circular ← and → buttons
            ============================================================ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">
          
          <h2 className="testi-head font-reckless text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-normal leading-[1.08] tracking-tight text-black">
            Words from <span className="italic text-[#1B3D33]">Partners.</span>
          </h2>

          {/* CIRCULAR ARROW BUTTONS */}
          <div className="testi-arrows flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-black/20 hover:border-black hover:bg-black/5 flex items-center justify-center text-black text-sm sm:text-base transition-all duration-200 active:scale-95 cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-black/20 hover:border-black hover:bg-black/5 flex items-center justify-center text-black text-sm sm:text-base transition-all duration-200 active:scale-95 cursor-pointer"
            >
              →
            </button>
          </div>

        </div>

        {/* ============================================================
            TESTIMONIAL CONTENT AREA
            Flanked by subtle vertical accent borders on left and right
            ============================================================ */}
        <div className="testi-body-box relative pl-6 sm:pl-10 md:pl-12 border-l border-black/15 max-w-5xl">
          
          {/* LARGE EDITORIAL SERIF QUOTE */}
          <div className="mb-10 sm:mb-12 md:mb-14 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex items-center">
            <blockquote
              ref={quoteRef}
              className="font-reckless text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-normal leading-[1.2] tracking-tight text-black"
            >
              "{current.quote}"
            </blockquote>
          </div>

          {/* PERSON AREA: CIRCULAR PORTRAIT + NAME & ROLE */}
          <div ref={personRef} className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-black/10 shrink-0 bg-gray-200 shadow-sm">
              <img
                src={current.image}
                alt={current.author}
                className="w-full h-full object-cover grayscale contrast-125 select-none"
                draggable={false}
              />
            </div>
            
            <div className="flex flex-col text-left">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-black">
                {current.author}
              </span>
              <span className="font-sans text-xs sm:text-sm text-gray-500 font-light mt-0.5">
                {current.role}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
