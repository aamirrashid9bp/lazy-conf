import React, { useState } from 'react'
import Tag from '../components/Tag.jsx'

export default function WhyUs() {
  const [flippedCards, setFlippedCards] = useState({})

  const toggleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const cardsData = [
    {
      num: '01',
      title: 'Business First & Product Thinking',
      frontText: 'Understand the business problem, users, and workflows before writing a single line of code.',
      backTitle: 'Outcome-Driven Architecture',
      backText: 'We don’t just write code — we design around your actual business bottlenecks, user journeys, and revenue growth goals.'
    },
    {
      num: '02',
      title: 'One Technology Partner',
      frontText: 'Strategy, UI/UX, full-stack engineering, cloud, automation and AI under one roof.',
      backTitle: 'End-to-End Execution Pod',
      backText: 'No fragmented agencies or miscommunication. One cohesive engineering pod handling your product from conception to global scale.'
    },
    {
      num: '03',
      title: 'Automation & AI Where It Matters',
      frontText: 'Turn repetitive operations into automated pipelines with measurable ROI.',
      backTitle: 'Intelligent Workflows',
      backText: 'We build custom AI agents, automated CRM/ERP integrations, and LLM workflows where they create verified business velocity.'
    },
    {
      num: '04',
      title: 'Built to Scale & Transparent',
      frontText: 'Architecture designed for tomorrow’s growth with clear milestones and communication.',
      backTitle: 'Long-Term Growth Partner',
      backText: 'Transparent sprints, weekly demos, structured deliverables, and post-launch optimization to continuously scale your software.'
    }
  ]

  return (
    <section id="why-us-section" className="section_why-us py-28 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="padding-global max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col space-y-6 max-w-3xl mb-16">
          <div className="brand-color-purple">
            <Tag text="Why Choose LazyDeveloper" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-bold text-white leading-tight">
            Your Business Has a Workflow. <br />
            <span className="text-brand-green">Your Software Should Understand It.</span>
          </h2>
          <p split-para="" className="text-base sm:text-lg text-white/70 font-body leading-relaxed">
            Most software companies start with technology. We start with the business problem. We understand processes, users, bottlenecks and goals before designing the product.
          </p>
        </div>

        {/* 4 Interactive Flip Cards */}
        <div child-fade-in="" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, index) => {
            const isFlipped = !!flippedCards[index]
            return (
              <div
                key={index}
                onClick={() => toggleFlip(index)}
                className="why-us-card h-[340px] perspective-1000 cursor-pointer group"
              >
                <div
                  className={`w-full h-full relative transition-transform duration-500 transform-style-3d rounded-2xl border ${
                    isFlipped ? 'rotate-y-180 border-brand-green/40' : 'border-white/10 hover:border-brand-green/30'
                  }`}
                >
                  {/* Front Face */}
                  <div className="absolute inset-0 backface-hidden bg-grey-2 p-8 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xl text-brand-green font-bold">{card.num}</span>
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">[Click to flip]</span>
                      </div>
                      <h3 className="text-xl font-reckless font-bold text-white mb-4 group-hover:text-brand-green transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-white/60 font-body leading-relaxed">
                        {card.frontText}
                      </p>
                    </div>
                    <div className="font-mono text-[11px] text-brand-green flex items-center space-x-1">
                      <span>View details</span>
                      <span>➔</span>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-brand-green text-black p-8 rounded-2xl flex flex-col justify-between shadow-2xl">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs uppercase tracking-widest text-black/60">0{index + 1} // Detail</span>
                        <span className="font-mono text-[10px] text-black/60">[Click to return]</span>
                      </div>
                      <h4 className="font-reckless text-lg font-bold text-black mb-3">
                        {card.backTitle}
                      </h4>
                      <p className="text-xs text-black/80 font-body leading-relaxed font-medium">
                        {card.backText}
                      </p>
                    </div>
                    <div className="font-mono text-[11px] text-black/60">
                      LazyDeveloper Standard
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
