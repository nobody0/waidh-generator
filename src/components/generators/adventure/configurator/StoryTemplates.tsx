import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { locationNameParts } from '@/data/tables/adventureTables'

export function StoryTemplates() {
  const templates = [
    {
      id: 'direkt',
      name: 'Direkt',
      description: 'Klare Ansage, sofortiges Problem',
      tone: 'Pragmatisch und dringend',
      example: 'Die Charaktere erreichen [Ort]. [Questgeber] bittet sie eindringlich um Hilfe. [Problem]',
      whenToUse: 'Für Action-orientierte Gruppen oder wenn Zeit drängt'
    },
    {
      id: 'mysterium',
      name: 'Mysterium',
      description: 'Rätselhafte Andeutungen',
      tone: 'Geheimnisvoll und unheimlich',
      example: 'Gerüchte über seltsame Vorkommnisse in [Ort] haben die Charaktere erreicht. Etwas stimmt hier ganz und gar nicht...',
      whenToUse: 'Für investigative Abenteuer oder wenn Spannung aufgebaut werden soll'
    },
    {
      id: 'düster',
      name: 'Düster',
      description: 'Hoffnungslose Atmosphäre',
      tone: 'Bedrückend und verzweifelt',
      example: 'Ein Schatten liegt über [Ort]. Die Situation ist verzweifelt.',
      whenToUse: 'Für Horror-Elemente oder um die Ernsthaftigkeit zu betonen'
    },
    {
      id: 'hoffnungsvoll',
      name: 'Hoffnungsvoll',
      description: 'Trotz allem gibt es noch Hoffnung',
      tone: 'Optimistisch trotz Widrigkeiten',
      example: 'Trotz der Schwierigkeiten herrscht in [Ort] noch immer ein Funken Hoffnung.',
      whenToUse: 'Für heroische Kampagnen oder um Spieler zu motivieren'
    }
  ]

  const hooks = [
    'Die Charaktere hören in einer Taverne von den Problemen',
    'Ein verzweifelter Bote sucht nach Hilfe',
    'Auf ihrer Reise kommen die Charaktere durch den Ort',
    'Ein alter Freund/Kontakt bittet um Hilfe',
    'Ein Aushang am schwarzen Brett verspricht Belohnung',
    'Flüchtlinge berichten von der Katastrophe',
    'Ein Traum/Vision führt die Charaktere zum Ort',
    'Die Charaktere werden von Autoritäten beauftragt'
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Story-Templates</CardTitle>
          <CardDescription>
            Verschiedene Erzählstile für die generierten Abenteuer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {templates.map((template) => (
              <div key={template.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{template.name}</h3>
                  <Badge variant="outline">{template.tone}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <div className="p-3 bg-muted rounded text-xs italic">
                  "{template.example}"
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Verwenden wenn:</strong> {template.whenToUse}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ortsnamen-Generator</CardTitle>
          <CardDescription>
            Deutsche Ortsnamen werden aus Präfixen und Suffixen zusammengesetzt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Präfixe ({locationNameParts.prefixes.length})</h4>
              <div className="flex flex-wrap gap-1">
                {locationNameParts.prefixes.map((prefix) => (
                  <Badge key={prefix} variant="secondary" className="text-xs">
                    {prefix}-
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Suffixe ({locationNameParts.suffixes.length})</h4>
              <div className="flex flex-wrap gap-1">
                {locationNameParts.suffixes.map((suffix) => (
                  <Badge key={suffix} variant="secondary" className="text-xs">
                    -{suffix}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Ortsmerkmale</h4>
              <div className="flex flex-wrap gap-1">
                {locationNameParts.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded">
              <p className="text-xs font-medium mb-2">Beispiele generierter Ortsnamen:</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <span>• Eisenbach am Wald</span>
                <span>• Wolfsburg im Tal</span>
                <span>• Grünheim am Fluss</span>
                <span>• Neustadt am Handelsweg</span>
                <span>• Steinbrück an der Grenze</span>
                <span>• Goldtal im Hochland</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Abenteuer-Aufhänger</CardTitle>
          <CardDescription>
            Wie die Charaktere von dem Problem erfahren
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {hooks.map((hook, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-xs text-muted-foreground">{idx + 1}.</span>
                <p className="text-sm">{hook}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              💡 Tipp: Wähle Aufhänger basierend auf der Kampagne. Zufällige Begegnungen für Sandbox, 
              Aufträge für lineare Kampagnen.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}