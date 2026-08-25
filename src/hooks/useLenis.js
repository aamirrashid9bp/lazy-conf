import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useLenis() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      infinite: false,
      syncTouch: false, // matches smoothTouch: false
    })

    window.lenis = lenis

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker as the single animation loop to drive Lenis
    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Stop scrolling initially (optional, if loader is active, loader will start it)
    lenis.stop()

    // Start lenis after document ready / small timeout
    const timeout = setTimeout(() => {
      lenis.start()
    }, 100)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      window.lenis = null
      clearTimeout(timeout)
    }
  }, [])
}
