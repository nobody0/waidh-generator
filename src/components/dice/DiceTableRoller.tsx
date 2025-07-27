import { useState } from 'react'
import { Dices, RefreshCw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { DiceTable, DiceRollResult } from '@/types/dice'
import { DiceService } from '@/lib/dice/diceService'
import { useDiceStore } from '@/store/diceStore'
import { cn } from '@/lib/utils'
import { Dice3D } from './Dice3D'
import { motion, AnimatePresence } from 'framer-motion'

interface DiceTableRollerProps<T> {
  table: DiceTable<T>
  onRoll?: (result: DiceRollResult<T>) => void
  allowManualOverride?: boolean
  className?: string
}

export function DiceTableRoller<T>({ 
  table, 
  onRoll, 
  allowManualOverride = false,
  className 
}: DiceTableRollerProps<T>) {
  const { addRoll } = useDiceStore()
  const [currentResult, setCurrentResult] = useState<DiceRollResult<T> | null>(null)
  const [manualValue, setManualValue] = useState<number | null>(null)
  const [showManualInput, setShowManualInput] = useState(false)
  const [isRolling, setIsRolling] = useState(false)
  const [show3DDice, setShow3DDice] = useState(false)
  const [diceType, setDiceType] = useState<'1d6' | '2d6' | '3d6'>('1d6')
  const [rollTrigger, setRollTrigger] = useState(0)

  const handleRoll = async () => {
    setIsRolling(true)
    
    // Show 3D dice for supported types
    if (table.diceType === '1d6' || table.diceType === '2d6' || table.diceType === '3d6') {
      setDiceType(table.diceType)
      setShow3DDice(true)
      setRollTrigger(prev => prev + 1)
    } else {
      // For custom dice, use regular animation
      await new Promise(resolve => setTimeout(resolve, 500))
      completeDiceRoll()
    }
  }

  const completeDiceRoll = (diceResults?: number[]) => {
    let result: DiceRollResult<T>
    
    if (diceResults && diceResults.length > 0) {
      // Use the 3D dice results
      const total = diceResults.reduce((sum, val) => sum + val, 0)
      result = DiceService.getResultForRoll(table, total)
    } else {
      // Use manual or random roll
      result = DiceService.rollWithOverride(table, manualValue || undefined)
    }
    
    setCurrentResult(result)
    
    // Add to history
    addRoll(
      `${table.name} (${table.diceType})`,
      diceResults || [result.roll],
      result.roll
    )

    if (onRoll) {
      onRoll(result)
    }

    setIsRolling(false)
    setManualValue(null)
    
    // Hide 3D dice after animation completes
    setTimeout(() => {
      setShow3DDice(false)
    }, 2000)
  }

  const formatValue = (value: T): string => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value)
    }
    return String(value)
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-medieval">{table.name}</span>
          <div className="flex gap-2">
            {allowManualOverride && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowManualInput(!showManualInput)}
              >
                Manual
              </Button>
            )}
            <Button
              onClick={handleRoll}
              disabled={isRolling}
              size="sm"
              className="font-medieval"
            >
              {(table.diceType === '1d6' || table.diceType === '2d6' || table.diceType === '3d6') ? (
                <Sparkles className="w-4 h-4 mr-1" />
              ) : (
                <Dices className="w-4 h-4 mr-1" />
              )}
              Würfeln ({table.diceType})
            </Button>
          </div>
        </CardTitle>
        {table.allowReroll && (
          <CardDescription>Neuwürfe erlaubt</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {showManualInput && allowManualOverride && (
          <div className="mb-4 flex gap-2">
            <input
              type="number"
              min="1"
              max="20"
              value={manualValue || ''}
              onChange={(e) => setManualValue(e.target.value ? parseInt(e.target.value) : null)}
              placeholder="Manueller Wurf"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setManualValue(null)
                setShowManualInput(false)
              }}
            >
              Zurücksetzen
            </Button>
          </div>
        )}

        {currentResult && (
          <div className="space-y-3">
            <div className={cn(
              "p-4 rounded-lg bg-muted transition-all",
              isRolling && "animate-pulse"
            )}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Wurf:</span>
                <span className="text-2xl font-bold font-mono">{currentResult.roll}</span>
              </div>
              
              <div className="border-t pt-2">
                <div className="text-lg font-semibold">
                  {formatValue(currentResult.value)}
                </div>
                {currentResult.entry.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentResult.entry.description}
                  </p>
                )}
              </div>

              {currentResult.subResults && currentResult.subResults.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Zusätzliche Würfe:</p>
                  <div className="space-y-1">
                    {currentResult.subResults.map((subResult, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        Wurf {index + 1}: {subResult.roll}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {table.allowReroll && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRoll}
                disabled={isRolling}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Neu würfeln
              </Button>
            )}
          </div>
        )}

        {!currentResult && (
          <div className="text-center py-8 text-muted-foreground">
            Klicke auf "Würfeln" um ein Ergebnis zu erhalten
          </div>
        )}
      </CardContent>
      
      <AnimatePresence>
        {show3DDice && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dice3D 
              type={diceType}
              trigger={rollTrigger}
              onRollComplete={completeDiceRoll}
              className="pointer-events-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}