import React from 'react'
import Tag from '../components/Tag.jsx'

export default function CTA() {
  return (
    <section className="relative bg-[#060611] text-white overflow-hidden border-b border-white/10 flex flex-col justify-center min-h-[90vh]">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <Tag text="lazy" />
        
        <h2 className="mt-8 mb-16 text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-reckless font-normal leading-[1.05] tracking-tight max-w-5xl">
          Have a Product in Mind? <br />
          <span className="text-brand-green italic font-reckless">Let's Build It.</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full">
          <a
            href="https://calendar.app.google/mCygswQWvcXfkyLk9"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-5 bg-brand-green text-black font-mono text-sm font-bold uppercase tracking-widest flex items-center justify-center space-x-3 w-full sm:w-auto overflow-hidden border border-brand-green"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">BUILD YOUR PRODUCT</span>
            <span className="relative z-10 text-lg leading-none group-hover:text-white group-hover:translate-x-1 transition-all duration-300">→</span>
            <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </a>
          <a
            href="#contact-section"
            className="group relative px-8 py-5 bg-transparent text-white font-mono text-sm font-bold uppercase tracking-widest border border-white/20 hover:border-white transition-colors w-full sm:w-auto text-center overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">TALK TO AN EXPERT</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </a>
        </div>
      </div>
    </section>
  )
}
