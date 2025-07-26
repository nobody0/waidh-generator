import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Abenteuer() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 font-medieval">Abenteuer Generator</h1>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="rules">Regeln & Tabellen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>Abenteuer Erstellen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Der Abenteuer-Generator wird bald verfügbar sein.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Abenteueraufgaben Regeln</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <h3>Generierung</h3>
              <p>3 Tabellen kombinieren:</p>
              <ol>
                <li>Problem (6 Arten)</li>
                <li>Auslöser (6 Optionen)</li>
                <li>Warum nicht selbst lösbar (6 Gründe)</li>
              </ol>
              
              <h3>Belohnung</h3>
              <p>20-40 Taler pro Charakter</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}