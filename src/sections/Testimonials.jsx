import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import Tag from '../components/Tag.jsx'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  
  const testimonials = [
    {
      quote: "LazyDeveloper transformed our manual workflows into a unified digital system. Their understanding of business operations is what sets them apart from typical agencies.",
      author: "Demo Author",
      company: "Manufacturing SME",
      image: "/testim_author1_1787556894486.jpg"
    },
    {
      quote: "They didn't just build an app; they engineered a scalable platform that handles our growing user base without breaking a sweat. True product partners.",
      author: "Demo Founder",
      company: "SaaS Startup",
      image: "/testim_author2_1787556839166.jpg"
    },
    {
      quote: "The speed at which they execute is incredible. What would have taken months was deployed in weeks, with exceptional code quality and architecture.",
      author: "Demo VP Engineering",
      company: "Enterprise Technology",
      image: "/testim_author3_1787556851212.jpg"
    }
  ]

  const swiperRef = useRef(null)

  // Reveal on scroll
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap
      const ctx = gsap.context(() => {
        gsap.fromTo('.test-reveal', 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }, containerRef)
      return () => ctx.revert()
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      id="testimonials-section"
      className="section_testimonials relative bg-[#060611] text-white py-16 md:py-24 lg:py-28 border-b border-white/10 overflow-hidden"
    >
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Heading & Custom Navigation */}
          <div className="lg:col-span-5 flex flex-col space-y-6 test-reveal">
            <Tag text="lazy" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] tracking-tight">
              What Our <span className="text-brand-green italic font-reckless">Clients Say.</span>
            </h2>
            <p className="text-base sm:text-lg text-white/50 font-sans font-light leading-relaxed max-w-sm">
              We focus on long-term partnerships and measurable business outcomes, not just delivering code.
            </p>
            
            {/* Custom Navigation */}
            <div className="flex items-center gap-4 pt-8">
              <button 
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-14 h-14 flex items-center justify-center border border-white/20 hover:border-brand-green hover:bg-brand-green/5 text-white/50 hover:text-brand-green transition-all duration-300 group"
                aria-label="Previous Testimonial"
              >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={() => swiperRef.current?.slideNext()}
                className="w-14 h-14 flex items-center justify-center border border-white/20 hover:border-brand-green hover:bg-brand-green/5 text-white/50 hover:text-brand-green transition-all duration-300 group"
                aria-label="Next Testimonial"
              >
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Right: Massive Typographic Carousel */}
          <div className="lg:col-span-7 pt-12 lg:pt-0 test-reveal">
            <Swiper
              modules={[Navigation, Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              spaceBetween={0}
              slidesPerView={1}
              speed={1000}
              autoplay={{
                delay: 6000,
                disableOnInteraction: true,
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="w-full h-full"
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col">
                    <svg className="w-12 h-12 text-brand-green mb-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="text-3xl sm:text-4xl md:text-5xl font-reckless font-normal text-white leading-[1.1] tracking-tight mb-12 max-w-3xl">
                      "{t.quote}"
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 shrink-0">
                        <img src={t.image} alt={t.author} className="w-full h-full object-cover filter grayscale contrast-125" />
                      </div>
                      <div className="flex flex-col space-y-1.5 border-l-2 border-brand-green pl-4">
                        <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                          {t.author}
                        </span>
                        <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                          {t.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  )
}
