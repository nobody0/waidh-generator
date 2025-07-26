import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { allAbilities } from '@/data/tables/monsterTables'
import { ATTRIBUTE_SHORT } from '@/types/monster'
import type { MonsterAbility, MonsterAttribute } from '@/types/monster'

export function AbilityDatabase() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAttribute, setSelectedAttribute] = useState<MonsterAttribute['type'] | null>(null)

  const attributes: MonsterAttribute['type'][] = ['stärke', 'geschick', 'willenskraft', 'logik', 'mystik']

  const filteredAbilities = allAbilities.filter(ability => {
    const matchesSearch = searchTerm === '' || 
      ability.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ability.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ability.effect && ability.effect.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesAttribute = selectedAttribute === null || ability.attribute === selectedAttribute
    
    return matchesSearch && matchesAttribute
  })

  const groupedAbilities = attributes.reduce((acc, attr) => {
    acc[attr] = filteredAbilities.filter(a => a.attribute === attr)
    return acc
  }, {} as Record<MonsterAttribute['type'], MonsterAbility[]>)

  return (
    <div className="space-y-6">
      {/* Such- und Filterleiste */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Fähigkeit suchen..."
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedAttribute === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedAttribute(null)}
          >
            Alle Attribute
          </Button>
          {attributes.map(attr => (
            <Button
              key={attr}
              variant={selectedAttribute === attr ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedAttribute(attr)}
              className="capitalize"
            >
              {attr} ({ATTRIBUTE_SHORT[attr]})
            </Button>
          ))}
        </div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
        {attributes.map(attr => {
          const count = allAbilities.filter(a => a.attribute === attr).length
          return (
            <div key={attr} className="text-center p-2 bg-muted rounded">
              <div className="font-medium capitalize">{ATTRIBUTE_SHORT[attr]}</div>
              <div className="text-muted-foreground">{count} Fähigkeiten</div>
            </div>
          )
        })}
      </div>

      {/* Fähigkeiten nach Attribut */}
      {selectedAttribute ? (
        // Einzelnes Attribut
        <div>
          <h3 className="text-lg font-semibold capitalize mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {selectedAttribute}-Fähigkeiten ({groupedAbilities[selectedAttribute].length})
          </h3>
          <div className="grid gap-3">
            {groupedAbilities[selectedAttribute].map((ability, index) => (
              <AbilityCard key={ability.id} ability={ability} index={index + 1} />
            ))}
          </div>
        </div>
      ) : (
        // Alle Attribute
        <div className="space-y-8">
          {attributes.map(attr => {
            if (groupedAbilities[attr].length === 0) return null
            
            return (
              <div key={attr}>
                <h3 className="text-lg font-semibold capitalize mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {attr}-Fähigkeiten ({groupedAbilities[attr].length})
                </h3>
                <div className="grid gap-3">
                  {groupedAbilities[attr].map((ability, index) => (
                    <AbilityCard key={ability.id} ability={ability} index={index + 1} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {filteredAbilities.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Keine Fähigkeiten gefunden
        </div>
      )}
    </div>
  )
}

function AbilityCard({ ability, index }: { ability: MonsterAbility; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card 
      className="cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={() => setExpanded(!expanded)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="font-mono text-sm text-muted-foreground mt-0.5">
              {index}.
            </span>
            <div>
              <CardTitle className="text-base">{ability.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {ability.description}
              </p>
            </div>
          </div>
          <span className="text-xs px-2 py-1 bg-muted rounded">
            {ATTRIBUTE_SHORT[ability.attribute]}
          </span>
        </div>
      </CardHeader>
      
      {expanded && ability.effect && (
        <CardContent className="pt-0">
          <div className="pl-8 p-3 bg-muted/50 rounded text-sm">
            <span className="font-medium">Effekt:</span> {ability.effect}
          </div>
        </CardContent>
      )}
    </Card>
  )
}