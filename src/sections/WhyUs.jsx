import React, { useState, useRef, useEffect } from 'react'
import Tag from '../components/Tag.jsx'

export default function WhyUs() {
  const [openIndex, setOpenIndex] = useState(0)
  const containerRef = useRef(null)

  const principles = [
    {
      title: 'Business First, Technology Second',
      desc: 'We don\'t build technology for the sake of technology. We start with your business goals, operational workflows and user needs, then engineer the exact solution required.',
    },
    {
      title: 'One Complete Technology Partner',
      desc: 'From initial product strategy and design to scalable cloud architecture, development and long-term maintenance, we handle the entire product lifecycle.',
    },
    {
      title: 'Built to Scale',
      desc: 'Our architectures are designed for the future. We use modern, robust tech stacks (React, Node, scalable databases, AWS/GCP) to ensure your system grows seamlessly with your business.',
    },
    {
      title: 'Automation & AI at the Core',
      desc: 'We integrate intelligent automation and AI directly into your custom software to remove manual bottlenecks, increase speed, and reduce operational costs.',
    },
  ]

  // Reveal accordion on scroll
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap
      const ctx = gsap.context(() => {
        gsap.fromTo('.accordion-item', 
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.accordion-container',
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }, containerRef)
      return () => ctx.revert()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="why-us-section"
      className="section_why-us relative bg-[#060611] text-white py-16 md:py-24 lg:py-28 border-b border-white/10"
    >
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col space-y-6">
            <Tag text="lazy" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] tracking-tight">
              Why <span className="text-brand-green italic font-reckless">LazyDeveloper?</span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed max-w-sm">
              We partner with founders and technical leaders to deliver robust, scalable software solutions that drive real outcomes.
            </p>
          </div>

          {/* Right Column: Clean Accordion / List */}
          <div className="lg:col-span-7 accordion-container">
            <div className="border-t border-white/10">
              {principles.map((item, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div 
                    key={idx} 
                    className="accordion-item border-b border-white/10 cursor-pointer group"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  >
                    <div className="py-8 flex items-center justify-between">
                      <div className="flex items-center gap-6 sm:gap-8">
                        <span className="font-mono text-[10px] sm:text-xs text-brand-green tracking-widest shrink-0">
                          0{idx + 1}
                        </span>
                        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-reckless font-normal transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Premium Plus/Minus Icon */}
                      <div className={`relative w-6 h-6 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-180 text-white' : 'text-white/40 group-hover:text-white'}`}>
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-current -translate-y-1/2" />
                        <div className={`absolute top-0 left-1/2 w-[1px] h-full bg-current -translate-x-1/2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                      </div>
                    </div>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'max-h-[300px] opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'
                      }`}
                    >
                      <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed pl-12 sm:pl-16 pr-4 md:pr-12">
                        {item.desc}
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
