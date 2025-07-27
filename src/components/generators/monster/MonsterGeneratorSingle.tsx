import { useState, useEffect, useCallback, memo } from 'react'
import { RefreshCw, Dices, ChevronLeft, ChevronRight, History, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DiceService } from '@/lib/dice/diceService'
import { MonsterService } from '@/lib/generators/monsterService'
import { MonsterSummaryCard } from './MonsterSummaryCard'
import { DiceResultEditor } from './DiceResultEditor'
import { AbilityDiceEditor } from './AbilityDiceEditor'
import { PropertyDiceEditor } from './PropertyDiceEditor'
import { useMonsterHistory } from '@/hooks/useMonsterHistory'
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

export const MonsterGeneratorSingle = memo(function MonsterGeneratorSingle() {
  // Würfelergebnisse
  const [ageResult, setAgeResult] = useState<TableResult<MonsterAge> | null>(null)
  const [strengthResult, setStrengthResult] = useState<TableResult<MonsterAttribute['type']> | null>(null)
  const [weaknessResult, setWeaknessResult] = useState<TableResult<MonsterAttribute['type']> | null>(null)
  const [abilities, setAbilities] = useState<MonsterAbility[]>([])
  const [properties, setProperties] = useState<TableResult<MonsterProperty>[]>([])
  
  // Generiertes Monster
  const [monster, setMonster] = useState<Monster | null>(null)
  
  // Track if we're generating a new monster
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Monster History
  const { 
    historyLength, 
    currentIndex, 
    canGoPrevious, 
    canGoNext, 
    addMonster, 
    goToPrevious, 
    goToNext,
    deleteCurrent,
    clearHistory,
    currentMonster 
  } = useMonsterHistory()

  // Load monster from history when navigating
  useEffect(() => {
    if (currentMonster && currentIndex >= 0) {
      setIsLoadingFromHistory(true)
      setMonster(currentMonster)
      // Reconstruct the state from the monster
      // This is a simplified version - in a real app we might store the full state
      setAgeResult({ value: currentMonster.age, roll: 1 })
      // Try to reconstruct strength/weakness from attributes
      const attrs = currentMonster.attributes
      const baseAttr = currentMonster.age.baseAttributes
      
      // Find which attribute has the highest bonus (likely strength)
      let maxBonus = -999
      let strengthAttr = 'stärke' as MonsterAttribute['type']
      Object.entries(attrs).forEach(([attr, value]) => {
        const bonus = value - baseAttr
        if (bonus > maxBonus) {
          maxBonus = bonus
          strengthAttr = attr as MonsterAttribute['type']
        }
      })
      
      // Find which has the lowest (likely weakness)
      let minBonus = 999
      let weaknessAttr = 'geschick' as MonsterAttribute['type']
      Object.entries(attrs).forEach(([attr, value]) => {
        const bonus = value - baseAttr
        if (bonus < minBonus) {
          minBonus = bonus
          weaknessAttr = attr as MonsterAttribute['type']
        }
      })
      
      setStrengthResult({ value: strengthAttr, roll: 1 })
      setWeaknessResult({ value: weaknessAttr, roll: 1 })
      setAbilities(currentMonster.abilities)
      setProperties(currentMonster.properties.map(p => ({ value: p, roll: 1 })))
    }
  }, [currentMonster, currentIndex])

  // Würfle Alter
  const rollAge = useCallback(() => {
    setIsGenerating(true)
    let result = DiceService.rollOnTable(monsterAgeTable)
    // Verhindere gleiches Ergebnis
    let attempts = 0
    while (ageResult && result.value.id === ageResult.value.id && attempts < 10) {
      result = DiceService.rollOnTable(monsterAgeTable)
      attempts++
    }
    setAgeResult({ value: result.value, roll: result.roll })
  }, [ageResult])

  // Würfle Stärke
  const rollStrength = useCallback(() => {
    setIsGenerating(true)
    let result = DiceService.rollOnTable(strengthAttributeTable)
    let attempts = 0
    // Bei 6 neu würfeln oder wenn gleiches Ergebnis
    while ((result.roll === 6 || (strengthResult && result.value === strengthResult.value)) && attempts < 10) {
      result = DiceService.rollOnTable(strengthAttributeTable)
      attempts++
    }
    setStrengthResult({ value: result.value, roll: result.roll })
  }, [strengthResult])

  // Würfle Schwäche
  const rollWeakness = useCallback(() => {
    setIsGenerating(true)
    let result = DiceService.rollOnTable(weaknessAttributeTable)
    let attempts = 0
    // Bei 6 neu würfeln oder wenn gleiches Ergebnis
    while ((result.roll === 6 || (weaknessResult && result.value === weaknessResult.value)) && attempts < 10) {
      result = DiceService.rollOnTable(weaknessAttributeTable)
      attempts++
    }
    setWeaknessResult({ value: result.value, roll: result.roll })
  }, [weaknessResult])

  // Würfle Fähigkeiten
  const rollAbilities = useCallback(() => {
    if (!ageResult || !strengthResult || !weaknessResult) return
    
    setIsGenerating(true)

    // Basis-Attribute mit Stärke/Schwäche
    const attributes: Record<MonsterAttribute['type'], number> = {
      stärke: ageResult.value.baseAttributes,
      geschick: ageResult.value.baseAttributes,
      willenskraft: ageResult.value.baseAttributes,
      logik: ageResult.value.baseAttributes,
      mystik: ageResult.value.baseAttributes
    }
    
    attributes[strengthResult.value] += ageResult.value.xValue
    attributes[weaknessResult.value] -= ageResult.value.yValue

    // Verteile Fähigkeiten
    const distribution = MonsterService.distributeAbilities(
      ageResult.value,
      attributes,
      strengthResult.value,
      weaknessResult.value
    )
    const newAbilities: MonsterAbility[] = []

    // Würfle für jedes Attribut
    Object.entries(distribution).forEach(([attr, count]) => {
      const attrAbilities = MonsterService.rollAbilitiesForAttribute(
        attr as MonsterAttribute['type'],
        count,
        newAbilities
      )
      newAbilities.push(...attrAbilities)
    })

    setAbilities(newAbilities)
  }, [ageResult, strengthResult, weaknessResult])

  // Handle ability changes from editor
  const handleAbilityChange = useCallback((newAbilities: MonsterAbility[]) => {
    setIsGenerating(true)
    setAbilities(newAbilities)
  }, [])

  // Handle property changes from editor
  const handlePropertyChange = useCallback((newProperties: Array<{ value: MonsterProperty; roll: number }>) => {
    setIsGenerating(true)
    setProperties(newProperties)
  }, [])

  // Würfle Eigenschaften
  const rollProperties = useCallback(() => {
    setIsGenerating(true)
    const props: TableResult<MonsterProperty>[] = []
    
    // Würfle bis wir zwei unterschiedliche Eigenschaften haben
    const usedIds = new Set<string>()
    // Füge existierende IDs hinzu um Duplikate zu vermeiden
    properties.forEach(p => usedIds.add(p.value.id))
    
    let attempts = 0
    while (props.length < 2 && attempts < 20) {
      const result = DiceService.rollOnTable(badPropertiesTable)
      if (!usedIds.has(result.value.id)) {
        props.push({ value: result.value, roll: result.roll })
        usedIds.add(result.value.id)
      }
      attempts++
    }
    
    setProperties(props)
  }, [properties])

  // Alles würfeln
  const rollAll = useCallback(() => {
    // Mark that we're generating a new monster
    setIsGenerating(true)
    
    // Würfle Alter
    const ageResult = DiceService.rollOnTable(monsterAgeTable)
    
    // Würfle Stärke
    let strengthResult = DiceService.rollOnTable(strengthAttributeTable)
    while (strengthResult.roll === 6) {
      strengthResult = DiceService.rollOnTable(strengthAttributeTable)
    }
    
    // Würfle Schwäche
    let weaknessResult = DiceService.rollOnTable(weaknessAttributeTable)
    while (weaknessResult.roll === 6) {
      weaknessResult = DiceService.rollOnTable(weaknessAttributeTable)
    }
    
    // Basis-Attribute mit Stärke/Schwäche
    const attributes: Record<MonsterAttribute['type'], number> = {
      stärke: ageResult.value.baseAttributes,
      geschick: ageResult.value.baseAttributes,
      willenskraft: ageResult.value.baseAttributes,
      logik: ageResult.value.baseAttributes,
      mystik: ageResult.value.baseAttributes
    }
    
    attributes[strengthResult.value] += ageResult.value.xValue
    attributes[weaknessResult.value] -= ageResult.value.yValue

    // Verteile und würfle Fähigkeiten
    const distribution = MonsterService.distributeAbilities(
      ageResult.value,
      attributes,
      strengthResult.value,
      weaknessResult.value
    )
    const newAbilities: MonsterAbility[] = []
    Object.entries(distribution).forEach(([attr, count]) => {
      const attrAbilities = MonsterService.rollAbilitiesForAttribute(
        attr as MonsterAttribute['type'],
        count,
        newAbilities
      )
      newAbilities.push(...attrAbilities)
    })
    
    // Würfle Eigenschaften
    const props: TableResult<MonsterProperty>[] = []
    const usedIds = new Set<string>()
    while (props.length < 2) {
      const result = DiceService.rollOnTable(badPropertiesTable)
      if (!usedIds.has(result.value.id)) {
        props.push({ value: result.value, roll: result.roll })
        usedIds.add(result.value.id)
      }
    }
    
    // Update all states at once
    setAgeResult({ value: ageResult.value, roll: ageResult.roll })
    setStrengthResult({ value: strengthResult.value, roll: strengthResult.roll })
    setWeaknessResult({ value: weaknessResult.value, roll: weaknessResult.roll })
    setAbilities(newAbilities)
    setProperties(props)
  }, [])

  // Direct editing handlers
  const handleAgeEdit = useCallback((newRoll: number) => {
    setIsGenerating(true)
    const entry = monsterAgeTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setAgeResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  const handleStrengthEdit = useCallback((newRoll: number) => {
    if (newRoll === 6) return // Don't allow 6
    setIsGenerating(true)
    const entry = strengthAttributeTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setStrengthResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  const handleWeaknessEdit = useCallback((newRoll: number) => {
    if (newRoll === 6) return // Don't allow 6
    setIsGenerating(true)
    const entry = weaknessAttributeTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setWeaknessResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  // Flag to track if we're loading from history
  const [isLoadingFromHistory, setIsLoadingFromHistory] = useState(false)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key) {
        case ' ':
          e.preventDefault()
          rollAll()
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (canGoPrevious) goToPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          if (canGoNext) goToNext()
          break
        case 'Delete':
          e.preventDefault()
          if (currentIndex >= 0) deleteCurrent()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [rollAll, canGoPrevious, canGoNext, goToPrevious, goToNext, currentIndex, deleteCurrent])

  // Erstelle Monster wenn alle Werte vorhanden sind
  useEffect(() => {
    if (ageResult && strengthResult && weaknessResult && abilities.length > 0) {
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
      
      // Only add to history if this is a new generation
      if (!isLoadingFromHistory && isGenerating) {
        addMonster(newMonster)
        setIsGenerating(false)
      }
      setIsLoadingFromHistory(false)
    }
  }, [ageResult, strengthResult, weaknessResult, abilities, properties, isLoadingFromHistory, isGenerating, addMonster])

  return (
    <div className="grid xl:grid-cols-2 gap-4">
      {/* Links: Monster-Zusammenfassung */}
      <div className="flex flex-col h-full">
        {/* History Navigation */}
        {historyLength > 0 && (
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={goToPrevious}
                disabled={!canGoPrevious}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {historyLength}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={goToNext}
                disabled={!canGoNext}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (confirm('Möchtest du das aktuelle Monster wirklich löschen?')) {
                    deleteCurrent()
                  }
                }}
                disabled={historyLength === 0}
                title="Lösche aktuelles Monster"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (confirm(`Möchtest du wirklich alle ${historyLength} gespeicherten Monster löschen?`)) {
                    clearHistory()
                  }
                }}
                disabled={historyLength === 0}
                title="Lösche alle Monster"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <History className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        )}
        
        {monster ? (
          <div className="overflow-auto">
            <MonsterSummaryCard monster={monster} />
          </div>
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
      <div className="space-y-2">
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
          <CardContent className="py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-medium text-xs">Monster-Alter</h3>
                {ageResult ? (
                  <div className="flex items-center gap-2">
                    <p className="text-xs">
                      <span className="font-medium">{ageResult.value.name}</span>
                    </p>
                    <DiceResultEditor
                      value={ageResult.roll}
                      min={1}
                      max={6}
                      onChange={handleAgeEdit}
                    />
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">-</p>
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
          <CardContent className="py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-medium text-xs">Stärke-Attribut</h3>
                {strengthResult && ageResult ? (
                  <div className="flex items-center gap-2">
                    <p className="text-xs">
                      <span className="font-medium capitalize">{strengthResult.value}</span>
                      <span className="text-green-600 dark:text-green-400"> +{ageResult.value.xValue}</span>
                    </p>
                    <DiceResultEditor
                      value={strengthResult.roll}
                      min={1}
                      max={5} // Max 5 because 6 is reroll
                      onChange={handleStrengthEdit}
                    />
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">-</p>
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
          <CardContent className="py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-medium text-xs">Schwäche-Attribut</h3>
                {weaknessResult && ageResult ? (
                  <div className="flex items-center gap-2">
                    <p className="text-xs">
                      <span className="font-medium capitalize">{weaknessResult.value}</span>
                      <span className="text-red-600 dark:text-red-400"> -{ageResult.value.yValue}</span>
                    </p>
                    <DiceResultEditor
                      value={weaknessResult.roll}
                      min={1}
                      max={5} // Max 5 because 6 is reroll
                      onChange={handleWeaknessEdit}
                    />
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">-</p>
                )}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={rollWeakness}
                disabled={!ageResult}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fähigkeiten */}
        <Card>
          <CardContent className="py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-medium text-xs">Fähigkeiten</h3>
                {abilities.length > 0 && ageResult && strengthResult && weaknessResult ? (
                  <AbilityDiceEditor 
                    abilities={abilities}
                    age={ageResult.value}
                    strengthAttr={strengthResult.value}
                    weaknessAttr={weaknessResult.value}
                    onChange={handleAbilityChange} 
                  />
                ) : (
                  <p className="text-xs text-muted-foreground">-</p>
                )}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={rollAbilities}
                disabled={!weaknessResult}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Eigenschaften */}
        <Card>
          <CardContent className="py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-medium text-xs">Schlechte Eigenschaften</h3>
                {properties.length > 0 ? (
                  <PropertyDiceEditor 
                    properties={properties} 
                    onChange={handlePropertyChange} 
                  />
                ) : (
                  <p className="text-xs text-muted-foreground">-</p>
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

        {/* Hinweise */}
        <Card className="bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-200/50 dark:border-yellow-800/50">
          <CardContent className="py-2">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              💡 Würfle der Reihe nach oder nutze "Alles würfeln" für ein komplettes Monster
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
})