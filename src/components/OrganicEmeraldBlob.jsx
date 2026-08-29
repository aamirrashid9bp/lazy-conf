import React, { useEffect, useRef } from 'react'

/**
 * High-performance WebGL / 2D shader rendering the exact organic emerald 3D blob
 * seen in the One Venture reference screenshot for AI / ML and DATABASE cells.
 */
export default function OrganicEmeraldBlob({ className = "w-14 h-14 md:w-16 md:h-16" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      // Fallback to 2D canvas if WebGL is unavailable
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      let animId
      const render2D = (t) => {
        const width = canvas.width
        const height = canvas.height
        ctx.clearRect(0, 0, width, height)
        const cx = width / 2
        const cy = height / 2
        const r = width * 0.35 + Math.sin(t * 0.003) * 3
        const grad = ctx.createRadialGradient(cx - 5, cy - 8, 2, cx, cy, r)
        grad.addColorStop(0, '#2c594c')
        grad.addColorStop(0.4, '#1B3D33')
        grad.addColorStop(0.8, '#142e27')
        grad.addColorStop(1, '#0c1d18')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
        animId = requestAnimationFrame(render2D)
      }
      animId = requestAnimationFrame(render2D)
      return () => cancelAnimationFrame(animId)
    }

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment Shader - Organic Raymarched Metaball with Phong & Specular Emerald Glow
    const fsSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Smooth minimum for blending organic nodes
      float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
      }

      // Signed Distance Field of Organic 3D Blob
      float map(vec3 p) {
        float t = u_time * 0.7;
        
        // Base center sphere
        float d = length(p) - 0.78;
        
        // Organic pulsing lobes
        vec3 p1 = p - vec3(sin(t * 1.2) * 0.38, cos(t * 1.1) * 0.38, sin(t * 0.8) * 0.3);
        float d1 = length(p1) - 0.42;
        
        vec3 p2 = p - vec3(-cos(t * 0.9) * 0.4, -sin(t * 1.3) * 0.35, cos(t * 1.0) * 0.35);
        float d2 = length(p2) - 0.4;
        
        vec3 p3 = p - vec3(cos(t * 1.4) * 0.35, -cos(t * 0.7) * 0.4, -sin(t * 1.1) * 0.35);
        float d3 = length(p3) - 0.38;

        vec3 p4 = p - vec3(sin(t * 0.8 + 2.0) * 0.42, sin(t * 1.5 + 1.0) * 0.35, cos(t * 0.9 + 2.0) * 0.38);
        float d4 = length(p4) - 0.36;

        d = smin(d, d1, 0.28);
        d = smin(d, d2, 0.28);
        d = smin(d, d3, 0.28);
        d = smin(d, d4, 0.28);

        // Surface micro-displacement
        d += sin(p.x * 6.0 + t) * sin(p.y * 6.0 + t) * sin(p.z * 6.0 + t) * 0.035;

        return d;
      }

      // Normal estimation
      vec3 calcNormal(vec3 p) {
        float eps = 0.002;
        return normalize(vec3(
          map(p + vec3(eps, 0.0, 0.0)) - map(p - vec3(eps, 0.0, 0.0)),
          map(p + vec3(0.0, eps, 0.0)) - map(p - vec3(0.0, eps, 0.0)),
          map(p + vec3(0.0, 0.0, eps)) - map(p - vec3(0.0, 0.0, eps))
        ));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Ray origin & direction
        vec3 ro = vec3(0.0, 0.0, 2.4);
        vec3 rd = normalize(vec3(uv, -1.3));

        // Light positions
        vec3 lightPos1 = vec3(1.2, 2.0, 2.0);
        vec3 lightPos2 = vec3(-2.0, -1.0, 1.5);

        float depth = 0.0;
        vec3 col = vec3(0.0);
        float alpha = 0.0;

        for(int i = 0; i < 48; i++) {
          vec3 p = ro + rd * depth;
          float d = map(p);
          if (d < 0.001) {
            vec3 n = calcNormal(p);
            
            // Diffuse
            vec3 l1 = normalize(lightPos1 - p);
            vec3 l2 = normalize(lightPos2 - p);
            float diff1 = max(dot(n, l1), 0.0);
            float diff2 = max(dot(n, l2), 0.0) * 0.4;
            
            // Specular highlights
            vec3 h1 = normalize(l1 - rd);
            float spec1 = pow(max(dot(n, h1), 0.0), 32.0);
            
            // Fresnel rim lighting
            float fresnel = pow(1.0 - max(dot(-rd, n), 0.0), 2.5);

            // Standard brand green palette (#1B3D33 base)
            vec3 baseGreen = vec3(0.106, 0.239, 0.200);
            vec3 darkGreen = vec3(0.045, 0.110, 0.090);
            vec3 brightMint = vec3(0.240, 0.480, 0.410);
            vec3 specHighlight = vec3(0.70, 0.90, 0.85);

            col = mix(darkGreen, baseGreen, diff1 + diff2);
            col += brightMint * fresnel * 0.65;
            col += specHighlight * spec1 * 0.85;

            // Ambient occlusion approximation
            col *= (0.6 + 0.4 * n.y);

            alpha = 1.0;
            break;
          }
          depth += d * 0.8;
          if (depth > 4.5) break;
        }

        gl_FragColor = vec4(col, alpha);
      }
    `

    function createShader(gl, type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }

    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, 'a_position')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_resolution')

    gl.useProgram(program)
    gl.enableVertexAttribArray(aPos)
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let animationId
    let startTime = performance.now()

    const render = () => {
      if (!canvas) return
      const currentTime = (performance.now() - startTime) / 1000.0

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0.0, 0.0, 0.0, 0.0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)
      gl.uniform1f(uTime, currentTime)
      gl.uniform2f(uRes, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      if (program) gl.deleteProgram(program)
      if (vertexShader) gl.deleteShader(vertexShader)
      if (fragmentShader) gl.deleteShader(fragmentShader)
      if (posBuffer) gl.deleteBuffer(posBuffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={128}
      height={128}
      className={`${className} pointer-events-none drop-shadow-[0_0_16px_rgba(27,61,51,0.35)]`}
      style={{ display: 'block' }}
    />
  )
}
