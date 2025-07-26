import React from 'react'
import { Volume2, VolumeX, History } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DiceRoller } from './DiceRoller'
import { useDiceStore } from '@/store/diceStore'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function DiceBar() {
  const { soundEnabled, toggleSound, history, clearHistory } = useDiceStore()
  const [showHistory, setShowHistory] = React.useState(false)

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-4 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medieval text-sm text-muted-foreground">Schnellwürfel:</span>
            <DiceRoller diceCount={1} />
            <DiceRoller diceCount={2} />
            <DiceRoller diceCount={3} />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSound}
              className="h-8 w-8"
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowHistory(!showHistory)}
              className="h-8 w-8"
            >
              <History className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {showHistory && (
        <Card className="fixed bottom-20 right-4 w-80 max-h-96 overflow-hidden z-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Würfel-Historie</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="h-8 px-2"
              >
                Löschen
              </Button>
            </div>
            <CardDescription>Letzte 10 Würfe</CardDescription>
          </CardHeader>
          <CardContent className="max-h-64 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">Noch keine Würfe</p>
            ) : (
              <div className="space-y-2">
                {history.map((roll) => (
                  <div
                    key={roll.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medieval">{roll.dice}:</span>
                    <span>
                      {roll.results.join(', ')} = {roll.total}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}