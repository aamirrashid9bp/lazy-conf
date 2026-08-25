import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Creates a scroll-pinned section with a GSAP timeline driven by scroll position.
 * 
 * @param {Object} options
 * @param {React.RefObject} options.triggerRef - Ref to the section element that gets pinned
 * @param {React.RefObject} options.pinRef - Ref to the element that stays pinned (defaults to triggerRef)
 * @param {Function} options.onTimeline - Callback that receives (timeline, triggerEl) to build animations
 * @param {string} options.start - ScrollTrigger start position (default: 'top top')
 * @param {string} options.end - ScrollTrigger end position (default: '+=300%')
 * @param {boolean} options.scrub - Enable scrub (default: true)
 * @param {number} options.scrubSmooth - Scrub smoothing (default: 1)
 * @param {Array} options.deps - Effect dependencies
 */
export default function useScrollPin({
  triggerRef,
  pinRef,
  onTimeline,
  start = 'top top',
  end = '+=300%',
  scrub = true,
  scrubSmooth = 1,
  deps = []
}) {
  const scrollTriggerRef = useRef(null)

  useEffect(() => {
    const triggerEl = triggerRef?.current
    const pinEl = pinRef?.current || triggerEl
    if (!triggerEl || !onTimeline) return

    // Small delay to ensure layout is settled
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          pin: pinEl,
          start,
          end,
          scrub: scrub ? scrubSmooth : false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      scrollTriggerRef.current = tl.scrollTrigger

      onTimeline(tl, triggerEl)
    }, 100)

    return () => {
      clearTimeout(timer)
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === triggerEl) st.kill()
      })
    }
  }, [triggerRef, pinRef, start, end, scrub, scrubSmooth, ...deps])

  return scrollTriggerRef
}
