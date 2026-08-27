import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS_ITEMS = [
  {
    num: '10+',
    label: 'Years of experience',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80',
    alt: "Newton's cradle showing momentum transfer",
  },
  {
    num: '30+',
    label: 'Products shipped',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80',
    alt: 'Puzzle pieces fitting into place',
  },
  {
    num: '52+',
    label: 'Weeks of shipping cadence',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&auto=format&fit=crop&q=80',
    alt: 'Dominoes falling in rhythm',
  },
]

export default function Stats() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stats-card',
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-card-grid',
            start: 'top 82%',
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
      id="stats-section"
      className="section_home_stats relative bg-black text-white py-20 md:py-28 lg:py-36 overflow-hidden border-b border-white/10 select-none"
    >
      {/* Background Architectural Curve */}
      <div className="absolute inset-0 pointer-events-none opacity-25 flex items-center justify-center">
        <svg viewBox="0 0 1440 600" className="w-full h-full object-cover">
          <path
            d="M 0 300 C 360 100, 720 500, 1440 200"
            fill="none"
            stroke="#6365FF"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          />
          <path
            d="M 0 450 C 400 600, 800 200, 1440 400"
            fill="none"
            stroke="#2F6F5E"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs sm:text-[13px] text-[#4E9F76] font-medium tracking-[0.2em] uppercase">
              [ <span data-scramble="">METRICS</span> ]
            </span>
          </div>
          <h2 fd-scroll-heading="" className="font-reckless text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-normal leading-[1.05] tracking-tight text-white">
            Execution By Numbers
          </h2>
        </div>

        {/* 3 Metric Cards Grid with Counter Animations */}
        <div anime-count-wrap="" className="stats-card-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {STATS_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="stats-card group relative bg-[#090b0a] border border-white/10 hover:border-[#38e07b]/40 p-6 sm:p-8 rounded-[2px] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-xl overflow-hidden"
            >
              {/* Card Image Thumbnail */}
              <div className="relative aspect-[16/10] w-full mb-8 overflow-hidden rounded-[2px] bg-[#121212]">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Number and Description */}
              <div>
                <div anime-count="" className="font-reckless text-5xl sm:text-6xl lg:text-7xl font-normal text-white mb-3 tracking-tight leading-none">
                  {item.num}
                </div>
                <p split-para="" className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                  {item.label}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
