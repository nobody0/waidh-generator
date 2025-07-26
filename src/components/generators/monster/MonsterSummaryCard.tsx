import { Heart, Shield, Zap, Brain, Swords, Sparkles, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ATTRIBUTE_SHORT } from '@/types/monster'
import type { Monster } from '@/types/monster'

interface MonsterSummaryCardProps {
  monster: Monster
}

export function MonsterSummaryCard({ monster }: MonsterSummaryCardProps) {
  return (
    <TooltipProvider>
      <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-medieval">
            {monster.name || 'Unbenanntes Monster'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{monster.age.name}</p>
        </CardHeader>
      </Card>

      {/* Attribute */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Attribute</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(monster.attributes).map(([attr, value]) => {
              const baseValue = monster.age.baseAttributes
              const bonus = value - baseValue
              const hasBonus = bonus !== 0
              
              return (
                <Tooltip key={attr} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="text-center p-2 rounded-lg border bg-muted/30 ">
                      <div className="text-xs font-medium text-muted-foreground">
                        {ATTRIBUTE_SHORT[attr as keyof typeof ATTRIBUTE_SHORT]}
                      </div>
                      <div className="text-lg font-bold">
                        <span className="text-foreground">{value}</span>
                        {hasBonus && (
                          <span className={`text-sm ml-1 ${
                            bonus > 0 ? 'text-green-600 dark:text-green-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {bonus >= 0 ? '+' : ''}{bonus}
                          </span>
                        )}
                      </div>
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
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Kampfwerte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 ">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-muted-foreground">LP:</span>
                  <span className="font-mono font-bold">{monster.maxLp}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">
                  {monster.age.baseLP} (Basis) + {monster.attributes.stärke - monster.age.baseAttributes} (STR-Bonus)
                  {monster.age.id === 'weltenbestie' && ' × 2'}
                </p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 ">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">SP:</span>
                  <span className="font-mono font-bold">{monster.maxSp}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">
                  {monster.age.baseSP} (Basis) + {monster.attributes.willenskraft - monster.age.baseAttributes} (WIL-Bonus) × {monster.age.spMultiplier}
                </p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 ">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-muted-foreground">AP:</span>
                  <span className="font-mono font-bold">{monster.ap}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">Basis-AP nach Alter</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 ">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-muted-foreground">Initiative:</span>
                  <span className="font-mono font-bold">{monster.initiative}</span>
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
                <div className="flex items-center gap-2 ">
                  <Swords className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-muted-foreground">Angriff:</span>
                  <span className="font-mono font-bold">{monster.attack}</span>
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
                <div className="flex items-center gap-2 ">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Verteidigung:</span>
                  <span className="font-mono font-bold">{monster.defense}</span>
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
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Fähigkeiten ({monster.abilities.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {monster.abilities.map((ability, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-xs text-muted-foreground mt-0.5">
                  {ATTRIBUTE_SHORT[ability.attribute]}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{ability.name}</p>
                  {ability.effect && (
                    <p className="text-xs text-muted-foreground">{ability.effect}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spezial-Aktion */}
      <Card className="border-primary/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Spezial-Aktion ({monster.specialAction.cost} AP)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium text-sm">{monster.specialAction.name}</p>
          <p className="text-sm text-muted-foreground mt-1">{monster.specialAction.effect}</p>
          {monster.specialAction.exhaustion && (
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
              ⚡ Verursacht ERSCHÖPFUNG
            </p>
          )}
        </CardContent>
      </Card>

      {/* Eigenschaften */}
      {monster.properties.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Schlechte Eigenschaften
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {monster.properties.map((property, idx) => (
                <div key={idx}>
                  <p className="text-sm font-medium">{property.name}</p>
                  <p className="text-xs text-muted-foreground">{property.effect}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </TooltipProvider>
  )
}