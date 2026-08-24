import React, { useState } from 'react'
import Tag from '../components/Tag.jsx'

export default function Contact() {
  const [formState, setFormState] = useState('idle') // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormState('submitting')
    // Simulate network request
    setTimeout(() => setFormState('success'), 1500)
  }

  return (
    <section id="contact-section" className="relative bg-[#060611] text-white py-16 md:py-24 lg:py-28 border-b border-white/10">
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Tag text="lazy" />
              <h2 className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-reckless font-normal leading-[1.05] tracking-tight mb-8">
                Let's <span className="text-brand-green italic font-reckless">Talk.</span>
              </h2>
              <p className="text-lg text-white/60 font-sans font-light leading-relaxed max-w-sm">
                Whether you have a product idea, need to scale your existing system, or want to explore AI automation, our team is ready to help.
              </p>
            </div>
            
            <div className="mt-16 lg:mt-32 space-y-12 font-mono text-sm uppercase tracking-wider text-white/60">
              <div>
                <p className="text-brand-green text-[10px] mb-3">Email</p>
                <a href="mailto:hello@lazydeveloper.com" className="hover:text-white transition-colors text-lg">hello@lazydeveloper.com</a>
              </div>
              <div>
                <p className="text-brand-green text-[10px] mb-3">Social</p>
                <div className="flex gap-8">
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 relative">
            {formState === 'success' ? (
              <div className="h-full min-h-[500px] flex flex-col justify-center border border-white/10 p-12 bg-[#090914] text-center">
                <span className="text-5xl text-brand-green mb-8">✓</span>
                <h3 className="text-4xl font-reckless font-normal text-white mb-4">Message Received</h3>
                <p className="text-white/60 font-light text-lg">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12 pt-4">
                <div className="space-y-4 relative group">
                  <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest text-white/40 block transition-colors group-focus-within:text-brand-green">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-xl sm:text-2xl text-white font-light focus:outline-none focus:border-brand-green transition-colors rounded-none" 
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-4 relative group">
                  <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-white/40 block transition-colors group-focus-within:text-brand-green">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-xl sm:text-2xl text-white font-light focus:outline-none focus:border-brand-green transition-colors rounded-none" 
                    placeholder="john@company.com"
                  />
                </div>
                <div className="space-y-4 relative group">
                  <label htmlFor="project" className="font-mono text-[10px] uppercase tracking-widest text-white/40 block transition-colors group-focus-within:text-brand-green">Tell us about your project</label>
                  <textarea 
                    id="project" 
                    rows="3" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-xl sm:text-2xl text-white font-light focus:outline-none focus:border-brand-green transition-colors resize-none rounded-none" 
                    placeholder="I need to build..."
                  />
                </div>
                <div className="pt-8">
                  <button 
                    type="submit" 
                    disabled={formState === 'submitting'}
                    className="w-full py-6 bg-white text-black font-mono text-sm font-bold uppercase tracking-widest hover:bg-brand-green transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? 'SENDING...' : 'SEND INQUIRY'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
