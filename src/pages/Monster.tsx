import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MonsterGeneratorSingle } from '@/components/generators/monster/MonsterGeneratorSingle'
import { MonsterConfigurator } from '@/components/generators/monster/configurator/MonsterConfigurator'

export function Monster() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 font-medieval">Monster/Bestien Generator</h1>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="configurator">Konfigurator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="mt-6">
          <MonsterGeneratorSingle />
        </TabsContent>
        
        <TabsContent value="configurator" className="mt-6">
          <MonsterConfigurator />
        </TabsContent>
      </Tabs>
    </div>
  )
}