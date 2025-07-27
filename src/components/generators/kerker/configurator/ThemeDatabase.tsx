import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { themeTable } from '@/data/tables/kerkerTables'
import { Flame, Leaf, Mountain, Wind, Droplets, Gem } from 'lucide-react'

const themeIcons = {
  pflanzen: Leaf,
  erde: Mountain,
  feuer: Flame,
  wasser: Droplets,
  kristall: Gem,
  wind: Wind
}

export function ThemeDatabase() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-muted-foreground">
          Jedes Kerker-Thema bestimmt das Aussehen, die Atmosphäre und die Art der Fallen.
          Die Wächter passen sich dem Thema an und erhalten ein entsprechendes Erscheinungsbild.
        </p>
      </div>

      <Tabs defaultValue={themeTable.entries[0].value.id} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {themeTable.entries.map((entry) => {
            const Icon = themeIcons[entry.value.id as keyof typeof themeIcons]
            return (
              <TabsTrigger key={entry.value.id} value={entry.value.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{entry.value.name}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {themeTable.entries.map((entry) => (
          <TabsContent key={entry.value.id} value={entry.value.id} className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {(() => {
                      const Icon = themeIcons[entry.value.id as keyof typeof themeIcons]
                      return <Icon className="w-5 h-5" />
                    })()}
                    {entry.value.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Beschreibung</h4>
                    <p className="text-sm text-muted-foreground">{entry.value.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Atmosphäre</h4>
                    <p className="text-sm text-muted-foreground italic">{entry.value.atmosphere}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Wächter-Erscheinung</h4>
                    <p className="text-sm text-muted-foreground">{entry.value.guardAppearance}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Typische Fallen</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {entry.value.trapExamples.map((trap, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground">•</span>
                        <span>{trap}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200/50 dark:border-blue-800/50">
        <CardContent className="py-4">
          <h3 className="font-medium mb-2">Thema-Integration</h3>
          <p className="text-sm text-muted-foreground">
            Das gewählte Thema beeinflusst nicht nur das Aussehen des Kerkers, sondern auch:
          </p>
          <ul className="text-sm space-y-1 text-muted-foreground mt-2">
            <li>• Die Art und Wirkung der Fallen</li>
            <li>• Das Erscheinungsbild der Wächter</li>
            <li>• Die Atmosphäre und Umgebungsbeschreibungen</li>
            <li>• Mögliche Schätze und Ressourcen</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}