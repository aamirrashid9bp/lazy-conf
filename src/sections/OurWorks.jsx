import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller, Autoplay } from 'swiper/modules'
import 'swiper/css'
import Tag from '../components/Tag.jsx'
import { Link } from 'react-router-dom'

export default function OurWorks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [progress, setProgress] = useState(0)
  const progressIntervalRef = useRef(null)

  const products = [
    {
      id: 'convertleads',
      num: '01',
      title: 'ConvertLeads',
      category: 'Lead Management · CRM · Sales Automation',
      desc: 'A practical lead management and sales operations platform designed to help businesses capture, organize, follow up and convert leads more efficiently.',
      link: '/project/convertleads',
      tags: ['Sales Operations', 'CRM Architecture', 'Automated Workflows'],
      image: 'https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69dcc77374d57ad0836fd7ca_agritrak%20img-12.avif'
    },
    {
      id: 'rtmnu-system',
      num: '02',
      title: 'RTMNU System',
      category: 'Education · University Management · Digital Operations',
      desc: 'A digital education management ecosystem designed around academic workflows, student operations and institutional processes.',
      link: '/project/rtmnu-system',
      tags: ['University ERP', 'Academic Portals', 'Examination Systems'],
      image: 'https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69dcdb635ee4b2a7f6def34b_circular%20eco%20thumbnail.avif'
    },
    {
      id: 'echaii',
      num: '03',
      title: 'Echaii',
      category: 'Office Tea · Delivery · Operations · CRM',
      desc: 'A digital office-tea service ecosystem connecting employees, offices, supply operations, demand management, inventory and delivery workflows.',
      link: '/project/echaii',
      tags: ['On-Demand Logistics', 'Supply Operations', 'Inventory Tracking'],
      image: 'https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69dcd82214943751a716881c_ithaca%20hummus%20thumbnail.avif'
    },
    {
      id: 'innovexa-space',
      num: '04',
      title: 'Innovexa Space',
      category: 'Coworking · Managed Office · Community Operations',
      desc: 'A digital ecosystem for coworking and managed-office operations connecting workspace management, members, bookings, facilities and business operations.',
      link: '/project/innovexa-space',
      tags: ['Workspace Management', 'Member Portal', 'Booking Engine'],
      image: 'https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69dcc54c44e5df02d800440a_engame%20img-14.avif'
    },
    {
      id: 'business-automation-ai',
      num: '05',
      title: 'Enterprise AI & Automation Pods',
      category: 'AI Agents · Intelligent Automation · Custom Workflows',
      desc: 'Intelligent AI assistants, document processing engines, and custom automation workflows built for enterprise operations.',
      link: '/project/business-automation-ai',
      tags: ['AI Agents', 'LLM Workflows', 'Process Orchestration'],
      image: 'https://cdn.prod.website-files.com/69b904dc5a76c96c398c84f3/69dccce34f56ecd8a925c6ef_Travellier%20img.avif'
    }
  ]

  // Slide duration progress timer
  const SLIDE_DURATION = 6000
  useEffect(() => {
    setProgress(0)
    const startTime = Date.now()

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
      setProgress(pct)

      if (pct >= 100) {
        clearInterval(progressIntervalRef.current)
        if (swiperInstance) {
          swiperInstance.slideNext()
        }
      }
    }, 50)

    return () => clearInterval(progressIntervalRef.current)
  }, [activeIndex, swiperInstance])

  return (
    <section id="our-work-section" className="section_our-work py-28 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="padding-global max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col space-y-4">
            <div className="brand-color-purple">
              <Tag text="00100" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-reckless font-bold text-white leading-tight">
              Featured Products & Case Studies
            </h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous product"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next product"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              →
            </button>
          </div>
        </div>

        {/* Dual Stack Layout: Left Info Slider & Right Stacked Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Product Info Slider */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <Swiper
              modules={[Controller, Autoplay]}
              onSwiper={setSwiperInstance}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
              slidesPerView={1}
              loop={true}
              speed={700}
              className="w-full"
            >
              {products.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="space-y-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm text-brand-green font-bold">
                        [{item.num} / 0{products.length}]
                      </span>
                      <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-reckless font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="text-base sm:text-lg text-white/70 font-body leading-relaxed max-w-xl">
                      {item.desc}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map((t, i) => (
                        <span key={i} className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/80">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6">
                      <Link
                        to={item.link}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider bg-brand-green text-white hover:bg-brand-green/85 font-semibold transition-all shadow-md"
                      >
                        <span>Explore Product Architecture</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Bottom Progress Line */}
            <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full mt-6">
              <div
                className="absolute top-0 bottom-0 left-0 bg-brand-green transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Right: Stacked Image Previews */}
          <div className="lg:col-span-6 relative aspect-[16/11] rounded-2xl overflow-hidden bg-grey-2 border border-white/10 shadow-2xl">
            {products.map((item, idx) => {
              const isActive = idx === activeIndex
              return (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ease-out transform ${
                    isActive
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-95 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-grey-1 via-transparent to-transparent opacity-60" />
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
