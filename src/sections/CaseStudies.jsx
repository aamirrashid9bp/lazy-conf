import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CASE_STUDIES } from '../data/caseStudiesData.js'
import CaseStudyModal from '../components/CaseStudyModal.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function CaseStudies() {
  const sectionRef = useRef(null)
  const [activeModalStudy, setActiveModalStudy] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo(
        '.case-studies-header',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.case-studies-header',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Cards staggered reveal
      const cards = gsap.utils.toArray('.case-study-card')
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="case-studies-section"
      className="relative bg-black text-white py-20 sm:py-24 md:py-32 lg:py-36 overflow-hidden border-b border-white/10"
    >
      {/* Background Architectural Grid Lines */}
      <div className="grid-lines dark opacity-25 pointer-events-none">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* ============================================================
            SECTION HEADER
            [ CASE STUDIES ]
            Built to solve real problems.
            Supporting text
            ============================================================ */}
        <div className="case-studies-header mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs sm:text-[13px] text-[#1B3D33] font-medium tracking-[0.2em] uppercase">
              [ <span data-scramble="">CASE STUDIES</span> ]
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                fd-scroll-heading=""
                className="font-reckless text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-normal leading-[1.05] tracking-tight text-[#F5F1E8]"
              >
                Built to solve real problems.
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/65 font-light leading-relaxed max-w-md">
              Explore how we turn complex business problems into scalable digital products.
            </p>
          </div>

          <div className="w-full h-[1px] bg-white/15 mt-8 sm:mt-10" />
        </div>

        {/* ============================================================
            3 DETAILED CASE STUDY CARDS
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={study.id}
              className="case-study-card group relative bg-[#080a09] border border-white/10 hover:border-[#1B3D33]/80 p-6 sm:p-8 rounded-[2px] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-2xl overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1B3D33]/0 to-transparent group-hover:via-[#1B3D33] transition-all duration-500" />

              <div>
                {/* 1. Large Project Image */}
                <div className="relative aspect-[16/10] w-full mb-6 sm:mb-8 overflow-hidden rounded-[2px] bg-[#121413] border border-white/5 group-hover:border-white/20 transition-colors duration-500">
                  <img
                    src={study.image}
                    alt={study.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:translate-y-[-2px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                  
                  {/* Case Study Binary Index Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded font-mono text-[10px] text-white/70 tracking-widest uppercase">
                    CASE // 0{idx + 1}
                  </div>
                </div>

                {/* 2. Client / Project Name & Industry */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-white/50 uppercase tracking-widest">
                    <span>INDUSTRY:</span>
                    <span className="text-[#1B3D33] font-semibold">{study.industry}</span>
                  </div>
                  
                  <h3 className="font-reckless text-2xl sm:text-3xl font-normal text-[#F5F1E8] tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                    {study.name}
                  </h3>
                </div>

                {/* 3. Challenge / Solution / Result Structured Breakdown */}
                <div className="space-y-4 pt-4 border-t border-white/10 text-xs sm:text-[13px] leading-relaxed">
                  {/* THE CHALLENGE */}
                  <div>
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-1">
                      [ THE CHALLENGE ]
                    </span>
                    <p className="font-sans text-white/70 font-light">
                      {study.challenge}
                    </p>
                  </div>

                  {/* THE SOLUTION */}
                  <div>
                    <span className="font-mono text-[10px] text-[#1B3D33] uppercase tracking-widest block mb-1 font-semibold">
                      [ THE SOLUTION ]
                    </span>
                    <p className="font-sans text-white/80 font-light">
                      {study.solution}
                    </p>
                  </div>

                  {/* THE RESULT */}
                  <div>
                    <span className="font-mono text-[10px] text-[#F5F1E8] uppercase tracking-widest block mb-1 font-semibold">
                      [ THE RESULT ]
                    </span>
                    <p className="font-sans text-[#F5F1E8]/90 font-normal">
                      {study.result}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Tech Tags & Read Case Study Action */}
              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col space-y-4">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {study.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2 py-0.5 rounded-[2px] border border-white/10 bg-white/[0.03] font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/70"
                    >
                      [ {tag} ]
                    </span>
                  ))}
                </div>

                {/* READ CASE STUDY → Button */}
                <button
                  type="button"
                  onClick={() => setActiveModalStudy(study)}
                  className="font-mono text-xs sm:text-[13px] font-bold text-[#F5F1E8] group-hover:text-white uppercase tracking-wider flex items-center justify-between pt-2 transition-colors cursor-pointer w-full text-left"
                >
                  <span className="relative">
                    READ CASE STUDY
                    <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[#1B3D33] group-hover:w-full transition-all duration-300" />
                  </span>
                  <span className="text-[#1B3D33] group-hover:text-white transition-all duration-300 group-hover:translate-x-1.5 font-bold text-base">
                    →
                  </span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Dedicated 7-Section Interactive Modal Reader */}
      {activeModalStudy && (
        <CaseStudyModal
          caseStudy={activeModalStudy}
          onClose={() => setActiveModalStudy(null)}
        />
      )}
    </section>
  )
}
