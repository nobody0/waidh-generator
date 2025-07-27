import { useState, useCallback, memo } from 'react'
import { Dices, History, Trash2, RotateCcw, Skull } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DiceService } from '@/lib/dice/diceService'
import { VergiftungEffectCard } from './VergiftungEffectCard'
import { useVergiftungHistory } from '@/hooks/useVergiftungHistory'
import { vergiftungTable, kränklichEffekte } from '@/data/tables/vergiftungTables'
import { useDiceStore } from '@/store/diceStore'
import type { VergiftungWurf, SpezialRegel } from '@/types/vergiftung'

export const VergiftungGeneratorSingle = memo(function VergiftungGeneratorSingle() {
  const [currentWurf, setCurrentWurf] = useState<VergiftungWurf | null>(null)
  const [zweitWurf, setZweitWurf] = useState<VergiftungWurf | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  
  // Spezialregeln
  const [istKränklich, setIstKränklich] = useState(false)
  const [istFeigling, setIstFeigling] = useState(false)
  
  const { soundEnabled } = useDiceStore()
  const { history, addWurf, clearHistory } = useVergiftungHistory()
  
  // Würfle Vergiftung
  const rollVergiftung = useCallback(async () => {
    setIsRolling(true)
    
    if (soundEnabled) {
      const audio = new Audio('/dice-roll.mp3')
      audio.play().catch(() => {})
    }
    
    // Animation delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Würfle 3W6
    const multiResult = DiceService.rollMultipleDice('3d6')
    const result = DiceService.rollOnTable(vergiftungTable, multiResult.total)
    
    // Bestimme aktive Spezialregeln
    const spezialRegeln: SpezialRegel[] = []
    if (istKränklich) spezialRegeln.push('kränklich')
    if (istFeigling) spezialRegeln.push('feigling')
    if (spezialRegeln.length === 0) spezialRegeln.push('keine')
    
    // Erstelle Wurf-Objekt
    const wurf: VergiftungWurf = {
      würfel: multiResult.dice,
      summe: multiResult.total,
      effekt: result.value,
      spezialRegeln,
      zeitstempel: new Date()
    }
    
    setCurrentWurf(wurf)
    addWurf(wurf)
    
    // Bei Kränklich: Zweiten Wurf
    if (istKränklich) {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const zweitMultiResult = DiceService.rollMultipleDice('3d6')
      const zweitResult = DiceService.rollOnTable(vergiftungTable, zweitMultiResult.total)
      
      const zweitWurfObj: VergiftungWurf = {
        würfel: zweitMultiResult.dice,
        summe: zweitMultiResult.total,
        effekt: zweitResult.value,
        spezialRegeln: ['kränklich'],
        zeitstempel: new Date()
      }
      
      setZweitWurf(zweitWurfObj)
      addWurf(zweitWurfObj)
    } else {
      setZweitWurf(null)
    }
    
    setIsRolling(false)
  }, [istKränklich, istFeigling, soundEnabled, addWurf])
  
  // Zeige historischen Wurf
  const showHistoricalWurf = useCallback((wurf: VergiftungWurf) => {
    setCurrentWurf(wurf)
    setZweitWurf(null) // Historie zeigt nur einzelne Würfe
    setShowHistory(false)
  }, [])
  
  return (
    <div className="grid xl:grid-cols-2 gap-4">
      {/* Links: Ergebnis-Anzeige */}
      <div className="flex flex-col gap-4">
        {currentWurf ? (
          <>
            <VergiftungEffectCard 
              effekt={currentWurf.effekt}
              würfel={currentWurf.würfel}
              summe={currentWurf.summe}
              spezialRegeln={currentWurf.spezialRegeln}
            />
            {zweitWurf && (
              <div className="space-y-2">
                <div className="text-center">
                  <span className="text-sm text-muted-foreground font-medium">
                    Kränklich - Zweiter Effekt:
                  </span>
                </div>
                <VergiftungEffectCard 
                  effekt={zweitWurf.effekt}
                  würfel={zweitWurf.würfel}
                  summe={zweitWurf.summe}
                  spezialRegeln={zweitWurf.spezialRegeln}
                />
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="py-16">
              <div className="text-center space-y-4">
                <Skull className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">
                  Klicke auf "Vergiftung würfeln" um den Effekt zu bestimmen
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Rechts: Kontrollen */}
      <div className="space-y-4">
        {/* Haupt-Würfel-Button */}
        <Card className="bg-gradient-to-br from-green-50 to-purple-50 dark:from-green-900/20 dark:to-purple-900/20">
          <CardContent className="py-8">
            <Button
              size="lg"
              onClick={rollVergiftung}
              disabled={isRolling}
              className="w-full h-24 text-xl font-medieval relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-green-600 to-purple-600 opacity-0 ${isRolling ? 'animate-pulse opacity-20' : ''}`} />
              <Dices className={`w-8 h-8 mr-3 ${isRolling ? 'animate-bounce' : ''}`} />
              {isRolling ? 'Gift wirkt...' : 'Vergiftung würfeln (3W6)'}
            </Button>
          </CardContent>
        </Card>
        
        {/* Spezialregeln */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spezialregeln</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="kraenklich"
                checked={istKränklich}
                onCheckedChange={(checked) => setIstKränklich(!!checked)}
              />
              <div className="space-y-1">
                <label htmlFor="kraenklich" className="text-sm font-medium cursor-pointer">
                  Kränklich
                </label>
                <p className="text-xs text-muted-foreground">
                  {kränklichEffekte.beschreibung}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="feigling"
                checked={istFeigling}
                onCheckedChange={(checked) => setIstFeigling(!!checked)}
              />
              <div className="space-y-1">
                <label htmlFor="feigling" className="text-sm font-medium cursor-pointer">
                  Feigling
                </label>
                <p className="text-xs text-muted-foreground">
                  Zusätzliche Flucht-Effekte bei Angst (5, 13)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* History */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-5 h-5" />
                Letzte Vergiftungen
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
                    if (confirm('Möchtest du wirklich alle Vergiftungswürfe löschen?')) {
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
                        <div className="flex gap-1">
                          {wurf.würfel.map((w, i) => (
                            <div key={i} className="w-6 h-6 bg-muted rounded text-xs flex items-center justify-center font-bold">
                              {w}
                            </div>
                          ))}
                        </div>
                        <div className={`text-lg font-bold ${
                          wurf.summe === 18 ? 'text-green-600 dark:text-green-400' :
                          wurf.summe <= 5 ? 'text-red-600 dark:text-red-400' :
                          ''
                        }`}>
                          {wurf.summe}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{wurf.effekt.name}</div>
                          {wurf.spezialRegeln.includes('kränklich') && (
                            <span className="text-xs text-purple-600 dark:text-purple-400">Kränklich</span>
                          )}
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
              💡 Vergiftungseffekte treten bei LP-Schaden durch Gift auf. 
              Die meisten Effekte dauern bis Ende des nächsten Zuges.
            </p>
          </CardContent>
        </Card>
        
        {/* Neu würfeln Button */}
        {currentWurf && (
          <Button
            variant="outline"
            onClick={rollVergiftung}
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