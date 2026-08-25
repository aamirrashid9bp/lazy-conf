import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function WhatWeDo() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const services = [
    {
      id: 'product',
      num: '01',
      title: 'Product\nDevelopment',
      label: 'DIGITAL PRODUCTS · APPS · SAAS',
      text: 'We design and build digital products from idea to production, including mobile applications, web platforms and scalable SaaS and PaaS products.',
      capabilities: 'Mobile Apps · Web Applications · SaaS · PaaS',
      image: '/whatwedo_product_1787556769219.jpg'
    },
    {
      id: 'systems',
      num: '02',
      title: 'Business\nSystems',
      label: 'CRM · ERP · CUSTOM SYSTEMS',
      text: 'We replace disconnected tools and manual workflows with custom business software, CRM, ERP and automated systems.',
      capabilities: 'CRM · ERP · Custom Software · Automation',
      image: '/whatwedo_systems_1787556782400.jpg'
    },
    {
      id: 'ai',
      num: '03',
      title: 'AI & Intelligent\nProducts',
      label: 'AI AGENTS · LLMS · AUTOMATION',
      text: 'We build practical AI-powered products and workflows that help businesses automate work, understand information and make better decisions.',
      capabilities: 'AI Products · AI Agents · RAG · Intelligent Search · AI Automation',
      image: '/whatwedo_ai_1787556798723.jpg'
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Create a pinned timeline driven by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Map scroll progress to active index
            const progress = self.progress
            const newIndex = Math.min(
              services.length - 1,
              Math.floor(progress * services.length)
            )
            setActiveIndex(newIndex)
          }
        }
      })

      // Animate each stage's text and image
      services.forEach((_, idx) => {
        if (idx === 0) return // First is visible by default
        
        const position = idx / services.length
        
        // Fade out previous stage
        tl.to(`.wwd-text-${idx - 1}`, {
          opacity: 0,
          y: -30,
          duration: 0.3,
        }, position - 0.15)
        
        tl.to(`.wwd-img-${idx - 1}`, {
          opacity: 0,
          scale: 1.05,
          duration: 0.3,
        }, position - 0.15)

        // Fade in current stage
        tl.fromTo(`.wwd-text-${idx}`, {
          opacity: 0,
          y: 30,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        }, position)

        tl.fromTo(`.wwd-img-${idx}`, {
          opacity: 0,
          scale: 1.05,
        }, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        }, position)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="what-we-do-section"
      className="section_what-we-build relative bg-[#060611] text-white overflow-hidden min-h-screen"
    >
      {/* Section Number */}
      <span className="section-number text-white/20">00011</span>

      {/* Background Grid */}
      <div className="grid-lines dark">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full h-screen flex flex-col justify-between">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-between h-full py-16 md:py-20">
          
          {/* Top: Section Header */}
          <div className="flex items-start justify-between mb-8 shrink-0">
            <div className="space-y-4">
              <Tag text="lazy" />
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight">
                What We <span className="text-brand-green italic font-reckless">Build.</span>
              </h2>
            </div>
            
            {/* Stage Indicator */}
            <div className="hidden md:flex flex-col items-end space-y-2 pt-2">
              <span className="font-mono text-2xl font-bold text-brand-green tracking-tight">
                {services[activeIndex]?.num}/{services.length.toString().padStart(2, '0')}
              </span>
              <span className="font-mono text-[11px] text-white/30 uppercase tracking-wider">
                {services[activeIndex]?.id}
              </span>
            </div>
          </div>

          {/* Main Content: Left Text + Right Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 flex-1 items-center relative min-h-0">
            
            {/* Left Column: Stacked text blocks that crossfade */}
            <div className="lg:col-span-5 relative h-full flex items-center order-2 lg:order-1">
              <div className="relative w-full min-h-[320px]">
                {services.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`wwd-text-${idx} absolute inset-0 flex flex-col justify-center space-y-6 ${idx === 0 ? '' : 'opacity-0'}`}
                  >
                    {/* Category Label */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                        {item.num}
                      </span>
                      <span className="font-mono text-[10px] text-brand-green uppercase tracking-wider border border-brand-green/30 px-3 py-1 bg-brand-green/5">
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-3xl sm:text-4xl md:text-[44px] font-reckless font-normal text-white leading-[1.08] tracking-tight whitespace-pre-line">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed">
                      {item.text}
                    </p>
                    
                    {/* Capabilities */}
                    <div className="pt-2">
                      <div className="flex flex-col gap-1.5 font-mono text-xs text-white/50">
                        <span className="text-white/30 uppercase">Capabilities:</span>
                        <span className="text-white/70">{item.capabilities}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Large visual that crossfades */}
            <div className="lg:col-span-7 relative w-full aspect-video md:aspect-[16/10] lg:aspect-[4/3] border border-white/10 overflow-hidden bg-[#090914] order-1 lg:order-2 rounded-sm shrink-0">
              {services.map((item, idx) => (
                <div
                  key={`img-${item.id}`}
                  className={`wwd-img-${idx} absolute inset-0 ${idx === 0 ? '' : 'opacity-0'}`}
                >
                  <img
                    src={item.image}
                    alt={item.title.replace('\n', ' ')}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
              
              {/* Dark gradient overlay on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060611]/80 via-transparent to-transparent pointer-events-none lg:hidden" />
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="mt-6 md:mt-10 shrink-0">
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-3">
              {services.map((item, idx) => (
                <span 
                  key={idx}
                  className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-500 ${
                    idx <= activeIndex ? 'text-brand-green' : 'text-white/20'
                  }`}
                >
                  {item.id}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
