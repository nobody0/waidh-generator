import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Users, Download, Clock, MapPin, Sparkles } from 'lucide-react'
import { KerkerService } from '@/lib/generators/kerkerService'
import type { KerkerElementar } from '@/types/kerker'

interface KerkerSummaryCardProps {
  kerker: KerkerElementar
}

export function KerkerSummaryCard({ kerker }: KerkerSummaryCardProps) {
  const [showExport, setShowExport] = useState(false)
  
  // Berechne Gesamt-Statistiken
  const totalGuards = kerker.chambers.reduce((sum, chamber) => sum + chamber.guards.length, 0)
  const totalTraps = kerker.chambers.reduce((sum, chamber) => sum + chamber.traps.length, 0)
  const totalTreasureValue = kerker.chambers.reduce((sum, chamber) => {
    return sum + (chamber.treasure.value || 0)
  }, 0)

  const handleExportGM = () => {
    const content = KerkerService.exportForGM(kerker)
    downloadFile(`kerker-gm-${Date.now()}.md`, content)
  }

  const handleExportPlayers = () => {
    const content = KerkerService.exportForPlayers(kerker)
    downloadFile(`kerker-spieler-${Date.now()}.md`, content)
  }

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{kerker.name || 'Kerker-Elementar'}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowExport(!showExport)}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Export Buttons */}
        {showExport && (
          <div className="flex gap-2 p-3 bg-muted rounded-lg">
            <Button size="sm" onClick={handleExportGM}>
              <FileText className="w-4 h-4 mr-2" />
              GM Version
            </Button>
            <Button size="sm" variant="outline" onClick={handleExportPlayers}>
              <Users className="w-4 h-4 mr-2" />
              Spieler Version
            </Button>
          </div>
        )}

        {/* Basis-Informationen */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Thema:</span>
            <p className="font-medium">{kerker.theme.name}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Kammern:</span>
            <p className="font-medium">{kerker.chamberCount}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Umgebung:</span>
            <p className="font-medium">{kerker.environment.name}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Wächter-Stufen:</span>
            <p className="font-medium">{kerker.guardLevels.name}</p>
          </div>
        </div>

        {/* Atmosphäre */}
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm italic">{kerker.theme.atmosphere}</p>
        </div>

        {/* Statistiken */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Übersicht</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{totalGuards} Wächter</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-muted-foreground" />
              <span>{totalTraps} Fallen</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{kerker.regenerationTime}h Regeneration</span>
            </div>
            {totalTreasureValue > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">💰</span>
                <span>{totalTreasureValue} Taler</span>
              </div>
            )}
          </div>
        </div>

        {/* Kammer-Übersicht */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Kammern</h4>
          <div className="space-y-1">
            {kerker.chambers.map((chamber) => (
              <div
                key={chamber.id}
                className={`flex items-center justify-between p-2 rounded text-xs ${
                  chamber.isCore ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-muted'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    Kammer {chamber.number}
                    {chamber.isCore && ' ⭐'}
                  </span>
                  <span className="text-muted-foreground">
                    {chamber.guards.length} Wächter, {chamber.traps.length} Fallen
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {chamber.treasure.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Kernzauber */}
        {kerker.coreSpellContent && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <h4 className="font-medium text-sm">Kernzauber</h4>
            </div>
            <p className="text-sm">{kerker.coreSpellContent.name}</p>
            {kerker.coreSpellContent.special && (
              <p className="text-xs text-muted-foreground mt-1">
                {kerker.coreSpellContent.special}
              </p>
            )}
          </div>
        )}

        {/* Wächter-Erscheinung */}
        <div className="p-3 bg-muted rounded-lg">
          <h4 className="font-medium text-sm mb-1">Wächter-Erscheinung</h4>
          <p className="text-sm text-muted-foreground">{kerker.theme.guardAppearance}</p>
        </div>
      </CardContent>
    </Card>
  )
}