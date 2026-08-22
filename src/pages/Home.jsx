import React from 'react'
import Hero from '../sections/Hero.jsx'
import Clients from '../sections/Clients.jsx'
import Founders from '../sections/Founders.jsx'
import MemoryGame from '../sections/MemoryGame.jsx'
import WhatWeDo from '../sections/WhatWeDo.jsx'
import OurWorks from '../sections/OurWorks.jsx'
import MotionPath from '../sections/MotionPath.jsx'
import Stats from '../sections/Stats.jsx'
import WhyUs from '../sections/WhyUs.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Formula from '../sections/Formula.jsx'
import FAQ from '../sections/FAQ.jsx'

import useGsapScrollTrigger from '../hooks/useGsapScrollTrigger.js'
import useTextSplitAnim from '../hooks/useTextSplitAnim.js'

export default function Home() {
  // Activate global GSAP and SplitText animations
  useGsapScrollTrigger()
  useTextSplitAnim()

  return (
    <main className="home-page-content relative overflow-hidden bg-grey-1">
      <Hero />
      <Clients />
      <Founders />
      <MemoryGame />
      <WhatWeDo />
      <OurWorks />
      <MotionPath />
      <Stats />
      <WhyUs />
      <Testimonials />
      <Formula />
      <FAQ />
    </main>
  )
}
