import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Monster() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 font-medieval">Monster Generator</h1>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="rules">Regeln & Tabellen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>Monster Erstellen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Der Monster-Generator wird bald verfügbar sein.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Monster-Regeln</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <h3>Altersstufen (1W6)</h3>
              <ul>
                <li>Jung (1-2): 3 Basis-Attribute, 20+STR LP, 30+WIL*3 SP</li>
                <li>Erwachsen (3): 5 Basis, 25+STR LP, 40+WIL*3 SP</li>
                <li>Alt (4): 7 Basis, 35+STR LP, 55+WIL*3 SP</li>
                <li>Altehrwürdig (5): 10 Basis, 55+STR LP, 75+WIL*3 SP, 4W6</li>
                <li>Weltenbestie (6): 15 Basis, 100+STR*2 LP, 180+WIL*6 SP, 5W6</li>
              </ul>
              
              <h3>Attribute</h3>
              <p>STR (Stärke), GES (Geschick), WIL (Wille), LOG (Logik), MYS (Mystik)</p>
              
              <h3>Kampfwerte</h3>
              <ul>
                <li>Angriff: Geschick × 2</li>
                <li>Verteidigung: Geschick × 2</li>
                <li>Kein Rüstwert für Monster</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}