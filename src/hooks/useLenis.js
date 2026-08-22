import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useLenis() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      infinite: false,
      syncTouch: false, // matches smoothTouch: false
    })

    window.lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Stop scrolling initially (optional, if loader is active, loader will start it)
    lenis.stop()

    // Start lenis after document ready / small timeout
    const timeout = setTimeout(() => {
      lenis.start()
    }, 100)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.lenis = null
      clearTimeout(timeout)
    }
  }, [])
}
