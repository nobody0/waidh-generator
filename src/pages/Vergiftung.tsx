import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VergiftungGeneratorSingle } from '@/components/generators/vergiftung/VergiftungGeneratorSingle'
import { VergiftungConfigurator } from '@/components/generators/vergiftung/configurator/VergiftungConfigurator'

export function Vergiftung() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold font-medieval">Vergiftungs Generator</h1>
      </div>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="configurator">Konfigurator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="mt-6">
          <VergiftungGeneratorSingle />
        </TabsContent>
        
        <TabsContent value="configurator" className="mt-6">
          <VergiftungConfigurator />
        </TabsContent>
      </Tabs>
    </div>
  )
}