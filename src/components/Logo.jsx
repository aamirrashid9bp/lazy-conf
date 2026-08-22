import React from 'react'

export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      <img
        src="/lazy_developer.png"
        alt="LazyDeveloper Logo"
        className="w-10 h-10 object-contain"
      />
      <div className="flex flex-col text-left leading-[1.0]">
        <span className="font-sans text-[16px] font-black tracking-tight text-teal-600">
          lazy
        </span>
        <span className="font-sans text-[16px] font-black tracking-tight text-gray-950">
          developer
        </span>
        <span className="font-mono text-[8px] font-bold tracking-widest uppercase text-teal-600 mt-0.5">
          TECHED PVT. LTD.
        </span>
      </div>
    </div>
  )
}
