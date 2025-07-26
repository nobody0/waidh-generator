import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { DiceTable } from '@/types/dice'
import { DiceService } from '@/lib/dice/diceService'
import { cn } from '@/lib/utils'

interface DiceTableDisplayProps<T> {
  table: DiceTable<T>
  className?: string
}

export function DiceTableDisplay<T>({ table, className }: DiceTableDisplayProps<T>) {
  const probabilities = useMemo(() => {
    return DiceService.getTableProbabilities(table)
  }, [table])

  const formatRange = (range: number | [number, number]): string => {
    if (typeof range === 'number') {
      return range.toString()
    }
    return `${range[0]}-${range[1]}`
  }

  const formatProbability = (prob: number): string => {
    return `${(prob * 100).toFixed(1)}%`
  }

  const formatValue = (value: T): string => {
    if (typeof value === 'object' && value !== null) {
      // Handle MonsterAge and other complex objects
      if ('name' in value) {
        return (value as any).name
      }
      return JSON.stringify(value)
    }
    return String(value)
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="font-medieval">{table.name}</CardTitle>
        <CardDescription>
          Würfeltabelle ({table.diceType})
          {table.allowReroll && ' - Neuwürfe erlaubt'}
          {table.uniqueOnly && ' - Nur einzigartige Werte'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-sm font-semibold border-b pb-2">
            <div className="col-span-2">Wurf</div>
            <div className="col-span-6">Ergebnis</div>
            <div className="col-span-2">Chance</div>
            <div className="col-span-2 text-right">Kumulativ</div>
          </div>
          
          {table.entries.map((entry, index) => {
            const probability = probabilities.find(p => p.value === entry.value)
            const cumulativeProbability = probabilities
              .slice(0, probabilities.findIndex(p => p.value === entry.value) + 1)
              .reduce((sum, p) => sum + p.probability, 0)
            
            return (
              <div 
                key={index} 
                className="grid grid-cols-12 gap-2 text-sm hover:bg-muted/50 rounded px-1 py-1"
              >
                <div className="col-span-2 font-mono">
                  {formatRange(entry.range)}
                </div>
                <div className="col-span-6">
                  <div className="font-medium">{formatValue(entry.value)}</div>
                  {entry.description && (
                    <div className="text-xs text-muted-foreground">{entry.description}</div>
                  )}
                </div>
                <div className="col-span-2 text-muted-foreground">
                  {probability ? formatProbability(probability.probability) : '-'}
                </div>
                <div className="col-span-2 text-right text-muted-foreground">
                  {probability ? formatProbability(cumulativeProbability) : '-'}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-semibold mb-2">Wahrscheinlichkeitsübersicht</h4>
          <div className="space-y-1">
            {probabilities.map((prob, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1 text-sm">{formatValue(prob.value)}</div>
                <div className="w-32 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${prob.probability * 100}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground w-12 text-right">
                  {formatProbability(prob.probability)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}