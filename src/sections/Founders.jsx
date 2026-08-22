import React from 'react'
import Tag from '../components/Tag.jsx'

export default function Founders() {
  return (
    <section id="about-us-section" className="section_founders py-28 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      {/* Background Decorative lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
        <img
          src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69be374f1bc0f15c70ce04be_hero%20lines%201.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="padding-global max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-6 max-w-3xl mb-16">
          <div className="brand-color-purple">
            <Tag text="00010" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-bold text-white leading-tight">
            We Don't Just Build Software. <br />
            <span className="text-brand-green">We Build Products.</span>
          </h2>
          <p split-para="" className="text-base sm:text-lg text-white/70 font-body leading-relaxed">
            From the first idea to production and beyond, LazyDeveloper combines product strategy, UI/UX, engineering, cloud, automation and AI to create technology that solves real business problems.
          </p>
        </div>

        {/* Two Animated Rotating Gradient Cards (Who We Build For) */}
        <div child-fade-in="" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Startups */}
          <div className="founders-card relative p-[1px] rounded-2xl overflow-hidden group">
            <div className="founders-card-border absolute inset-[-100%] z-0" />
            <div className="relative z-10 bg-grey-2 p-8 sm:p-10 rounded-2xl h-full flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-brand-green uppercase tracking-widest px-3 py-1 bg-brand-green/10 rounded-full border border-brand-green/20">
                    IDEA ➔ PRODUCT
                  </span>
                  <span className="font-mono text-xs text-white/40">01 // STARTUPS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-reckless font-bold text-white">
                  For High-Conviction Startups
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-body">
                  Help founders validate, design and build MVPs and production-ready digital products with high shipping cadence.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-2">
                <div className="font-mono text-xs text-white/40 uppercase">Key Deliverables</div>
                <div className="text-sm font-mono text-white/90">
                  MVP Architecture · High-Velocity Sprints · Investor Decks & Prototypes
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: SMEs & Enterprises */}
          <div className="founders-card relative p-[1px] rounded-2xl overflow-hidden group">
            <div className="founders-card-border absolute inset-[-100%] z-0" />
            <div className="relative z-10 bg-grey-2 p-8 sm:p-10 rounded-2xl h-full flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-brand-blue uppercase tracking-widest px-3 py-1 bg-brand-blue/10 rounded-full border border-brand-blue/20">
                    MANUAL ➔ DIGITAL
                  </span>
                  <span className="font-mono text-xs text-white/40">02 // SMES & ENTERPRISES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-reckless font-bold text-white">
                  For SMEs & Enterprises
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-body">
                  Replace spreadsheets, disconnected tools and repetitive processes with custom software, CRM, ERP, automation and AI.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-2">
                <div className="font-mono text-xs text-white/40 uppercase">Key Deliverables</div>
                <div className="text-sm font-mono text-white/90">
                  Custom ERP/CRM · Automated Pipelines · Cloud Migration · AI Workflows
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars */}
        <div child-fade-in="" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="font-mono text-xs text-brand-green font-bold">[01] Product Thinking</div>
            <p className="text-xs text-white/60 font-mono">Not just development — designed around real users and scalable outcomes.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="font-mono text-xs text-brand-green font-bold">[02] Business First</div>
            <p className="text-xs text-white/60 font-mono">Technology strictly aligned with your commercial and operational goals.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="font-mono text-xs text-brand-green font-bold">[03] End-to-End Pod</div>
            <p className="text-xs text-white/60 font-mono">Idea ➔ Design ➔ Engineering ➔ Deployment ➔ Growth under one roof.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="font-mono text-xs text-brand-green font-bold">[04] Built for Growth</div>
            <p className="text-xs text-white/60 font-mono">Architecture and infrastructure engineered for tomorrow's scale.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
