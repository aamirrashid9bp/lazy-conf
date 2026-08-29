import React from 'react'

export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Brand Icon */}
      <img
        src="/lazy_developer.png"
        alt="LazyDeveloper Logo"
        className="w-9 h-9 md:w-10 md:h-10 object-contain shrink-0"
      />
      {/* Brand Lockup */}
      <div className="flex flex-col text-left leading-tight">
        <span className="font-sans text-[17px] md:text-[19px] font-bold tracking-tight text-gray-950">
          LazyDeveloper
        </span>
        <span className="font-sans text-[12px] md:text-[13px] font-medium text-gray-950 tracking-tight">
          TechEd PVT LTD
        </span>
      </div>
    </div>
  )
}
