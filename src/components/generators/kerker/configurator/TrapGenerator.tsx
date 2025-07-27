import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, Plus, Copy } from 'lucide-react'
import { generateTrapForTheme, themeTable } from '@/data/tables/kerkerTables'
import type { Trap, KerkerTheme } from '@/types/kerker'

export function TrapGenerator() {
  const [selectedTheme, setSelectedTheme] = useState<KerkerTheme>(themeTable.entries[0].value)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [generatedTrap, setGeneratedTrap] = useState<Trap | null>(null)
  const [customTrap, setCustomTrap] = useState<Partial<Trap>>({
    name: '',
    trigger: '',
    effect: '',
    difficulty: 15,
    resetTime: '1 Stunde'
  })

  const handleGenerateTrap = () => {
    const trap = generateTrapForTheme(selectedTheme, difficulty)
    setGeneratedTrap(trap)
  }

  const handleCopyTrap = (trap: Trap) => {
    const trapText = `${trap.name}
Auslöser: ${trap.trigger}
Effekt: ${trap.effect}
Entdecken: SW ${trap.difficulty}
Reset: ${trap.resetTime || 'Manuell'}`
    
    navigator.clipboard.writeText(trapText)
  }

  const difficultyModifiers = {
    easy: -5,
    medium: 0,
    hard: 5
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Fallen-Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Thema</Label>
              <Select 
                value={selectedTheme.id} 
                onValueChange={(value) => {
                  const theme = themeTable.entries.find(e => e.value.id === value)?.value
                  if (theme) setSelectedTheme(theme)
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themeTable.entries.map((entry) => (
                    <SelectItem key={entry.value.id} value={entry.value.id}>
                      {entry.value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Schwierigkeit</Label>
              <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Leicht (-5 SW)</SelectItem>
                  <SelectItem value="medium">Mittel (±0 SW)</SelectItem>
                  <SelectItem value="hard">Schwer (+5 SW)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleGenerateTrap} className="w-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Falle generieren
          </Button>

          {generatedTrap && (
            <Card className="bg-muted">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{generatedTrap.name}</CardTitle>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopyTrap(generatedTrap)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Auslöser:</span> {generatedTrap.trigger}
                </div>
                <div>
                  <span className="font-medium">Effekt:</span> {generatedTrap.effect}
                </div>
                <div>
                  <span className="font-medium">Entdecken:</span> SW {generatedTrap.difficulty}
                </div>
                {generatedTrap.resetTime && (
                  <div>
                    <span className="font-medium">Reset:</span> {generatedTrap.resetTime}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Eigene Falle erstellen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={customTrap.name || ''}
              onChange={(e) => setCustomTrap({ ...customTrap, name: e.target.value })}
              placeholder="z.B. Feuerpfeil-Falle"
            />
          </div>

          <div>
            <Label>Auslöser</Label>
            <Input
              value={customTrap.trigger || ''}
              onChange={(e) => setCustomTrap({ ...customTrap, trigger: e.target.value })}
              placeholder="z.B. Druckplatte, Stolperdraht, Magischer Sensor"
            />
          </div>

          <div>
            <Label>Effekt</Label>
            <Textarea
              value={customTrap.effect || ''}
              onChange={(e) => setCustomTrap({ ...customTrap, effect: e.target.value })}
              placeholder="z.B. 3W6 Feuerschaden, Ziele werden 10m zurückgeschleudert"
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Entdeckungs-Schwierigkeit</Label>
              <Input
                type="number"
                value={customTrap.difficulty || 15}
                onChange={(e) => setCustomTrap({ ...customTrap, difficulty: parseInt(e.target.value) })}
                min={5}
                max={30}
              />
            </div>

            <div>
              <Label>Reset-Zeit</Label>
              <Input
                value={customTrap.resetTime || ''}
                onChange={(e) => setCustomTrap({ ...customTrap, resetTime: e.target.value })}
                placeholder="z.B. 1 Stunde, Sofort, Manuell"
              />
            </div>
          </div>

          {customTrap.name && customTrap.trigger && customTrap.effect && (
            <Card className="bg-muted">
              <CardContent className="py-4">
                <h4 className="font-medium mb-2">Vorschau:</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">{customTrap.name}</span></p>
                  <p>Auslöser: {customTrap.trigger}</p>
                  <p>Effekt: {customTrap.effect}</p>
                  <p>SW {customTrap.difficulty} | Reset: {customTrap.resetTime || 'Manuell'}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card className="bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-200/50 dark:border-yellow-800/50">
        <CardContent className="py-4">
          <h3 className="font-medium mb-2">Fallen-Richtlinien</h3>
          <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-1">Schwierigkeitsgrade:</h4>
              <ul className="space-y-1">
                <li>• SW 10-14: Leicht zu entdecken</li>
                <li>• SW 15-19: Normal versteckt</li>
                <li>• SW 20-24: Gut versteckt</li>
                <li>• SW 25+: Meisterhaft versteckt</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Schadensrichtlinien:</h4>
              <ul className="space-y-1">
                <li>• 1W6: Leichter Schaden</li>
                <li>• 2W6: Mittlerer Schaden</li>
                <li>• 3W6: Schwerer Schaden</li>
                <li>• 4W6+: Tödliche Gefahr</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}