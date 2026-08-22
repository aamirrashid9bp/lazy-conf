import React from 'react'
import Tag from '../components/Tag.jsx'

export default function WhatWeDo() {
  const serviceCategories = [
    {
      num: '01',
      title: 'Mobile, Web & SaaS Engineering',
      desc: 'High-performance applications built from first principles for scale, velocity and user delight.',
      items: [
        'Mobile App Development (iOS, Android, Flutter)',
        'Web Development & Modern Dashboards',
        'SaaS & PaaS Development (Multi-tenant, Auth, Subscriptions)',
      ],
      tag: 'PRODUCT ENGINEERING'
    },
    {
      num: '02',
      title: 'Enterprise CRM, ERP & Custom Systems',
      desc: 'Centralized platforms built around your actual business workflows to eliminate manual bottlenecks.',
      items: [
        'Custom CRM (Leads, Sales, Follow-ups, Workflows)',
        'ERP Development (Finance, HR, Inventory, Operations)',
        'Custom Software & API Architecture',
      ],
      tag: 'BUSINESS SYSTEMS'
    },
    {
      num: '03',
      title: 'AI Products & Business Automation',
      desc: 'Intelligent automation and AI agents that eliminate repetitive tasks and drive measurable business value.',
      items: [
        'AI Product Development (LLMs, AI Agents, RAG)',
        'Intelligent Search & Recommendation Engines',
        'End-to-End Business Process Automation',
      ],
      tag: 'AUTOMATION & AI'
    },
  ]

  return (
    <section id="what-we-do-section" className="section_what-we-do py-28 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="padding-global max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-6 max-w-3xl mb-16">
          <div className="brand-color-purple">
            <Tag text="00011" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-bold text-white leading-tight">
            Our Core Services. <br />
            <span className="text-brand-green">Full-Stack Execution.</span>
          </h2>
          <p split-para="" className="text-base sm:text-lg text-white/70 font-body leading-relaxed">
            From mobile apps and websites to SaaS, PaaS, CRM, ERP, automation and AI-powered products, we design, build, launch and scale technology that works for real businesses.
          </p>
        </div>

        {/* 3 Service Columns */}
        <div child-fade-in="" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCategories.map((srv, index) => (
            <div
              key={index}
              className="what-we-do-card bg-grey-2/70 border border-white/5 hover:border-brand-green/30 p-8 sm:p-10 rounded-2xl flex flex-col justify-between space-y-8 transition-all hover:bg-grey-2 group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl text-brand-green font-bold">{srv.num}</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    {srv.tag}
                  </span>
                </div>
                
                <h3 className="text-2xl font-reckless font-bold text-white group-hover:text-brand-green transition-colors">
                  {srv.title}
                </h3>
                
                <p className="text-sm text-white/60 font-body leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              {/* Service Sub-bullets */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="font-mono text-[11px] text-white/40 uppercase tracking-wider">Capabilities</div>
                <ul className="space-y-2">
                  {srv.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs font-mono text-white/80">
                      <span className="text-brand-green font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
