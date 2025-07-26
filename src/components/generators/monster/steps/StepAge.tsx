import { useState } from 'react'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DiceTableRoller } from '@/components/dice/DiceTableRoller'
import { useMonsterStore } from '@/store/monsterStore'
import { monsterAgeTable } from '@/data/tables/monsterTables'
import type { DiceRollResult } from '@/types/dice'
import type { MonsterAge } from '@/types/monster'

export function StepAge() {
  const { generatorState, updateGeneratorState } = useMonsterStore()
  const [showDetails, setShowDetails] = useState(false)

  const handleRoll = (result: DiceRollResult<MonsterAge>) => {
    updateGeneratorState({ 
      age: result.value,
      manualOverrides: {
        ...generatorState.manualOverrides,
        age: result.roll
      }
    })
  }

  const handleManualSelect = (age: MonsterAge, roll: number) => {
    updateGeneratorState({ 
      age,
      manualOverrides: {
        ...generatorState.manualOverrides,
        age: roll
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Das Alter bestimmt die Grundwerte des Monsters. Ältere Monster sind stärker, 
          haben mehr Lebenspunkte und Fähigkeiten.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Würfeltabelle */}
        <DiceTableRoller
          table={monsterAgeTable}
          onRoll={handleRoll}
          allowManualOverride
        />

        {/* Manuelle Auswahl */}
        <div className="space-y-4">
          <h3 className="font-semibold">Oder manuell wählen:</h3>
          <div className="space-y-2">
            {monsterAgeTable.entries.map((entry) => (
              <Button
                key={entry.value.id}
                variant={generatorState.age?.id === entry.value.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handleManualSelect(entry.value, entry.range as number)}
              >
                <span className="font-mono mr-2">{entry.range}:</span>
                {entry.value.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Ausgewähltes Alter */}
      {generatorState.age && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{generatorState.age.name}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              <Info className="w-4 h-4 mr-1" />
              Details
            </Button>
          </div>
          
          {showDetails && (
            <div className="mt-4 space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-muted-foreground">Basis-LP:</span>
                  <span className="ml-2 font-mono">{generatorState.age.baseLP}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Basis-SP:</span>
                  <span className="ml-2 font-mono">{generatorState.age.baseSP}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Basis-AP:</span>
                  <span className="ml-2 font-mono">{generatorState.age.baseAP}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">SP-Multiplikator:</span>
                  <span className="ml-2 font-mono">x{generatorState.age.spMultiplier}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-muted-foreground">
                  X-Wert (Stärke): <span className="font-mono">{generatorState.age.xValue}</span>
                </p>
                <p className="text-muted-foreground">
                  Y-Wert (Schwäche): <span className="font-mono">{generatorState.age.yValue}</span>
                </p>
              </div>

              {generatorState.age.id === 'altehrwuerdig' && (
                <p className="text-yellow-600 dark:text-yellow-400 pt-2">
                  ⚡ Besonderheit: 4W6 für Angriff/Verteidigung statt 3W6
                </p>
              )}
              {generatorState.age.id === 'weltenbestie' && (
                <p className="text-red-600 dark:text-red-400 pt-2">
                  ⚡ Besonderheit: 4W6 für Angriff/Verteidigung statt 3W6, doppelter STR-Bonus auf LP
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}