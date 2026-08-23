import React from 'react'
import Tag from '../components/Tag.jsx'

export default function Clients() {
  return (
    <section
      id="product-philosophy"
      className="section_philosophy relative bg-[#060611] text-white overflow-hidden py-24 md:py-32 lg:py-36 border-b border-white/10"
    >
      {/* Background Architectural Grid Lines (continuous with Hero 6-col grid) */}
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
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <Tag text="00001" />
            <span className="hidden sm:inline-block font-mono text-xs uppercase text-white/40 tracking-widest">
              // PRODUCT PHILOSOPHY
            </span>
          </div>
          <div className="flex items-center space-x-2 font-mono text-xs text-brand-green/80 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <span>CORE PILLARS</span>
          </div>
        </div>

        {/* Main Editorial Header: Two-Column Split (Editorial Serif + Supporting Sans) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 md:mb-24">
          
          {/* Main Heading Column */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-reckless font-normal leading-[1.08] text-white tracking-tight">
              We Don't Just Build Software. <br className="hidden sm:inline" />
              <span className="text-brand-green font-reckless italic">We Build Products.</span>
            </h2>
          </div>

          {/* Supporting Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-white/70 font-sans leading-relaxed font-light">
              From the first idea to production and beyond, LazyDeveloper combines product strategy, UI/UX, engineering, cloud, automation and AI to create technology that solves real business problems.
            </p>
          </div>
        </div>

        {/* 3 Editorial Ideas Layout (Architectural Grid with Corner '+' Markers, Monogram Watermarks & Asymmetric Rhythm) */}
        <div
          child-fade-in="40"
          className="grid grid-cols-1 lg:grid-cols-3 border-t border-b border-white/10 relative"
        >
          {/* IDEA 1: PRODUCT THINKING */}
          <div className="relative group border-b lg:border-b-0 lg:border-r border-white/10 p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[480px] bg-white/[0.015] hover:bg-white/[0.035] transition-all duration-500">
            {/* Top-Right Corner Crosshair '+' marker */}
            <div className="absolute top-3 right-3 text-white/30 font-mono text-xs select-none group-hover:text-brand-green transition-colors">
              +
            </div>
            
            {/* Background Monogram Glyph */}
            <div className="absolute right-6 bottom-6 text-[110px] sm:text-[140px] font-mono font-bold text-white/[0.025] select-none pointer-events-none leading-none group-hover:text-white/[0.05] transition-colors">
              01
            </div>

            {/* Card Header & Identifier */}
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-green/90 px-2.5 py-1 bg-brand-green/10 rounded-sm border border-brand-green/20">
                  PILLAR // 01
                </span>
                <span className="font-mono text-xs text-white/40">STRATEGY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-[34px] font-reckless font-normal text-white leading-tight tracking-tight group-hover:text-white transition-colors">
                PRODUCT THINKING
              </h3>
            </div>

            {/* Card Footer Content */}
            <div className="relative z-10 pt-10 mt-auto border-t border-white/5 space-y-3">
              <div className="font-mono text-base sm:text-lg text-brand-green font-medium">
                Not just development.
              </div>
              <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                We obsess over product-market fit, user friction, unit economics, and scalable architecture before writing a single line of code.
              </p>
            </div>
          </div>

          {/* IDEA 2: BUSINESS UNDERSTANDING */}
          <div className="relative group border-b lg:border-b-0 lg:border-r border-white/10 p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[480px] bg-gradient-to-b from-white/[0.04] to-white/[0.015] hover:bg-white/[0.05] transition-all duration-500">
            {/* Top-Right Corner Crosshair '+' marker */}
            <div className="absolute top-3 right-3 text-brand-green/60 font-mono text-xs select-none group-hover:text-brand-green transition-colors">
              +
            </div>

            {/* Background Monogram Glyph */}
            <div className="absolute right-6 bottom-6 text-[110px] sm:text-[140px] font-mono font-bold text-white/[0.025] select-none pointer-events-none leading-none group-hover:text-brand-green/[0.06] transition-colors">
              02
            </div>

            {/* Card Header & Identifier */}
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-teal-300 px-2.5 py-1 bg-teal-500/10 rounded-sm border border-teal-500/20">
                  PILLAR // 02
                </span>
                <span className="font-mono text-xs text-white/40">ALIGNMENT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-[34px] font-reckless font-normal text-white leading-tight tracking-tight">
                BUSINESS UNDERSTANDING
              </h3>
            </div>

            {/* Card Footer Content */}
            <div className="relative z-10 pt-10 mt-auto border-t border-white/5 space-y-3">
              <div className="font-mono text-base sm:text-lg text-teal-300 font-medium">
                Technology aligned with business goals.
              </div>
              <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                Every sprint, feature, and architectural choice is tied directly to customer acquisition, operational efficiency, and revenue velocity.
              </p>
            </div>
          </div>

          {/* IDEA 3: END-TO-END ENGINEERING */}
          <div className="relative group p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[480px] bg-white/[0.015] hover:bg-white/[0.035] transition-all duration-500">
            {/* Top-Right Corner Crosshair '+' marker */}
            <div className="absolute top-3 right-3 text-white/30 font-mono text-xs select-none group-hover:text-brand-green transition-colors">
              +
            </div>

            {/* Background Monogram Glyph */}
            <div className="absolute right-6 bottom-6 text-[110px] sm:text-[140px] font-mono font-bold text-white/[0.025] select-none pointer-events-none leading-none group-hover:text-white/[0.05] transition-colors">
              03
            </div>

            {/* Card Header & Identifier */}
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-green/90 px-2.5 py-1 bg-brand-green/10 rounded-sm border border-brand-green/20">
                  PILLAR // 03
                </span>
                <span className="font-mono text-xs text-white/40">FULL-STACK</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-[34px] font-reckless font-normal text-white leading-tight tracking-tight">
                END-TO-END ENGINEERING
              </h3>
            </div>

            {/* Card Footer Content: Pipeline Steps */}
            <div className="relative z-10 pt-10 mt-auto border-t border-white/5 space-y-4">
              <div className="font-mono text-sm sm:text-base text-white/90 font-medium">
                Idea · Design · Development · Deployment · Scale.
              </div>

              {/* Stepped Process Indicator Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {['Idea', 'Design', 'Development', 'Deployment', 'Scale'].map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="font-mono text-[11px] text-white/60 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
                      {step}
                    </span>
                    {idx < 4 && <span className="text-brand-green/60 text-xs font-mono">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom subtle architectural ticker line */}
        <div className="mt-8 flex items-center justify-between font-mono text-[11px] text-white/30 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 bg-brand-green rounded-full opacity-60" />
            <span>LAZYDEVELOPER TECHED // PRODUCT SUITE</span>
          </div>
          <div className="hidden sm:block">
            <span>[ 00001 / 00012 ]</span>
          </div>
        </div>

      </div>
    </section>
  )
}
