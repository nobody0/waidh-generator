import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  archetypenNachArt, 
  waffenDatenbank, 
  rüstungsDatenbank,
  namenListen,
  persönlichkeitsEigenschaften 
} from '@/data/tables/nscTables'
import { NSC_FORMELN, NSC_ARTEN } from '@/types/nsc'

export function NSCConfigurator() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="formulas" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="formulas">Formeln</TabsTrigger>
          <TabsTrigger value="archetypes">Archetypen</TabsTrigger>
          <TabsTrigger value="equipment">Ausrüstung</TabsTrigger>
          <TabsTrigger value="names">Namen & Persönlichkeit</TabsTrigger>
        </TabsList>

        <TabsContent value="formulas" className="mt-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Berechnungsformeln</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-3 bg-muted rounded-lg space-y-2 font-mono text-sm">
                    <div>LP = 10 + Stufe</div>
                    <div>SP = 15 + (Stufe × 3)</div>
                    <div>Initiative = 3 + Stufe</div>
                    <div>AP = {'{Stufe 1-7: 6, Stufe 8-10: 7}'}</div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Attribut-Boni nach Art:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <span className="font-medium">Körperlich:</span> STR & GES = Stufe+1, andere = Stufe-1
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <span className="font-medium">Geistig:</span> LOG & WIL = Stufe+1, andere = Stufe-1
                      </div>
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                        <span className="font-medium">Mystisch:</span> MYS = Stufe+1, andere = Stufe-1
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Kampfwerte:</h4>
                    <div className="space-y-1 text-sm font-mono">
                      <div>Angriff = 3W6 + (GES × 2)</div>
                      <div>Verteidigung = 3W6 + (GES × 2)</div>
                      <div>Schaden = Waffenschaden + STR-Bonus</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Stufen-Übersicht</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Stufe</th>
                        <th className="text-center p-2">LP</th>
                        <th className="text-center p-2">SP</th>
                        <th className="text-center p-2">Init</th>
                        <th className="text-center p-2">AP</th>
                        <th className="text-center p-2">Primär</th>
                        <th className="text-center p-2">Sekundär</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(stufe => (
                        <tr key={stufe} className="border-b">
                          <td className="p-2 font-medium">{stufe}</td>
                          <td className="text-center p-2">{NSC_FORMELN.lp(stufe)}</td>
                          <td className="text-center p-2">{NSC_FORMELN.sp(stufe)}</td>
                          <td className="text-center p-2">{NSC_FORMELN.initiative(stufe)}</td>
                          <td className="text-center p-2">{NSC_FORMELN.ap(stufe)}</td>
                          <td className="text-center p-2">{NSC_FORMELN.attributBonus(stufe, true)}</td>
                          <td className="text-center p-2">{NSC_FORMELN.attributBonus(stufe, false)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="archetypes" className="mt-6">
          <div className="space-y-4">
            {NSC_ARTEN.map(art => (
              <Card key={art}>
                <CardHeader>
                  <CardTitle className="capitalize">{art}e Archetypen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {archetypenNachArt[art].map(archetyp => (
                      <div key={archetyp.id} className="p-3 bg-muted rounded-lg space-y-2">
                        <h4 className="font-medium">{archetyp.name}</h4>
                        {archetyp.beschreibung && (
                          <p className="text-sm text-muted-foreground">{archetyp.beschreibung}</p>
                        )}
                        <div className="text-sm space-y-1">
                          <div>
                            <span className="font-medium">Waffen:</span> {archetyp.waffen.join(', ')}
                          </div>
                          {archetyp.rüstung && (
                            <div>
                              <span className="font-medium">Rüstung:</span> {archetyp.rüstung}
                            </div>
                          )}
                          {archetyp.spezialAusrüstung && (
                            <div>
                              <span className="font-medium">Spezial:</span> {archetyp.spezialAusrüstung.join(', ')}
                            </div>
                          )}
                          {archetyp.verhaltensTemplate && (
                            <div className="italic text-muted-foreground">
                              {archetyp.verhaltensTemplate}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Waffen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(waffenDatenbank).map(([name, info]) => (
                    <div key={name} className="flex justify-between text-sm">
                      <span>{name}</span>
                      <span className="font-mono">
                        {info.schaden} ({info.reichweite})
                        {info.spezial && <span className="text-purple-600"> [{info.spezial}]</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Rüstungen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(rüstungsDatenbank).map(([name, info]) => (
                    <div key={name} className="flex justify-between text-sm">
                      <span>{name}</span>
                      <span className="font-mono">Schutz: {info.schutz}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="names" className="mt-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Namenslisten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Männliche Namen</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {namenListen.männlich.slice(0, 8).map(name => (
                        <div key={name}>{name}</div>
                      ))}
                      <div className="italic">... und {namenListen.männlich.length - 8} weitere</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Weibliche Namen</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {namenListen.weiblich.slice(0, 8).map(name => (
                        <div key={name}>{name}</div>
                      ))}
                      <div className="italic">... und {namenListen.weiblich.length - 8} weitere</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Nachnamen</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {namenListen.nachnamen.slice(0, 8).map(name => (
                        <div key={name}>{name}</div>
                      ))}
                      <div className="italic">... und {namenListen.nachnamen.length - 8} weitere</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Persönlichkeits-Eigenschaften</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-green-600 dark:text-green-400">Positiv</h4>
                    <div className="text-sm space-y-1">
                      {persönlichkeitsEigenschaften.positiv.map(eigenschaft => (
                        <div key={eigenschaft}>{eigenschaft}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-red-600 dark:text-red-400">Negativ</h4>
                    <div className="text-sm space-y-1">
                      {persönlichkeitsEigenschaften.negativ.map(eigenschaft => (
                        <div key={eigenschaft}>{eigenschaft}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-gray-600 dark:text-gray-400">Neutral</h4>
                    <div className="text-sm space-y-1">
                      {persönlichkeitsEigenschaften.neutral.map(eigenschaft => (
                        <div key={eigenschaft}>{eigenschaft}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}