import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react'

type Compatibility = 'good' | 'warning' | 'bad' | 'neutral'

interface CombinationRating {
  compatibility: Compatibility
  note: string
}

export function CombinationMatrix() {
  // Kombinationsmatrix für Problem x Auslöser
  const problemTriggerMatrix: Record<string, Record<string, CombinationRating>> = {
    'direkt': {
      'wesen': { compatibility: 'good', note: 'Elementar/Drache greift direkt an' },
      'wandelholz': { compatibility: 'good', note: 'Aggressiver Zauberwald' },
      'fehler': { compatibility: 'warning', note: 'Fehler mit sofortiger Konsequenz' },
      'monster': { compatibility: 'good', note: 'Monster-Angriffe' },
      'banditen': { compatibility: 'good', note: 'Belagerung/Überfälle' },
      'artefakt': { compatibility: 'neutral', note: 'Verfluchter Gegenstand' }
    },
    'indirekt': {
      'wesen': { compatibility: 'neutral', note: 'Elementar stört Balance' },
      'wandelholz': { compatibility: 'good', note: 'Magische Korruption' },
      'fehler': { compatibility: 'good', note: 'Langzeitfolgen eines Fehlers' },
      'monster': { compatibility: 'neutral', note: 'Monster vergiftet Ressourcen' },
      'banditen': { compatibility: 'warning', note: 'Erpressung/Schutzgeld' },
      'artefakt': { compatibility: 'good', note: 'Schleichender Fluch' }
    },
    'route': {
      'wesen': { compatibility: 'neutral', note: 'Elementar blockiert Wege' },
      'wandelholz': { compatibility: 'good', note: 'Wandelholz überwuchert Straßen' },
      'fehler': { compatibility: 'bad', note: 'Unwahrscheinlich' },
      'monster': { compatibility: 'good', note: 'Monster lauert Reisenden auf' },
      'banditen': { compatibility: 'good', note: 'Wegelagerer' },
      'artefakt': { compatibility: 'warning', note: 'Magische Barriere' }
    },
    'unerklärlich': {
      'wesen': { compatibility: 'neutral', note: 'Feenwesen-Streiche' },
      'wandelholz': { compatibility: 'good', note: 'Mysteriöse magische Effekte' },
      'fehler': { compatibility: 'good', note: 'Unbekannte Konsequenzen' },
      'monster': { compatibility: 'warning', note: 'Unsichtbares Monster?' },
      'banditen': { compatibility: 'bad', note: 'Passt nicht gut' },
      'artefakt': { compatibility: 'good', note: 'Rätselhaftes Artefakt' }
    },
    'ausbreitung': {
      'wesen': { compatibility: 'good', note: 'Elementar verwüstet Region' },
      'wandelholz': { compatibility: 'good', note: 'Wandelholz breitet sich aus' },
      'fehler': { compatibility: 'neutral', note: 'Katastrophaler Fehler' },
      'monster': { compatibility: 'good', note: 'Monster-Horde' },
      'banditen': { compatibility: 'neutral', note: 'Plündernde Armee' },
      'artefakt': { compatibility: 'good', note: 'Artefakt korrumpiert Umgebung' }
    },
    'wachstum': {
      'wesen': { compatibility: 'neutral', note: 'Elementar beansprucht Gebiet' },
      'wandelholz': { compatibility: 'good', note: 'Wandelholz verhindert Expansion' },
      'fehler': { compatibility: 'neutral', note: 'Politischer Fehler' },
      'monster': { compatibility: 'good', note: 'Monster-Revier' },
      'banditen': { compatibility: 'neutral', note: 'Banditen kontrollieren Ressourcen' },
      'artefakt': { compatibility: 'warning', note: 'Artefakt begrenzt Gebiet' }
    }
  }

  const getIcon = (compatibility: Compatibility) => {
    switch (compatibility) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'bad': return <XCircle className="w-4 h-4 text-red-500" />
      case 'neutral': return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getCompatibilityBadge = (compatibility: Compatibility) => {
    switch (compatibility) {
      case 'good': return <Badge variant="default" className="bg-green-500">Gut</Badge>
      case 'warning': return <Badge variant="secondary" className="bg-yellow-500">Möglich</Badge>
      case 'bad': return <Badge variant="destructive">Schwierig</Badge>
      case 'neutral': return <Badge variant="outline">Neutral</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Kombinationslogik</CardTitle>
          <CardDescription>
            Bewertung wie gut verschiedene Problem/Auslöser-Kombinationen zusammenpassen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              {getCompatibilityBadge('good')}
              <span className="text-sm text-muted-foreground">Passt sehr gut zusammen</span>
              {getCompatibilityBadge('neutral')}
              <span className="text-sm text-muted-foreground">Funktioniert mit Anpassung</span>
              {getCompatibilityBadge('warning')}
              <span className="text-sm text-muted-foreground">Benötigt Kreativität</span>
              {getCompatibilityBadge('bad')}
              <span className="text-sm text-muted-foreground">Ungewöhnliche Kombination</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Problem × Auslöser Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left p-2">Problem</th>
                  <th className="p-2">Wesen</th>
                  <th className="p-2">Wandelholz</th>
                  <th className="p-2">Fehler</th>
                  <th className="p-2">Monster</th>
                  <th className="p-2">Banditen</th>
                  <th className="p-2">Artefakt</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(problemTriggerMatrix).map(([problem, triggers]) => (
                  <tr key={problem} className="border-t">
                    <td className="p-2 font-medium capitalize">{problem}</td>
                    {Object.entries(triggers).map(([trigger, rating]) => (
                      <td key={trigger} className="p-2 text-center" title={rating.note}>
                        {getIcon(rating.compatibility)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Empfohlene Kombinationen</CardTitle>
          <CardDescription>
            Besonders stimmige Problem/Auslöser-Paarungen für spannende Abenteuer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Badge>Direkt + Monster</Badge>
                {getIcon('good')}
              </div>
              <p className="text-xs text-muted-foreground">
                Klassisch: Monster bedroht Siedlung direkt. Klare Bedrohung, einfache Motivation.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Badge>Unerklärlich + Artefakt</Badge>
                {getIcon('good')}
              </div>
              <p className="text-xs text-muted-foreground">
                Mysteriös: Seltsame Ereignisse durch unbekanntes Artefakt. Gut für Investigation.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Badge>Route + Banditen</Badge>
                {getIcon('good')}
              </div>
              <p className="text-xs text-muted-foreground">
                Praktisch: Wegelagerer blockieren Handel. Soziale Encounters möglich.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Badge>Ausbreitung + Wandelholz</Badge>
                {getIcon('good')}
              </div>
              <p className="text-xs text-muted-foreground">
                Episch: Magische Katastrophe droht sich auszubreiten. Hohe Einsätze.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hindernis-Empfehlungen</CardTitle>
          <CardDescription>
            Welche Hindernisse passen zu welchen Auslösern
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold mb-1">Mächtige Auslöser (Wandelholz, Artefakt, Wesen)</h4>
              <p className="text-xs text-muted-foreground">
                → "Auslöser zu mächtig" oder "Fehlende Ausrüstung" funktionieren gut
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Soziale Auslöser (Fehler, Banditen)</h4>
              <p className="text-xs text-muted-foreground">
                → "Interner Konflikt" oder "Niemand traut sich" passen thematisch
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Mysteriöse Probleme</h4>
              <p className="text-xs text-muted-foreground">
                → "Unbekannte Ursache" ist fast immer passend
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}