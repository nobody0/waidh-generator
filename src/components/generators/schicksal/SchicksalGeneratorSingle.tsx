import { useState, useCallback, memo } from 'react'
import { Dices, History, Trash2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DiceService } from '@/lib/dice/diceService'
import { SchicksalDisplay } from './SchicksalDisplay'
import { useSchicksalHistory } from '@/hooks/useSchicksalHistory'
import { schicksalTable, schicksalBeispiele } from '@/data/tables/schicksalTables'
import { useDiceStore } from '@/store/diceStore'
import type { SchicksalKontext, SchicksalWurf } from '@/types/schicksal'
import { SCHICKSAL_KONTEXT_BESCHREIBUNG } from '@/types/schicksal'

export const SchicksalGeneratorSingle = memo(function SchicksalGeneratorSingle() {
  const [currentWurf, setCurrentWurf] = useState<SchicksalWurf | null>(null)
  const [selectedKontext, setSelectedKontext] = useState<SchicksalKontext>('allgemein')
  const [isRolling, setIsRolling] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  
  const { soundEnabled } = useDiceStore()
  const { history, addWurf, clearHistory } = useSchicksalHistory()
  
  // Würfle Schicksal
  const rollSchicksal = useCallback(async () => {
    setIsRolling(true)
    
    if (soundEnabled) {
      const audio = new Audio('/dice-roll.mp3')
      audio.play().catch(() => {})
    }
    
    // Animation delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const result = DiceService.rollOnTable(schicksalTable)
    
    
    // Erstelle Wurf-Objekt
    const wurf: SchicksalWurf = {
      wurf: result.roll,
      ergebnis: result.value,
      kontext: SCHICKSAL_KONTEXT_BESCHREIBUNG[selectedKontext],
      zeitstempel: new Date()
    }
    
    setCurrentWurf(wurf)
    addWurf(wurf)
    setIsRolling(false)
  }, [selectedKontext, soundEnabled, addWurf])
  
  // Zeige historischen Wurf
  const showHistoricalWurf = useCallback((wurf: SchicksalWurf) => {
    setCurrentWurf(wurf)
    setShowHistory(false)
  }, [])
  
  return (
    <div className="grid xl:grid-cols-2 gap-4">
      {/* Links: Ergebnis-Anzeige */}
      <div className="flex flex-col h-full">
        {currentWurf ? (
          <SchicksalDisplay 
            result={currentWurf.ergebnis}
            wurf={currentWurf.wurf}
            kontext={currentWurf.kontext}
            beispiele={schicksalBeispiele[selectedKontext]?.[currentWurf.ergebnis.id]}
          />
        ) : (
          <Card>
            <CardContent className="py-16">
              <div className="text-center space-y-4">
                <Dices className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">
                  Klicke auf "Schicksal würfeln" um zu sehen, was das Schicksal bereithält
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Rechts: Kontrollen */}
      <div className="space-y-4">
        {/* Haupt-Würfel-Button */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <CardContent className="py-8">
            <Button
              size="lg"
              onClick={rollSchicksal}
              disabled={isRolling}
              className="w-full h-24 text-xl font-medieval relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 ${isRolling ? 'animate-pulse opacity-20' : ''}`} />
              <Dices className={`w-8 h-8 mr-3 ${isRolling ? 'animate-spin' : ''}`} />
              {isRolling ? 'Das Schicksal entscheidet...' : 'Schicksal würfeln (1W6)'}
            </Button>
          </CardContent>
        </Card>
        
        {/* Kontext-Auswahl */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Kontext-Anpassung</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedKontext} onValueChange={(value) => setSelectedKontext(value as SchicksalKontext)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SCHICKSAL_KONTEXT_BESCHREIBUNG).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">
              Der Kontext beeinflusst die generierten Beispiele
            </p>
          </CardContent>
        </Card>
        
        {/* History */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-5 h-5" />
                Letzte Würfe
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowHistory(!showHistory)}
                  disabled={history.length === 0}
                >
                  {showHistory ? 'Verbergen' : 'Zeigen'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm('Möchtest du wirklich alle Schicksalswürfe löschen?')) {
                      clearHistory()
                    }
                  }}
                  disabled={history.length === 0}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          {showHistory && history.length > 0 && (
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {history.map((wurf, index) => (
                  <button
                    key={index}
                    onClick={() => showHistoricalWurf(wurf)}
                    className="w-full text-left p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center ${
                          wurf.wurf === 1 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                          wurf.wurf === 6 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          'bg-muted'
                        }`}>
                          {wurf.wurf}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{wurf.ergebnis.name}</div>
                          <div className="text-xs text-muted-foreground">{wurf.kontext}</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(wurf.zeitstempel).toLocaleTimeString('de-DE', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
        
        {/* Hinweise */}
        <Card className="bg-purple-50/50 dark:bg-purple-900/10 border-purple-200/50 dark:border-purple-800/50">
          <CardContent className="py-3">
            <p className="text-xs text-purple-800 dark:text-purple-200">
              💡 Schicksalswürfe helfen dem Spielleiter, dramatische Wendungen zu gestalten. 
              Niedrige Würfe = Probleme, hohe Würfe = Chancen
            </p>
          </CardContent>
        </Card>
        
        {/* Neu würfeln Button */}
        {currentWurf && (
          <Button
            variant="outline"
            onClick={rollSchicksal}
            disabled={isRolling}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Erneut würfeln
          </Button>
        )}
      </div>
    </div>
  )
})