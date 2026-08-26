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
            stagger: 0.18,
            scrollTrigger: {
              trigger: parent,
              start: 'top 82%',
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

      // 3. data-scramble (Binary IDs & Tags text scrambler)
      const SCRAMBLE_CHARS = '01ABCDEFGIJKLNOPRTUVXY'
      const FRAMES = 48
      document.querySelectorAll('[data-scramble]').forEach((el) => {
        const finalText = el.textContent || ''
        const chars = finalText.split('')

        gsap.set(el, { opacity: 0 })

        const scramble = () => {
          let f = 0
          const loop = () => {
            const p = Math.pow(f / FRAMES, 3)
            el.textContent = chars
              .map((c, i) => (c === ' ' || i < p * chars.length ? c : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0]))
              .join('')

            if (++f <= FRAMES) {
              requestAnimationFrame(loop)
            } else {
              el.textContent = finalText
            }
          }
          loop()
        }

        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            })
            gsap.delayedCall(0.15, scramble)
          },
        })
      })

      // 4. anime-count (Counter animation for Execution by Numbers)
      document.querySelectorAll('[anime-count-wrap]').forEach((wrapper) => {
        ScrollTrigger.create({
          trigger: wrapper,
          start: wrapper.getAttribute('data-start') || 'top 85%',
          once: true,
          onEnter: () => {
            wrapper.querySelectorAll('[anime-count]').forEach((el) => {
              const text = el.textContent?.trim() || ''
              if (!text) return

              const isComma = text.includes(',')
              const num = Number(text.replace(/[^0-9.-]/g, ''))
              const suffix = text.replace(/[0-9.,-]/g, '')
              if (isNaN(num)) return

              el.textContent = '0' + suffix

              const counterObj = { val: 0 }
              gsap.to(counterObj, {
                val: num,
                duration: 2,
                ease: 'power1.out',
                onUpdate: () => {
                  const current = Math.floor(counterObj.val)
                  el.textContent = (isComma ? current.toLocaleString() : current) + suffix
                },
              })
            })
          },
        })
      })

      // 5. flip-card='click' handler
      const flipCards = document.querySelectorAll("[flip-card='click']")
      flipCards.forEach((card) => {
        const handleClick = () => {
          flipCards.forEach((other) => {
            if (other !== card) other.classList.remove('is-flipped')
          })
          card.classList.toggle('is-flipped')
        }
        card.addEventListener('click', handleClick)
      })

      // 6. Generic scroll reveals
      document.querySelectorAll('.gsap-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    })

    return () => {
      ctx.revert()
    }
  }, dependencies)
}
