'use client'

import { EVENTS } from 'save-the-dragon'
import useEventManager from '@/hooks/useEventManager'
import { useState } from 'react'

export default function HeroStats ({
  health,
  maxHealth,
  strength,
}: {
  health: number
  maxHealth: number
  strength: number
}) {
  const [heroHealth, setHeroHealth] = useState(health)
  const [heroStrength, setHeroStrength] = useState(strength)
  const heroMaxHealth = maxHealth

  const healthPercentage = (heroHealth / heroMaxHealth) * 100

  const updateHealth = (id: number, type: string, health: number) => {
    if (type === 'hero') {
      setHeroHealth(health)
    }
  }

  const updateStrength = (id: number, type: string, strength: number) => {
    if (type === 'hero') {
      setHeroStrength(strength)
    }
  }

  useEventManager(EVENTS.heal, updateHealth)
  useEventManager(EVENTS.damage, updateHealth)
  useEventManager(EVENTS.increaceStrength, updateStrength)

  return (
    <>
      <div className="relative flex justify-center items-center w-full h-full bg-slate-700">
        <div style={{ transform: `translateX(${healthPercentage}%)` }} className="absolute -left-[100%] w-full h-full bg-white transition-transform duration-300"></div>
        <div style={{ transform: `translateX(${healthPercentage}%)` }} className="absolute -left-[100%] w-full h-full hero-stats__health"></div>
        <p
          className="text-lg text-white relative z-10"
          style={{ textShadow: '2px 2px 0px black' }}
        >
          {heroHealth} / {heroMaxHealth}
        </p>
      </div>
    </>
  )
}