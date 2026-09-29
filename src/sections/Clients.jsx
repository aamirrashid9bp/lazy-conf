import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CLIENT_LOGOS = [
  { name: 'Echaii', type: 'echaii' },
  { name: 'Karmveer Amruttulya', type: 'karmveer' },
  { name: 'DeckSpace', type: 'deckspace' },
  { name: 'The Distinguished Society', type: 'distinguished' },
  { name: 'Oltiq', type: 'oltiq' },
  { name: 'XroneTech', type: 'xronetech' },
  { name: 'Jaiho Universal', type: 'jaiho-universal' },
  { name: 'Jaiho Abhiyaan', type: 'jaiho-abhiyaan' },
  { name: 'SwitchNext Solution', type: 'switchnext' },
  { name: 'Innovexa Space', type: 'innovexa' },
  { name: 'ConvertLeads', type: 'convertleads' },
]

function ClientLogoRenderer({ client }) {
  switch (client.type) {
    case 'echaii':
      return (
        <div className="flex flex-col items-center text-center leading-none select-none">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 group-hover:text-white transition-colors">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
            </svg>
            <span className="font-sans font-bold text-sm sm:text-base md:text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
              Echaii
            </span>
          </div>
          <span className="font-sans text-[7.5px] sm:text-[8px] text-white/40 tracking-wider mt-0.5">Your Chai. Your Way.</span>
        </div>
      )
    case 'karmveer':
      return (
        <div className="flex flex-col items-center text-center leading-none select-none whitespace-nowrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60 group-hover:text-white transition-colors mb-1">
            <path d="M12 3c-1.5 3-4 6-7 7 3 1 5.5 3.5 7 7 1.5-3.5 4-6 7-7-3-1-5.5-4-7-7z" />
          </svg>
          <span className="font-sans font-bold text-xs sm:text-sm md:text-base tracking-wider text-white/90 group-hover:text-white uppercase">
            Karmveer
          </span>
          <span className="font-sans text-[8px] sm:text-[9px] text-white/40 tracking-[0.2em] uppercase mt-0.5">
            Amruttulya
          </span>
        </div>
      )
    case 'deckspace':
      return (
        <div className="flex items-center gap-2 select-none whitespace-nowrap">
          <div className="flex flex-col gap-0.5">
            <div className="w-3.5 h-[2.5px] bg-[#1B3D33] group-hover:bg-emerald-400 transition-colors rounded-xs" />
            <div className="w-5 h-[2.5px] bg-white/80 group-hover:bg-white transition-colors rounded-xs" />
            <div className="w-3.5 h-[2.5px] bg-white/50 group-hover:bg-white/80 transition-colors rounded-xs" />
          </div>
          <span className="font-sans font-bold text-sm sm:text-base md:text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
            Deck<span className="font-light text-white/70 group-hover:text-white">Space</span>
          </span>
        </div>
      )
    case 'distinguished':
      return (
        <div className="flex flex-col items-center text-center leading-none select-none whitespace-nowrap">
          <span className="font-mono text-[7.5px] sm:text-[8.5px] text-white/40 tracking-[0.25em] uppercase mb-0.5">
            THE
          </span>
          <span className="font-reckless font-bold text-sm sm:text-base md:text-lg tracking-wide text-white/90 group-hover:text-white transition-colors">
            Distinguished Society
          </span>
        </div>
      )
    case 'oltiq':
      return (
        <div className="flex items-center gap-2 select-none whitespace-nowrap">
          <div className="w-4 h-4 rounded-full border-2 border-white/70 group-hover:border-white flex items-center justify-center relative">
            <div className="w-1.5 h-1.5 bg-[#1B3D33] group-hover:bg-emerald-400 rounded-full transition-colors" />
          </div>
          <span className="font-sans font-black text-sm sm:text-base md:text-lg tracking-[0.12em] text-white/90 group-hover:text-white transition-colors uppercase">
            Oltiq
          </span>
        </div>
      )
    case 'xronetech':
      return (
        <div className="flex items-center gap-1.5 select-none whitespace-nowrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 group-hover:text-white transition-colors">
            <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />
          </svg>
          <div className="flex items-baseline">
            <span className="font-mono font-bold text-sm sm:text-base md:text-lg tracking-wider text-white/90 group-hover:text-white uppercase">
              Xrone
            </span>
            <span className="font-mono text-xs sm:text-sm text-[#1B3D33] group-hover:text-emerald-400 font-semibold uppercase ml-0.5">
              Tech
            </span>
          </div>
        </div>
      )
    case 'jaiho-universal':
      return (
        <div className="flex flex-col items-center text-center leading-none select-none whitespace-nowrap">
          <svg width="20" height="13" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60 group-hover:text-white transition-colors mb-1">
            <path d="M2 14 A10 10 0 0 1 22 14 Z" />
            <line x1="12" y1="2" x2="12" y2="7" />
            <line x1="5" y1="5" x2="8" y2="8" />
            <line x1="19" y1="5" x2="16" y2="8" />
          </svg>
          <span className="font-sans font-bold text-xs sm:text-sm md:text-base tracking-wider text-white/90 group-hover:text-white uppercase">
            Jaiho
          </span>
          <span className="font-mono text-[7.5px] sm:text-[8px] text-white/40 tracking-[0.2em] uppercase mt-0.5">
            Universal
          </span>
        </div>
      )
    case 'jaiho-abhiyaan':
      return (
        <div className="flex flex-col items-center text-center leading-none select-none whitespace-nowrap">
          <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-white/60 group-hover:text-white transition-colors mb-1">
            <path d="M12 2L2 16h20L12 2z" strokeLinejoin="round" />
            <circle cx="12" cy="11" r="2" fill="currentColor" className="text-[#1B3D33]" />
          </svg>
          <span className="font-sans font-bold text-xs sm:text-sm md:text-base tracking-wider text-white/90 group-hover:text-white uppercase">
            Jaiho
          </span>
          <span className="font-sans text-[7.5px] sm:text-[8px] text-white/40 tracking-[0.2em] uppercase mt-0.5">
            Abhiyaan
          </span>
        </div>
      )
    case 'switchnext':
      return (
        <div className="flex items-center gap-2 select-none whitespace-nowrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 group-hover:text-white transition-colors shrink-0">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <path d="M10 7h4v10h-4" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
          <div className="flex flex-col text-left leading-none">
            <span className="font-sans font-bold text-xs sm:text-sm md:text-base tracking-tight text-white/90 group-hover:text-white uppercase">
              SwitchNext
            </span>
            <span className="font-sans text-[7.5px] sm:text-[8px] text-white/40 tracking-wider uppercase mt-0.5">
              Solution
            </span>
          </div>
        </div>
      )
    case 'innovexa':
      return (
        <div className="flex items-center gap-2 select-none whitespace-nowrap">
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div className="w-3.5 h-3.5 border border-white/60 group-hover:border-white rotate-45 transition-colors" />
            <div className="w-1.5 h-1.5 bg-[#1B3D33] group-hover:bg-emerald-400 absolute rounded-full" />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="font-sans font-bold text-xs sm:text-sm md:text-base tracking-tight text-white/90 group-hover:text-white">
              Innovexa
            </span>
            <span className="font-mono text-[7.5px] sm:text-[8px] text-white/40 tracking-[0.18em] uppercase mt-0.5">
              Space
            </span>
          </div>
        </div>
      )
    case 'convertleads':
    default:
      return (
        <div className="flex items-center gap-2 select-none whitespace-nowrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white transition-colors">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          <span className="font-sans font-bold text-sm sm:text-base md:text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
            Convert<span className="text-[#1B3D33] group-hover:text-emerald-400 transition-colors">Leads</span>
          </span>
        </div>
      )
  }
}

