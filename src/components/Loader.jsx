import React, { useState, useEffect } from 'react'

export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVisible(false)
            if (onLoaded) onLoaded()
          }, 300)
          return 100
        }
        return prev + Math.floor(Math.random() * 15) + 5
      })
    }, 40)

    return () => clearInterval(interval)
  }, [onLoaded])

  if (!isVisible) return null

  return (
    <div
      loader=""
      className={`fixed inset-0 z-50 bg-grey-1 flex flex-col items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Centered Brand Lockup: Warm-White Logo on the LEFT + "LazyDeveloper" on the RIGHT */}
        <div className="flex items-center justify-center gap-3 sm:gap-3.5 select-none whitespace-nowrap">
          <img
            src="/lazy_developer_warmwhite.png"
            alt="LazyDeveloper Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain shrink-0"
          />
          <span className="font-sans text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-[#F5F1E8] whitespace-nowrap">
            LazyDeveloper
          </span>
        </div>

        {/* Existing Loading Progress Bar */}
        <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden rounded-full mt-4">
          <div
            className="absolute top-0 bottom-0 left-0 bg-brand-green transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Existing Loading Percentage */}
        <div className="font-mono text-xs text-white/50">{progress}%</div>
      </div>
    </div>
  )
}

