import React from 'react'
import Tag from '../components/Tag.jsx'

export default function Clients() {
  const audienceCards = [
    {
      id: 'startups',
      num: '01',
      title: 'Startups',
      label: 'IDEA → PRODUCT',
      text: 'Turn ideas into MVPs and production-ready digital products.',
      capabilities: 'Mobile Apps · Web Apps · SaaS · AI Products',
    },
    {
      id: 'smes',
      num: '02',
      title: 'SMEs',
      label: 'MANUAL → DIGITAL',
      text: 'Replace spreadsheets, disconnected tools and repetitive processes with custom software, CRM, ERP and automation.',
      capabilities: 'CRM · ERP · Automation · Custom Software',
    },
    {
      id: 'enterprises',
      num: '03',
      title: 'Enterprises',
      label: 'SYSTEMS → INTELLIGENCE',
      text: 'Modernize business operations with scalable software, integrations, automation, cloud and AI.',
      capabilities: 'Enterprise Platforms · Integrations · Automation · AI',
    },
  ]

  return (
    <section
      id="about-us-section"
      className="section_audience relative bg-[#060611] text-white overflow-hidden py-28 md:py-36 lg:py-44 border-b border-white/10"
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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Marker */}
        <div className="flex items-center space-x-3 mb-10">
          <Tag text="lazy" />
        </div>

        {/* Main Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-20 md:mb-28">
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight">
              Built For Businesses That Want To Move Forward.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed">
              We work with startups, SMEs and enterprises that need technology to solve real business problems, automate operations and build scalable digital products.
            </p>
          </div>
        </div>

        {/* Audience Blocks — Clean Editorial Layout */}
        <div child-fade-in="40" className="border-t border-white/10">
          {audienceCards.map((card, idx) => (
            <div
              key={card.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-12 md:py-16 ${
                idx < audienceCards.length - 1 ? 'border-b border-white/10' : ''
              }`}
            >
              {/* Left: Number + Title */}
              <div className="lg:col-span-4 flex flex-col space-y-4">
                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                  {card.num}
                </span>
                <h3 className="text-3xl sm:text-4xl font-reckless font-normal text-white tracking-tight">
                  {card.title}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 border-b border-white/10 pb-3 inline-block self-start">
                  {card.label}
                </span>
              </div>

              {/* Right: Description + Capabilities */}
              <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
                <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed max-w-2xl">
                  {card.text}
                </p>
                <div className="flex items-center gap-3 font-mono text-xs text-white/50">
                  <span className="text-white/30 uppercase">Capabilities:</span>
                  <span className="text-white/70">{card.capabilities}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
