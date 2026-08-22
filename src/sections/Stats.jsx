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

  return (
    <section ref={statsRef} className="section_stats py-24 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="padding-global max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col space-y-4 max-w-2xl mb-16">
          <div className="brand-color-purple">
            <Tag text="00101" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-bold text-white leading-tight">
            Execution By Numbers. <br />
            <span className="text-brand-green">Built for Velocity.</span>
          </h2>
        </div>

        {/* 3 Metric Cards */}
        <div child-fade-in="" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-grey-2 border border-white/5 flex flex-col justify-between space-y-6">
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
              01 // Services & Products
            </div>
            <div className="text-5xl sm:text-6xl font-reckless font-bold text-white flex items-baseline">
              <span anime-count="9">9</span>
              <span className="text-brand-green ml-1">+</span>
            </div>
            <p className="text-sm text-white/60 font-body">
              Core product engineering disciplines spanning Mobile, SaaS, PaaS, CRM, ERP, and AI.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-grey-2 border border-white/5 flex flex-col justify-between space-y-6">
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
              02 // Industry Verticals
            </div>
            <div className="text-5xl sm:text-6xl font-reckless font-bold text-white flex items-baseline">
              <span anime-count="8">8</span>
              <span className="text-brand-green ml-1">+</span>
            </div>
            <p className="text-sm text-white/60 font-body">
              Deep domain expertise across Education, Healthcare, Real Estate, Logistics, Finance and Startups.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-grey-2 border border-white/5 flex flex-col justify-between space-y-6">
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
              03 // Full-Cycle Delivery
            </div>
            <div className="text-5xl sm:text-6xl font-reckless font-bold text-white flex items-baseline">
              <span anime-count="100">100</span>
              <span className="text-brand-green ml-1">%</span>
            </div>
            <p className="text-sm text-white/60 font-body">
              End-to-end execution: Idea ➔ Design ➔ Architecture ➔ Deployment ➔ Scale.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
