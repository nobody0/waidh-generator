import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdventureTableOverview } from './AdventureTableOverview'
import { CombinationMatrix } from './CombinationMatrix'
import { StoryTemplates } from './StoryTemplates'
import { RewardCalculator } from './RewardCalculator'

export function AdventureConfigurator() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="tables" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tables">Tabellen</TabsTrigger>
          <TabsTrigger value="combinations">Kombinationen</TabsTrigger>
          <TabsTrigger value="templates">Story-Templates</TabsTrigger>
          <TabsTrigger value="rewards">Belohnungen</TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="mt-6">
          <AdventureTableOverview />
        </TabsContent>

        <TabsContent value="combinations" className="mt-6">
          <CombinationMatrix />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <StoryTemplates />
        </TabsContent>

        <TabsContent value="rewards" className="mt-6">
          <RewardCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}