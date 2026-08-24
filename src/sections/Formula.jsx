import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import Tag from '../components/Tag.jsx'

export default function Formula() {
  const containerRef0 = useRef(null)
  const containerRef1 = useRef(null)
  const [zerosRemaining, setZerosRemaining] = useState(12)
  const [convertedCount, setConvertedCount] = useState(0)

  const engine0Ref = useRef(null)
  const engine1Ref = useRef(null)

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Events } = Matter

    // Setup Engine 0 (Manual Workflows Sandbox)
    const engine0 = Engine.create({ gravity: { x: 0, y: 1 } })
    engine0Ref.current = engine0
    const w0 = containerRef0.current.clientWidth || 350
    const h0 = containerRef0.current.clientHeight || 280

    const render0 = Render.create({
      element: containerRef0.current,
      engine: engine0,
      options: { width: w0, height: h0, wireframes: false, background: 'transparent' }
    })
    Render.run(render0)
    const runner0 = Runner.create()
    Runner.run(runner0, engine0)

    // Setup Engine 1 (Automated Workflows Sandbox)
    const engine1 = Engine.create({ gravity: { x: 0, y: 1 } })
    engine1Ref.current = engine1
    const w1 = containerRef1.current.clientWidth || 350
    const h1 = containerRef1.current.clientHeight || 280

    const render1 = Render.create({
      element: containerRef1.current,
      engine: engine1,
      options: { width: w1, height: h1, wireframes: false, background: 'transparent' }
    })
    Render.run(render1)
    const runner1 = Runner.create()
    Runner.run(runner1, engine1)

    // Walls for container 0
    const ground0 = Bodies.rectangle(w0/2, h0+20, w0*2, 40, { isStatic: true, render: { visible: false } })
    const left0 = Bodies.rectangle(-20, h0/2, 40, h0*2, { isStatic: true, render: { visible: false } })
    const right0 = Bodies.rectangle(w0+20, h0/2, 40, h0*2, { isStatic: true, render: { visible: false } })
    Composite.add(engine0.world, [ground0, left0, right0])

    // Walls for container 1
    const ground1 = Bodies.rectangle(w1/2, h1+20, w1*2, 40, { isStatic: true, render: { visible: false } })
    const left1 = Bodies.rectangle(-20, h1/2, 40, h1*2, { isStatic: true, render: { visible: false } })
    const right1 = Bodies.rectangle(w1+20, h1/2, 40, h1*2, { isStatic: true, render: { visible: false } })
    Composite.add(engine1.world, [ground1, left1, right1])

    // Spawn 12 initial zero items in container 0
    const zeros = []
    for (let i = 0; i < 12; i++) {
      const b = Bodies.circle(Math.random() * (w0 - 60) + 30, -20 - (i * 30), 20, {
        restitution: 0.8,
        friction: 0.1,
        render: { fillStyle: '#1a1a2e', strokeStyle: '#333', lineWidth: 1 }
      })
      b.isZero = true
      zeros.push(b)
    }
    Composite.add(engine0.world, zeros)

    // Custom text drawing for 0
    Events.on(render0, 'afterRender', () => {
      const ctx = render0.context
      if (!ctx) return
      const bodies = Composite.allBodies(engine0.world)
      bodies.forEach(b => {
        if (b.isZero) {
          ctx.save()
          ctx.translate(b.position.x, b.position.y)
          ctx.rotate(b.angle)
          ctx.fillStyle = '#666'
          ctx.font = 'bold 16px "Martian Mono", monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('0', 0, 0)
          ctx.restore()
        }
      })
    })

    // Custom text drawing for 1 in container 1
    Events.on(render1, 'afterRender', () => {
      const ctx = render1.context
      if (!ctx) return
      const bodies = Composite.allBodies(engine1.world)
      bodies.forEach(b => {
        if (b.isOne) {
          ctx.save()
          ctx.translate(b.position.x, b.position.y)
          ctx.rotate(b.angle)
          ctx.fillStyle = '#000'
          ctx.font = 'bold 16px "Martian Mono", monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('1', 0, 0)
          ctx.restore()
        }
      })
    })

    return () => {
      Runner.stop(runner0)
      Render.stop(render0)
      Composite.clear(engine0.world)
      Engine.clear(engine0)

      Runner.stop(runner1)
      Render.stop(render1)
      Composite.clear(engine1.world)
      Engine.clear(engine1)
    }
  }, [])

  const handleConvertOne = () => {
    if (!engine0Ref.current || !engine1Ref.current) return
    const bodies0 = Matter.Composite.allBodies(engine0Ref.current.world).filter(b => b.isZero)
    if (bodies0.length === 0) return

    const targetBody = bodies0[0]
    Matter.Composite.remove(engine0Ref.current.world, targetBody)
    setZerosRemaining(prev => prev - 1)
    setConvertedCount(prev => prev + 1)

    // Add "1" body to engine 1
    const w1 = containerRef1.current?.clientWidth || 350
    const oneBody = Matter.Bodies.circle(Math.random() * (w1 - 60) + 30, -20, 20, {
      restitution: 0.8,
      friction: 0.1,
      render: { fillStyle: '#2F6F5E' }
    })
    oneBody.isOne = true
    Matter.Composite.add(engine1Ref.current.world, oneBody)
  }

  return (
    <section className="section_formula py-28 md:py-36 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20 md:mb-28">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-reckless font-normal text-white leading-tight tracking-tight">
              Turning Complex Workflows <br />
              <span className="text-brand-green">Into Automated Software.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col space-y-5 pt-1">
            <Tag text="lazy" />
            <p split-para="" className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed">
              We systematically convert manual bottlenecks, disconnected spreadsheets, and repetitive tasks into high-performance, automated software products.
            </p>
          </div>
        </div>

        {/* Dual Physics Interactive Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Box: Manual / Zeros */}
          <div className="lg:col-span-5 bg-grey-2 border border-white/10 p-6 flex flex-col justify-between h-[360px] relative overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                Manual Workflows
              </span>
              <span className="font-mono text-xs text-white/40">
                {zerosRemaining} Remaining
              </span>
            </div>
            <div ref={containerRef0} className="absolute inset-0 z-0" />
            <div className="z-10 font-mono text-[11px] text-white/30">
              Repetitive operations · Spreadsheets · Disconnected tools
            </div>
          </div>

          {/* Center Action Button */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-4">
            <button
              onClick={handleConvertOne}
              disabled={zerosRemaining === 0}
              className={`px-6 py-4 font-mono text-xs uppercase tracking-wider font-bold transition-colors ${
                zerosRemaining > 0 
                  ? 'bg-brand-green text-black hover:bg-brand-green/85' 
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              {zerosRemaining > 0 ? 'Automate →' : 'All Automated'}
            </button>
            <span className="font-mono text-[10px] text-white/30 text-center">
              Click to automate workflow
            </span>
          </div>

          {/* Right Box: Automated / Ones */}
          <div className="lg:col-span-5 bg-grey-2 border border-white/10 p-6 flex flex-col justify-between h-[360px] relative overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-xs text-brand-green/70 uppercase tracking-wider">
                Automated Software
              </span>
              <span className="font-mono text-xs text-brand-green/70">
                {convertedCount} Built
              </span>
            </div>
            <div ref={containerRef1} className="absolute inset-0 z-0" />
            <div className="z-10 font-mono text-[11px] text-brand-green/50">
              Scalable code · Custom CRM/ERP · AI Agents
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
