import { useState } from 'react'
import { Table, Dices, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

interface TableInfo {
  table: DiceTable<any>
  category: string
  description: string
}

const MONSTER_TABLES: TableInfo[] = [
  {
    table: monsterAgeTable,
    category: 'Basis',
    description: 'Bestimmt Grundwerte und Stärke des Monsters'
  },
  {
    table: strengthAttributeTable,
    category: 'Attribute',
    description: 'Welches Attribut wird gestärkt'
  },
  {
    table: weaknessAttributeTable,
    category: 'Attribute',
    description: 'Welches Attribut wird geschwächt'
  },
  {
    table: strengthAbilityTable,
    category: 'Fähigkeiten',
    description: 'Körperliche Fähigkeiten'
  },
  {
    table: dexterityAbilityTable,
    category: 'Fähigkeiten',
    description: 'Bewegungs-Fähigkeiten'
  },
  {
    table: willpowerAbilityTable,
    category: 'Fähigkeiten',
    description: 'Mentale Fähigkeiten'
  },
  {
    table: logicAbilityTable,
    category: 'Fähigkeiten',
    description: 'Intelligenz-Fähigkeiten'
  },
  {
    table: mysticAbilityTable,
    category: 'Fähigkeiten',
    description: 'Magische Fähigkeiten'
  },
  {
    table: badPropertiesTable,
    category: 'Eigenschaften',
    description: 'Negative Eigenschaften und Schwächen'
  }
]

interface MonsterTableOverviewProps {
  onSelectTable: (table: DiceTable<any>) => void
}

export function MonsterTableOverview({ onSelectTable }: MonsterTableOverviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(MONSTER_TABLES.map(t => t.category)))

  const filteredTables = selectedCategory 
    ? MONSTER_TABLES.filter(t => t.category === selectedCategory)
    : MONSTER_TABLES

  return (
    <div className="space-y-6">
      {/* Kategorie-Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          Alle
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Tabellen-Liste */}
      <div className="grid gap-4">
        {filteredTables.map(({ table, category, description }) => (
          <Card 
            key={table.id}
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => onSelectTable(table)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Table className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base">{table.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Dices className="w-4 h-4" />
                  <span>{table.diceType}</span>
                </div>
                <span>•</span>
                <span>{table.entries.length} Einträge</span>
                <span>•</span>
                <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                  {category}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistik */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-3">Tabellen-Übersicht:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Gesamt:</span>
            <span className="ml-2 font-medium">{MONSTER_TABLES.length} Tabellen</span>
          </div>
          <div>
            <span className="text-muted-foreground">Fähigkeiten:</span>
            <span className="ml-2 font-medium">60 verschiedene</span>
          </div>
          <div>
            <span className="text-muted-foreground">Eigenschaften:</span>
            <span className="ml-2 font-medium">11 verschiedene</span>
          </div>
        </div>
      </div>
    </div>
  )
}