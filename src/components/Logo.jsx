import React from 'react'

export default function Logo({ className = '', inverted = false }) {
  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      <img
        src="/lazy_developer.png"
        alt="LazyDeveloper Logo"
        className={`w-9 h-9 object-contain transition-all duration-300 ${
          inverted ? 'brightness-0' : 'brightness-100'
        }`}
      />
      <div className="flex flex-col text-left">
        <span className={`font-mono text-sm tracking-wider font-bold uppercase transition-colors duration-300 ${
          inverted ? 'text-black' : 'text-white'
        }`}>
          LazyDeveloper
        </span>
        <span className={`font-mono text-[9px] tracking-widest uppercase transition-colors duration-300 ${
          inverted ? 'text-black/60' : 'text-brand-green'
        }`}>
          TechEd Pvt. Ltd.
        </span>
      </div>
    </div>
  )
}
