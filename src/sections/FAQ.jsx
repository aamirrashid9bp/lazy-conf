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
    <section id="faq-section" className="section_faq py-28 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="padding-global max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col space-y-6 max-w-3xl mb-16">
          <div className="brand-color-purple">
            <Tag text="FAQ" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-bold text-white leading-tight">
            Cut the noise. <br />
            <span className="text-brand-green">Get the answers.</span>
          </h2>
          <p split-para="" className="text-base sm:text-lg text-white/70 font-body leading-relaxed">
            Everything you need to know about partnering with LazyDeveloper TechEd.
          </p>
        </div>

        {/* Accordion List */}
        <div child-fade-in="" className="max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? 'bg-grey-2 border-brand-green/40 shadow-xl' : 'bg-grey-2/40 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-reckless text-lg sm:text-xl font-bold text-white">
                    {faq.q}
                  </span>
                  <span className={`font-mono text-xl text-brand-green transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-8 sm:px-8 text-sm sm:text-base text-white/70 font-body leading-relaxed border-t border-white/5 pt-4">
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
