import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Coins, Plus, Minus } from 'lucide-react'

export function RewardCalculator() {
  const [baseTaler] = useState(30)
  const [problemSeverity, setProblemSeverity] = useState(2)
  const [triggerDanger, setTriggerDanger] = useState(2)
  const [obstacleComplexity, setObstacleComplexity] = useState(2)
  const [complications, setComplications] = useState(0)
  const [partySize, setPartySize] = useState(4)

  // Berechne Modifikatoren
  const problemMod = 0.8 + (problemSeverity * 0.2)
  const triggerMod = 0.8 + (triggerDanger * 0.2)
  const obstacleMod = 0.9 + (obstacleComplexity * 0.1)
  const complicationMod = 1 + (complications * 0.1)

  const totalMod = problemMod * triggerMod * obstacleMod * complicationMod
  const talerPerCharacter = Math.round(baseTaler * totalMod)
  const totalReward = talerPerCharacter * partySize

  const additionalRewards = []
  if (totalMod > 1.5) additionalRewards.push('Ehrentitel oder Anerkennung')
  if (triggerDanger === 3) additionalRewards.push('Magischer Gegenstand möglich')
  if (problemSeverity === 1) additionalRewards.push('Handelsrabatte oder Gefallen')
  const influencePoints = totalMod > 1.3 ? Math.floor(totalMod) : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Belohnungsrechner</CardTitle>
          <CardDescription>
            Dynamische Berechnung basierend auf Schwierigkeit und Gefahr
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Problem-Schwierigkeit */}
          <div>
            <label className="text-sm font-medium">Problem-Schwierigkeit</label>
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProblemSeverity(Math.max(1, problemSeverity - 1))}
                disabled={problemSeverity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      level <= problemSeverity 
                        ? 'bg-red-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {level}
                  </div>
                ))}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProblemSeverity(Math.min(3, problemSeverity + 1))}
                disabled={problemSeverity >= 3}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                Faktor: ×{problemMod.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Auslöser-Gefahr */}
          <div>
            <label className="text-sm font-medium">Auslöser-Gefährlichkeit</label>
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setTriggerDanger(Math.max(1, triggerDanger - 1))}
                disabled={triggerDanger <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      level <= triggerDanger 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {level}
                  </div>
                ))}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setTriggerDanger(Math.min(3, triggerDanger + 1))}
                disabled={triggerDanger >= 3}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                Faktor: ×{triggerMod.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Hindernis-Komplexität */}
          <div>
            <label className="text-sm font-medium">Hindernis-Komplexität</label>
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setObstacleComplexity(Math.max(1, obstacleComplexity - 1))}
                disabled={obstacleComplexity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      level <= obstacleComplexity 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {level}
                  </div>
                ))}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setObstacleComplexity(Math.min(3, obstacleComplexity + 1))}
                disabled={obstacleComplexity >= 3}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                Faktor: ×{obstacleMod.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Komplikationen */}
          <div>
            <label className="text-sm font-medium">Zusätzliche Komplikationen</label>
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setComplications(Math.max(0, complications - 1))}
                disabled={complications <= 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="px-4 py-2 border rounded-md min-w-[60px] text-center">
                {complications}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setComplications(Math.min(4, complications + 1))}
                disabled={complications >= 4}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                Faktor: ×{complicationMod.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Gruppengröße */}
          <div>
            <label className="text-sm font-medium">Gruppengröße</label>
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPartySize(Math.max(1, partySize - 1))}
                disabled={partySize <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="px-4 py-2 border rounded-md min-w-[60px] text-center">
                {partySize}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPartySize(Math.min(8, partySize + 1))}
                disabled={partySize >= 8}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                Charaktere
              </span>
            </div>
          </div>

          {/* Ergebnis */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Basis-Belohnung:</span>
              <span className="text-sm">{baseTaler} Taler</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Gesamt-Modifikator:</span>
              <span className="text-sm font-bold">×{totalMod.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="flex items-center gap-2">
                <Coins className="w-5 h-5" />
                Pro Charakter:
              </span>
              <span>{talerPerCharacter} Taler</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Gesamt ({partySize} Charaktere):</span>
              <span>{totalReward} Taler</span>
            </div>
            
            {additionalRewards.length > 0 && (
              <div className="pt-3 space-y-2">
                <p className="text-sm font-medium">Zusätzliche Belohnungen:</p>
                {additionalRewards.map((reward, idx) => (
                  <Badge key={idx} variant="secondary">
                    {reward}
                  </Badge>
                ))}
              </div>
            )}
            
            {influencePoints > 0 && (
              <Badge variant="default">
                +{influencePoints} Einflusspunkte
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Belohnungs-Richtlinien</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold">Standard-Bereich</h4>
            <p className="text-xs text-muted-foreground">
              20-40 Taler pro Charakter ist der normale Bereich. Bei durchschnittlicher Schwierigkeit 
              landen die meisten Quests bei ~30 Talern.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold">Niedrige Belohnungen (20-25 Taler)</h4>
            <p className="text-xs text-muted-foreground">
              • Einfache Probleme (Wachstum)<br />
              • Geringe Gefahr (menschlicher Fehler)<br />
              • Simple Lösungen (fehlende Ausrüstung)
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold">Hohe Belohnungen (35-50+ Taler)</h4>
            <p className="text-xs text-muted-foreground">
              • Direkte Bedrohungen oder Ausbreitung<br />
              • Gefährliche Auslöser (Artefakt, Wandelholz)<br />
              • Komplexe Hindernisse<br />
              • Mehrere Komplikationen
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold">Nicht-monetäre Belohnungen</h4>
            <p className="text-xs text-muted-foreground">
              • <strong>Einflusspunkte:</strong> Bei hoher Gesamtschwierigkeit<br />
              • <strong>Magische Gegenstände:</strong> Bei Artefakt-Auslösern<br />
              • <strong>Soziale Vorteile:</strong> Titel, Kontakte, Gefallen<br />
              • <strong>Informationen:</strong> Hinweise auf größere Bedrohungen
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}