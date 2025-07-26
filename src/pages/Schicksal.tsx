import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Schicksal() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 font-medieval">Schicksalswürfe</h1>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="rules">Regeln & Tabellen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>Schicksal Generieren</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Der Schicksals-Generator wird bald verfügbar sein.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Schicksalswurf Regeln</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <h3>Kritische Würfe</h3>
              <p>3, 4, 17, 18 auf 3W6</p>
              
              <h3>Standard-Würfe</h3>
              <p>Immer 3W6</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}