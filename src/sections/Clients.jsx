import React from 'react'
import Tag from '../components/Tag.jsx'

export default function Clients() {
  const industries = [
    { name: 'Education', sub: 'LMS · ERP · Exams' },
    { name: 'Healthcare', sub: 'Patient Systems · CRM' },
    { name: 'Real Estate', sub: 'Property · Automation' },
    { name: 'Fitness & Wellness', sub: 'Gym Apps · Booking' },
    { name: 'Finance', sub: 'Workflows · Dashboards' },
    { name: 'Logistics', sub: 'Delivery · Tracking' },
    { name: 'Retail & E-commerce', sub: 'Inventory · CRM' },
    { name: 'Startups & SMEs', sub: 'MVP · SaaS · AI' },
  ]

  return (
    <section className="section_clients py-20 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="padding-global max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col space-y-4">
            <div className="brand-color-purple">
              <Tag text="00001" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-reckless font-bold text-white max-w-xl">
              Software Built for Real Industries & Modern Workflows
            </h2>
          </div>
          <p className="text-sm text-white/50 max-w-xs font-mono">
            // Domain-tailored architecture across 8+ specialized verticals
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div child-fade-in="" className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-grey-2/50 border border-white/5 hover:border-brand-green/30 hover:bg-grey-2 transition-all group cursor-default"
            >
              <div className="font-mono text-[10px] text-brand-green uppercase tracking-wider mb-2">
                0{index + 1} // Vertical
              </div>
              <div className="font-reckless text-xl font-bold text-white group-hover:text-brand-green transition-colors">
                {ind.name}
              </div>
              <div className="text-xs text-white/50 font-mono mt-1">
                {ind.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Continuous Marquee Loop */}
        <div className="md:hidden overflow-hidden relative w-full py-4 -mx-6">
          <div className="clients_marquee_track flex space-x-4 animate-marquee whitespace-nowrap">
            {[...industries, ...industries].map((ind, index) => (
              <div
                key={index}
                className="inline-flex flex-col p-4 rounded-xl bg-grey-2 border border-white/5 min-w-[200px]"
              >
                <div className="font-mono text-[10px] text-brand-green uppercase tracking-wider mb-1">
                  0{(index % industries.length) + 1} // Vertical
                </div>
                <div className="font-reckless text-base font-bold text-white">
                  {ind.name}
                </div>
                <div className="text-[11px] text-white/50 font-mono">
                  {ind.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
