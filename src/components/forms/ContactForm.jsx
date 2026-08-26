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
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl mx-auto py-2 px-2 sm:px-6">
      <div className="pb-4 mb-6 border-b border-white/10">
        <span className="font-mono text-xs text-[#38e07b] uppercase tracking-[0.2em] font-semibold">
          [ CONTACT LAZYDEVELOPER ]
        </span>
        <h3 className="font-reckless text-2xl sm:text-3xl font-normal text-white mt-1">
          Let’s discuss your technical vision
        </h3>
      </div>

      <div className="space-y-4">
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

      <div className="pt-6 mt-4 border-t border-white/10 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-[#38e07b] hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-[2px] shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? 'SENDING...' : 'SEND MESSAGE ↗'}
        </button>
      </div>
    </form>
  )
}
