import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NSCGeneratorSingle } from '@/components/generators/nsc/NSCGeneratorSingle'
import { NSCConfigurator } from '@/components/generators/nsc/configurator/NSCConfigurator'

export function NSCs() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold font-medieval">NSCs & Schergen Generator</h1>
      </div>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="configurator">Konfigurator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="mt-6">
          <NSCGeneratorSingle />
        </TabsContent>
        
        <TabsContent value="configurator" className="mt-6">
          <NSCConfigurator />
        </TabsContent>
      </Tabs>
    </div>
  )
}