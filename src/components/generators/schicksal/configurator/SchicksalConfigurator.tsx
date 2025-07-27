import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { schicksalTable, schicksalBeispiele } from '@/data/tables/schicksalTables'
import { SCHICKSAL_KONTEXT_BESCHREIBUNG } from '@/types/schicksal'
import { AlertTriangle, TrendingDown, Info, Shuffle, TrendingUp } from 'lucide-react'

export function SchicksalConfigurator() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'katastrophe': return <AlertTriangle className="w-5 h-5" />
      case 'desaster': return <TrendingDown className="w-5 h-5" />
      case 'krise': return <Info className="w-5 h-5" />
      case 'zufall': return <Shuffle className="w-5 h-5" />
      case 'zwischenfall': return <Info className="w-5 h-5" />
      case 'gluecksstraehne': return <TrendingUp className="w-5 h-5" />
      default: return null
    }
  }
  
  const getColorClass = (id: string) => {
    switch (id) {
      case 'katastrophe': return 'text-red-600 dark:text-red-400'
      case 'desaster': return 'text-orange-600 dark:text-orange-400'
      case 'krise': return 'text-yellow-600 dark:text-yellow-400'
      case 'zufall': return 'text-blue-600 dark:text-blue-400'
      case 'zwischenfall': return 'text-gray-600 dark:text-gray-400'
      case 'gluecksstraehne': return 'text-green-600 dark:text-green-400'
      default: return ''
    }
  }
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="table">Tabelle</TabsTrigger>
          <TabsTrigger value="descriptions">Beschreibungen</TabsTrigger>
          <TabsTrigger value="examples">Beispiele</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Schicksals-Tabelle (1W6)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {schicksalTable.entries.map(entry => (
                  <div key={entry.value.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted">
                    <div className="text-2xl font-bold font-mono w-8 text-center">
                      {entry.range}
                    </div>
                    <div className={`mt-0.5 ${getColorClass(entry.value.id)}`}>
                      {getIcon(entry.value.id)}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold ${getColorClass(entry.value.id)}`}>
                        {entry.value.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {entry.value.beschreibung}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="descriptions" className="mt-6">
          <div className="space-y-4">
            {schicksalTable.entries.map(entry => (
              <Card key={entry.value.id}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${getColorClass(entry.value.id)}`}>
                    {getIcon(entry.value.id)}
                    {entry.value.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Kurzbeschreibung</h4>
                    <p className="text-sm text-muted-foreground">{entry.value.beschreibung}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Detaillierte Beschreibung</h4>
                    <p className="text-sm">{entry.value.detailBeschreibung}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Effekt:</span> {entry.value.effekt}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Würfelwert:</span> {entry.range}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="mt-6">
          <div className="space-y-6">
            {Object.entries(SCHICKSAL_KONTEXT_BESCHREIBUNG).map(([kontext, beschreibung]) => (
              <div key={kontext}>
                <h3 className="text-lg font-medium mb-3">{beschreibung}</h3>
                <div className="grid gap-3">
                  {schicksalTable.entries.map(entry => {
                    const beispiele = schicksalBeispiele[kontext as keyof typeof schicksalBeispiele]?.[entry.value.id] || []
                    return (
                      <Card key={entry.value.id} className="overflow-hidden">
                        <CardHeader className="py-3">
                          <CardTitle className={`text-sm flex items-center gap-2 ${getColorClass(entry.value.id)}`}>
                            {getIcon(entry.value.id)}
                            {entry.value.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          {beispiele.length > 0 ? (
                            <ul className="space-y-1">
                              {beispiele.map((beispiel, index) => (
                                <li key={index} className="text-sm flex items-start gap-2">
                                  <span className="text-muted-foreground mt-0.5">•</span>
                                  <span>{beispiel}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">
                              Keine spezifischen Beispiele für diesen Kontext
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}