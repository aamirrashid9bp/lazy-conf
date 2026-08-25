import { useEffect, useRef } from 'react'

/**
 * Cursor physics hook for interactive elements.
 * Provides smooth lerp-based following with inertia, bounded movement, and idle breathing.
 * 
 * @param {Object} options
 * @param {React.RefObject} options.containerRef - Ref to the element that gets transformed
 * @param {React.RefObject} options.boundsRef - Ref to the element that defines the interaction area
 * @param {Object} options.config - Physics configuration
 * @param {number} options.config.maxX - Max horizontal movement (default: 38)
 * @param {number} options.config.maxY - Max vertical movement (default: 20)
 * @param {number} options.config.maxRotX - Max X rotation degrees (default: 8)
 * @param {number} options.config.maxRotY - Max Y rotation degrees (default: 8)
 * @param {number} options.config.maxRotZ - Max Z rotation degrees (default: 3)
 * @param {number} options.config.lerp - Interpolation factor (default: 0.06)
 * @param {number} options.config.idleAmplitude - Idle breathing amplitude (default: 3)
 * @param {boolean} options.config.enableIdle - Enable idle breathing (default: true)
 */
export default function useCursorPhysics({
  containerRef,
  boundsRef,
  config = {}
}) {
  const {
    maxX = 38,
    maxY = 20,
    maxRotX = 8,
    maxRotY = 8,
    maxRotZ = 3,
    lerp = 0.06,
    idleAmplitude = 3,
    enableIdle = true
  } = config

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
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    const boundsEl = boundsRef?.current
    if (!boundsEl) return

    const handleMouseMove = (e) => {
      const rect = boundsEl.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const nx = (e.clientX - centerX) / (rect.width / 2)
      const ny = (e.clientY - centerY) / (rect.height / 2)

      const p = physicsRef.current
      p.targetX = Math.max(-maxX, Math.min(maxX, nx * (maxX - 2)))
      p.targetY = Math.max(-maxY, Math.min(maxY, ny * (maxY - 2)))
      p.targetRotY = Math.max(-maxRotY, Math.min(maxRotY, nx * (maxRotY - 1)))
      p.targetRotX = Math.max(-maxRotX, Math.min(maxRotX, -ny * (maxRotX - 1)))
      p.targetRotZ = Math.max(-maxRotZ, Math.min(maxRotZ, nx * (maxRotZ - 1)))
      p.isInteracting = true
    }

    const handleMouseLeave = () => {
      const p = physicsRef.current
      p.targetX = 0
      p.targetY = 0
      p.targetRotX = 0
      p.targetRotY = 0
      p.targetRotZ = 0
      p.isInteracting = false
    }

    boundsEl.addEventListener('mousemove', handleMouseMove)
    boundsEl.addEventListener('mouseleave', handleMouseLeave)

    let startTime = Date.now()

    const animate = () => {
      const p = physicsRef.current
      const time = (Date.now() - startTime) * 0.002

      // Decay impulse
      p.impulseX *= 0.90
      p.impulseY *= 0.90

      // Idle breathing
      const idleY = (!p.isInteracting && enableIdle) ? Math.sin(time) * idleAmplitude : 0
      const idleRotZ = (!p.isInteracting && enableIdle) ? Math.sin(time * 0.7) * 1 : 0

      // Lerp interpolation
      p.currentX += ((p.targetX + p.impulseX) - p.currentX) * lerp
      p.currentY += ((p.targetY + p.impulseY + idleY) - p.currentY) * lerp
      p.rotX += (p.targetRotX - p.rotX) * (lerp + 0.01)
      p.rotY += (p.targetRotY - p.rotY) * (lerp + 0.01)
      p.rotZ += ((p.targetRotZ + idleRotZ) - p.rotZ) * (lerp + 0.01)

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
      boundsEl.removeEventListener('mousemove', handleMouseMove)
      boundsEl.removeEventListener('mouseleave', handleMouseLeave)
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current)
    }
  }, [boundsRef, containerRef, maxX, maxY, maxRotX, maxRotY, maxRotZ, lerp, idleAmplitude, enableIdle])

  // Expose impulse trigger for click-to-move
  const applyImpulse = (force = 28) => {
    const p = physicsRef.current
    const angle = Math.random() * Math.PI * 2
    p.impulseX = Math.cos(angle) * force
    p.impulseY = Math.sin(angle) * force
    p.targetRotY += (Math.random() - 0.5) * 12
  }

  return { physicsRef, applyImpulse }
}
