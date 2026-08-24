import React from 'react'
import Hero from '../sections/Hero.jsx'
import Clients from '../sections/Clients.jsx'
import WhatWeDo from '../sections/WhatWeDo.jsx'
import OurWorks from '../sections/OurWorks.jsx'
import MotionPath from '../sections/MotionPath.jsx'
import Stats from '../sections/Stats.jsx'
import WhyUs from '../sections/WhyUs.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Founders from '../sections/Founders.jsx' // This is "Our Approach"
import Formula from '../sections/Formula.jsx'
import FAQ from '../sections/FAQ.jsx'
import CTA from '../sections/CTA.jsx'
import Team from '../sections/Team.jsx'
import Contact from '../sections/Contact.jsx'

import useGsapScrollTrigger from '../hooks/useGsapScrollTrigger.js'
import useTextSplitAnim from '../hooks/useTextSplitAnim.js'

export default function Home() {
  // Activate global GSAP and SplitText animations
  useGsapScrollTrigger()
  useTextSplitAnim()

  return (
    <main className="home-page-content relative bg-[#edeef2]">
      <Hero />
      <Clients />
      <Formula />
      <WhatWeDo />
      <OurWorks />
      <Stats />
      <WhyUs />
      <Testimonials />
      <Founders /> {/* Our Approach */}
      <CTA />
      <MotionPath />
      <Team />
      <Contact />
      <FAQ />
    </main>
  )
}
