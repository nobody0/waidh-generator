import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DiceTableDisplay } from '@/components/dice/DiceTableDisplay'
import {
  chamberCountTable,
  themeTable,
  guardLevelTable,
  environmentTable,
  protectionTable,
  treasureTable,
  coreSpellTable
} from '@/data/tables/kerkerTables'

export function KerkerTableOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Haupt-Tabellen</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <DiceTableDisplay table={chamberCountTable} />
          <DiceTableDisplay table={themeTable} />
          <DiceTableDisplay table={guardLevelTable} />
          <DiceTableDisplay table={environmentTable} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Kammer-Tabellen</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{protectionTable.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {protectionTable.entries.map((entry) => (
                  <div key={entry.value.id} className="flex justify-between items-start text-sm">
                    <span className="font-medium">{entry.range}</span>
                    <div className="text-right flex-1 ml-4">
                      <p className="font-medium">{entry.value.name}</p>
                      {entry.description && (
                        <p className="text-xs text-muted-foreground">{entry.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{treasureTable.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {treasureTable.entries.map((entry) => (
                  <div key={entry.value.id} className="flex justify-between items-start text-sm">
                    <span className="font-medium">{entry.range}</span>
                    <div className="text-right flex-1 ml-4">
                      <p className="font-medium">{entry.value.name}</p>
                      {entry.description && (
                        <p className="text-xs text-muted-foreground">{entry.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <DiceTableDisplay table={coreSpellTable} />
        </div>
      </div>

      <Card className="bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-200/50 dark:border-yellow-800/50">
        <CardContent className="py-4">
          <h3 className="font-medium mb-2">Sub-Würfe bei Kammer-Schutz</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• (1W6-3, min 0) bedeutet: Würfle 1W6 und ziehe 3 ab, Minimum ist 0</li>
            <li>• (1W6+1, min 2) bedeutet: Würfle 1W6 und addiere 1, Minimum ist 2</li>
            <li>• (1W2) bedeutet: Würfle einen W2 (oder 1W6: 1-3 = 1, 4-6 = 2)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}