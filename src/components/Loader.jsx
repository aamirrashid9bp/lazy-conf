import React, { useState, useEffect } from 'react'
import Logo from './Logo.jsx'

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
        <Logo className="scale-125" />
        <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden rounded-full mt-4">
          <div
            className="absolute top-0 bottom-0 left-0 bg-brand-green transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-xs text-white/50">{progress}%</div>
      </div>
    </div>
  )
}
