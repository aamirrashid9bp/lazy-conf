import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLeadModal } from '../context/LeadModalContext.jsx'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 'echaii',
    num: '01',
    name: 'Echaii',
    industry: 'Office Operations',
    title: 'Connecting Office Tea, Delivery and Operations',
    desc: 'A digital office-tea service ecosystem connecting employees, offices, supply operations, demand management, inventory and delivery workflows.',
    tags: ['Brand Systems', 'Mobile App', 'Operations', 'Automation'],
    link: '/project/echaii',
    image: '/demo_echaii.jpg',
  },
  {
    id: 'rtmnu-system',
    num: '02',
    name: 'RTMNU System',
    industry: 'Education & Institutional',
    title: 'Digitizing Academic and Institutional Operations',
    desc: 'A digital education management ecosystem designed around academic workflows, student operations and institutional processes.',
    tags: ['Web Platform', 'Data Systems', 'Architecture', 'Admin'],
    link: '/project/rtmnu-system',
    image: '/demo_rtmnu.jpg',
  },
  {
    id: 'convertleads',
    num: '03',
    name: 'ConvertLeads',
    industry: 'Sales & CRM',
    title: 'Turning Leads Into Organized Sales Operations',
    desc: 'A practical lead management and sales operations platform designed to help businesses capture, organize, follow up and convert leads more efficiently.',
    tags: ['CRM', 'Sales Automation', 'Infrastructure', 'Pipelines'],
    link: '/project/convertleads',
    image: '/demo_convertleads.jpg',
  },
  {
    id: 'innovexa-space',
    num: '04',
    name: 'Innovexa Space',
    industry: 'Workspace Management',
    title: 'Bringing Workspace Operations Into One System',
    desc: 'A digital ecosystem for coworking and managed-office operations, connecting workspace management, members, bookings, facilities and business operations.',
    tags: ['Product Design', 'Booking Engine', 'UX/UI', 'Operations'],
    link: '/project/innovexa-space',
    image: '/demo_innovexa.jpg',
  },
]

const AUTO_INTERVAL = 5000 // 5000ms = 5 seconds per project

