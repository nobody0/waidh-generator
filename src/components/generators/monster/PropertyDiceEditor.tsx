import { useState } from 'react'
import { RefreshCw, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DiceService } from '@/lib/dice/diceService'
import { badPropertiesTable } from '@/data/tables/monsterTables'
import type { MonsterProperty } from '@/types/monster'

interface PropertyDiceEditorProps {
  properties: Array<{ value: MonsterProperty; roll: number }>
  onChange: (properties: Array<{ value: MonsterProperty; roll: number }>) => void
}

export function PropertyDiceEditor({ properties, onChange }: PropertyDiceEditorProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleRerollAll = () => {
    const props: Array<{ value: MonsterProperty; roll: number }> = []
    const usedIds = new Set<string>()
    
    // Roll exactly 2 different properties
    let attempts = 0
    while (props.length < 2 && attempts < 20) {
      const result = DiceService.rollOnTable(badPropertiesTable)
      if (!usedIds.has(result.value.id)) {
        props.push({ value: result.value, roll: result.roll })
        usedIds.add(result.value.id)
      }
      attempts++
    }
    
    onChange(props)
  }

  const handleRerollSingle = (index: number) => {
    const newProperties = [...properties]
    const currentId = newProperties[index].value.id
    const otherIds = properties.filter((_, i) => i !== index).map(p => p.value.id)
    
    // Roll a new property that's different from all current ones
    let attempts = 0
    let newProperty = null
    
    while (!newProperty && attempts < 20) {
      const result = DiceService.rollOnTable(badPropertiesTable)
      if (result.value.id !== currentId && !otherIds.includes(result.value.id)) {
        newProperty = result
      }
      attempts++
    }
    
    if (newProperty) {
      newProperties[index] = newProperty
      onChange(newProperties)
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xs flex-1">
          {properties.map((p, i) => (
            <span key={i}>
              <span className="font-medium">{p.value.name}</span>
              <span className="text-[10px] text-muted-foreground ml-1">
                ({p.roll})
              </span>
              {i < properties.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsEditing(!isEditing)}
          className="h-4 w-4 opacity-50 hover:opacity-100"
        >
          <Edit2 className="h-3 w-3" />
        </Button>
      </div>
      
      {isEditing && (
        <div className="mt-2 space-y-1 border-t pt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-muted-foreground">Eigenschaften neu würfeln:</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRerollAll}
              className="h-5 text-[10px] px-2"
            >
              Beide neu
            </Button>
          </div>
          {properties.map((property, index) => (
            <div key={index} className="flex items-center justify-between text-[10px]">
              <span className="flex-1">
                <span className="font-medium">{property.value.name}</span>
                <span className="text-muted-foreground ml-1">(2W6: {property.roll})</span>
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleRerollSingle(index)}
                className="h-4 w-4"
              >
                <RefreshCw className="h-2 w-2" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}