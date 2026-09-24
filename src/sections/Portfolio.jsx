import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLeadModal } from '../context/LeadModalContext.jsx'

gsap.registerPlugin(ScrollTrigger)

const PORTFOLIO_PROJECTS = [
  {
    id: 'nexametrics-saas',
    name: 'NexaMetrics Platform',
    category: 'SaaS Telemetry & Revenue Intelligence',
    desc: 'Real-time telemetry and financial intelligence dashboard processing high-frequency event streams with sub-second analytics and revenue forecasting.',
    tags: ['WEB APP', 'REACT', 'NODE', 'TIMESCALE'],
    image: '/portfolio_nexa_metrics.jpg',
    layoutSpan: 'col-span-12 lg:col-span-7', // Asymmetric Large
    aspectRatio: 'aspect-[16/10]',
    link: '/project/convertleads'
  },
  {
    id: 'omniflow-crm',
    name: 'OmniFlow Business CRM',
    category: 'Sales Automation & Deal Routing',
    desc: 'Automated deal pipeline operations with intelligent lead routing, multi-channel customer activity feeds, and real-time team conversion analytics.',
    tags: ['CRM', 'NEXT.JS', 'POSTGRESQL', 'AUTOMATION'],
    image: '/portfolio_omniflow_crm.jpg',
    layoutSpan: 'col-span-12 lg:col-span-5', // Asymmetric Small
    aspectRatio: 'aspect-[16/11]',
    link: '/project/convertleads'
  },
  {
    id: 'cortex-ai-studio',
    name: 'CortexAI Studio',
    category: 'AI Agents & Document Intelligence',
    desc: 'Visual LLM agent orchestration platform enabling enterprise teams to construct, evaluate, and deploy autonomous workflows with vector retrieval.',
    tags: ['AI PRODUCT', 'PYTHON', 'FASTAPI', 'LLM'],
    image: '/portfolio_cortex_ai.jpg',
    layoutSpan: 'col-span-12 lg:col-span-5', // Asymmetric Small
    aspectRatio: 'aspect-[16/11]',
    link: '/project/business-automation-ai'
  },
  {
    id: 'vesper-commerce',
    name: 'Vesper Luxury Commerce',
    category: 'Headless E-Commerce & Checkout',
    desc: 'Modern headless commerce engine featuring instant edge-cached catalog browsing, inventory velocity monitoring, and sub-second checkout conversion.',
    tags: ['E-COMMERCE', 'REACT', 'GRAPHQL', 'STRIPE'],
    image: '/portfolio_vesper_commerce.jpg',
    layoutSpan: 'col-span-12 lg:col-span-7', // Asymmetric Large
    aspectRatio: 'aspect-[16/10]',
    link: '/project/saas-paas-engineering'
  },
  {
    id: 'aether-health-mobile',
    name: 'Aether Health Mobile',
    category: 'Biometrics & Patient Telemetry',
    desc: 'Cross-platform mobile application delivering real-time biometric vital tracking, patient-doctor appointment management, and offline clinical synchronization.',
    tags: ['MOBILE APP', 'REACT NATIVE', 'TAILWIND', 'WEBSOCKETS'],
    image: '/portfolio_aether_mobile.jpg',
    layoutSpan: 'col-span-12 lg:col-span-7', // Asymmetric Large
    aspectRatio: 'aspect-[16/10]',
    link: '/project/mobile-app-development'
  },
  {
    id: 'atlas-enterprise-erp',
    name: 'Atlas Enterprise ERP',
    category: 'Multi-Tenant Supply Chain Console',
    desc: 'Centralized global logistics and multi-tenant warehouse distribution system with live fleet telemetry, automated stock routing, and compliance audit logs.',
    tags: ['ENTERPRISE', 'VUE/REACT', 'GO', 'DOCKER'],
    image: '/portfolio_atlas_erp.jpg',
    layoutSpan: 'col-span-12 lg:col-span-5', // Asymmetric Small
    aspectRatio: 'aspect-[16/11]',
    link: '/project/rtmnu-system'
  }
]

