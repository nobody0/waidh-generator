import { Zap, AlertTriangle } from 'lucide-react'
import { useMonsterStore } from '@/store/monsterStore'
import { MonsterService } from '@/lib/generators/monsterService'
import { ATTRIBUTE_SHORT } from '@/types/monster'

export function StepSpecialAction() {
  const { generatorState } = useMonsterStore()
  
  if (!generatorState.strengthAttribute) {
    return <div>Fehler: Keine Stärke ausgewählt</div>
  }

  const specialAction = MonsterService.getSpecialAction(generatorState.strengthAttribute)

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Die Spezial-Aktion des Monsters wird automatisch durch sein Stärke-Attribut bestimmt. 
          Diese mächtige Fähigkeit kostet <strong>5 AP</strong> und verursacht <strong>ERSCHÖPFUNG</strong>.
        </p>
      </div>

      {/* Spezial-Aktion */}
      <div className="border-2 border-primary rounded-lg p-6 bg-primary/5">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-primary" />
          <div>
            <h3 className="text-2xl font-bold font-medieval">{specialAction.name}</h3>
            <p className="text-sm text-muted-foreground">
              Basierend auf {specialAction.attribute} ({ATTRIBUTE_SHORT[specialAction.attribute]})
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-background rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-1">Kosten</p>
              <p className="text-lg font-mono">{specialAction.cost} AP</p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-1">Attribut</p>
              <p className="text-lg capitalize">{specialAction.attribute}</p>
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg">
            <p className="font-medium mb-2">Effekt:</p>
            <p className="text-muted-foreground">{specialAction.effect}</p>
          </div>

          {specialAction.exhaustion && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200/50 dark:border-yellow-800/50">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="font-medium text-yellow-900 dark:text-yellow-200">ERSCHÖPFUNG</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Nach Einsatz dieser Aktion erleidet das Monster den Status ERSCHÖPFT
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Erklärung */}
      <div className="space-y-3 text-sm text-muted-foreground">
        <h4 className="font-semibold text-foreground">Über Spezial-Aktionen:</h4>
        <ul className="space-y-2 list-disc list-inside">
          <li>Jedes Monster hat genau eine Spezial-Aktion basierend auf seiner Stärke</li>
          <li>Die Aktion kostet immer 5 AP und kann nur einmal pro Kampf eingesetzt werden</li>
          <li>ERSCHÖPFUNG bedeutet: -2 auf alle Würfe bis zur nächsten Rast</li>
          <li>Spezial-Aktionen ignorieren normale Verteidigung oder haben besondere Effekte</li>
        </ul>
      </div>

      {/* Alle Spezial-Aktionen */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h4 className="font-semibold mb-3">Alle möglichen Spezial-Aktionen:</h4>
        <div className="space-y-2 text-sm">
          <div className={generatorState.strengthAttribute === 'stärke' ? 'font-bold' : 'text-muted-foreground'}>
            <span className="font-mono">STR:</span> Zerschmettern - Flächenangriff
          </div>
          <div className={generatorState.strengthAttribute === 'geschick' ? 'font-bold' : 'text-muted-foreground'}>
            <span className="font-mono">GES:</span> Blitzangriff - Drei Angriffe
          </div>
          <div className={generatorState.strengthAttribute === 'willenskraft' ? 'font-bold' : 'text-muted-foreground'}>
            <span className="font-mono">WIL:</span> Furchteinflößendes Brüllen - Massenpanik
          </div>
          <div className={generatorState.strengthAttribute === 'logik' ? 'font-bold' : 'text-muted-foreground'}>
            <span className="font-mono">LOG:</span> Taktischer Rückzug - Defensive Haltung
          </div>
          <div className={generatorState.strengthAttribute === 'mystik' ? 'font-bold' : 'text-muted-foreground'}>
            <span className="font-mono">MYS:</span> Mana-Explosion - Magischer Schaden
          </div>
        </div>
      </div>
    </div>
  )
}