/* Split logos into 2 rows: 6 in Row 1, 5 in Row 2 */
const ROW_1 = CLIENT_LOGOS.slice(0, 6)
const ROW_2 = CLIENT_LOGOS.slice(6, 11)

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
          <span className="font-mono text-xs sm:text-[13px] text-[#1B3D33] tracking-[0.25em] font-bold uppercase select-none">
            [ <span data-scramble="">CLIENTS</span> ]
          </span>
        </div>

        {/* 2. EDITORIAL HEADING WITH EMBEDDED IMAGE & EXACT CONTENT */}
        <div className="cl-heading text-center max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24">
          <h2 className="font-reckless font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] leading-[1.12] text-white tracking-tight">
            <span>Businesses</span>
            
            {/* Embedded Gaze Visual */}
            <span className="cl-embedded-img inline-flex items-center align-middle mx-1.5 sm:mx-3.5 md:mx-5 w-[60px] h-[26px] sm:w-[108px] sm:h-[46px] md:w-[136px] md:h-[58px] lg:w-[160px] lg:h-[66px] rounded sm:rounded-md overflow-hidden border border-white/20 shadow-2xl bg-black transition-transform duration-500 hover:scale-105">
              <img
                src="/clients_heading_gaze.jpg"
                alt="Execution focus"
                className="w-full h-full object-cover object-center grayscale contrast-125 select-none"
                loading="eager"
                draggable={false}
              />
            </span>

            <span>That</span>
            <br className="hidden sm:block" />
            <span className="inline sm:block sm:mt-1">Trust Our Execution</span>
          </h2>

          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto space-y-4">
            <p className="font-sans text-sm sm:text-base md:text-lg text-white/70 font-light leading-relaxed">
              We partner with startups, growing businesses, and established organizations to build scalable digital products, including websites, mobile applications, SaaS platforms, AI solutions, CRM systems, and business automation software.
            </p>
            <p className="font-sans text-xs sm:text-sm text-white/50 font-medium tracking-wide">
              Trusted across technology, education, real estate, hospitality, finance, and other industries.
            </p>
          </div>
        </div>

        {/* 3. TWO-ROW MARQUEE CLIENT LOGOS */}
        <div className="w-full overflow-hidden">

          {/* ROW 1 → moves right */}
          <div className="clients-marquee-row group/row">
            <div className="clients-marquee-track clients-marquee-right">
              {[...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1].map((client, idx) => (
                <div
                  key={idx}
                  className="clients-marquee-item shrink-0 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-14 py-4 group cursor-pointer"
                >
                  <ClientLogoRenderer client={client} />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/10 my-2" />

          {/* ROW 2 → moves left */}
          <div className="clients-marquee-row group/row">
            <div className="clients-marquee-track clients-marquee-left">
              {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((client, idx) => (
                <div
                  key={idx}
                  className="clients-marquee-item shrink-0 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-14 py-4 group cursor-pointer"
                >
                  <ClientLogoRenderer client={client} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
