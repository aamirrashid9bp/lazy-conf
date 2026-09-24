import React from 'react'
import Hero from '../sections/Hero.jsx'
import Clients from '../sections/Clients.jsx'
import TwoBuilders from '../sections/TwoBuilders.jsx'
import Formula from '../sections/Formula.jsx'
import WhatWeDo from '../sections/WhatWeDo.jsx'
import OurWorks from '../sections/OurWorks.jsx'
import Portfolio from '../sections/Portfolio.jsx'
import CaseStudies from '../sections/CaseStudies.jsx'
import Stats from '../sections/Stats.jsx'
import WhyUs from '../sections/WhyUs.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Founders from '../sections/Founders.jsx'
import CTA from '../sections/CTA.jsx'
import Team from '../sections/Team.jsx'
import Contact from '../sections/Contact.jsx'
import FAQ from '../sections/FAQ.jsx'

import useGsapScrollTrigger from '../hooks/useGsapScrollTrigger.js'
import useTextSplitAnim from '../hooks/useTextSplitAnim.js'

export default function Home() {
  // Activate global GSAP and SplitText animations
  useGsapScrollTrigger()
  useTextSplitAnim()

  return (
    <main className="home-page-content relative bg-black text-white selection:bg-brand-green selection:text-black">
      <Hero />
      <Clients />
      <TwoBuilders />
      <Formula />
      <WhatWeDo />
      <OurWorks />
      <Portfolio />
      <CaseStudies />
      <Stats />
      <WhyUs />
      <Testimonials />
      <Founders /> {/* Our Approach */}
      <CTA /> {/* Process / CTA */}
      <Team />
      <Contact />
      <FAQ />
    </main>
  )
}

