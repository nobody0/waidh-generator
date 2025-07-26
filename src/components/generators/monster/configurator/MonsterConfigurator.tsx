import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DiceTableInlineEditor } from '@/components/dice/DiceTableInlineEditor'
import { MonsterTableOverview } from './MonsterTableOverview'
import { AbilityDatabase } from './AbilityDatabase'
import { PropertyDatabase } from './PropertyDatabase'
import { FormulaReference } from './FormulaReference'
import { useTableStore } from '@/store/tableStore'
import { 
  monsterAgeTable,
  strengthAttributeTable,
  weaknessAttributeTable,
  strengthAbilityTable,
  dexterityAbilityTable,
  willpowerAbilityTable,
  logicAbilityTable,
  mysticAbilityTable,
  badPropertiesTable
} from '@/data/tables/monsterTables'
import type { DiceTable } from '@/types/dice'

// Map of default tables
const DEFAULT_TABLES: Record<string, DiceTable<any>> = {
  'monster-age': monsterAgeTable,
  'monster-strength': strengthAttributeTable,
  'monster-weakness': weaknessAttributeTable,
  'strength-abilities': strengthAbilityTable,
  'dexterity-abilities': dexterityAbilityTable,
  'willpower-abilities': willpowerAbilityTable,
  'logic-abilities': logicAbilityTable,
  'mystic-abilities': mysticAbilityTable,
  'bad-properties': badPropertiesTable
}

export function MonsterConfigurator() {
  const { getCustomTable, updateCustomTable } = useTableStore()
  const [selectedTable, setSelectedTable] = useState<DiceTable<any> | null>(null)
  const [currentView, setCurrentView] = useState<'overview' | 'table'>('overview')

  const handleSelectTable = (table: DiceTable<any>) => {
    setSelectedTable(table)
    setCurrentView('table')
  }

  const handleBack = () => {
    setCurrentView('overview')
  }

  const handleSaveTable = (modifiedTable: DiceTable<any>) => {
    updateCustomTable(modifiedTable.id, modifiedTable)
  }

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
          {currentView === 'overview' ? (
            <MonsterTableOverview onSelectTable={handleSelectTable} />
          ) : selectedTable ? (
            <div className="space-y-4">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Übersicht
              </Button>
              
              <DiceTableInlineEditor
                table={getCustomTable(selectedTable.id) || selectedTable}
                defaultTable={DEFAULT_TABLES[selectedTable.id] || selectedTable}
                onSave={handleSaveTable}
              />
            </div>
          ) : null}
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