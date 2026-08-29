import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    q: 'How are you different from an agency, dev shop, or consultancy?',
    a: 'We work alongside you as technical partners to understand the real problem first, take full product ownership, and stay deeply involved until real, production-ready software is shipped and adopted.',
  },
  {
    q: 'What kinds of teams are a fit?',
    a: 'Early-stage founders, startup leaders, and SMB CXOs who care about ownership, move with speed, value high craft, and expect steady weekly progress.',
  },
  {
    q: 'What does a sprint actually include?',
    a: 'A focused, relentless engagement delivering clear priorities, working software artifacts (not mockups or status reports), documented decision logs, and the next sprint roadmap every single week.',
  },
  {
    q: 'What does success look like?',
    a: 'Things feel clear, bottlenecks disappear, decisions are documented, software ships on a relentless cadence, and momentum compounds across your business.',
  },
  {
    q: 'How do you price engagements?',
    a: 'We scope carefully, keep timelines transparent, provide upfront pricing with dedicated pods or fixed milestone deliverables, avoiding unpredictable hourly billing.',
  },
  {
    q: 'How quickly can we start?',
    a: 'Typically within 48 to 72 hours after our initial 30-minute alignment jam.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.faq-accordion-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list-wrap',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faq-section"
      className="section_home_faq relative bg-black text-white py-20 md:py-28 lg:py-36 overflow-hidden border-b border-white/10 select-none"
    >
      <div className="padding-global max-w-[1000px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Centered Editorial Header */}
        <div className="faq-header text-center mb-16 sm:mb-20">
          <div className="mb-4">
            <span className="font-mono text-xs sm:text-[13px] text-[#1B3D33] font-medium tracking-[0.2em] uppercase">
              [ <span data-scramble="">FAQ</span> ]
            </span>
          </div>
          <h2 fd-scroll-heading="" className="font-reckless text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-normal leading-[1.08] tracking-tight text-white">
            Cut the noise. Get the <span className="text-[#1B3D33]">answers.</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="faq-list-wrap border-t border-white/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="faq-accordion-item border-b border-white/10 cursor-pointer group"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              >
                {/* Question Row */}
                <div className="py-7 md:py-8 flex items-center justify-between gap-6">
                  <h3
                    className={`font-reckless text-xl sm:text-2xl font-normal transition-colors duration-300 ${
                      isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}
                  >
                    {faq.q}
                  </h3>

                  {/* Plus/Minus Indicator SVG with Vertical Line Transition */}
                  <div className="shrink-0 w-4 h-4 text-white/60 group-hover:text-white transition-colors relative">
                    <svg width="100%" height="100%" viewBox="0 0 13 13" fill="none">
                      {/* Horizontal line */}
                      <rect width="100%" height="1.5" y="5.75" fill="currentColor" />
                      {/* Vertical line (collapses when open) */}
                      <rect
                        width="1.5"
                        height="100%"
                        x="5.75"
                        fill="currentColor"
                        className={`transition-all duration-300 origin-center ${
                          isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                        }`}
                      />
                    </svg>
                  </div>
                </div>

                {/* Answer Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'max-h-[300px] opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'
                  }`}
                >
                  <p className="font-sans text-sm sm:text-base text-white/60 font-light leading-relaxed pr-8 md:pr-12">
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
