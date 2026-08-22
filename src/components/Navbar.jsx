import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const isDarkNavbar = isScrolled

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <Link to="/" className="inline-block focus:outline-none">
          <Logo inverted={false} />
        </Link>

        {/* Desktop Navigation pill */}
        <div className={`hidden md:flex items-center space-x-6 px-6 py-2 rounded-full border transition-all duration-300 backdrop-blur-md ${
          isDarkNavbar 
            ? 'bg-white/10 border-white/20 text-white shadow-lg' 
            : 'bg-black/20 border-white/10 text-white/80'
        }`}>
          <a href="/#about-us-section" className="text-xs uppercase font-mono tracking-wider hover:text-brand-green transition-colors">
            About Us
          </a>
          <a href="/#what-we-do-section" className="text-xs uppercase font-mono tracking-wider hover:text-brand-green transition-colors">
            Services
          </a>
          <a href="/#our-work-section" className="text-xs uppercase font-mono tracking-wider hover:text-brand-green transition-colors">
            Products
          </a>
          <a href="/#why-us-section" className="text-xs uppercase font-mono tracking-wider hover:text-brand-green transition-colors">
            Why Us
          </a>
          <a href="/#faq-section" className="text-xs uppercase font-mono tracking-wider hover:text-brand-green transition-colors">
            FAQ
          </a>
        </div>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://calendar.app.google/mCygswQWvcXfkyLk9"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider bg-brand-green text-black hover:bg-brand-green/85 font-semibold transition-all shadow-md hover:scale-105"
          >
            Build Your Product
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none bg-black/40 border border-white/10 rounded-full"
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

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-grey-1/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 pointer-events-auto shadow-2xl">
          <a
            href="/#about-us-section"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-mono uppercase tracking-wider text-white/80 hover:text-brand-green"
          >
            About Us
          </a>
          <a
            href="/#what-we-do-section"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-mono uppercase tracking-wider text-white/80 hover:text-brand-green"
          >
            Services
          </a>
          <a
            href="/#our-work-section"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-mono uppercase tracking-wider text-white/80 hover:text-brand-green"
          >
            Products
          </a>
          <a
            href="/#why-us-section"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-mono uppercase tracking-wider text-white/80 hover:text-brand-green"
          >
            Why Us
          </a>
          <a
            href="/#faq-section"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-mono uppercase tracking-wider text-white/80 hover:text-brand-green"
          >
            FAQ
          </a>
          <div className="pt-4 border-t border-white/10">
            <a
              href="https://calendar.app.google/mCygswQWvcXfkyLk9"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider bg-brand-green text-black font-semibold"
            >
              Build Your Product
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
