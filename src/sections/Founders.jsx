import React, { useEffect, useRef, useState, useCallback } from 'react'
import Tag from '../components/Tag.jsx'

export default function Founders() {
  const [activeStep, setActiveStep] = useState(0)
  const timerRef = useRef(null)

  const steps = [
    { num: '01', title: 'Discover', desc: 'We start by understanding your business model, operational workflows, and the exact problem you are trying to solve.' },
    { num: '02', title: 'Define', desc: 'We define the technical architecture, map out the user journey, and create a solid product roadmap before writing a single line of code.' },
    { num: '03', title: 'Design', desc: 'We create high-fidelity, production-ready interfaces that prioritize user experience and brand identity.' },
    { num: '04', title: 'Build', desc: 'Our engineers build robust, scalable systems using modern tech stacks, focusing on performance and security.' },
    { num: '05', title: 'Launch', desc: 'We handle deployment, infrastructure setup, and rigorous testing to ensure a flawless release.' },
    { num: '06', title: 'Grow', desc: 'Post-launch, we provide ongoing support, optimization, and scaling as your business expands.' },
  ]

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
  }, [steps.length])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  return (
    <section 
      id="our-approach-section"
      className="section_approach relative bg-[#060611] text-white border-b border-white/10 min-h-screen overflow-hidden"
    >
      <div className="relative w-full min-h-screen flex flex-col justify-center z-10">
        
        {/* Background Grid */}
        <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
          <div className="border-r border-white/[0.04] h-full" />
          <div className="border-r border-white/[0.04] h-full" />
          <div className="border-r border-white/[0.04] h-full" />
          <div className="border-r border-white/[0.04] h-full" />
          <div className="border-r border-white/[0.04] h-full" />
          <div className="h-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center h-full py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full">
            
            {/* Left: Heading & Fixed Content */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <Tag text="lazy" />
              <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] tracking-tight">
                Our <span className="text-brand-green italic font-reckless">Approach.</span>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-white/50 font-sans font-light leading-relaxed max-w-sm">
                A systematic, engineering-led process designed to turn complex requirements into elegant, scalable digital products.
              </p>
            </div>

            {/* Right: Scroll-driven Steps Stack */}
            <div className="lg:col-span-7 relative h-[500px] flex items-center">
              {steps.map((step, idx) => {
                // Determine state: past, active, or future
                const isPast = idx < activeStep
                const isActive = idx === activeStep
                
                return (
                  <div 
                    key={idx}
                    className={`absolute left-0 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100 z-10' 
                        : isPast 
                          ? 'opacity-0 -translate-y-24 scale-95 z-0'
                          : 'opacity-0 translate-y-24 scale-95 z-0'
                    }`}
                  >
                    <div className="border-l border-brand-green/30 pl-8 md:pl-12 py-4 relative">
                      {/* Active Indicator Line */}
                      <div 
                        className={`absolute left-[-1px] top-0 w-[2px] bg-brand-green transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? 'h-full opacity-100' : 'h-0 opacity-0'
                        }`} 
                      />
                      
                      <span className="font-mono text-xs text-brand-green uppercase tracking-widest mb-6 block">
                        {step.num} — {steps.length.toString().padStart(2, '0')}
                      </span>
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-reckless font-normal text-white mb-6 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-lg sm:text-xl text-white/60 font-sans font-light leading-relaxed max-w-lg">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
