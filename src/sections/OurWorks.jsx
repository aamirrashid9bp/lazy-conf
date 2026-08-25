import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────
   LAZYDEVELOPER PROJECT DATA
   ────────────────────────────────────────────────────────── */
const projects = [
  {
    id: 'echaii',
    num: '01',
    name: 'Echaii',
    industry: 'Office Services',
    productType: 'Mobile App · CRM · Inventory · Delivery · Automation',
    title: 'Connecting Office Tea, Delivery and Operations',
    desc: 'A digital office-tea service ecosystem connecting employees, offices, supply operations, demand management, inventory and delivery workflows.',
    tags: [
      { label: 'Mobile App', icon: 'code' },
      { label: 'CRM', icon: 'settings' },
      { label: 'Inventory', icon: 'database' },
      { label: 'Delivery', icon: 'truck' },
      { label: 'Automation', icon: 'zap' },
    ],
    cta: 'View Echaii Case Study',
    link: '/project/echaii',
    image: '/demo_echaii.jpg',
  },
  {
    id: 'rtmnu-system',
    num: '02',
    name: 'RTMNU System',
    industry: 'Education',
    productType: 'Web Platform · Academic System · Administration',
    title: 'Digitizing Academic and Institutional Operations',
    desc: 'A digital education management ecosystem designed around academic workflows, student operations and institutional processes.',
    tags: [
      { label: 'Web Platform', icon: 'code' },
      { label: 'Academic System', icon: 'book' },
      { label: 'Administration', icon: 'shield' },
      { label: 'Data Management', icon: 'database' },
    ],
    cta: 'View RTMNU System Case Study',
    link: '/project/rtmnu-system',
    image: '/demo_rtmnu.jpg',
  },
  {
    id: 'convertleads',
    num: '03',
    name: 'ConvertLeads',
    industry: 'Sales & CRM',
    productType: 'CRM · Lead Management · Sales Automation',
    title: 'Turning Leads Into Organized Sales Operations',
    desc: 'A practical lead management and sales operations platform designed to help businesses capture, organize, follow up and convert leads more efficiently.',
    tags: [
      { label: 'CRM', icon: 'settings' },
      { label: 'Lead Management', icon: 'users' },
      { label: 'Sales Pipeline', icon: 'chart' },
      { label: 'Automation', icon: 'zap' },
    ],
    cta: 'Explore ConvertLeads',
    link: '/project/convertleads',
    image: '/demo_convertleads.jpg',
  },
  {
    id: 'innovexa-space',
    num: '04',
    name: 'Innovexa Space',
    industry: 'Coworking',
    productType: 'Workspace Management · Booking · CRM · Operations',
    title: 'Bringing Workspace Operations Into One System',
    desc: 'A digital ecosystem for coworking and managed-office operations, connecting workspace management, members, bookings, facilities and business operations.',
    tags: [
      { label: 'Workspace', icon: 'layout' },
      { label: 'Booking', icon: 'calendar' },
      { label: 'CRM', icon: 'users' },
      { label: 'Operations', icon: 'settings' },
    ],
    cta: 'Explore Innovexa Space',
    link: '/project/innovexa-space',
    image: '/demo_innovexa.jpg',
  },
]

const TOTAL = projects.length
const AUTO_INTERVAL = 4500 // 4.5 seconds

/* ── SVG Tag Icons Helper ── */
function TagIcon({ icon }) {
  switch (icon) {
    case 'code':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    case 'settings':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    case 'database':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      )
    case 'truck':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    case 'zap':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    case 'book':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    case 'shield':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    case 'users':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'chart':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    case 'calendar':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    default:
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
  }
}

