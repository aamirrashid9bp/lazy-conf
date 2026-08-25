import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Formula() {
  const sectionRef = useRef(null)
  const [activeState, setActiveState] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const states = [
    { label: 'COMPLEXITY', score: '0', visual: 'cube', color: '#2F6F5E' },
    { label: 'CLARITY', score: '1', visual: 'sphere', color: '#6365FF' },
    { label: 'SYSTEM', score: '01', visual: 'pyramid', color: '#2F6F5E' },
    { label: 'PRODUCT', score: '10', visual: 'torus', color: '#6365FF' },
  ]

  // Cursor interaction for 3D shapes
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMousePos({ x, y })
    }

    section.addEventListener('mousemove', handleMouseMove)
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll-pinned state machine
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const newState = Math.min(
            states.length - 1,
            Math.floor(progress * states.length)
          )
          setActiveState(newState)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const currentState = states[activeState]

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#060611] text-white overflow-hidden min-h-screen"
    >
      {/* Section Number */}
      <span className="section-number text-white/20">00010</span>

      {/* Background Grid */}
      <div className="grid-lines dark">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full h-screen flex flex-col justify-between">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-between h-full py-16 md:py-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1">
            
            {/* Left: Text Content */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <Tag text="lazy" />
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] tracking-tight">
                Building Should Feel Like <span className="text-brand-green italic font-reckless">Fun.</span>
              </h2>
              <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed">
                We abstract away the complexity of digital transformation, replacing disconnected workflows and messy codebases with elegant, functional systems. 
              </p>
              
              {/* Score Display */}
              <div className="pt-6 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">State</span>
                  <span className="font-mono text-3xl font-bold text-brand-green tracking-tighter">
                    {currentState.score}
                  </span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">Phase</span>
                  <span className="font-mono text-sm font-bold text-white/70 uppercase tracking-wider">
                    {currentState.label}
                  </span>
                </div>
              </div>

              {/* State Progress */}
              <div className="flex items-center gap-2 pt-4">
                {states.map((s, idx) => (
                  <div 
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      idx <= activeState ? 'bg-brand-green' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Interactive 3D Visual Container */}
            <div className="lg:col-span-7 relative h-[500px] lg:h-[650px] w-full border border-white/10 bg-[#090914] overflow-hidden rounded-sm cursor-crosshair">
              
              {/* Interactive Label */}
              <div className="absolute top-6 left-6 pointer-events-none z-20">
                <div className="flex items-center space-x-3 text-brand-green/60">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest">Interactive</span>
                </div>
              </div>

              {/* Score in top right */}
              <div className="absolute top-6 right-6 pointer-events-none z-20">
                <span className="font-mono text-6xl md:text-8xl font-black text-white/[0.03] leading-none">
                  {currentState.score}
                </span>
              </div>

              {/* CSS 3D Shapes */}
              <div className="absolute inset-0 flex items-center justify-center shape-3d">
                {/* Cube */}
                <div 
                  className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeState === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{
                    transform: `
                      rotateX(${mousePos.y * -20 + 45}deg) 
                      rotateY(${mousePos.x * 20 + 45}deg)
                      translateX(${mousePos.x * 20}px)
                      translateY(${mousePos.y * 20}px)
                    `,
                    transformStyle: 'preserve-3d',
                    transition: activeState === 0 ? 'none' : 'all 1s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <div className="relative w-32 h-32 md:w-48 md:h-48" style={{ transformStyle: 'preserve-3d' }}>
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="absolute inset-0 border border-brand-green/40 bg-brand-green/5 backdrop-blur-sm"
                        style={{
                          transform: [
                            'translateZ(64px)', 'translateZ(-64px) rotateY(180deg)',
                            'translateX(-64px) rotateY(-90deg)', 'translateX(64px) rotateY(90deg)',
                            'translateY(-64px) rotateX(90deg)', 'translateY(64px) rotateX(-90deg)'
                          ][i].replace(/64/g, window.innerWidth < 768 ? '64' : '96')
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sphere (approximated with CSS) */}
                <div 
                  className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeState === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{
                    transform: `translateX(${mousePos.x * 30}px) translateY(${mousePos.y * 30}px)`,
                  }}
                >
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-[#6365FF]/40 bg-gradient-to-br from-[#6365FF]/10 via-transparent to-[#6365FF]/5 shadow-[inset_0_0_80px_rgba(99,101,255,0.1),0_0_60px_rgba(99,101,255,0.08)]"
                    style={{ transform: `rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg)` }}
                  >
                    {/* Inner rings */}
                    <div className="absolute inset-4 rounded-full border border-[#6365FF]/20" />
                    <div className="absolute inset-8 rounded-full border border-[#6365FF]/10" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
                  </div>
                </div>

                {/* Pyramid (CSS triangle) */}
                <div 
                  className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeState === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{
                    transform: `translateX(${mousePos.x * 25}px) translateY(${mousePos.y * 25}px) rotateY(${mousePos.x * 20}deg) rotateX(${mousePos.y * -10}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative w-0 h-0 
                    border-l-[80px] md:border-l-[120px] border-l-transparent 
                    border-r-[80px] md:border-r-[120px] border-r-transparent 
                    border-b-[140px] md:border-b-[200px] border-b-brand-green/20
                    drop-shadow-[0_0_40px_rgba(47,111,94,0.15)]"
                  >
                    <div className="absolute top-[40px] md:top-[60px] left-[-40px] md:left-[-60px] w-[80px] md:w-[120px] h-[80px] md:h-[120px] border border-brand-green/30 rotate-45 bg-brand-green/5" />
                  </div>
                </div>

                {/* Torus / Ring */}
                <div 
                  className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeState === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{
                    transform: `translateX(${mousePos.x * 30}px) translateY(${mousePos.y * 30}px) rotateX(${60 + mousePos.y * 15}deg) rotateZ(${mousePos.x * 10}deg)`,
                  }}
                >
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[12px] md:border-[16px] border-[#6365FF]/30 bg-transparent shadow-[inset_0_0_30px_rgba(99,101,255,0.1),0_0_40px_rgba(99,101,255,0.08)]">
                    <div className="w-full h-full rounded-full border-2 border-[#6365FF]/10" />
                  </div>
                </div>

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-brand-green/30"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${15 + (i % 3) * 25}%`,
                      transform: `translateX(${mousePos.x * (10 + i * 5)}px) translateY(${mousePos.y * (10 + i * 5)}px)`,
                      transition: 'transform 0.3s ease-out',
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-wider">
                  {currentState.label}
                </span>
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-wider">
                  Move cursor to interact
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
