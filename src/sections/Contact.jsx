import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-reveal',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="contact-section"
      className="relative bg-white text-black py-20 md:py-32 overflow-hidden"
    >
      {/* Section Number */}
      <span className="section-number text-black/30">01011</span>

      {/* Background Grid */}
      <div className="grid-lines light">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Text & Info */}
          <div className="flex flex-col contact-reveal">
            <Tag text="lazy" theme="light" />
            <h2 className="mt-8 text-5xl sm:text-6xl md:text-7xl font-reckless font-normal tracking-tight leading-[1.05]">
              Let's build <br />
              <span className="italic text-brand-green">something real.</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 font-sans font-light leading-relaxed max-w-md">
              Whether you're starting from scratch or scaling an existing system, we'd love to hear about your technical challenges.
            </p>

            <div className="mt-16 space-y-10">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-brand-green font-bold uppercase tracking-widest mb-2">Email</span>
                <a href="mailto:hello@lazydeveloper.com" className="text-2xl font-reckless hover:text-brand-green transition-colors">
                  hello@lazydeveloper.com
                </a>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-brand-green font-bold uppercase tracking-widest mb-2">Location</span>
                <span className="text-lg font-sans font-light text-gray-600">
                  Global Engineering<br />
                  Remote-First
                </span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-reveal">
            <form className="bg-gray-50 border border-black/10 p-8 md:p-12 space-y-8 rounded-sm">
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-black mb-8 pb-4 border-b border-black/10">
                Project Inquiry
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">First Name *</label>
                  <input type="text" id="firstName" required className="w-full bg-transparent border-b border-black/20 pb-2 focus:border-brand-green focus:outline-none transition-colors font-sans text-lg text-black" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Last Name *</label>
                  <input type="text" id="lastName" required className="w-full bg-transparent border-b border-black/20 pb-2 focus:border-brand-green focus:outline-none transition-colors font-sans text-lg text-black" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Email Address *</label>
                <input type="email" id="email" required className="w-full bg-transparent border-b border-black/20 pb-2 focus:border-brand-green focus:outline-none transition-colors font-sans text-lg text-black" />
              </div>

              <div className="space-y-2">
                <label htmlFor="budget" className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Estimated Budget</label>
                <select id="budget" className="w-full bg-transparent border-b border-black/20 pb-2 focus:border-brand-green focus:outline-none transition-colors font-sans text-lg text-black cursor-pointer appearance-none rounded-none">
                  <option value="">Select a range...</option>
                  <option value="10k-25k">$10k - $25k</option>
                  <option value="25k-50k">$25k - $50k</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k+">$100k+</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Project Details *</label>
                <textarea id="message" required rows="4" className="w-full bg-transparent border-b border-black/20 pb-2 focus:border-brand-green focus:outline-none transition-colors font-sans text-lg text-black resize-none" placeholder="Tell us about what you want to build..."></textarea>
              </div>

              <button type="button" className="group relative w-full px-8 py-5 bg-black text-white font-mono text-sm font-bold uppercase tracking-widest flex items-center justify-center space-x-3 overflow-hidden border border-black mt-8">
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Submit Inquiry</span>
                <span className="relative z-10 text-lg leading-none group-hover:text-black group-hover:translate-x-1 transition-all duration-300">→</span>
                <div className="absolute inset-0 bg-brand-green translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
