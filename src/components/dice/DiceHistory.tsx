import { motion } from 'framer-motion'
import { History, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDiceStore } from '@/store/diceStore'
import { cn } from '@/lib/utils'

export function DiceHistory() {
  const { history, clearHistory } = useDiceStore()

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-medieval flex items-center gap-2">
            <History className="w-5 h-5" />
            Würfel-Historie
          </CardTitle>
          <CardDescription>
            Die letzten 20 Würfe
          </CardDescription>
        </div>
        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Löschen
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Noch keine Würfe vorhanden
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {history.map((roll, index) => {
              const isCritical = roll.dice === '3W6' && (roll.total === 3 || roll.total === 18)
              
              return (
                <motion.div
                  key={roll.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    "bg-muted/50 hover:bg-muted transition-colors",
                    isCritical && "ring-2",
                    roll.total === 3 && "ring-rust-500",
                    roll.total === 18 && "ring-aspect-heiler"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {formatTime(roll.timestamp)}
                    </span>
                    <span className="font-medium">
                      {roll.dice}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {roll.results.map((result, i) => (
                        <span
                          key={i}
                          className="w-8 h-8 rounded bg-steel-700 
                                   flex items-center justify-center
                                   text-steel-200 font-mono text-sm"
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                    <span className={cn(
                      "font-mono font-bold text-lg min-w-[2rem] text-right",
                      isCritical && "text-primary"
                    )}>
                      {roll.total}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}