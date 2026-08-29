import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { submitLead } from '../services/leadService.js'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

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
        window.lenis.scrollTo(targetEl, { offset: -80, duration: 1.2 })
      } else {
        const top = targetEl.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()

    if (location.pathname !== '/' && location.pathname !== '/index.html') {
      navigate('/')
      setTimeout(() => {
        scrollToTarget(sectionId)
      }, 150)
      return
    }

    scrollToTarget(sectionId)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email.trim()) {
      await submitLead(
        { email: email.trim(), fullName: 'Newsletter Subscriber', service: 'Newsletter Subscription' },
        { formName: 'Footer Newsletter Form', ctaClicked: 'Footer Join' }
      )
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
      setEmail('')
    }
  }

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative bg-[#000000] text-white overflow-hidden border-t border-white/[0.08] select-none pt-16 sm:pt-20 pb-8"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 grid grid-cols-6 h-full">
          <div className="border-r border-white/[0.04] h-full" />
          <div className="border-r border-white/[0.04] h-full" />
          <div className="border-r border-white/[0.04] h-full" />
          <div className="border-r border-white/[0.04] h-full" />
          <div className="border-r border-white/[0.04] h-full" />
          <div className="h-full" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* Top Numbers Row with Divider: [ LAZYDEVELOPER ] [ PRODUCT STUDIO ] [ SCALE ] */}
        <div className="flex items-center justify-between pb-8 sm:pb-12 border-b border-white/10 font-mono text-xs text-white/40 tracking-[0.25em]">
          <span>[ LAZYDEVELOPER ]</span>
          <span>[ PRODUCT STUDIO ]</span>
          <span>[ SCALE ]</span>
        </div>

        {/* Middle Navigation & Newsletter Row */}
        <div className="footer-reveal grid grid-cols-1 md:grid-cols-12 gap-12 py-12 sm:py-16">
          
          {/* Navigation Links (5 cols) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#1B3D33] mb-2 font-bold">
              NAVIGATION
            </h3>
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, 'top')}
              className="font-sans text-lg sm:text-xl text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Home
            </a>
            <a
              href="#about-us-section"
              onClick={(e) => handleNavClick(e, 'about-us-section')}
              className="font-sans text-lg sm:text-xl text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              About Us
            </a>
            <a
              href="#what-we-do-section"
              onClick={(e) => handleNavClick(e, 'what-we-do-section')}
              className="font-sans text-lg sm:text-xl text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              What We Do
            </a>
            <a
              href="#our-works-section"
              onClick={(e) => handleNavClick(e, 'our-works-section')}
              className="font-sans text-lg sm:text-xl text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Our Works
            </a>
          </div>

          {/* Keep in Touch Subscription (7 cols) */}
          <div className="md:col-span-7 flex flex-col max-w-md">
            <h3 className="font-reckless text-2xl sm:text-3xl font-normal text-white mb-3 tracking-tight">
              Keep In Touch
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-6">
              Leave your email to stay connected for inspiring product engineering, case studies, and opportunities.
            </p>

            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#090b0a] border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1B3D33] transition-colors rounded-[2px]"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="px-6 py-3 bg-[#1B3D33] hover:bg-[#1B3D33]/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 rounded-[2px] cursor-pointer"
              >
                JOIN
              </button>
            </form>
            {submitted && (
              <span className="font-mono text-xs text-[#1B3D33] mt-3">
                ✓ Thank you! Your email has been received.
              </span>
            )}
          </div>

        </div>

        {/* Bottom Credits Row */}
        <div className="footer-reveal flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-white/50 font-sans">
          <div>
            © {new Date().getFullYear()} LazyDeveloper. All Rights Reserved • Partner with us:{' '}
            <a href="mailto:hello@lazydeveloper.com" className="text-white hover:text-[#1B3D33] underline transition-colors">
              hello@lazydeveloper.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              Twitter / X
            </a>
          </div>
        </div>

        {/* Large Static Bottom Branding: LAZYDEVELOPER® */}
        <div className="pt-12 sm:pt-16 pb-2 overflow-hidden select-none pointer-events-none">
          <div className="w-full flex justify-center text-center font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] text-white/[0.07] tracking-tighter whitespace-nowrap">
            LAZYDEVELOPER<sup>®</sup>
          </div>
        </div>

      </div>
    </footer>
  )
}
