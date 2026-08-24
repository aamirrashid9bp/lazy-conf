import React, { useRef, useEffect } from 'react'
import Tag from '../components/Tag.jsx'

export default function Stats() {
  const sectionRef = useRef(null)
  const numbers = [
    { value: 12, label: 'Enterprise Systems Built' },
    { value: 45, label: 'Products Launched' },
    { value: 8, label: 'Years Experience' },
    { value: 100, label: 'Million+ End Users', suffix: '%' },
  ]

  // Animate the counters using GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap
      const ScrollTrigger = window.ScrollTrigger

      const ctx = gsap.context(() => {
        const statElements = gsap.utils.toArray('.stat-number')
        
        statElements.forEach((el) => {
          const targetValue = parseFloat(el.getAttribute('data-value'))
          
          gsap.fromTo(el, 
            { innerHTML: 0 },
            {
              innerHTML: targetValue,
              duration: 2,
              ease: "power3.out",
              snap: { innerHTML: 1 },
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              },
              onUpdate: function() {
                el.innerHTML = Math.round(this.targets()[0].innerHTML)
              }
            }
          )
        })

        gsap.fromTo('.stat-block', 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.stats-container',
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )

      }, sectionRef)

      return () => ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section_stats relative bg-[#060611] text-white py-16 md:py-24 lg:py-28 border-b border-white/10"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <Tag text="lazy" />
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] tracking-tight">
            Execution By <span className="text-brand-green italic font-reckless">Numbers.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/50 font-sans font-light leading-relaxed">
            We measure success by what gets shipped and used in production.
          </p>
        </div>

        <div className="stats-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10 pt-16">
          {numbers.map((stat, idx) => (
            <div
              key={idx}
              className={`stat-block flex flex-col items-center text-center py-8 ${idx > 0 ? 'sm:border-l border-white/10' : ''}`}
            >
              <div className="flex items-baseline mb-4">
                <div 
                  className="stat-number font-reckless text-7xl sm:text-8xl lg:text-[100px] text-white tracking-tighter leading-none"
                  data-value={stat.value}
                >
                  0
                </div>
                {stat.suffix ? (
                  <span className="text-4xl sm:text-5xl lg:text-6xl text-brand-green ml-1 font-reckless">{stat.suffix}</span>
                ) : (
                  <span className="text-4xl sm:text-5xl lg:text-6xl text-brand-green ml-1 font-reckless">+</span>
                )}
              </div>
              <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest leading-relaxed max-w-[160px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
