import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef(null)

  const processSteps = [
    {
      num: '01',
      title: 'Discovery Call',
      desc: 'A focused 30-minute conversation to understand your business, challenges, and what success looks like.',
    },
    {
      num: '02',
      title: 'Product Plan',
      desc: 'We map out the architecture, user journey, and sprint roadmap. You know exactly what gets built and when.',
    },
    {
      num: '03',
      title: 'Weekly Delivery',
      desc: 'Real, working software shipped every week. Not reports. Not mockups. Deployed, testable product increments.',
    },
    {
      num: '04',
      title: 'Launch & Growth',
      desc: 'We handle deployment, monitoring, and scaling. Post-launch, we optimize and grow alongside your business.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo('.process-step',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo('.cta-buttons',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-buttons', start: 'top 90%', toggleActions: 'play none none reverse' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="process-section"
      className="relative bg-[#060611] text-white overflow-hidden border-b border-white/10"
    >
      {/* Section Number */}
      <span className="section-number text-white/20">01001</span>

      {/* Background Grid */}
      <div className="grid-lines dark">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32">
        
        {/* Large CTA Heading */}
        <div className="cta-heading flex flex-col items-center text-center max-w-5xl mx-auto mb-20 md:mb-28">
          <Tag text="lazy" />
          <h2 className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-reckless font-normal leading-[1.05] tracking-tight">
            Have a Product in Mind? <br />
            <span className="text-brand-green italic font-reckless">Let's Build It.</span>
          </h2>
        </div>

        {/* Process Steps Grid */}
        <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 mb-20 md:mb-28">
          {processSteps.map((step, idx) => (
            <div 
              key={idx}
              className="process-step group relative border border-white/10 p-8 md:p-10 bg-[#090914] hover:border-brand-green/30 transition-colors duration-500"
            >
              {/* Step Number */}
              <span className="font-mono text-xs text-brand-green tracking-widest mb-6 block">
                {step.num}
              </span>
              
              {/* Connecting line */}
              {idx < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
              )}
              
              <h3 className="text-2xl md:text-3xl font-reckless font-normal text-white mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-white/50 font-sans font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="https://calendar.app.google/mCygswQWvcXfkyLk9"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-5 bg-brand-green text-black font-mono text-sm font-bold uppercase tracking-widest flex items-center justify-center space-x-3 w-full sm:w-auto overflow-hidden border border-brand-green"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">BUILD YOUR PRODUCT</span>
            <span className="relative z-10 text-lg leading-none group-hover:text-white group-hover:translate-x-1 transition-all duration-300">→</span>
            <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </a>
          <a
            href="#contact-section"
            className="group relative px-8 py-5 bg-transparent text-white font-mono text-sm font-bold uppercase tracking-widest border border-white/20 hover:border-white transition-colors w-full sm:w-auto text-center overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">TALK TO AN EXPERT</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </a>
        </div>
      </div>
    </section>
  )
}
