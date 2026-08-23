import React, { useState, useEffect, useRef } from 'react'

export default function MovableHeroObject({ heroRef }) {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)

  // Physics animation state refs
  const posRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    rotX: 0,
    rotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    impulseX: 0,
    impulseY: 0,
  })

  const reqIdRef = useRef(null)

  useEffect(() => {
    const heroEl = heroRef?.current || document.querySelector('.section_hero')
    if (!heroEl) return

    const handleMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalized offset (-1 to 1)
      const nx = (e.clientX - centerX) / (rect.width / 2)
      const ny = (e.clientY - centerY) / (rect.height / 2)

      // Move toward cursor with bounded range (stay within bounds)
      posRef.current.targetX = Math.max(-65, Math.min(65, nx * 60))
      posRef.current.targetY = Math.max(-45, Math.min(45, ny * 40))

      // 3D perspective rotation
      posRef.current.targetRotY = Math.max(-18, Math.min(18, nx * 20))
      posRef.current.targetRotX = Math.max(-18, Math.min(18, -ny * 20))
      setIsInteracting(true)
    }

    const handleMouseLeave = () => {
      // Smooth return to resting state
      posRef.current.targetX = 0
      posRef.current.targetY = 0
      posRef.current.targetRotX = 0
      posRef.current.targetRotY = 0
      setIsInteracting(false)
    }

    heroEl.addEventListener('mousemove', handleMouseMove)
    heroEl.addEventListener('mouseleave', handleMouseLeave)

    // Animation Loop with Lerp, Inertia & Idle Floating
    let startTime = Date.now()

    const updatePhysics = () => {
      const p = posRef.current
      const time = (Date.now() - startTime) * 0.002

      // Decay click impulse with inertia
      p.impulseX *= 0.92
      p.impulseY *= 0.92

      // Idle floating sine wave when resting
      const idleY = !isInteracting ? Math.sin(time) * 6 : 0
      const idleRotZ = !isInteracting ? Math.sin(time * 0.7) * 2 : 0

      // Smooth lerp (linear interpolation)
      p.currentX += ((p.targetX + p.impulseX) - p.currentX) * 0.08
      p.currentY += ((p.targetY + p.impulseY + idleY) - p.currentY) * 0.08
      p.rotX += (p.targetRotX - p.rotX) * 0.1
      p.rotY += (p.targetRotY - p.rotY) * 0.1

      if (containerRef.current) {
        containerRef.current.style.transform = `
          translate3d(${p.currentX.toFixed(2)}px, ${p.currentY.toFixed(2)}px, 0px)
          rotateX(${p.rotX.toFixed(2)}deg)
          rotateY(${p.rotY.toFixed(2)}deg)
          rotateZ(${idleRotZ.toFixed(2)}deg)
        `
      }

      reqIdRef.current = requestAnimationFrame(updatePhysics)
    }

    reqIdRef.current = requestAnimationFrame(updatePhysics)

    return () => {
      heroEl.removeEventListener('mousemove', handleMouseMove)
      heroEl.removeEventListener('mouseleave', handleMouseLeave)
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current)
    }
  }, [heroRef, isInteracting])

  // Click to Move / Impulse interaction
  const handleClick = (e) => {
    e.stopPropagation()
    const p = posRef.current

    // Apply random direction impulse within bounds
    const angle = Math.random() * Math.PI * 2
    const force = 45
    p.impulseX = Math.cos(angle) * force
    p.impulseY = Math.sin(angle) * force
    p.rotY += (Math.random() - 0.5) * 30

    setClickCount((prev) => prev + 1)
  }

  // Display characters matching the 0 / 1 motif
  const motifs = ['1', '0', '01', 'LD']
  const currentMotif = motifs[clickCount % motifs.length]

  return (
    <div
      className="relative select-none pointer-events-auto cursor-pointer group"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Click to move"
    >
      <div
        ref={containerRef}
        className="relative transition-shadow duration-300 will-change-transform"
      >
        {/* Outer Glow Halo */}
        <div className="absolute -inset-2 bg-gradient-to-r from-brand-green/20 via-brand-blue/20 to-brand-green/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Tactile 3D Capsule */}
        <div className="relative flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-grey-2/90 border border-white/15 backdrop-blur-xl shadow-2xl group-hover:border-brand-green/60 transition-colors">
          
          {/* Animated 0/1 Number Motif Box */}
          <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center relative overflow-hidden shadow-inner group-hover:border-brand-green/40">
            <span className="font-reckless text-2xl font-bold text-brand-green tracking-tighter drop-shadow-[0_0_8px_rgba(47,111,94,0.4)]">
              {currentMotif}
            </span>
            {/* Scanline reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          </div>

          {/* Interactive Status & Instruction Label */}
          <div className="flex flex-col text-left pr-1">
            <div className="flex items-center space-x-1.5 font-mono text-[9px] text-white/50 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
              <span>Interactive</span>
            </div>
            <div className="font-mono text-[11px] font-bold text-white tracking-wider uppercase group-hover:text-brand-green transition-colors flex items-center space-x-1">
              <span>CLICK TO MOVE</span>
              <span className="text-brand-green text-xs font-mono">→</span>
            </div>
          </div>

          {/* Corner Technical Marks */}
          <div className="absolute top-1 right-1.5 font-mono text-[8px] text-white/20 pointer-events-none">+</div>
          <div className="absolute bottom-1 left-1.5 font-mono text-[8px] text-white/20 pointer-events-none">+</div>
        </div>
      </div>
    </div>
  )
}