export default function Portfolio() {
  const sectionRef = useRef(null)
  const { openLeadModal } = useLeadModal()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        '.portfolio-header',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-header',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Card staggered scroll reveals
      const cards = gsap.utils.toArray('.portfolio-card')
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: (index % 2) * 0.15,
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
      id="portfolio-section"
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
            [ PORTFOLIO ]
            Selected Work
            Supporting text
            ============================================================ */}
        <div className="portfolio-header mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs sm:text-[13px] text-[#1B3D33] font-medium tracking-[0.2em] uppercase">
              [ <span data-scramble="">PORTFOLIO</span> ]
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                fd-scroll-heading=""
                className="font-reckless text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-normal leading-[1.05] tracking-tight text-[#F5F1E8]"
              >
                Selected Work
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/65 font-light leading-relaxed max-w-md">
              A selection of products, platforms, and digital systems we've designed and built.
            </p>
          </div>

          <div className="w-full h-[1px] bg-white/15 mt-8 sm:mt-10" />
        </div>

        {/* ============================================================
            ASYMMETRIC PORTFOLIO GRID
            Desktop: Staggered 7/5 & 5/7 columns
            Tablet: 2-column
            Mobile: 1-column
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
          {PORTFOLIO_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className={`portfolio-card group relative bg-[#090b0a] border border-white/10 hover:border-[#1B3D33]/70 p-5 sm:p-7 md:p-8 rounded-[2px] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between shadow-2xl overflow-hidden ${project.layoutSpan}`}
            >
              {/* Subtle Warm-White & Green Hover Accent Line on Top */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1B3D33]/0 to-transparent group-hover:via-[#1B3D33] transition-all duration-500" />

              {/* CARD TOP: Image Container */}
              <div className={`relative ${project.aspectRatio} w-full mb-6 sm:mb-8 overflow-hidden rounded-[2px] bg-[#121413] border border-white/5 group-hover:border-white/20 transition-colors duration-500`}>
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:translate-y-[-2px]"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* Top Right Project Number Tag */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded font-mono text-[10px] text-white/70 tracking-widest uppercase">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>

              {/* CARD CONTENT: Category, Name, Description */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <div className="font-mono text-[11px] sm:text-xs text-[#1B3D33] font-semibold tracking-widest uppercase mb-2">
                    {project.category}
                  </div>

                  {/* Project Name with subtle hover motion */}
                  <h3 className="font-reckless text-2xl sm:text-3xl lg:text-[32px] font-normal text-[#F5F1E8] tracking-tight mb-3 transition-transform duration-300 ease-out group-hover:translate-x-1">
                    {project.name}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-white/65 font-light leading-relaxed mb-6">
                    {project.desc}
                  </p>
                </div>

                {/* CARD FOOTER: Tags & View Project CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Category / Tech Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-1 rounded-[2px] border border-white/10 bg-white/[0.03] group-hover:border-white/20 font-mono text-[10px] uppercase tracking-wider text-white/75 transition-colors"
                      >
                        [ {tag} ]
                      </span>
                    ))}
                  </div>

                  {/* VIEW PROJECT → Action */}
                  <button
                    type="button"
                    onClick={() => {
                      openLeadModal('build-product', {
                        product: project.name,
                        ctaClicked: `Portfolio ${project.name} View`
                      })
                    }}
                    className="font-mono text-xs sm:text-[13px] font-bold text-[#F5F1E8] group-hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span className="relative">
                      VIEW PROJECT
                      <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[#1B3D33] group-hover:w-full transition-all duration-300" />
                    </span>
                    <span className="text-[#1B3D33] group-hover:text-white transition-all duration-300 group-hover:translate-x-1.5 font-bold">
                      →
                    </span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
