import React, { useState } from 'react'
import { submitLead } from '../../services/leadService.js'
import FormSuccess from './FormSuccess.jsx'

export default function ProductDemoForm({ productKey = 'convertleads', contextMeta = {}, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    // Common fields
    fullName: '',
    company: '',
    email: '',
    phone: '',
    notes: '',

    // ConvertLeads
    salespeopleCount: '5 – 15 Reps',
    monthlyLeads: '500 – 2,000 leads/mo',
    currentCrm: '',
    requiredCrmFeatures: 'Pipeline Automation, WhatsApp Integration, Telecalling CRM',

    // RTMNU System
    institutionType: 'University / Multi-College Group',
    studentCount: '5,000 – 20,000 Students',
    campusesCount: '1 – 3 Campuses',
    requiredEducationModules: 'Student Admissions, Exam Automation, Fee Management, LMS',

    // Echaii
    officeLocation: '',
    employeeCount: '50 – 150 Employees',
    dailyTeaRequirement: '150 – 300 cups/day',
    snackRequirement: 'Yes, Daily Snacks',

    // Innovexa Space
    seatsCount: '100 – 500 Desks',
    locationsCount: '1 – 2 Locations',
    requiredCoworkingModules: 'Desk Booking, Meeting Room Automation, Member Billing, Access Control',
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const errs = {}
    if (!formData.fullName.trim()) errs.fullName = 'Contact name is required.'
    if (!formData.email.trim()) {
      errs.email = 'Work email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Valid email is required.'
    }
    if (!formData.phone.trim()) errs.phone = 'Phone / WhatsApp is required.'
    if (!formData.company.trim()) errs.company = 'Company or Institution name is required.'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const res = await submitLead(formData, {
        formName: `${productKey.toUpperCase()} Demo Form`,
        product: productKey,
        service: 'Product Demo',
        ctaClicked: contextMeta.ctaClicked || `Request ${productKey} Demo`,
      })
      if (res.success) {
        setIsSubmitted(true)
      }
    } catch (err) {
      console.error('[DemoForm] error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <FormSuccess
        onClose={onClose}
        title="DEMO REQUEST RECEIVED."
        message={`Thank you for your interest in ${productKey.toUpperCase()}. Our product specialist will prepare a customized walkthrough and reach out within 24 hours.`}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 w-full select-none overflow-hidden">
      
      {/* 1. Fixed Header Info */}
      <div className="px-4 sm:px-6 py-3 border-b border-white/10 shrink-0 bg-[#090b0a]">
        <span className="font-mono text-xs text-[#38e07b] uppercase tracking-[0.2em] font-semibold block">
          [ {productKey.toUpperCase()} · PRODUCT DEMO ]
        </span>
        <h3 className="font-reckless text-xl sm:text-2xl font-normal text-white mt-1">
          {productKey === 'convertleads' && 'Request ConvertLeads Demo'}
          {productKey === 'rtmnu' && 'Request Education System Demo'}
          {productKey === 'echaii' && 'Get Echaii for My Office'}
          {productKey === 'innovexa' && 'Discuss Workspace Solution'}
        </h3>
      </div>

      {/* 2. Scrollable Form Fields */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
        
        {/* Row 1: Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
              Contact Person *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Marcus Vance"
              className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none transition-colors"
            />
            {errors.fullName && <p className="text-red-400 font-mono text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
              Company / Institution *
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="e.g. Vance Tech Ventures"
              className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none transition-colors"
            />
            {errors.company && <p className="text-red-400 font-mono text-xs mt-1">{errors.company}</p>}
          </div>
        </div>

        {/* Row 2: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
              Work Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. marcus@vance.com"
              className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none transition-colors"
            />
            {errors.email && <p className="text-red-400 font-mono text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
              WhatsApp / Phone *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. +1 555 432 9811"
              className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none transition-colors"
            />
            {errors.phone && <p className="text-red-400 font-mono text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* PRODUCT SPECIFIC QUESTION SETS */}
        
        {/* A. ConvertLeads Questions */}
        {productKey === 'convertleads' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                  Sales Team Size
                </label>
                <select
                  value={formData.salespeopleCount}
                  onChange={(e) => handleChange('salespeopleCount', e.target.value)}
                  className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="1 – 5 Reps">1 – 5 Reps</option>
                  <option value="5 – 15 Reps">5 – 15 Reps</option>
                  <option value="15 – 50 Reps">15 – 50 Reps</option>
                  <option value="50+ Reps">50+ Reps</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                  Monthly Leads Volume
                </label>
                <select
                  value={formData.monthlyLeads}
                  onChange={(e) => handleChange('monthlyLeads', e.target.value)}
                  className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="Under 500 leads/mo">Under 500 leads/mo</option>
                  <option value="500 – 2,000 leads/mo">500 – 2,000 leads/mo</option>
                  <option value="2,000 – 10,000 leads/mo">2,000 – 10,000 leads/mo</option>
                  <option value="10,000+ leads/mo">10,000+ leads/mo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                Current CRM / Lead Tool (Optional)
              </label>
              <input
                type="text"
                value={formData.currentCrm}
                onChange={(e) => handleChange('currentCrm', e.target.value)}
                placeholder="e.g. LeadSquared, Zoho CRM, Google Sheets..."
                className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </>
        )}

        {/* B. RTMNU / Education System Questions */}
        {productKey === 'rtmnu' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                  Institution Type
                </label>
                <select
                  value={formData.institutionType}
                  onChange={(e) => handleChange('institutionType', e.target.value)}
                  className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="University / Multi-College Group">University / Multi-College Group</option>
                  <option value="Autonomous Engineering / Med College">Autonomous College / Institute</option>
                  <option value="K-12 School Chain">K-12 School Group</option>
                  <option value="EdTech / Coaching Academy">EdTech / Coaching Academy</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                  Total Student Count
                </label>
                <select
                  value={formData.studentCount}
                  onChange={(e) => handleChange('studentCount', e.target.value)}
                  className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="Under 2,000 Students">Under 2,000 Students</option>
                  <option value="2,000 – 5,000 Students">2,000 – 5,000 Students</option>
                  <option value="5,000 – 20,000 Students">5,000 – 20,000 Students</option>
                  <option value="20,000+ Students">20,000+ Students</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* C. Echaii Questions */}
        {productKey === 'echaii' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                  Office Location / City
                </label>
                <input
                  type="text"
                  value={formData.officeLocation}
                  onChange={(e) => handleChange('officeLocation', e.target.value)}
                  placeholder="e.g. Pune, Bangalore, Mumbai, Hyderabad..."
                  className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                  Employee Strength
                </label>
                <select
                  value={formData.employeeCount}
                  onChange={(e) => handleChange('employeeCount', e.target.value)}
                  className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="20 – 50 Employees">20 – 50 Employees</option>
                  <option value="50 – 150 Employees">50 – 150 Employees</option>
                  <option value="150 – 500 Employees">150 – 500 Employees</option>
                  <option value="500+ Employees">500+ Employees</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* D. Innovexa Questions */}
        {productKey === 'innovexa' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                  Total Desks / Capacity
                </label>
                <select
                  value={formData.seatsCount}
                  onChange={(e) => handleChange('seatsCount', e.target.value)}
                  className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="50 – 200 Desks">50 – 200 Desks</option>
                  <option value="200 – 500 Desks">200 – 500 Desks</option>
                  <option value="500 – 2,000 Desks">500 – 2,000 Desks</option>
                  <option value="2,000+ Desks">2,000+ Desks</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                  Number of Hubs
                </label>
                <select
                  value={formData.locationsCount}
                  onChange={(e) => handleChange('locationsCount', e.target.value)}
                  className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="1 Location">1 Location</option>
                  <option value="2 – 4 Locations">2 – 4 Locations</option>
                  <option value="5+ Locations">5+ Locations</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Notes / Special requirements */}
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
            Specific Requirements / Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Any specific integrations, workflows or constraints..."
            className="w-full bg-[#0c0e0d] border border-white/15 focus:border-[#38e07b] rounded-[2px] p-2.5 text-sm text-white focus:outline-none"
          />
        </div>

      </div>

      {/* 3. Fixed Bottom Action Bar */}
      <div className="px-4 sm:px-6 py-3.5 border-t border-white/10 bg-[#090b0a] shrink-0 flex justify-end pb-[calc(14px+env(safe-area-inset-bottom,0px))]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-[#38e07b] hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-[2px] shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting
            ? 'SUBMITTING...'
            : productKey === 'convertleads'
            ? 'Request ConvertLeads Demo ↗'
            : productKey === 'rtmnu'
            ? 'Request Education System Demo ↗'
            : productKey === 'echaii'
            ? 'Get Echaii for My Office ↗'
            : 'Discuss Workspace Solution ↗'}
        </button>
      </div>

    </form>
  )
}
