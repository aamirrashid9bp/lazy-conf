import React from 'react'
import Tag from '../components/Tag.jsx'

export default function Founders() {
  const audiences = [
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
      text: 'Modernize business operations with scalable applications, integrations, automation, cloud infrastructure and AI.',
      capabilities: 'Enterprise Platforms · Integrations · Automation · AI',
    },
  ]

  return (
    <section
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
        
        {/* Main Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20 md:mb-28">
          
          {/* Left Column: Large Heading */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight">
              We Build For Startups, <br className="hidden sm:inline" />
              <span className="text-brand-green italic font-reckless">SMEs & Enterprises.</span>
            </h2>
          </div>

          {/* Right Column: Tag + Introduction */}
          <div className="lg:col-span-5 flex flex-col space-y-5 pt-1">
            <Tag text="lazy" />
            <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed">
              From idea-stage startups to growing businesses and enterprises, we build technology around real workflows, business goals and the people who use them.
            </p>
          </div>
        </div>

        {/* Audience Blocks — Two column + Full width */}
        <div child-fade-in="40" className="space-y-0">
          
          {/* Top Row: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/10">
            {audiences.slice(0, 2).map((item, idx) => (
              <div
                key={item.id}
                className={`py-12 md:py-16 px-0 md:pr-12 ${
                  idx === 0 ? 'md:border-r border-b md:border-b-0 border-white/10' : ''
                } ${idx === 1 ? 'md:pl-12' : ''}`}
              >
                <span className="font-mono text-xs text-white/30 tracking-wider">{item.num}</span>
                <h3 className="text-3xl sm:text-4xl font-reckless font-normal text-white tracking-tight mt-4 mb-3">
                  {item.title}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                  {item.label}
                </span>
                <p className="text-base text-white/60 font-sans font-light leading-relaxed mt-6 mb-4">
                  {item.text}
                </p>
                <div className="pt-4 border-t border-white/5 font-mono text-xs text-white/50 flex items-center gap-2">
                  <span className="text-white/30 uppercase">Capabilities:</span>
                  <span className="text-white/60">{item.capabilities}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: Full Width Enterprise */}
          <div className="border-t border-white/10 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="font-mono text-xs text-white/30 tracking-wider">{audiences[2].num}</span>
                <h3 className="text-3xl sm:text-4xl font-reckless font-normal text-white tracking-tight mt-4 mb-3">
                  {audiences[2].title}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                  {audiences[2].label}
                </span>
              </div>
              <div className="lg:col-span-7">
                <p className="text-base text-white/60 font-sans font-light leading-relaxed mb-4">
                  {audiences[2].text}
                </p>
                <div className="pt-4 border-t border-white/5 font-mono text-xs text-white/50 flex items-center gap-2">
                  <span className="text-white/30 uppercase">Capabilities:</span>
                  <span className="text-white/60">{audiences[2].capabilities}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
