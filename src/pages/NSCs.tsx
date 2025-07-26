import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NSCs() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 font-medieval">NSCs & Schergen</h1>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="rules">Regeln & Tabellen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>NSC Erstellen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Der NSC-Generator wird bald verfügbar sein.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Schergen-System</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <h3>Arten</h3>
              <ul>
                <li>Körperlich</li>
                <li>Geistig</li>
                <li>Mystisch</li>
              </ul>
              
              <h3>Werte</h3>
              <ul>
                <li>LP: 10 + Stufe</li>
                <li>SP: 15 + Stufe × 3</li>
                <li>Initiative: 3 + Stufe</li>
                <li>Boni: Art bestimmt +1/-1 auf Attribute</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}