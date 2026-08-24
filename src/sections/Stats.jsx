import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
  const statsRef = useRef(null)

  useEffect(() => {
    const parent = statsRef.current
    if (!parent) return

    const countElements = parent.querySelectorAll('[anime-count]')

    countElements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute('anime-count'), 10) || 0
      const obj = { val: 0 }

      gsap.to(obj, {
        val: targetVal,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        onUpdate: () => {
          el.innerText = Math.floor(obj.val)
        },
      })
    })
  }, [])

  const stats = [
    { num: '01', label: 'Services & Products', value: '9', suffix: '+', desc: 'Core product engineering disciplines spanning Mobile, SaaS, PaaS, CRM, ERP, and AI.' },
    { num: '02', label: 'Industry Verticals', value: '8', suffix: '+', desc: 'Deep domain expertise across Education, Healthcare, Real Estate, Logistics, Finance and Startups.' },
    { num: '03', label: 'Full-Cycle Delivery', value: '100', suffix: '%', desc: 'End-to-end execution: Idea → Design → Architecture → Deployment → Scale.' },
  ]

  return (
    <section ref={statsRef} className="section_stats py-28 md:py-36 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col space-y-5 max-w-2xl mb-20">
          <Tag text="lazy" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-normal text-white leading-tight">
            Execution By Numbers.
          </h2>
        </div>

        {/* 3 Metric Blocks — Flat bordered layout */}
        <div child-fade-in="" className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
          {stats.map((stat, idx) => (
            <div
              key={stat.num}
              className={`py-12 md:py-16 ${
                idx < stats.length - 1 ? 'md:border-r border-b md:border-b-0 border-white/10' : ''
              } ${idx > 0 ? 'md:pl-10' : ''} ${idx < stats.length - 1 ? 'md:pr-10' : ''}`}
            >
              <span className="font-mono text-xs text-white/30 uppercase tracking-wider">
                {stat.num}
              </span>
              <div className="text-5xl sm:text-6xl font-reckless font-normal text-white flex items-baseline mt-4 mb-4">
                <span anime-count={stat.value}>{stat.value}</span>
                <span className="text-brand-green ml-1 text-4xl">{stat.suffix}</span>
              </div>
              <p className="text-sm text-white/50 font-sans font-light leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
