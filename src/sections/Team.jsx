import React from 'react'
import Tag from '../components/Tag.jsx'

export default function Team() {
  const teamMembers = [
    { name: "Demo Member", role: "Software Engineer", image: "/team_member1.jpg" },
    { name: "Demo Member", role: "Lead Designer", image: "/team_member2.jpg" },
    { name: "Demo Member", role: "Product Manager", image: "/team_member3.jpg" },
    { name: "Demo Member", role: "Backend Engineer", image: "/team_member4.jpg" }
  ]

  return (
    <section id="team-section" className="relative bg-[#060611] text-white py-16 md:py-24 lg:py-28 border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-xl flex flex-col space-y-6">
            <Tag text="lazy" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] tracking-tight">
              The <span className="text-brand-green italic font-reckless">Team.</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-white/50 font-sans font-light leading-relaxed max-w-sm">
            A collective of engineers, designers, and strategists building the future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-square bg-[#090914] border border-white/10 mb-6 overflow-hidden relative transition-colors duration-500 group-hover:border-white/30">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-white/20 uppercase tracking-widest transition-transform duration-700 group-hover:scale-105 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    [ Placeholder ]
                  </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </div>
              <h3 className="text-2xl font-reckless font-normal text-white mb-2">{member.name}</h3>
              <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
