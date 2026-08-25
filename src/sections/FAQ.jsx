import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const sectionRef = useRef(null)

  const faqs = [
    {
      q: "How does your pricing work?",
      a: "We offer both fixed-price project engagements (best for clearly defined scopes like MVP builds) and monthly dedicated engineering pods (best for ongoing product development and scaling). We don't do hourly billing, so your costs are always predictable."
    },
    {
      q: "How long does a typical project take?",
      a: "Most initial product builds or MVPs take between 8 to 12 weeks from discovery to launch. Enterprise systems and complex platforms can take 3-6 months. We ship testable product increments every week so you always see progress."
    },
    {
      q: "Do you only do the development, or design too?",
      a: "We handle the complete product lifecycle. This includes technical architecture, UI/UX design, frontend and backend development, cloud infrastructure, and post-launch maintenance."
    },
    {
      q: "Who owns the code?",
      a: "You do. Upon project completion and final payment, all intellectual property, source code, and design assets are fully transferred to you. We build it, but it's your product."
    }
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo('.faq-item',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.faq-list', start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#060611] text-white py-20 md:py-32 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="grid-lines dark">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          <div className="lg:col-span-4 faq-header">
            <h2 className="font-mono text-xs text-brand-green font-bold uppercase tracking-widest mb-4">
              FAQ
            </h2>
            <h3 className="text-4xl md:text-5xl font-reckless font-normal tracking-tight leading-[1.1] text-white">
              Common <br />Questions.
            </h3>
          </div>

          <div className="lg:col-span-8 faq-list border-t border-white/10">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              
              return (
                <div 
                  key={idx}
                  className="faq-item border-b border-white/10 cursor-pointer group"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                >
                  <div className="py-6 md:py-8 flex items-start justify-between gap-6">
                    <h4 className={`text-xl sm:text-2xl font-reckless font-normal transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                      {faq.q}
                    </h4>
                    
                    {/* Plus/Minus Icon */}
                    <div className={`relative w-4 h-4 shrink-0 mt-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-180 text-brand-green' : 'text-white/40 group-hover:text-white'}`}>
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-current -translate-y-1/2" />
                      <div className={`absolute top-0 left-1/2 w-[1px] h-full bg-current -translate-x-1/2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                    </div>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'max-h-[300px] opacity-100 mb-6 md:mb-8' : 'max-h-0 opacity-0 mb-0'
                    }`}
                  >
                    <p className="text-base sm:text-lg text-white/50 font-sans font-light leading-relaxed pr-8 md:pr-12">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
