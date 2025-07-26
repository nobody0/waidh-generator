import { useState, useEffect } from 'react'
import { TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DiceTableRoller } from '@/components/dice/DiceTableRoller'
import { useMonsterStore } from '@/store/monsterStore'
import { weaknessAttributeTable } from '@/data/tables/monsterTables'
import type { DiceRollResult, DiceTable } from '@/types/dice'
import type { MonsterAttribute } from '@/types/monster'

export function StepWeakness() {
  const { generatorState, updateGeneratorState } = useMonsterStore()
  const [rerollCount, setRerollCount] = useState(0)
  const [filteredTable, setFilteredTable] = useState<DiceTable<MonsterAttribute['type']>>(weaknessAttributeTable)

  const yValue = generatorState.age?.yValue || 1

  // Filter die Tabelle basierend auf der Stärke
  useEffect(() => {
    if (generatorState.strengthAttribute) {
      const filtered = {
        ...weaknessAttributeTable,
        entries: weaknessAttributeTable.entries.filter(entry => {
          // Entferne die Stärke-Option aus der Schwäche-Tabelle
          if (entry.value === generatorState.strengthAttribute) {
            return false
          }
          return true
        })
      }
      setFilteredTable(filtered)
    }
  }, [generatorState.strengthAttribute])

  const handleAttributeRoll = (result: DiceRollResult<MonsterAttribute['type']>) => {
    // Bei einer 6 würfle zweimal neu
    if (result.roll === 6 && rerollCount < 2) {
      setRerollCount(rerollCount + 1)
      return
    }

    // Verhindere gleiche Stärke und Schwäche
    if (result.value === generatorState.strengthAttribute) {
      // Würfle automatisch neu
      return
    }

    updateGeneratorState({ 
      weaknessAttribute: result.value,
      weaknessRoll: yValue,
      manualOverrides: {
        ...generatorState.manualOverrides,
        weakness: result.roll
      }
    })
  }

  const handleManualSelect = (attribute: MonsterAttribute['type'], roll: number) => {
    if (attribute === generatorState.strengthAttribute) return
    
    updateGeneratorState({ 
      weaknessAttribute: attribute,
      weaknessRoll: yValue,
      manualOverrides: {
        ...generatorState.manualOverrides,
        weakness: roll
      }
    })
  }

  const getAttributeDescription = (attr: MonsterAttribute['type']) => {
    const descriptions = {
      'stärke': 'Körperliche Kraft und Widerstandsfähigkeit',
      'geschick': 'Reflexe, Beweglichkeit und Präzision',
      'willenskraft': 'Mentale Stärke und Durchhaltevermögen',
      'logik': 'Intelligenz und taktisches Denken',
      'mystik': 'Magische Begabung und Mana-Affinität'
    }
    return descriptions[attr]
  }

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Die Schwäche des Monsters bestimmt, in welchem Attribut es Defizite hat. 
          Der Malus richtet sich nach dem Alter: <strong>{generatorState.age?.name}</strong> erhält 
          einen Malus von <strong>-{yValue}</strong>.
        </p>
        {generatorState.strengthAttribute && (
          <p className="text-muted-foreground">
            Die Schwäche kann nicht <span className="capitalize font-semibold">{generatorState.strengthAttribute}</span> sein 
            (bereits als Stärke gewählt).
          </p>
        )}
        {rerollCount > 0 && (
          <p className="text-yellow-600 dark:text-yellow-400">
            Du hast eine 6 gewürfelt! Würfle erneut (noch {2 - rerollCount} Versuche).
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Würfeltabelle */}
        <DiceTableRoller
          table={filteredTable}
          onRoll={handleAttributeRoll}
          allowManualOverride
        />

        {/* Manuelle Auswahl */}
        <div className="space-y-4">
          <h3 className="font-semibold">Oder manuell wählen:</h3>
          <div className="space-y-2">
            {weaknessAttributeTable.entries.filter(e => e.range !== 6).map((entry) => (
              <Button
                key={entry.value}
                variant={generatorState.weaknessAttribute === entry.value ? "default" : "outline"}
                className="w-full justify-start"
                disabled={entry.value === generatorState.strengthAttribute}
                onClick={() => handleManualSelect(entry.value, entry.range as number)}
              >
                <span className="font-mono mr-2">{entry.range}:</span>
                <span className="capitalize">{entry.value} (-{yValue})</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Ausgewählte Schwäche */}
      {generatorState.weaknessAttribute && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold capitalize">
              {generatorState.weaknessAttribute} -{yValue}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {getAttributeDescription(generatorState.weaknessAttribute)}
          </p>
          
          <div className="mt-4 p-3 bg-background rounded border">
            <p className="text-sm font-medium mb-1">Auswirkungen:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {generatorState.weaknessAttribute === 'stärke' && (
                <li>• LP: -{yValue} (mindestens 1 LP)</li>
              )}
              {generatorState.weaknessAttribute === 'geschick' && (
                <>
                  <li>• Angriff/Verteidigung: -{yValue * 2}</li>
                  <li>• Initiative: -{yValue}</li>
                </>
              )}
              {generatorState.weaknessAttribute === 'willenskraft' && (
                <li>• SP: -{yValue * (generatorState.age?.spMultiplier || 3)} (mindestens 1 SP)</li>
              )}
              {generatorState.weaknessAttribute === 'logik' && (
                <li>• Initiative: -{yValue}</li>
              )}
              {generatorState.weaknessAttribute === 'mystik' && (
                <li>• Eingeschränkte magische Fähigkeiten</li>
              )}
            </ul>
          </div>

          {/* Zusammenfassung */}
          <div className="mt-4 p-3 bg-primary/10 rounded">
            <p className="text-sm font-medium">Aktuelle Attribute:</p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div className="flex justify-between">
                <span className="capitalize">{generatorState.strengthAttribute}:</span>
                <span className="font-mono text-green-600">+{generatorState.strengthRoll}</span>
              </div>
              <div className="flex justify-between">
                <span className="capitalize">{generatorState.weaknessAttribute}:</span>
                <span className="font-mono text-red-600">-{yValue}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}