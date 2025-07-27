import { useState, useEffect, useCallback, memo } from 'react'
import { RefreshCw, Dices, ChevronLeft, ChevronRight, History, Trash2, X, Check, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DiceService } from '@/lib/dice/diceService'
import { KerkerService } from '@/lib/generators/kerkerService'
import { KerkerSummaryCard } from './KerkerSummaryCard'
import { KerkerVisualizer } from './KerkerVisualizer'
import { ChamberEditor } from './ChamberEditor'
import { DiceResultEditor } from './DiceResultEditor'
import { useKerkerHistory } from '@/hooks/useKerkerHistory'
import {
  chamberCountTable,
  themeTable,
  guardLevelTable,
  environmentTable,
  protectionTable,
  treasureTable,
  coreSpellTable
} from '@/data/tables/kerkerTables'
import type {
  KerkerElementar,
  KerkerTheme,
  GuardLevel,
  KerkerEnvironment,
  Chamber,
  CoreSpellContent
} from '@/types/kerker'

interface TableResult<T> {
  value: T
  roll: number
}

export const KerkerGeneratorSingle = memo(function KerkerGeneratorSingle() {
  // Phase 1: Grundstruktur
  const [chamberCountResult, setChamberCountResult] = useState<TableResult<number> | null>(null)
  const [themeResult, setThemeResult] = useState<TableResult<KerkerTheme> | null>(null)
  const [guardLevelResult, setGuardLevelResult] = useState<TableResult<GuardLevel> | null>(null)
  const [environmentResult, setEnvironmentResult] = useState<TableResult<KerkerEnvironment> | null>(null)
  
  // Phase 2: Kammer-Details
  const [currentPhase, setCurrentPhase] = useState<'structure' | 'details' | 'complete'>('structure')
  const [chambers, setChambers] = useState<Chamber[]>([])
  const [coreSpellResult, setCoreSpellResult] = useState<TableResult<CoreSpellContent> | null>(null)
  
  // UI State
  const [selectedChamber, setSelectedChamber] = useState<number | null>(null)
  const [editingChamber, setEditingChamber] = useState<Chamber | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Generierter Kerker
  const [kerker, setKerker] = useState<KerkerElementar | null>(null)
  
  // History
  const {
    historyLength,
    currentIndex,
    canGoPrevious,
    canGoNext,
    addKerker,
    goToPrevious,
    goToNext,
    deleteCurrent,
    clearHistory,
    currentKerker
  } = useKerkerHistory()

  // Load kerker from history when navigating
  const [isLoadingFromHistory, setIsLoadingFromHistory] = useState(false)
  
  useEffect(() => {
    if (currentKerker && currentIndex >= 0) {
      setIsLoadingFromHistory(true)
      setKerker(currentKerker)
      // Reconstruct state from kerker
      setChamberCountResult({ value: currentKerker.chamberCount, roll: 1 })
      setThemeResult({ value: currentKerker.theme, roll: 1 })
      setGuardLevelResult({ value: currentKerker.guardLevels, roll: 1 })
      setEnvironmentResult({ value: currentKerker.environment, roll: 1 })
      setChambers(currentKerker.chambers.filter(c => !c.isCore))
      setCoreSpellResult(currentKerker.coreSpellContent ? { value: currentKerker.coreSpellContent, roll: 1 } : null)
      setCurrentPhase('complete')
    }
  }, [currentKerker, currentIndex])

  // Phase 1 Würfelfunktionen
  const rollChamberCount = useCallback(() => {
    setIsGenerating(true)
    const result = DiceService.rollOnTable(chamberCountTable)
    setChamberCountResult({ value: result.value, roll: result.roll })
  }, [])

  const rollTheme = useCallback(() => {
    setIsGenerating(true)
    const result = DiceService.rollOnTable(themeTable)
    setThemeResult({ value: result.value, roll: result.roll })
  }, [])

  const rollGuardLevel = useCallback(() => {
    setIsGenerating(true)
    const result = DiceService.rollOnTable(guardLevelTable)
    setGuardLevelResult({ value: result.value, roll: result.roll })
  }, [])

  const rollEnvironment = useCallback(() => {
    setIsGenerating(true)
    const result = DiceService.rollOnTable(environmentTable)
    setEnvironmentResult({ value: result.value, roll: result.roll })
  }, [])

  // Alles für Phase 1 würfeln
  const rollAllStructure = useCallback(() => {
    setIsGenerating(true)
    const chamberCount = DiceService.rollOnTable(chamberCountTable)
    const theme = DiceService.rollOnTable(themeTable)
    const guardLevel = DiceService.rollOnTable(guardLevelTable)
    const environment = DiceService.rollOnTable(environmentTable)
    
    setChamberCountResult({ value: chamberCount.value, roll: chamberCount.roll })
    setThemeResult({ value: theme.value, roll: theme.roll })
    setGuardLevelResult({ value: guardLevel.value, roll: guardLevel.roll })
    setEnvironmentResult({ value: environment.value, roll: environment.roll })
  }, [])

  // Zu Phase 2 wechseln
  const proceedToDetails = useCallback(() => {
    if (chamberCountResult && themeResult && guardLevelResult && environmentResult) {
      setCurrentPhase('details')
      // Erstelle leere Kammern
      const newChambers: Chamber[] = []
      for (let i = 1; i <= chamberCountResult.value; i++) {
        // Würfle Schutz und Schatz für jede Kammer
        const protection = DiceService.rollOnTable(protectionTable)
        const treasure = DiceService.rollOnTable(treasureTable)
        
        // Berechne Wächter-Anzahl
        const guardCount = KerkerService.calculateGuardCount(protection.value)
        
        // Berechne Schatz-Wert wenn nötig
        let treasureValue: number | undefined
        if (treasure.value.id === 'coins') {
          treasureValue = DiceService.roll('5d6').total
        }
        
        const chamber = KerkerService.createChamber(
          i,
          protection.value,
          treasure.value,
          guardLevelResult.value,
          themeResult.value,
          guardCount,
          treasureValue
        )
        
        newChambers.push(chamber)
      }
      setChambers(newChambers)
      
      // Würfle Kernzauber
      const coreSpell = DiceService.rollOnTable(coreSpellTable)
      setCoreSpellResult({ value: coreSpell.value, roll: coreSpell.roll })
    }
  }, [chamberCountResult, themeResult, guardLevelResult, environmentResult])

  // Phase 2: Einzelne Kammer würfeln
  const rerollChamber = useCallback((chamberNumber: number) => {
    if (!themeResult || !guardLevelResult) return
    
    const protection = DiceService.rollOnTable(protectionTable)
    const treasure = DiceService.rollOnTable(treasureTable)
    
    const guardCount = KerkerService.calculateGuardCount(protection.value)
    let treasureValue: number | undefined
    if (treasure.value.id === 'coins') {
      treasureValue = DiceService.roll('5d6').total
    }
    
    const newChamber = KerkerService.createChamber(
      chamberNumber,
      protection.value,
      treasure.value,
      guardLevelResult.value,
      themeResult.value,
      guardCount,
      treasureValue
    )
    
    const newChambers = [...chambers]
    const index = chambers.findIndex(c => c.number === chamberNumber)
    if (index !== -1) {
      newChambers[index] = newChamber
      setChambers(newChambers)
    }
  }, [chambers, themeResult, guardLevelResult])

  // Kammer bearbeiten
  const handleChamberEdit = useCallback((chamber: Chamber) => {
    const newChambers = [...chambers]
    const index = chambers.findIndex(c => c.id === chamber.id)
    if (index !== -1) {
      newChambers[index] = chamber
      setChambers(newChambers)
    }
    setEditingChamber(null)
  }, [chambers])

  // Kammern neu ordnen
  const handleChamberReorder = useCallback((newChambers: Chamber[]) => {
    setChambers(newChambers)
  }, [])

  // Kerker fertigstellen
  const completeKerker = useCallback(() => {
    if (chamberCountResult && themeResult && guardLevelResult && environmentResult && coreSpellResult) {
      const newKerker = KerkerService.createKerker(
        chamberCountResult.value,
        themeResult.value,
        guardLevelResult.value,
        environmentResult.value,
        chambers,
        coreSpellResult.value
      )
      setKerker(newKerker)
      setCurrentPhase('complete')
      
      if (!isLoadingFromHistory && isGenerating) {
        addKerker(newKerker)
        setIsGenerating(false)
      }
      setIsLoadingFromHistory(false)
    }
  }, [chamberCountResult, themeResult, guardLevelResult, environmentResult, chambers, coreSpellResult, isLoadingFromHistory, isGenerating, addKerker])

  // Direct editing handlers
  const handleChamberCountEdit = useCallback((newRoll: number) => {
    setIsGenerating(true)
    const entry = chamberCountTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setChamberCountResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  const handleThemeEdit = useCallback((newRoll: number) => {
    setIsGenerating(true)
    const entry = themeTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setThemeResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  const handleGuardLevelEdit = useCallback((newRoll: number) => {
    setIsGenerating(true)
    const entry = guardLevelTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setGuardLevelResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  const handleEnvironmentEdit = useCallback((newRoll: number) => {
    setIsGenerating(true)
    const entry = environmentTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setEnvironmentResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  const handleCoreSpellEdit = useCallback((newRoll: number) => {
    setIsGenerating(true)
    const entry = coreSpellTable.entries.find(e => 
      typeof e.range === 'number' ? e.range === newRoll : newRoll >= e.range[0] && newRoll <= e.range[1]
    )
    if (entry) {
      setCoreSpellResult({ value: entry.value, roll: newRoll })
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* History Navigation */}
      {historyLength > 0 && (
        <div className="flex items-center justify-between">
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
                if (confirm('Möchtest du den aktuellen Kerker wirklich löschen?')) {
                  deleteCurrent()
                }
              }}
              disabled={historyLength === 0}
              title="Lösche aktuellen Kerker"
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                if (confirm(`Möchtest du wirklich alle ${historyLength} gespeicherten Kerker löschen?`)) {
                  clearHistory()
                }
              }}
              disabled={historyLength === 0}
              title="Lösche alle Kerker"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <History className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}

      <div className="grid xl:grid-cols-2 gap-4">
        {/* Links: Zusammenfassung/Visualisierung */}
        <div className="space-y-4">
          {kerker && currentPhase === 'complete' ? (
            <KerkerSummaryCard kerker={kerker} />
          ) : currentPhase === 'details' && chambers.length > 0 ? (
            <>
              <KerkerVisualizer
                chambers={chambers}
                selectedChamber={selectedChamber || undefined}
                onChamberSelect={setSelectedChamber}
                onChamberReorder={handleChamberReorder}
              />
              {selectedChamber && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Kammer {selectedChamber}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Schutz:</span>
                      <p className="text-sm font-medium">
                        {chambers[selectedChamber - 1]?.guards.length} Wächter,{' '}
                        {chambers[selectedChamber - 1]?.traps.length} Fallen
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Schatz:</span>
                      <p className="text-sm font-medium">
                        {chambers[selectedChamber - 1]?.treasure.name}
                        {chambers[selectedChamber - 1]?.treasure.value && 
                          ` (${chambers[selectedChamber - 1]?.treasure.value} Taler)`}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setEditingChamber(chambers[selectedChamber - 1])}
                      className="w-full"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Kammer bearbeiten
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="py-12">
                <p className="text-muted-foreground text-center">
                  Würfle die Grundstruktur um einen Kerker zu generieren
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Rechts: Würfeltabellen */}
        <div className="space-y-2">
          {currentPhase === 'structure' ? (
            <>
              {/* Phase 1: Grundstruktur */}
              <Button 
                onClick={rollAllStructure} 
                className="w-full gap-2"
                size="lg"
              >
                <Dices className="w-5 h-5" />
                Grundstruktur würfeln
              </Button>

              {/* Kammern */}
              <Card>
                <CardContent className="py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-xs">Anzahl Kammern</h3>
                      {chamberCountResult ? (
                        <div className="flex items-center gap-2">
                          <p className="text-xs">
                            <span className="font-medium">{chamberCountResult.value} Kammern</span>
                          </p>
                          <DiceResultEditor
                            value={chamberCountResult.roll}
                            min={1}
                            max={6}
                            onChange={handleChamberCountEdit}
                          />
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">-</p>
                      )}
                    </div>
                    <Button size="sm" variant="outline" onClick={rollChamberCount}>
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Thema */}
              <Card>
                <CardContent className="py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-xs">Thema</h3>
                      {themeResult ? (
                        <div className="flex items-center gap-2">
                          <p className="text-xs">
                            <span className="font-medium">{themeResult.value.name}</span>
                          </p>
                          <DiceResultEditor
                            value={themeResult.roll}
                            min={1}
                            max={6}
                            onChange={handleThemeEdit}
                          />
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">-</p>
                      )}
                    </div>
                    <Button size="sm" variant="outline" onClick={rollTheme}>
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Wächter-Stufen */}
              <Card>
                <CardContent className="py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-xs">Wächter-Stufen</h3>
                      {guardLevelResult ? (
                        <div className="flex items-center gap-2">
                          <p className="text-xs">
                            <span className="font-medium">{guardLevelResult.value.name}</span>
                          </p>
                          <DiceResultEditor
                            value={guardLevelResult.roll}
                            min={1}
                            max={6}
                            onChange={handleGuardLevelEdit}
                          />
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">-</p>
                      )}
                    </div>
                    <Button size="sm" variant="outline" onClick={rollGuardLevel}>
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Umgebung */}
              <Card>
                <CardContent className="py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-xs">Umgebung</h3>
                      {environmentResult ? (
                        <div className="flex items-center gap-2">
                          <p className="text-xs">
                            <span className="font-medium">{environmentResult.value.name}</span>
                          </p>
                          <DiceResultEditor
                            value={environmentResult.roll}
                            min={1}
                            max={6}
                            onChange={handleEnvironmentEdit}
                          />
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">-</p>
                      )}
                    </div>
                    <Button size="sm" variant="outline" onClick={rollEnvironment}>
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Weiter zu Phase 2 */}
              {chamberCountResult && themeResult && guardLevelResult && environmentResult && (
                <Button 
                  onClick={proceedToDetails}
                  className="w-full"
                  variant="default"
                >
                  Weiter zu Kammer-Details
                </Button>
              )}
            </>
          ) : currentPhase === 'details' ? (
            <>
              {/* Phase 2: Kammer-Details */}
              <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200/50 dark:border-blue-800/50">
                <CardContent className="py-2">
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    Phase 2: Klicke auf eine Kammer um sie zu bearbeiten
                  </p>
                </CardContent>
              </Card>

              {/* Kernzauber */}
              <Card>
                <CardContent className="py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-xs">Kernzauber-Inhalt</h3>
                      {coreSpellResult ? (
                        <div className="flex items-center gap-2">
                          <p className="text-xs">
                            <span className="font-medium">{coreSpellResult.value.name}</span>
                          </p>
                          <DiceResultEditor
                            value={coreSpellResult.roll}
                            min={1}
                            max={6}
                            onChange={handleCoreSpellEdit}
                          />
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">-</p>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        const result = DiceService.rollOnTable(coreSpellTable)
                        setCoreSpellResult({ value: result.value, roll: result.roll })
                      }}
                    >
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Kammer-Liste */}
              <div className="space-y-2">
                {chambers.map((chamber) => (
                  <Card 
                    key={chamber.id}
                    className={selectedChamber === chamber.number ? 'ring-2 ring-primary' : ''}
                  >
                    <CardContent className="py-2">
                      <div className="flex items-center justify-between gap-2">
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => setSelectedChamber(chamber.number)}
                        >
                          <h4 className="font-medium text-xs">Kammer {chamber.number}</h4>
                          <p className="text-xs text-muted-foreground">
                            {chamber.guards.length} Wächter, {chamber.traps.length} Fallen
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => rerollChamber(chamber.number)}
                        >
                          <RefreshCw className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Kerker fertigstellen */}
              <Button 
                onClick={completeKerker}
                className="w-full"
                variant="default"
              >
                <Check className="w-4 h-4 mr-2" />
                Kerker fertigstellen
              </Button>
            </>
          ) : (
            <>
              {/* Phase 3: Fertig */}
              <Card className="bg-green-50/50 dark:bg-green-900/10 border-green-200/50 dark:border-green-800/50">
                <CardContent className="py-2">
                  <p className="text-xs text-green-800 dark:text-green-200">
                    ✓ Kerker erfolgreich generiert!
                  </p>
                </CardContent>
              </Card>

              <Button
                onClick={() => {
                  // Reset für neuen Kerker
                  setChamberCountResult(null)
                  setThemeResult(null)
                  setGuardLevelResult(null)
                  setEnvironmentResult(null)
                  setChambers([])
                  setCoreSpellResult(null)
                  setKerker(null)
                  setCurrentPhase('structure')
                  setSelectedChamber(null)
                  setIsGenerating(false)
                }}
                className="w-full"
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Neuen Kerker generieren
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Chamber Editor Modal */}
      {editingChamber && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <ChamberEditor
            chamber={editingChamber}
            onSave={handleChamberEdit}
            onClose={() => setEditingChamber(null)}
          />
        </div>
      )}
    </div>
  )
})