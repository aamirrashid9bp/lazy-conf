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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    // If currently on a subpage (e.g. /project/:id), navigate to home first
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
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#edeef2] transition-all duration-300">
      {/* Primary Navbar Row with Architectural Grid Borders */}
      <div className="w-full border-b-2 border-black/85">
        <div className="w-full max-w-[1440px] mx-auto flex items-stretch justify-between">
          
          {/* LEFT: Logo Section with Vertical Right Border */}
          <div className="w-[230px] sm:w-[260px] px-6 py-3.5 border-r border-black/15 flex items-center justify-start shrink-0">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, 'top')}
              className="inline-block focus:outline-none cursor-pointer"
            >
              <Logo />
            </a>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-8 px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-wider text-gray-800">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.sectionId}`}
                onClick={(e) => handleNavClick(e, link.sectionId)}
                className="hover:text-teal-600 transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* RIGHT: CTA Button Section with Vertical Left Border */}
          <div className="w-[230px] sm:w-[260px] px-6 py-3.5 border-l border-black/15 hidden sm:flex items-center justify-end shrink-0">
            <a
              href="https://calendar.app.google/mCygswQWvcXfkyLk9"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-5 py-2.5 bg-black text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm flex items-center space-x-2 border border-black shadow-[3px_3px_0px_#0d9488] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#0d9488] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>BUILD YOUR PRODUCT</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden px-6 py-3.5 flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:text-teal-600 focus:outline-none border border-black/20 rounded-sm"
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

      {/* Thin Secondary Horizontal Divider Line under Navbar */}
      <div className="w-full border-b border-black/10 h-0" />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#edeef2] border-b-2 border-black/80 px-6 py-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.sectionId}`}
              onClick={(e) => handleNavClick(e, link.sectionId)}
              className="block text-sm font-mono font-bold uppercase tracking-wider text-gray-900 hover:text-teal-600 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-black/10">
            <a
              href="https://calendar.app.google/mCygswQWvcXfkyLk9"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider bg-black text-white shadow-[3px_3px_0px_#0d9488]"
            >
              BUILD YOUR PRODUCT
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