export default function OurWorks() {
  const { openLeadModal } = useLeadModal()
  const sectionRef = useRef(null)
  const imageContainerRef = useRef(null)
  const textInfoRef = useRef(null)
  const isHoveredRef = useRef(false)
  const resetTimerRef = useRef(null)

  // Single source of truth for active project (0 = Echaii, 1 = RTMNU, 2 = ConvertLeads, 3 = Innovexa)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)

  const total = PROJECTS.length
  const currentProject = PROJECTS[activeIndex]

  // Coordinated GSAP animation on activeIndex transition
  useEffect(() => {
    const imgBox = imageContainerRef.current
    const infoBox = textInfoRef.current

    if (imgBox) {
      gsap.fromTo(
        imgBox,
        { opacity: 0.25, scale: 0.96, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
    }

    if (infoBox) {
      gsap.fromTo(
        infoBox,
        { opacity: 0.25, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.05, ease: 'power3.out' }
      )
    }
  }, [activeIndex])

  // Continuous 5-second auto-slide interval loop
  useEffect(() => {
    let elapsed = 0
    const stepMs = 50

    // Provide external reset trigger for manual arrow clicks
    resetTimerRef.current = () => {
      elapsed = 0
      setProgressWidth(0)
    }

    const interval = setInterval(() => {
      // Pause if tab is in background or mouse is hovering over showcase
      if (document.visibilityState === 'hidden' || isHoveredRef.current) {
        return
      }

      elapsed += stepMs
      const pct = Math.min(100, (elapsed / AUTO_INTERVAL) * 100)
      setProgressWidth(pct)

      if (elapsed >= AUTO_INTERVAL) {
        elapsed = 0
        setProgressWidth(0)
        setActiveIndex((prev) => (prev + 1) % total)
      }
    }, stepMs)

    return () => clearInterval(interval)
  }, [total])

  // Manual navigation handlers (immediately advance project & reset 5s timer)
  const handleManualNext = useCallback(() => {
    if (resetTimerRef.current) resetTimerRef.current()
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const handleManualPrev = useCallback(() => {
    if (resetTimerRef.current) resetTimerRef.current()
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Scroll reveal entrance animation
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        '.works-header',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      tl.fromTo(
        '.works-showcase-center',
        { opacity: 0, y: 35, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
        '-=0.3'
      )
      tl.fromTo(
        '.works-info-bottom',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '-=0.4'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Calculate layered cards indices behind active
  const nextProject1 = PROJECTS[(activeIndex + 1) % total]
  const nextProject2 = PROJECTS[(activeIndex + 2) % total]

  // Touch swipe support for mobile / tablet devices
  const touchStartXRef = useRef(null)

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartXRef.current - touchEndX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleManualNext() // swiped left -> next project
      } else {
        handleManualPrev() // swiped right -> previous project
      }
    }
    touchStartXRef.current = null
  }

  return (
    <section
      ref={sectionRef}
      id="our-works-section"
      className="section_our-work-swiper relative bg-[#060608] text-white py-20 sm:py-24 md:py-32 lg:py-36 overflow-hidden border-b border-white/10 select-none"
    >
      {/* Background Architectural Gridlines */}
      <div className="grid-lines dark opacity-25 pointer-events-none">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* ============================================================
            SECTION HEADER
            [ 00100 ]
            Our Works
            ============================================================ */}
        <div className="works-header mb-10 sm:mb-14 md:mb-16">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs sm:text-[13px] text-[#4E9F76] font-medium tracking-[0.2em] uppercase">
              [ <span data-scramble="">00100</span> ]
            </span>
          </div>
          <h2 fd-scroll-heading="" className="font-reckless text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-normal leading-[1.05] tracking-tight text-white">
            Our Works
          </h2>
        </div>

        {/* ============================================================
            MAIN CENTRAL PROJECT SHOWCASE
            Centered in the viewport with layered back decks and flanking arrows
            ============================================================ */}
        <div className="works-showcase-center relative w-full max-w-[1080px] mx-auto flex flex-col items-center">
          
          {/* STACKED DECK CONTAINER */}
          <div
            className="relative w-full aspect-[16/10] sm:aspect-[16/9.2] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            
            {/* Layer 2 (Farthest Back Card) */}
            <div className="absolute top-[-36px] sm:top-[-44px] w-[88%] aspect-[16/9.2] rounded-[4px] border border-white/[0.08] bg-[#0c0c16] shadow-2xl z-1 opacity-30 transform scale-[0.92] overflow-hidden pointer-events-none transition-all duration-500">
              <img
                src={nextProject2.image}
                alt=""
                className="w-full h-full object-cover grayscale opacity-40 blur-[1px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Layer 1 (Middle Back Card) */}
            <div className="absolute top-[-18px] sm:top-[-22px] w-[94%] aspect-[16/9.2] rounded-[4px] border border-white/[0.12] bg-[#101020] shadow-2xl z-2 opacity-60 transform scale-[0.96] overflow-hidden pointer-events-none transition-all duration-500">
              <img
                src={nextProject1.image}
                alt=""
                className="w-full h-full object-cover grayscale opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            {/* ACTIVE MAIN PROJECT CARD (Front Center) - HOVER PAUSES ONLY HERE */}
            <div
              ref={imageContainerRef}
              onMouseEnter={() => {
                isHoveredRef.current = true
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false
              }}
              className="relative w-full h-full rounded-[4px] border border-white/20 bg-[#12121e] shadow-2xl z-10 overflow-hidden group cursor-pointer"
            >
              <Link to={currentProject.link} className="block w-full h-full relative">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </Link>
            </div>

            {/* ============================================================
                CIRCULAR FLANKING NAVIGATION BUTTONS (Hovering arrows does NOT pause)
                ============================================================ */}
            <button
              onClick={handleManualPrev}
              onMouseEnter={(e) => {
                e.stopPropagation()
                isHoveredRef.current = false
              }}
              aria-label="Previous project"
              className="absolute left-[-18px] sm:left-[-26px] md:left-[-32px] lg:left-[-40px] z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#1b1c36]/90 hover:bg-[#2c2d58] border border-white/25 hover:border-white shadow-[0_0_24px_rgba(99,101,255,0.35)] flex items-center justify-center text-white transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            <button
              onClick={handleManualNext}
              onMouseEnter={(e) => {
                e.stopPropagation()
                isHoveredRef.current = false
              }}
              aria-label="Next project"
              className="absolute right-[-18px] sm:right-[-26px] md:right-[-32px] lg:right-[-40px] z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#1b1c36]/90 hover:bg-[#2c2d58] border border-white/25 hover:border-white shadow-[0_0_24px_rgba(99,101,255,0.35)] flex items-center justify-center text-white transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

          </div>

          {/* ============================================================
              PROJECT INFORMATION CONTAINER (Centered below visual)
              ============================================================ */}
          <div
            ref={textInfoRef}
            className="works-info-bottom w-full mt-8 sm:mt-10 md:mt-12 flex flex-col"
          >
            {/* Live Progress Bar Line */}
            <div className="w-full h-[2px] bg-white/10 relative overflow-hidden mb-6 sm:mb-8">
              <div
                className="h-full bg-[#38e07b] transition-all duration-75 ease-linear"
                style={{ width: `${progressWidth}%` }}
              />
            </div>

            {/* Meta Row: Counter + Tags + CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              
              {/* Counter & Tags */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="font-mono text-sm sm:text-base font-bold text-white tracking-widest">
                  {currentProject.num} <span className="text-white/40 font-light">/</span> {String(total).padStart(2, '0')}
                </span>

                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full border border-white/15 bg-white/5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white/80 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Row: Request Demo & View Case Study */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const demoType =
                      currentProject.id === 'convertleads'
                        ? 'convertleads-demo'
                        : currentProject.id === 'rtmnu-system'
                        ? 'rtmnu-demo'
                        : currentProject.id === 'echaii'
                        ? 'echaii-demo'
                        : currentProject.id === 'innovexa-space'
                        ? 'innovexa-demo'
                        : 'build-product'
                    openLeadModal(demoType, {
                      product: currentProject.name,
                      ctaClicked: `Our Works ${currentProject.name} Demo`,
                    })
                  }}
                  className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#38e07b] hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
                >
                  <span>REQUEST DEMO</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>

                <span className="text-white/20">|</span>

                <Link
                  to={currentProject.link}
                  className="font-mono text-xs sm:text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span>Case Study</span>
                  <span className="text-xs">↗</span>
                </Link>
              </div>

            </div>

            {/* Project Title */}
            <h3 className="font-reckless text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-white mt-2">
              {currentProject.title}
            </h3>

            {/* Project Description */}
            <p className="font-sans text-sm sm:text-base text-white/65 font-light leading-relaxed max-w-3xl mt-3">
              {currentProject.desc}
            </p>

          </div>

        </div>

      </div>
    </section>
  )
}
