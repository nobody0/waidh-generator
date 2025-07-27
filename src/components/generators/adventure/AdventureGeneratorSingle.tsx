import { useState, useEffect, useCallback, memo } from 'react'
import { RefreshCw, Dices, ChevronLeft, ChevronRight, History, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DiceService } from '@/lib/dice/diceService'
import { AdventureService } from '@/lib/generators/adventureService'
import { QuestSummaryCard } from './QuestSummaryCard'
import { DiceResultEditor } from '../monster/DiceResultEditor'
import { useAdventureHistory } from '@/hooks/useAdventureHistory'
import { 
  problemTable,
  triggerTable,
  obstacleTable
} from '@/data/tables/adventureTables'
import type { 
  AdventureQuest,
  AdventureProblem,
  AdventureTrigger,
  AdventureObstacle
} from '@/types/adventure'

interface TableResult<T> {
  value: T
  roll: number
}

export const AdventureGeneratorSingle = memo(function AdventureGeneratorSingle() {
  // Würfelergebnisse
  const [problemResult, setProblemResult] = useState<TableResult<AdventureProblem> | null>(null)
  const [triggerResult, setTriggerResult] = useState<TableResult<AdventureTrigger> | null>(null)
  const [obstacleResult, setObstacleResult] = useState<TableResult<AdventureObstacle> | null>(null)
  
  // Generierte Quest
  const [quest, setQuest] = useState<AdventureQuest | null>(null)
  
  // Track if we're generating a new quest
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Quest History
  const { 
    historyLength, 
    currentIndex, 
    canGoPrevious, 
    canGoNext, 
    addQuest, 
    goToPrevious, 
    goToNext,
    deleteCurrent,
    clearHistory,
    currentQuest 
  } = useAdventureHistory()

  // Load quest from history when navigating
  useEffect(() => {
    if (currentQuest && currentIndex >= 0) {
      setIsLoadingFromHistory(true)
      setQuest(currentQuest)
      // Reconstruct the state from the quest
      setProblemResult({ value: currentQuest.problem, roll: 1 })
      setTriggerResult({ value: currentQuest.trigger, roll: 1 })
      setObstacleResult({ value: currentQuest.obstacle, roll: 1 })
    }
  }, [currentQuest, currentIndex])

  // Würfle Problem
  const rollProblem = useCallback(() => {
    setIsGenerating(true)
    let result = DiceService.rollOnTable(problemTable)
    // Verhindere gleiches Ergebnis
    let attempts = 0
    while (problemResult && result.value.id === problemResult.value.id && attempts < 10) {
      result = DiceService.rollOnTable(problemTable)
      attempts++
    }
    setProblemResult({ value: result.value, roll: result.roll })
  }, [problemResult])

  // Würfle Auslöser
  const rollTrigger = useCallback(() => {
    setIsGenerating(true)
    let result = DiceService.rollOnTable(triggerTable)
    let attempts = 0
    while (triggerResult && result.value.id === triggerResult.value.id && attempts < 10) {
      result = DiceService.rollOnTable(triggerTable)
      attempts++
    }
    setTriggerResult({ value: result.value, roll: result.roll })
  }, [triggerResult])

  // Würfle Hindernis
  const rollObstacle = useCallback(() => {
    setIsGenerating(true)
    let result = DiceService.rollOnTable(obstacleTable)
    let attempts = 0
    while (obstacleResult && result.value.id === obstacleResult.value.id && attempts < 10) {
      result = DiceService.rollOnTable(obstacleTable)
      attempts++
    }
    setObstacleResult({ value: result.value, roll: result.roll })
  }, [obstacleResult])

  // Alles würfeln
  const rollAll = useCallback(() => {
    // Mark that we're generating a new quest
    setIsGenerating(true)
    
    // Würfle Problem
    const problemResult = DiceService.rollOnTable(problemTable)
    
    // Würfle Auslöser
    const triggerResult = DiceService.rollOnTable(triggerTable)
    
    // Würfle Hindernis
    const obstacleResult = DiceService.rollOnTable(obstacleTable)
    
    // Update all states at once
    setProblemResult({ value: problemResult.value, roll: problemResult.roll })
    setTriggerResult({ value: triggerResult.value, roll: triggerResult.roll })
    setObstacleResult({ value: obstacleResult.value, roll: obstacleResult.roll })
  }, [])

  // Direct editing handlers
  const handleProblemEdit = useCallback((newRoll: number) => {
    setIsGenerating(true)
    const entry = problemTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setProblemResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  const handleTriggerEdit = useCallback((newRoll: number) => {
    setIsGenerating(true)
    const entry = triggerTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setTriggerResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  const handleObstacleEdit = useCallback((newRoll: number) => {
    setIsGenerating(true)
    const entry = obstacleTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setObstacleResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  // Flag to track if we're loading from history
  const [isLoadingFromHistory, setIsLoadingFromHistory] = useState(false)

  // Erstelle Quest wenn alle Werte vorhanden sind
  useEffect(() => {
    if (problemResult && triggerResult && obstacleResult) {
      const newQuest = AdventureService.createQuest(
        problemResult.value,
        triggerResult.value,
        obstacleResult.value
      )
      setQuest(newQuest)
      
      // Only add to history if this is a new generation
      if (!isLoadingFromHistory && isGenerating) {
        addQuest(newQuest)
        setIsGenerating(false)
      }
      setIsLoadingFromHistory(false)
    }
  }, [problemResult, triggerResult, obstacleResult, isLoadingFromHistory, isGenerating, addQuest])

  // Handle quest updates from editor
  const handleQuestUpdate = useCallback((updatedQuest: AdventureQuest) => {
    setQuest(updatedQuest)
    // Don't add to history for edits, only for new generations
  }, [])

  return (
    <div className="grid xl:grid-cols-2 gap-4">
      {/* Links: Quest-Zusammenfassung */}
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
                  if (confirm('Möchtest du das aktuelle Abenteuer wirklich löschen?')) {
                    deleteCurrent()
                  }
                }}
                disabled={historyLength === 0}
                title="Lösche aktuelles Abenteuer"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (confirm(`Möchtest du wirklich alle ${historyLength} gespeicherten Abenteuer löschen?`)) {
                    clearHistory()
                  }
                }}
                disabled={historyLength === 0}
                title="Lösche alle Abenteuer"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <History className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        )}
        
        {quest ? (
          <div className="overflow-auto">
            <QuestSummaryCard quest={quest} onUpdate={handleQuestUpdate} />
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <p className="text-muted-foreground text-center">
                Würfle die Tabellen um ein Abenteuer zu generieren
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

        {/* Problem */}
        <Card>
          <CardContent className="py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-medium text-xs">Problem</h3>
                {problemResult ? (
                  <div className="flex items-center gap-2">
                    <p className="text-xs">
                      <span className="font-medium">{problemResult.value.name}</span>
                    </p>
                    <DiceResultEditor
                      value={problemResult.roll}
                      min={1}
                      max={6}
                      onChange={handleProblemEdit}
                    />
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">-</p>
                )}
              </div>
              <Button size="sm" variant="outline" onClick={rollProblem}>
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Auslöser */}
        <Card>
          <CardContent className="py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-medium text-xs">Auslöser</h3>
                {triggerResult ? (
                  <div className="flex items-center gap-2">
                    <p className="text-xs">
                      <span className="font-medium">{triggerResult.value.name}</span>
                    </p>
                    <DiceResultEditor
                      value={triggerResult.roll}
                      min={1}
                      max={6}
                      onChange={handleTriggerEdit}
                    />
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">-</p>
                )}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={rollTrigger}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hindernis */}
        <Card>
          <CardContent className="py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-medium text-xs">Hindernis</h3>
                {obstacleResult ? (
                  <div className="flex items-center gap-2">
                    <p className="text-xs">
                      <span className="font-medium">{obstacleResult.value.name}</span>
                    </p>
                    <DiceResultEditor
                      value={obstacleResult.roll}
                      min={1}
                      max={6}
                      onChange={handleObstacleEdit}
                    />
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">-</p>
                )}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={rollObstacle}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Details für die gewürfelten Ergebnisse */}
        {problemResult && (
          <Card className="bg-muted/50">
            <CardContent className="py-2">
              <h4 className="text-xs font-medium mb-1">Problem-Details:</h4>
              <p className="text-xs text-muted-foreground">{problemResult.value.description}</p>
              {problemResult.value.examples.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  z.B.: {problemResult.value.examples[0]}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {triggerResult && (
          <Card className="bg-muted/50">
            <CardContent className="py-2">
              <h4 className="text-xs font-medium mb-1">Auslöser-Details:</h4>
              <p className="text-xs text-muted-foreground">{triggerResult.value.description}</p>
              {triggerResult.value.details && triggerResult.value.details.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Möglichkeit: {triggerResult.value.details[0]}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {obstacleResult && (
          <Card className="bg-muted/50">
            <CardContent className="py-2">
              <h4 className="text-xs font-medium mb-1">Hindernis-Details:</h4>
              <p className="text-xs text-muted-foreground">{obstacleResult.value.description}</p>
              {obstacleResult.value.solutions.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Lösungsansatz: {obstacleResult.value.solutions[0]}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Hinweise */}
        <Card className="bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-200/50 dark:border-yellow-800/50">
          <CardContent className="py-2">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              💡 Würfle die drei Tabellen um ein komplettes Abenteuer zu generieren. Die Story wird automatisch erstellt!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
})