import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrambleText({ text, delay = 0.25 }) {
  const elementRef = useRef(null)
  const CHARS = 'ABCDEFGIJKLNOPRTUVXY'
  const FRAMES = 72

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const finalText = text || el.textContent
    const chars = finalText.split('')

    // Set initial scrambled state
    el.textContent = chars.map((c) => (c === ' ' ? ' ' : CHARS[(Math.random() * CHARS.length) | 0])).join('')
    gsap.set(el, { opacity: 0 })

    const scramble = () => {
      let f = 0
      const loop = () => {
        const p = Math.pow(f / FRAMES, 3)
        el.textContent = chars.map((c, i) => (c === ' ' || i < p * chars.length ? c : CHARS[(Math.random() * CHARS.length) | 0])).join('')
        
        if (++f <= FRAMES) {
          requestAnimationFrame(loop)
        } else {
          el.textContent = finalText
        }
      }
      loop()
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        })
        gsap.delayedCall(delay, scramble)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [text, delay])

  return (
    <span ref={elementRef} className="scrambled-txt">
      {text}
    </span>
  )
}
