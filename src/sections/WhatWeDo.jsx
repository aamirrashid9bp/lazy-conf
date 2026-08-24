import React from 'react'
import Tag from '../components/Tag.jsx'

export default function WhatWeDo() {
  const services = [
    {
      id: 'product',
      num: '01',
      title: 'Product Development',
      label: 'DIGITAL PRODUCTS · APPS · SAAS',
      text: 'We design and build digital products from idea to production, including mobile applications, web platforms and scalable SaaS and PaaS products.',
      capabilities: 'Mobile Apps · Web Applications · SaaS · PaaS',
    },
    {
      id: 'systems',
      num: '02',
      title: 'Business Systems',
      label: 'CRM · ERP · CUSTOM SYSTEMS',
      text: 'We replace disconnected tools and manual workflows with custom business software, CRM, ERP and automated systems.',
      capabilities: 'CRM · ERP · Custom Software · Automation',
    },
    {
      id: 'ai',
      num: '03',
      title: 'AI & Intelligent Products',
      label: 'AI AGENTS · LLMS · AUTOMATION',
      text: 'We build practical AI-powered products and workflows that help businesses automate work, understand information and make better decisions.',
      capabilities: 'AI Products · AI Agents · RAG · Intelligent Search · AI Automation',
    },
  ]

  return (
    <section
      id="what-we-do-section"
      className="section_what-we-build relative bg-[#060611] text-white overflow-hidden py-28 md:py-36 lg:py-44 border-b border-white/10"
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
        
        {/* Main Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20 md:mb-28">
          
          {/* Left Column: Large Heading */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] text-white tracking-tight">
              What We <span className="text-brand-green italic font-reckless">Build.</span>
            </h2>
          </div>

          {/* Right Column: Tag + Supporting Text */}
          <div className="lg:col-span-5 flex flex-col space-y-5 pt-1">
            <Tag text="lazy" />
            <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed">
              From digital products and business systems to automation and AI, we build technology around the way your business actually works.
            </p>
          </div>
        </div>

        {/* Service Blocks — Clean Editorial Layout */}
        <div child-fade-in="40" className="space-y-0">
          
          {/* Top Row: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/10">
            {services.slice(0, 2).map((item, idx) => (
              <div
                key={item.id}
                className={`py-12 md:py-16 px-0 md:pr-12 ${
                  idx === 0 ? 'md:border-r border-b md:border-b-0 border-white/10' : ''
                } ${idx === 1 ? 'md:pl-12' : ''}`}
              >
                <span className="font-mono text-xs text-white/30 tracking-wider">{item.num}</span>
                <h3 className="text-3xl sm:text-4xl font-reckless font-normal text-white tracking-tight mt-4 mb-3">
                  {item.title}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                  {item.label}
                </span>
                <p className="text-base text-white/60 font-sans font-light leading-relaxed mt-6 mb-4">
                  {item.text}
                </p>
                <div className="pt-4 border-t border-white/5 font-mono text-xs text-white/50 flex items-center gap-2 flex-wrap">
                  <span className="text-white/30 uppercase">Capabilities:</span>
                  <span className="text-white/60">{item.capabilities}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: Full Width AI */}
          <div className="border-t border-white/10 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="font-mono text-xs text-white/30 tracking-wider">{services[2].num}</span>
                <h3 className="text-3xl sm:text-4xl font-reckless font-normal text-white tracking-tight mt-4 mb-3">
                  {services[2].title}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                  {services[2].label}
                </span>
              </div>
              <div className="lg:col-span-7">
                <p className="text-base text-white/60 font-sans font-light leading-relaxed mb-4">
                  {services[2].text}
                </p>
                <div className="pt-4 border-t border-white/5 font-mono text-xs text-white/50 flex items-center gap-2 flex-wrap">
                  <span className="text-white/30 uppercase">Capabilities:</span>
                  <span className="text-white/60">{services[2].capabilities}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
