import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Clients() {
  const containerRef = useRef(null)
  const [activeCard, setActiveCard] = useState(0)
  
  const audienceCards = [
    {
      id: 'startups',
      num: '01',
      title: 'Startups',
      label: 'IDEA → PRODUCT',
      text: 'Turn ideas into MVPs and production-ready digital products.',
      capabilities: 'Mobile Apps · Web Apps · SaaS · AI Products',
      image: '/demo_startups.jpg',
    },
    {
      id: 'smes',
      num: '02',
      title: 'SMEs',
      label: 'MANUAL → DIGITAL',
      text: 'Replace spreadsheets, disconnected tools and repetitive processes with custom software, CRM, ERP and automation.',
      capabilities: 'CRM · ERP · Automation · Custom Software',
      image: '/whatwedo_systems_1787556782400.jpg',
    },
    {
      id: 'enterprises',
      num: '03',
      title: 'Enterprises',
      label: 'SYSTEMS → INTELLIGENCE',
      text: 'Modernize business operations with scalable software, integrations, automation, cloud and AI.',
      capabilities: 'Enterprise Platforms · Integrations · Automation · AI',
      image: '/demo_enterprise.jpg',
    },
  ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // Scroll reveal for the whole section
      gsap.fromTo('.clients-heading', 
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )

      // Stagger reveal for audience blocks
      const blocks = gsap.utils.toArray('.audience-block')
      blocks.forEach((block, idx) => {
        gsap.fromTo(block, 
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            delay: idx * 0.15,
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Parallax on images
      const images = gsap.utils.toArray('.audience-image')
      images.forEach((img) => {
        gsap.fromTo(img,
          { y: 30, scale: 1.05 },
          {
            y: -30, scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="about-us-section"
      className="section_audience relative bg-[#060611] text-white py-16 md:py-24 lg:py-32 border-b border-white/10"
    >
      {/* Section Number */}
      <span className="section-number text-white/20">00001</span>

      {/* Background Grid */}
      <div className="grid-lines dark">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="clients-heading mb-16 md:mb-24 max-w-3xl">
          <Tag text="lazy" />
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight">
            Built For Businesses That Want To <span className="italic text-brand-green">Move Forward.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed max-w-lg">
            We work with startups, SMEs and enterprises that need technology to solve real business problems, automate operations and build scalable digital products.
          </p>
        </div>

        {/* Audience Cards — Large visual + text blocks */}
        <div className="space-y-20 md:space-y-32">
          {audienceCards.map((card, idx) => (
            <div
              key={card.id}
              className={`audience-block grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`lg:col-span-7 relative overflow-hidden border border-white/10 bg-[#090914] rounded-sm ${
                idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
              }`}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={`${card.title} visual`}
                    className="audience-image w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060611]/40 to-transparent pointer-events-none" />
              </div>

              {/* Text Content */}
              <div className={`lg:col-span-5 flex flex-col space-y-5 ${
                idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                    {card.num}
                  </span>
                  <span className="font-mono text-[11px] text-brand-green uppercase tracking-wider border border-brand-green/30 px-3 py-1 bg-brand-green/5">
                    {card.label}
                  </span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-normal text-white tracking-tight">
                  {card.title}
                </h3>
                
                <p className="text-lg text-white/60 font-sans font-light leading-relaxed">
                  {card.text}
                </p>
                
                <div className="pt-4 border-t border-white/5">
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
    </section>
  )
}
