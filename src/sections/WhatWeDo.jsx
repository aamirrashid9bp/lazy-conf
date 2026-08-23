import React from 'react'
import Tag from '../components/Tag.jsx'

// Rotating constellation node glyph
function ConstellationGlyph({ activeDot = 6, className = "w-10 h-10" }) {
  const dots = [
    { cx: 20, cy: 6 },
    { cx: 30, cy: 10 },
    { cx: 34, cy: 20 },
    { cx: 30, cy: 30 },
    { cx: 20, cy: 34 },
    { cx: 10, cy: 30 },
    { cx: 6, cy: 20 },
    { cx: 10, cy: 10 },
  ]

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`${className} transition-transform duration-700 group-hover:rotate-45 select-none`}
    >
      <circle cx="20" cy="20" r="2.5" fill="#ffffff" />
      {dots.map((d, i) => (
        <line
          key={i}
          x1="20"
          y1="20"
          x2={d.cx}
          y2={d.cy}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
      ))}
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={i === activeDot ? 2.5 : 1.5}
          fill={i === activeDot ? '#2F6F5E' : 'rgba(255,255,255,0.6)'}
        />
      ))}
    </svg>
  )
}

// Multi-strip sliced visual collage for service groups
function ServiceSlices({ theme = 'product', isPanoramic = false }) {
  const stripConfigs = {
    product: [
      { h: 'h-[85%]', bg: 'from-zinc-700/80 via-zinc-800 to-zinc-900', label: 'APP', delay: '0ms' },
      { h: 'h-[100%]', bg: 'from-teal-950/60 via-zinc-800 to-zinc-900', label: 'WEB', delay: '50ms' },
      { h: 'h-[75%]', bg: 'from-zinc-700/90 via-zinc-800 to-zinc-950', label: 'SAAS', delay: '100ms' },
      { h: 'h-[92%]', bg: 'from-zinc-600/80 via-zinc-700 to-zinc-900', label: 'PAAS', delay: '150ms' },
      { h: 'h-[80%]', bg: 'from-blue-950/50 via-zinc-800 to-zinc-950', label: 'UI/UX', delay: '200ms' },
      { h: 'h-[95%]', bg: 'from-zinc-600/70 via-zinc-800 to-zinc-900', label: 'SCALE', delay: '250ms' },
      { h: 'h-[70%]', bg: 'from-zinc-800/80 via-zinc-900 to-black', label: '07', delay: '300ms' },
    ],
    systems: [
      { h: 'h-[80%]', bg: 'from-zinc-800/80 via-zinc-900 to-black', label: 'CRM', delay: '0ms' },
      { h: 'h-[95%]', bg: 'from-indigo-950/50 via-zinc-800 to-zinc-900', label: 'ERP', delay: '50ms' },
      { h: 'h-[70%]', bg: 'from-zinc-700/80 via-zinc-800 to-zinc-950', label: 'AUTO', delay: '100ms' },
      { h: 'h-[100%]', bg: 'from-zinc-600/90 via-zinc-700 to-zinc-900', label: 'DATA', delay: '150ms' },
      { h: 'h-[85%]', bg: 'from-zinc-700/90 via-zinc-800 to-zinc-900', label: 'OPS', delay: '200ms' },
      { h: 'h-[75%]', bg: 'from-teal-950/60 via-zinc-800 to-zinc-950', label: 'PIPE', delay: '250ms' },
      { h: 'h-[90%]', bg: 'from-zinc-700/80 via-zinc-900 to-black', label: '07', delay: '300ms' },
    ],
    ai: [
      { h: 'h-[75%]', bg: 'from-zinc-700/80 via-zinc-800 to-zinc-950', label: 'LLM', delay: '0ms' },
      { h: 'h-[90%]', bg: 'from-teal-950/60 via-zinc-800 to-zinc-900', label: 'AGENT', delay: '50ms' },
      { h: 'h-[100%]', bg: 'from-zinc-600/90 via-zinc-700 to-zinc-900', label: 'RAG', delay: '100ms' },
      { h: 'h-[80%]', bg: 'from-blue-950/50 via-zinc-800 to-zinc-950', label: 'SEARCH', delay: '150ms' },
      { h: 'h-[95%]', bg: 'from-zinc-600/80 via-zinc-700 to-zinc-900', label: 'NEURAL', delay: '200ms' },
      { h: 'h-[85%]', bg: 'from-zinc-700/90 via-zinc-800 to-zinc-950', label: 'AUTO', delay: '250ms' },
      { h: 'h-[70%]', bg: 'from-zinc-800/80 via-zinc-900 to-black', label: '07', delay: '300ms' },
      { h: 'h-[92%]', bg: 'from-teal-900/40 via-zinc-800 to-zinc-900', label: 'INTEL', delay: '350ms' },
      { h: 'h-[80%]', bg: 'from-zinc-700/80 via-zinc-800 to-zinc-950', label: 'SCALE', delay: '400ms' },
    ],
  }

  const strips = stripConfigs[theme] || stripConfigs.product
  const heightClass = isPanoramic ? 'h-[180px] sm:h-[220px] md:h-[260px]' : 'h-[220px] sm:h-[260px] md:h-[290px]'

  return (
    <div className={`relative w-full ${heightClass} bg-[#0c0c16] rounded-lg overflow-hidden border border-white/10 flex items-center justify-center p-4`}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Sliced Strips */}
      <div className="relative w-full h-full flex items-center justify-between gap-1 sm:gap-2 z-10">
        {strips.map((strip, idx) => (
          <div
            key={idx}
            className={`flex-1 ${strip.h} rounded-sm bg-gradient-to-b ${strip.bg} border border-white/10 relative overflow-hidden transition-all duration-700 group-hover:scale-y-[1.03] group-hover:border-brand-green/30 flex flex-col justify-between p-1.5`}
            style={{ transitionDelay: strip.delay }}
          >
            <div className="text-[8px] font-mono text-white/20 uppercase text-center select-none">
              {strip.label}
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="text-[7px] font-mono text-white/30 text-center select-none">
              //
            </div>
          </div>
        ))}
      </div>

      {/* Signature Center Glowing '+' Crosshair Badge */}
      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <span className="text-brand-green text-3xl font-mono font-bold drop-shadow-[0_0_16px_rgba(47,111,94,0.7)] group-hover:scale-125 transition-transform duration-500">
          +
        </span>
      </div>
    </div>
  )
}

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do-section"
      className="section_what-we-build relative bg-[#060611] text-white overflow-hidden py-24 md:py-32 lg:py-36 border-b border-white/10"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 md:mb-20">
          
          {/* Left Column: Large Editorial Heading */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight">
              What We <span className="text-brand-green italic font-reckless">Build.</span>
            </h2>
          </div>

          {/* Right Column: [ lazy ] Section Badge + Supporting Text */}
          <div className="lg:col-span-5 flex flex-col space-y-4 pt-1">
            <div className="flex items-center space-x-3">
              <Tag text="lazy" />
              <span className="font-mono text-xs uppercase text-white/40 tracking-widest">
                // FULL-STACK CAPABILITIES
              </span>
            </div>
            <p className="text-base sm:text-lg text-white/70 font-sans font-light leading-relaxed">
              From digital products and business systems to automation and AI, we build technology around the way your business actually works.
            </p>
          </div>
        </div>

        {/* Asymmetric Service Groups Layout */}
        <div child-fade-in="40" className="space-y-6 lg:space-y-8">
          
          {/* Top Row: 2 Primary Columns (Product Development & Business Systems) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* SERVICE GROUP 1: PRODUCT DEVELOPMENT */}
            <div className="group relative bg-[#090914] border border-white/10 hover:border-white/25 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[520px] transition-all duration-500 hover:bg-[#0d0d1c] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              {/* Top: Multi-Strip Sliced Visual Collage */}
              <div className="w-full mb-8">
                <ServiceSlices theme="product" />
              </div>

              {/* Bottom Content */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl sm:text-4xl font-reckless font-normal text-white tracking-tight group-hover:text-brand-green transition-colors duration-300">
                    Product Development
                  </h3>
                  <ConstellationGlyph activeDot={1} />
                </div>

                <div>
                  <span className="inline-block font-mono text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full border bg-[#5457cd]/20 text-[#9b9dff] border-[#5457cd]/40">
                    DIGITAL PRODUCTS · APPS · SAAS
                  </span>
                </div>

                <p className="text-sm sm:text-base text-white/70 font-sans font-light leading-relaxed pt-2 border-t border-white/5">
                  We design and build digital products from idea to production, including mobile applications, web platforms and scalable SaaS and PaaS products.
                </p>

                {/* Capabilities Sub-bar */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs text-white/50">
                  <span className="text-[11px] text-white/40 uppercase">Capabilities:</span>
                  <span className="text-xs text-white/80">Mobile Apps · Web Applications · SaaS · PaaS</span>
                </div>
              </div>
            </div>

            {/* SERVICE GROUP 2: BUSINESS SYSTEMS */}
            <div className="group relative bg-[#090914] border border-white/10 hover:border-white/25 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[520px] transition-all duration-500 hover:bg-[#0d0d1c] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              {/* Top: Multi-Strip Sliced Visual Collage */}
              <div className="w-full mb-8">
                <ServiceSlices theme="systems" />
              </div>

              {/* Bottom Content */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl sm:text-4xl font-reckless font-normal text-white tracking-tight group-hover:text-brand-green transition-colors duration-300">
                    Business Systems
                  </h3>
                  <ConstellationGlyph activeDot={3} />
                </div>

                <div>
                  <span className="inline-block font-mono text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full border bg-[#5457cd]/20 text-[#9b9dff] border-[#5457cd]/40">
                    CRM · ERP · CUSTOM SYSTEMS
                  </span>
                </div>

                <p className="text-sm sm:text-base text-white/70 font-sans font-light leading-relaxed pt-2 border-t border-white/5">
                  We replace disconnected tools and manual workflows with custom business software, CRM, ERP and automated systems.
                </p>

                {/* Capabilities Sub-bar */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs text-white/50">
                  <span className="text-[11px] text-white/40 uppercase">Capabilities:</span>
                  <span className="text-xs text-white/80">CRM · ERP · Custom Software · Automation</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Panoramic Full-Width Showcase for AI & Intelligent Products */}
          <div className="group relative bg-[#090914] border border-white/10 hover:border-white/25 rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:bg-[#0d0d1c] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Visual Slices Showcase */}
              <div className="lg:col-span-6 w-full">
                <ServiceSlices theme="ai" isPanoramic={true} />
              </div>

              {/* Right Column: Editorial Content */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl sm:text-4xl font-reckless font-normal text-white tracking-tight group-hover:text-brand-green transition-colors duration-300">
                    AI & Intelligent Products
                  </h3>
                  <ConstellationGlyph activeDot={6} />
                </div>

                <div>
                  <span className="inline-block font-mono text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full border bg-[#5457cd]/20 text-[#9b9dff] border-[#5457cd]/40">
                    AI AGENTS · LLMS · AUTOMATION
                  </span>
                </div>

                <p className="text-base text-white/70 font-sans font-light leading-relaxed pt-2 border-t border-white/5">
                  We build practical AI-powered products and workflows that help businesses automate work, understand information and make better decisions.
                </p>

                {/* Capabilities Tag Bar */}
                <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-white/50">
                  <span className="text-[11px] text-white/40 uppercase">Capabilities:</span>
                  <span className="text-xs text-white/80">AI Products · AI Agents · RAG · Intelligent Search · AI Automation</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Section Footer Meta Rule */}
        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/30 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 bg-brand-green rounded-full opacity-70" />
            <span>LAZYDEVELOPER TECHED // CORE EXECUTION CAPABILITIES</span>
          </div>
          <div>
            <span>[ lazy ]</span>
          </div>
        </div>

      </div>
    </section>
  )
}
