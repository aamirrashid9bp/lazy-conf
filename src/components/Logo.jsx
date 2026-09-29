import React from 'react'

export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Brand Icon */}
      <img
        src="/lazy_developer.png"
        alt="LazyDeveloper Logo"
        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain shrink-0"
      />
      {/* Brand Lockup */}
      <div className="flex flex-col text-left justify-center">
        <span className="font-sans text-[16px] sm:text-[17px] md:text-[19px] font-bold tracking-tight text-gray-950 whitespace-nowrap leading-tight">
          LazyDeveloper
        </span>
        <span className="font-sans text-[10.5px] sm:text-[11.5px] md:text-[12.5px] font-semibold text-brand-green tracking-tight whitespace-nowrap leading-none mt-0.5">
          TechEd Pvt. Ltd.
        </span>
      </div>
    </div>
  )
}

