import React, { useState, useEffect, useRef } from 'react'
import Tag from '../components/Tag.jsx'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const containerRef = useRef(null)

  const faqs = [
    {
      q: "What types of products do you build?",
      a: "We build mobile applications, web platforms, scalable SaaS products, and custom business systems (CRM, ERP). We also integrate AI and automation directly into your workflows."
    },
    {
      q: "Do you only work with startups?",
      a: "No. While we help startups turn ideas into MVPs and production-ready applications, we also work extensively with SMEs and Enterprises to digitize manual workflows and modernize legacy operations."
    },
    {
      q: "How do you handle project management?",
      a: "We believe in transparent development. You will have direct access to the engineering team, regular updates, and a clear roadmap from discovery to launch."
    },
    {
      q: "Can you take over an existing codebase?",
      a: "Yes. We frequently audit, rescue, and scale existing products that are suffering from technical debt, performance bottlenecks, or poor architecture."
    },
    {
      q: "What is your technology stack?",
      a: "We are technology agnostic but highly opinionated. We typically use modern, scalable tech stacks like React/Next.js for the frontend, Node.js/Python for the backend, and AWS/GCP for cloud infrastructure."
    }
  ]

  // Reveal accordion on scroll
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap
      const ctx = gsap.context(() => {
        gsap.fromTo('.faq-item', 
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.faq-container',
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
      id="faq-section"
      className="section_faq relative bg-[#060611] text-white py-16 md:py-24 lg:py-28 overflow-hidden"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col space-y-6">
            <Tag text="lazy" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] tracking-tight">
              Frequently Asked <span className="text-brand-green italic font-reckless">Questions.</span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed max-w-sm">
              Everything you need to know about how we work, what we build, and how we can help your business move forward.
            </p>
          </div>

          {/* Right Column: Clean Accordion */}
          <div className="lg:col-span-7 faq-container">
            <div className="border-t border-white/10">
              {faqs.map((item, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div 
                    key={idx} 
                    className="faq-item border-b border-white/10 cursor-pointer group"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  >
                    <div className="py-8 flex items-center justify-between gap-6">
                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-reckless font-normal transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pr-8 ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                        {item.q}
                      </h3>
                      
                      {/* Premium Plus/Minus Icon (Matching WhyUs) */}
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
                      <p className="text-base sm:text-lg text-white/50 font-sans font-light leading-relaxed pr-4 md:pr-12">
                        {item.a}
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
