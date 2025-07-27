import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dices, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Dice3D } from './Dice3D'
import { useDiceStore } from '@/store/diceStore'
import { cn } from '@/lib/utils'

interface DiceResult {
  dice: number[]
  total: number
  topPicks?: number[]
  topTotal?: number
}

export function FreeDiceRoller() {
  const [diceCount, setDiceCount] = useState(3)
  const [topPickEnabled, setTopPickEnabled] = useState(false)
  const [topPickCount, setTopPickCount] = useState(2)
  const [currentResult, setCurrentResult] = useState<DiceResult | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [show3D, setShow3D] = useState(false)
  const [rollTrigger, setRollTrigger] = useState(0)
  const { addRoll } = useDiceStore()

  const handleRoll = () => {
    setIsRolling(true)
    
    if (diceCount <= 3) {
      setShow3D(true)
      setRollTrigger(prev => prev + 1)
    } else {
      // For more than 3 dice, calculate directly
      const results = Array.from({ length: diceCount }, () => 
        Math.floor(Math.random() * 6) + 1
      )
      processResults(results)
    }
  }

  const handle3DComplete = (results: number[]) => {
    // Pad results if needed
    const fullResults = [...results]
    while (fullResults.length < diceCount) {
      fullResults.push(Math.floor(Math.random() * 6) + 1)
    }
    processResults(fullResults)
    
    setTimeout(() => {
      setShow3D(false)
    }, 2000)
  }

  const processResults = (dice: number[]) => {
    const total = dice.reduce((sum, val) => sum + val, 0)
    const result: DiceResult = { dice, total }
    
    if (topPickEnabled && topPickCount < diceCount) {
      const sorted = [...dice].sort((a, b) => b - a)
      result.topPicks = sorted.slice(0, topPickCount)
      result.topTotal = result.topPicks.reduce((sum, val) => sum + val, 0)
    }
    
    setCurrentResult(result)
    setIsRolling(false)
    
    // Add to history
    const label = topPickEnabled 
      ? `${diceCount}W6 Top ${topPickCount}`
      : `${diceCount}W6`
    const finalTotal = result.topTotal || result.total
    
    addRoll(label, dice, finalTotal)
  }

  const getDiceType = (): '1d6' | '2d6' | '3d6' => {
    if (diceCount === 1) return '1d6'
    if (diceCount === 2) return '2d6'
    return '3d6'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medieval">Freies Würfeln</CardTitle>
        <CardDescription>
          Würfle beliebig viele W6 mit optionaler Top-Pick-Funktion
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dice Count Slider */}
        <div className="space-y-2">
          <Label htmlFor="dice-count">
            Anzahl Würfel: {diceCount}W6
          </Label>
          <Slider
            id="dice-count"
            min={1}
            max={10}
            step={1}
            value={[diceCount]}
            onValueChange={([value]) => setDiceCount(value)}
            className="w-full"
          />
        </div>

        {/* Top Pick Option */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="top-pick"
              checked={topPickEnabled}
              onCheckedChange={(checked) => setTopPickEnabled(!!checked)}
              disabled={diceCount <= 1}
            />
            <Label 
              htmlFor="top-pick" 
              className={cn(
                "cursor-pointer",
                diceCount <= 1 && "opacity-50"
              )}
            >
              Top Pick aktivieren
            </Label>
          </div>
          
          {topPickEnabled && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="top-count">
                Beste {topPickCount} Würfel verwenden
              </Label>
              <Slider
                id="top-count"
                min={1}
                max={diceCount - 1}
                step={1}
                value={[topPickCount]}
                onValueChange={([value]) => setTopPickCount(value)}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Roll Button */}
        <Button
          onClick={handleRoll}
          disabled={isRolling}
          size="lg"
          className="w-full font-medieval"
        >
          {diceCount <= 3 ? (
            <Sparkles className="w-5 h-5 mr-2" />
          ) : (
            <Dices className="w-5 h-5 mr-2" />
          )}
          Würfeln
        </Button>

        {/* Results */}
        {currentResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Dice Results */}
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex flex-wrap gap-2">
                {currentResult.dice.map((die, index) => {
                  const isTopPick = currentResult.topPicks?.includes(die) &&
                    currentResult.dice.slice(0, index + 1).filter(d => d === die).length <=
                    currentResult.topPicks.filter(d => d === die).length
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center",
                        "font-mono text-lg font-bold",
                        "bg-gradient-to-br from-steel-400 to-steel-600",
                        "shadow-steel text-steel-900",
                        isTopPick && topPickEnabled && "ring-2 ring-primary ring-offset-2"
                      )}
                    >
                      {die}
                    </motion.div>
                  )
                })}
              </div>

              {/* Totals */}
              <div className="pt-3 border-t space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Summe aller Würfel:</span>
                  <span className="text-xl font-mono font-bold">{currentResult.total}</span>
                </div>
                
                {currentResult.topTotal && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Top {topPickCount} Summe:
                    </span>
                    <span className="text-2xl font-mono font-bold text-primary">
                      {currentResult.topTotal}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>

      {/* 3D Dice Overlay */}
      {show3D && diceCount <= 3 && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dice3D 
            type={getDiceType()}
            trigger={rollTrigger}
            onRollComplete={handle3DComplete}
            className="pointer-events-auto"
          />
        </motion.div>
      )}
    </Card>
  )
}