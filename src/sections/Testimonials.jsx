import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller } from 'swiper/modules'
import 'swiper/css'
import Tag from '../components/Tag.jsx'

export default function Testimonials() {
  const [contentSwiper, setContentSwiper] = useState(null)
  const [imgSwiper, setImgSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const steps = [
    {
      num: '01',
      phase: 'Discover',
      tagline: 'Deep Business & Problem Discovery',
      desc: 'Understand your business, target users, market bottlenecks, existing workflows and primary objectives before proposing an architecture.',
      deliverables: 'Problem Breakdown · User Personas · Feasibility Study'
    },
    {
      num: '02',
      phase: 'Define',
      tagline: 'Scope, Architecture & Roadmap',
      desc: 'Convert complex requirements into a clear product scope, scalable database architecture, sprint roadmap and release milestones.',
      deliverables: 'Technical Specification · Database Schema · Sprint Backlog'
    },
    {
      num: '03',
      phase: 'Design',
      tagline: 'UI/UX & Interactive Prototypes',
      desc: 'Create frictionless user journeys, wireframes, clickable prototypes, and design systems tailored for web, mobile, and enterprise portals.',
      deliverables: 'Figma Design System · Clickable Prototypes · UX Flows'
    },
    {
      num: '04',
      phase: 'Build',
      tagline: 'Full-Stack Engineering & Velocity',
      desc: 'Develop, integrate, test, and iterate with weekly shipping cadence using modern cloud, frontend, backend, and database technologies.',
      deliverables: 'Clean Codebase · CI/CD Pipelines · Automated Testing'
    },
    {
      num: '05',
      phase: 'Launch',
      tagline: 'Production Deployment & Monitoring',
      desc: 'Deploy the product to production cloud infrastructure (AWS/Serverless), establish analytics, security hardening, and performance monitoring.',
      deliverables: 'Live Deployment · Cloud Scaling · Real-Time Monitoring'
    },
    {
      num: '06',
      phase: 'Grow',
      tagline: 'Continuous Automation & Scaling',
      desc: 'Optimize features based on real user data, automate operational bottlenecks, integrate external APIs, and introduce intelligent AI capabilities.',
      deliverables: 'Feature Iterations · AI Enhancements · Ongoing Support'
    }
  ]

  return (
    <section className="section_testimonials py-28 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="padding-global max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col space-y-6 max-w-3xl mb-16">
          <div className="brand-color-purple">
            <Tag text="HOW WE BUILD" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-bold text-white leading-tight">
            How We Build. <br />
            <span className="text-brand-green">A Proven 6-Step Engine.</span>
          </h2>
          <p split-para="" className="text-base sm:text-lg text-white/70 font-body leading-relaxed">
            Every product we build follows a structured, transparent process designed to move from concept to scalable production with high velocity.
          </p>
        </div>

        {/* Synced Dual Slider Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Step Phase Card Visual */}
          <div className="lg:col-span-5 relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-grey-2 rounded-2xl border border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
            <Swiper
              modules={[Controller]}
              onSwiper={setImgSwiper}
              controller={{ control: contentSwiper }}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
              slidesPerView={1}
              className="w-full h-full"
            >
              {steps.map((st, idx) => (
                <SwiperSlide key={idx}>
                  <div className="h-full flex flex-col justify-between py-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-5xl sm:text-6xl text-brand-green font-bold">
                        {st.num}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60">
                        Phase 0{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="font-mono text-xs text-brand-green uppercase tracking-wider">
                        Core Milestone
                      </div>
                      <div className="font-reckless text-3xl sm:text-4xl font-bold text-white">
                        {st.phase}
                      </div>
                      <div className="font-mono text-xs text-white/50">
                        {st.deliverables}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right: Step Detailed Description Slider */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <Swiper
              modules={[Controller]}
              onSwiper={setContentSwiper}
              controller={{ control: imgSwiper }}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
              slidesPerView={1}
              className="w-full"
            >
              {steps.map((st, idx) => (
                <SwiperSlide key={idx}>
                  <div className="space-y-6 py-4">
                    <div className="font-mono text-xs text-brand-green font-bold uppercase tracking-wider">
                      [{st.num} · {st.phase.toUpperCase()}]
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-reckless font-bold text-white">
                      {st.tagline}
                    </h3>

                    <p className="text-base sm:text-lg text-white/70 font-body leading-relaxed max-w-xl">
                      {st.desc}
                    </p>

                    <div className="pt-4 border-t border-white/10">
                      <span className="font-mono text-xs text-white/40 uppercase">Output: </span>
                      <span className="font-mono text-xs text-white/80">{st.deliverables}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Step Navigation Dots & Arrows */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div className="flex items-center space-x-2">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      contentSwiper?.slideTo(idx)
                      imgSwiper?.slideTo(idx)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'w-8 bg-brand-green' : 'w-2 bg-white/20'
                    }`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    contentSwiper?.slidePrev()
                    imgSwiper?.slidePrev()
                  }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => {
                    contentSwiper?.slideNext()
                    imgSwiper?.slideNext()
                  }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  →
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
