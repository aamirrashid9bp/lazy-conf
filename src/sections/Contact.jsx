import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '../components/Tag.jsx'
import { submitLead } from '../services/leadService.js'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    budget: '',
    message: '',
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        budget: formData.budget,
        message: formData.message,
        service: 'On-Page Contact Form',
      }
      const res = await submitLead(payload, {
        formName: 'On-Page Contact Section Form',
        ctaClicked: 'Contact Section Submit',
      })
      if (res.success) {
        setIsSubmitted(true)
      }
    } catch (err) {
      console.error('[Contact] Error submitting lead:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="contact-section"
      className="relative bg-[#F5F3EE] text-black py-20 md:py-32 overflow-hidden border-t border-black/[0.08]"
    >
      <div id="contact" className="absolute -top-24 pointer-events-none" />
      {/* Section Number */}
      <span className="section-number text-black/30 font-mono tracking-widest">[ CONTACT ]</span>

      {/* Background Subtle Architectural Grid */}
      <div className="grid-lines light opacity-40">
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
        <div className="grid-line" /><div className="grid-line" /><div className="grid-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Text & Info */}
          <div className="flex flex-col contact-reveal">
            <Tag text="lazy" theme="light" />
            <h2 className="mt-8 text-5xl sm:text-6xl md:text-7xl font-reckless font-normal tracking-tight leading-[1.05] text-black">
              Let's build <br />
              <span className="italic text-[#2F6F5E]">something real.</span>
            </h2>
            <p className="mt-6 text-lg text-black/70 font-sans font-light leading-relaxed max-w-md">
              Whether you're starting from scratch or scaling an existing system, we'd love to hear about your technical challenges.
            </p>

            <div className="mt-16 space-y-10">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-[#2F6F5E] font-bold uppercase tracking-widest mb-2">Email</span>
                <a href="mailto:hello@lazydeveloper.com" className="text-2xl font-reckless text-black hover:text-[#2F6F5E] transition-colors">
                  hello@lazydeveloper.com
                </a>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-[#2F6F5E] font-bold uppercase tracking-widest mb-2">Location</span>
                <span className="text-lg font-sans font-light text-black/70">
                  Global Engineering<br />
                  Remote-First
                </span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-reveal">
            {isSubmitted ? (
              <div className="bg-[#EBE7DF]/70 border border-black/10 p-8 md:p-12 text-center rounded-[2px] shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#2F6F5E]/15 text-[#2F6F5E] flex items-center justify-center mx-auto mb-4">
                  ✓
                </div>
                <h3 className="font-reckless text-2xl text-black mb-2">PROJECT INQUIRY RECEIVED</h3>
                <p className="font-sans text-sm text-black/70 mb-6">
                  Thank you. Our engineering leads will review your inquiry and follow up within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ firstName: '', lastName: '', email: '', budget: '', message: '' })
                  }}
                  className="font-mono text-xs font-bold text-[#2F6F5E] uppercase tracking-wider underline hover:text-black cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#EBE7DF]/50 border border-black/10 p-8 md:p-12 space-y-8 rounded-[2px] shadow-sm">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-black mb-8 pb-4 border-b border-black/10">
                  Project Inquiry
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="font-mono text-[10px] text-black/60 uppercase tracking-widest">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Jane"
                      className="w-full bg-transparent border-b border-black/20 pb-2 focus:border-[#2F6F5E] focus:outline-none transition-colors font-sans text-lg text-black placeholder:text-black/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="font-mono text-[10px] text-black/60 uppercase tracking-widest">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      className="w-full bg-transparent border-b border-black/20 pb-2 focus:border-[#2F6F5E] focus:outline-none transition-colors font-sans text-lg text-black placeholder:text-black/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-[10px] text-black/60 uppercase tracking-widest">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full bg-transparent border-b border-black/20 pb-2 focus:border-[#2F6F5E] focus:outline-none transition-colors font-sans text-lg text-black placeholder:text-black/30"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="font-mono text-[10px] text-black/60 uppercase tracking-widest">Estimated Budget</label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-transparent border-b border-black/20 pb-2 focus:border-[#2F6F5E] focus:outline-none transition-colors font-sans text-lg text-black cursor-pointer appearance-none rounded-none"
                  >
                    <option value="" className="bg-[#F5F3EE] text-black">Select a range...</option>
                    <option value="10k-25k" className="bg-[#F5F3EE] text-black">$10k - $25k</option>
                    <option value="25k-50k" className="bg-[#F5F3EE] text-black">$25k - $50k</option>
                    <option value="50k-100k" className="bg-[#F5F3EE] text-black">$50k - $100k</option>
                    <option value="100k+" className="bg-[#F5F3EE] text-black">$100k+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-mono text-[10px] text-black/60 uppercase tracking-widest">Project Details *</label>
                  <textarea
                    id="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-black/20 pb-2 focus:border-[#2F6F5E] focus:outline-none transition-colors font-sans text-lg text-black resize-none placeholder:text-black/30"
                    placeholder="Tell us about what you want to build..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full px-8 py-5 bg-[#1B3D33] hover:bg-[#255245] text-white font-mono text-sm font-bold uppercase tracking-widest flex items-center justify-center space-x-3 overflow-hidden border border-[#1B3D33] mt-8 cursor-pointer disabled:opacity-50 transition-colors duration-200"
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </span>
                  <span className="relative z-10 text-lg leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
