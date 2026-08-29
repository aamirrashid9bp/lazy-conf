import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TechLogos } from '../components/TechLogos.jsx'
import OrganicEmeraldBlob from '../components/OrganicEmeraldBlob.jsx'

gsap.registerPlugin(ScrollTrigger)

// Structured grid technology cell definitions mapping 1:1 to the One Venture reference
const TECH_CELLS_ROW_1 = [
  { id: 'ai-ml', name: 'AI / ML', category: 'ai', hasBlob: true },
  { id: 'openai', name: 'OpenAI', logo: 'openai', category: 'ai' },
  { id: 'python', name: 'Python', logo: 'python', category: 'ai' },
  { id: 'tensorflow', name: 'TensorFlow', logo: 'tensorflow', category: 'ai' },
  { id: 'pytorch', name: 'PyTorch', logo: 'pytorch', category: 'ai' },
  { id: 'scikitlearn', name: 'scikit-learn', logo: 'scikitlearn', category: 'ai' },
  { id: 'langchain', name: 'LangChain', logo: 'langchain', category: 'ai' },
]

const TECH_CELLS_ROW_2_LEFT = [
  { id: 'react', name: 'React', logo: 'react', category: 'frontend' },
  { id: 'nextjs', name: 'NEXT.JS', logo: 'nextjs', category: 'frontend' },
  { id: 'vue', name: 'Vue.js', logo: 'vue', category: 'frontend' },
]
const TECH_CELLS_ROW_2_RIGHT = [
  { id: 'typescript', name: 'TypeScript', logo: 'typescript', category: 'frontend' },
]

const TECH_CELLS_ROW_3_LEFT = [
  { id: 'flutter', name: 'Flutter', logo: 'flutter', category: 'mobile' },
  { id: 'android', name: 'Android', logo: 'android', category: 'mobile' },
  { id: 'ios', name: 'iOS', logo: 'ios', category: 'mobile' },
]
const TECH_CELLS_ROW_3_RIGHT = [
  { id: 'nodejs', name: 'Node.js', logo: 'nodejs', category: 'backend' },
]

const TECH_CELLS_ROW_4 = [
  { id: 'aws', name: 'AWS', logo: 'aws', category: 'cloud' },
  { id: 'azure', name: 'Azure', logo: 'azure', category: 'cloud' },
  { id: 'database', name: 'DATABASE', category: 'database', hasBlob: true },
  { id: 'mongodb', name: 'MongoDB', logo: 'mongodb', category: 'database' },
  { id: 'postgresql', name: 'PostgreSQL', logo: 'postgresql', category: 'database' },
  { id: 'redis', name: 'Redis', logo: 'redis', category: 'database' },
  { id: 'docker', name: 'Docker', logo: 'docker', category: 'cloud' },
]

// All technologies for responsive mobile/tablet flow
const ALL_TECH_ITEMS = [
  ...TECH_CELLS_ROW_1,
  ...TECH_CELLS_ROW_2_LEFT,
  ...TECH_CELLS_ROW_2_RIGHT,
  ...TECH_CELLS_ROW_3_LEFT,
  ...TECH_CELLS_ROW_3_RIGHT,
  ...TECH_CELLS_ROW_4,
]

