import React from 'react'
import ScrambleText from './ScrambleText.jsx'

export default function Tag({ text, variant = 'base' }) {
  return (
    <div data-wf--tag--variant={variant} className="tag inline-flex items-center font-mono text-xs uppercase text-white/80 tracking-wider">
      <span className="text-white/40 font-mono">[</span>
      <span className="is-relative px-1">
        <ScrambleText text={text} />
      </span>
      <span className="text-white/40 font-mono">]</span>
    </div>
  )
}
