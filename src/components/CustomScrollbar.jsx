import React, { useEffect, useRef, useState } from 'react'

export default function CustomScrollbar() {
  const thumbRef = useRef(null)
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const thumb = thumbRef.current
    if (!thumb) return

    let timeoutId
    let isDragging = false
    let startY = 0
    let startScroll = 0

    const updateThumb = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const thumbHeight = thumb.offsetHeight
      const trackHeight = window.innerHeight - thumbHeight

      if (docHeight <= 0) return

      const thumbY = (scrollTop / docHeight) * trackHeight
      thumb.style.top = `${thumbY}px`

      setVisible(true)
      clearTimeout(timeoutId)
      
      // Auto-hide after inactivity
      if (!isDragging) {
        timeoutId = setTimeout(() => setVisible(false), 800)
      }
    }

    const handleMouseDown = (e) => {
      isDragging = true
      startY = e.clientY
      startScroll = window.scrollY
      document.body.style.userSelect = 'none'
      setVisible(true)
      clearTimeout(timeoutId)
    }

    const handleMouseMove = (e) => {
      if (!isDragging) return

      const docHeight = document.body.scrollHeight - window.innerHeight
      const thumbHeight = thumb.offsetHeight
      const trackHeight = window.innerHeight - thumbHeight

      if (trackHeight <= 0) return

      const deltaY = e.clientY - startY
      const scrollDelta = (deltaY / trackHeight) * docHeight

      window.scrollTo(0, startScroll + scrollDelta)
    }

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false
        document.body.style.userSelect = ''
        timeoutId = setTimeout(() => setVisible(false), 800)
      }
    }

    window.addEventListener('scroll', updateThumb)
    window.addEventListener('resize', updateThumb)
    thumb.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    // Initial positioning
    updateThumb()

    return () => {
      window.removeEventListener('scroll', updateThumb)
      window.removeEventListener('resize', updateThumb)
      thumb.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="custom-scrollbar fixed top-0 right-1 w-[6px] h-full z-[9999] pointer-events-none">
      <div
        ref={thumbRef}
        className={`scroll-thumb w-full h-[40px] rounded-[4px] bg-[#060611] border border-white/10 pointer-events-auto transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