export default function Formula() {
  const sectionRef = useRef(null)
  const gridContainerRef = useRef(null)
  const topLabelRef = useRef(null)
  const centerTextRef = useRef(null)
  const [activeStackIndex, setActiveStackIndex] = useState(1)
  const [hoveredCell, setHoveredCell] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Coordinated entrance and scroll-pinned animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      // 1. Top label + curved arrow draw in
      tl.fromTo(
        topLabelRef.current,
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
      )

      // 2. Grid outer border & lines reveal
      tl.fromTo(
        '.tech-grid-wrapper',
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      )

      // 3. Staggered reveal of technology cells
      tl.fromTo(
        '.tech-cell',
        { opacity: 0, y: 12, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: {
            amount: 0.6,
            grid: [4, 7],
            from: 'start',
          },
          ease: 'power2.out',
        },
        '-=0.4'
      )

      // 4. Center editorial text entrance
      tl.fromTo(
        centerTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )

      // Scroll-linked stack index progression
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
          const step = Math.min(4, Math.floor(self.progress * 4) + 1)
          setActiveStackIndex(step)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Helper renderer for a single tech cell
  const renderCell = (item) => {
    const LogoComponent = item.logo ? TechLogos[item.logo] : null

    return (
      <div
        key={item.id}
        onMouseEnter={() => setHoveredCell(item.id)}
        onMouseLeave={() => setHoveredCell(null)}
        className="tech-cell relative flex flex-col items-center justify-between p-4 md:p-5 w-full h-full min-h-[130px] sm:min-h-[145px] md:min-h-[160px] lg:min-h-[175px] bg-[#0a0a0a] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden cursor-pointer group select-none"
      >
        {/* Subtle hover backlight */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-white/[0.03] to-transparent transition-opacity duration-300 pointer-events-none" />

        {/* Centered Technology Logo or Organic Emerald Blob */}
        <div className="flex-1 flex items-center justify-center relative z-10 w-full transition-transform duration-300 group-hover:scale-105">
          {item.hasBlob ? (
            <OrganicEmeraldBlob className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
          ) : LogoComponent ? (
            <LogoComponent />
          ) : (
            <span className="font-mono text-sm text-white/80">{item.name}</span>
          )}
        </div>

        {/* Small Technology Label */}
        <span className="font-mono text-[11px] md:text-[12px] font-normal text-white/60 group-hover:text-white transition-colors duration-200 relative z-10">
          {item.name}
        </span>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative bg-black text-white py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Background Subtle Architectural Gridlines */}
      <div className="grid-lines dark opacity-40">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* ============================================================
            TOP LABEL & CURVED ARROW
            Reproduces the exact handwritten/editorial style from reference
            ============================================================ */}
        <div
          ref={topLabelRef}
          className="flex items-center gap-3 mb-6 sm:mb-8 ml-2 sm:ml-4 lg:ml-6 select-none"
        >
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-xs sm:text-[13px] md:text-sm uppercase tracking-[0.2em] font-medium text-[#1B3D33]">
              TECHNOLOGY
            </span>
            <span className="font-mono text-xs sm:text-[13px] md:text-sm uppercase tracking-[0.2em] font-medium text-[#1B3D33]">
              STACK
            </span>
          </div>

          {/* Curved Hand-Drawn Arrow pointing to the grid */}
          <div className="relative w-14 sm:w-16 md:w-20 h-9 md:h-10 text-[#1B3D33] -translate-y-1">
            <svg
              viewBox="0 0 76 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full stroke-current"
            >
              <path
                d="M 4 28 C 18 6, 44 4, 64 24"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M 52 24 L 64 24 L 63 12"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* ============================================================
            DESKTOP / LAPTOP 7x4 GRID (>= 1024px)
            Exact 1:1 Layout matching the One Venture reference screenshot
            ============================================================ */}
        <div className="hidden lg:block tech-grid-wrapper border border-white/10 bg-black rounded-[2px] shadow-2xl overflow-hidden">
          <div className="grid grid-cols-7 gap-[1px] bg-white/[0.08]">
            
            {/* ROW 1: 7 Technology Cells */}
            {TECH_CELLS_ROW_1.map((item) => renderCell(item))}

            {/* ROW 2: 3 Left Cells */}
            {TECH_CELLS_ROW_2_LEFT.map((item) => renderCell(item))}

            {/* CENTER EDITORIAL BLOCK: Spans 3 columns x 2 rows (Row 2 & 3, Cols 4-6) */}
            <div
              ref={centerTextRef}
              className="col-span-3 row-span-2 relative bg-black flex items-center justify-start p-8 xl:p-12 z-20 select-none overflow-hidden group w-full h-full"
            >
              {/* Subtle ambient gradient in center */}
              <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none" />

              <div className="flex items-center gap-8 xl:gap-12 w-full">
                
                {/* Left Stack Indicator */}
                <div className="flex flex-col items-center justify-center shrink-0 pr-4">
                  <span className="font-mono text-xs md:text-sm text-[#1B3D33] font-medium tracking-wide">
                    &#123; Stack &#125;
                  </span>
                  <span className="font-mono text-4xl xl:text-5xl font-bold text-[#1B3D33] mt-2 tracking-tighter transition-all duration-300">
                    {activeStackIndex}
                  </span>
                </div>

                {/* Large Editorial Headline */}
                <h2 className="font-reckless text-5xl xl:text-[68px] 2xl:text-[76px] font-normal leading-[1.06] tracking-tight text-[#f5f5f5]">
                  Building <br />
                  should feel <br />
                  <span className="text-white">like fun?</span>
                </h2>
              </div>
            </div>

            {/* ROW 2: 1 Right Cell (TypeScript) */}
            {TECH_CELLS_ROW_2_RIGHT.map((item) => renderCell(item))}

            {/* ROW 3: 3 Left Cells (Flutter, Android, iOS) */}
            {TECH_CELLS_ROW_3_LEFT.map((item) => renderCell(item))}

            {/* ROW 3: 1 Right Cell (Node.js) */}
            {TECH_CELLS_ROW_3_RIGHT.map((item) => renderCell(item))}

            {/* ROW 4: 7 Technology Cells */}
            {TECH_CELLS_ROW_4.map((item) => renderCell(item))}

          </div>
        </div>

        {/* ============================================================
            TABLET / MOBILE RESPONSIVE GRID (< 1024px)
            Preserves the exact concept, editorial statement, and tiles
            ============================================================ */}
        <div className="block lg:hidden tech-grid-wrapper border border-white/10 bg-black rounded-[2px] overflow-hidden">
          
          {/* Mobile/Tablet Center Editorial Banner */}
          <div className="bg-black p-6 sm:p-8 flex items-center justify-between border-b border-white/10">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-[#1B3D33] font-medium">&#123; Stack &#125;</span>
                <span className="font-mono text-lg font-bold text-[#1B3D33]">{activeStackIndex}</span>
              </div>
              <h2 className="font-reckless text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.1] text-white">
                Building <br />
                should feel <br />
                like fun?
              </h2>
            </div>
          </div>

          {/* Grid of Technology Cells for Tablet/Mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[1px] bg-white/[0.08]">
            {ALL_TECH_ITEMS.map((item) => renderCell(item))}
          </div>

        </div>

      </div>
    </section>
  )
}
