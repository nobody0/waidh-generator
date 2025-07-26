import { useState, useEffect } from 'react'
import { RefreshCw, Dices } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DiceService } from '@/lib/dice/diceService'
import { MonsterService } from '@/lib/generators/monsterService'
import { MonsterSummaryCard } from './MonsterSummaryCard'
import { 
  monsterAgeTable,
  strengthAttributeTable,
  weaknessAttributeTable,
  badPropertiesTable
} from '@/data/tables/monsterTables'
import type { 
  Monster, 
  MonsterAge, 
  MonsterAttribute,
  MonsterAbility,
  MonsterProperty 
} from '@/types/monster'

interface TableResult<T> {
  value: T
  roll: number
}

export function MonsterGeneratorSingle() {
  // Würfelergebnisse
  const [ageResult, setAgeResult] = useState<TableResult<MonsterAge> | null>(null)
  const [strengthResult, setStrengthResult] = useState<TableResult<MonsterAttribute['type']> | null>(null)
  const [weaknessResult, setWeaknessResult] = useState<TableResult<MonsterAttribute['type']> | null>(null)
  const [abilities, setAbilities] = useState<MonsterAbility[]>([])
  const [properties, setProperties] = useState<TableResult<MonsterProperty>[]>([])
  
  // Generiertes Monster
  const [monster, setMonster] = useState<Monster | null>(null)

  // Würfle Alter
  const rollAge = () => {
    const result = DiceService.rollOnTable(monsterAgeTable)
    setAgeResult({ value: result.value, roll: result.roll })
  }

  // Würfle Stärke
  const rollStrength = () => {
    const result = DiceService.rollOnTable(strengthAttributeTable)
    if (result.roll === 6) {
      // Bei 6 neu würfeln
      rollStrength()
      return
    }
    setStrengthResult({ value: result.value, roll: result.roll })
  }

  // Würfle Schwäche
  const rollWeakness = (forceStrength?: MonsterAttribute['type']) => {
    const strength = forceStrength || strengthResult?.value
    if (!strength) return
    
    const result = DiceService.rollOnTable(weaknessAttributeTable)
    if (result.roll === 6 || result.value === strength) {
      // Bei 6 oder gleiche wie Stärke neu würfeln
      rollWeakness(strength)
      return
    }
    setWeaknessResult({ value: result.value, roll: result.roll })
  }

  // Würfle Fähigkeiten
  const rollAbilities = (forceAge?: MonsterAge, forceStrength?: MonsterAttribute['type'], forceWeakness?: MonsterAttribute['type']) => {
    const age = forceAge || ageResult?.value
    const strength = forceStrength || strengthResult?.value
    const weakness = forceWeakness || weaknessResult?.value
    
    if (!age || !strength || !weakness) return

    // Berechne Attribute
    const attributes: Record<MonsterAttribute['type'], number> = {
      stärke: 0,
      geschick: 0,
      willenskraft: 0,
      logik: 0,
      mystik: 0
    }
    
    attributes[strength] = age.xValue
    attributes[weakness] = -age.yValue
    
    // Verteile Fähigkeiten
    const distribution = MonsterService.distributeAbilities(attributes)
    const newAbilities: MonsterAbility[] = []
    
    Object.entries(distribution).forEach(([attr, count]) => {
      if (count > 0) {
        const attrAbilities = MonsterService.rollAbilitiesForAttribute(
          attr as MonsterAttribute['type'], 
          count, 
          newAbilities
        )
        newAbilities.push(...attrAbilities)
      }
    })
    
    setAbilities(newAbilities)
  }

  // Würfle Eigenschaften
  const rollProperties = () => {
    const props: TableResult<MonsterProperty>[] = []
    const usedIds = new Set<string>()
    
    while (props.length < 2) {
      const result = DiceService.rollOnTable(badPropertiesTable)
      if (!usedIds.has(result.value.id)) {
        props.push({ value: result.value, roll: result.roll })
        usedIds.add(result.value.id)
      }
    }
    
    setProperties(props)
  }

  // Würfle alles
  const rollAll = () => {
    // Würfle Alter
    const ageResult = DiceService.rollOnTable(monsterAgeTable)
    setAgeResult({ value: ageResult.value, roll: ageResult.roll })
    
    // Würfle Stärke
    let strengthRoll = DiceService.rollOnTable(strengthAttributeTable)
    while (strengthRoll.roll === 6) {
      strengthRoll = DiceService.rollOnTable(strengthAttributeTable)
    }
    setStrengthResult({ value: strengthRoll.value, roll: strengthRoll.roll })
    
    // Würfle Schwäche
    let weaknessRoll = DiceService.rollOnTable(weaknessAttributeTable)
    while (weaknessRoll.roll === 6 || weaknessRoll.value === strengthRoll.value) {
      weaknessRoll = DiceService.rollOnTable(weaknessAttributeTable)
    }
    setWeaknessResult({ value: weaknessRoll.value, roll: weaknessRoll.roll })
    
    // Würfle Fähigkeiten direkt mit den neuen Werten
    rollAbilities(ageResult.value, strengthRoll.value, weaknessRoll.value)
    
    // Würfle Eigenschaften
    rollProperties()
  }

  // Generiere Monster wenn alle Daten vorhanden
  useEffect(() => {
    if (ageResult && strengthResult && weaknessResult && abilities.length > 0 && properties.length === 2) {
      const newMonster = MonsterService.createMonster(
        ageResult.value,
        strengthResult.value,
        weaknessResult.value,
        ageResult.value.xValue,
        ageResult.value.yValue,
        abilities,
        properties.map(p => p.value)
      )
      setMonster(newMonster)
    }
  }, [ageResult, strengthResult, weaknessResult, abilities, properties])

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Links: Monster-Zusammenfassung */}
      <div>
        <h2 className="text-xl font-bold mb-4 font-medieval">Monster-Zusammenfassung</h2>
        {monster ? (
          <MonsterSummaryCard monster={monster} />
        ) : (
          <Card>
            <CardContent className="py-12">
              <p className="text-muted-foreground text-center">
                Würfle die Tabellen um ein Monster zu generieren
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Rechts: Würfeltabellen */}
      <div className="space-y-4">
        {/* Alle würfeln Button */}
        <Button 
          onClick={rollAll} 
          className="w-full gap-2"
          size="lg"
        >
          <Dices className="w-5 h-5" />
          Alles würfeln
        </Button>

        {/* Alter */}
        <Card>
          <CardContent className="py-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Monster-Alter</h3>
                {ageResult ? (
                  <p className="text-sm">
                    <span className="font-medium">{ageResult.value.name}</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      (W:{ageResult.roll})
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">-</p>
                )}
              </div>
              <Button size="sm" variant="outline" onClick={rollAge}>
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stärke */}
        <Card>
          <CardContent className="py-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Stärke-Attribut</h3>
                {strengthResult && ageResult ? (
                  <p className="text-sm">
                    <span className="font-medium capitalize">{strengthResult.value}</span>
                    <span className="text-green-600 dark:text-green-400"> +{ageResult.value.xValue}</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      (W:{strengthResult.roll})
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">-</p>
                )}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={rollStrength}
                disabled={!ageResult}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schwäche */}
        <Card>
          <CardContent className="py-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Schwäche-Attribut</h3>
                {weaknessResult && ageResult ? (
                  <p className="text-sm">
                    <span className="font-medium capitalize">{weaknessResult.value}</span>
                    <span className="text-red-600 dark:text-red-400"> -{ageResult.value.yValue}</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      (W:{weaknessResult.roll})
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">-</p>
                )}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => rollWeakness()}
                disabled={!strengthResult}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fähigkeiten */}
        <Card>
          <CardContent className="py-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Fähigkeiten ({abilities.length})</h3>
                {abilities.length > 0 ? (
                  <p className="text-xs text-muted-foreground">
                    {abilities.map((a, i) => (
                      <span key={i}>
                        {a.name}
                        {i < abilities.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">-</p>
                )}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => rollAbilities()}
                disabled={!weaknessResult}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Eigenschaften */}
        <Card>
          <CardContent className="py-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Schlechte Eigenschaften</h3>
                {properties.length > 0 ? (
                  <p className="text-sm">
                    {properties.map((p, i) => (
                      <span key={i}>
                        <span className="font-medium">{p.value.name}</span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({p.roll})
                        </span>
                        {i < properties.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">-</p>
                )}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={rollProperties}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}