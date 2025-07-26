import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MonsterTableOverview } from './MonsterTableOverview'
import { AbilityDatabase } from './AbilityDatabase'
import { PropertyDatabase } from './PropertyDatabase'
import { FormulaReference } from './FormulaReference'

export function MonsterConfigurator() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="tables" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tables">Tabellen</TabsTrigger>
          <TabsTrigger value="abilities">Fähigkeiten</TabsTrigger>
          <TabsTrigger value="properties">Eigenschaften</TabsTrigger>
          <TabsTrigger value="formulas">Formeln</TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="mt-6">
          <MonsterTableOverview />
        </TabsContent>

        <TabsContent value="abilities" className="mt-6">
          <AbilityDatabase />
        </TabsContent>

        <TabsContent value="properties" className="mt-6">
          <PropertyDatabase />
        </TabsContent>

        <TabsContent value="formulas" className="mt-6">
          <FormulaReference />
        </TabsContent>
      </Tabs>
    </div>
  )
}