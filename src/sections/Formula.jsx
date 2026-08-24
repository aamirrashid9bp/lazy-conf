import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import Tag from '../components/Tag.jsx'

export default function Formula() {
  const sceneRef = useRef(null)
  const engineRef = useRef(null)
  const renderRef = useRef(null)
  const runnerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Physics Setup
  useEffect(() => {
    if (!sceneRef.current) return

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite

    const engine = Engine.create()
    engineRef.current = engine
    
    // Adjust gravity for a floating, premium feel
    engine.world.gravity.y = 0.6

    const width = sceneRef.current.clientWidth
    const height = sceneRef.current.clientHeight

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
    })
    renderRef.current = render

    // Boundaries
    const wallOptions = { 
      isStatic: true, 
      render: { fillStyle: 'transparent' }
    }
    const ground = Bodies.rectangle(width / 2, height + 60, width + 100, 120, wallOptions)
    const leftWall = Bodies.rectangle(-60, height / 2, 120, height * 2, wallOptions)
    const rightWall = Bodies.rectangle(width + 60, height / 2, 120, height * 2, wallOptions)
    const ceiling = Bodies.rectangle(width / 2, -60, width + 100, 120, wallOptions)

    World.add(engine.world, [ground, leftWall, rightWall, ceiling])

    // Create branded blocks
    const createBlocks = () => {
      const blocks = []
      // LazyDeveloper brand colors: dark teal, light teal, dark grey, black, off-white
      const colors = ['#0d9488', '#2F6F5E', '#115e59', '#1e293b', '#edeef2']
      
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * (width - 100) + 50
        const y = -(Math.random() * 800) - 100
        const size = Math.random() * 50 + 40
        
        const shapeType = Math.random()
        const color = colors[Math.floor(Math.random() * colors.length)]
        
        let body
        if (shapeType > 0.6) {
          body = Bodies.circle(x, y, size / 2, {
            restitution: 0.8,
            friction: 0.05,
            density: 0.04,
            render: {
              fillStyle: color,
              strokeStyle: '#ffffff20',
              lineWidth: 1
            }
          })
        } else if (shapeType > 0.3) {
          body = Bodies.polygon(x, y, 6, size / 2, {
            restitution: 0.6,
            friction: 0.1,
            density: 0.04,
            render: {
              fillStyle: color,
              strokeStyle: '#ffffff20',
              lineWidth: 1
            }
          })
        } else {
          body = Bodies.rectangle(x, y, size, size, {
            restitution: 0.5,
            friction: 0.2,
            density: 0.05,
            chamfer: { radius: 8 },
            render: {
              fillStyle: color,
              strokeStyle: '#ffffff20',
              lineWidth: 1
            }
          })
        }
        blocks.push(body)
      }
      return blocks
    }

    const blocks = createBlocks()
    World.add(engine.world, blocks)

    // Interactive mouse control
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false }
      }
    })

    World.add(engine.world, mouseConstraint)
    render.mouse = mouse

    // Run engine
    Render.run(render)
    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)

    // Handle Resize
    const handleResize = () => {
      if (!sceneRef.current || !renderRef.current) return
      const newWidth = sceneRef.current.clientWidth
      const newHeight = sceneRef.current.clientHeight
      
      renderRef.current.canvas.width = newWidth
      renderRef.current.canvas.height = newHeight
      
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 60 })
      Matter.Body.setPosition(rightWall, { x: newWidth + 60, y: newHeight / 2 })
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -60 })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      Render.stop(render)
      Runner.stop(runner)
      if (engineRef.current) {
        World.clear(engineRef.current.world)
        Engine.clear(engineRef.current)
      }
      if (render.canvas) {
        render.canvas.remove()
      }
    }
  }, [])

  // Anti-gravity impulse
  const handleInteraction = () => {
    if (!engineRef.current) return
    const bodies = Composite.allBodies(engineRef.current.world)
    
    bodies.forEach(body => {
      if (!body.isStatic) {
        const forceMagnitude = 0.15 * body.mass
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * forceMagnitude,
          y: -forceMagnitude
        })
      }
    })
  }

  return (
    <section 
      className="relative bg-[#060611] text-white py-16 md:py-24 lg:py-28 overflow-hidden border-b border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none grid grid-cols-6 h-full z-0">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <Tag text="lazy" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-reckless font-normal leading-[1.05] tracking-tight">
              Building Should Feel Like <span className="text-brand-green italic font-reckless">Fun.</span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-sans font-light leading-relaxed">
              We abstract away the complexity of digital transformation, replacing disconnected workflows and messy codebases with elegant, functional systems. 
            </p>
            <div className="pt-8">
              <button 
                onClick={handleInteraction}
                className="group relative px-6 py-4 bg-transparent text-white font-mono text-xs uppercase tracking-widest border border-white/20 hover:border-brand-green transition-colors overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Toss Blocks</span>
                <div className="absolute inset-0 bg-brand-green translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </div>
          </div>

          {/* Interactive Canvas Container */}
          <div className="lg:col-span-7 relative h-[500px] lg:h-[650px] w-full border border-white/10 bg-[#090914] overflow-hidden rounded-sm group cursor-crosshair">
            <div className={`absolute top-6 left-6 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-40 text-brand-green'}`}>
              <div className="flex items-center space-x-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest">Interactive Sandbox</span>
              </div>
            </div>
            
            <div ref={sceneRef} className="absolute inset-0 w-full h-full" />
          </div>

        </div>
      </div>
    </section>
  )
}
