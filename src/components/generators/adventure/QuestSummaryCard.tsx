import { useState } from 'react'
import { MapPin, User, Coins, AlertTriangle, FileText, Copy, Download, Edit2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { AdventureQuest } from '@/types/adventure'
import { AdventureService } from '@/lib/generators/adventureService'
import { cn } from '@/lib/utils'

interface QuestSummaryCardProps {
  quest: AdventureQuest
  onUpdate?: (quest: AdventureQuest) => void
  className?: string
}

export function QuestSummaryCard({ quest, onUpdate, className }: QuestSummaryCardProps) {
  const [isEditingStory, setIsEditingStory] = useState(false)
  const [editedStory, setEditedStory] = useState(quest.story)

  const handleCopyText = () => {
    const text = AdventureService.exportAsText(quest)
    navigator.clipboard.writeText(text)
  }

  const handleDownloadText = () => {
    const text = AdventureService.exportAsText(quest)
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${quest.title || 'abenteuer'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadJSON = () => {
    const json = AdventureService.exportAsJSON(quest)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${quest.title || 'abenteuer'}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSaveStory = () => {
    if (onUpdate) {
      onUpdate({
        ...quest,
        story: editedStory
      })
    }
    setIsEditingStory(false)
  }

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medieval">
              {quest.title || 'Unbenanntes Abenteuer'}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {quest.problem.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {quest.trigger.type}
              </Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyText}
              title="Als Text kopieren"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDownloadText}
              title="Als Text speichern"
            >
              <FileText className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDownloadJSON}
              title="Als JSON speichern"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto space-y-4">
        {/* Ort & Questgeber */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>Ort</span>
            </div>
            <p className="text-sm font-medium">{quest.location.name}</p>
            <p className="text-xs text-muted-foreground">
              {quest.location.type}
              {quest.location.population && ` (${quest.location.population} Einwohner)`}
            </p>
            {quest.location.features && (
              <p className="text-xs text-muted-foreground italic">
                {quest.location.features.join(', ')}
              </p>
            )}
          </div>
          
          {quest.questGiver && (
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="w-3 h-3" />
                <span>Questgeber</span>
              </div>
              <p className="text-sm font-medium">{quest.questGiver.name}</p>
              <p className="text-xs text-muted-foreground">{quest.questGiver.role}</p>
              <p className="text-xs text-muted-foreground italic">
                {quest.questGiver.motivation}
              </p>
            </div>
          )}
        </div>

        <Separator />

        {/* Story */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Geschichte</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditingStory(!isEditingStory)}
            >
              <Edit2 className="w-3 h-3 mr-1" />
              {isEditingStory ? 'Abbrechen' : 'Bearbeiten'}
            </Button>
          </div>
          
          {isEditingStory ? (
            <div className="space-y-2">
              <div>
                <label className="text-xs text-muted-foreground">Einleitung</label>
                <textarea
                  className="w-full min-h-[80px] p-2 text-xs rounded border bg-background"
                  value={editedStory.introduction}
                  onChange={(e) => setEditedStory({ ...editedStory, introduction: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Hauptteil</label>
                <textarea
                  className="w-full min-h-[100px] p-2 text-xs rounded border bg-background"
                  value={editedStory.mainBody}
                  onChange={(e) => setEditedStory({ ...editedStory, mainBody: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Auflösung</label>
                <textarea
                  className="w-full min-h-[60px] p-2 text-xs rounded border bg-background"
                  value={editedStory.resolution}
                  onChange={(e) => setEditedStory({ ...editedStory, resolution: e.target.value })}
                />
              </div>
              <Button size="sm" onClick={handleSaveStory}>
                Speichern
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-muted-foreground">Einleitung</h4>
                <p className="text-xs leading-relaxed">{quest.story.introduction}</p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-muted-foreground">Hauptteil</h4>
                <p className="text-xs leading-relaxed whitespace-pre-line">{quest.story.mainBody}</p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-muted-foreground">Auflösung</h4>
                <p className="text-xs leading-relaxed">{quest.story.resolution}</p>
              </div>
            </>
          )}
        </div>

        {/* Komplikationen */}
        {quest.complications && quest.complications.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <AlertTriangle className="w-3 h-3" />
                <span>Komplikationen</span>
              </div>
              {quest.complications.map((comp) => (
                <div key={comp.id} className="text-xs">
                  <span className="font-medium">{comp.name}:</span>
                  <span className="text-muted-foreground ml-1">{comp.effect}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <Separator />

        {/* Belohnung */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Coins className="w-3 h-3" />
            <span>Belohnung</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{quest.reward.totalPerCharacter}</span>
            <span className="text-sm text-muted-foreground">Taler pro Charakter</span>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Basis: {quest.reward.baseTaler} Taler</div>
            <div>Problem-Faktor: ×{quest.reward.modifiers.problem.toFixed(1)}</div>
            <div>Auslöser-Faktor: ×{quest.reward.modifiers.trigger.toFixed(1)}</div>
            <div>Hindernis-Faktor: ×{quest.reward.modifiers.obstacle.toFixed(1)}</div>
            {quest.reward.modifiers.complications && quest.reward.modifiers.complications > 1 && (
              <div>Komplikationen: ×{quest.reward.modifiers.complications.toFixed(1)}</div>
            )}
          </div>
          
          {quest.reward.additionalRewards && (
            <div className="space-y-1">
              <p className="text-xs font-medium">Zusätzliche Belohnungen:</p>
              {quest.reward.additionalRewards.map((reward, idx) => (
                <p key={idx} className="text-xs text-muted-foreground">• {reward}</p>
              ))}
            </div>
          )}
          
          {quest.reward.influencePoints && (
            <Badge variant="default" className="text-xs">
              +{quest.reward.influencePoints} Einflusspunkte
            </Badge>
          )}
        </div>

        {/* Aufhänger */}
        {quest.story.hooks && quest.story.hooks.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Mögliche Aufhänger</h4>
              {quest.story.hooks.map((hook, idx) => (
                <p key={idx} className="text-xs text-muted-foreground">• {hook}</p>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}