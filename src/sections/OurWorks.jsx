import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Tag from '../components/Tag.jsx'

export default function OurWorks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  const projects = [
    {
      id: 'convertleads',
      num: '01',
      indexLabel: '01/04',
      client: 'ConvertLeads',
      category: 'CRM · SALES AUTOMATION · BUSINESS SOFTWARE',
      title: 'Turning Leads Into Organized Sales Operations',
      desc: 'A lead-management and sales-operations platform designed to help businesses capture, organize, follow up and convert leads more efficiently.',
      capabilities: [
        'Lead Management', 'CRM', 'Sales Pipeline', 'Follow-ups',
        'Team Management', 'Reporting', 'Automation',
      ],
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
      capabilities: [
        'Student Management', 'College Management', 'Academic Management',
        'Examination', 'Results', 'Administration', 'Reporting',
      ],
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
      capabilities: [
        'Ordering', 'Employees', 'Monthly Orders', 'Inventory',
        'Delivery', 'Notifications', 'Payments', 'CRM', 'Operations',
      ],
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
      capabilities: [
        'Workspace', 'Seats', 'Cabins', 'Meeting Rooms',
        'Members', 'Billing', 'Bookings', 'CRM', 'Operations',
      ],
      cta: 'Explore Innovexa Space',
      link: '/project/innovexa-space',
      image: '/innovexa_space_ui.jpg'
    },
  ]

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (isHovered) return

    timerRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 4000)
  }, [isHovered, projects.length])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  const handleManualSelect = (idx) => {
    setActiveIndex(idx)
    // Timer is reset because startTimer is called on state changes if we added it,
    // but right now startTimer only runs on mount or hover change.
    // Let's reset the timer manually here.
    if (timerRef.current) clearInterval(timerRef.current)
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length)
      }, 4000)
    }
  }

  return (
    <section
      id="our-work-section"
      className="section_our-work relative bg-[#060611] text-white border-b border-white/10 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-12 z-10 flex flex-col justify-between py-16 md:py-24 lg:py-28 min-h-screen">
        
        {/* Header Row */}
        <div className="flex items-start justify-between mb-8 md:mb-10 shrink-0">
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
          <div className="flex flex-col items-end space-y-2 pt-2 relative w-[80px]">
            {projects.map((item, idx) => (
              <div 
                key={idx}
                className={`absolute top-0 right-0 flex flex-col items-end transition-all duration-700 ease-in-out ${
                  idx === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
              >
                <span className="font-mono text-2xl font-bold text-brand-green tracking-tight">
                  {item.indexLabel}
                </span>
                <span className="font-mono text-[11px] text-white/30 uppercase tracking-wider text-right">
                  {item.client}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 flex-1 items-center min-h-[500px] relative">
          
          {/* Left: Project Content */}
          <div className="lg:col-span-5 h-full relative flex items-center order-2 lg:order-1 min-h-[400px]">
            {projects.map((item, idx) => (
              <div 
                key={item.id}
                className={`absolute inset-0 flex flex-col justify-center space-y-6 transition-all duration-700 ease-in-out ${
                  idx === activeIndex 
                    ? 'opacity-100 translate-y-0 z-10' 
                    : 'opacity-0 translate-y-8 pointer-events-none z-0'
                }`}
              >
                {/* Category */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-3xl sm:text-4xl md:text-[42px] font-reckless font-normal text-white leading-tight tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-base text-white/50 font-sans font-light leading-relaxed">
                  {item.desc}
                </p>

                {/* Capabilities */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <span className="font-mono text-[11px] text-white/30 uppercase tracking-wider">
                    Capabilities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 border border-white/10 text-white/60 bg-black/20"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
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

          {/* Right: Large Visual Area */}
          <div className="lg:col-span-7 relative w-full aspect-video md:aspect-[16/10] lg:aspect-auto lg:h-[600px] border border-white/10 overflow-hidden bg-[#090914] order-1 lg:order-2 rounded-sm shrink-0">
            {projects.map((item, idx) => (
              <div
                key={`img-${item.id}`}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${
                  idx === activeIndex
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-[1.05] pointer-events-none z-0'
                }`}
              >
                <img 
                  src={item.image} 
                  alt={`${item.client} interface preview`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060611]/60 to-transparent pointer-events-none lg:hidden" />
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Progress Bar */}
        <div className="mt-8 md:mt-12 flex items-center gap-3 shrink-0">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManualSelect(idx)}
              className={`h-1 flex-1 transition-all duration-500 rounded-full cursor-pointer hover:bg-white/30 ${
                idx === activeIndex ? 'bg-brand-green' : 'bg-white/10'
              } ${idx < activeIndex ? 'bg-brand-green/60' : ''}`}
              aria-label={`View project ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
