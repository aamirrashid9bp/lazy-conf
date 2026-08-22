import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import Tag from '../components/Tag.jsx'

export default function MemoryGame() {
  const techSymbols = ['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'Flutter', 'AI Agents', 'Redis', 'Tailwind']
  
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [score, setScore] = useState(0)

  // Initialize 22 cards (11 pairs) around the center hero card
  useEffect(() => {
    const deck = [...techSymbols, ...techSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, id) => ({
        id,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(deck)
  }, [])

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return

    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)

    const newFlipped = [...flippedIndices, index]
    setFlippedIndices(newFlipped)

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped
      if (cards[firstIdx].symbol === cards[secondIdx].symbol) {
        // Matched!
        setTimeout(() => {
          const updatedCards = [...newCards]
          updatedCards[firstIdx].isMatched = true
          updatedCards[secondIdx].isMatched = true
          setCards(updatedCards)
          setMatchedPairs((prev) => {
            const next = [...prev, cards[firstIdx].symbol]
            if (next.length === techSymbols.length) {
              triggerConfetti()
            }
            return next
          })
          setScore((s) => s + 100)
          setFlippedIndices([])
        }, 500)
      } else {
        // Not matched -> flip back
        setTimeout(() => {
          const updatedCards = [...newCards]
          updatedCards[firstIdx].isFlipped = false
          updatedCards[secondIdx].isFlipped = false
          setCards(updatedCards)
          setFlippedIndices([])
        }, 900)
      }
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#CAFF7F', '#5200FF', '#FFFFFF']
    })
  }

  return (
    <section className="section_memory-game py-24 bg-grey-1 relative border-b border-white/5 overflow-hidden">
      <div className="padding-global max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-4">
            <div className="brand-color-purple">
              <Tag text="TECH STACK" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-reckless font-bold text-white">
              Engineered with Modern Technology
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="font-mono text-sm px-4 py-1.5 rounded-full bg-grey-2 border border-white/10 text-brand-green">
              Score: {score}
            </div>
            <button
              onClick={() => {
                const deck = [...techSymbols, ...techSymbols]
                  .sort(() => Math.random() - 0.5)
                  .map((symbol, id) => ({
                    id,
                    symbol,
                    isFlipped: false,
                    isMatched: false,
                  }))
                setCards(deck)
                setFlippedIndices([])
                setMatchedPairs([])
                setScore(0)
              }}
              className="text-xs font-mono text-white/50 hover:text-white underline transition-colors"
            >
              Reset Board
            </button>
          </div>
        </div>

        {/* 23-cell Grid Layout with Hero center card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {cards.slice(0, 11).map((card, idx) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className="aspect-square perspective-1000 cursor-pointer"
            >
              <div
                className={`w-full h-full relative transition-transform duration-500 transform-style-3d rounded-xl border ${
                  card.isFlipped || card.isMatched ? 'rotate-y-180 border-brand-green/40' : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Front of card (Hidden) */}
                <div className="absolute inset-0 backface-hidden bg-grey-2 flex items-center justify-center rounded-xl">
                  <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green/50" />
                  </div>
                </div>

                {/* Back of card (Revealed symbol) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-brand-green text-black flex items-center justify-center p-2 text-center font-mono text-xs sm:text-sm font-bold rounded-xl shadow-lg">
                  {card.symbol}
                </div>
              </div>
            </div>
          ))}

          {/* Center Large Hero Card */}
          <div className="col-span-2 row-span-1 bg-grey-2/80 border border-brand-green/30 p-6 rounded-2xl flex flex-col justify-center items-center text-center space-y-2 backdrop-blur-md">
            <span className="font-mono text-[10px] text-brand-green uppercase tracking-widest">
              [ Interactive Board ]
            </span>
            <h3 className="font-reckless text-lg sm:text-xl font-bold text-white">
              Building should feel like fun?
            </h3>
            <p className="text-xs text-white/60 font-body max-w-xs">
              We craft reliable digital products that move businesses forward.
            </p>
          </div>

          {cards.slice(11, 22).map((card, idx) => {
            const actualIdx = idx + 11
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(actualIdx)}
                className="aspect-square perspective-1000 cursor-pointer"
              >
                <div
                  className={`w-full h-full relative transition-transform duration-500 transform-style-3d rounded-xl border ${
                    card.isFlipped || card.isMatched ? 'rotate-y-180 border-brand-green/40' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="absolute inset-0 backface-hidden bg-grey-2 flex items-center justify-center rounded-xl">
                    <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green/50" />
                    </div>
                  </div>
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-brand-green text-black flex items-center justify-center p-2 text-center font-mono text-xs sm:text-sm font-bold rounded-xl shadow-lg">
                    {card.symbol}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
