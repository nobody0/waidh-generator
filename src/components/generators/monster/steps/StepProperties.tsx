import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DiceTableRoller } from '@/components/dice/DiceTableRoller'
import { useMonsterStore } from '@/store/monsterStore'
import { badPropertiesTable } from '@/data/tables/monsterTables'
import { DiceService } from '@/lib/dice/diceService'
import type { DiceRollResult } from '@/types/dice'
import type { MonsterProperty } from '@/types/monster'

export function StepProperties() {
  const { generatorState, updateGeneratorState } = useMonsterStore()

  const handlePropertyRoll = (result: DiceRollResult<MonsterProperty>) => {
    // Prüfe ob bereits 2 Eigenschaften vorhanden sind
    if (generatorState.properties.length >= 2) return

    // Prüfe ob diese Eigenschaft bereits gewählt wurde
    if (generatorState.properties.some(p => p.id === result.value.id)) {
      // Würfle automatisch neu
      rollProperty()
      return
    }

    const newProperties = [...generatorState.properties, result.value]
    updateGeneratorState({ 
      properties: newProperties,
      manualOverrides: {
        ...generatorState.manualOverrides,
        properties: [...(generatorState.manualOverrides.properties || []), result.roll]
      }
    })
  }

  const rollProperty = () => {
    const result = DiceService.rollOnTable(badPropertiesTable)
    handlePropertyRoll(result)
  }

  const rollBothProperties = () => {
    // Reset
    updateGeneratorState({ 
      properties: [],
      manualOverrides: {
        ...generatorState.manualOverrides,
        properties: []
      }
    })

    // Würfle 2 verschiedene Eigenschaften
    const properties: MonsterProperty[] = []
    const rolls: number[] = []
    let attempts = 0

    while (properties.length < 2 && attempts < 20) {
      const result = DiceService.rollOnTable(badPropertiesTable)
      if (!properties.some(p => p.id === result.value.id)) {
        properties.push(result.value)
        rolls.push(result.roll)
      }
      attempts++
    }

    updateGeneratorState({ 
      properties,
      manualOverrides: {
        ...generatorState.manualOverrides,
        properties: rolls
      }
    })
  }

  const removeProperty = (index: number) => {
    const newProperties = generatorState.properties.filter((_, i) => i !== index)
    const newRolls = generatorState.manualOverrides.properties?.filter((_, i) => i !== index) || []
    updateGeneratorState({ 
      properties: newProperties,
      manualOverrides: {
        ...generatorState.manualOverrides,
        properties: newRolls
      }
    })
  }

  const manualSelectProperty = (property: MonsterProperty) => {
    if (generatorState.properties.length >= 2) return
    if (generatorState.properties.some(p => p.id === property.id)) return

    const newProperties = [...generatorState.properties, property]
    updateGeneratorState({ 
      properties: newProperties,
      manualOverrides: {
        ...generatorState.manualOverrides,
        properties: [...(generatorState.manualOverrides.properties || []), 0]
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Jedes Monster hat genau <strong>2 schlechte Eigenschaften</strong>, die es einzigartig machen 
          und Schwächen darstellen. Würfle mit 2W6 oder wähle manuell.
        </p>
      </div>

      {/* Aktuelle Eigenschaften */}
      {generatorState.properties.length > 0 && (
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Gewählte Eigenschaften ({generatorState.properties.length}/2)
          </h3>
          <div className="space-y-2">
            {generatorState.properties.map((property, index) => (
              <div key={property.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <h4 className="font-medium">{property.name}</h4>
                  <p className="text-sm text-muted-foreground">{property.effect}</p>
                  {generatorState.manualOverrides.properties?.[index] && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Wurf: {generatorState.manualOverrides.properties[index]}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProperty(index)}
                >
                  Entfernen
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Würfeln */}
        <div className="space-y-4">
          <h3 className="font-semibold">Würfeln:</h3>
          
          {generatorState.properties.length < 2 ? (
            <>
              <DiceTableRoller
                table={badPropertiesTable}
                onRoll={handlePropertyRoll}
                allowManualOverride={false}
              />
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">oder</p>
                <Button
                  onClick={rollBothProperties}
                  variant="outline"
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Beide Eigenschaften würfeln
                </Button>
              </div>
            </>
          ) : (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-200 font-medium">
                ✓ Beide Eigenschaften gewählt
              </p>
              <Button
                onClick={rollBothProperties}
                variant="outline"
                size="sm"
                className="mt-3 gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Neu würfeln
              </Button>
            </div>
          )}
        </div>

        {/* Manuelle Auswahl */}
        <div className="space-y-4">
          <h3 className="font-semibold">Oder manuell wählen:</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {badPropertiesTable.entries.map((entry) => {
              const isSelected = generatorState.properties.some(p => p.id === entry.value.id)
              const isDisabled = isSelected || generatorState.properties.length >= 2
              
              return (
                <Button
                  key={entry.value.id}
                  variant={isSelected ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-2 px-3"
                  disabled={isDisabled}
                  onClick={() => manualSelectProperty(entry.value)}
                >
                  <div className="flex items-start gap-2 w-full">
                    <span className="font-mono text-xs mt-0.5">{entry.range}:</span>
                    <div className="flex-1">
                      <div className="font-medium">{entry.value.name}</div>
                      <div className="text-xs text-muted-foreground">{entry.value.effect}</div>
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Hinweise */}
      <div className="mt-6 p-4 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200/50 dark:border-yellow-800/50">
        <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">Wichtige Eigenschaften:</h4>
        <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-300">
          <li>• <strong>Verletzt:</strong> Das Monster startet mit nur 75% seiner maximalen LP</li>
          <li>• <strong>Manablind:</strong> Kann keine Magie wahrnehmen (wichtig gegen Zauberer!)</li>
          <li>• <strong>Passiv:</strong> Greift nur an wenn es selbst angegriffen wird</li>
          <li>• <strong>Ängstlich:</strong> Flieht automatisch bei halben LP</li>
        </ul>
      </div>
    </div>
  )
}