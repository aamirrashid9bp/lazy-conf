import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
      setEmail('')
    }
  }

  return (
    <footer hide-navbar="" className="footer bg-grey-1 relative border-t border-white/5 overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="footer-bg absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
        <img
          loading="lazy"
          src="https://cdn.prod.website-files.com/69b907b02d86192615841a3a/69b909014757d91ed9a74192_footer_lines.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Pre-Footer Large CTA Block */}
      <div className="padding-global max-w-[1280px] mx-auto px-6 py-24 relative z-10 border-b border-white/5">
        <div className="bg-gradient-to-br from-grey-2 to-grey-1 border border-brand-green/30 rounded-3xl p-10 sm:p-16 text-center flex flex-col items-center justify-center space-y-8 shadow-2xl relative overflow-hidden">
          
          <span className="font-mono text-xs text-brand-green uppercase tracking-widest px-4 py-1.5 bg-brand-green/10 rounded-full border border-brand-green/20">
            [ Start Your Project ]
          </span>

          <h2 fd-scroll-heading="" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-reckless font-bold text-white max-w-3xl leading-tight">
            Have a Product in Mind? <br />
            <span className="text-brand-green">Let's Build It.</span>
          </h2>

          <p split-para="" className="text-base sm:text-lg text-white/70 max-w-2xl font-body leading-relaxed">
            Whether you're starting with an idea, replacing manual processes or building your next AI-powered product, let's figure out what technology your business actually needs.
          </p>

          <div child-fade-in="" className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="https://calendar.app.google/mCygswQWvcXfkyLk9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-mono text-xs uppercase tracking-wider bg-brand-green text-black hover:bg-brand-green/90 font-bold transition-all shadow-xl hover:scale-105"
            >
              Start Your Project
            </a>
            <a
              href="#what-we-do-section"
              className="px-8 py-4 rounded-full font-mono text-xs uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 border border-white/10 font-medium transition-all"
            >
              Talk to an Expert
            </a>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="padding-global max-w-[1280px] mx-auto px-6 py-20 relative z-10">
        
        {/* Footer Top Header Numbers */}
        <div className="footer-nums-wrap flex items-center justify-between pb-8 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-sm text-brand-green font-bold">[0]</span>
            <span className="font-mono text-sm text-white/40 font-bold">[1]</span>
            <span className="font-mono text-sm text-white/40 font-bold">[N]</span>
          </div>
          <div className="font-mono text-xs text-white/40 uppercase tracking-widest">
            LazyDeveloper TechEd Pvt. Ltd.
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Logo />
            <p className="text-sm text-white/60 font-body leading-relaxed max-w-sm">
              We Build Software That Moves Businesses Forward. Custom software products, cloud engineering, business automation and AI solutions.
            </p>
            
            {/* Newsletter form */}
            <div className="space-y-3 pt-2">
              <div className="font-mono text-xs text-white/40 uppercase">Stay in touch</div>
              <form onSubmit={handleSubmit} className="flex max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your work email..."
                  required
                  className="bg-grey-2 border border-white/10 rounded-l-full px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-brand-green flex-1 font-mono"
                />
                <button
                  type="submit"
                  className="bg-brand-green text-black px-5 rounded-r-full font-mono text-xs uppercase font-bold hover:bg-brand-green/85 transition-colors"
                >
                  Join
                </button>
              </form>
              {submitted && (
                <div className="text-xs font-mono text-brand-green">
                  Thank you! Your submission has been received.
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-brand-green uppercase tracking-wider font-bold">Services</div>
            <ul className="space-y-2 text-xs font-mono text-white/70">
              <li><a href="/#what-we-do-section" className="hover:text-brand-green transition-colors">Mobile App Dev</a></li>
              <li><a href="/#what-we-do-section" className="hover:text-brand-green transition-colors">Web Development</a></li>
              <li><a href="/#what-we-do-section" className="hover:text-brand-green transition-colors">SaaS & PaaS</a></li>
              <li><a href="/#what-we-do-section" className="hover:text-brand-green transition-colors">Custom CRM & ERP</a></li>
              <li><a href="/#what-we-do-section" className="hover:text-brand-green transition-colors">AI Product Dev</a></li>
              <li><a href="/#what-we-do-section" className="hover:text-brand-green transition-colors">Business Automation</a></li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-brand-green uppercase tracking-wider font-bold">Products</div>
            <ul className="space-y-2 text-xs font-mono text-white/70">
              <li><Link to="/project/convertleads" className="hover:text-brand-green transition-colors">ConvertLeads</Link></li>
              <li><Link to="/project/rtmnu-system" className="hover:text-brand-green transition-colors">RTMNU System</Link></li>
              <li><Link to="/project/echaii" className="hover:text-brand-green transition-colors">Echaii</Link></li>
              <li><Link to="/project/innovexa-space" className="hover:text-brand-green transition-colors">Innovexa Space</Link></li>
              <li><Link to="/project/business-automation-ai" className="hover:text-brand-green transition-colors">Enterprise AI Pods</Link></li>
            </ul>
          </div>

          {/* Col 4: Industries */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-brand-green uppercase tracking-wider font-bold">Industries</div>
            <ul className="space-y-2 text-xs font-mono text-white/70">
              <li><a href="/#about-us-section" className="hover:text-brand-green transition-colors">Education & LMS</a></li>
              <li><a href="/#about-us-section" className="hover:text-brand-green transition-colors">Healthcare Systems</a></li>
              <li><a href="/#about-us-section" className="hover:text-brand-green transition-colors">Real Estate & PropTech</a></li>
              <li><a href="/#about-us-section" className="hover:text-brand-green transition-colors">Fitness & Booking</a></li>
              <li><a href="/#about-us-section" className="hover:text-brand-green transition-colors">Logistics & Supply</a></li>
              <li><a href="/#about-us-section" className="hover:text-brand-green transition-colors">Retail & E-commerce</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Social */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © <span className="copyright-year">{currentYear}</span> LazyDeveloper TechEd Pvt. Ltd. All Rights Reserved. • Partner with us: <a href="mailto:hello@lazydeveloper.in" className="text-white hover:underline">hello@lazydeveloper.in</a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-brand-green transition-colors"
              aria-label="LazyDeveloper LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-brand-green transition-colors"
              aria-label="LazyDeveloper GitHub"
            >
              GitHub
            </a>
          </div>
        </div>

      </div>

      {/* Infinite Footer Marquee Banner */}
      <div className="footer_marquee_wrap border-t border-white/5 py-4 overflow-hidden whitespace-nowrap bg-black/40">
        <div className="footer_marquee flex space-x-8 animate-marquee">
          <div className="footer_marquee_text font-mono text-sm tracking-widest text-white/30 uppercase">
            LAZYDEVELOPER TECHED PVT. LTD.® — WE BUILD SOFTWARE THAT MOVES BUSINESSES FORWARD — 
          </div>
          <div className="footer_marquee_text font-mono text-sm tracking-widest text-white/30 uppercase">
            LAZYDEVELOPER TECHED PVT. LTD.® — WE BUILD SOFTWARE THAT MOVES BUSINESSES FORWARD — 
          </div>
        </div>
      </div>
    </footer>
  )
}
