import React from 'react'

export default function MotionPath() {
  const marqueeItems = [
    "BUILD PRODUCTS",
    "AUTOMATE WORK",
    "SCALE FASTER",
    "BUILD WITH CLARITY",
    "AI WHERE IT MATTERS",
    "OWN THE OUTCOME"
  ]

  return (
    <section className="relative bg-[#060611] overflow-hidden py-10 border-y border-white/10 flex items-center">
      <div className="flex w-[200vw] sm:w-max group">
        {/* We use two identical blocks for a seamless CSS loop */}
        <div className="flex items-center justify-around w-1/2 sm:w-max animate-[marqueeClient_40s_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center shrink-0 px-8 sm:px-12">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-white whitespace-nowrap">
                {item}
              </span>
              <span className="ml-16 sm:ml-24 w-1.5 h-1.5 rounded-full bg-brand-green" />
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-around w-1/2 sm:w-max animate-[marqueeClient_40s_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center shrink-0 px-8 sm:px-12">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-white whitespace-nowrap">
                {item}
              </span>
              <span className="ml-16 sm:ml-24 w-1.5 h-1.5 rounded-full bg-brand-green" />
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeClient {
          from { transform: translateX(0%); }
          to { transform: translateX(-100%); }
        }
      `}} />
    </section>
  )
}
