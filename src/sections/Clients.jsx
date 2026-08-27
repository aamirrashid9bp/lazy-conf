import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CLIENT_LOGOS = [
  { name: 'twendi', type: 'twendi' },
  { name: 'PreDiXome bio', type: 'predixome' },
  { name: 'circular.eco', type: 'circular' },
  { name: 'ithaca hummus', type: 'ithaca' },
  { name: 'agri*trak', type: 'agritrak' },
  { name: 'Unify', type: 'unify' },
  { name: 'Endgame Advisory', type: 'endgame' },
  { name: 'HRA', type: 'hra' },
  { name: 'XROWE', type: 'xrowe' },
  { name: 'Karmaveer Amrutulya', type: 'karmaveer' },
  { name: 'OLTIQ', type: 'oltiq' },
  { name: 'Jaiho Universal', type: 'jaiho' },
  { name: 'SwitchNext Solutions', type: 'switchnext' },
  { name: 'echaii', type: 'echaii' },
]

function ClientLogoRenderer({ client }) {
  switch (client.type) {
    case 'twendi':
      return (
        <span className="font-sans font-black text-xl sm:text-2xl tracking-tighter text-white/80 group-hover:text-white transition-colors select-none">
          tw<span className="tracking-normal text-white/50 group-hover:text-white/80">=</span>ndi
        </span>
      )
    case 'predixome':
      return (
        <div className="flex items-center gap-2 select-none">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/75 group-hover:text-white transition-colors">
            <path d="M4 4l16 16M20 4L4 20" />
            <path d="M12 2v20M2 12h20" strokeWidth="1" strokeDasharray="2 2" className="opacity-40" />
          </svg>
          <div className="flex flex-col text-left leading-none">
            <span className="font-sans font-bold text-sm sm:text-base tracking-tight text-white/80 group-hover:text-white transition-colors">PreDiXome</span>
            <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">bio</span>
          </div>
        </div>
      )
    case 'circular':
      return (
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/30 text-white/80 group-hover:text-white group-hover:border-white/60 transition-all select-none">
          <span className="font-sans font-medium text-xs sm:text-sm tracking-wide">
            circular<span className="text-white/40 group-hover:text-white/70">.eco</span>
          </span>
        </div>
      )
    case 'ithaca':
      return (
        <div className="flex flex-col items-center leading-none select-none">
          <span className="font-reckless font-bold text-lg sm:text-xl tracking-tight text-white/80 group-hover:text-white transition-colors">
            ithaca
          </span>
          <span className="font-sans text-[10px] text-white/40 tracking-widest uppercase mt-0.5">
            hummus
          </span>
        </div>
      )
    case 'agritrak':
      return (
        <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-white/80 group-hover:text-white transition-colors select-none">
          agri<span className="text-[#38e07b] group-hover:text-emerald-400 transition-colors">✱</span>trak
        </span>
      )
    case 'unify':
      return (
        <div className="flex items-center gap-2.5 select-none">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-white transition-colors">
            <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5v3a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-3C4.8 8.8 4 7.5 4 6a4 4 0 0 1 4-4c1.5 0 2.8.8 3.5 2h1c.7-1.2 2-2 3.5-2z" />
            <circle cx="12" cy="18" r="2" />
          </svg>
          <span className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-white/90 group-hover:text-white transition-colors">
            Unify
          </span>
        </div>
      )
    case 'endgame':
      return (
        <div className="flex items-center gap-2.5 select-none">
          <div className="flex flex-col gap-1.5 justify-center">
            <div className="w-5 h-[2px] bg-white/80 group-hover:bg-white transition-colors" />
            <div className="w-4 h-[2px] bg-white/60 group-hover:bg-white transition-colors" />
            <div className="w-5 h-[2px] bg-white/80 group-hover:bg-white transition-colors" />
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="font-sans font-semibold text-base sm:text-lg text-white/85 group-hover:text-white transition-colors">Endgame</span>
            <span className="font-sans font-light text-xs text-white/40 tracking-wider">Advisory</span>
          </div>
        </div>
      )
    case 'hra':
      return (
        <div className="relative inline-block select-none">
          <span className="font-sans font-black text-2xl sm:text-3xl tracking-[0.18em] text-white/90 group-hover:text-white transition-colors">
            HRA
          </span>
          <svg className="absolute -bottom-1 left-0 w-full h-2 text-white/40 group-hover:text-white/80 transition-colors" viewBox="0 0 100 12" fill="none">
            <path d="M0 10 Q50 0 100 10" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )
    case 'xrowe':
      return (
        <span className="font-mono font-bold text-sm sm:text-base tracking-[0.2em] text-white/75 group-hover:text-white transition-colors select-none">
          XROWE
        </span>
      )
    case 'karmaveer':
      return (
        <div className="flex flex-col items-center text-center leading-none select-none">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60 group-hover:text-white transition-colors mb-1">
            <path d="M12 3c-1.5 3-4 6-7 7 3 1 5.5 3.5 7 7 1.5-3.5 4-6 7-7-3-1-5.5-4-7-7z" />
          </svg>
          <span className="font-sans font-bold text-[10px] tracking-wider text-white/80 group-hover:text-white uppercase">KARMAVEER</span>
          <span className="font-sans text-[8px] text-white/40 tracking-widest uppercase mt-0.5">AMRUTULYA</span>
        </div>
      )
    case 'oltiq':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-white/70 group-hover:border-white flex items-center justify-center relative">
            <div className="w-1 h-1 bg-white/70 rounded-full" />
          </div>
          <span className="font-sans font-bold text-xs sm:text-sm tracking-wider text-white/80 group-hover:text-white transition-colors">
            OLTIQ
          </span>
        </div>
      )
    case 'jaiho':
      return (
        <div className="flex flex-col items-center text-center leading-none select-none">
          <svg width="18" height="14" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60 group-hover:text-white transition-colors mb-1">
            <path d="M2 14 A10 10 0 0 1 22 14 Z" />
            <line x1="12" y1="2" x2="12" y2="7" />
            <line x1="5" y1="5" x2="8" y2="8" />
            <line x1="19" y1="5" x2="16" y2="8" />
          </svg>
          <span className="font-sans font-bold text-[11px] tracking-wider text-white/80 group-hover:text-white uppercase">JAIHO</span>
          <span className="font-mono text-[7px] text-white/40 tracking-widest uppercase mt-0.5">UNIVERSAL</span>
        </div>
      )
    case 'switchnext':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 group-hover:text-white transition-colors shrink-0">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <path d="M10 7h4v10h-4" strokeWidth="1.5" />
          </svg>
          <div className="flex flex-col text-left leading-none">
            <span className="font-sans font-bold text-[10px] tracking-tight text-white/80 group-hover:text-white uppercase">SWITCHNEXT</span>
            <span className="font-sans text-[7px] text-white/40 tracking-wider uppercase mt-0.5">SOLUTIONS</span>
          </div>
        </div>
      )
    case 'echaii':
    default:
      return (
        <div className="flex flex-col items-center text-center leading-none select-none">
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 group-hover:text-white transition-colors">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
            </svg>
            <span className="font-sans font-bold text-xs sm:text-sm tracking-tight text-white/85 group-hover:text-white">echaii</span>
          </div>
          <span className="font-sans text-[7px] text-white/40 tracking-wider mt-0.5">Your Chai. Your Way.</span>
        </div>
      )
  }
}

