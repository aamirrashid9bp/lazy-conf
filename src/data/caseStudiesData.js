export const CASE_STUDIES = [
  {
    id: 'payvelocity-core',
    name: 'PayVelocity Core',
    subtitle: 'High-Concurrency Global Settlement & Reconciliation Engine',
    industry: 'FinTech / Infrastructure',
    tagline: 'Processing multi-currency payouts at sub-100ms latency with cryptographic ledger auditing.',
    image: '/portfolio_nexa_metrics.jpg',
    secondaryImages: [
      '/portfolio_nexa_metrics.jpg',
      '/portfolio_atlas_erp.jpg',
      '/portfolio_omniflow_crm.jpg'
    ],
    challenge: 'Legacy batch reconciliation pipelines suffered from 4.8% failure rates, manual audit backlogs, and multi-day settlement delays across 12 countries during high-volume commercial events.',
    solution: 'Engineered an event-driven distributed settlement engine with sub-100ms real-time double-entry ledgers, automated webhook verification, and fault-tolerant queue retries.',
    result: 'Achieved +340% transaction throughput capacity, 99.995% service uptime, zero ledger discrepancies, and $42M+ in monthly automated reconciliations.',
    tags: ['REACT', 'FASTAPI', 'POSTGRESQL', 'REDIS', 'KAFKA'],
    sections: {
      overview: {
        num: '01',
        title: 'Overview',
        content: 'PayVelocity operates critical cross-border remittance and payment clearing rails for modern B2B marketplaces. As monthly transaction volume surged past $15M, their legacy monolith architecture began experiencing synchronization drift between gateway settlements and merchant account balances. LazyDeveloper was engaged to rebuild their settlement engine from the ground up.'
      },
      challenge: {
        num: '02',
        title: 'The Challenge',
        content: 'The core challenge lay in guaranteeing idempotent transaction execution across volatile external payment gateway webhooks. Multiple payment retries often created race conditions, duplicate authorization holds, and lengthy manual reconciliation reconciliations that frustrated institutional finance teams.'
      },
      approach: {
        num: '03',
        title: 'Our Approach',
        content: 'We adopted an event-driven architecture centered on immutable append-only ledgers and distributed locking. Every transaction was decomposed into distinct state machines with cryptographic checksums, guaranteeing that external gateway callbacks could never execute out of sequence or cause balance drift.'
      },
      productDesign: {
        num: '04',
        title: 'Product Design',
        content: 'We designed a low-cognitive-load financial console specifically for treasury managers and compliance officers. Featuring live telemetry feeds, visual transaction lineage graphs, instant discrepancy drill-downs, and one-click reversal audits.'
      },
      development: {
        num: '05',
        title: 'Development',
        content: 'The backend was engineered in high-throughput FastAPI and PostgreSQL with partition pruning, fronted by Redis clusters for atomic sub-millisecond balance checks. Frontend clients were built with React, Vite, and high-frequency WebSocket streams to visualize live transaction volume without UI stutter.'
      },
      results: {
        num: '06',
        title: 'Results',
        metrics: [
          { label: 'Throughput Increase', value: '+340%' },
          { label: 'Average Settlement Latency', value: '<85ms' },
          { label: 'Uptime Reliability', value: '99.995%' },
          { label: 'Reconciled Monthly', value: '$42M+' }
        ],
        content: 'Within 60 days of production deployment, PayVelocity eliminated all manual weekend ledger reconciliation backlogs, achieved SOC2 compliance readiness, and expanded operations into 8 additional emerging markets without increasing engineering headcount.'
      },
      techStack: {
        num: '07',
        title: 'Technology Stack',
        stack: [
          { category: 'Frontend', items: ['React 18', 'Tailwind CSS', 'Vite', 'Lucide Icons'] },
          { category: 'Backend & APIs', items: ['FastAPI (Python)', 'Node.js', 'WebSockets', 'Celery'] },
          { category: 'Data & Queues', items: ['PostgreSQL (TimescaleDB)', 'Redis Streams', 'Apache Kafka'] },
          { category: 'DevOps & Cloud', items: ['Docker', 'AWS ECS', 'Cloudflare Edge', 'Terraform'] }
        ]
      }
    }
  },
  {
    id: 'pulsesync-health-os',
    name: 'PulseSync Health OS',
    subtitle: 'HIPAA-Compliant Unified Clinical Telemetry & Triage Platform',
    industry: 'Healthcare / SaaS',
    tagline: 'Connecting clinical patient biometrics with automated provider triage and diagnostic workflows.',
    image: '/portfolio_aether_mobile.jpg',
    secondaryImages: [
      '/portfolio_aether_mobile.jpg',
      '/portfolio_cortex_ai.jpg',
      '/portfolio_nexa_metrics.jpg'
    ],
    challenge: 'Fragmented hospital EHR silos and slow manual patient triage caused diagnostic bottlenecks, nurse burnout, and average triage turnaround times of over 45 minutes.',
    solution: 'Designed and built a HIPAA-compliant unified clinical workstation with real-time biometric telemetry ingestion, automated severity scoring, and instant physician escalations.',
    result: 'Reduced patient triage turnaround by 62%, achieved 100% HIPAA audit compliance, and scaled across 45+ regional clinical care facilities.',
    tags: ['NEXT.JS', 'PYTHON', 'FASTAPI', 'WEBSOCKETS', 'TAILWIND'],
    sections: {
      overview: {
        num: '01',
        title: 'Overview',
        content: 'PulseSync connects hospital outpatient networks, remote health devices, and urgent care clinics into a single synchronized operating system. The platform coordinates inbound patient vitals, clinical appointment routing, and secure medical history feeds directly to attending physicians.'
      },
      challenge: {
        num: '02',
        title: 'The Challenge',
        content: 'Medical staff had to navigate through 3 separate legacy desktop applications to check patient vitals, verify insurance eligibility, and log diagnostic notes. The delay created severe clinical queuing during morning intake spikes.'
      },
      approach: {
        num: '03',
        title: 'Our Approach',
        content: 'We ran deep shadowing sessions with triage nurses and ER coordinators to map the ideal 3-minute intake workflow. We replaced disconnected legacy forms with unified real-time telemetry dashboards and reactive triage queues that surface critical vital anomalies instantly.'
      },
      productDesign: {
        num: '04',
        title: 'Product Design',
        content: 'Clean high-contrast dark theme designed for clinical environments with rapid visual hierarchy. High-priority patient vital indicators use unmistakable status tokens and animated waveform monitors for zero ambiguity under stress.'
      },
      development: {
        num: '05',
        title: 'Development',
        content: 'Engineered with Next.js and Tailwind CSS on the frontend, powered by an asynchronous Python/FastAPI backend with end-to-end encrypted WebSocket connections. Database queries were optimized with strict role-based audit logging for HIPAA certification.'
      },
      results: {
        num: '06',
        title: 'Results',
        metrics: [
          { label: 'Triage Turnaround Reduction', value: '-62%' },
          { label: 'Clinical Intake Time', value: '2.8 min' },
          { label: 'Facility Adoption', value: '45+ Clinics' },
          { label: 'Uptime & Compliance', value: '100% HIPAA' }
        ],
        content: 'Clinical staff reported an 80% reduction in daily repetitive data re-entry, while patient wait times across 45 partner clinics dropped from 48 minutes to under 18 minutes.'
      },
      techStack: {
        num: '07',
        title: 'Technology Stack',
        stack: [
          { category: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'] },
          { category: 'Backend & Streaming', items: ['Python FastAPI', 'WebSockets', 'gRPC', 'Pydantic'] },
          { category: 'Data & Security', items: ['PostgreSQL with Row-Level Security', 'AES-256 Encryption', 'Redis'] },
          { category: 'Infrastructure', items: ['HIPAA-Eligible AWS GovCloud', 'Docker', 'Datadog'] }
        ]
      }
    }
  },
  {
    id: 'velo-logistics-commerce',
    name: 'Velo Logistics & Commerce',
    subtitle: 'High-Velocity Headless Commerce & Multi-Warehouse Dispatch Engine',
    industry: 'E-Commerce / Supply Chain',
    tagline: 'Delivering sub-second checkout speeds and real-time inventory synchronization across multi-node fulfillment centers.',
    image: '/portfolio_vesper_commerce.jpg',
    secondaryImages: [
      '/portfolio_vesper_commerce.jpg',
      '/portfolio_atlas_erp.jpg',
      '/portfolio_omniflow_crm.jpg'
    ],
    challenge: 'High concurrency flash sale spikes caused stock desynchronization, cart checkout failures, and costly overselling across 6 regional fulfillment warehouses.',
    solution: 'Architected an edge-cached headless commerce platform with atomic inventory reservation locks, serverless checkout routes, and automated carrier route selection.',
    result: 'Achieved 4.2x faster checkout velocity, 0% inventory oversell rate during Black Friday spikes, and 28% higher conversion on mobile devices.',
    tags: ['REACT', 'NODE.JS', 'REDIS', 'GRAPHQL', 'STRIPE'],
    sections: {
      overview: {
        num: '01',
        title: 'Overview',
        content: 'Velo provides modern luxury brands with an ultra-responsive global e-commerce frontend combined with an automated multi-location supply chain backend. They needed a unified solution capable of handling millions of simultaneous product page views without latency spikes.'
      },
      challenge: {
        num: '02',
        title: 'The Challenge',
        content: 'During peak seasonal drops, thousands of buyers attempted to check out limited-edition inventory within seconds. Their monolithic Shopify setup suffered from API rate-limiting, database deadlocks, and inaccurate warehouse stock counts.'
      },
      approach: {
        num: '03',
        title: 'Our Approach',
        content: 'We designed a headless architecture decoupling the static edge storefront from the real-time order processing pipeline. Inventory reservations were moved into distributed Redis locks with automatic 10-minute expiration windows, preventing stock lockouts and overselling.'
      },
      productDesign: {
        num: '04',
        title: 'Product Design',
        content: 'An editorial luxury aesthetic with ultra-slick micro-interactions, smooth slide-out cart drawers, 1-click Apple Pay/Google Pay checkout, and real-time inventory velocity badges that create authentic urgency.'
      },
      development: {
        num: '05',
        title: 'Development',
        content: 'Built using React and Vite deployed to edge CDN nodes worldwide, talking to a Node.js GraphQL API gateway and Redis caching layer. Carrier shipping rates and tax calculations were calculated in parallel in under 120ms.'
      },
      results: {
        num: '06',
        title: 'Results',
        metrics: [
          { label: 'Checkout Velocity Increase', value: '4.2x' },
          { label: 'Oversell Incident Rate', value: '0.0%' },
          { label: 'Mobile Conversion Lift', value: '+28%' },
          { label: 'Peak Load P99 Latency', value: '110ms' }
        ],
        content: 'During their highest volume annual campaign, Velo seamlessly processed over 180,000 orders in 4 hours with 100% uptime and zero order cancellation disputes.'
      },
      techStack: {
        num: '07',
        title: 'Technology Stack',
        stack: [
          { category: 'Storefront', items: ['React 18', 'Vite', 'Tailwind CSS', 'Lenis Scroll'] },
          { category: 'API & Microservices', items: ['Node.js (TypeScript)', 'GraphQL', 'Stripe Elements', 'Fastify'] },
          { category: 'State & Caching', items: ['Redis Cluster', 'PostgreSQL', 'Algolia Search'] },
          { category: 'Edge & Cloud', items: ['Cloudflare Workers', 'AWS Fargate', 'GitHub Actions'] }
        ]
      }
    }
  }
]
