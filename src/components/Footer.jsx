import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')

  const navLinks = [
    { name: 'Home', href: '/#', isAnchor: true },
    { name: 'Services', href: '/#what-we-do-section', isAnchor: true },
    { name: 'Products', href: '/#our-works-section', isAnchor: true },
    { name: 'Industries', href: '/#about-us-section', isAnchor: true },
    { name: 'Work', href: '/#our-works-section', isAnchor: true },
    { name: 'About', href: '/#about-us-section', isAnchor: true },
    { name: 'Contact', href: '/#contact-section', isAnchor: true },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setEmail('')
    }
  }

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        '.footer-marker',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      )
      tl.fromTo(
        '.footer-nav-item',
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
        '-=0.3'
      )
      tl.fromTo(
        '.footer-contact-block',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      tl.fromTo(
        '.footer-social-block',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
      tl.fromTo(
        '.footer-brand-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative bg-[#000000] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* ============================================================
          VERTICAL ARCHITECTURAL GRID LINES
          Subtle 1px lines extending through the entire footer behind content
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-6 h-full">
          <div className="border-r border-white/[0.05] h-full" />
          <div className="border-r border-white/[0.05] h-full" />
          <div className="border-r border-white/[0.05] h-full" />
          <div className="border-r border-white/[0.05] h-full" />
          <div className="border-r border-white/[0.05] h-full" />
          <div className="h-full" />
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 pt-16 md:pt-20 lg:pt-24 pb-8">
        
        {/* ============================================================
            COLUMN STRUCTURE (6 Grid Columns)
            Col 1: Offset / Margin
            Col 2: Navigation ([ 01 ])
            Col 3: Structural whitespace
            Col 4: Newsletter / Contact ([ 02 ])
            Col 5: Structural whitespace
            Col 6: Social / LinkedIn ([ 03 ])
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-y-12 md:gap-y-0 items-start">
          
          {/* Column 1: Empty Left Rhythm Spacer (Hidden on Mobile) */}
          <div className="hidden md:block col-span-1" />

          {/* Column 2: Navigation [ 01 ] */}
          <div className="col-span-1 md:col-span-1 flex flex-col space-y-6 md:space-y-8 md:pr-4">
            {/* Top Marker */}
            <span className="footer-marker font-mono text-xs md:text-sm text-[#4E9F76] font-medium tracking-wider">
              [ 01 ]
            </span>

            {/* Navigation Links */}
            <ul className="space-y-3.5 sm:space-y-4">
              {navLinks.map((item) => {
                const isActive = activeNav === item.name
                return (
                  <li key={item.name} className="footer-nav-item">
                    <a
                      href={item.href}
                      onClick={() => setActiveNav(item.name)}
                      className={`group inline-flex items-center gap-2.5 text-xl sm:text-2xl md:text-[26px] font-sans font-light tracking-tight transition-all duration-300 ${
                        isActive
                          ? 'text-[#4E9F76] font-normal'
                          : 'text-white/80 hover:text-[#4E9F76] hover:translate-x-1.5'
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4E9F76] shrink-0" />
                      )}
                      <span>{item.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Column 3: Structural Spacing (Hidden on Mobile) */}
          <div className="hidden md:block col-span-1" />

          {/* Column 4: Contact / Newsletter [ 02 ] */}
          <div className="col-span-1 md:col-span-2 footer-contact-block flex flex-col space-y-6 md:space-y-8 md:pr-8">
            {/* Top Marker */}
            <span className="footer-marker font-mono text-xs md:text-sm text-[#4E9F76] font-medium tracking-wider">
              [ 02 ]
            </span>

            {/* Heading */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-light text-white tracking-tight">
                Let&apos;s Build Something Together
              </h3>
              <p className="text-xs sm:text-sm md:text-sm font-sans font-light text-white/60 leading-relaxed max-w-md">
                Have a product idea, business challenge, or automation opportunity?
                Let&apos;s discuss how LazyDeveloper can turn it into a scalable digital product.
              </p>
            </div>

            {/* Email Form with Underline Treatment & Arrow Button */}
            <form onSubmit={handleSubmit} className="relative max-w-md pt-2">
              <div className="relative flex items-center border-b border-white/20 hover:border-white/50 focus-within:border-[#4E9F76] transition-colors pb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full bg-transparent text-sm sm:text-base text-white placeholder-white/40 focus:outline-none pr-10 font-sans font-light"
                />
                <button
                  type="submit"
                  aria-label="Submit Email"
                  className="absolute right-0 text-[#4E9F76] hover:text-[#5ec492] hover:translate-x-1 transition-all duration-200 text-xl font-light focus:outline-none"
                >
                  →
                </button>
              </div>

              {submitted && (
                <div className="text-xs font-mono text-[#4E9F76] mt-2 animate-fade-in">
                  Thank you! We will get in touch soon.
                </div>
              )}
            </form>
          </div>

          {/* Column 6: Social / LinkedIn [ 03 ] */}
          <div className="col-span-1 md:col-span-1 footer-social-block flex flex-col justify-between space-y-6 md:space-y-8 md:items-end">
            {/* Top Marker */}
            <span className="footer-marker font-mono text-xs md:text-sm text-[#4E9F76] font-medium tracking-wider">
              [ 03 ]
            </span>

            {/* LinkedIn Minimalist Icon Box */}
            <div className="pt-2 md:pt-16">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-[4px] border border-white/30 hover:border-[#4E9F76] flex items-center justify-center text-white/80 hover:text-[#4E9F76] hover:bg-[#4E9F76]/10 transition-all duration-300 group"
              >
                <span className="font-sans font-semibold text-xs lowercase">in</span>
              </a>
            </div>
          </div>

        </div>

        {/* ============================================================
            COPYRIGHT & SOCIAL ROW (Above Large Brand Text)
            ============================================================ */}
        <div className="mt-20 md:mt-28 mb-4 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-white/50 border-t border-white/[0.04]">
          <p className="font-light">
            © 2026 All Rights Reserved · Made by LazyDeveloper TechEd Pvt. Ltd.
          </p>
        </div>

        {/* ============================================================
            LARGE BOTTOM BRAND TYPOGRAPHY
            Extremely large editorial brand statement extending across footer
            ============================================================ */}
        <div className="footer-brand-title relative select-none overflow-hidden pt-2 pb-2">
          <h1 className="font-sans font-medium uppercase tracking-tight text-[#4E9F76] text-[11vw] md:text-[11.2vw] leading-none whitespace-nowrap -ml-1">
            LAZYDEVELOPER<span className="text-[5vw] align-super ml-1 font-light">®</span>
          </h1>
        </div>

        {/* ============================================================
            BOTTOM WEBSITE URL
            Left-aligned below brand text matching One Venture reference
            ============================================================ */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
          <a
            href="https://lazy-conf.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] sm:text-xs text-white/40 hover:text-[#4E9F76] transition-colors"
          >
            https://lazy-conf.vercel.app/
          </a>
        </div>

      </div>
    </footer>
  )
}