/* ──────────────────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────────────────── */
export default function OurWorks() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const timerRef = useRef(null)
  const isHovered = useRef(false)
  const touchStartX = useRef(null)

  /* ── Navigation helpers ── */
  const goNext = useCallback(() => {
    setActive(prev => (prev + 1) % TOTAL)
  }, [])

  const goPrev = useCallback(() => {
    setActive(prev => (prev - 1 + TOTAL) % TOTAL)
  }, [])

  /* ── Controlled Timer ── */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    if (isHovered.current) return
    timerRef.current = setInterval(() => {
      if (!isHovered.current) {
        setActive(prev => (prev + 1) % TOTAL)
      }
    }, AUTO_INTERVAL)
  }, [clearTimer])

  useEffect(() => {
    startTimer()
    return clearTimer
  }, [startTimer, clearTimer])

  /* ── Hover Controls ── */
  const handleMouseEnter = useCallback(() => {
    isHovered.current = true
    clearTimer()
  }, [clearTimer])

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false
    startTimer()
  }, [startTimer])

  /* ── Manual Click Controls ── */
  const handleManualNext = useCallback(() => {
    goNext()
    isHovered.current = false
    startTimer()
  }, [goNext, startTimer])

  const handleManualPrev = useCallback(() => {
    goPrev()
    isHovered.current = false
    startTimer()
  }, [goPrev, startTimer])

  const handleSelect = useCallback((idx) => {
    setActive(idx)
    isHovered.current = false
    startTimer()
  }, [startTimer])

  /* ── Mobile Touch Controls ── */
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
    isHovered.current = true
    clearTimer()
  }, [clearTimer])

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
    isHovered.current = false
    startTimer()
  }, [goNext, goPrev, startTimer])

  /* ── Scroll Reveals ── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.ow-heading',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo('.ow-stack-wrap',
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ow-stack-wrap', start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo('.ow-details-wrap',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.ow-details-wrap', start: 'top 90%', toggleActions: 'play none none reverse' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ── Current Project Data ── */
  const current = projects[active]
  const counterFormatted = `${current.num} / ${String(TOTAL).padStart(2, '0')}`

  /* ── Layered Card Stack Styles ── */
  const getCardStyle = (idx) => {
    const diff = ((idx - active) % TOTAL + TOTAL) % TOTAL

    if (diff === 0) {
      // Active Front Card
      return {
        zIndex: 10,
        transform: 'translateY(0px) scale(1)',
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        pointerEvents: 'auto',
      }
    } else if (diff === 1) {
      // 1st Card Behind (shifted up & scaled down)
      return {
        zIndex: 8,
        transform: 'translateY(-24px) scale(0.95)',
        opacity: 0.75,
        filter: 'brightness(0.6) blur(0.5px)',
        pointerEvents: 'none',
      }
    } else if (diff === 2) {
      // 2nd Card Behind
      return {
        zIndex: 6,
        transform: 'translateY(-44px) scale(0.90)',
        opacity: 0.45,
        filter: 'brightness(0.35) blur(1px)',
        pointerEvents: 'none',
      }
    } else {
      // 3rd Card Deep Behind
      return {
        zIndex: 4,
        transform: 'translateY(-60px) scale(0.85)',
        opacity: 0.2,
        filter: 'brightness(0.2) blur(1.5px)',
        pointerEvents: 'none',
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="our-work-section"
      className="relative bg-[#060611] text-white overflow-hidden py-16 md:py-24 lg:py-32 border-b border-white/10"
    >
      {/* Architectural Background Grid */}
      <div className="grid-lines dark">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* ════════════════════ TOP HEADER ════════════════════ */}
        <div className="ow-heading flex flex-col items-center justify-center text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-[#2F6F5E] tracking-[0.2em] uppercase font-bold">
              [ 00100 ]
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-reckless font-normal tracking-tight leading-[1.05] text-white">
            Our <span className="text-[#2F6F5E] italic font-reckless">Works</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#2F6F5E]/40 mt-4 mx-auto" />
        </div>

        {/* ════════════════════ MAIN STACK & SHOWCASE ════════════════════ */}
        <div
          className="ow-stack-wrap relative w-full max-w-[1020px] mx-auto pt-16 pb-6 px-4 md:px-16"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Layered Card Container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] md:aspect-[16/9]">
            {projects.map((project, idx) => {
              const cardStyle = getCardStyle(idx)
              const isActive = idx === active

              return (
                <div
                  key={project.id}
                  className={`absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#0c0c16] ${
                    isActive ? 'cursor-pointer' : ''
                  }`}
                  style={cardStyle}
                  onClick={() => !isActive && handleSelect(idx)}
                >
                  <img
                    src={project.image}
                    alt={`${project.name} UI Case Study`}
                    className="w-full h-full object-cover object-center select-none"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                  {/* Subtle inner dark gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                </div>
              )
            })}
          </div>

          {/* ── Left Circular Arrow Navigation ── */}
          <button
            onClick={handleManualPrev}
            aria-label="Previous project"
            className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-30
                       w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/60 backdrop-blur-md
                       flex items-center justify-center text-white/70 hover:text-[#2F6F5E] hover:border-[#2F6F5E] hover:bg-[#2F6F5E]/10
                       transition-all duration-300 cursor-pointer group shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* ── Right Circular Arrow Navigation ── */}
          <button
            onClick={handleManualNext}
            aria-label="Next project"
            className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-30
                       w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/60 backdrop-blur-md
                       flex items-center justify-center text-white/70 hover:text-[#2F6F5E] hover:border-[#2F6F5E] hover:bg-[#2F6F5E]/10
                       transition-all duration-300 cursor-pointer group shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ════════════════════ BOTTOM PROJECT INFO ════════════════════ */}
        <div className="ow-details-wrap mt-12 md:mt-16 w-full max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ── Left Column: Counter + Description ── */}
            <div className="md:col-span-4 flex flex-col space-y-6">
              {/* Counter Row with Line */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#2F6F5E]">
                  {counterFormatted}
                </span>
                <div className="flex-1 h-[1px] bg-white/15 max-w-[160px]" />
              </div>

              {/* Description with Vertical Accent Line */}
              <div className="border-l border-white/20 pl-4 sm:pl-5 relative">
                <div key={`desc-${active}`} className="transition-opacity duration-500 ease-out">
                  <p className="text-sm sm:text-base font-sans font-light text-white/60 leading-relaxed max-w-sm">
                    {current.desc}
                  </p>
                </div>
                {/* Accent circle at bottom of line */}
                <div className="absolute -left-[3px] bottom-0 w-1.5 h-1.5 rounded-full bg-[#2F6F5E]" />
              </div>
            </div>

            {/* ── Center Column: Category Pill Tags ── */}
            <div className="md:col-span-4 flex flex-col items-start md:items-center justify-start pt-1">
              <div key={`tags-${active}`} className="flex flex-wrap gap-2.5 justify-start md:justify-center">
                {current.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.03] text-white/75 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 hover:border-[#2F6F5E]/60 hover:text-white"
                  >
                    <TagIcon icon={tag.icon} />
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right Column: Large Editorial Title + CTA ── */}
            <div className="md:col-span-4 flex flex-col items-start md:items-end text-left md:text-right space-y-4">
              <div key={`title-${active}`} className="transition-all duration-500 ease-out">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-reckless font-normal leading-[1.1] tracking-tight text-white">
                  {current.title}
                  <span className="text-[#2F6F5E]">.</span>
                </h3>
              </div>

              {/* Case Study CTA */}
              <Link
                to={current.link}
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#2F6F5E] hover:text-white transition-colors duration-300 pt-2"
              >
                <span className="border-b border-[#2F6F5E]/40 group-hover:border-white pb-0.5">
                  {current.cta}
                </span>
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>

          </div>

          {/* ── Bottom Mini Pagination Dots ── */}
          <div className="mt-12 flex items-center justify-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                aria-label={`Jump to project ${idx + 1}`}
                className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === active ? 'w-8 bg-[#2F6F5E]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
