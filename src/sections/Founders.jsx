import React, { useState, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import Tag from '../components/Tag.jsx'

export default function Founders() {
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const [clickCount, setClickCount] = useState(0)
  const [activeStage, setActiveStage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [score, setScore] = useState(100)

  const stages = [
    { name: 'IDEA', tag: '01', sub: 'Validation & Strategy' },
    { name: 'PRODUCT', tag: '02', sub: 'MVP & Architecture' },
    { name: 'AUTOMATION', tag: '03', sub: 'Workflows & Pipelines' },
    { name: 'SCALE', tag: '04', sub: 'Cloud & AI Growth' },
  ]

  // Physics animation state refs for delayed/lerped cursor following with inertia
  const physicsRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    targetRotX: 0,
    targetRotY: 0,
    targetRotZ: 0,
    impulseX: 0,
    impulseY: 0,
    isInteracting: false,
  })

  const reqIdRef = useRef(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const handleMouseMove = (e) => {
      // Only run interactive physics on desktop screens
      if (window.innerWidth < 768) return

      const rect = sectionEl.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalized coordinates from -1 to 1 across section
      const nx = (e.clientX - centerX) / (rect.width / 2)
      const ny = (e.clientY - centerY) / (rect.height / 2)

      // Move in cursor direction with safe boundaries
      physicsRef.current.targetX = Math.max(-48, Math.min(48, nx * 44))
      physicsRef.current.targetY = Math.max(-28, Math.min(28, ny * 24))

      // 3D perspective rotation tilt
      physicsRef.current.targetRotY = Math.max(-10, Math.min(10, nx * 8))
      physicsRef.current.targetRotX = Math.max(-9, Math.min(9, -ny * 7))
      physicsRef.current.targetRotZ = Math.max(-4, Math.min(4, nx * 3))
      physicsRef.current.isInteracting = true
    }

    const handleMouseLeave = () => {
      // Smooth spring return toward resting position
      physicsRef.current.targetX = 0
      physicsRef.current.targetY = 0
      physicsRef.current.targetRotX = 0
      physicsRef.current.targetRotY = 0
      physicsRef.current.targetRotZ = 0
      physicsRef.current.isInteracting = false
    }

    sectionEl.addEventListener('mousemove', handleMouseMove)
    sectionEl.addEventListener('mouseleave', handleMouseLeave)

    // Animation loop with Lerp & Inertia
    let startTime = Date.now()

    const animate = () => {
      const p = physicsRef.current
      const time = (Date.now() - startTime) * 0.002

      // Decay click impulses
      p.impulseX *= 0.91
      p.impulseY *= 0.91

      // Subtle breathing motion when idle
      const idleY = !p.isInteracting ? Math.sin(time) * 4 : 0
      const idleRotZ = !p.isInteracting ? Math.sin(time * 0.8) * 1.2 : 0

      // Linear interpolation (Lerp factor 0.065 for smooth delayed movement)
      p.currentX += ((p.targetX + p.impulseX) - p.currentX) * 0.065
      p.currentY += ((p.targetY + p.impulseY + idleY) - p.currentY) * 0.065
      p.rotX += (p.targetRotX - p.rotX) * 0.075
      p.rotY += (p.targetRotY - p.rotY) * 0.075
      p.rotZ += ((p.targetRotZ + idleRotZ) - p.rotZ) * 0.075

      if (visualRef.current) {
        visualRef.current.style.transform = `
          translate3d(${p.currentX.toFixed(2)}px, ${p.currentY.toFixed(2)}px, 0px)
          rotateX(${p.rotX.toFixed(2)}deg)
          rotateY(${p.rotY.toFixed(2)}deg)
          rotateZ(${p.rotZ.toFixed(2)}deg)
        `
      }

      reqIdRef.current = requestAnimationFrame(animate)
    }

    reqIdRef.current = requestAnimationFrame(animate)

    return () => {
      sectionEl.removeEventListener('mousemove', handleMouseMove)
      sectionEl.removeEventListener('mouseleave', handleMouseLeave)
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current)
    }
  }, [])

  // Handle click on lazy visual
  const handleVisualClick = (e) => {
    e.stopPropagation()
    const p = physicsRef.current

    // Apply elastic impulse
    const angle = Math.random() * Math.PI * 2
    const force = 36
    p.impulseX = Math.cos(angle) * force
    p.impulseY = Math.sin(angle) * force
    p.targetRotY += (Math.random() - 0.5) * 16

    const nextCount = clickCount + 1
    setClickCount(nextCount)
    setScore((s) => s + 50)
    setActiveStage((prev) => (prev + 1) % stages.length)

    if (nextCount % 4 === 0) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0d9488', '#111827', '#2F6F5E', '#ffffff'],
      })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="interactive-progress"
      className="section_progress relative bg-[#edeef2] text-gray-900 overflow-hidden py-24 md:py-32 lg:py-36 border-b-2 border-black/85"
    >
      {/* Background Architectural Grid Lines (matching Hero light grid visual language) */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="border-r border-black/10 h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Upper Meta Bar: Section Number + Stage Progress + Score Indicator */}
        <div className="flex items-center justify-between pb-6 mb-10 md:mb-14 border-b border-black/10">
          <div className="flex items-center space-x-3">
            <div className="tag inline-flex items-center font-mono text-xs uppercase text-gray-900 tracking-wider">
              <span className="text-gray-400 font-mono">[</span>
              <span className="px-1 text-teal-700 font-bold">00010</span>
              <span className="text-gray-400 font-mono">]</span>
            </div>
            <span className="hidden sm:inline-block font-mono text-xs uppercase text-gray-500 tracking-widest">
              // INTERACTIVE PROGRESS LAB
            </span>
          </div>

          {/* Interactive Score & Mode Badges */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 font-mono text-xs px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
              <span className="text-gray-600 uppercase font-medium">STAGE:</span>
              <span className="text-teal-700 font-bold">{stages[activeStage].name}</span>
            </div>
            <div className="font-mono text-xs px-3 py-1 bg-black text-white rounded-sm font-bold shadow-sm">
              SCORE: {score}
            </div>
          </div>
        </div>

        {/* Main Editorial Header: Two-Column Asymmetric Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-reckless font-normal leading-[1.06] text-gray-950 tracking-tight">
              Building Software <br className="hidden sm:inline" />
              Should Feel Like Progress.
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="font-mono text-xs uppercase tracking-wider text-teal-700 font-bold mb-2">
              IDEA → PRODUCT → AUTOMATION → SCALE
            </div>
            <p className="text-sm sm:text-base text-gray-700 font-sans leading-relaxed font-light">
              Interactive execution pod. Click or hover the visual core to cycle product velocity milestones.
            </p>
          </div>
        </div>

        {/* Central Interactive Hero Experience Canvas */}
        <div className="relative bg-[#e4e5eb] border border-black/15 rounded-xl p-8 sm:p-12 md:p-16 overflow-hidden flex flex-col items-center justify-center min-h-[420px] sm:min-h-[500px] md:min-h-[560px] shadow-inner">
          
          {/* Corner Crosshair '+' Marks */}
          <div className="absolute top-4 left-4 font-mono text-xs text-gray-400 select-none">+</div>
          <div className="absolute top-4 right-4 font-mono text-xs text-gray-400 select-none">+</div>
          <div className="absolute bottom-4 left-4 font-mono text-xs text-gray-400 select-none">+</div>
          <div className="absolute bottom-4 right-4 font-mono text-xs text-gray-400 select-none">+</div>

          {/* Background Technical Watermark Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          
          {/* Interactive Floating LAZY Visual Core */}
          <div
            ref={visualRef}
            onClick={handleVisualClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative z-10 cursor-pointer select-none will-change-transform py-4 group"
            title="Click to advance stage"
            style={{ perspective: '1200px' }}
          >
            {/* Ambient Shadow / Glow */}
            <div className="absolute -inset-6 bg-teal-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Oversized LAZY Wordmark with Interactive Physics Response */}
            <div className="flex items-baseline tracking-[-0.04em] font-sans font-black text-[120px] sm:text-[180px] md:text-[250px] lg:text-[320px] xl:text-[360px] leading-[0.76] select-none text-gray-950 transition-colors">
              <span>l</span>
              <span className="text-teal-600 bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700 bg-clip-text text-transparent group-hover:scale-105 inline-block transition-transform duration-300">
                a
              </span>
              <span>z</span>
              <span>y</span>
            </div>

            {/* Micro Interaction Hint Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center space-x-2 px-3 py-1 bg-black text-white font-mono text-[10px] uppercase tracking-widest rounded-full shadow-md border border-gray-700 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <span>CLICK TO ADVANCE // {clickCount} CLICKS</span>
            </div>
          </div>

          {/* Four Interactive Milestone Cards (IDEA → PRODUCT → AUTOMATION → SCALE) */}
          <div className="relative z-10 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14">
            {stages.map((stg, idx) => {
              const isActive = activeStage === idx
              return (
                <div
                  key={stg.name}
                  onClick={() => {
                    setActiveStage(idx)
                    setScore((s) => s + 25)
                  }}
                  className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? 'bg-black text-white border-black shadow-[3px_3px_0px_#0d9488]'
                      : 'bg-white/80 hover:bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-teal-400' : 'text-teal-700'}`}>
                      0{idx + 1} //
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-teal-400' : 'bg-gray-300'}`} />
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold tracking-wider">
                    {stg.name}
                  </div>
                  <div className={`font-sans text-[11px] mt-1 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                    {stg.sub}
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* Section Footer Micro-bar */}
        <div className="mt-8 flex items-center justify-between font-mono text-[11px] text-gray-500 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 bg-teal-600 rounded-full" />
            <span>LAZYDEVELOPER TECHED // INTERACTIVE PROGRESS ENGINE</span>
          </div>
          <div>
            <span>[ 00010 / 00012 ]</span>
          </div>
        </div>

      </div>
    </section>
  )
}
