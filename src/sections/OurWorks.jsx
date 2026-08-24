import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Tag from '../components/Tag.jsx'

export default function OurWorks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)

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
    },
  ]

  // Scroll-driven active project switching
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const viewportH = window.innerHeight

      // Calculate progress through the section (0 to 1)
      const scrolled = -sectionTop / (sectionHeight - viewportH)
      const progress = Math.max(0, Math.min(1, scrolled))
      const newIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length))
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeIndex, projects.length])

  const currentProject = projects[activeIndex]

  return (
    <section
      ref={sectionRef}
      id="our-work-section"
      className="section_our-work relative bg-[#060611] text-white overflow-hidden border-b border-white/10"
      style={{ minHeight: `${projects.length * 100}vh` }}
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

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between z-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between py-24 md:py-28">
          
          {/* Header Row */}
          <div className="flex items-start justify-between mb-10">
            <div className="space-y-4">
              <Tag text="lazy" />
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight">
                Our <span className="text-brand-green italic font-reckless">Work.</span>
              </h2>
              <p className="text-base text-white/50 font-sans font-light leading-relaxed max-w-md">
                Products and systems we've built to solve real business problems.
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex flex-col items-end space-y-2 pt-2">
              <span className="font-mono text-2xl font-bold text-brand-green tracking-tight">
                {currentProject.indexLabel}
              </span>
              <span className="font-mono text-[11px] text-white/30 uppercase tracking-wider">
                {currentProject.client}
              </span>
            </div>
          </div>

          {/* Main Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 flex-1 items-center">
            
            {/* Left: Project Content */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              
              {/* Progress + Category */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="md:hidden font-mono text-sm text-brand-green font-bold">
                    {currentProject.indexLabel}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                    {currentProject.category}
                  </span>
                </div>
              </div>

              {/* Project Title */}
              <h3
                key={`title-${activeIndex}`}
                className="text-3xl sm:text-4xl md:text-[42px] font-reckless font-normal text-white leading-tight tracking-tight transition-opacity duration-500"
              >
                {currentProject.title}
              </h3>

              {/* Description */}
              <p
                key={`desc-${activeIndex}`}
                className="text-base text-white/50 font-sans font-light leading-relaxed transition-opacity duration-500"
              >
                {currentProject.desc}
              </p>

              {/* Capabilities */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="font-mono text-[11px] text-white/30 uppercase tracking-wider">
                  Capabilities
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentProject.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 border border-white/10 text-white/60"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link
                  to={currentProject.link}
                  className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-wider text-brand-green hover:text-white transition-colors"
                >
                  <span>{currentProject.cta}</span>
                  <span>→</span>
                </Link>
              </div>

            </div>

            {/* Right: Large Visual Area */}
            <div className="lg:col-span-7 relative aspect-[16/10] border border-white/10 overflow-hidden bg-[#090914]">
              {projects.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                    idx === activeIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-[0.97] pointer-events-none'
                  }`}
                >
                  {/* CSS-generated project visual */}
                  <div className="w-full h-full flex flex-col items-center justify-center p-12 relative">
                    {/* Subtle grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    
                    {/* Project number watermark */}
                    <span className="absolute top-6 right-8 font-mono text-[120px] md:text-[180px] font-bold text-white/[0.03] leading-none select-none">
                      {item.num}
                    </span>
                    
                    {/* Center content */}
                    <div className="relative z-10 text-center space-y-4">
                      <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
                        {item.client}
                      </span>
                      <div className="w-16 h-px bg-brand-green/40 mx-auto" />
                      <span className="font-mono text-[11px] text-white/15 uppercase tracking-wider block">
                        {item.indexLabel}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Progress Bar */}
          <div className="mt-8 flex items-center gap-3">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-px flex-1 transition-all duration-500 ${
                  idx === activeIndex ? 'bg-brand-green' : 'bg-white/10'
                } ${idx <= activeIndex ? 'bg-brand-green/60' : ''}`}
                aria-label={`View project ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
