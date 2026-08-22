import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useGsapScrollTrigger(dependencies = []) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. child-fade-in
      document.querySelectorAll('[child-fade-in]').forEach((parent) => {
        gsap.set(parent, { opacity: 1 })
        
        const attrValue = parent.getAttribute('child-fade-in')
        const defaultValue = window.innerWidth > 991 ? 100 : 50
        const yValue = attrValue && !isNaN(Number(attrValue)) ? Number(attrValue) : defaultValue

        gsap.fromTo(
          parent.children,
          { y: yValue, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: parent,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // 2. divider-animate
      document.querySelectorAll('[divider-animate]').forEach((divider) => {
        gsap.fromTo(
          divider,
          { width: '0%' },
          {
            width: '100%',
            ease: 'power3.out',
            duration: 1,
            scrollTrigger: {
              trigger: divider,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, dependencies)
}
