import React from 'react'
import ScrambleText from './ScrambleText.jsx'

export default function Tag({ text, variant = 'base' }) {
  return (
    <div data-wf--tag--variant={variant} className="tag inline-flex items-center">
      <div>[</div>
      <div className="is-relative scrambled-txt px-0.5">
        <div className="abso-text-scrambled">
          <ScrambleText text={text} />
        </div>
        <div className="visually-hidden">{text}</div>
      </div>
      <div>]</div>
    </div>
  )
}
