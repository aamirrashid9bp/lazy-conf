import React, { useEffect } from 'react'
import { useLeadModal } from '../../context/LeadModalContext.jsx'
import MultiStepProjectForm from './MultiStepProjectForm.jsx'
import ProductDemoForm from './ProductDemoForm.jsx'
import ContactForm from './ContactForm.jsx'

export default function LeadCaptureModal() {
  const { isOpen, modalType, contextMeta, closeLeadModal } = useLeadModal()

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeLeadModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeLeadModal])

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      
      {/* Dark Backdrop with blur */}
      <div
        className="fixed inset-0 bg-[#060608]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={closeLeadModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-48px)] flex flex-col bg-[#090b0a] border border-white/15 rounded-[4px] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden my-auto animate-modalEntry">
        
        {/* Subtle top accent border line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#2F6F5E] via-[#38e07b] to-[#2F6F5E] shrink-0" />

        {/* Modal Header & Close Button */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-3.5 pb-2.5 border-b border-white/5 shrink-0 bg-[#090b0a]">
          <span className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">
            LazyDeveloper® Lead Engine
          </span>

          <button
            onClick={closeLeadModal}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white/40 hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Form Content (Flex column child with min-h-0) */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {modalType === 'build-product' && (
            <MultiStepProjectForm contextMeta={contextMeta} onClose={closeLeadModal} />
          )}

          {modalType === 'convertleads-demo' && (
            <ProductDemoForm productKey="convertleads" contextMeta={contextMeta} onClose={closeLeadModal} />
          )}

          {modalType === 'rtmnu-demo' && (
            <ProductDemoForm productKey="rtmnu" contextMeta={contextMeta} onClose={closeLeadModal} />
          )}

          {modalType === 'echaii-demo' && (
            <ProductDemoForm productKey="echaii" contextMeta={contextMeta} onClose={closeLeadModal} />
          )}

          {modalType === 'innovexa-demo' && (
            <ProductDemoForm productKey="innovexa" contextMeta={contextMeta} onClose={closeLeadModal} />
          )}

          {modalType === 'contact' && (
            <ContactForm contextMeta={contextMeta} onClose={closeLeadModal} />
          )}
        </div>

      </div>
    </div>
  )
}
