import { useState } from 'react'
import { Save, RotateCcw, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { DiceTable } from '@/types/dice'
import { DiceService } from '@/lib/dice/diceService'
import { cn } from '@/lib/utils'

interface DiceTableInlineEditorProps<T> {
  table: DiceTable<T>
  defaultTable: DiceTable<T>
  onSave?: (modifiedTable: DiceTable<T>) => void
  className?: string
}

export function DiceTableInlineEditor<T>({ 
  table, 
  defaultTable,
  onSave,
  className 
}: DiceTableInlineEditorProps<T>) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTable, setEditedTable] = useState<DiceTable<T>>(table)
  const [hasChanges, setHasChanges] = useState(false)

  const probabilities = DiceService.getTableProbabilities(table)

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
      if ('name' in value) {
        return (value as any).name
      }
      return JSON.stringify(value)
    }
    return String(value)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedTable(JSON.parse(JSON.stringify(table)))
  }

  const handleSave = () => {
    if (onSave) {
      onSave(editedTable)
    }
    setIsEditing(false)
    setHasChanges(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedTable(table)
    setHasChanges(false)
  }

  const handleReset = () => {
    const resetTable = JSON.parse(JSON.stringify(defaultTable))
    setEditedTable(resetTable)
    setHasChanges(true)
    if (onSave) {
      onSave(resetTable)
    }
  }

  const updateValue = (index: number, newValue: string) => {
    const newTable = { ...editedTable }
    newTable.entries = [...newTable.entries]
    
    try {
      // Try to parse as JSON for complex objects
      const parsed = JSON.parse(newValue)
      newTable.entries[index] = {
        ...newTable.entries[index],
        value: parsed
      }
    } catch {
      // If not JSON, treat as simple value
      newTable.entries[index] = {
        ...newTable.entries[index],
        value: newValue as T
      }
    }
    
    setEditedTable(newTable)
    setHasChanges(true)
  }

  const updateDescription = (index: number, description: string) => {
    const newTable = { ...editedTable }
    newTable.entries = [...newTable.entries]
    newTable.entries[index] = {
      ...newTable.entries[index],
      description
    }
    setEditedTable(newTable)
    setHasChanges(true)
  }

  const displayTable = isEditing ? editedTable : table

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-medieval">{displayTable.name}</CardTitle>
            <CardDescription>
              Würfeltabelle ({displayTable.diceType})
              {displayTable.allowReroll && ' - Neuwürfe erlaubt'}
              {displayTable.uniqueOnly && ' - Nur einzigartige Werte'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit2 className="w-4 h-4 mr-1" />
                  Bearbeiten
                </Button>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Standard
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Abbrechen
                </Button>
                <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
                  <Save className="w-4 h-4 mr-1" />
                  Speichern
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-sm font-semibold border-b pb-2">
            <div className="col-span-2">Wurf</div>
            <div className="col-span-6">Ergebnis</div>
            <div className="col-span-2">Chance</div>
            <div className="col-span-2 text-right">Kumulativ</div>
          </div>
          
          {displayTable.entries.map((entry, index) => {
            const probability = probabilities.find(p => 
              JSON.stringify(p.value) === JSON.stringify(entry.value)
            )
            const cumulativeProbability = probabilities
              .slice(0, probabilities.findIndex(p => 
                JSON.stringify(p.value) === JSON.stringify(entry.value)
              ) + 1)
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
                  {isEditing ? (
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={formatValue(entry.value)}
                        onChange={(e) => updateValue(index, e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded bg-background"
                      />
                      <input
                        type="text"
                        value={entry.description || ''}
                        onChange={(e) => updateDescription(index, e.target.value)}
                        placeholder="Beschreibung..."
                        className="w-full px-2 py-1 text-xs border rounded bg-background text-muted-foreground"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="font-medium">{formatValue(entry.value)}</div>
                      {entry.description && (
                        <div className="text-xs text-muted-foreground">{entry.description}</div>
                      )}
                    </>
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
      </CardContent>
    </Card>
  )
}