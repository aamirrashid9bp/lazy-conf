import React, { useRef, useState, useEffect, useCallback } from 'react'
import Tag from '../components/Tag.jsx'

export default function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef(null)

  const services = [
    {
      id: 'product',
      num: '01',
      title: 'Product Development',
      label: 'DIGITAL PRODUCTS · APPS · SAAS',
      text: 'We design and build digital products from idea to production, including mobile applications, web platforms and scalable SaaS and PaaS products.',
      capabilities: 'Mobile Apps · Web Applications · SaaS · PaaS',
      image: '/whatwedo_product_1787556769219.jpg'
    },
    {
      id: 'systems',
      num: '02',
      title: 'Business Systems',
      label: 'CRM · ERP · CUSTOM SYSTEMS',
      text: 'We replace disconnected tools and manual workflows with custom business software, CRM, ERP and automated systems.',
      capabilities: 'CRM · ERP · Custom Software · Automation',
      image: '/whatwedo_systems_1787556782400.jpg'
    },
    {
      id: 'ai',
      num: '03',
      title: 'AI & Intelligent Products',
      label: 'AI AGENTS · LLMS · AUTOMATION',
      text: 'We build practical AI-powered products and workflows that help businesses automate work, understand information and make better decisions.',
      capabilities: 'AI Products · AI Agents · RAG · Intelligent Search · AI Automation',
      image: '/whatwedo_ai_1787556798723.jpg'
    },
  ]

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length)
    }, 4000)
  }, [services.length])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  return (
    <section
      id="what-we-do-section"
      className="section_what-we-build relative bg-[#060611] text-white border-b border-white/10 min-h-screen overflow-hidden"
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

      <div className="relative w-full min-h-screen flex flex-col justify-between z-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-between py-16 md:py-24 lg:py-28 min-h-screen">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center flex-1 min-h-[500px] relative">
            
            {/* Left Column: Heading & Text Transitions */}
            <div className="lg:col-span-5 h-full relative flex flex-col justify-center order-2 lg:order-1 min-h-[400px]">
              <div className="absolute top-0 left-0 pt-4 md:pt-0">
                <Tag text="lazy" />
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight mt-6">
                  What We <span className="text-brand-green italic font-reckless">Build.</span>
                </h2>
              </div>

              <div className="relative w-full h-[300px] mt-48 lg:mt-32">
                {services.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 flex flex-col space-y-6 transition-all duration-700 ease-in-out ${
                      idx === activeIndex
                        ? 'opacity-100 translate-y-0 z-10'
                        : 'opacity-0 translate-y-8 pointer-events-none z-0'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                        {item.num}
                      </span>
                      <span className="font-mono text-[10px] text-brand-green uppercase tracking-wider border border-brand-green/30 px-3 py-1 bg-brand-green/5">
                        {item.label}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl font-reckless font-normal text-white tracking-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed">
                      {item.text}
                    </p>
                    
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

            {/* Right Column: Visual Crossfades */}
            <div className="lg:col-span-7 relative w-full aspect-video md:aspect-[16/10] lg:aspect-[4/3] border border-white/10 overflow-hidden bg-[#090914] order-1 lg:order-2 rounded-sm shrink-0">
              {services.map((item, idx) => (
                <div
                  key={`img-${item.id}`}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    idx === activeIndex
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060611]/80 via-transparent to-transparent pointer-events-none lg:hidden" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
