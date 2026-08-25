import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function WhyUs() {
  const [openIndex, setOpenIndex] = useState(0)
  const containerRef = useRef(null)

  const principles = [
    {
      title: 'Business First',
      desc: 'We don\'t build technology for the sake of technology. We start with your business goals, operational workflows and user needs, then engineer the exact solution required.',
    },
    {
      title: 'Product Thinking',
      desc: 'Every project is approached as a product, not a project. We focus on user experience, market fit, and long-term viability from day one.',
    },
    {
      title: 'One Technology Partner',
      desc: 'From initial product strategy and design to scalable cloud architecture, development and long-term maintenance, we handle the entire product lifecycle.',
    },
    {
      title: 'Built to Scale',
      desc: 'Our architectures are designed for the future. We use modern, robust tech stacks to ensure your system grows seamlessly with your business.',
    },
    {
      title: 'Automation at the Core',
      desc: 'We integrate intelligent automation directly into your custom software to remove manual bottlenecks, increase speed, and reduce operational costs.',
    },
    {
      title: 'AI Where It Matters',
      desc: 'We apply AI practically — not as a buzzword — to solve real problems: intelligent search, document processing, automated workflows, and decision support.',
    },
    {
      title: 'Transparent Development',
      desc: 'You have direct access to the engineering team, real-time progress visibility, and a clear roadmap. No black boxes, no surprises.',
    },
    {
      title: 'Long-Term Partnership',
      desc: 'We build relationships, not transactions. Our clients stay with us because we deliver real, measurable business outcomes year after year.',
    },
  ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.why-heading', 
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo('.accordion-item', 
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.accordion-container', start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="why-us-section"
      className="section_why-us relative bg-[#060611] text-white py-16 md:py-24 lg:py-32 border-b border-white/10"
    >
      {/* Background Grid */}
      <div className="grid-lines dark">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col space-y-6 why-heading">
            <Tag text="lazy" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] tracking-tight">
              Why <span className="text-brand-green italic font-reckless">LazyDeveloper?</span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed max-w-sm">
              Eight principles that define how we build software and why our clients trust us with their most critical systems.
            </p>
          </div>

          {/* Right Column: Accordion */}
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
                    <div className="py-7 md:py-8 flex items-center justify-between">
                      <div className="flex items-center gap-5 sm:gap-8">
                        <span className="font-mono text-[10px] sm:text-xs text-brand-green tracking-widest shrink-0">
                          0{idx + 1}
                        </span>
                        <h3 className={`text-xl sm:text-2xl md:text-3xl font-reckless font-normal transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Plus/Minus Icon */}
                      <div className={`relative w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-180 text-brand-green' : 'text-white/40 group-hover:text-white'}`}>
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-current -translate-y-1/2" />
                        <div className={`absolute top-0 left-1/2 w-[1px] h-full bg-current -translate-x-1/2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                      </div>
                    </div>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'max-h-[300px] opacity-100 mb-7 md:mb-8' : 'max-h-0 opacity-0 mb-0'
                      }`}
                    >
                      <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed pl-10 sm:pl-16 pr-4 md:pr-12">
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
