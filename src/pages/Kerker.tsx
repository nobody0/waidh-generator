import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Kerker() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 font-medieval">Kerker-Elementare</h1>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="rules">Regeln & Tabellen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>Kerker-Elemental Erstellen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Der Kerker-Generator wird bald verfügbar sein.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Kerker-Elemental Regeln</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <h3>Eigenschaften</h3>
              <ul>
                <li>2-7 Kammern</li>
                <li>6 Themen: Pflanzen, Erde, Feuer, Wasser, Kristall, Wind</li>
                <li>Wächter sind Schergen (Stufe 1-9)</li>
                <li>Kernzauber in letzter Kammer</li>
                <li>Gegenstände werden nach 3-7 Tagen Teil des Kerkers</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}