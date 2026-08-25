import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef(null)

  const testimonials = [
    {
      quote: "LazyDeveloper didn't just build our app, they architected our entire business engine. Their product thinking is what sets them apart from typical agencies.",
      author: "Sarah Chen",
      role: "Founder & CEO, ScaleTech",
      image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      quote: "We needed a complex enterprise ERP delivered in months, not years. The team delivered flawlessly with exceptional code quality and transparency.",
      author: "Marcus Johnson",
      role: "Operations Director, GlobalLogistics",
      image: "https://i.pravatar.cc/150?u=marcus"
    },
    {
      quote: "Their ability to understand our operational bottlenecks and translate them into automated software solutions saved us hundreds of hours a week.",
      author: "Elena Rodriguez",
      role: "COO, Nexus Healthcare",
      image: "https://i.pravatar.cc/150?u=elena"
    },
    {
      quote: "Working with LazyDeveloper felt like having an elite in-house engineering team. They challenged our assumptions and built a significantly better product.",
      author: "David Kim",
      role: "CTO, FinFlow",
      image: "https://i.pravatar.cc/150?u=david"
    }
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )
      
      gsap.fromTo('.testimonial-carousel',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="testimonials-section"
      className="relative bg-white text-black py-20 md:py-32 overflow-hidden border-b border-black/10"
    >
      {/* Section Number */}
      <span className="section-number text-black/30">00111</span>

      {/* Background Grid */}
      <div className="grid-lines light">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col">
        
        {/* Header */}
        <div className="testimonial-header flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-20 gap-6">
          <div>
            <Tag text="lazy" theme="light" />
            <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-reckless font-normal tracking-tight leading-[1.05]">
              Words from <span className="italic text-brand-green">Partners.</span>
            </h2>
          </div>
          
          {/* Custom Navigation */}
          <div className="flex gap-4">
            <button className="testi-prev w-12 h-12 flex items-center justify-center border border-black/20 hover:border-brand-green hover:text-brand-green transition-colors rounded-full">
              ←
            </button>
            <button className="testi-next w-12 h-12 flex items-center justify-center border border-black/20 hover:border-brand-green hover:text-brand-green transition-colors rounded-full">
              →
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="testimonial-carousel">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: '.testi-prev', nextEl: '.testi-next' }}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 1.1, spaceBetween: 60 },
              1024: { slidesPerView: 1.2, spaceBetween: 80 }
            }}
            grabCursor
            className="w-full"
          >
            {testimonials.map((testi, idx) => (
              <SwiperSlide key={idx} className="cursor-grab active:cursor-grabbing">
                <div className="flex flex-col border-l border-black/10 pl-6 md:pl-10 py-4">
                  <div className="mb-8 md:mb-12">
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-reckless font-normal leading-[1.2] tracking-tight text-black">
                      "{testi.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <img 
                      src={testi.image} 
                      alt={testi.author} 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover grayscale border border-black/10"
                    />
                    <div className="flex flex-col">
                      <span className="font-mono text-sm font-bold uppercase tracking-wider text-black">
                        {testi.author}
                      </span>
                      <span className="font-sans text-sm text-gray-500">
                        {testi.role}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  )
}
