import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Tag from '../components/Tag.jsx'

export default function OurWorks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const progressIntervalRef = useRef(null)

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
        'Lead Management',
        'CRM',
        'Sales Pipeline',
        'Follow-ups',
        'Team Management',
        'Reporting',
        'Automation',
      ],
      cta: 'Explore ConvertLeads',
      link: '/project/convertleads',
      image: 'https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69dcc77374d57ad0836fd7ca_agritrak%20img-12.avif',
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
        'Student Management',
        'College Management',
        'Academic Management',
        'Examination',
        'Results',
        'Administration',
        'Reporting',
      ],
      cta: 'Explore RTMNU System',
      link: '/project/rtmnu-system',
      image: 'https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69dcdb635ee4b2a7f6def34b_circular%20eco%20thumbnail.avif',
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
        'Ordering',
        'Employees',
        'Monthly Orders',
        'Inventory',
        'Delivery',
        'Notifications',
        'Payments',
        'CRM',
        'Operations',
      ],
      cta: 'Explore Echaii',
      link: '/project/echaii',
      image: 'https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69dcd82214943751a716881c_ithaca%20hummus%20thumbnail.avif',
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
        'Workspace',
        'Seats',
        'Cabins',
        'Meeting Rooms',
        'Members',
        'Billing',
        'Bookings',
        'CRM',
        'Operations',
      ],
      cta: 'Explore Innovexa Space',
      link: '/project/innovexa-space',
      image: 'https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69dcc54c44e5df02d800440a_engame%20img-14.avif',
    },
  ]

  // Slide duration progress timer
  const SLIDE_DURATION = 7000

  useEffect(() => {
    setProgress(0)
    const startTime = Date.now()

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
      setProgress(pct)

      if (pct >= 100) {
        clearInterval(progressIntervalRef.current)
        setActiveIndex((prev) => (prev + 1) % projects.length)
      }
    }, 50)

    return () => clearInterval(progressIntervalRef.current)
  }, [activeIndex, projects.length])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const currentProject = projects[activeIndex]

  return (
    <section
      id="our-work-section"
      className="section_our-work relative bg-[#060611] text-white overflow-hidden py-24 md:py-32 lg:py-36 border-b border-white/10"
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

      {/* Subtle radial ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#2F6F5E]/[0.05] via-transparent to-transparent pointer-events-none blur-3xl -z-0" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Main Editorial Header: Large Serif Headline on Left + [ lazy ] and Supporting Text on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14 md:mb-18">
          
          {/* Left Column: Large Editorial Heading */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight">
              Our <span className="text-brand-green italic font-reckless">Work.</span>
            </h2>
          </div>

          {/* Right Column: [ lazy ] Section Badge + Supporting Text + Arrow Navigation */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 pt-1">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Tag text="lazy" />
                <span className="font-mono text-xs uppercase text-white/40 tracking-widest">
                  // CASE STUDIES & SYSTEMS
                </span>
              </div>
              <p className="text-base sm:text-lg text-white/70 font-sans font-light leading-relaxed">
                Products and systems we've built to solve real business problems.
              </p>
            </div>

            {/* Top Navigation & Live Counter Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="font-mono text-base font-bold text-white flex items-center space-x-2">
                <span className="text-brand-green text-xl font-mono">{currentProject.indexLabel}</span>
                <span className="text-white/40 text-xs font-mono">// ACTIVE PROJECT</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrev}
                  aria-label="Previous project"
                  className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-brand-green/40 flex items-center justify-center text-white transition-all active:scale-95"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next project"
                  className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-brand-green/40 flex items-center justify-center text-white transition-all active:scale-95"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 pb-4 border-b border-white/10">
          {projects.map((proj, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#0d0d1c] border-brand-green/50 shadow-[0_0_20px_rgba(47,111,94,0.15)]'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-white/60 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 w-full">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-brand-green' : 'text-white/40'}`}>
                    {proj.num} //
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-brand-green animate-pulse' : 'bg-white/20'}`} />
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold truncate text-white">
                  {proj.client}
                </div>
              </button>
            )
          })}
        </div>

        {/* Main Large Editorial Project Storytelling Showcase */}
        <div className="group relative bg-[#090914] border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-12 transition-all duration-700 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Project Editorial Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              {/* Category Pill + Project Number */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-brand-green font-bold px-3 py-1 bg-brand-green/10 border border-brand-green/20 rounded-full">
                    PROJECT {currentProject.num}
                  </span>
                  <span className="inline-block font-mono text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full border bg-[#5457cd]/20 text-[#9b9dff] border-[#5457cd]/40">
                    {currentProject.category}
                  </span>
                </div>

                {/* Main Project Storytelling Headline */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-normal text-white leading-tight tracking-tight">
                  {currentProject.title}
                </h3>
              </div>

              {/* Description Paragraph */}
              <p className="text-base sm:text-lg text-white/70 font-sans font-light leading-relaxed">
                {currentProject.desc}
              </p>

              {/* Capabilities Metadata Badges */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <div className="font-mono text-[11px] text-white/40 uppercase tracking-wider">
                  Engineered Capabilities
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProject.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 bg-white/[0.04] border border-white/10 rounded-md text-white/80"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Link to Project Case Study */}
              <div className="pt-6 border-t border-white/10">
                <Link
                  to={currentProject.link}
                  className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider bg-brand-green text-white hover:bg-brand-green/85 font-semibold transition-all shadow-[0_0_20px_rgba(47,111,94,0.3)] hover:scale-[1.02] active:scale-95"
                >
                  <span>{currentProject.cta}</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

            </div>

            {/* Right Column: Large Interactive Visual Storytelling Canvas */}
            <div className="lg:col-span-6 relative aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#0c0c16] border border-white/10 shadow-2xl">
              {projects.map((item, idx) => {
                const isActive = idx === activeIndex
                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out transform ${
                      isActive
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-95 pointer-events-none z-0'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090914] via-transparent to-transparent opacity-70" />
                    
                    {/* Top Right Project Number Watermark */}
                    <div className="absolute top-4 right-4 font-mono text-xs px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-md text-white/90">
                      {item.indexLabel}
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full mt-10">
            <div
              className="absolute top-0 bottom-0 left-0 bg-brand-green transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

        {/* Section Footer Meta Rule */}
        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/30 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 bg-brand-green rounded-full opacity-70" />
            <span>LAZYDEVELOPER TECHED // FEATURED PORTFOLIO & CASE STUDIES</span>
          </div>
          <div>
            <span>[ lazy ]</span>
          </div>
        </div>

      </div>
    </section>
  )
}
