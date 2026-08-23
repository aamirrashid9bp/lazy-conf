import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function MotionPath() {
  const sectionRef = useRef(null)
  const pathRef = useRef(null)
  const circleRef = useRef(null)
  const arrowRef = useRef(null)
  const circleTextRef = useRef(null)
  const arrowTextRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const path = pathRef.current
    const circle = circleRef.current
    const arrow = arrowRef.current
    const circleText = circleTextRef.current
    const arrowText = arrowTextRef.current

    if (!section || !path || !circle || !arrow || !circleText || !arrowText) return

    // Set initial states
    gsap.set(circleText, { opacity: 0, y: 12 })
    gsap.set(arrowText, { opacity: 0, y: 12 })
    gsap.set(arrow, { opacity: 0 })

    const CIRCLE_START = 0
    const CIRCLE_END = 0.45

    gsap.set(circle, {
      opacity: 0,
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
        start: CIRCLE_START,
      },
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    // 1. Move circle along path to resting point
    tl.to(circle, {
      opacity: 1,
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start: CIRCLE_START,
        end: CIRCLE_END,
      },
      ease: 'power1.inOut',
      duration: 4,
    })

    // 2. Reveal circle text
    tl.to(
      circleText,
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      },
      '>-0.3'
    )

    // 3. Move arrow further along path
    tl.to(arrow, {
      opacity: 1,
      ease: 'power1.inOut',
      duration: 1,
    })

    // 4. Reveal arrow text
    tl.to(
      arrowText,
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      },
      '>-0.3'
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="section-motion-path-wrap py-24 bg-grey-1 relative border-b border-white/5 h-[80vh] flex items-center justify-center">
      <div className="section_motion-path absolute inset-0 w-full h-full">
        <div className="motion-path-container w-full h-full max-w-[1280px] mx-auto px-6 relative">
          
          {/* Floating Texts */}
          <div ref={circleTextRef} className="motion-path-text circle absolute left-[30%] top-[45%] text-left text-white max-w-xs pointer-events-none">
            <h4 className="text-3xl font-reckless italic font-bold">real workflows</h4>
            <p className="text-white/60 text-sm font-mono">deserve</p>
          </div>

          <div ref={arrowTextRef} className="motion-path-text arrow absolute left-[65%] top-[25%] text-left text-white max-w-xs pointer-events-none">
            <h4 className="text-3xl font-reckless font-bold text-brand-green">intelligent</h4>
            <p className="text-white/60 text-sm font-mono">software</p>
          </div>

          {/* SVG Canvas for Motion Path */}
          <div className="motion-path-svg-wrap absolute inset-0 w-full h-full z-0 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1840 1201" 
              fill="none" 
              className="w-full h-full object-contain"
              preserveAspectRatio="xMidYMid meet" 
              aria-hidden="true" 
              role="img"
            >
              <g clipPath="url(#clip0_5455_169)">
                {/* Dash Line Path */}
                <path 
                  ref={pathRef}
                  d="M2.50256 664.568C114.081 795.48 298.543 859.726 467.297 826.456C648.408 790.753 791.657 657.985 943.992 553.682C1078.72 461.441 1230.58 387.624 1393.03 371.212C1555.47 354.8 1729.7 402.461 1840.8 522.111" 
                  stroke="#EEEEEE" 
                  strokeOpacity="0.2"
                  strokeMiterlimit="10" 
                  strokeDasharray="9 9"
                />
                
                {/* Animating Circle */}
                <g ref={circleRef} className="motion-path-circle" filter="url(#filter0_dddddd_5455_169)">
                  <circle cx="797.54" cy="652.793" r="23.0473" transform="rotate(15.2123 797.54 652.793)" fill="white"/>
                </g>
                
                {/* Animating Arrow */}
                <path 
                  ref={arrowRef}
                  className="motion-path-arrow" 
                  d="M1069.75 456.005H1110.75L1089.75 490.005" 
                  stroke="#2F6F5E" 
                  strokeWidth="3"
                />
              </g>
              <defs>
                <filter id="filter0_dddddd_5455_169" x="572.886" y="428.14" width="449.306" height="449.306" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="2.4"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5455_169"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="4.8"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="effect1_dropShadow_5455_169" result="effect2_dropShadow_5455_169"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="16.8"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="effect2_dropShadow_5455_169" result="effect3_dropShadow_5455_169"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="33.6"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="effect3_dropShadow_5455_169" result="effect4_dropShadow_5455_169"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="57.6"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="effect4_dropShadow_5455_169" result="effect5_dropShadow_5455_169"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="100.8"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="effect5_dropShadow_5455_169" result="effect6_dropShadow_5455_169"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_5455_169" result="shape"/>
                </filter>
                <clipPath id="clip0_5455_169">
                  <rect width="1840" height="1201" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>

        </div>
      </div>
    </section>
  )
}
