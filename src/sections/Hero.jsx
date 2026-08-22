import React, { useEffect, useRef } from 'react'
import Matter from 'matter-js'
import Tag from '../components/Tag.jsx'

export default function Hero() {
  const sceneRef = useRef(null)
  const engineRef = useRef(null)
  const renderRef = useRef(null)
  const runnerRef = useRef(null)

  useEffect(() => {
    const container = sceneRef.current
    if (!container) return

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter

    // 1. Create Engine
    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 }
    })
    engineRef.current = engine

    const width = container.clientWidth || 800
    const height = container.clientHeight || 500

    // 2. Create Renderer
    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
        showSleeping: false,
      }
    })
    renderRef.current = render
    Render.run(render)

    // 3. Create Runner
    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)

    // 4. Create Boundaries
    const wallOptions = { isStatic: true, render: { visible: false } }
    const ground = Bodies.rectangle(width / 2, height + 30, width * 2, 60, wallOptions)
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions)
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions)
    Composite.add(engine.world, [ground, leftWall, rightWall])

    // 5. Letter Bodies configuration (LazyDeveloper brand letters L-A-Z-Y-D-E-V)
    const letters = [
      { text: 'L', color: '#CAFF7F', textColor: '#000000', size: 64, x: width * 0.2 },
      { text: 'A', color: '#CAFF7F', textColor: '#000000', size: 68, x: width * 0.32 },
      { text: 'Z', color: '#1B1B1B', textColor: '#CAFF7F', size: 62, x: width * 0.44 },
      { text: 'Y', color: '#CAFF7F', textColor: '#000000', size: 66, x: width * 0.56 },
      { text: 'D', color: '#1B1B1B', textColor: '#CAFF7F', size: 64, x: width * 0.68 },
      { text: 'E', color: '#CAFF7F', textColor: '#000000', size: 60, x: width * 0.78 },
      { text: 'V', color: '#CAFF7F', textColor: '#000000', size: 66, x: width * 0.88 },
    ]

    const letterBodies = []

    letters.forEach((item, index) => {
      const dropY = -50 - (index * 80)
      const body = Bodies.rectangle(item.x, dropY, item.size, item.size, {
        restitution: 0.7,
        friction: 0.1,
        chamfer: { radius: 12 },
        render: {
          fillStyle: item.color,
        }
      })
      body.letterText = item.text
      body.letterTextColor = item.textColor
      body.letterSize = item.size
      letterBodies.push(body)
    })

    Composite.add(engine.world, letterBodies)

    // 6. Custom Canvas Text Drawing on AfterRender
    Events.on(render, 'afterRender', () => {
      const ctx = render.context
      if (!ctx) return

      letterBodies.forEach(body => {
        const { x, y } = body.position
        const angle = body.angle

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(angle)
        ctx.fillStyle = body.letterTextColor || '#000000'
        ctx.font = `900 ${body.letterSize * 0.65}px "Plus Jakarta Sans", sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(body.letterText, 0, 0)
        ctx.restore()
      })
    })

    // 7. Mouse drag constraint
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })
    Composite.add(engine.world, mouseConstraint)
    render.mouse = mouse

    // 8. Responsive resize handler
    const handleResize = () => {
      if (!container || !render) return
      const newWidth = container.clientWidth || 800
      const newHeight = container.clientHeight || 500

      render.canvas.width = newWidth
      render.canvas.height = newHeight
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 30 })
      Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: newHeight / 2 })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      Runner.stop(runner)
      Render.stop(render)
      Composite.clear(engine.world)
      Engine.clear(engine)
    }
  }, [])

  return (
    <header className="section_hero relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden border-b border-white/5">
      {/* Background Subtle Gradient & Lines */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 z-0" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 flex items-center justify-center">
        <img
          src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69be374f1bc0f15c70ce04be_hero%20lines%201.svg"
          alt=""
          className="w-full h-full object-cover select-none"
        />
      </div>

      <div className="padding-global max-w-[1280px] mx-auto px-6 relative z-10 w-full flex-1 flex flex-col justify-between">
        
        {/* Top Tag & Eyebrow */}
        <div className="hero_top flex items-center justify-between pt-4">
          <div className="hero_tag-wrap flex items-center space-x-3">
            <Tag text="SOFTWARE PRODUCTS · ENGINEERING · AUTOMATION · AI" />
          </div>
          <div className="hidden sm:flex items-center space-x-2 font-mono text-xs text-white/50">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span>Accepting New Projects</span>
          </div>
        </div>

        {/* Hero Main Copy & Physics Canvas Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12">
          
          {/* Left Main Typography */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <h1
              fd-scroll-heading=""
              className="text-4xl sm:text-5xl md:text-6xl font-reckless font-bold leading-[1.1] text-white tracking-tight"
            >
              We Build Software That Moves Businesses Forward.
            </h1>

            <p split-para="" className="text-base sm:text-lg text-white/70 max-w-2xl font-body leading-relaxed">
              LazyDeveloper TechEd is a software product development company helping startups, SMEs and enterprises turn ideas, business processes and complex problems into scalable digital products.
            </p>

            <p className="text-sm text-white/50 max-w-2xl font-body leading-relaxed">
              From mobile apps and websites to SaaS, PaaS, CRM, ERP, automation and AI-powered products, we design, build, launch and scale technology that works for real businesses.
            </p>

            {/* Action Buttons */}
            <div child-fade-in="" className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://calendar.app.google/mCygswQWvcXfkyLk9"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider bg-brand-green text-black hover:bg-brand-green/90 font-bold transition-all shadow-lg hover:scale-105"
              >
                Build Your Product
              </a>
              <a
                href="#what-we-do-section"
                className="px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 border border-white/10 font-medium transition-all"
              >
                Talk to an Expert
              </a>
            </div>
          </div>

          {/* Right Physics Falling Letters Canvas */}
          <div className="lg:col-span-5 relative h-[360px] md:h-[420px] rounded-2xl bg-grey-2/40 border border-white/10 backdrop-blur-sm overflow-hidden flex flex-col justify-end p-4">
            <div className="absolute top-4 left-4 font-mono text-[10px] text-white/40 uppercase tracking-widest pointer-events-none">
              Interactive Physics Sandbox // Drag to play
            </div>
            
            <div
              ref={sceneRef}
              className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
            />
          </div>

        </div>

        {/* Bottom Hero Metric Pills */}
        <div child-fade-in="" className="hero_bottom pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div>
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Product Strategy</div>
            <div className="font-reckless text-lg text-white font-semibold">User & Workflow First</div>
          </div>
          <div>
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Engineering</div>
            <div className="font-reckless text-lg text-white font-semibold">End-to-End Delivery</div>
          </div>
          <div>
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Automation</div>
            <div className="font-reckless text-lg text-white font-semibold">Repetitive to Auto</div>
          </div>
          <div>
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider">AI Integration</div>
            <div className="font-reckless text-lg text-white font-semibold">Measurable ROI</div>
          </div>
        </div>

      </div>
    </header>
  )
}
