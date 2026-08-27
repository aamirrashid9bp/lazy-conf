import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TEAM_MEMBERS = [
  {
    name: 'Aamir',
    role: 'Founder & Head of Engineering',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    number: '01',
  },
  {
    name: 'Sahil',
    role: 'Lead Product Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    number: '02',
  },
  {
    name: 'Arjun',
    role: 'Full-Stack Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    number: '03',
  },
  {
    name: 'Priya',
    role: 'Product & Growth Lead',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80',
    number: '04',
  },
]

export default function Team() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // 1. Entrance animation
      gsap.fromTo(
        '.team-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.team-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-list',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 2. Mouse follow interaction on desktop
      if (window.innerWidth > 991) {
        document.querySelectorAll('.team-item').forEach((item) => {
          const imageWrap = item.querySelector('.team-member-image-wrap')
          if (!imageWrap) return

          const handleMouseMove = (e) => {
            const rect = item.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const moveX = (x - 0.5) * 60

            gsap.to(imageWrap, {
              x: moveX,
              duration: 0.5,
              ease: 'power2.out',
            })
          }

          const handleMouseEnter = () => {
            item.style.zIndex = '10'
            gsap.to(imageWrap, {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            })
          }

          const handleMouseLeave = () => {
            item.style.zIndex = '1'
            gsap.to(imageWrap, {
              opacity: 0,
              scale: 0.7,
              duration: 0.25,
              ease: 'power2.out',
            })
          }

          item.addEventListener('mousemove', handleMouseMove)
          item.addEventListener('mouseenter', handleMouseEnter)
          item.addEventListener('mouseleave', handleMouseLeave)
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="team-section"
      className="relative bg-[#060611] text-white py-20 md:py-28 lg:py-36 overflow-hidden border-b border-white/10 select-none"
    >
      {/* Background Grid */}
      <div className="grid-lines dark opacity-30 pointer-events-none">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* Section Header */}
        <div className="team-header flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 md:mb-24 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="mb-4">
              <span className="font-mono text-xs sm:text-[13px] text-[#4E9F76] font-medium tracking-[0.2em] uppercase">
                [ <span data-scramble="">TEAM</span> ]
              </span>
            </div>
            <h2 fd-scroll-heading="" className="font-reckless text-4xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-tight text-white">
              The Team
            </h2>
          </div>
          <div className="max-w-xs text-xs sm:text-sm text-white/50 font-sans font-light">
            A tight-knit crew of engineers and designers who care deeply about building exceptional software.
          </div>
        </div>

        {/* Team Items — 2×2 Grid */}
        <div className="team-list grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="team-item group relative bg-[#090b0a] border border-white/10 hover:border-white/30 p-8 sm:p-10 rounded-[2px] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Floating Image Wrap */}
              <div className="team-member-image-wrap relative aspect-[4/5] w-full max-w-[320px] mx-auto mb-6 rounded-[2px] overflow-hidden border border-white/15 bg-[#12121e] opacity-90 transition-opacity duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Text Information */}
              <div className="flex items-end justify-between pt-4 border-t border-white/10">
                <div>
                  <h3 className="font-mono text-lg sm:text-xl font-bold text-white uppercase tracking-wider group-hover:text-[#38e07b] transition-colors">
                    {member.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/60 font-light mt-1">
                    {member.role}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#38e07b] tracking-widest font-bold">
                  {member.number}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
