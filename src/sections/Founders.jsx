import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Founders() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef(null)

  const steps = [
    { num: '01', title: 'Discover', desc: 'We start by understanding your business model, operational workflows, and the exact problem you are trying to solve.' },
    { num: '02', title: 'Define', desc: 'We define the technical architecture, map out the user journey, and create a solid product roadmap before writing a single line of code.' },
    { num: '03', title: 'Design', desc: 'We create high-fidelity, production-ready interfaces that prioritize user experience and brand identity.' },
    { num: '04', title: 'Build', desc: 'Our engineers build robust, scalable systems using modern tech stacks, focusing on performance and security.' },
    { num: '05', title: 'Launch', desc: 'We handle deployment, infrastructure setup, and rigorous testing to ensure a flawless release.' },
    { num: '06', title: 'Grow', desc: 'Post-launch, we provide ongoing support, optimization, and scaling as your business expands.' },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const newStep = Math.min(
            steps.length - 1,
            Math.floor(progress * steps.length)
          )
          setActiveStep(newStep)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="our-approach-section"
      className="section_approach relative bg-[#060611] text-white overflow-hidden min-h-screen"
    >
      {/* Section Number */}
      <span className="section-number text-white/20">01000</span>

      {/* Background Grid */}
      <div className="grid-lines dark">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full h-screen flex flex-col justify-center">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center h-full py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full">
            
            {/* Left: Heading & Progress */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <Tag text="lazy" />
              <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] tracking-tight">
                Our <span className="text-brand-green italic font-reckless">Approach.</span>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-white/50 font-sans font-light leading-relaxed max-w-sm">
                A systematic, engineering-led process designed to turn complex requirements into elegant, scalable digital products.
              </p>

              {/* Step Progress Dots */}
              <div className="mt-10 flex items-center gap-3">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                        idx === activeStep 
                          ? 'bg-brand-green scale-125' 
                          : idx < activeStep 
                            ? 'bg-brand-green/50' 
                            : 'bg-white/15'
                      }`}
                    />
                    <span className={`font-mono text-[8px] uppercase tracking-wider transition-colors duration-500 ${
                      idx === activeStep ? 'text-brand-green' : 'text-white/20'
                    }`}>
                      {step.num}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Active Step Content */}
            <div className="lg:col-span-7 relative h-[400px] md:h-[500px] flex items-center">
              {steps.map((step, idx) => {
                const isPast = idx < activeStep
                const isActive = idx === activeStep
                
                return (
                  <div 
                    key={idx}
                    className={`absolute left-0 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100 z-10' 
                        : isPast 
                          ? 'opacity-0 -translate-y-20 scale-[0.97] z-0'
                          : 'opacity-0 translate-y-20 scale-[0.97] z-0'
                    }`}
                  >
                    <div className="border-l-2 border-brand-green/30 pl-8 md:pl-12 py-4 relative">
                      {/* Active Indicator Line */}
                      <div 
                        className={`absolute left-[-1px] top-0 w-[2px] bg-brand-green transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? 'h-full opacity-100' : 'h-0 opacity-0'
                        }`} 
                      />
                      
                      <span className="font-mono text-xs text-brand-green uppercase tracking-widest mb-6 block">
                        {step.num} — {steps.length.toString().padStart(2, '0')}
                      </span>
                      <h3 className="text-5xl sm:text-6xl lg:text-7xl font-reckless font-normal text-white mb-6 tracking-tight">
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
