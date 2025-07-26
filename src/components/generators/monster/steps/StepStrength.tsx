import { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DiceTableRoller } from '@/components/dice/DiceTableRoller'
import { useMonsterStore } from '@/store/monsterStore'
import { strengthAttributeTable } from '@/data/tables/monsterTables'
import type { DiceRollResult } from '@/types/dice'
import type { MonsterAttribute } from '@/types/monster'

export function StepStrength() {
  const { generatorState, updateGeneratorState } = useMonsterStore()
  const [rerollCount, setRerollCount] = useState(0)

  const xValue = generatorState.age?.xValue || 1

  const handleAttributeRoll = (result: DiceRollResult<MonsterAttribute['type']>) => {
    // Bei einer 6 würfle zweimal neu
    if (result.roll === 6 && rerollCount < 2) {
      setRerollCount(rerollCount + 1)
      return
    }

    updateGeneratorState({ 
      strengthAttribute: result.value,
      strengthRoll: xValue,
      manualOverrides: {
        ...generatorState.manualOverrides,
        strength: result.roll
      }
    })
  }

  const handleManualSelect = (attribute: MonsterAttribute['type'], roll: number) => {
    updateGeneratorState({ 
      strengthAttribute: attribute,
      strengthRoll: xValue,
      manualOverrides: {
        ...generatorState.manualOverrides,
        strength: roll
      }
    })
  }

  // Reset reroll count when component mounts
  useEffect(() => {
    setRerollCount(0)
  }, [])

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
          Die Stärke des Monsters bestimmt, in welchem Attribut es besonders begabt ist. 
          Der Wert richtet sich nach dem Alter: <strong>{generatorState.age?.name}</strong> erhält 
          einen Bonus von <strong>+{xValue}</strong>.
        </p>
        {rerollCount > 0 && (
          <p className="text-yellow-600 dark:text-yellow-400">
            Du hast eine 6 gewürfelt! Würfle erneut (noch {2 - rerollCount} Versuche).
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Würfeltabelle */}
        <DiceTableRoller
          table={strengthAttributeTable}
          onRoll={handleAttributeRoll}
          allowManualOverride
        />

        {/* Manuelle Auswahl */}
        <div className="space-y-4">
          <h3 className="font-semibold">Oder manuell wählen:</h3>
          <div className="space-y-2">
            {strengthAttributeTable.entries.filter(e => e.range !== 6).map((entry) => (
              <Button
                key={entry.value}
                variant={generatorState.strengthAttribute === entry.value ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handleManualSelect(entry.value, entry.range as number)}
              >
                <span className="font-mono mr-2">{entry.range}:</span>
                <span className="capitalize">{entry.value} (+{xValue})</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Ausgewählte Stärke */}
      {generatorState.strengthAttribute && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold capitalize">
              {generatorState.strengthAttribute} +{xValue}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {getAttributeDescription(generatorState.strengthAttribute)}
          </p>
          
          <div className="mt-4 p-3 bg-background rounded border">
            <p className="text-sm font-medium mb-1">Auswirkungen:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {generatorState.strengthAttribute === 'stärke' && (
                <>
                  <li>• LP: +{xValue} (bei Weltenbestie +{xValue * 2})</li>
                  <li>• Spezial-Aktion: Zerschmettern</li>
                </>
              )}
              {generatorState.strengthAttribute === 'geschick' && (
                <>
                  <li>• Angriff/Verteidigung: +{xValue * 2}</li>
                  <li>• Initiative: +{xValue}</li>
                  <li>• Spezial-Aktion: Blitzangriff</li>
                </>
              )}
              {generatorState.strengthAttribute === 'willenskraft' && (
                <>
                  <li>• SP: +{xValue * (generatorState.age?.spMultiplier || 3)}</li>
                  <li>• Spezial-Aktion: Furchteinflößendes Brüllen</li>
                </>
              )}
              {generatorState.strengthAttribute === 'logik' && (
                <>
                  <li>• Initiative: +{xValue}</li>
                  <li>• Spezial-Aktion: Taktischer Rückzug</li>
                </>
              )}
              {generatorState.strengthAttribute === 'mystik' && (
                <>
                  <li>• Magische Fähigkeiten</li>
                  <li>• Spezial-Aktion: Mana-Explosion</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}