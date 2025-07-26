import { useState } from 'react'
import { Copy, Save, FileText, FileJson } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMonsterStore } from '@/store/monsterStore'
import { MonsterService } from '@/lib/generators/monsterService'
import { ATTRIBUTE_SHORT } from '@/types/monster'
import type { Monster } from '@/types/monster'

export function MonsterDisplay() {
  const { currentMonster, saveMonster } = useMonsterStore()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [saved, setSaved] = useState(false)

  if (!currentMonster) {
    return <div>Kein Monster generiert</div>
  }

  const handleSave = () => {
    const monsterWithInfo: Monster = {
      ...currentMonster,
      name: name || 'Unbenanntes Monster',
      description: description || undefined
    }
    saveMonster(monsterWithInfo)
    setSaved(true)
  }

  const handleCopyText = () => {
    const text = MonsterService.exportAsText({
      ...currentMonster,
      name: name || 'Unbenanntes Monster',
      description: description || undefined
    })
    navigator.clipboard.writeText(text)
  }

  const handleDownloadText = () => {
    const text = MonsterService.exportAsText({
      ...currentMonster,
      name: name || 'Unbenanntes Monster',
      description: description || undefined
    })
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name || 'monster'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadJSON = () => {
    const json = MonsterService.exportAsJSON({
      ...currentMonster,
      name: name || 'Unbenanntes Monster',
      description: description || undefined
    })
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name || 'monster'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Name und Beschreibung */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Monster-Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Schattenbestie, Feuersalamander..."
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Beschreibung (optional)</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Aussehen, Verhalten, Lebensraum..."
            rows={3}
          />
        </div>
      </div>

      {/* Monster-Stats */}
      <div className="border rounded-lg p-6 bg-card">
        <h3 className="text-2xl font-bold font-medieval mb-4">
          {name || 'Unbenanntes Monster'}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basis-Info */}
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Alter:</span>
              <span className="ml-2 font-medium">{currentMonster.age.name}</span>
            </div>
            
            {/* Attribute */}
            <div>
              <h4 className="font-semibold mb-2">Attribute:</h4>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(currentMonster.attributes).map(([attr, value]) => (
                  <div key={attr} className={`text-center p-2 rounded ${
                    value > 0 ? 'bg-green-100 dark:bg-green-900/30' :
                    value < 0 ? 'bg-red-100 dark:bg-red-900/30' :
                    'bg-muted'
                  }`}>
                    <div className="text-xs font-medium">{ATTRIBUTE_SHORT[attr as keyof typeof ATTRIBUTE_SHORT]}</div>
                    <div className={`font-mono font-bold ${
                      value > 0 ? 'text-green-600 dark:text-green-400' :
                      value < 0 ? 'text-red-600 dark:text-red-400' :
                      'text-muted-foreground'
                    }`}>
                      {value >= 0 ? '+' : ''}{value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kampfwerte */}
          <div className="space-y-2">
            <h4 className="font-semibold mb-2">Kampfwerte:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">LP:</span>
                <span className="font-mono font-medium">{currentMonster.maxLp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SP:</span>
                <span className="font-mono font-medium">{currentMonster.maxSp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AP:</span>
                <span className="font-mono font-medium">{currentMonster.ap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Initiative:</span>
                <span className="font-mono font-medium">{currentMonster.initiative}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Angriff:</span>
                <span className="font-mono font-medium">{currentMonster.attack}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verteidigung:</span>
                <span className="font-mono font-medium">{currentMonster.defense}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fähigkeiten */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Fähigkeiten:</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {currentMonster.abilities.map(ability => (
              <div key={ability.id} className="text-sm p-2 bg-muted rounded">
                <span className="font-medium">{ability.name}</span>
                <span className="text-muted-foreground text-xs ml-1">({ATTRIBUTE_SHORT[ability.attribute]})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spezial-Aktion */}
        <div className="mt-6 p-3 bg-primary/10 rounded-lg">
          <h4 className="font-semibold mb-1">Spezial-Aktion:</h4>
          <div className="text-sm">
            <span className="font-medium">{currentMonster.specialAction.name}</span>
            <span className="text-muted-foreground"> ({currentMonster.specialAction.cost} AP)</span>
            {currentMonster.specialAction.exhaustion && (
              <span className="text-yellow-600 dark:text-yellow-400 ml-2">ERSCHÖPFUNG</span>
            )}
          </div>
        </div>

        {/* Eigenschaften */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Schlechte Eigenschaften:</h4>
          <div className="space-y-1">
            {currentMonster.properties.map(property => (
              <div key={property.id} className="text-sm">
                <span className="font-medium">{property.name}:</span>
                <span className="text-muted-foreground ml-1">{property.effect}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export-Optionen */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleSave}
          disabled={saved}
          variant={saved ? "outline" : "default"}
        >
          <Save className="w-4 h-4 mr-1" />
          {saved ? 'Gespeichert' : 'Speichern'}
        </Button>
        <Button variant="outline" onClick={handleCopyText}>
          <Copy className="w-4 h-4 mr-1" />
          Text kopieren
        </Button>
        <Button variant="outline" onClick={handleDownloadText}>
          <FileText className="w-4 h-4 mr-1" />
          Als Text
        </Button>
        <Button variant="outline" onClick={handleDownloadJSON}>
          <FileJson className="w-4 h-4 mr-1" />
          Als JSON
        </Button>
      </div>
    </div>
  )
}