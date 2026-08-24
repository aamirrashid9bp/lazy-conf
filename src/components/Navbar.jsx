import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (location.pathname !== '/' && location.pathname !== '/index.html') {
      navigate('/')
      setTimeout(() => {
        scrollToTarget(sectionId)
      }, 150)
      return
    }

    scrollToTarget(sectionId)
  }

  const scrollToTarget = (sectionId) => {
    if (!sectionId || sectionId === 'top') {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    const targetEl = document.getElementById(sectionId)
    if (targetEl) {
      if (window.lenis) {
        window.lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 })
      } else {
        const top = targetEl.getBoundingClientRect().top + window.scrollY - 70
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  const navLinks = [
    { label: 'HOME', sectionId: 'top' },
    { label: 'SERVICES', sectionId: 'what-we-do-section' },
    { label: 'PRODUCTS', sectionId: 'interactive-progress' },
    { label: 'INDUSTRIES', sectionId: 'about-us-section' },
    { label: 'WORK', sectionId: 'our-work-section' },
    { label: 'ABOUT', sectionId: 'about-us-section' },
    { label: 'CONTACT', sectionId: 'faq-section' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? 'bg-[#edeef2]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      {/* Primary Navbar Row with Architectural Grid Borders */}
      <div className={`w-full transition-colors duration-500 ${isScrolled ? 'border-b border-black/10' : 'border-b border-black/20'}`}>
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-6 items-stretch">
          
          {/* LEFT: Logo Section (Col 1) */}
          <div className="col-span-1 border-r border-black/10 flex items-center justify-start px-6 py-4 sm:py-5 shrink-0 transition-all duration-500">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, 'top')}
              className="inline-block focus:outline-none cursor-pointer"
            >
              <Logo />
            </a>
          </div>

          {/* CENTER: Navigation Links (Cols 2-5) */}
          <div className="hidden sm:flex col-span-4 items-center justify-center space-x-8 px-6 py-4 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-800">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.sectionId}`}
                onClick={(e) => handleNavClick(e, link.sectionId)}
                className="relative group hover:text-brand-green transition-colors cursor-pointer py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* RIGHT: CTA Button Section (Col 6) */}
          <div className="hidden sm:flex col-span-1 border-l border-black/10 items-center justify-center px-6 py-4 shrink-0 transition-all duration-500">
            <a
              href="https://calendar.app.google/mCygswQWvcXfkyLk9"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-5 py-3 w-full justify-center bg-black text-white font-mono text-[10px] lg:text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border border-black hover:bg-transparent hover:text-black transition-all duration-300 group overflow-hidden"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green group-hover:bg-black transition-colors duration-300" />
              <span className="relative z-10 whitespace-nowrap">BUILD PRODUCT</span>
            </a>
          </div>

          {/* Mobile Hamburger Button (Only on Mobile) */}
          <div className="sm:hidden absolute top-0 right-0 h-full px-6 flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:text-brand-green focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`sm:hidden bg-[#edeef2] border-b border-black/10 px-6 overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 py-6 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
      >
        <div className="space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.sectionId}`}
              onClick={(e) => handleNavClick(e, link.sectionId)}
              className="block text-sm font-mono font-bold uppercase tracking-wider text-gray-900 hover:text-brand-green transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-black/10">
            <a
              href="https://calendar.app.google/mCygswQWvcXfkyLk9"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-transparent hover:text-black border border-black transition-colors"
            >
              BUILD YOUR PRODUCT
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
