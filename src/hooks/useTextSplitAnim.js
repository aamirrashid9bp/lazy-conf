import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function useTextSplitAnim(dependencies = []) {
  useEffect(() => {
    // Make sure fonts are loaded so layout is stable
    const runAnimations = () => {
      const splitInstances = []

      // 1. split-para (Paragraph lines reveal)
      document.querySelectorAll('[split-para]').forEach((el) => {
        if (!el) return
        gsap.set(el, { opacity: 1 })

        const split = new SplitType(el, { types: 'lines', lineClass: 'split-line' })
        splitInstances.push(split)

        const start = el.getAttribute('data-start') || 'top 85%'
        
        gsap.fromTo(
          split.lines,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            rotateX: 20,
            y: 35,
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 2,
            ease: 'power4.out',
            stagger: 0.09,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // 2. fd-scroll-heading (Heading character rotate reveal)
      document.querySelectorAll('[fd-scroll-heading]').forEach((element) => {
        if (!element) return
        gsap.set(element, { opacity: 1 })

        const split = new SplitType(element, { types: 'words, chars', charClass: 'char', wordClass: 'fd-word' })
        splitInstances.push(split)

        const start = element.getAttribute('data-start') || 'top 80%'

        gsap.set(split.chars, {
          rotateX: -80,
          opacity: 0,
        })

        gsap.to(split.chars, {
          rotateX: 0,
          opacity: 1,
          ease: 'power1.out',
          stagger: 0.015,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none none',
          },
        })
      })

      return splitInstances
    }

    let splits = []
    if (document.fonts) {
      document.fonts.ready.then(() => {
        splits = runAnimations()
      })
    } else {
      splits = runAnimations()
    }

    return () => {
      splits.forEach(s => s.revert())
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, dependencies)
}
