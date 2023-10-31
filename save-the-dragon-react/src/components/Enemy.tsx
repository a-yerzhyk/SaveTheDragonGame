'use client'

import { useState } from "react";
import Image from "next/image";
import useEventManager from "@/hooks/useEventManager";

import skeletonImage from '@/assets/person/skeleton.png'
import dwarfImage from '@/assets/person/dwarf.png'
import guardImage from '@/assets/person/guard.png'
import { ENEMY, EVENTS, PersonID } from "save-the-dragon";
import { classNames } from "@/utils/classNames";

export default function Enemy ({
  id,
  type,
  health,
  maxHealth,
  size = 130,
  onClick
}: {
  id: PersonID
  type: ENEMY
  health: number
  maxHealth: number
  size?: number
  onClick?: () => void
}) {
  const enemyImage = getEnemyImage(type)
  const [enemyHealth, setEnemyHealth] = useState(health)
  const enemyMaxHealth = maxHealth
  const healthPercentage = (enemyHealth / enemyMaxHealth) * 100

  const updateHealth = (targetId: PersonID, type: string, health: number) => {
    if (id === targetId) {
      setEnemyHealth(health)
    }
  }

  useEventManager(EVENTS.damage, updateHealth)

  return (
    <div className="relative">
      <div className="absolute w-full h-2 bg-slate-700 overflow-hidden rounded-lg">
        <div style={{ transform: `translateX(${healthPercentage}%)` }} className="absolute -left-[100%] w-full h-full bg-white transition-transform duration-300"></div>
        <div style={{ transform: `translateX(${healthPercentage}%)` }} className="absolute -left-[100%] w-full h-full hero-stats__health"></div>
      </div>
      <Image
        height={size}
        className={classNames('person_left', typeof onClick !== 'undefined' ? 'cursor-pointer' : '')}
        src={enemyImage}
        alt="enemy"
        onClick={onClick}
      />
    </div>
  )
}

function getEnemyImage (type: ENEMY) {
  switch(type) {
    case ENEMY.GNOME:
      return dwarfImage
    case ENEMY.SKELETON:
      return skeletonImage
    case ENEMY.GUARD:
      return guardImage
  }
}
