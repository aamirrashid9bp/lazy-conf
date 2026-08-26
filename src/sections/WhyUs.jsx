import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WHY_CARDS = [
  {
    title: 'Lean\noperating pod',
    frontIcon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="#D9D9D9" stroke="#6365FF" />
        <path d="M31.598 40.591V32.902H23.909V29.998H31.598V22.309H34.502V29.998H42.191V32.902H34.502V40.591H31.598Z" fill="#6365FF" />
      </svg>
    ),
    backIcon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="#D9D9D9" stroke="#6365FF" />
        <path d="M23.909 32.902V29.998H42.191V32.902H23.909Z" fill="#6365FF" />
      </svg>
    ),
    text: 'You do not get account managers or handoffs. You get operators. The people you meet are the people building, deciding, and shipping.',
  },
  {
    title: 'Outcomes in\nambiguity',
    frontIcon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="#D9D9D9" stroke="#6365FF" />
        <path d="M31.598 40.591V32.902H23.909V29.998H31.598V22.309H34.502V29.998H42.191V32.902H34.502V40.591H31.598Z" fill="#6365FF" />
      </svg>
    ),
    backIcon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="#D9D9D9" stroke="#6365FF" />
        <path d="M23.909 32.902V29.998H42.191V32.902H23.909Z" fill="#6365FF" />
      </svg>
    ),
    text: 'We do not wait for a perfect brief. We step into the mess, find the real bottleneck, create clarity fast, and own the outcome.',
  },
  {
    title: 'Weekly shipping\ncadence',
    frontIcon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="#D9D9D9" stroke="#6365FF" />
        <path d="M31.598 40.591V32.902H23.909V29.998H31.598V22.309H34.502V29.998H42.191V32.902H34.502V40.591H31.598Z" fill="#6365FF" />
      </svg>
    ),
    backIcon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="#D9D9D9" stroke="#6365FF" />
        <path d="M23.909 32.902V29.998H42.191V32.902H23.909Z" fill="#6365FF" />
      </svg>
    ),
    text: 'We ship every week and show artifacts, not status updates. Progress is visible. Decisions are documented. Momentum compounds.',
  },
  {
    title: 'Distribution &\ntraction',
    frontIcon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="#D9D9D9" stroke="#6365FF" />
        <path d="M31.598 40.591V32.902H23.909V29.998H31.598V22.309H34.502V29.998H42.191V32.902H34.502V40.591H31.598Z" fill="#6365FF" />
      </svg>
    ),
    backIcon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="#D9D9D9" stroke="#6365FF" />
        <path d="M23.909 32.902V29.998H42.191V32.902H23.909Z" fill="#6365FF" />
      </svg>
    ),
    text: 'Craft matters. Adoption matters more. We build with distribution in mind so what ships actually gets used, grows, and drives results.',
  },
]

export default function WhyUs() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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
        '.why-left-img',
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-left-column',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.why-flip-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-right-column',
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
      id="why-us-section"
      className="section_home_why-us relative bg-[#060608] text-white py-20 md:py-28 lg:py-36 overflow-hidden border-b border-white/10 select-none"
    >
      {/* Background Grid */}
      <div className="grid-lines dark opacity-30 pointer-events-none">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* Right-Aligned Editorial Header */}
        <div className="why-header flex flex-col items-start md:items-end text-left md:text-right mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <div className="mb-4">
              <span className="font-mono text-xs sm:text-[13px] text-[#4E9F76] font-medium tracking-[0.2em] uppercase">
                [ <span data-scramble="">Why Choose Us</span> ]
              </span>
            </div>
            <h2 fd-scroll-heading="" className="font-reckless text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-normal leading-[1.08] tracking-tight text-white">
              We are built to operate, not just to deliver
            </h2>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Stacked Imagery (5 cols) */}
          <div className="why-left-column lg:col-span-5 flex flex-col gap-6">
            <div className="why-left-img aspect-[4/3] w-full rounded-[2px] overflow-hidden border border-white/15 bg-[#12121e]">
              <img
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80"
                alt="Organic sculpture"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div className="why-left-img aspect-[16/10] w-full rounded-[2px] overflow-hidden border border-white/15 bg-[#12121e] hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                alt="Team collaborating"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

          {/* Right Column: 4 Interactive 3D Flip Cards (7 cols) */}
          <div className="why-right-column lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {WHY_CARDS.map((card, idx) => (
              <div
                key={idx}
                flip-card="click"
                className="why-flip-card relative h-[240px] sm:h-[260px] md:h-[280px] rounded-[2px] border border-white/10 hover:border-white/30 bg-[#090b0a] transition-colors shadow-lg cursor-pointer"
              >
                <div flip-card-inner="" className="w-full h-full p-6 sm:p-7 flex flex-col justify-between">
                  
                  {/* Front Face */}
                  <div flip-card-face="front" className="w-full h-full p-6 sm:p-7 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <h3 className="font-reckless text-2xl sm:text-3xl font-normal text-white leading-tight tracking-tight whitespace-pre-line">
                        {card.title}
                      </h3>
                      <div className="shrink-0">{card.frontIcon}</div>
                    </div>
                    <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
                      CLICK TO REVEAL
                    </div>
                  </div>

                  {/* Back Face */}
                  <div flip-card-face="back" className="w-full h-full p-6 sm:p-7 flex flex-col justify-between bg-[#0e1017] rounded-[2px]">
                    <div className="flex items-center justify-end">
                      {card.backIcon}
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      {card.text}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
