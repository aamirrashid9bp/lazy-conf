import React, { useState } from 'react'
import Tag from '../components/Tag.jsx'

export default function WhyUs() {
  const [expandedIndex, setExpandedIndex] = useState(0)

  const principles = [
    {
      num: '01',
      title: 'Business First & Product Thinking',
      text: 'We don\'t just write code — we design around your actual business bottlenecks, user journeys, and revenue growth goals. Understand the business problem, users, and workflows before writing a single line of code.',
    },
    {
      num: '02',
      title: 'One Technology Partner',
      text: 'No fragmented agencies or miscommunication. Strategy, UI/UX, full-stack engineering, cloud, automation and AI under one cohesive engineering pod handling your product from conception to global scale.',
    },
    {
      num: '03',
      title: 'Automation & AI Where It Matters',
      text: 'We build custom AI agents, automated CRM/ERP integrations, and LLM workflows where they create verified business velocity. Turn repetitive operations into automated pipelines with measurable ROI.',
    },
    {
      num: '04',
      title: 'Built to Scale & Transparent',
      text: 'Transparent sprints, weekly demos, structured deliverables, and post-launch optimization. Architecture designed for tomorrow\'s growth with clear milestones and communication.',
    },
  ]

  return (
    <section id="why-us-section" className="section_why-us py-28 md:py-36 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20 md:mb-28">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-reckless font-normal text-white leading-tight tracking-tight">
              Your Business Has a Workflow. <br />
              <span className="text-brand-green">Your Software Should Understand It.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col space-y-5 pt-1">
            <Tag text="lazy" />
            <p split-para="" className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed">
              Most software companies start with technology. We start with the business problem. We understand processes, users, bottlenecks and goals before designing the product.
            </p>
          </div>
        </div>

        {/* Accordion Principles */}
        <div child-fade-in="" className="max-w-4xl border-t border-white/10">
          {principles.map((item, index) => {
            const isOpen = expandedIndex === index
            return (
              <div
                key={index}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  className="w-full py-8 text-left flex items-start justify-between space-x-6 focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start space-x-6">
                    <span className="font-mono text-xs text-white/30 tracking-wider pt-1 shrink-0">
                      {item.num}
                    </span>
                    <span className="font-reckless text-xl sm:text-2xl font-normal text-white group-hover:text-white/80 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <span className={`font-mono text-lg text-white/30 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-12 pb-8 text-base text-white/50 font-sans font-light leading-relaxed max-w-2xl">
                      {item.text}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
