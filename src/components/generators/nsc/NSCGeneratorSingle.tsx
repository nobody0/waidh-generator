import { useState, useEffect, useCallback, memo } from 'react'
import { RefreshCw, Users, ChevronLeft, ChevronRight, History, Trash2, X, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { NSCService } from '@/lib/generators/nscService'
import { NSCSummaryCard } from './NSCSummaryCard'
import { useNSCHistory } from '@/hooks/useNSCHistory'
import { archetypenNachArt } from '@/data/tables/nscTables'
import type { NSC, NSCArt, NSCArchetyp } from '@/types/nsc'
import { NSC_ARTEN, NSC_ART_BESCHREIBUNG, NSC_STUFEN } from '@/types/nsc'

export const NSCGeneratorSingle = memo(function NSCGeneratorSingle() {
  // Generator State
  const [selectedArt, setSelectedArt] = useState<NSCArt | null>(null)
  const [stufe, setStufe] = useState<number>(5)
  const [selectedArchetyp, setSelectedArchetyp] = useState<NSCArchetyp | null>(null)
  const [nsc, setNSC] = useState<NSC | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [gruppenAnzahl, setGruppenAnzahl] = useState<number>(1)
  const [showGruppenGenerator, setShowGruppenGenerator] = useState(false)
  
  // NSC History
  const { 
    historyLength, 
    currentIndex, 
    canGoPrevious, 
    canGoNext, 
    addNSC, 
    goToPrevious, 
    goToNext,
    deleteCurrent,
    clearHistory,
    currentNSC 
  } = useNSCHistory()
  
  // Load NSC from history when navigating
  const [isLoadingFromHistory, setIsLoadingFromHistory] = useState(false)
  
  useEffect(() => {
    if (currentNSC && currentIndex >= 0) {
      setIsLoadingFromHistory(true)
      setNSC(currentNSC)
      setSelectedArt(currentNSC.art)
      setStufe(currentNSC.stufe)
      setSelectedArchetyp(currentNSC.archetyp || null)
    }
  }, [currentNSC, currentIndex])
  
  // Handle Art selection
  const handleArtSelect = useCallback((art: NSCArt) => {
    setSelectedArt(art)
    setSelectedArchetyp(null) // Reset archetyp when art changes
    setIsGenerating(true)
  }, [])
  
  // Handle Stufe change
  const handleStufeChange = useCallback((value: number[]) => {
    setStufe(value[0])
    setIsGenerating(true)
  }, [])
  
  // Handle Archetyp selection
  const handleArchetypSelect = useCallback((archetyp: NSCArchetyp | null) => {
    setSelectedArchetyp(archetyp)
    setIsGenerating(true)
  }, [])
  
  // Generate single NSC
  const generateNSC = useCallback(() => {
    if (!selectedArt) return
    
    setIsGenerating(true)
    const newNSC = NSCService.createNSC(selectedArt, stufe, selectedArchetyp || undefined)
    setNSC(newNSC)
    
    if (!isLoadingFromHistory) {
      addNSC(newNSC)
    }
    setIsLoadingFromHistory(false)
    setIsGenerating(false)
  }, [selectedArt, stufe, selectedArchetyp, isLoadingFromHistory, addNSC])
  
  // Generate NSC when parameters change
  useEffect(() => {
    if (selectedArt && isGenerating && !isLoadingFromHistory) {
      generateNSC()
    }
  }, [selectedArt, stufe, selectedArchetyp, isGenerating, isLoadingFromHistory, generateNSC])
  
  // Generate gruppe
  const generateGruppe = useCallback(() => {
    if (!selectedArt) return
    
    setIsGenerating(true)
    const gruppe = NSCService.createNSCGruppe(
      selectedArt, 
      stufe, 
      gruppenAnzahl,
      undefined,
      selectedArchetyp || undefined
    )
    
    // Add all members to history
    gruppe.mitglieder.forEach(mitglied => {
      addNSC(mitglied)
    })
    
    // Show last member
    const lastMember = gruppe.mitglieder[gruppe.mitglieder.length - 1]
    setNSC(lastMember)
    setIsGenerating(false)
    
    // Export group card
    const kampfkarte = NSCService.exportGruppeKampfkarte(gruppe)
    navigator.clipboard.writeText(kampfkarte)
  }, [selectedArt, stufe, gruppenAnzahl, selectedArchetyp, addNSC])
  
  return (
    <div className="grid xl:grid-cols-2 gap-4">
      {/* Links: NSC-Zusammenfassung */}
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
                  if (confirm('Möchtest du den aktuellen NSC wirklich löschen?')) {
                    deleteCurrent()
                  }
                }}
                disabled={historyLength === 0}
                title="Lösche aktuellen NSC"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (confirm(`Möchtest du wirklich alle ${historyLength} gespeicherten NSCs löschen?`)) {
                    clearHistory()
                  }
                }}
                disabled={historyLength === 0}
                title="Lösche alle NSCs"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <History className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        )}
        
        {nsc ? (
          <div className="overflow-auto">
            <NSCSummaryCard nsc={nsc} />
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <p className="text-muted-foreground text-center">
                Wähle eine Art und Stufe um einen NSC zu generieren
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Rechts: Generator-Kontrollen */}
      <div className="space-y-4">
        {/* Art-Auswahl */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">NSC-Art</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {NSC_ARTEN.map(art => (
                <Button
                  key={art}
                  variant={selectedArt === art ? 'default' : 'outline'}
                  onClick={() => handleArtSelect(art)}
                  className="flex flex-col h-auto py-3"
                >
                  <span className="font-medium capitalize">{art}</span>
                  <span className="text-xs opacity-70 mt-1">
                    {NSC_ART_BESCHREIBUNG[art].split(' - ')[1]}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Stufen-Slider */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stufe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stufe}</span>
                <span className="text-sm text-muted-foreground">
                  {stufe >= 8 ? '7 AP' : '6 AP'}
                </span>
              </div>
              <Slider
                value={[stufe]}
                onValueChange={handleStufeChange}
                min={NSC_STUFEN.min}
                max={NSC_STUFEN.max}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Anfänger</span>
                <span>Veteran</span>
                <span>Elite</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Archetyp-Auswahl */}
        {selectedArt && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Archetyp (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant={selectedArchetyp === null ? 'default' : 'outline'}
                  onClick={() => handleArchetypSelect(null)}
                  className="w-full justify-start"
                  size="sm"
                >
                  Zufälliger Archetyp
                </Button>
                
                {archetypenNachArt[selectedArt].map(archetyp => (
                  <Button
                    key={archetyp.id}
                    variant={selectedArchetyp?.id === archetyp.id ? 'default' : 'outline'}
                    onClick={() => handleArchetypSelect(archetyp)}
                    className="w-full justify-start"
                    size="sm"
                  >
                    {archetyp.name}
                    {archetyp.beschreibung && (
                      <span className="ml-2 text-xs opacity-70">
                        - {archetyp.beschreibung}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Aktionen */}
        <div className="space-y-2">
          {/* Neu generieren Button */}
          <Button
            onClick={generateNSC}
            disabled={!selectedArt}
            className="w-full"
            size="lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Neuen NSC generieren
          </Button>
          
          {/* Gruppen-Generator Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowGruppenGenerator(!showGruppenGenerator)}
            disabled={!selectedArt}
            className="w-full"
          >
            <Users className="w-4 h-4 mr-2" />
            Gruppe generieren
          </Button>
          
          {/* Gruppen-Generator */}
          {showGruppenGenerator && selectedArt && (
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Anzahl NSCs:</span>
                    <span className="text-xl font-bold">{gruppenAnzahl}</span>
                  </div>
                  <Slider
                    value={[gruppenAnzahl]}
                    onValueChange={(value) => setGruppenAnzahl(value[0])}
                    min={2}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <Button
                    onClick={generateGruppe}
                    className="w-full"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {gruppenAnzahl} {selectedArchetyp?.name || 'NSCs'} generieren
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Gruppe wird in die Zwischenablage kopiert
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Hinweise */}
        <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200/50 dark:border-blue-800/50">
          <CardContent className="py-3">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              💡 NSCs werden automatisch generiert. Archetypen sind optional und bestimmen Ausrüstung und Verhalten.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
})