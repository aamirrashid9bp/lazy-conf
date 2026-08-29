import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import { useLeadModal } from '../context/LeadModalContext.jsx'

export default function Navbar() {
  const { openLeadModal } = useLeadModal()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('HOME')
  const location = useLocation()
  const navigate = useNavigate()

  // Lock active state during click-triggered smooth scrolls
  const isNavigatingRef = useRef(false)
  const navLockTimeoutRef = useRef(null)

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

  const navLinks = [
    { label: 'HOME', sectionId: 'top' },
    { label: 'ABOUT', sectionId: 'about-us-section' },
    { label: 'SERVICES', sectionId: 'what-we-do-section' },
    { label: 'WORK', sectionId: 'our-works-section' },
    { label: 'INDUSTRIES', sectionId: 'why-us-section' },
    { label: 'CONTACT', sectionId: 'contact-section' },
  ]

  // Track active navigation dynamically via Scroll & Route
  useEffect(() => {
    if (location.pathname.startsWith('/project')) {
      setActiveNav('WORK')
      return
    }

    const handleScrollSpy = () => {
      // If user clicked a navigation item, maintain destination active state
      if (isNavigatingRef.current) return

      // 1. If at the top of the page, HOME is active
      if (window.scrollY < 180) {
        setActiveNav('HOME')
        return
      }

      // 2. If near the bottom of the page, CONTACT is active
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 140
      ) {
        setActiveNav('CONTACT')
        return
      }

      // 3. Measure each section in real-time based on actual viewport intersection
      const sectionElements = [
        { label: 'HOME', id: 'top' },
        { label: 'ABOUT', id: 'about-us-section' },
        { label: 'SERVICES', id: 'what-we-do-section' },
        { label: 'WORK', id: 'our-works-section' },
        { label: 'INDUSTRIES', id: 'why-us-section' },
        { label: 'CONTACT', id: 'contact-section' },
      ]

      const triggerZone = 160 // Header offset zone in px

      for (const item of sectionElements) {
        const el = document.getElementById(item.id)
        if (!el) continue

        const rect = el.getBoundingClientRect()
        // If the section covers the trigger reading zone
        if (rect.top <= triggerZone && rect.bottom > triggerZone) {
          setActiveNav(item.label)
          return
        }
      }
    }

    handleScrollSpy()
    window.addEventListener('scroll', handleScrollSpy, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScrollSpy)
      if (navLockTimeoutRef.current) clearTimeout(navLockTimeoutRef.current)
    }
  }, [location.pathname])

  const handleNavClick = (e, link) => {
    e.preventDefault()

    // 1. Immediately switch active state directly to clicked destination
    isNavigatingRef.current = true
    setActiveNav(link.label)
    setIsMobileMenuOpen(false)

    // 2. Lock scroll-spy for the duration of the smooth scroll animation
    if (navLockTimeoutRef.current) clearTimeout(navLockTimeoutRef.current)
    navLockTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false
    }, 1300)

    if (location.pathname !== '/' && location.pathname !== '/index.html') {
      navigate('/')
      setTimeout(() => {
        scrollToTarget(link.sectionId)
      }, 150)
      return
    }

    scrollToTarget(link.sectionId)
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[#F5F3EE] transition-all duration-300 ${
        isScrolled ? 'border-b border-black/10 shadow-sm' : 'border-b border-black/[0.08]'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 h-20 md:h-24 flex items-center justify-between">
        
        {/* LEFT: Logo + Brand Name */}
        <div className="flex items-center">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, { label: 'HOME', sectionId: 'top' })}
            className="focus:outline-none cursor-pointer"
          >
            <Logo />
          </a>
        </div>

        {/* CENTER: Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10 font-mono text-[11px] xl:text-[12px] font-semibold tracking-wider text-black">
          {navLinks.map((link) => {
            const isActive = activeNav === link.label
            return (
              <a
                key={link.label}
                href={`#${link.sectionId}`}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative flex flex-col items-center py-1 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#1B3D33]'
                    : 'text-black/80 hover:text-[#1B3D33]'
                }`}
              >
                <span>{link.label}</span>
                {/* Active circular dot directly underneath HOME */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B3D33] absolute -bottom-2" />
                )}
              </a>
            )
          })}
        </div>

        {/* RIGHT: BUILD PRODUCT CTA */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact-section"
            onClick={(e) => handleNavClick(e, { label: 'CONTACT', sectionId: 'contact-section' })}
            className="bg-[#1B3D33] hover:bg-[#1B3D33]/90 text-white font-mono text-[11px] font-semibold tracking-wider uppercase px-5 py-2.5 rounded-[2px] flex items-center gap-2 transition-colors duration-200 shadow-sm cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B3D33]" />
            <span>BUILD YOUR PRODUCT →</span>
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-black hover:text-[#1B3D33] focus:outline-none transition-colors"
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

      {/* Mobile Dropdown Drawer */}
      <div
        className={`lg:hidden bg-[#F5F3EE] border-b border-black/10 px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[500px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
      >
        <div className="space-y-4">
          {navLinks.map((link) => {
            const isActive = activeNav === link.label
            return (
              <a
                key={link.label}
                href={`#${link.sectionId}`}
                onClick={(e) => handleNavClick(e, link)}
                className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive ? 'text-[#1B3D33]' : 'text-gray-900 hover:text-[#1B3D33]'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#1B3D33]" />}
                <span>{link.label}</span>
              </a>
            )
          })}
          <div className="pt-4 border-t border-black/10">
            <a
              href="#contact-section"
              onClick={(e) => {
                setIsMobileMenuOpen(false)
                handleNavClick(e, { label: 'CONTACT', sectionId: 'contact-section' })
              }}
              className="flex items-center justify-center gap-2 w-full text-center px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-[#1B3D33] text-white hover:bg-[#1B3D33]/90 rounded-[2px] transition-colors cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B3D33]" />
              <span>BUILD YOUR PRODUCT →</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