/* Split logos into 2 balanced rows: 7 + 7 */
const ROW_1 = CLIENT_LOGOS.slice(0, 7)
const ROW_2 = CLIENT_LOGOS.slice(7, 14)

export default function Clients() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cl-number',
        { opacity: 0, y: -15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.cl-heading',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.cl-embedded-img',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="clients-section"
      className="relative bg-black text-white overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-36 lg:pb-32"
    >
      {/* Background Subtle Grid Lines */}
      <div className="grid-lines dark pointer-events-none opacity-40">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">
        
        {/* 1. SECTION NUMBER */}
        <div className="cl-number flex justify-center mb-6 sm:mb-8">
          <span className="font-mono text-xs sm:text-[13px] text-[#33443C] tracking-[0.25em] font-bold uppercase select-none">
            [ <span data-scramble="">CLIENTS</span> ]
          </span>
        </div>

        {/* 2. EDITORIAL HEADING WITH EMBEDDED IMAGE */}
        <div className="cl-heading text-center max-w-5xl mx-auto mb-16 sm:mb-20 md:mb-24">
          <h2 className="font-reckless font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] leading-[1.12] text-white tracking-tight">
            <span>Clients</span>
            
            {/* Embedded Gaze Visual */}
            <span className="cl-embedded-img inline-flex items-center align-middle mx-2.5 sm:mx-3.5 md:mx-5 w-[80px] h-[34px] sm:w-[108px] sm:h-[46px] md:w-[136px] md:h-[58px] lg:w-[160px] lg:h-[66px] rounded sm:rounded-md overflow-hidden border border-white/20 shadow-2xl bg-black transition-transform duration-500 hover:scale-105">
              <img
                src="/clients_heading_gaze.jpg"
                alt="Execution focus"
                className="w-full h-full object-cover object-center grayscale contrast-125 select-none"
                loading="eager"
                draggable={false}
              />
            </span>

            <span>Who</span>
            <br className="hidden sm:block" />
            <span className="inline sm:block sm:mt-1">Chose Execution</span>
          </h2>
        </div>

        {/* 3. TWO-ROW MARQUEE CLIENT LOGOS */}
        <div className="w-full overflow-hidden">

          {/* ROW 1 → moves right */}
          <div className="clients-marquee-row group/row">
            <div className="clients-marquee-track clients-marquee-right">
              {[...ROW_1, ...ROW_1].map((client, idx) => (
                <div key={idx} className="shrink-0 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-14 py-4 group">
                  <ClientLogoRenderer client={client} />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/10 my-2" />

          {/* ROW 2 → moves left */}
          <div className="clients-marquee-row group/row">
            <div className="clients-marquee-track clients-marquee-left">
              {[...ROW_2, ...ROW_2].map((client, idx) => (
                <div key={idx} className="shrink-0 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-14 py-4 group">
                  <ClientLogoRenderer client={client} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Green Accent Line */}
        <div className="w-full h-[1px] bg-[#33443C]/50 mt-6 sm:mt-8" />

      </div>
    </section>
  )
}
