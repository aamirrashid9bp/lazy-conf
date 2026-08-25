import React from 'react'

export default function MotionPath() {
  const items = [
    "BUILD PRODUCTS",
    "FROM IDEA TO PRODUCT",
    "AUTOMATE WORK",
    "SCALE FASTER",
    "BUILD WITH CLARITY",
    "OWN THE OUTCOME",
  ]

  // Duplicate items to ensure a seamless continuous loop
  const marqueeItems = [...items, ...items, ...items]

  return (
    <section className="relative overflow-hidden bg-brand-green py-6 md:py-8 border-y border-black/10">
      <div className="flex whitespace-nowrap overflow-hidden group">
        <div className="marquee-track flex items-center">
          {marqueeItems.map((text, idx) => (
            <React.Fragment key={idx}>
              <span className="font-mono text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-widest text-black/90 px-6 sm:px-8">
                {text}
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl text-black/30">✦</span>
            </React.Fragment>
          ))}
        </div>
        {/* Second track for perfect loop depending on screen size */}
        <div className="marquee-track flex items-center" aria-hidden="true">
          {marqueeItems.map((text, idx) => (
            <React.Fragment key={idx}>
              <span className="font-mono text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-widest text-black/90 px-6 sm:px-8">
                {text}
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl text-black/30">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
