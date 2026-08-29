import React, { useEffect, useRef, useState } from 'react'

export default function InteractiveLazyWordmark({ heroRef }) {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Physics animation state refs for fluid mouse following with inertia
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
    // Only enable cursor-following on desktop (mouse-enabled devices)
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    const heroEl = heroRef?.current || document.querySelector('.section_hero')
    if (!heroEl) return

    const handleMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalized coordinates from -1 to 1 across hero
      const nx = (e.clientX - centerX) / (rect.width / 2)
      const ny = (e.clientY - centerY) / (rect.height / 2)

      // Move in the same direction as cursor:
      // Left -> left, Right -> right, Up -> up, Down -> down
      // Bounded smoothly to max ±38px horizontal, ±20px vertical
      physicsRef.current.targetX = Math.max(-38, Math.min(38, nx * 36))
      physicsRef.current.targetY = Math.max(-20, Math.min(20, ny * 18))

      // 3D perspective rotation tilt
      physicsRef.current.targetRotY = Math.max(-8, Math.min(8, nx * 7))
      physicsRef.current.targetRotX = Math.max(-8, Math.min(8, -ny * 7))
      physicsRef.current.targetRotZ = Math.max(-3, Math.min(3, nx * 2))
      physicsRef.current.isInteracting = true
    }

    const handleMouseLeave = () => {
      // Smooth return toward original resting position
      physicsRef.current.targetX = 0
      physicsRef.current.targetY = 0
      physicsRef.current.targetRotX = 0
      physicsRef.current.targetRotY = 0
      physicsRef.current.targetRotZ = 0
      physicsRef.current.isInteracting = false
    }

    heroEl.addEventListener('mousemove', handleMouseMove)
    heroEl.addEventListener('mouseleave', handleMouseLeave)

    // Animation Loop with Lerp & Inertia for smooth delayed movement
    let startTime = Date.now()

    const animate = () => {
      const p = physicsRef.current
      const time = (Date.now() - startTime) * 0.002

      // Elastic decay for click impulse
      p.impulseX *= 0.90
      p.impulseY *= 0.90

      // Subtle resting idle breathing when cursor is inactive
      const idleY = !p.isInteracting ? Math.sin(time) * 3 : 0
      const idleRotZ = !p.isInteracting ? Math.sin(time * 0.7) * 1 : 0

      // Fluid interpolation (Lerp factor 0.06 for delayed, elastic, premium feel)
      p.currentX += ((p.targetX + p.impulseX) - p.currentX) * 0.06
      p.currentY += ((p.targetY + p.impulseY + idleY) - p.currentY) * 0.06
      p.rotX += (p.targetRotX - p.rotX) * 0.07
      p.rotY += (p.targetRotY - p.rotY) * 0.07
      p.rotZ += ((p.targetRotZ + idleRotZ) - p.rotZ) * 0.07

      if (containerRef.current) {
        containerRef.current.style.transform = `
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
      heroEl.removeEventListener('mousemove', handleMouseMove)
      heroEl.removeEventListener('mouseleave', handleMouseLeave)
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current)
    }
  }, [heroRef])

  // Click to Move / Elastic impulse trigger
  const handleClick = (e) => {
    e.stopPropagation()
    const p = physicsRef.current
    const angle = Math.random() * Math.PI * 2
    const force = 28
    p.impulseX = Math.cos(angle) * force
    p.impulseY = Math.sin(angle) * force
    p.targetRotY += (Math.random() - 0.5) * 12
  }

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer will-change-transform inline-block select-none py-1 -mb-4 sm:-mb-6 md:-mb-8"
      title="Click to move"
      style={{ perspective: '1200px' }}
    >
      <div className="flex items-baseline tracking-[-0.04em] font-sans font-black text-[115px] sm:text-[170px] md:text-[230px] lg:text-[300px] xl:text-[350px] leading-[0.76] select-none text-[#1f2421]">
        {/* 'l' letter */}
        <span>l</span>
        
        {/* 'a' letter with rich teal accent */}
        <span className="text-[#1B3D33]">
          a
        </span>
        
        {/* 'z' letter */}
        <span>z</span>
        
        {/* 'y' letter */}
        <span>y</span>
      </div>
    </div>
  )
}
