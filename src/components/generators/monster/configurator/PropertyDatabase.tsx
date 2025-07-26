import { AlertCircle, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { allProperties } from '@/data/tables/monsterTables'

export function PropertyDatabase() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Schlechte Eigenschaften sind Schwächen und Nachteile, die jedes Monster einzigartig machen. 
          Sie werden mit 2W6 erwürfelt und jedes Monster hat genau 2 verschiedene Eigenschaften.
        </p>
      </div>

      {/* Eigenschaften-Liste */}
      <div className="grid gap-4">
        {allProperties.map((property, index) => (
          <Card key={property.id}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div className="flex-1">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="font-mono text-sm text-muted-foreground">
                      {index + 2}:
                    </span>
                    {property.name}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{property.effect}</p>
              
              {/* Spezielle Hinweise */}
              {property.id === 'verletzt' && (
                <div className="mt-3 p-3 bg-red-50/50 dark:bg-red-900/10 rounded text-sm text-red-900 dark:text-red-200">
                  <TrendingDown className="w-4 h-4 inline mr-1 text-red-600 dark:text-red-400" />
                  Das Monster startet mit nur 75% seiner maximalen LP
                </div>
              )}
              
              {property.id === 'manablind' && (
                <div className="mt-3 p-3 bg-purple-50/50 dark:bg-purple-900/10 rounded text-sm text-purple-900 dark:text-purple-200">
                  <AlertCircle className="w-4 h-4 inline mr-1 text-purple-600 dark:text-purple-400" />
                  Wichtig gegen Zauberer - kann keine magischen Auren wahrnehmen
                </div>
              )}
              
              {property.id === 'aengstlich' && (
                <div className="mt-3 p-3 bg-yellow-50/50 dark:bg-yellow-900/10 rounded text-sm text-yellow-900 dark:text-yellow-200">
                  <AlertCircle className="w-4 h-4 inline mr-1 text-yellow-600 dark:text-yellow-400" />
                  Flieht automatisch wenn LP unter 50% fallen
                </div>
              )}
              
              {property.id === 'passiv' && (
                <div className="mt-3 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded text-sm text-blue-900 dark:text-blue-200">
                  <AlertCircle className="w-4 h-4 inline mr-1 text-blue-600 dark:text-blue-400" />
                  Greift niemals von sich aus an - nur Verteidigung
                </div>
              )}

              {property.penalty && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Malus:</span>
                  <span className="ml-1 text-muted-foreground">{property.penalty}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Wahrscheinlichkeiten */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-3">Wahrscheinlichkeiten (2W6):</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-muted-foreground">Häufigste Ergebnisse:</span>
              <ul className="mt-1 space-y-1">
                <li>• 7 (Vernarbt): 16.67%</li>
                <li>• 6/8 (Verletzt/Stahlfürchtig): je 13.89%</li>
                <li>• 5/9 (Träge/Zerbrechlich): je 11.11%</li>
              </ul>
            </div>
            <div>
              <span className="text-muted-foreground">Seltenste Ergebnisse:</span>
              <ul className="mt-1 space-y-1">
                <li>• 2 (Ängstlich): 2.78%</li>
                <li>• 12 (Blinde Wut): 2.78%</li>
                <li>• 3/11 (Vertrieben/Passiv): je 5.56%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gameplay-Tipps */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle className="text-lg">Gameplay-Tipps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Ängstlich + Verletzt:</strong> Sehr defensives Monster, flieht schnell
          </p>
          <p>
            <strong>Blinde Wut + Zerbrechlich:</strong> Glaskanone - hoher Schaden, stirbt schnell
          </p>
          <p>
            <strong>Passiv + Manablind:</strong> Perfekt als "Wächter" - reagiert nur auf Eindringlinge
          </p>
          <p>
            <strong>Träge + Stahlfürchtig:</strong> Leichte Beute für gut ausgerüstete Gruppen
          </p>
        </CardContent>
      </Card>
    </div>
  )
}