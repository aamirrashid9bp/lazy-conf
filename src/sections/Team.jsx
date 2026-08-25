import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Team() {
  const sectionRef = useRef(null)

  const team = [
    {
      name: 'Aamir',
      role: 'Founder & Head of Engineering',
      image: '/aamir.png' // Make sure this exists in public or use fallback
    },
    {
      name: 'Sahil',
      role: 'Lead Designer',
      image: 'https://i.pravatar.cc/300?u=sahil' // Fallback for demo
    }
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.team-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo('.team-member',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.team-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="team-section"
      className="relative bg-[#060611] text-white py-20 md:py-32 overflow-hidden border-b border-white/10"
    >
      {/* Background Grid */}
      <div className="grid-lines dark">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col">
        
        {/* Header */}
        <div className="team-header flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 md:mb-24 gap-6 border-b border-white/10 pb-8">
          <div>
            <Tag text="lazy" />
            <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-reckless font-normal tracking-tight leading-[1.05]">
              The <span className="italic text-brand-green">Team.</span>
            </h2>
          </div>
          <div className="max-w-xs text-sm text-white/50 font-sans font-light">
            A tight-knit crew of engineers and designers who care deeply about building exceptional software.
          </div>
        </div>

        {/* Team Grid */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {team.map((member, idx) => (
            <div key={idx} className="team-member group cursor-crosshair">
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#090914] border border-white/10 rounded-sm mb-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  onError={(e) => {
                    e.target.src = `https://i.pravatar.cc/400?u=${member.name}`
                  }}
                />
                <div className="absolute inset-0 bg-brand-green/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Tech mark */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-white/40 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
              
              {/* Text */}
              <div className="flex flex-col border-l border-brand-green/30 pl-4">
                <h3 className="font-mono text-lg font-bold text-white uppercase tracking-widest mb-1 group-hover:text-brand-green transition-colors">
                  {member.name}
                </h3>
                <p className="font-sans text-sm text-white/50 font-light">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
