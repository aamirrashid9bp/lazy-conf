import React, { useRef, useEffect } from 'react'
import Tag from '../components/Tag.jsx'

export default function Clients() {
  const containerRef = useRef(null)
  
  const audienceCards = [
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
      text: 'Modernize business operations with scalable software, integrations, automation, cloud and AI.',
      capabilities: 'Enterprise Platforms · Integrations · Automation · AI',
    },
  ]

  // We use GSAP ScrollTrigger to fade up each audience block as it scrolls into view
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap
      const ScrollTrigger = window.ScrollTrigger

      const ctx = gsap.context(() => {
        const blocks = gsap.utils.toArray('.audience-block')
        blocks.forEach((block) => {
          gsap.fromTo(block, 
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        })
      }, containerRef)

      return () => ctx.revert()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="about-us-section"
      className="section_audience relative bg-[#060611] text-white py-16 md:py-24 lg:py-28 border-b border-white/10"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Sticky Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col space-y-6">
            <Tag text="lazy" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight">
              Built For Businesses That Want To <span className="italic text-brand-green">Move Forward.</span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed max-w-sm">
              We work with startups, SMEs and enterprises that need technology to solve real business problems, automate operations and build scalable digital products.
            </p>
          </div>

          {/* RIGHT: Scrolling Audience Blocks */}
          <div className="lg:col-span-7">
            <div className="border-t border-white/10">
              {audienceCards.map((card, idx) => (
                <div
                  key={card.id}
                  className={`audience-block py-12 md:py-16 ${
                    idx < audienceCards.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                        {card.num}
                      </span>
                      <span className="font-mono text-[11px] text-brand-green uppercase tracking-wider border border-brand-green/30 px-3 py-1 bg-brand-green/5">
                        {card.label}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-normal text-white tracking-tight mt-4">
                      {card.title}
                    </h3>
                    
                    <p className="text-lg text-white/60 font-sans font-light leading-relaxed max-w-md mt-4">
                      {card.text}
                    </p>
                    
                    <div className="pt-6 mt-4 border-t border-white/5">
                      <div className="flex items-center gap-3 font-mono text-xs text-white/50">
                        <span className="text-white/30 uppercase">Capabilities:</span>
                        <span className="text-white/70">{card.capabilities}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
