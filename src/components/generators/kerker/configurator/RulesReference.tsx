import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Users, Shield, Package, AlertTriangle, Info } from 'lucide-react'

export function RulesReference() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Kerker-Elementare Grundregeln
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p className="text-muted-foreground">
            Kerker-Elementare sind lebende Dungeons, die sich von Magie ernähren. 
            Sie bestehen aus miteinander verbundenen Kammern, die von Wächtern verteidigt werden.
          </p>
          
          <h3>Grundlegende Eigenschaften:</h3>
          <ul>
            <li>2-7 miteinander verbundene Kammern</li>
            <li>Jede Kammer hat eigene Wächter und möglicherweise Fallen</li>
            <li>Die letzte Kammer enthält immer den Kernzauber</li>
            <li>Zerstörung des Kernzaubers tötet den Kerker</li>
            <li>Gegenstände werden nach 3-7 Tagen Teil des Kerkers</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Wächter-System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Wächter sind Schergen des Kerkers und folgen den Schergen-Regeln:
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">Schergen-Werte (Stufe 1-10):</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• LP = 10 + Stufe</li>
                  <li>• SP = 15 + (Stufe × 3)</li>
                  <li>• Initiative = 3 + Stufe</li>
                  <li>• AP = 6 (Stufe 1-7) oder 7 (Stufe 8-10)</li>
                </ul>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">Wächter-Kategorien:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• <span className="font-medium">Niedrig:</span> Unteres Drittel des Stufenbereichs</li>
                  <li>• <span className="font-medium">Mittel:</span> Mittleres Drittel des Stufenbereichs</li>
                  <li>• <span className="font-medium">Hoch:</span> Oberes Drittel des Stufenbereichs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Fallen-Regeln
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Fallen sind thematisch an den Kerker angepasst:
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">Fallen-Eigenschaften:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Nur in Kammern, nie in Verbindungsgängen</li>
                  <li>• Versteckte Fallen: +5 auf Entdeckungs-SW</li>
                  <li>• Offensichtliche Fallen: -5 auf Entdeckungs-SW</li>
                  <li>• Reset-Zeit variiert je nach Falle</li>
                </ul>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">Entdeckung:</h4>
                <p className="text-muted-foreground">
                  Logik-Probe gegen Fallen-SW zum Entdecken. 
                  Bei Erfolg kann die Falle umgangen oder entschärft werden.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Regeneration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Kerker regenerieren sich selbstständig:
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">Regenerations-Mechanik:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Zeit: 1 Stunde pro Kammer (2-7 Stunden total)</li>
                  <li>• Getötete Wächter erscheinen neu</li>
                  <li>• Ausgelöste Fallen werden zurückgesetzt</li>
                  <li>• Schätze regenerieren NICHT</li>
                  <li>• Strukturelle Schäden heilen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Integration von Gegenständen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Gegenstände werden Teil des Kerkers:
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-1">Integrations-Prozess:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Nach 3-7 Tagen werden Gegenstände integriert</li>
                  <li>• Integrierte Items verschwinden bei Kerker-Tod</li>
                  <li>• Lebende Wesen werden zu Wächtern</li>
                  <li>• Magische Gegenstände widerstehen länger</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-red-50/50 dark:bg-red-900/10 border-red-200/50 dark:border-red-800/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Kernzauber-Kammer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            Die letzte Kammer enthält immer den Kernzauber - das Herz des Kerkers:
          </p>
          <ul className="space-y-1 text-sm">
            <li>• Besonders starke Wächter (2-3 Wächter hoher Stufe)</li>
            <li>• Zusätzliche Fallen möglich</li>
            <li>• Enthält besonderen Schatz oder Artefakt</li>
            <li>• Zerstörung des Kernzaubers tötet den gesamten Kerker</li>
            <li>• Alle integrierten Gegenstände verschwinden</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200/50 dark:border-blue-800/50">
        <CardContent className="py-4">
          <h3 className="font-medium mb-2">Taktische Überlegungen</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Kerker können Mana wahrnehmen (magische Gegenstände/Zauber verraten Position)</li>
            <li>• Wächter kämpfen koordiniert und nutzen Fallen zu ihrem Vorteil</li>
            <li>• Längerer Aufenthalt erhöht Risiko der Gegenstand-Integration</li>
            <li>• Kernzauber-Kammer sollte gut vorbereitet angegangen werden</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}