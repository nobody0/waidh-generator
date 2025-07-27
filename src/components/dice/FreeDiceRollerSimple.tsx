import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dices } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { SimpleDice } from './SimpleDice'
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
  const { addRoll } = useDiceStore()

  const handleRoll = () => {
    setIsRolling(true)
    
    // Simulate rolling delay
    setTimeout(() => {
      const results = Array.from({ length: diceCount }, () => 
        Math.floor(Math.random() * 6) + 1
      )
      processResults(results)
    }, 1000)
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
          <Dices className="w-5 h-5 mr-2" />
          {isRolling ? 'Würfle...' : 'Würfeln'}
        </Button>

        {/* Results */}
        {currentResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Dice Display */}
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex flex-wrap gap-2 justify-center">
                {currentResult.dice.map((die, index) => {
                  const isTopPick = currentResult.topPicks?.includes(die) &&
                    currentResult.dice.slice(0, index + 1).filter(d => d === die).length <=
                    currentResult.topPicks.filter(d => d === die).length
                  
                  return (
                    <div
                      key={index}
                      className={cn(
                        "relative",
                        isTopPick && topPickEnabled && "ring-2 ring-primary ring-offset-2 rounded-lg"
                      )}
                    >
                      <SimpleDice 
                        value={die} 
                        isRolling={isRolling}
                        delay={index * 0.1}
                      />
                    </div>
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
    </Card>
  )
}