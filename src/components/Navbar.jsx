import React, { useState, useEffect } from 'react'
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
    { label: 'SERVICES', sectionId: 'what-we-do-section' },
    { label: 'PRODUCTS', sectionId: 'our-works-section' },
    { label: 'INDUSTRIES', sectionId: 'about-us-section' },
    { label: 'WORK', sectionId: 'our-works-section' },
    { label: 'ABOUT', sectionId: 'about-us-section' },
    { label: 'CONTACT', sectionId: 'contact-section' },
  ]

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setActiveNav(link.label)
    setIsMobileMenuOpen(false)

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
      className={`fixed top-0 left-0 right-0 z-50 bg-[#F2F1ED] transition-all duration-300 ${
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
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 font-mono text-[11px] xl:text-[12px] font-semibold tracking-wider text-black">
          {navLinks.map((link) => {
            const isActive = activeNav === link.label
            return (
              <a
                key={link.label}
                href={`#${link.sectionId}`}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative flex flex-col items-center py-1 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#2F6F5E]'
                    : 'text-black/80 hover:text-[#2F6F5E]'
                }`}
              >
                <span>{link.label}</span>
                {/* Active circular dot directly underneath HOME */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F5E] absolute -bottom-2" />
                )}
              </a>
            )
          })}
        </div>

        {/* RIGHT: BUILD PRODUCT CTA */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => openLeadModal('build-product', { ctaClicked: 'Navbar Build Your Product' })}
            className="bg-[#1B3D33] hover:bg-[#255245] text-white font-mono text-[11px] font-semibold tracking-wider uppercase px-5 py-2.5 rounded-[2px] flex items-center gap-2 transition-colors duration-200 shadow-sm cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#38e07b]" />
            <span>BUILD YOUR PRODUCT →</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-black hover:text-[#2F6F5E] focus:outline-none transition-colors"
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
        className={`lg:hidden bg-[#F2F1ED] border-b border-black/10 px-6 overflow-hidden transition-all duration-300 ease-in-out ${
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
                  isActive ? 'text-[#2F6F5E]' : 'text-gray-900 hover:text-[#2F6F5E]'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F5E]" />}
                <span>{link.label}</span>
              </a>
            )
          })}
          <div className="pt-4 border-t border-black/10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                openLeadModal('build-product', { ctaClicked: 'Mobile Navbar Build Your Product' })
              }}
              className="flex items-center justify-center gap-2 w-full text-center px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-[#1B3D33] text-white hover:bg-[#255245] rounded-[2px] transition-colors cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38e07b]" />
              <span>BUILD YOUR PRODUCT →</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
