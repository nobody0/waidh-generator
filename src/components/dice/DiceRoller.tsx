import { useState } from 'react'
import { Dices } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDiceStore } from '@/store/diceStore'
import { cn } from '@/lib/utils'

interface DiceRollerProps {
  diceCount: number
  className?: string
}

export function DiceRoller({ diceCount, className }: DiceRollerProps) {
  const { addRoll, isRolling, setRolling, soundEnabled } = useDiceStore()
  const [currentRoll, setCurrentRoll] = useState<number[]>([])

  const rollDice = async () => {
    setRolling(true)
    setCurrentRoll([])

    if (soundEnabled) {
      const audio = new Audio('/dice-roll.mp3')
      audio.play().catch(() => {})
    }

    const animationDuration = 1000
    const animationSteps = 10
    const stepDuration = animationDuration / animationSteps

    for (let i = 0; i < animationSteps; i++) {
      const tempRoll = Array.from({ length: diceCount }, () => 
        Math.floor(Math.random() * 6) + 1
      )
      setCurrentRoll(tempRoll)
      await new Promise(resolve => setTimeout(resolve, stepDuration))
    }

    const finalRoll = Array.from({ length: diceCount }, () => 
      Math.floor(Math.random() * 6) + 1
    )
    const total = finalRoll.reduce((sum, die) => sum + die, 0)
    
    setCurrentRoll(finalRoll)
    addRoll(`${diceCount}W6`, finalRoll, total)
    setRolling(false)
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={rollDice}
        disabled={isRolling}
        variant="steel"
        size="sm"
        className="font-medieval"
      >
        <Dices className="w-4 h-4 mr-1" />
        {diceCount}W6
      </Button>
      {currentRoll.length > 0 && (
        <div className="flex gap-2">
          {currentRoll.map((die, index) => (
            <div
              key={index}
              className={cn(
                "w-10 h-10 dice-3d flex items-center justify-center",
                "font-mono text-xl font-bold text-steel-900",
                "border border-steel-400",
                isRolling && "dice-rolling"
              )}
            >
              {die}
            </div>
          ))}
          {!isRolling && (
            <div className="ml-2 flex items-center text-steel-300 font-mono">
              = {currentRoll.reduce((sum, die) => sum + die, 0)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}