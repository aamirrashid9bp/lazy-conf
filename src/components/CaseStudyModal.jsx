import React, { useEffect } from 'react'
import { useLeadModal } from '../context/LeadModalContext.jsx'

export default function CaseStudyModal({ caseStudy, onClose }) {
  const { openLeadModal } = useLeadModal()

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Prevent background body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!caseStudy) return null

  const { sections } = caseStudy

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-black/90 backdrop-blur-xl animate-fade-in select-none">
      
      {/* Backdrop overlay for closing */}
      <div
        className="fixed inset-0 bg-black/80"
        onClick={onClose}
        aria-label="Close modal overlay"
      />

      {/* Main Case Study Reader Container */}
      <div className="relative z-10 w-full max-w-5xl my-8 mx-4 sm:mx-6 md:mx-auto bg-[#070808] border border-white/15 rounded-[4px] shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-30 bg-[#070808]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-[11px] sm:text-xs text-[#1B3D33] font-semibold tracking-widest uppercase">
              [ CASE STUDY ]
            </span>
            <span className="text-white/30 font-mono text-xs">/</span>
            <span className="font-mono text-xs text-white/70 uppercase tracking-wider hidden sm:inline">
              {caseStudy.industry}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Case Study"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-mono text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer group"
          >
            <span>CLOSE</span>
            <span className="text-sm font-bold group-hover:rotate-90 transition-transform duration-200">✕</span>
          </button>
        </div>

        {/* Scrollable Detail Body */}
        <div className="overflow-y-auto px-6 sm:px-10 md:px-14 py-8 sm:py-12 space-y-12 sm:space-y-16">
          
          {/* ============================================================
              CASE STUDY HERO & COVER
              ============================================================ */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-[#1B3D33]/20 border border-[#1B3D33]/50 text-[#F5F1E8] font-mono text-[11px] uppercase tracking-wider rounded-[2px]">
                {caseStudy.industry}
              </span>
              <span className="text-white/40 font-mono text-xs">• 7-Part Deep Dive</span>
            </div>

            <h1 className="font-reckless text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#F5F1E8] leading-[1.08] tracking-tight">
              {caseStudy.name}
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-3xl">
              {caseStudy.subtitle}
            </p>

            {/* Primary Hero Screenshot */}
            <div className="w-full aspect-[16/9] rounded-[4px] overflow-hidden border border-white/15 bg-[#121413] shadow-2xl mt-6">
              <img
                src={caseStudy.image}
                alt={caseStudy.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* ============================================================
              01 — OVERVIEW
              ============================================================ */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm text-[#1B3D33] font-bold tracking-widest">{sections.overview.num}</span>
              <span className="text-white/30 font-mono">—</span>
              <h2 className="font-mono text-xs sm:text-sm text-white/90 uppercase tracking-widest font-semibold">
                {sections.overview.title}
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-3xl">
              {sections.overview.content}
            </p>
          </div>

          {/* ============================================================
              02 — THE CHALLENGE
              ============================================================ */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm text-[#1B3D33] font-bold tracking-widest">{sections.challenge.num}</span>
              <span className="text-white/30 font-mono">—</span>
              <h2 className="font-mono text-xs sm:text-sm text-white/90 uppercase tracking-widest font-semibold">
                {sections.challenge.title}
              </h2>
            </div>
            <div className="bg-[#0e100f] border border-white/10 p-6 rounded-[2px] mb-4">
              <p className="font-sans text-sm sm:text-base text-white/80 font-light leading-relaxed">
                {sections.challenge.content}
              </p>
            </div>
          </div>

          {/* ============================================================
              03 — OUR APPROACH
              ============================================================ */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm text-[#1B3D33] font-bold tracking-widest">{sections.approach.num}</span>
              <span className="text-white/30 font-mono">—</span>
              <h2 className="font-mono text-xs sm:text-sm text-white/90 uppercase tracking-widest font-semibold">
                {sections.approach.title}
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-3xl">
              {sections.approach.content}
            </p>
          </div>

          {/* ============================================================
              04 — PRODUCT DESIGN & SCREENSHOTS
              ============================================================ */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm text-[#1B3D33] font-bold tracking-widest">{sections.productDesign.num}</span>
              <span className="text-white/30 font-mono">—</span>
              <h2 className="font-mono text-xs sm:text-sm text-white/90 uppercase tracking-widest font-semibold">
                {sections.productDesign.title}
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-3xl mb-6">
              {sections.productDesign.content}
            </p>

            {/* Gallery Grid */}
            {caseStudy.secondaryImages && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
                {caseStudy.secondaryImages.slice(1, 3).map((img, i) => (
                  <div key={i} className="aspect-[16/10] rounded-[2px] overflow-hidden border border-white/10 bg-[#121413]">
                    <img src={img} alt="" className="w-full h-full object-cover object-top" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ============================================================
              05 — DEVELOPMENT
              ============================================================ */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm text-[#1B3D33] font-bold tracking-widest">{sections.development.num}</span>
              <span className="text-white/30 font-mono">—</span>
              <h2 className="font-mono text-xs sm:text-sm text-white/90 uppercase tracking-widest font-semibold">
                {sections.development.title}
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-3xl">
              {sections.development.content}
            </p>
          </div>

          {/* ============================================================
              06 — RESULTS & MEASURABLE IMPACT
              ============================================================ */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-sm text-[#1B3D33] font-bold tracking-widest">{sections.results.num}</span>
              <span className="text-white/30 font-mono">—</span>
              <h2 className="font-mono text-xs sm:text-sm text-white/90 uppercase tracking-widest font-semibold">
                {sections.results.title}
              </h2>
            </div>

            {/* Metrics 4-Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {sections.results.metrics.map((metric, i) => (
                <div key={i} className="bg-[#0e100f] border border-white/10 p-4 sm:p-5 rounded-[2px]">
                  <div className="font-reckless text-2xl sm:text-3xl lg:text-4xl text-[#F5F1E8] mb-1">
                    {metric.value}
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] text-white/60 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-3xl">
              {sections.results.content}
            </p>
          </div>

          {/* ============================================================
              07 — TECHNOLOGY STACK
              ============================================================ */}
          <div className="pt-8 border-t border-white/10 pb-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-sm text-[#1B3D33] font-bold tracking-widest">{sections.techStack.num}</span>
              <span className="text-white/30 font-mono">—</span>
              <h2 className="font-mono text-xs sm:text-sm text-white/90 uppercase tracking-widest font-semibold">
                {sections.techStack.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {sections.techStack.stack.map((group, i) => (
                <div key={i} className="bg-[#0b0d0c] border border-white/10 p-4 rounded-[2px]">
                  <h3 className="font-mono text-[11px] text-[#1B3D33] font-bold uppercase tracking-wider mb-3">
                    {group.category}
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {group.items.map((item, itemIdx) => (
                      <span key={itemIdx} className="font-mono text-xs text-white/70">
                        • {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================
              BOTTOM ACTION CALLOUT
              ============================================================ */}
          <div className="pt-10 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#0a0c0b] p-6 sm:p-8 rounded-[2px] border border-white/10">
            <div>
              <h3 className="font-reckless text-2xl text-[#F5F1E8] mb-1">Ready to engineer a solution for your business?</h3>
              <p className="font-sans text-xs sm:text-sm text-white/60">Let's discuss architecture, timelines, and measurable goals.</p>
            </div>
            <button
              onClick={() => {
                onClose()
                openLeadModal('build-product', {
                  product: caseStudy.name,
                  ctaClicked: `Case Study ${caseStudy.name} Reader CTA`
                })
              }}
              className="bg-[#1B3D33] hover:bg-[#1B3D33]/90 text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-[2px] transition-all duration-200 cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              Start Your Project →
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}
