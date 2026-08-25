import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
  const sectionRef = useRef(null)

  const stats = [
    {
      value: '10+',
      label: 'Years of Engineering',
      desc: 'Combined leadership experience in shipping enterprise software and scaling startups.'
    },
    {
      value: '2M+',
      label: 'Lines of Code',
      desc: 'Written, reviewed, and deployed across production environments worldwide.'
    },
    {
      value: '99%',
      label: 'Client Retention',
      desc: 'Our partners stick with us because we deliver measurable business outcomes.'
    },
    {
      value: '50+',
      label: 'Products Launched',
      desc: 'From initial MVPs to massive multi-tenant enterprise systems.'
    }
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Reveal stats container
      gsap.fromTo('.stats-grid',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )

      // Stagger stats items
      gsap.fromTo('.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )

      // Parallax on image
      gsap.fromTo('.stats-image',
        { y: -30, scale: 1.05 },
        {
          y: 30, scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="stats-section"
      className="relative bg-white text-black py-20 md:py-32 overflow-hidden border-b border-black/10"
    >
      {/* Section Number */}
      <span className="section-number text-black/30">00101</span>

      {/* Background Grid */}
      <div className="grid-lines light">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Stats Grid */}
          <div className="lg:col-span-7 stats-grid grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 order-2 lg:order-1">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-item flex flex-col space-y-3">
                <span className="font-mono text-[10px] text-brand-green tracking-widest uppercase">
                  Metric 0{idx + 1}
                </span>
                <h3 className="text-6xl md:text-7xl lg:text-[80px] font-reckless font-normal tracking-tight leading-none text-black">
                  {stat.value}
                </h3>
                <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-black">
                  {stat.label}
                </h4>
                <p className="text-sm text-gray-600 font-sans font-light leading-relaxed max-w-xs">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Visual */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full border border-black/10 overflow-hidden bg-gray-100 rounded-sm">
              <img 
                src="/demo_stats.jpg" 
                alt="Business metrics visualization" 
                className="stats-image w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              
              {/* Overlay content */}
              <div className="absolute top-6 left-6 right-6 flex justify-between pointer-events-none">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 mix-blend-difference">
                  Execution by Numbers
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
