import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { vergiftungTable, stressEffekte, vergiftungRegeln, feiglingEffekte, kränklichEffekte } from '@/data/tables/vergiftungTables'
import { Heart, Brain, Activity, AlertTriangle } from 'lucide-react'

export function VergiftungConfigurator() {
  const getEffektColor = (summe: number) => {
    if (summe <= 5) return 'text-red-600 dark:text-red-400'
    if (summe <= 10) return 'text-orange-600 dark:text-orange-400'
    if (summe <= 15) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-green-600 dark:text-green-400'
  }
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="table">Tabelle</TabsTrigger>
          <TabsTrigger value="rules">Regeln</TabsTrigger>
          <TabsTrigger value="special">Spezialregeln</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vergiftungs-Tabelle (3W6)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vergiftungTable.entries.map(entry => (
                  <div 
                    key={entry.value.id} 
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted"
                  >
                    <div className={`text-2xl font-bold font-mono w-10 text-center ${getEffektColor(entry.range as number)}`}>
                      {entry.range}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold ${getEffektColor(entry.range as number)}`}>
                        {entry.value.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {entry.value.beschreibung}
                      </div>
                      <div className="text-xs mt-1">
                        <span className="font-medium">Dauer:</span> {entry.value.dauer}
                      </div>
                      {entry.value.spezialEffekte && (
                        <div className="text-xs mt-1 text-purple-600 dark:text-purple-400">
                          {entry.value.spezialEffekte.join(' • ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="mt-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Allgemeine Regeln</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vergiftungRegeln.allgemein.map((regel, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-muted-foreground mt-0.5">•</span>
                      <span>{regel}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Stress-Effekte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {Object.entries(stressEffekte).map(([art, info]) => (
                    <div key={art} className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium capitalize">{art}</h4>
                      <p className="text-sm text-muted-foreground">{info.effekt}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3">
                  <h4 className="font-medium text-sm mb-2">Stress-Regeln:</h4>
                  <ul className="space-y-1">
                    {vergiftungRegeln.stress.map((regel, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {regel}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="special" className="mt-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Kränklich
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm">{kränklichEffekte.beschreibung}</p>
                </div>
                <p className="text-sm text-muted-foreground">{kränklichEffekte.hinweis}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Feigling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{feiglingEffekte.beschreibung}</p>
                <div className="space-y-2">
                  {Object.entries(feiglingEffekte).filter(([key]) => key !== 'beschreibung').map(([wurf, effekt]) => (
                    <div key={wurf} className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                      <span className="font-medium text-sm">Bei Wurf {wurf}:</span>{' '}
                      <span className="text-sm">{effekt}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Monster-Gift Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vergiftungRegeln.spezial.map((regel, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-muted-foreground mt-0.5">•</span>
                      <span>{regel}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Monster-Gift Fähigkeit:</span> Bei Nahkampf-LP-Schaden 
                    fügt +1 Giftschaden hinzu. Das Ziel würfelt dann auf dieser Tabelle.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}