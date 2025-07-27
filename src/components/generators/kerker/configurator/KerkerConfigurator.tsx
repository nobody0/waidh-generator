import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { KerkerTableOverview } from './KerkerTableOverview'
import { ThemeDatabase } from './ThemeDatabase'
import { TrapGenerator } from './TrapGenerator'
import { RulesReference } from './RulesReference'

export function KerkerConfigurator() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="tables" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tables">Tabellen</TabsTrigger>
          <TabsTrigger value="themes">Themen</TabsTrigger>
          <TabsTrigger value="traps">Fallen</TabsTrigger>
          <TabsTrigger value="rules">Regeln</TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="mt-6">
          <KerkerTableOverview />
        </TabsContent>

        <TabsContent value="themes" className="mt-6">
          <ThemeDatabase />
        </TabsContent>

        <TabsContent value="traps" className="mt-6">
          <TrapGenerator />
        </TabsContent>

        <TabsContent value="rules" className="mt-6">
          <RulesReference />
        </TabsContent>
      </Tabs>
    </div>
  )
}