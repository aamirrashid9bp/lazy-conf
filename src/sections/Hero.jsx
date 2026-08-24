import React, { useRef } from 'react'
import InteractiveLazyWordmark from '../components/InteractiveLazyWordmark.jsx'

export default function Hero() {
  const headerRef = useRef(null)

  return (
    <header
      ref={headerRef}
      className="section_hero relative min-h-screen bg-[#edeef2] text-gray-900 pt-20 md:pt-24 pb-10 flex flex-col justify-between overflow-hidden border-b-2 border-black/85"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between">
        
        {/* Upper Hero Grid: Large Editorial Headline (No [ 00000 ]) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-10 md:pt-14 pb-8 border-b border-black/10">
          
          <div className="hidden lg:block lg:col-span-4" />

          {/* Right Column: Large Editorial Serif Headline */}
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.06] text-gray-950 tracking-tight opacity-100">
              We Build Software<br />
              That Moves <span className="text-teal-600 font-sans font-normal">*</span><br />
              Businesses Forward.
            </h1>
          </div>
        </div>

        {/* Lower Hero Grid: Oversized 'lazy' & Right Content Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-8 pb-2">
          
          {/* Lower Left: Oversized 'lazy' Wordmark with Cursor Interaction */}
          <div className="lg:col-span-7 flex items-end">
            <InteractiveLazyWordmark heroRef={headerRef} />
          </div>

          {/* Lower Right: Eyebrow, Copy, CTA Buttons & CLICK TO MOVE */}
          <div className="lg:col-span-5 flex flex-col space-y-6 pb-2">
            
            {/* Eyebrow */}
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-teal-700">
              SOFTWARE PRODUCTS · ENGINEERING · AUTOMATION · AI
            </div>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-gray-700 font-body leading-relaxed max-w-md opacity-100">
              From mobile apps and websites to SaaS, PaaS, CRM, ERP, automation and AI-powered products, we design, build, launch and scale technology that works for real businesses.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1 opacity-100">
              {/* Primary Button */}
              <a
                href="https://calendar.app.google/mCygswQWvcXfkyLk9"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border border-black hover:bg-gray-900 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span>BUILD YOUR PRODUCT</span>
              </a>

              {/* Secondary Button */}
              <a
                href="#what-we-do-section"
                className="px-6 py-3 bg-transparent text-gray-900 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border border-black/20 hover:border-black/40 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span>TALK TO AN EXPERT</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </header>
  )
}
