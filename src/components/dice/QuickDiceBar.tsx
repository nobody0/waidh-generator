import { motion } from 'framer-motion'
import { Dices } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Dice3D } from './Dice3D'
import { useDiceStore } from '@/store/diceStore'
import { cn } from '@/lib/utils'

interface DiceButtonProps {
  type: '1d6' | '2d6' | '3d6'
  label: string
  onClick: () => void
}

function DiceButton({ type, label, onClick }: DiceButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="font-mono hover:bg-steel-600 hover:text-steel-100 transition-colors"
    >
      <Dices className="w-4 h-4 mr-1" />
      {label}
    </Button>
  )
}

export function QuickDiceBar() {
  const [showDice, setShowDice] = useState(false)
  const [currentType, setCurrentType] = useState<'1d6' | '2d6' | '3d6'>('1d6')
  const [rollTrigger, setRollTrigger] = useState(0)
  const { addRoll } = useDiceStore()

  const handleDiceClick = (type: '1d6' | '2d6' | '3d6') => {
    setCurrentType(type)
    setShowDice(true)
    setRollTrigger(prev => prev + 1)
  }

  const handleRollComplete = (results: number[]) => {
    const total = results.reduce((sum, val) => sum + val, 0)
    addRoll(currentType, results, total)
    
    setTimeout(() => {
      setShowDice(false)
    }, 2000)
  }

  return (
    <>
      <motion.div 
        className="fixed bottom-4 right-4 flex gap-2 p-3 
                   bg-steel-800/90 backdrop-blur rounded-lg shadow-xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <DiceButton type="1d6" label="W6" onClick={() => handleDiceClick('1d6')} />
        <DiceButton type="2d6" label="2W6" onClick={() => handleDiceClick('2d6')} />
        <DiceButton type="3d6" label="3W6" onClick={() => handleDiceClick('3d6')} />
      </motion.div>

      {showDice && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dice3D 
            type={currentType}
            trigger={rollTrigger}
            onRollComplete={handleRollComplete}
            className="pointer-events-auto"
          />
        </motion.div>
      )}
    </>
  )
}