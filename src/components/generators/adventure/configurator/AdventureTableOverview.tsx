import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DiceTableDisplay } from '@/components/dice/DiceTableDisplay'
import { problemTable, triggerTable, obstacleTable } from '@/data/tables/adventureTables'

export function AdventureTableOverview() {
  return (
    <div className="space-y-6">
      {/* Problem-Tabelle */}
      <Card>
        <CardHeader>
          <CardTitle>Problem-Tabelle (1W6)</CardTitle>
          <CardDescription>
            Das grundlegende Problem, das die Siedlung oder Region plagt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DiceTableDisplay table={problemTable} />
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-semibold">Kategorien:</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Badge variant="destructive">Direkt</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Unmittelbare Gefahr für Leben und Eigentum
                </p>
              </div>
              <div>
                <Badge variant="secondary">Indirekt</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Lebensqualität eingeschränkt, keine akute Gefahr
                </p>
              </div>
              <div>
                <Badge variant="outline">Route</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Handel und Reisen behindert
                </p>
              </div>
              <div>
                <Badge>Unerklärlich</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Mysteriöse Ereignisse beunruhigen
                </p>
              </div>
              <div>
                <Badge variant="destructive">Ausbreitung</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Katastrophe könnte sich ausweiten
                </p>
              </div>
              <div>
                <Badge variant="secondary">Wachstum</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Entwicklung wird verhindert
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auslöser-Tabelle */}
      <Card>
        <CardHeader>
          <CardTitle>Auslöser-Tabelle (1W6)</CardTitle>
          <CardDescription>
            Die Ursache oder der Verursacher des Problems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DiceTableDisplay table={triggerTable} />
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-semibold">Typen:</h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Badge variant="outline">Wesen</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Elementare oder mächtige Kreaturen
                </p>
              </div>
              <div>
                <Badge variant="destructive">Wandelholz</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Wilde Magie der Natur
                </p>
              </div>
              <div>
                <Badge variant="secondary">Fehler</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Menschliches Versagen
                </p>
              </div>
              <div>
                <Badge>Monster</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Bestien und Kreaturen
                </p>
              </div>
              <div>
                <Badge variant="outline">Banditen</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Organisierte Kriminelle
                </p>
              </div>
              <div>
                <Badge variant="destructive">Artefakt</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Magische Gegenstände
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hindernis-Tabelle */}
      <Card>
        <CardHeader>
          <CardTitle>Hindernis-Tabelle (1W6)</CardTitle>
          <CardDescription>
            Warum die Bewohner das Problem nicht selbst lösen können
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DiceTableDisplay table={obstacleTable} />
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-semibold">Lösungsansätze:</h4>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                • <strong>Konflikt:</strong> Vermittlung und Diplomatie
              </p>
              <p className="text-xs text-muted-foreground">
                • <strong>Ausrüstung:</strong> Beschaffung oder Improvisation
              </p>
              <p className="text-xs text-muted-foreground">
                • <strong>Macht:</strong> Schwachpunkte finden oder Verbündete
              </p>
              <p className="text-xs text-muted-foreground">
                • <strong>Komplexität:</strong> Systematisches Vorgehen
              </p>
              <p className="text-xs text-muted-foreground">
                • <strong>Unwissen:</strong> Investigation und Recherche
              </p>
              <p className="text-xs text-muted-foreground">
                • <strong>Angst:</strong> Mut machen und Vorbild sein
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}