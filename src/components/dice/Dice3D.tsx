import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import { SingleDice3D } from './SingleDice3D'
import { CriticalEffect } from './CriticalEffect'
import { useDiceSound } from '@/hooks/useDiceSound'
import { cn } from '@/lib/utils'

interface Dice3DProps {
  type: '1d6' | '2d6' | '3d6'
  onRollComplete?: (results: number[]) => void
  trigger?: number
  className?: string
}

export function Dice3D({ type, onRollComplete, trigger, className }: Dice3DProps) {
  const [results, setResults] = useState<number[]>([])
  const [completedDice, setCompletedDice] = useState<Set<number>>(new Set())
  const [showCritical, setShowCritical] = useState<'success' | 'failure' | null>(null)
  const { playDiceSound } = useDiceSound()
  
  const diceCount = parseInt(type[0])
  
  useEffect(() => {
    if (trigger) {
      setResults([])
      setCompletedDice(new Set())
      setShowCritical(null)
      playDiceSound('roll')
    }
  }, [trigger, playDiceSound])
  
  const handleDiceComplete = (index: number, result: number) => {
    setResults(prev => {
      const newResults = [...prev]
      newResults[index] = result
      return newResults
    })
    
    setCompletedDice(prev => {
      const newSet = new Set(prev)
      newSet.add(index)
      
      if (newSet.size === diceCount) {
        const finalResults = []
        for (let i = 0; i < diceCount; i++) {
          finalResults.push(results[i] || 1)
        }
        finalResults[index] = result
        
        // Check for critical rolls (3d6 only)
        if (type === '3d6') {
          const total = finalResults.reduce((sum, val) => sum + val, 0)
          if (total === 3) {
            setShowCritical('failure')
            playDiceSound('critical')
          } else if (total === 18) {
            setShowCritical('success')
            playDiceSound('critical')
          } else {
            playDiceSound('land')
          }
        } else {
          playDiceSound('land')
        }
        
        if (onRollComplete) {
          onRollComplete(finalResults)
        }
      }
      
      return newSet
    })
  }
  
  return (
    <div className={cn(
      "dice-container flex gap-4 justify-center p-8 relative",
      className
    )}>
      {Array.from({ length: diceCount }).map((_, index) => (
        <SingleDice3D 
          key={index}
          index={index}
          trigger={trigger}
          onComplete={(result) => handleDiceComplete(index, result)}
        />
      ))}
      
      <CriticalEffect 
        type={showCritical || 'success'} 
        show={showCritical !== null} 
      />
    </div>
  )
}