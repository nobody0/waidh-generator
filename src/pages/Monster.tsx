import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DiceTableDisplay } from '@/components/dice/DiceTableDisplay'
import { DiceTableRoller } from '@/components/dice/DiceTableRoller'
import { DiceTableConfigurator } from '@/components/dice/DiceTableConfigurator'
import { exampleSimpleTable, exampleComplexTable } from '@/data/tables/exampleTables'
import { useTableStore } from '@/store/tableStore'
import type { DiceTable } from '@/types/dice'

export function Monster() {
  const { getCustomTable, updateCustomTable } = useTableStore()
  const [selectedTable, setSelectedTable] = useState<DiceTable<any>>(exampleSimpleTable)

  // Verwende custom table falls vorhanden, sonst default
  const currentTable = getCustomTable(selectedTable.id) || selectedTable

  const handleTableSave = (modifiedTable: DiceTable<any>) => {
    updateCustomTable(modifiedTable.id, modifiedTable)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 font-medieval">Monster Generator</h1>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="tables">Tabellen</TabsTrigger>
          <TabsTrigger value="config">Konfiguration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <div className="grid gap-6 md:grid-cols-2">
            <DiceTableRoller 
              table={currentTable}
              onRoll={(result) => console.log('Würfelergebnis:', result)}
              allowManualOverride
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Monster Erstellen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Beispiel-Integration des Würfeltabellen-Systems
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedTable(exampleSimpleTable)}
                    className="block w-full text-left px-3 py-2 rounded hover:bg-muted"
                  >
                    Einfache Tabelle
                  </button>
                  <button
                    onClick={() => setSelectedTable(exampleComplexTable)}
                    className="block w-full text-left px-3 py-2 rounded hover:bg-muted"
                  >
                    Komplexe Tabelle
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tables">
          <DiceTableDisplay table={currentTable} />
        </TabsContent>

        <TabsContent value="config">
          <DiceTableConfigurator 
            table={currentTable}
            onSave={handleTableSave}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}