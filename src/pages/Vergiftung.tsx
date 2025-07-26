import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Vergiftung() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 font-medieval">Vergiftungen</h1>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="rules">Regeln & Tabellen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>Vergiftung Erstellen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Der Vergiftungs-Generator wird bald verfügbar sein.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Vergiftungsregeln</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <h3>Stress-Arten</h3>
              <ul>
                <li>Körperlich</li>
                <li>Geistig</li>
                <li>Mystisch</li>
              </ul>
              <p>-2 auf relevante Attribute bei Stress</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}