import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectsData } from '../data/projects.js'
import Tag from '../components/Tag.jsx'
import useGsapScrollTrigger from '../hooks/useGsapScrollTrigger.js'
import useTextSplitAnim from '../hooks/useTextSplitAnim.js'

export default function ProjectPage() {
  const { projectId } = useParams()
  
  // Normalize projectId (remove .html if present in the link)
  const normalizedId = projectId ? projectId.replace('.html', '') : ''
  const project = projectsData[normalizedId]

  // Activate GSAP scroll animations
  useGsapScrollTrigger([normalizedId])
  useTextSplitAnim([normalizedId])

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [normalizedId])

  if (!project) {
    return (
      <div className="min-h-screen bg-grey-1 text-white flex flex-col items-center justify-center space-y-6">
        <h2 className="text-3xl font-reckless">Product Architecture Not Found</h2>
        <p className="text-white/60">The case study or product you are looking for does not exist.</p>
        <Link to="/" className="px-6 py-2 bg-brand-green text-black rounded-full font-mono text-sm font-bold">
          Return Home
        </Link>
      </div>
    )
  }

  return (
    <div className="project-page-content bg-grey-1 text-white overflow-hidden pt-20">
      
      {/* 1. Hero Section */}
      <section className="section_project-hero relative py-20 border-b border-white/5 overflow-hidden">
        <div className="padding-global max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="container-large">
            <div className="project_hero-section grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Hero Left */}
              <div className="lg:col-span-8 flex flex-col space-y-8">
                <div className="project_tag-section-head-wrap flex items-center space-x-4">
                  <div className={project.colorClass || 'brand-color-purple'}>
                    <Tag text="PROJECT" />
                  </div>
                  <div className="font-mono text-white/50 text-sm">
                    Product: <span className="text-white">{project.client}</span>
                  </div>
                </div>

                <div className="project-hero_heading">
                  <h1 fd-scroll-heading="" className="heading-style-h1 is-project-hero text-4xl md:text-5xl font-reckless leading-tight text-white">
                    {project.heroHeading}
                  </h1>
                </div>
              </div>

              {/* Hero Right - Spec Card list */}
              <div className="lg:col-span-4 lg:pl-8">
                <div className="project-info-card-list grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-6 bg-grey-2 border border-white/5 p-6 rounded-lg">
                  <div className="project-info-card">
                    <div className="project-info-card-title text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Product</div>
                    <p className="text-sm font-semibold">{project.client}</p>
                  </div>
                  <div className="project-info-card">
                    <div className="project-info-card-title text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Category</div>
                    <p className="text-sm font-semibold">{project.category}</p>
                  </div>
                  <div className="project-info-card">
                    <div className="project-info-card-title text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Scope</div>
                    <p className="text-sm font-semibold">{project.scope}</p>
                  </div>
                  <div className="project-info-card">
                    <div className="project-info-card-title text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Deployment</div>
                    <p className="text-sm font-semibold">{project.timeline}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        {/* Background Overlay */}
        <div className="project-hero_bg-wrap absolute inset-0 z-0 pointer-events-none opacity-40 flex items-center justify-center">
          <img
            loading="eager"
            src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69ca29897026a3c2361a4674_project%20hero%20bg.svg"
            alt=""
            className="project-hero_bg-img w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 2. Top Large Image Section */}
      {project.images && project.images.length > 0 && (
        <section className="section_project-images py-10 bg-grey-1 relative border-b border-white/5">
          <div className="padding-global max-w-[1280px] mx-auto px-6">
            <div className="container-large">
              <div className="project-inner-img-listing">
                <div className="porject-inner-img-component aspect-[16/10] overflow-hidden rounded-lg">
                  <img
                    src={project.images[0]}
                    loading="lazy"
                    alt={`${project.client} Showcase 1`}
                    className="porject-inner-img w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Case Overview Section */}
      <section className="section_project-overview py-20 bg-grey-1 relative border-b border-white/5">
        <div className="padding-global max-w-[1280px] mx-auto px-6">
          <div className="container-large">
            <div className="padding-section-medium">
              <div className="div-block-31 flex flex-col space-y-12">
                
                {/* Heading Tags */}
                <div className="project_tag-section-head-wrap flex items-center space-x-4">
                  <div className={project.colorClass || 'brand-color-purple'}>
                    <Tag text="OVERVIEW" />
                  </div>
                  <div className="font-mono text-white/50 text-sm">Overview</div>
                </div>

                <div className="flex flex-col space-y-8">
                  <h2 className="heading-style-h2 text-2xl md:text-4xl font-reckless leading-tight text-white max-w-4xl">
                    {project.overviewHeading}
                  </h2>
                  
                  {/* Two column grid details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                      {project.overviewPara1}
                    </p>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                      {project.overviewPara2}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Secondary Showcase Images Grid */}
      {project.images && project.images.length > 1 && (
        <section className="section_project-images py-10 bg-grey-1 relative border-b border-white/5">
          <div className="padding-global max-w-[1280px] mx-auto px-6">
            <div className="container-large">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.slice(1, 5).map((img, idx) => (
                  <div key={idx} className="porject-inner-img-component aspect-[4/3] overflow-hidden rounded-lg bg-black/20">
                    <img
                      src={img}
                      loading="lazy"
                      alt={`${project.client} Gallery Image ${idx + 2}`}
                      className="porject-inner-img w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Extra Full Width showcase images */}
              {project.images.length > 5 && (
                <div className="mt-8 space-y-8">
                  {project.images.slice(5).map((img, idx) => (
                    <div key={idx} className="porject-inner-img-component aspect-[21/9] overflow-hidden rounded-lg bg-black/20">
                      <img
                        src={img}
                        loading="lazy"
                        alt={`${project.client} Gallery Image ${idx + 6}`}
                        className="porject-inner-img w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. Deliverables / Ownership Section */}
      <section className="section_project-disgnosis py-24 bg-grey-1 relative border-b border-white/5 overflow-hidden">
        <div className="project-section_bg-wrap absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
          <img
            loading="eager"
            src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69ca29897026a3c2361a4674_project%20hero%20bg.svg"
            alt=""
            className="project-section_bg-img w-full h-full object-cover"
          />
        </div>

        <div className="padding-global max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="container-large">
            <div className="padding-section-medium flex flex-col space-y-12">
              
              <div className="div-block-32 flex flex-col space-y-6">
                <div className="project_tag-section-head-wrap flex items-center space-x-4">
                  <div className={project.colorClass || 'brand-color-purple'}>
                    <Tag text="DELIVERABLES" />
                  </div>
                  <div className="font-mono text-white/50 text-sm">WHAT WE DELIVERED</div>
                </div>
                <h2 className="heading-style-h2 text-3xl md:text-5xl font-reckless text-white leading-tight">
                  Where we took ownership.
                </h2>
              </div>

              {/* Diagnosis cards grids list */}
              <div className="project_diagnosis-cards-list grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.diagnosisList.map((card, idx) => (
                  <div
                    key={idx}
                    className="div-block-34 bg-grey-2 border border-white/5 p-6 rounded-lg flex flex-col space-y-4 hover:border-white/10 transition-colors"
                  >
                    <div className="text-block-5 font-mono text-brand-green text-lg font-bold">{card.num}</div>
                    <div className="div-block-35 flex flex-col space-y-2">
                      <div className="text-block-6 font-reckless text-lg font-bold text-white">{card.title}</div>
                      <p className="paragraph-2 text-white/60 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. Case CTA Section */}
      <section className="section_project-cta py-24 bg-grey-1 relative border-b border-white/5 overflow-hidden">
        <div className="project-section_bg-wrap absolute inset-0 z-0 pointer-events-none opacity-40 flex items-center justify-center">
          <img
            loading="eager"
            src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69bd1f03609baec69660d98a_Frame%20199.svg"
            alt=""
            className="project-section_bg-img w-full h-full object-cover"
          />
        </div>

        <div className="padding-global max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="container-large">
            <div className="padding-section-large text-center flex flex-col items-center justify-center space-y-8">
              <h2 fd-scroll-heading="" className="heading-style-h2 text-3xl md:text-5xl font-reckless text-white leading-tight max-w-2xl mx-auto">
                Have a Product in Mind? <br />
                <span className="text-brand-green">Let's Build It.</span>
              </h2>
              <div className="button-group flex items-center justify-center">
                <a
                  href="https://calendar.app.google/mCygswQWvcXfkyLk9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-brand-green text-black hover:bg-brand-green/85 font-mono rounded-full uppercase tracking-wider text-xs font-bold transition-all shadow-lg hover:scale-105"
                >
                  Start Your Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
