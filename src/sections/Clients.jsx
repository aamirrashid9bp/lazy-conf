import React from 'react'
import Tag from '../components/Tag.jsx'

// Constellation Network Glyph inspired by One Venture Studio's interactive glyphs
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

// Multi-strip sliced visual collage component (recreates One Venture Studio's sliced editorial artwork)
function SlicedCollage({ theme = 'startups' }) {
  const stripConfigs = {
    startups: [
      { h: 'h-[85%]', bg: 'from-zinc-700/80 via-zinc-800 to-zinc-900', label: '01', delay: '0ms' },
      { h: 'h-[100%]', bg: 'from-zinc-600/90 via-zinc-700 to-zinc-950', label: 'MVP', delay: '50ms' },
      { h: 'h-[75%]', bg: 'from-teal-900/40 via-zinc-800 to-zinc-900', label: 'UI', delay: '100ms' },
      { h: 'h-[92%]', bg: 'from-zinc-600/80 via-zinc-700 to-zinc-900', label: 'DEV', delay: '150ms' },
      { h: 'h-[80%]', bg: 'from-zinc-700/90 via-zinc-800 to-zinc-950', label: 'GTM', delay: '200ms' },
      { h: 'h-[95%]', bg: 'from-zinc-600/70 via-zinc-800 to-zinc-900', label: 'SCALE', delay: '250ms' },
      { h: 'h-[70%]', bg: 'from-zinc-800/80 via-zinc-900 to-black', label: '07', delay: '300ms' },
    ],
    smes: [
      { h: 'h-[80%]', bg: 'from-zinc-800/80 via-zinc-900 to-black', label: '01', delay: '0ms' },
      { h: 'h-[95%]', bg: 'from-indigo-950/50 via-zinc-800 to-zinc-900', label: 'ERP', delay: '50ms' },
      { h: 'h-[70%]', bg: 'from-zinc-700/80 via-zinc-800 to-zinc-950', label: 'CRM', delay: '100ms' },
      { h: 'h-[100%]', bg: 'from-zinc-600/90 via-zinc-700 to-zinc-900', label: 'AUTO', delay: '150ms' },
      { h: 'h-[85%]', bg: 'from-zinc-700/90 via-zinc-800 to-zinc-900', label: 'DATA', delay: '200ms' },
      { h: 'h-[75%]', bg: 'from-zinc-600/80 via-zinc-800 to-zinc-950', label: 'OPS', delay: '250ms' },
      { h: 'h-[90%]', bg: 'from-zinc-700/80 via-zinc-900 to-black', label: '07', delay: '300ms' },
    ],
    enterprises: [
      { h: 'h-[75%]', bg: 'from-zinc-700/80 via-zinc-800 to-zinc-950', label: '01', delay: '0ms' },
      { h: 'h-[90%]', bg: 'from-teal-950/60 via-zinc-800 to-zinc-900', label: 'AI', delay: '50ms' },
      { h: 'h-[100%]', bg: 'from-zinc-600/90 via-zinc-700 to-zinc-900', label: 'CLOUD', delay: '100ms' },
      { h: 'h-[80%]', bg: 'from-blue-950/50 via-zinc-800 to-zinc-950', label: 'LLM', delay: '150ms' },
      { h: 'h-[95%]', bg: 'from-zinc-600/80 via-zinc-700 to-zinc-900', label: 'SYS', delay: '200ms' },
      { h: 'h-[85%]', bg: 'from-zinc-700/90 via-zinc-800 to-zinc-950', label: 'SCALE', delay: '250ms' },
      { h: 'h-[70%]', bg: 'from-zinc-800/80 via-zinc-900 to-black', label: '07', delay: '300ms' },
    ],
  }

  const strips = stripConfigs[theme] || stripConfigs.startups

  return (
    <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] bg-[#0c0c16] rounded-lg overflow-hidden border border-white/10 flex items-center justify-center p-4">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Sliced Vertical Strips Container */}
      <div className="relative w-full h-full flex items-center justify-between gap-1 sm:gap-2 z-10">
        {strips.map((strip, idx) => (
          <div
            key={idx}
            className={`flex-1 ${strip.h} rounded-sm bg-gradient-to-b ${strip.bg} border border-white/10 relative overflow-hidden transition-all duration-700 group-hover:scale-y-[1.03] group-hover:border-brand-green/30 flex flex-col justify-between p-1.5`}
            style={{ transitionDelay: strip.delay }}
          >
            {/* Subtle inner grid glow */}
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

export default function Clients() {
  const audienceCards = [
    {
      id: 'startups',
      title: 'Startups',
      label: 'IDEA · PRODUCT',
      text: 'Turn ideas into MVPs and production-ready digital products.',
      pillClass: 'bg-[#5457cd]/20 text-[#9b9dff] border-[#5457cd]/40',
      activeDot: 1,
      theme: 'startups',
      colSpan: 'lg:col-span-4',
    },
    {
      id: 'smes',
      title: 'SMEs',
      label: 'MANUAL · DIGITAL',
      text: 'Replace spreadsheets, disconnected tools and repetitive processes with custom software, CRM, ERP and automation.',
      pillClass: 'bg-[#5457cd]/20 text-[#9b9dff] border-[#5457cd]/40',
      activeDot: 3,
      theme: 'smes',
      colSpan: 'lg:col-span-4',
    },
    {
      id: 'enterprises',
      title: 'Enterprises',
      label: 'SYSTEMS · INTELLIGENCE',
      text: 'Modernize business operations with scalable software, integrations, automation, cloud and AI.',
      pillClass: 'bg-[#5457cd]/20 text-[#9b9dff] border-[#5457cd]/40',
      activeDot: 6,
      theme: 'enterprises',
      colSpan: 'lg:col-span-4',
    },
  ]

  return (
    <section
      id="about-us-section"
      className="section_audience relative bg-[#060611] text-white overflow-hidden py-24 md:py-32 lg:py-36 border-b border-white/10"
    >
      {/* Background Architectural Grid Lines (matching Hero 6-col grid for seamless continuation) */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      {/* Subtle radial ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-brand-green/[0.03] via-transparent to-transparent pointer-events-none blur-3xl -z-0" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Upper Meta Bar: Section Number + Category Indicator */}
        <div className="flex items-center justify-between pb-6 mb-10 md:mb-14 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <Tag text="00001" />
            <span className="hidden sm:inline-block font-mono text-xs uppercase text-white/40 tracking-widest">
              // AUDIENCE & FOCUS
            </span>
          </div>
          <div className="flex items-center space-x-2 font-mono text-xs text-brand-green/80 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <span>WHO WE BUILD FOR</span>
          </div>
        </div>

        {/* Main Editorial Header: Large Serif Headline + Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 md:mb-24">
          
          {/* Main Heading Column */}
          <div className="lg:col-span-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-reckless font-normal leading-[1.06] text-white tracking-tight">
              Built For Businesses That Want To Move Forward.
            </h2>
          </div>

          {/* Supporting Introduction Text */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-white/70 font-sans leading-relaxed font-light">
              We work with startups, SMEs and enterprises that need technology to solve real business problems, automate operations and build scalable digital products.
            </p>
          </div>
        </div>

        {/* Audience Visual Blocks Layout (Recreating One Venture Studio's high-end visual blocks) */}
        <div
          child-fade-in="40"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {audienceCards.map((card) => (
            <div
              key={card.id}
              className="group relative bg-[#090914] border border-white/10 hover:border-white/25 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[500px] sm:min-h-[540px] transition-all duration-500 hover:bg-[#0d0d1c] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Card Top: Multi-Strip Sliced Visual Art */}
              <div className="w-full mb-8">
                <SlicedCollage theme={card.theme} />
              </div>

              {/* Card Bottom Content */}
              <div className="space-y-5">
                {/* Title + Constellation Glyph Row */}
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl sm:text-4xl font-reckless font-normal text-white tracking-tight group-hover:text-brand-green transition-colors duration-300">
                    {card.title}
                  </h3>
                  <ConstellationGlyph activeDot={card.activeDot} />
                </div>

                {/* Audience Stage Pill */}
                <div>
                  <span
                    className={`inline-block font-mono text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full border ${card.pillClass}`}
                  >
                    {card.label}
                  </span>
                </div>

                {/* Editorial Description Text */}
                <p className="text-sm sm:text-base text-white/70 font-sans font-light leading-relaxed pt-2 border-t border-white/5">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer Meta Rule */}
        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/30 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 bg-brand-green rounded-full opacity-70" />
            <span>LAZYDEVELOPER TECHED // AUDIENCE VERTICALS</span>
          </div>
          <div>
            <span>[ 00001 / 00012 ]</span>
          </div>
        </div>

      </div>
    </section>
  )
}
