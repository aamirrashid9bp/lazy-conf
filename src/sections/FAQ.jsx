import React, { useState } from 'react'
import Tag from '../components/Tag.jsx'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: 'What kind of software products does LazyDeveloper build?',
      a: 'From mobile apps (iOS & Android) and web applications to SaaS, PaaS, CRM, ERP, automation engines, and AI-powered products, we design, build, launch and scale technology tailored for real businesses.'
    },
    {
      q: 'How does LazyDeveloper approach product development?',
      a: 'Most software companies start with technology — we start with the business problem. We analyze your workflows, users, bottlenecks, and commercial goals before designing the architecture.'
    },
    {
      q: 'Can you modernize our existing business operations or build custom ERP/CRM?',
      a: 'Yes. We specialize in replacing disconnected spreadsheets, manual coordination, and off-the-shelf tool friction with centralized CRM, ERP, and automated workflow pipelines built around your exact operations.'
    },
    {
      q: 'Do you build MVPs for early-stage startups?',
      a: 'Absolutely. We partner with high-conviction founders to validate, design, and engineer production-ready MVPs with weekly shipping velocity, investor decks, and scalable cloud foundations.'
    },
    {
      q: 'How do you integrate AI into products?',
      a: 'We build AI assistants, autonomous AI agents, LLM applications, intelligent search, document intelligence, and custom AI workflows strictly where they create proven ROI and operational speed.'
    },
    {
      q: 'How quickly can we get started?',
      a: 'We can typically initiate discovery, architecture scoping, and sprint roadmap planning within a week of our initial consultation.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq-section" className="section_faq py-28 md:py-36 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20 md:mb-28">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-reckless font-normal text-white leading-tight tracking-tight">
              Cut the noise. <br />
              <span className="text-brand-green">Get the answers.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col space-y-5 pt-1">
            <Tag text="lazy" />
            <p split-para="" className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed">
              Everything you need to know about partnering with LazyDeveloper TechEd.
            </p>
          </div>
        </div>

        {/* Accordion List */}
        <div child-fade-in="" className="max-w-4xl border-t border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-7 sm:py-8 text-left flex items-start justify-between space-x-6 focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-reckless text-lg sm:text-xl font-normal text-white group-hover:text-white/80 transition-colors">
                    {faq.q}
                  </span>
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
                    <div className="pb-8 text-base text-white/50 font-sans font-light leading-relaxed max-w-2xl">
                      {faq.a}
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
