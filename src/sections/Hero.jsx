import React, { useRef } from 'react'
import InteractiveLazyWordmark from '../components/InteractiveLazyWordmark.jsx'

export default function Hero() {
  const heroRef = useRef(null)

  return (
    <section 
      ref={heroRef}
      id="top"
      className="section_hero relative min-h-screen bg-[#edeef2] overflow-hidden flex flex-col justify-between pt-24"
    >
      {/* Background Architectural Grid Lines (6 columns) */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="h-full" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex-1 flex flex-col justify-end pb-12 sm:pb-16 md:pb-24">
        
        {/* Large Editorial Heading */}
        <div className="grid grid-cols-6 px-6 md:px-12 mb-8 md:mb-16">
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-reckless font-normal text-black leading-[1.05] tracking-tight">
              We Build Software That <br />
              <span className="italic text-[#2F6F5E]">Moves Businesses</span> Forward.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-600 font-sans font-light leading-relaxed max-w-md">
              A product engineering studio focused on delivering scalable digital products, business systems, and AI automation.
            </p>
          </div>
        </div>

        {/* Oversized Interactive Visual */}
        <div className="grid grid-cols-6 border-y border-black/10 relative overflow-hidden">
          <div className="col-span-6 flex items-center justify-center py-4 md:py-8">
            <InteractiveLazyWordmark heroRef={heroRef} />
          </div>
        </div>

      </div>
    </section>
  )
}
