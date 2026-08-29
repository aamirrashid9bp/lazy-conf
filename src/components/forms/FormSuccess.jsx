import React from 'react'

export default function FormSuccess({ onClose, title = 'PROJECT RECEIVED.', message }) {
  return (
    <div className="flex flex-col items-center text-center py-12 px-6 sm:px-12 max-w-lg mx-auto">
      {/* Checkmark Icon */}
      <div className="w-16 h-16 rounded-full bg-[#1B3D33]/15 border border-[#1B3D33]/40 flex items-center justify-center text-[#1B3D33] mb-6 animate-bounce">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="font-reckless text-3xl sm:text-4xl font-normal text-white mb-4 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed mb-8">
        {message ||
          'Thank you for telling us about your project. Our engineering and product pod will review the details and get back to you within 24 hours.'}
      </p>

      {/* CTA Button */}
      <button
        onClick={onClose}
        className="px-8 py-3.5 bg-[#1B3D33] hover:bg-[#1B3D33]/90 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-[2px] cursor-pointer"
      >
        BACK TO WEBSITE
      </button>
    </div>
  )
}
