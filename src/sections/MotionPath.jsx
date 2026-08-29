import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function MotionPath() {
  const sectionRef = useRef(null)
  const pathRef = useRef(null)
  const circleRef = useRef(null)
  const arrowRef = useRef(null)
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const path = pathRef.current
    const circle = circleRef.current
    const arrow = arrowRef.current
    const text1 = text1Ref.current
    const text2 = text2Ref.current

    if (!section || !path || !circle || !arrow || !text1 || !text2) return

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(text1, { opacity: 0, y: 16 })
      gsap.set(text2, { opacity: 0, y: 16 })
      gsap.set(arrow, { opacity: 0 })
      gsap.set(circle, {
        opacity: 0,
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 0,
        },
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 1.5,
        },
      })

      // 1. Ball travels along path to 45% position
      tl.to(circle, {
        opacity: 1,
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end: 0.45,
        },
        ease: 'power1.inOut',
        duration: 3,
      })

      // 2. Text 1 reveals
      tl.to(
        text1,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '>-0.3'
      )

      // 3. Arrow appears along path
      tl.to(arrow, {
        opacity: 1,
        ease: 'power1.inOut',
        duration: 0.5,
      })

      // 4. Text 2 reveals
      tl.to(
        text2,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '>-0.2'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="motion-path-section"
      className="section-motion-path-wrap relative bg-[#060608] text-white py-24 md:py-36 overflow-hidden select-none border-b border-white/10"
    >
      <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 h-[360px] sm:h-[480px] md:h-[600px] flex items-center justify-center">
        
        {/* Editorial Text 1 (near circle landing point) */}
        <div
          ref={text1Ref}
          className="absolute top-[28%] sm:top-[32%] left-[28%] sm:left-[35%] z-20 pointer-events-none"
        >
          <div className="font-reckless text-2xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
            big ideas <br />
            <span className="italic text-[#1B3D33]">deserve</span>
          </div>
        </div>

        {/* Editorial Text 2 (near arrow landing point) */}
        <div
          ref={text2Ref}
          className="absolute bottom-[24%] sm:bottom-[28%] right-[22%] sm:right-[26%] z-20 pointer-events-none"
        >
          <div className="font-reckless text-2xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
            sharp <br />
            backers
          </div>
        </div>

        {/* SVG Motion Path Canvas */}
        <svg
          viewBox="0 0 1840 1201"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Dashed Curve Path */}
          <path
            ref={pathRef}
            d="M2.5 664.5 C114 795, 298 859, 467 826 C648 790, 791 657, 943 553 C1078 461, 1230 387, 1393 371 C1555 354, 1729 402, 1840 522"
            stroke="#EEEEEE"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeDasharray="9 9"
            opacity="0.3"
          />

          {/* Glowing Animated Circle */}
          <g ref={circleRef}>
            <circle cx="0" cy="0" r="22" fill="#ffffff" />
            <circle cx="0" cy="0" r="32" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          </g>

          {/* Arrow */}
          <path
            ref={arrowRef}
            d="M1069.75 456.005H1110.75L1089.75 490.005"
            stroke="#1B3D33"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

      </div>
    </section>
  )
}
