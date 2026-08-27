import React, { useState } from 'react'
import { submitLead } from '../../services/leadService.js'
import FormSuccess from './FormSuccess.jsx'

export default function ContactForm({ contextMeta = {}, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    reason: 'New Product Engineering',
    message: '',
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const errs = {}
    if (!formData.fullName.trim()) errs.fullName = 'Your name is required.'
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a message or inquiry.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const res = await submitLead(formData, {
        formName: 'General Contact Form',
        service: formData.reason,
        ctaClicked: contextMeta.ctaClicked || 'Contact CTA',
      })
      if (res.success) {
        setIsSubmitted(true)
      }
    } catch (err) {
      console.error('[ContactForm] error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <FormSuccess
        onClose={onClose}
        title="MESSAGE RECEIVED."
        message="Thank you for reaching out to LazyDeveloper. Our team will review your inquiry and get back to you shortly."
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 w-full select-none overflow-hidden">
      {/* 1. Fixed Header Info */}
      <div className="px-4 sm:px-6 py-3 border-b border-white/10 shrink-0 bg-[#090b0a]">
        <span className="font-mono text-xs text-[#38e07b] uppercase tracking-[0.2em] font-semibold block">
          [ CONTACT LAZYDEVELOPER ]
        </span>
        <h3 className="font-reckless text-xl sm:text-2xl font-normal text-white mt-1">
          Let’s discuss your technical vision
        </h3>
      </div>

      {/* 2. Scrollable Form Body */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none transition-colors font-sans placeholder:text-white/30"
            />
            {errors.fullName && <p className="text-red-400 font-mono text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="e.g. Acme Studio"
              className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none transition-colors font-sans placeholder:text-white/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. alex@acme.com"
              className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none transition-colors font-sans placeholder:text-white/30"
            />
            {errors.email && <p className="text-red-400 font-mono text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
              WhatsApp / Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. +1 555 234 8871"
              className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none transition-colors font-sans placeholder:text-white/30"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
            Reason for Contact
          </label>
          <select
            value={formData.reason}
            onChange={(e) => handleChange('reason', e.target.value)}
            className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none font-sans"
          >
            <option value="New Product Engineering">New Product Engineering (MVP / Full Product)</option>
            <option value="Custom Business Software / CRM">Custom Business Software / CRM / ERP</option>
            <option value="AI Agents & Automation">AI Agents & Workflow Automation</option>
            <option value="Advisory / Technology Partnership">Technology Leadership & Advisory</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
            Message / Challenge *
          </label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Tell us what you're trying to solve or build..."
            className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-3 text-sm text-white focus:outline-none font-sans placeholder:text-white/30"
          />
          {errors.message && <p className="text-red-400 font-mono text-xs mt-1">{errors.message}</p>}
        </div>
      </div>

      {/* 3. Fixed Bottom Action Bar */}
      <div className="px-4 sm:px-6 py-3.5 border-t border-white/10 bg-[#090b0a] shrink-0 flex justify-end pb-[calc(14px+env(safe-area-inset-bottom,0px))]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-[#38e07b] hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-[2px] shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? 'SENDING...' : 'SEND MESSAGE ↗'}
        </button>
      </div>
    </form>
  )
}
