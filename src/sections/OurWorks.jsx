import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function OurWorks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const timerRef = useRef(null)
  const isScrollDriven = useRef(false)

  const projects = [
    {
      id: 'convertleads',
      num: '01',
      indexLabel: '01/04',
      client: 'ConvertLeads',
      category: 'CRM · SALES AUTOMATION · BUSINESS SOFTWARE',
      title: 'Turning Leads Into Organized Sales Operations',
      desc: 'A lead-management and sales-operations platform designed to help businesses capture, organize, follow up and convert leads more efficiently.',
      capabilities: ['Lead Management', 'CRM', 'Sales Pipeline', 'Follow-ups', 'Team Management', 'Reporting', 'Automation'],
      cta: 'Explore ConvertLeads',
      link: '/project/convertleads',
      image: '/convertleads_ui.jpg'
    },
    {
      id: 'rtmnu-system',
      num: '02',
      indexLabel: '02/04',
      client: 'RTMNU System',
      category: 'EDUCATION · UNIVERSITY MANAGEMENT · DIGITAL OPERATIONS',
      title: 'Digitizing Academic and Institutional Operations',
      desc: 'A digital education management ecosystem designed around academic workflows, student operations and institutional processes.',
      capabilities: ['Student Management', 'College Management', 'Academic Management', 'Examination', 'Results', 'Administration'],
      cta: 'Explore RTMNU System',
      link: '/project/rtmnu-system',
      image: '/rtmnu_system_ui.jpg'
    },
    {
      id: 'echaii',
      num: '03',
      indexLabel: '03/04',
      client: 'Echaii',
      category: 'OFFICE SERVICES · DELIVERY · CRM · OPERATIONS',
      title: 'Connecting Office Tea, Delivery and Operations',
      desc: 'A digital office-tea service ecosystem connecting employees, offices, supply operations, demand management, inventory and delivery workflows.',
      capabilities: ['Ordering', 'Employees', 'Monthly Orders', 'Inventory', 'Delivery', 'Notifications', 'Payments'],
      cta: 'Explore Echaii',
      link: '/project/echaii',
      image: '/echaii_ui.jpg'
    },
    {
      id: 'innovexa-space',
      num: '04',
      indexLabel: '04/04',
      client: 'Innovexa Space',
      category: 'COWORKING · WORKSPACE · COMMUNITY · OPERATIONS',
      title: 'Bringing Workspace Operations Into One System',
      desc: 'A digital ecosystem for coworking and managed-office operations connecting workspace management, members, bookings, facilities and business operations.',
      capabilities: ['Workspace', 'Seats', 'Cabins', 'Meeting Rooms', 'Members', 'Billing', 'Bookings'],
      cta: 'Explore Innovexa Space',
      link: '/project/innovexa-space',
      image: '/innovexa_space_ui.jpg'
    },
  ]

  // Single source of truth for active state
  const goTo = useCallback((idx) => {
    setActiveIndex(idx)
  }, [])

  // Auto-progression timer (pauses when scroll is driving)
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (isScrollDriven.current) return

    timerRef.current = setInterval(() => {
      if (!isScrollDriven.current) {
        setActiveIndex(prev => (prev + 1) % projects.length)
      }
    }, 5000)
  }, [projects.length])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  // Scroll-driven progression (pinned)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          if (progress > 0.01 && progress < 0.99) {
            isScrollDriven.current = true
            const newIndex = Math.min(
              projects.length - 1,
              Math.floor(progress * projects.length)
            )
            setActiveIndex(newIndex)
          }
        },
        onLeave: () => {
          isScrollDriven.current = false
          startTimer()
        },
        onEnterBack: () => {
          isScrollDriven.current = true
          if (timerRef.current) clearInterval(timerRef.current)
        },
        onLeaveBack: () => {
          isScrollDriven.current = false
          startTimer()
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [projects.length, startTimer])

  const handleManualSelect = (idx) => {
    goTo(idx)
    // Reset auto-timer
    if (timerRef.current) clearInterval(timerRef.current)
    if (!isScrollDriven.current) startTimer()
  }

  return (
    <section
      ref={sectionRef}
      id="our-work-section"
      className="section_our-work relative bg-[#060611] text-white overflow-hidden min-h-screen"
    >
      {/* Section Number */}
      <span className="section-number text-white/20">00100</span>

      {/* Background Grid */}
      <div className="grid-lines dark">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full h-screen max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-between py-16 md:py-20">
        
        {/* Header Row */}
        <div className="flex items-start justify-between mb-6 md:mb-8 shrink-0">
          <div className="space-y-4">
            <Tag text="lazy" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight">
              Our <span className="text-brand-green italic font-reckless">Work.</span>
            </h2>
            <p className="text-base text-white/50 font-sans font-light leading-relaxed max-w-md hidden md:block">
              Products and systems we've built to solve real business problems.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex flex-col items-end space-y-1 pt-2">
            <span className="font-mono text-3xl md:text-4xl font-bold text-brand-green tracking-tight leading-none">
              {projects[activeIndex]?.indexLabel}
            </span>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider text-right">
              {projects[activeIndex]?.client}
            </span>
          </div>
        </div>

        {/* Main Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 flex-1 items-center relative min-h-0">
          
          {/* Left: Project Content */}
          <div className="lg:col-span-5 relative h-full flex items-center order-2 lg:order-1">
            <div className="relative w-full min-h-[350px]">
              {projects.map((item, idx) => (
                <div 
                  key={item.id}
                  className={`absolute inset-0 flex flex-col justify-center space-y-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    idx === activeIndex 
                      ? 'opacity-100 translate-y-0 z-10' 
                      : idx < activeIndex
                        ? 'opacity-0 -translate-y-8 pointer-events-none z-0'
                        : 'opacity-0 translate-y-8 pointer-events-none z-0'
                  }`}
                >
                  {/* Category */}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl md:text-[42px] font-reckless font-normal text-white leading-tight tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-white/50 font-sans font-light leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Capabilities */}
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                      Capabilities
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.capabilities.map((cap, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2.5 py-1 border border-white/10 text-white/60 bg-black/20"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-3">
                    <Link
                      to={item.link}
                      className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-wider text-brand-green hover:text-white transition-colors"
                    >
                      <span>{item.cta}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Large Visual Area */}
          <div className="lg:col-span-7 relative w-full aspect-video md:aspect-[16/10] lg:aspect-auto lg:h-full max-h-[600px] border border-white/10 overflow-hidden bg-[#090914] order-1 lg:order-2 rounded-sm shrink-0">
            {projects.map((item, idx) => (
              <div
                key={`img-${item.id}`}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  idx === activeIndex
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-[1.03] pointer-events-none z-0'
                }`}
              >
                <img 
                  src={item.image} 
                  alt={`${item.client} interface preview`}
                  className="w-full h-full object-cover"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="mt-6 md:mt-8 flex items-center gap-3 shrink-0">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManualSelect(idx)}
              className={`h-1 flex-1 transition-all duration-500 rounded-full cursor-pointer hover:bg-white/30 ${
                idx === activeIndex ? 'bg-brand-green' : idx < activeIndex ? 'bg-brand-green/40' : 'bg-white/10'
              }`}
              aria-label={`View project ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
