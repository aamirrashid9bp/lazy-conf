/**
 * LazyDeveloper Lead Capture & Tracking Service
 * Implements full metadata capture, lead scoring, and backend persistence.
 */

// Helper to extract UTM parameters from query string
function getUtmParams() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmTerm: params.get('utm_term') || '',
    utmContent: params.get('utm_content') || '',
  }
}

// Helper to detect device and browser
function getClientEnvironment() {
  if (typeof window === 'undefined') return { device: 'unknown', browser: 'unknown' }
  const ua = navigator.userAgent
  let device = 'Desktop'
  if (/mobile/i.test(ua)) device = 'Mobile'
  else if (/tablet|ipad/i.test(ua)) device = 'Tablet'

  let browser = 'Other'
  if (/chrome|crios/i.test(ua)) browser = 'Chrome'
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox'
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari'
  else if (/edg/i.test(ua)) browser = 'Edge'

  return { device, browser }
}

/**
 * Lead Scoring Algorithm
 * Highest Priority (Hot Sales Call): AI Product, SaaS, ERP
 * High Priority (Warm Follow-up): CRM, Mobile App, Business Automation
 * Medium-High: Web App
 * Medium (Nurture): Business Website, Landing Page
 */
export function calculateLeadScore(serviceType, budget) {
  let score = 50
  let priority = 'Medium'
  let crmStatus = 'Warm Follow-up'

  const type = (serviceType || '').toLowerCase()
  if (type.includes('ai') || type.includes('saas') || type.includes('erp')) {
    score = 90
    priority = 'Highest'
    crmStatus = 'Hot Sales Call'
  } else if (type.includes('crm') || type.includes('mobile') || type.includes('automation') || type.includes('paas')) {
    score = 75
    priority = 'High'
    crmStatus = 'Hot Sales Call'
  } else if (type.includes('custom software') || type.includes('web')) {
    score = 65
    priority = 'Medium-high'
    crmStatus = 'Warm Follow-up'
  }

  // Adjust score based on budget if specified
  if (budget) {
    const b = budget.toLowerCase()
    if (b.includes('50k') || b.includes('25k') || b.includes('100k') || b.includes('enterprise')) {
      score += 10
      crmStatus = 'Hot Sales Call'
    }
  }

  return { score, priority, crmStatus }
}

/**
 * Submit lead with complete tracking metadata
 */
export async function submitLead(formData, contextMeta = {}) {
  const env = getClientEnvironment()
  const utm = getUtmParams()
  const now = new Date()

  const serviceOrProduct = formData.service || formData.productType || contextMeta.service || 'General'
  const scoring = calculateLeadScore(serviceOrProduct, formData.budget)

  const payload = {
    ...formData,
    // Tracking Metadata
    formName: contextMeta.formName || 'Build Your Product Form',
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    landingPage: typeof window !== 'undefined' ? window.location.pathname : '',
    referrerUrl: typeof document !== 'undefined' ? document.referrer : '',
    ctaClicked: contextMeta.ctaClicked || 'Direct Modal',
    service: serviceOrProduct,
    product: formData.product || contextMeta.product || '',
    
    // UTM parameters
    ...utm,

    // Client Environment
    device: env.device,
    browser: env.browser,

    // Submission Timestamps
    submissionDate: now.toISOString().split('T')[0],
    submissionTime: now.toTimeString().split(' ')[0],
    submittedAt: now.toISOString(),

    // Internal Lead Scoring & CRM Status
    leadScore: scoring.score,
    leadPriority: scoring.priority,
    crmStatus: scoring.crmStatus,
  }

  // Check if Supabase or API endpoint is configured
  const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY
  const apiEndpoint = import.meta.env?.VITE_API_ENDPOINT

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Database submission failed: ${response.statusText}`)
      }
      return { success: true, payload }
    } catch (err) {
      console.error('[LeadService] Supabase error:', err)
      return { success: false, error: err.message, payload }
    }
  } else if (apiEndpoint) {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error(`API submission failed: ${response.statusText}`)
      }
      return { success: true, payload }
    } catch (err) {
      console.error('[LeadService] API error:', err)
      return { success: false, error: err.message, payload }
    }
  }

  // If backend is not configured yet in .env, safely queue locally & return success simulation
  // with clear console diagnostics for the developer.
  console.info('[LeadService] Backend not configured. Lead payload captured ready for integration:', payload)
  
  // Store in debug session queue for developer verification
  try {
    const queue = JSON.parse(sessionStorage.getItem('lazy_leads_queue') || '[]')
    queue.push(payload)
    sessionStorage.setItem('lazy_leads_queue', JSON.stringify(queue))
  } catch (e) {
    // Ignore storage restrictions
  }

  return {
    success: true,
    isQueuedLocally: true,
    payload,
    message: 'Lead received and processed with full metadata.',
  }
}
