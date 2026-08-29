import React, { useState } from 'react'
import { submitLead } from '../../services/leadService.js'
import FormSuccess from './FormSuccess.jsx'

const SERVICE_OPTIONS = [
  'Mobile App',
  'Website',
  'SaaS',
  'PaaS',
  'CRM',
  'ERP',
  'AI',
  'Automation',
  'Custom Software',
]

const BUDGET_OPTIONS = [
  'Under ₹1 Lakh',
  '₹1–5 Lakh',
  '₹5–10 Lakh',
  '₹10–25 Lakh',
  '₹25 Lakh+',
  'Not sure',
]

const TIMELINE_OPTIONS = [
  'Urgent (Under 4 weeks)',
  '1 – 2 Months',
  '2 – 4 Months',
  '4+ Months',
  'Exploring Feasibility',
]

export default function MultiStepProjectForm({ contextMeta = {}, onClose }) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    service: contextMeta.service || 'Mobile App',
    requirementDetails: '',
    targetAudience: '',
    budget: '₹5–10 Lakh',
    timeline: '1 – 2 Months',
    existingSystem: '',
    fullName: '',
    company: '',
    email: '',
    phone: '',
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  // Dynamic question prompt based on selected product/service in Step 1
  const getDynamicPrompt = () => {
    switch (formData.service) {
      case 'CRM':
        return {
          title: 'Tell us about your CRM requirement',
          subtitle: 'What is your current lead management process and primary bottleneck?',
          placeholder: 'e.g. We have 10 sales reps using Excel spreadsheets and losing track of follow-ups...',
        }
      case 'AI':
      case 'Automation':
        return {
          title: 'Tell us about your AI & automation requirement',
          subtitle: 'What workflows, data sources, or repetitive tasks do you want to automate?',
          placeholder: 'e.g. We want an AI assistant to parse incoming customer invoices and auto-populate ERP...',
        }
      case 'SaaS':
      case 'PaaS':
        return {
          title: 'Tell us about your SaaS requirement',
          subtitle: 'What is the core problem and who are your primary target users?',
          placeholder: 'e.g. A multi-tenant B2B subscription platform for logistics fleet dispatchers...',
        }
      case 'ERP':
      case 'Custom Software':
        return {
          title: 'Tell us about your custom system requirement',
          subtitle: 'What legacy software, spreadsheets, or manual processes need to be replaced?',
          placeholder: 'e.g. We need a unified inventory and purchase order system connecting 4 regional warehouses...',
        }
      case 'Mobile App':
      case 'Website':
      default:
        return {
          title: 'Tell us about your project requirement',
          subtitle: 'Describe the core business problem or feature requirements.',
          placeholder: 'e.g. A high-performance customer app with real-time tracking, payment gateway, and admin dashboard...',
        }
    }
  }

  const validateStep = () => {
    const errs = {}
    if (step === 1) {
      if (!formData.service) errs.service = 'Please select a project type.'
    } else if (step === 2) {
      if (!formData.requirementDetails.trim()) {
        errs.requirementDetails = 'Please briefly describe your requirement or business problem.'
      }
    } else if (step === 3) {
      if (!formData.budget) errs.budget = 'Please select a budget range.'
      if (!formData.timeline) errs.timeline = 'Please select a timeline.'
    } else if (step === 4) {
      if (!formData.fullName.trim()) errs.fullName = 'Full name is required.'
      if (!formData.email.trim()) {
        errs.email = 'Email address is required.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.'
      }
      if (!formData.phone.trim()) {
        errs.phone = 'WhatsApp or phone number is required.'
      }
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (validateStep()) {
      setStep((prev) => Math.min(5, prev + 1))
    }
  }

  const handleBack = (e) => {
    e.preventDefault()
    setStep((prev) => Math.max(1, prev - 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep()) return

    setIsSubmitting(true)
    try {
      const res = await submitLead(formData, {
        formName: 'Build Your Product Multi-Step Form',
        ctaClicked: contextMeta.ctaClicked || 'Build Your Product CTA',
        service: formData.service,
      })
      if (res.success) {
        setIsSubmitted(true)
      }
    } catch (err) {
      console.error('[Form] Submission failed:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <FormSuccess
        onClose={onClose}
        title="PROJECT RECEIVED."
        message="Thank you for telling us about your project. Our team will review the details and get back to you within 24 hours."
      />
    )
  }

  const prompt = getDynamicPrompt()

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full select-none overflow-hidden">
      
      {/* 1. Top Fixed Banner Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 shrink-0 bg-[#090b0a]">
        <div>
          <span className="font-mono text-xs text-[#1B3D33] uppercase tracking-[0.2em] font-semibold block">
            BUILD YOUR PRODUCT
          </span>
          <span className="font-sans text-xs text-white/50 font-light mt-0.5 block">
            Tell us what you're building.
          </span>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-white/70 tracking-widest font-bold">
            0{step} / 05
          </span>
        </div>
      </div>

      {/* 2. Middle Scrollable Form Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-5">
        {/* ============================================================
            STEP 1: WHAT ARE YOU BUILDING?
            ============================================================ */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-reckless text-2xl sm:text-3xl font-normal text-white tracking-tight">
                What are you building?
              </h3>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light mt-1">
              Select the primary solution type.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {SERVICE_OPTIONS.map((item) => {
              const isSelected = formData.service === item
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => handleChange('service', item)}
                  className={`p-3.5 sm:p-4 rounded-[2px] border text-left font-mono text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#1B3D33] bg-[#1B3D33]/15 text-white font-bold shadow-md ring-1 ring-[#1B3D33]/30'
                      : 'border-white/10 bg-[#0c0e0d] text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span>{item}</span>
                  {isSelected && <span className="text-[#1B3D33] font-bold">✓</span>}
                </button>
              )
            })}
          </div>
          {errors.service && <p className="text-red-400 font-mono text-xs mt-1">{errors.service}</p>}
        </div>
      )}

      {/* ============================================================
          STEP 2: TELL US ABOUT IT
          ============================================================ */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-reckless text-2xl sm:text-3xl font-normal text-white tracking-tight">
              Tell us about it
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light mt-1">
              {prompt.subtitle}
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-2">
                Business problem / requirement *
              </label>
              <textarea
                rows={5}
                required
                value={formData.requirementDetails}
                onChange={(e) => handleChange('requirementDetails', e.target.value)}
                placeholder={prompt.placeholder}
                className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#1B3D33] rounded-[2px] p-4 text-sm text-white focus:outline-none transition-colors leading-relaxed font-sans placeholder:text-white/30"
              />
              {errors.requirementDetails && (
                <p className="text-red-400 font-mono text-xs mt-1">{errors.requirementDetails}</p>
              )}
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
                Target Audience / Stakeholders (Optional)
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => handleChange('targetAudience', e.target.value)}
                placeholder="e.g. Internal operations team, external consumers, B2B buyers..."
                className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#1B3D33] rounded-[2px] p-3 text-sm text-white focus:outline-none transition-colors font-sans placeholder:text-white/30"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 3: PROJECT DETAILS
          ============================================================ */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-reckless text-2xl sm:text-3xl font-normal text-white tracking-tight">
              Project Details
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light mt-1">
              Select your budget and timeline expectations.
            </p>
          </div>

          <div className="space-y-5 pt-2">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#1B3D33] font-semibold mb-2">
                Budget
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BUDGET_OPTIONS.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => handleChange('budget', b)}
                    className={`p-3 rounded-[2px] border text-left font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                      formData.budget === b
                        ? 'border-[#1B3D33] bg-[#1B3D33]/15 text-white font-bold'
                        : 'border-white/10 bg-[#0c0e0d] text-white/60 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#1B3D33] font-semibold mb-2">
                Timeline
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TIMELINE_OPTIONS.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => handleChange('timeline', t)}
                    className={`p-3 rounded-[2px] border text-left font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                      formData.timeline === t
                        ? 'border-[#1B3D33] bg-[#1B3D33]/15 text-white font-bold'
                        : 'border-white/10 bg-[#0c0e0d] text-white/60 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
                Existing system (Optional)
              </label>
              <input
                type="text"
                value={formData.existingSystem}
                onChange={(e) => handleChange('existingSystem', e.target.value)}
                placeholder="e.g. Existing PostgreSQL database, Shopify, React frontend..."
                className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#1B3D33] rounded-[2px] p-3 text-sm text-white focus:outline-none transition-colors font-sans placeholder:text-white/30"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 4: YOUR DETAILS
          ============================================================ */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-reckless text-2xl sm:text-3xl font-normal text-white tracking-tight">
              Your Details
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light mt-1">
              Provide your details so our engineering pod can send proposal & architectural overview.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="e.g. Sarah Connor"
                className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#1B3D33] rounded-[2px] p-3 text-sm text-white focus:outline-none transition-colors font-sans placeholder:text-white/30"
              />
              {errors.fullName && <p className="text-red-400 font-mono text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="e.g. Acme Innovations"
                className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#1B3D33] rounded-[2px] p-3 text-sm text-white focus:outline-none transition-colors font-sans placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="e.g. sarah@acme.com"
                className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#1B3D33] rounded-[2px] p-3 text-sm text-white focus:outline-none transition-colors font-sans placeholder:text-white/30"
              />
              {errors.email && <p className="text-red-400 font-mono text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="e.g. +1 415 555 2671"
                className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#1B3D33] rounded-[2px] p-3 text-sm text-white focus:outline-none transition-colors font-sans placeholder:text-white/30"
              />
              {errors.phone && <p className="text-red-400 font-mono text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 5: REVIEW & SUBMIT
          ============================================================ */}
      {step === 5 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-reckless text-2xl sm:text-3xl font-normal text-white tracking-tight">
              Review & Submit
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light mt-1">
              Summary of your project requirements before submission.
            </p>
          </div>

          <div className="bg-[#0c0e0d] border border-white/15 p-5 rounded-[2px] space-y-3.5 font-sans text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50 font-mono text-xs uppercase">Building:</span>
              <span className="text-white font-bold">{formData.service}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50 font-mono text-xs uppercase">Budget:</span>
              <span className="text-[#1B3D33] font-mono text-xs font-semibold">{formData.budget}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50 font-mono text-xs uppercase">Timeline:</span>
              <span className="text-white">{formData.timeline}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50 font-mono text-xs uppercase">Contact:</span>
              <span className="text-white">{formData.fullName} ({formData.email})</span>
            </div>
            <div>
              <span className="text-white/50 font-mono text-xs uppercase block mb-1">Requirement:</span>
              <p className="text-white/80 text-xs italic bg-white/5 p-3 rounded-[2px] leading-relaxed">
                "{formData.requirementDetails}"
              </p>
            </div>
          </div>
        </div>
      )}

      </div>

      {/* 3. Fixed Bottom Navigation Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-t border-white/10 bg-[#090b0a] shrink-0 pb-[calc(14px+env(safe-area-inset-bottom,0px))]">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2.5 rounded-[2px] border border-white/20 text-white/70 hover:text-white hover:border-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            ← BACK
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-7 py-2.5 rounded-[2px] bg-[#1B3D33] hover:bg-[#1B3D33]/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            NEXT →
          </button>
        ) : (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="px-8 py-3 rounded-[2px] bg-[#1B3D33] hover:bg-[#1B3D33]/90 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT PROJECT →'}
          </button>
        )}
      </div>

    </div>
  )
}
