import { memo } from 'react'
import { Heart, Shield, Zap, Brain, Swords, Sparkles, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ATTRIBUTE_SHORT } from '@/types/monster'
import type { Monster } from '@/types/monster'

interface MonsterSummaryCardProps {
  monster: Monster
}

export const MonsterSummaryCard = memo(function MonsterSummaryCard({ monster }: MonsterSummaryCardProps) {
  return (
    <TooltipProvider>
      <div className="space-y-2">
      {/* Header */}
      <Card>
        <CardHeader className="py-2">
          <CardTitle className="text-xl font-medieval">
            {monster.age.name}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Attribute */}
      <Card>
        <CardContent className="pt-2 pb-3">
          <div className="text-sm font-medium text-muted-foreground mb-1">Attribute</div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(monster.attributes).map(([attr, value]) => {
              const baseValue = monster.age.baseAttributes
              const bonus = value - baseValue
              const hasBonus = bonus !== 0
              
              return (
                <Tooltip key={attr} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="font-medium text-muted-foreground">
                        {ATTRIBUTE_SHORT[attr as keyof typeof ATTRIBUTE_SHORT]}:
                      </span>
                      <span className="font-bold">{value}</span>
                      {hasBonus && (
                        <span className={`text-xs ${
                          bonus > 0 ? 'text-green-600 dark:text-green-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          ({bonus >= 0 ? '+' : ''}{bonus})
                        </span>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-mono text-xs">
                      {baseValue} (Basis) {bonus !== 0 ? `${bonus >= 0 ? '+' : ''}${bonus} (Modifikator)` : ''}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Kampfwerte */}
      <Card>
        <CardContent className="pt-2 pb-3">
          <div className="text-sm font-medium text-muted-foreground mb-1">Kampfwerte</div>
          <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-sm">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 ">
                  <Heart className="w-3 h-3 text-red-500" />
                  <span className="text-muted-foreground">LP:</span>
                  <span className="font-mono font-semibold">{monster.maxLp}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">
                  {monster.age.baseLP} (Basis) + {monster.attributes.stärke} (STR)
                  {monster.age.id === 'weltenbestie' && ' × 2'}
                </p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 ">
                  <Zap className="w-3 h-3 text-blue-500" />
                  <span className="text-muted-foreground">SP:</span>
                  <span className="font-mono font-semibold">{monster.maxSp}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">
                  {monster.age.baseSP} (Basis) + {monster.attributes.willenskraft} (WIL) × {monster.age.spMultiplier}
                </p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 ">
                  <Shield className="w-3 h-3 text-gray-500" />
                  <span className="text-muted-foreground">AP:</span>
                  <span className="font-mono font-semibold">{monster.ap}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">Basis-AP nach Alter</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 ">
                  <Brain className="w-3 h-3 text-purple-500" />
                  <span className="text-muted-foreground">Init:</span>
                  <span className="font-mono font-semibold">{monster.initiative}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">
                  1 (Basis) + {monster.attributes.geschick} (GES) + {monster.attributes.logik} (LOG)
                </p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 ">
                  <Swords className="w-3 h-3 text-orange-500" />
                  <span className="text-muted-foreground">Ang:</span>
                  <span className="font-mono font-semibold">{monster.attack}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">
                  {monster.attack.split('W')[0]}W6 + ({monster.attributes.geschick} × 2)
                </p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 ">
                  <Shield className="w-3 h-3 text-green-500" />
                  <span className="text-muted-foreground">Vert:</span>
                  <span className="font-mono font-semibold">{monster.defense}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">
                  {monster.defense.split('W')[0]}W6 + ({monster.attributes.geschick} × 2)
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      {/* Fähigkeiten */}
      <Card>
        <CardContent className="pt-2 pb-3">
          <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Fähigkeiten ({monster.abilities.length})
          </div>
          <div className="space-y-0.5 text-sm">
            {(() => {
              // Group abilities by attribute
              const grouped = monster.abilities.reduce((acc, ability) => {
                if (!acc[ability.attribute]) {
                  acc[ability.attribute] = []
                }
                acc[ability.attribute].push(ability)
                return acc
              }, {} as Record<string, typeof monster.abilities>)
              
              return Object.entries(grouped).map(([attr, abilities]) => (
                <div key={attr} className="flex items-start gap-1">
                  <span className="text-xs text-muted-foreground font-medium min-w-[28px]">
                    {ATTRIBUTE_SHORT[attr as keyof typeof ATTRIBUTE_SHORT]}:
                  </span>
                  <div className="flex-1 flex flex-wrap gap-x-2">
                    {abilities.map((ability, idx) => (
                      <Tooltip key={idx} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <span className="font-medium inline-block">{ability.name}</span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="space-y-1">
                            <p className="font-semibold text-sm">{ability.name}</p>
                            {ability.description && (
                              <p className="text-xs text-muted-foreground">{ability.description}</p>
                            )}
                            {ability.effect && (
                              <p className="text-xs">{ability.effect}</p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              ))
            })()}
          </div>
        </CardContent>
      </Card>

      {/* Spezial-Aktion */}
      <Card className="border-primary/50">
        <CardContent className="pt-2 pb-3">
          <div className="text-sm font-medium text-muted-foreground mb-1">
            Spezial-Aktion ({monster.specialAction.cost} AP)
          </div>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="text-sm inline-block">
                <span className="font-medium">{monster.specialAction.name}</span>
                {monster.specialAction.exhaustion && (
                  <span className="text-yellow-700 dark:text-yellow-300 ml-1">
                    (Erschöpfung)
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-semibold text-sm">
                  {monster.specialAction.name} ({monster.specialAction.cost} AP)
                </p>
                <p className="text-xs">{monster.specialAction.effect}</p>
                {monster.specialAction.exhaustion && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    Verursacht Erschöpfung nach Einsatz
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </CardContent>
      </Card>

      {/* Eigenschaften */}
      {monster.properties.length > 0 && (
        <Card>
          <CardContent className="pt-2 pb-3">
            <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Schlechte Eigenschaften
            </div>
            <div className="flex flex-wrap gap-x-2 text-sm">
              {monster.properties.map((property, idx) => (
                <Tooltip key={idx} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <span className="font-medium inline-block">{property.name}</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">{property.name}</p>
                      <p className="text-xs">{property.effect}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </TooltipProvider>
  )
})