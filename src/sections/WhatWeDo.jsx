import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLeadModal } from '../context/LeadModalContext.jsx'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    title: 'Design',
    serviceType: 'Product Design',
    image: '/whatwedo_product_1787556769219.jpg',
    desc: 'Memorable brands and interfaces. We shape your identity, product design, and positioning so your product feels clear and distinctive.',
  },
  {
    title: 'Build',
    serviceType: 'Custom Software',
    image: '/whatwedo_systems_1787556782400.jpg',
    desc: 'Scalable tech with a weekly shipping cadence. We own the full stack—from MVP to infrastructure—delivering production-ready code every week.',
  },
  {
    title: 'Launch',
    serviceType: 'SaaS',
    image: '/whatwedo_ai_1787556798723.jpg',
    desc: 'Real traction, not vanity metrics. We drive GTM, pilots, and partnerships to accelerate adoption and growth.',
  },
]

export default function WhatWeDo() {
  const { openLeadModal } = useLeadModal()
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.what-we-do-card')
      const headings = gsap.utils.toArray('.wwd-card-title')
      const paras = gsap.utils.toArray('.wwd-card-desc')
      const imgs = gsap.utils.toArray('.wwd-card-img')

      if (window.innerWidth > 767) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })

        tl.fromTo(
          cards,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
        )
          .fromTo(
            imgs,
            { opacity: 0, y: 20, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
            '<0.2'
          )
          .fromTo(
            headings,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' },
            '<0.2'
          )
          .fromTo(
            paras,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' },
            '<0.2'
          )
      } else {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="what-we-do-section"
      className="section-what-we-do relative bg-black text-white py-20 md:py-28 lg:py-36 overflow-hidden border-b border-white/10"
    >
      {/* Background Architectural Grid */}
      <div className="grid-lines dark opacity-30 pointer-events-none">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs sm:text-[13px] text-[#1B3D33] font-medium tracking-[0.2em] uppercase">
              [ <span data-scramble="">WHAT WE DO</span> ]
            </span>
          </div>
          <h2 fd-scroll-heading="" className="font-reckless text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-normal leading-[1.05] tracking-tight text-white">
            What we do
          </h2>
          <div divider-animate="" className="w-full h-[1px] bg-white/15 mt-6 sm:mt-8 origin-left" />
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {SERVICES.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openLeadModal('build-product', { service: item.serviceType, ctaClicked: `Services Card ${item.title}` })}
              className="what-we-do-card group relative bg-[#090b0a] border border-white/10 hover:border-[#1B3D33]/40 p-6 sm:p-8 rounded-[2px] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between select-none shadow-xl overflow-hidden cursor-pointer"
            >
              {/* Card Image Wrap with translucent neon glow */}
              <div className="wwd-card-img relative aspect-[4/3] w-full mb-6 sm:mb-8 overflow-hidden rounded-[2px] bg-[#121212]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Title & Description */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="wwd-card-title font-reckless text-3xl sm:text-4xl font-normal text-white tracking-tight group-hover:text-[#1B3D33] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs text-[#1B3D33] opacity-0 group-hover:opacity-100 transition-opacity">
                    Discuss Requirement →
                  </span>
                </div>
                <p split-para="" className="wwd-card-desc font-sans text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
